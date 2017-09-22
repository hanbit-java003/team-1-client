require('bootstrap');
require('../less/insert.less');
require('jquery-ui');

var loadGoogleMapsApi = require('load-google-maps-api-2');

loadGoogleMapsApi.key = 'AIzaSyDfasnDjKf4JZvuEqVnp3N7Ezv3Cm-qAII';
loadGoogleMapsApi.language = 'ko';
loadGoogleMapsApi.version = '3';

var $googleMaps;
var areaMap;

loadGoogleMapsApi().then(function(googleMaps) {
    $googleMaps = googleMaps;
    areaMap = new googleMaps.Map($('#google-map')[0], {
        center: {lat: 37.552331, lng: 126.937588},
        zoom: 16,
        scrollwheel: false
    });
    var marker = new googleMaps.Marker({
        position: {lat: 37.552331, lng: 126.937588},
        map: areaMap,
        title: '여기가 어디?'
    });
}).catch(function(error) {
    console.error(error);
});

$('.btn-menu-plus').on('click', function () {
    var html = require('../template/insert/menu-tag.hbs');
    $('#background-preview').append(html);
    menuDragEvent();
});

function menuDragEvent() {
    var x = 0, y = 0;

    $('#background-preview > .menu-tag').on('dragstart', function (e) {
        console.log('start');
        x = e.pageX - x;
        y = e.pageY - y;
        console.log('page1 - ' + x + ' : ' + y );
    });

    $('#background-preview > .menu-tag').on('dragend', function (e) {
        console.log('end');
        x = e.pageX - x;
        y = e.pageY - y;
        $(this).css({
            'top': y + 'px',
            'left': x + 'px'
        });
    });
}