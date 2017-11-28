require('bootstrap');
require('../less/main.less');

var common = require('./common');
var adminCommon = require('./admin/common');
var join = require('./join');
var Search = require('./search/search-service');
var loadGoogleMapsApi = require('load-google-maps-api-2');

loadGoogleMapsApi.key = 'AIzaSyDmSxIrhoC4OAiGOtO6ddcFCwSMRbgfPGs';
loadGoogleMapsApi.language = 'ko';
loadGoogleMapsApi.version = '3';

// 위치 찾기
function getLocation() {
    // GPS 지원
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            initMainMap(position);
        }, function (error) { // 위치 찾기 에러 시 콜백
            console.error(error);
            alert('내 위치 확인을 허용해 주세요.');
            $('#nearby-rest').removeClass('active');
            $('#nearby-rest-contents').removeClass('active');
            $('#recommend-rest').addClass('active');
            $('#recommend-rest-contents').addClass('active');
            initMainMap();
        }, { // 옵션
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: Infinity
        });
    }
    // GPS 지원 X
    else {
        alert('GPS를 지원하지 않습니다.');
        $('#nearby-rest').removeClass('active');
        $('#nearby-rest-contents').removeClass('active');
        $('#recommend-rest').addClass('active');
        $('#recommend-rest-contents').addClass('active');
        initMainMap();
    }
}

getLocation();

var googleMaps;
var map;
var marker;
var markers = [];
var i;
var infoWindow;
var currentPosition = {};
var fork;

function initMainMap(position) {
    loadGoogleMapsApi().then(function (_googleMaps) {
        googleMaps = _googleMaps;

        infoWindow = new googleMaps.InfoWindow();

        if ($('#nearby-rest').hasClass('active')) {

            if (position) {
                currentPosition.lat = position.coords.latitude;
                currentPosition.lng = position.coords.longitude;
            } else {
                currentPosition.lat = 37.552331;
                currentPosition.lng = 126.937588;
            }

            // 옵션을 따로 설정해서 mapOptions 변수에 담았음
            var mapOptions = {
                // 지도 확대 비율
                zoom: 16,
                // 지도 스크롤 설정 off
                scrollwheel: false,
                // 지도 센터 설정
                center: new googleMaps.LatLng(currentPosition.lat, currentPosition.lng) // 현재 위치
            };

            // 지도 생성
            map = new googleMaps.Map($('#main-map')[0], mapOptions);

            map.addListener('dragstart', function () {
                 if (markers) {
                     deleteMarkers();
                 }
            });

            map.addListener('dragend', function () {
                currentPosition.lat = map.getCenter().lat();
                currentPosition.lng = map.getCenter().lng();

                if ($('#sort-latest').hasClass('active')) {
                    initLatestRest();
                }
                else if ($('#sort-article').hasClass('active')) {
                    initArticleRest();
                }
            });

            initSort();
            initLatestRest();
            foodSelect();

        }
        else if ($('#recommend-rest').hasClass('active')) {

            $.ajax({
                url: '/api/cock/rest/recommend',
                success: function (result) {
                    var mapOptions = {
                        zoom: 16,
                        scrollwheel: false,
                        center: new googleMaps.LatLng(result[0].lat, result[0].lng)
                    };

                    map = new googleMaps.Map($('#main-map')[0], mapOptions);
                    fork = '../img/fork-blue.png';

                    for (i = 0; i < result.length; i++) {
                        marker = new googleMaps.Marker({
                            position: new googleMaps.LatLng(result[i].lat, result[i].lng),
                            map: map,
                            icon: fork
                        });

                        googleMaps.event.addListener(marker, 'click', (function (marker, i) {
                            return function () {
                                infoWindow.setContent(result[i].name);
                                infoWindow.open(map, marker);
                            }
                        })(marker, i));
                    }

                    initRecommend(result);
                }
            });
        }
    }).catch(function (error) {
        console.error(error);
    });
}

// 전체 tag 불러옴
var tags = [];

$.ajax({
    url: '/api/cock/rest/tags',
    success: function (result) {
        for (var i=0; i<result.length; i++) {
            tags[i] = {
                rid: result[i].rid,
                tag: result[i].tag.split(',')
            };
        }
    }
});

// CockCock Top4
$.ajax({
    url: '/api/cock/rest/top4',
    success: function (result) {
        initRanking(result);
    }
});

// 단골 맛집
function initRanking(articleRanking) {
    $('.ranking-bottom').empty();

    var rankingTpl = require('../template/main/article-ranking.hbs');

    for (var i = 0; i < articleRanking.length; i++) {
        var rankingHtml = rankingTpl(articleRanking[i]);

        $('.ranking-bottom').append(rankingHtml);
    }

    clkRanking();
}

// 리스트 클릭하면 상세 페이지로 이동
function clkRanking() {
    $('.rb-wrapper').on('click', function () {
        var rankingId = $(this).attr('rid');

        goDetail(rankingId);
    })
}

// 주변 맛집 / 추천 맛집 버튼 클릭
function clkTab() {
    $('.card-tab-btns > li').on('click', function () {
        if ($(this).hasClass('active')) {
            return;
        }

        var tabIndex = $(this).index();

        // 주변 맛집 버튼[0] / 추천 맛집 버튼[1]
        var tabBtns = $(this).parent('.card-tab-btns').find('li');
        tabBtns.removeClass('active');
        $(tabBtns[tabIndex]).addClass('active');

        // 주변 맛집 컨텐츠[0] / 추천 맛집 컨텐츠[1]
        var tabContents = $(this).parents('.main-card-tab').find('.card-tab-contents > li');
        tabContents.removeClass('active');
        $(tabContents[tabIndex]).addClass('active');

        if ($('#nearby-rest').hasClass('active')) {
            getLocation();
        }
        else {
            $('.card-contents-sort').hide();
            initMainMap();
        }
    });
}

clkTab();

// 정렬 기준
function initSort() {
    var sortTpl = require('../template/main/card-contents-sort.hbs');

    $('.card-contents-sort').html(sortTpl);

    clkSort();
}

// 정렬 기준 버튼 클릭 이벤트
function clkSort() {
    $('#sort-latest').on('click', function () {
        if ($(this).hasClass('active')) {
            return;
        }

        deleteMarkers();

        $(this).parent('.card-contents-sort').find('div').removeClass('active');
        $(this).addClass('active');

        initLatestRest();
    });

    $('#sort-article').on('click', function () {
        if ($(this).hasClass('active')) {
            return;
        }

        deleteMarkers();

        $(this).parent('.card-contents-sort').find('div').removeClass('active');
        $(this).addClass('active');

        initArticleRest();
    });
}

// var latestArticle;

// 최신 순
function initLatestRest() {
    $.ajax({
        url: '/api/cock/rest/latest/' + currentPosition.lat + ',' + currentPosition.lng + '/',
        success: function (result) {
            if (result.length === 0) {
                $('.contents-nearby').empty();
                $('.card-contents-sort').hide();
                $('.result_empty').show();
            }
            else {
                $('.card-contents-sort').show();
                $('.result_empty').hide();

                initNearby(result);

                // latestArticle = result;

                fork = '../img/fork-red.png';

                // 마커 추가
                for (i = 0; i < result.length; i++) {
                    marker = new googleMaps.Marker({
                        position: new googleMaps.LatLng(result[i].lat, result[i].lng),
                        map: map,
                        icon: fork
                    });

                    markers.push(marker);

                    // 마커 클릭시 타이틀 팝업
                    googleMaps.event.addListener(marker, 'click', (function (marker, i) {
                        return function () {
                            infoWindow.setContent(result[i].name);
                            infoWindow.open(map, marker);
                        }
                    })(marker, i));
                }
            }
        }
    });
}

var todayRest;
// 게시글 순
function initArticleRest() {
    $.ajax({
        url: '/api/cock/rest/article/' + currentPosition.lat + ',' + currentPosition.lng + '/',
        success: function (result) {
            todayRest = result;

            if (result.length === 0) {
                $('.contents-nearby').empty();
                $('.card-contents-sort').hide();
                $('.result_empty').show();
            }
            else {
                $('.card-contents-sort').show();
                $('.result_empty').hide();

                initNearby(result);

                fork = '../img/fork-red.png';

                for (i = 0; i < result.length; i++) {
                    marker = new googleMaps.Marker({
                        position: new googleMaps.LatLng(result[i].lat, result[i].lng),
                        map: map,
                        icon: fork
                    });

                    markers.push(marker);

                    googleMaps.event.addListener(marker, 'click', (function (marker, i) {
                        return function () {
                            infoWindow.setContent(result[i].name);
                            infoWindow.open(map, marker);
                        }
                    })(marker, i));
                }
            }
        }
    });
}

// 로그인 상태에서 즐겨찾기 가져오기
/* 문기*/
function cockSignedInFavorite(article) {
    $.ajax({
        url: '/api/cock/member/bookmark',
        success: function (result) {
            /*console.log(result);*/
            for(var i= 0; i < result.length; i++){
                for(var j = 0; j<article.length; j++){
                    if(article[j].rid === result[i].rid){
                        $('.card-contents-list li[rid='+ article[j].rid +'] .card-contents-favorite i').removeClass('fa-star-o');
                        $('.card-contents-list li[rid='+ article[j].rid +'] .card-contents-favorite i').addClass('fa-star');
                        break;
                    }
                }
            }
        }
    });
}

// 주변 맛집 리스트
function initNearby(contentsNearby) {
    $('.contents-nearby').empty();

    for (var i = 0; i < contentsNearby.length; i++) {
        var contentsTpl = require('../template/main/card-contents-list.hbs');

        var nearbyHtml = contentsTpl(contentsNearby[i]);

        $('.contents-nearby').append(nearbyHtml);

        for (var j = 0; j < tags.length; j++) {
            var tagsTpl = require('../template/main/card-contents-tags.hbs');

            if (contentsNearby[i].rid === tags[j].rid) {
                var tagsHtml = tagsTpl(tags[j]);

                $('.contents-nearby > li[rid="' + tags[j].rid + '"] .card-contents-tags').html(tagsHtml);
            }
        }
    }

    // 리스트 클릭하면 상세 페이지로 이동
    $('.card-contents-list > li').on('click', function () {
        goDetail($(this).attr('rid'));
    });

    clkFavorite();
    clkTag();
    hoverContents();
    cockSignedInFavorite(contentsNearby);
}

// 추천 맛집 리스트
function initRecommend(contentsRecommend) {
    $('.contents-recommend').empty();

    var contentsTpl = require('../template/main/card-contents-list.hbs');

    for (var i = 0; i < contentsRecommend.length; i++) {
        var recommendHtml = contentsTpl(contentsRecommend[i]);

        $('.contents-recommend').append(recommendHtml);

        for (var j = 0; j < tags.length; j++) {
            var tagsTpl = require('../template/main/card-contents-tags.hbs');

            if (contentsRecommend[i].rid === tags[j].rid) {
                var tagsHtml = tagsTpl(tags[j]);

                $('.contents-recommend > li[rid="' + tags[j].rid + '"] .card-contents-tags').html(tagsHtml);
            }
        }
    }

    $('.card-contents-list > li').on('click', function () {
        goDetail($(this).attr('rid'));
    });

    clkFavorite();
    clkTag();
    hoverContents();
    cockSignedInFavorite(contentsRecommend);
}

function initTags() {

}

initTags();

// 즐겨찾기
function clkFavorite() {
    common.ajax({
        url: '/api/member/get',
        success: function (result) {
            if (!result.signedIn) {
                signedOutFavorite();
            }
            else {
                signedInFavorite();
            }
        }
    });
}

// 비로그인 상태의 즐겨찾기 클릭 이벤트
function signedOutFavorite() {
    $('.card-contents-favorite i').on('click', function (event) {
        event.stopPropagation();

        alert('즐겨찾기 서비스 이용을 위해 로그인을 해주세요.');
        $('.header-bt').trigger('click');
    });
}


// 로그인 상태의 즐겨찾기 클릭 이벤트
/*문기*/
function signedInFavorite() {
    $('.card-contents-list li .card-contents-favorite > i').unbind('click').on('click', function(event) {
        event.stopPropagation();
        var rid = $(this).parents('li').attr('rid');

        if ($(this).hasClass('fa-star-o')) {

            $(this).removeClass('fa-star-o');
            $(this).addClass('fa-star');

            $.ajax({
                url: '/api/cock/member/bookmark/save',
                data: {
                    rid: rid
                },
                success: function (result) {
                    alert('즐겨찾기에 추가되었습니다.');
                }
            });
        }
        else{
            $(this).removeClass('fa-star');
            $(this).addClass('fa-star-o');

            $.ajax({
                url: '/api/cock/member/bookmark/remove',
                data: {
                    rid: rid
                },
                success: function (result) {
                    alert('즐겨찾기에서 삭제되었습니다.');
                }
            });

        }
    });

    /*for(var i=0; i < latestArticle.length; i++){
        latestArticleVall =latestArticle[i].rid;
        console.log(latestArticleVall);
        $('.card-contents-list li[rid='+ latestArticle[i].rid +'] .card-contents-favorite i').unbind('click').on('click', function (event) {
        event.stopPropagation();
        /!*.card-contents-list li[rid='+ article[j].rid +'] .card-contents-favorite i*!/
        if ($(this).hasClass('fa-star-o')) {
                $(this).removeClass('fa-star-o');
                $(this).addClass('fa-star');
            $.ajax({
                url: '/api/cock/member/bookmark/save',
                data: {
                    rid : latestArticle[i].rid
                },
                success: function (result) {
                    alert('즐겨찾기에 추가되었습니다.');
                    // 서버에서 즐겨찾기 저장 구현 필요함
                    console.log(latestArticle);
                }
            });
        }
        else{
                $(this).removeClass('fa-star');
                $(this).addClass('fa-star-o');
                alert('즐겨찾기에서 삭제되었습니다.');
                // 서버에서 즐겨찾기 삭제 구현 필요함
            }
        });
    }*/

}

function clkTag() {
    $('.card-contents-tags > li').on('click', function (event) {
        event.stopPropagation();

        var tagVal = $(this).text().substr(1);

        location.href = 'search.html?text=' + tagVal
    })
}

var mainColor = '#f99595';
var defaultColor = '#5e5e5e';

// 맛집 리스트 마우스오버 이벤트
function hoverContents() {
    $('.card-contents-list > li').on('mouseenter', function () {
        var cardContents = $(this).find('.card-contents');

        var location = $(this).find('.locationContainer');
        var lat = parseFloat(location.attr('lat'));
        var lng = parseFloat(location.attr('lng'));
        var myLatLng = {lat: lat, lng: lng};

        var iwTitle = cardContents.find('.card-contents-title').text();

        cardContents.find('.card-contents-title').css('color', mainColor);
        cardContents.find('.card-contents-count').css('color', mainColor);

        map.panTo(myLatLng);

        if ($(this).parents('#nearby-rest-contents').hasClass('active')) {
            fork = '../img/fork-red.png';
        }
        else if ($(this).parents('#recommend-rest-contents').hasClass('active')) {
            fork = '../img/fork-blue.png';
        }

        marker = new googleMaps.Marker({
            position: new googleMaps.LatLng(myLatLng),
            map: map,
            icon: fork
        });

        infoWindow.setContent(iwTitle);
        infoWindow.open(map, marker);

    });

    $('.card-contents-list > li').on('mouseleave', function () {
        var cardContents = $(this).find('.card-contents');

        cardContents.find('.card-contents-title').css('color', defaultColor);
        cardContents.find('.card-contents-count').css('color', defaultColor);

        marker.setMap(null);
    });

    $('.card-contents-tags > li').on('mouseover', function () {
        $(this).css('color', mainColor);
    });

    $('.card-contents-tags > li').on('mouseout', function () {
        $(this).css('color', '#5e5e5e');
    });
}

function deleteMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}

function goDetail(rid) {
    location.href = 'detail.html?rid=' + rid;
}

$('#btn-join-test').on('click', function () {
    location.href = 'join.html';
});

$('#btn-join-food-test').on('click', function () {
    location.href = 'join-food.html';
});



function foodSelect() {
    //오늘 뭐 먹지?
    $('.food-select').on('click', function () {
        /*var dialog = $('<div class="food-select-modal">' +
            '<div class="food-select-dialog">내용</div></div>');

        $('body').append(dialog);

        $('.food-select-modal').on('click', function () {
           $('.food-select-modal').fadeOut(400, function () {
              $('.food-select-modal').remove();
           });
        });*/
        $.ajax({
            url: '/api/cock/rest/latest/' + currentPosition.lat + ',' + currentPosition.lng + '/',
            success: function (result) {
                console.log(result);
                if (result.length === 0) {
                    adminCommon.openDialog({
                        body: '&lt; 오늘 뭐 먹지? &gt;' + '<br>' + '<br>' + '고객님이 계신 장소에는 등록된 주변 맛집이 없습니다!' + '<br>' + '<br>' +'방문하셨던 맛집을 첫번째로 등록해 보시겠습니까?',
                        title: '주변 맛집 추천!',
                        buttons:[{
                            id: 'info',
                            name: '맛집 추가 하기',
                            style: 'info'
                        }],
                        handler: function (btnId) {
                            if(btnId == 'info') {
                                common.ajax({
                                    url: '/api/member/get',
                                    success: function (result) {
                                        if(!result.signedIn){
                                            alert('맛집 추가 서비스 이용을 위해 로그인을 해주세요.');
                                            $('.btn-default').trigger('click');
                                            $('.header-bt').trigger('click');
                                        }
                                        else {
                                            location.href = '/insert.html';
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
                else {
                    var l = result.length;
                    var rec = parseInt(Math.random() * l);
                    console.log();
                    adminCommon.openDialog({
                        body: '&lt; 오늘 뭐 먹지? &gt;'  + '<div class="food-select-img" style="background-image: url('+ result[rec].img +')"></div>' +'고객님이 계신 장소에서 등록된 <<'+'<span>' + result[rec].name + '</span>'+'>> 추천해드립니다!',
                        title: '주변 맛집 추천!',
                        buttons:[{
                            id: 'info',
                            name: '추천 맛집 페이지 이동',
                            style: 'info'
                        }],
                        handler: function (btnId) {
                            if(btnId == 'info') {
                                location.href = '/detail.html?rid='+ result[rec].rid;
                            }
                        }
                    })
                }
            }
        });



    });
}


