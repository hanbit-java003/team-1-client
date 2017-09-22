require('bootstrap');
require('../less/main.less');
var hello = require('./sample/hello');

$('.say-hello').on('click', function() {
    alert(hello.hello($('#txt-hello').val()));
});

$('.goto-sub').on('click', function() {
    location.href = 'sub.html';
});

var loadGoogleMapsApi = require('load-google-maps-api-2');

loadGoogleMapsApi.key = 'AIzaSyDmSxIrhoC4OAiGOtO6ddcFCwSMRbgfPGs';
loadGoogleMapsApi.language = 'ko';
loadGoogleMapsApi.version = '3';

loadGoogleMapsApi().then(function (googleMaps) {
    console.log(googleMaps);

    var location = [
        ['고라멘', 37.555344, 126.932692, 1],
        ['미분당', 37.556792, 126.933534, 2],
        ['조선의육개장', 37.557007, 126.935057, 3],
        ['마루가메제면 신촌점', 37.555667, 126.936178, 4],
        ['털보고된이 신촌점', 37.558257, 126.934696, 5],
        ['크리스터치킨 신촌점', 37.558037, 126.934715, 6]
    ];

    var mapOptions = {
        zoom: 16,
        scrollwheel: false,
        center: new googleMaps.LatLng(location[1][1], location[1][2])
    };

    var map = new googleMaps.Map($('#main-map')[0], mapOptions);

    var infowindow = new googleMaps.InfoWindow();

    var marker, i;
    var spoon = '../img/marker-spoon.png';

    for (i=0; i<location.length; i++) {
        marker = new googleMaps.Marker({
            position: new googleMaps.LatLng(location[i][1], location[i][2]),
            map: map,
            title: location[i][0],
            icon: spoon
        });
        googleMaps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent(location[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
}).catch(function (error) {
    console.error(error);
});

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