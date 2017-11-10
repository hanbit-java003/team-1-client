require('bootstrap');
require('../less/main.less');

var common = require('./common');
var join = require('./join');
var loadGoogleMapsApi = require('load-google-maps-api-2');

// 추천 맛집 모델
var contentsRecommend = require('./model/card-contents-recommend');

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
    }
}

getLocation();

var googleMaps;
var map;
var marker;
var i;
var spoon;
var infoWindow;

function initMainMap(position) {
    loadGoogleMapsApi().then(function (_googleMaps) {
        googleMaps = _googleMaps;

        infoWindow = new googleMaps.InfoWindow();

        if ($('#nearby-rest').hasClass('active')) {

            // 옵션을 따로 설정해서 mapOptions 변수에 담았음
            var mapOptions = {
                // 지도 확대 비율
                zoom: 16,
                // 지도 스크롤 설정 off
                scrollwheel: false,
                // 지도 센터 설정
                center: new googleMaps.LatLng(position.coords.latitude, position.coords.longitude) // 현재 위치
            };

            // 지도 생성
            map = new googleMaps.Map($('#main-map')[0], mapOptions);
            // 스푼 마커 이미지
            // spoon = '../img/spoon_red.png';

            initSort();
            initLatestRest();
        }
        else if ($('#recommend-rest').hasClass('active')) {

            var mapOptions = {
                zoom: 16,
                scrollwheel: false,
                center: new googleMaps.LatLng(contentsRecommend[0].lat, contentsRecommend[0].lng)
            };

            map = new googleMaps.Map($('#main-map')[0], mapOptions);
            // spoon = '../img/spoon_blue.png';

            for (i = 0; i < contentsRecommend.length; i++) {
                marker = new googleMaps.Marker({
                    position: new googleMaps.LatLng(contentsRecommend[i].lat, contentsRecommend[i].lng),
                    map: map,
                    icon: '../img/insert/blue-dot.png'
                });

                googleMaps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        infoWindow.setContent(contentsRecommend[i].title);
                        infoWindow.open(map, marker);
                    }
                })(marker, i));
            }

            initRecommend(contentsRecommend);
        }
    }).catch(function (error) {
        console.error(error);
    });
}

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
            console.log('주변 맛집');
            getLocation();
        }
        else {
            console.log('추천 맛집');
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

        $(this).parent('.card-contents-sort').find('div').removeClass('active');
        $(this).addClass('active');

        initLatestRest();
    });

    $('#sort-article').on('click', function () {
        if ($(this).hasClass('active')) {
            return;
        }

        $(this).parent('.card-contents-sort').find('div').removeClass('active');
        $(this).addClass('active');

        initArticleRest();
    });
}

function initLatestRest() {
    $.ajax({
        url: '/api/cock/rest/latest',
        success: function (result) {
            initNearby(result);

            // 마커 추가
            for (i = 0; i < result.length; i++) {
                marker = new googleMaps.Marker({
                    position: new googleMaps.LatLng(result[i].lat, result[i].lng),
                    map: map,
                    icon: '../img/insert/red-dot.png'
                });

                // 마커 클릭시 타이틀 팝업
                googleMaps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        infoWindow.setContent(result[i].name);
                        infoWindow.open(map, marker);
                    }
                })(marker, i));
            }
        }
    });
}

function initArticleRest() {
    $.ajax({
        url: '/api/cock/rest/article',
        success: function (result) {
            initNearby(result);

            for (i = 0; i < result.length; i++) {
                marker = new googleMaps.Marker({
                    position: new googleMaps.LatLng(result[i].lat, result[i].lng),
                    map: map,
                    icon: '../img/insert/red-dot.png'
                });

                googleMaps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        infoWindow.setContent(result[i].name);
                        infoWindow.open(map, marker);
                    }
                })(marker, i));
            }
        }
    });
}

// 주변 맛집 리스트
function initNearby(contentsNearby) {
    $('.contents-nearby').empty();

    var contentsTpl = require('../template/main/card-contents-list.hbs');

    for (var i = 0; i < contentsNearby.length; i++) {
        var nearbyHtml = contentsTpl(contentsNearby[i]);

        $('.contents-nearby').append(nearbyHtml);
    }

    // 리스트 클릭하면 상세 페이지로 이동
    $('.card-contents-list > li').on('click', function () {
        goDetail($(this).attr('rid'));
    });

    clkFavorite();
    clkTag();
    hoverContents();
}

// 추천 맛집 리스트
function initRecommend(contentsRecommend) {
    $('.contents-recommend').empty();

    var contentsTpl = require('../template/main/card-contents-list.hbs');

    for (var i = 0; i < contentsRecommend.length; i++) {
        var recommendHtml = contentsTpl(contentsRecommend[i]);

        $('.contents-recommend').append(recommendHtml);
    }

    clkFavorite();
    clkTag();
    hoverContents();
}

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
function signedInFavorite() {
    $('.card-contents-favorite i').on('click', function (event) {
        event.stopPropagation();

        if ($(this).hasClass('fa-star-o')) {
            $(this).removeClass('fa-star-o');
            $(this).addClass('fa-star');
            alert('즐겨찾기에 추가되었습니다.');
            // 서버에서 즐겨찾기 저장 구현 필요함
        }
        else {
            $(this).removeClass('fa-star');
            $(this).addClass('fa-star-o');
            alert('즐겨찾기에서 삭제되었습니다.');
            // 서버에서 즐겨찾기 삭제 구현 필요함
        }
    });
}

function clkTag() {
    $('.card-contents-tags > li').on('click', function (event) {
        event.stopPropagation();
        
        // 태그 클릭으로 검색 구현 필요함
        alert('태그 클릭되었음'); // 임시
    })
}

var mainColor = '#f99595';

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
            spoon = '../img/insert/blue-dot.png'
        }
        else if ($(this).parents('#recommend-rest-contents').hasClass('active')) {
            spoon = '../img/insert/red-dot.png'
        }

        marker = new googleMaps.Marker({
            position: new googleMaps.LatLng(myLatLng),
            map: map,
            icon: spoon
        });

        infoWindow.setContent(iwTitle);
        infoWindow.open(map, marker);

    });

    $('.card-contents-list > li').on('mouseleave', function () {
        var cardContents = $(this).find('.card-contents');

        cardContents.find('.card-contents-title').css('color', '#5e5e5e');
        cardContents.find('.card-contents-count').css('color', '#5e5e5e');

        marker.setMap(null);
    });

    $('.card-contents-tags > li').on('mouseover', function () {
        $(this).css('color', mainColor);
    });

    $('.card-contents-tags > li').on('mouseout', function () {
        $(this).css('color', '#5e5e5e');
    });
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

/* 구글 지도에 원 그리기
var circles = new googleMaps.Circle({
                center : mapOptions.center,
                // 반지름 (m)
                radius: 500,
                // 외곽선 두께
                strokeWeight: 1,
                // 외곽선 색상
                strokeColor: '#FF7E5F',
                // 외곽선 불투명도 (0~1)
                strokeOpacity: 0.7,
                // 외곽선 스타일
                strokeStyle: 'dashed',
                // 원 내부 색상
                fillColor: '#FF7E5F',
                // 원 내부 불투명도 (0~1)
                fillOpacity: 0.2
            });

            circles.setMap(map);
*/