require('bootstrap');
require('../less/main.less');

var common = require('./common.js');

var loadGoogleMapsApi = require('load-google-maps-api-2');

var cardContentsModel = require('./model/card-contents-list');

function initMainMap() {
    loadGoogleMapsApi.key = 'AIzaSyDmSxIrhoC4OAiGOtO6ddcFCwSMRbgfPGs';
    loadGoogleMapsApi.language = 'ko';
    loadGoogleMapsApi.version = '3';

    loadGoogleMapsApi().then(function (googleMaps) {
        // console.log(googleMaps);

        var mapOptions = {
            zoom: 16,
            scrollwheel: false,
            center: new googleMaps.LatLng(cardContentsModel[3].lat, cardContentsModel[3].lng)
        };

        var map = new googleMaps.Map($('#main-map')[0], mapOptions);
        var infowindow = new googleMaps.InfoWindow();

        var marker, i;
        var spoon = '../img/spoon/spoon_220_20_60.png';

        for (i = 0; i < cardContentsModel.length; i++) {
            marker = new googleMaps.Marker({
                position: new googleMaps.LatLng(cardContentsModel[i].lat, cardContentsModel[i].lng),
                map: map,
                icon: spoon
            });
            googleMaps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infowindow.setContent(cardContentsModel[i].title);
                    infowindow.open(map, marker);
                }
            })(marker, i));
        }
    }).catch(function (error) {
        console.error(error);
    });
}

initMainMap();

function initCardContents(cardContentsModel) {
    $('.card-contents-list').empty();

    var template = require('../template/card-contents-list.hbs');

    for (var i = 0; i < cardContentsModel.length; i++) {
        var cardHtml = template(cardContentsModel[i]);

        $('.contents-nearby').append(cardHtml);
    }

    // 리스트 클릭하면 상세 페이지로 이동
    $('.card-contents-list > li').on('click', function () {
        goDetail($(this).attr('uid'));
    });
}

function goDetail(uid) {
    location.href = 'detail.html?uid=' + uid;
}

initCardContents(cardContentsModel);

$('.card-tab-btns > li').on('click', function () {
    if ($(this).hasClass('active')) {
        return;
    }

    var tabIndex = $(this).index();

    // 주변 맛집 버튼 / 추천 맛집 버튼
    var tabBtns = $(this).parent('.card-tab-btns').find('li');
    tabBtns.removeClass('active');
    $(tabBtns[tabIndex]).addClass('active');

    // 주변 맛집 컨텐츠 / 추천 맛집 컨텐츠
    var tabContents = $(this).parents('.main-card-tab').find('.card-tab-contents > li');
    tabContents.removeClass('active');
    $(tabContents[tabIndex]).addClass('active');

});

$('#btn-join-test').on('click', function () {
    location.href = 'join.html';
});

$('#btn-join-food-test').on('click', function () {
    location.href = 'join-food.html';
});

