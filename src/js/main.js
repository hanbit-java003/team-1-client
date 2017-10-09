require('bootstrap');
require('../less/main.less');

var common = require('./common');
var loadGoogleMapsApi = require('load-google-maps-api-2');

// 주변 맛집 모델
var contentsNearby = require('./model/card-contents-nearby');
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

function initMainMap(position) {
    loadGoogleMapsApi().then(function (googleMaps) {

        var infowindow = new googleMaps.InfoWindow();
        var marker;
        var i;

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
            var map = new googleMaps.Map($('#main-map')[0], mapOptions);
            // 스푼 마커 이미지
            var spoon = '../img/spoon_red.png';

            // 마커 추가
            for (i = 0; i < contentsNearby.length; i++) {
                marker = new googleMaps.Marker({
                    position: new googleMaps.LatLng(contentsNearby[i].lat, contentsNearby[i].lng),
                    map: map,
                    icon: spoon
                });

                // 마커 클릭시 타이틀 팝업
                googleMaps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        infowindow.setContent(contentsNearby[i].title);
                        infowindow.open(map, marker);
                    }
                })(marker, i));
            }

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
        }
        else if ($('#recommend-rest').hasClass('active')) {
            // 옵션을 따로 설정해서 mapOptions 변수에 담았음
            var mapOptions = {
                // 지도 확대 비율
                zoom: 16,
                // 지도 스크롤 설정 off
                scrollwheel: false,
                // 지도 센터 설정
                center: new googleMaps.LatLng(contentsRecommend[0].lat, contentsRecommend[0].lng)
            };

            // 지도 생성
            var map = new googleMaps.Map($('#main-map')[0], mapOptions);
            // 스푼 마커 이미지
            var spoon = '../img/spoon_blue.png';

            // 마커 추가
            for (i = 0; i < contentsRecommend.length; i++) {
                marker = new googleMaps.Marker({
                    position: new googleMaps.LatLng(contentsRecommend[i].lat, contentsRecommend[i].lng),
                    map: map,
                    icon: spoon
                });

                // 마커 클릭시 타이틀 팝업
                googleMaps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        infowindow.setContent(contentsRecommend[i].title);
                        infowindow.open(map, marker);
                    }
                })(marker, i));
            }
        }
    }).catch(function (error) {
        console.error(error);
    });
}

function clkTab() {
    // 주변 맛집 / 추천 맛집 버튼 클릭
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

initSort();

// 정렬 기준 버튼 클릭 이벤트
function clkSort() {
    $('.card-contents-sort div').on('click', function () {
        if ($(this).hasClass('active')) {
            return;
        }

        $(this).parent('.card-contents-sort').find('div').removeClass('active');
        $(this).addClass('active');
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
        goDetail($(this).attr('uid'));
    });

    // clkFavorite();
    // hoverContents();
}

initNearby(contentsNearby);

// 추천 맛집 리스트
function initRecommend(contentsRecommend) {
    $('.contents-recommend').empty();

    var contentsTpl = require('../template/main/card-contents-list.hbs');

    for (var i = 0; i < contentsRecommend.length; i++) {
        var recommendHtml = contentsTpl(contentsRecommend[i]);

        $('.contents-recommend').append(recommendHtml);
    }

    // clkFavorite();
    // hoverContents();
}

initRecommend(contentsRecommend);

// 즐겨찾기 버튼 클릭 이벤트
function clkFavorite() {
    $('.card-contents-favorite i').on('click', function (event) {
        event.stopPropagation();

        if ($(this).hasClass('fa-star-o')) {
            $(this).removeClass('fa-star-o');
            $(this).addClass('fa-star');
            alert('즐겨찾기에 추가되었습니다.');
        }
        else {
            $(this).removeClass('fa-star');
            $(this).addClass('fa-star-o');
            alert('즐겨찾기에서 삭제되었습니다.');
        }
    });
}

clkFavorite();

function hoverContents() {
    $('.card-contents-list > li').on('mouseenter', function () {
        $(this).find('.card-contents').css('color', '#FF7E5F');

        var location = $(this).find('.locationContainer');
        var lat = location.attr('lat');
        var lng = location.attr('lng');

        var myLatLng = {lat: lat, lng: lng};

        console.log(myLatLng);
    });

    $('.card-contents-list > li').on('mouseleave', function () {
        $(this).find('.card-contents').css('color', '#5e5e5e');
    });
}

// hoverContents();

function goDetail(uid) {
    location.href = 'detail.html?uid=' + uid;
}

$('#btn-join-test').on('click', function () {
    location.href = 'join.html';
});

$('#btn-join-food-test').on('click', function () {
    location.href = 'join-food.html';
});