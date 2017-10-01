require('bootstrap');
require('../less/main.less');

var common = require('./common.js');

var loadGoogleMapsApi = require('load-google-maps-api-2');

// 주변 맛집 카드 모델
var cardContentsNearby = require('./model/card-contents-nearby');
// 추천 맛집 카드 모델
var cardContentsRecommend = require('./model/card-contents-recommend');

// 인증키 - ch
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
            initContentsNearby(cardContentsNearby);

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
            for (i = 0; i < cardContentsNearby.length; i++) {
                marker = new googleMaps.Marker({
                    position: new googleMaps.LatLng(cardContentsNearby[i].lat, cardContentsNearby[i].lng),
                    map: map,
                    icon: spoon
                });

                // 마커 클릭시 타이틀 팝업
                googleMaps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        infowindow.setContent(cardContentsNearby[i].title);
                        infowindow.open(map, marker);
                    }
                })(marker, i));
            }
        }
        else if ($('#recommend-rest').hasClass('active')) {
            initContentsRecommend(cardContentsRecommend);

            // 옵션을 따로 설정해서 mapOptions 변수에 담았음
            var mapOptions = {
                // 지도 확대 비율
                zoom: 16,
                // 지도 스크롤 설정 off
                scrollwheel: false,
                // 지도 센터 설정
                center: new googleMaps.LatLng(cardContentsRecommend[0].lat, cardContentsRecommend[0].lng)
            };

            // 지도 생성
            var map = new googleMaps.Map($('#main-map')[0], mapOptions);
            // 스푼 마커 이미지
            var spoon = '../img/spoon_blue.png';

            // 마커 추가
            for (i = 0; i < cardContentsRecommend.length; i++) {
                marker = new googleMaps.Marker({
                    position: new googleMaps.LatLng(cardContentsRecommend[i].lat, cardContentsRecommend[i].lng),
                    map: map,
                    icon: spoon
                });

                // 마커 클릭시 타이틀 팝업
                googleMaps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        infowindow.setContent(cardContentsRecommend[i].title);
                        infowindow.open(map, marker);
                    }
                })(marker, i));
            }
        }
    }).catch(function (error) {
        console.error(error);
    });
}

// 주변 맛집 리스트
function initContentsNearby(cardContentsNearby) {
    $('.contents-nearby').empty();

    var template = require('../template/card-contents-list.hbs');

    for (var i = 0; i < cardContentsNearby.length; i++) {
        var cardHtml = template(cardContentsNearby[i]);

        $('.contents-nearby').append(cardHtml);
    }

    // 즐겨찾기 클릭 이벤트
    clkFavorite();

    // 리스트 클릭하면 상세 페이지로 이동
    $('.card-contents-list > li').on('click', function () {
        goDetail($(this).attr('uid'));
    });
}

// 추천 맛집 리스트
function initContentsRecommend(cardContentsRecommend) {
    $('.contents-recommend').empty();

    var template = require('../template/card-contents-list.hbs');

    for (var i = 0; i < cardContentsRecommend.length; i++) {
        var cardHtml = template(cardContentsRecommend[i]);

        $('.contents-recommend').append(cardHtml);
    }

    // 즐겨찾기 클릭 이벤트
    clkFavorite();
}

function goDetail(uid) {
    location.href = 'detail.html?uid=' + uid;
}

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

    // 마커를 다시 찍기 위해 또 불러옴
    if ($('#nearby-rest').hasClass('active')) {
        getLocation();
    }
    else if ($('#recommend-rest').hasClass('active')) {
        initMainMap();
    }
});

// 즐겨찾기 클릭 이벤트
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
            $(this).css('color', '#FF7E5F');
            alert('즐겨찾기에서 삭제되었습니다.');
        }
    })
}

$('#btn-join-test').on('click', function () {
    location.href = 'join.html';
});

$('#btn-join-food-test').on('click', function () {
    location.href = 'join-food.html';
});

