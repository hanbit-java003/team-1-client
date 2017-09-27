require('bootstrap');
require('../less/insert.less');

var common = require('./common');
var loadGoogleMapsApi = require('load-google-maps-api-2');

loadGoogleMapsApi.key = 'AIzaSyDfasnDjKf4JZvuEqVnp3N7Ezv3Cm-qAII';
loadGoogleMapsApi.language = 'ko';
loadGoogleMapsApi.version = '3';

var location = [{
    lat: 37.552331, lng: 126.937588, title: 'hello1'
}, {
    lat: 37.552777, lng: 126.937314, title: 'hello2'
}, {
    lat: 37.552560, lng: 126.937043, title: 'hello3'
}, {
    lat: 37.552188, lng: 126.937199, title: 'hello4'
}];

loadGoogleMapsApi().then(function(_googleMaps) {
    googleMaps = _googleMaps;
    initMap();

}).catch(function(error) {
    console.error(error);
});

var map;
var googleMaps;
function initMap() {
    map = new googleMaps.Map($('#google-map')[0], {
        center: {lat: 37.552331, lng: 126.937588},
        zoom: 16,
        scrollwheel: false
    });

    addMarkers();

    map.addListener('click', function (e) {
        selectMap(e.latLng);
        $('#lat').val(e.latLng.lat);
        $('#lng').val(e.latLng.lng);
        //주변 가게 가져오기 구현 필요
        deleteMarkers();
        addMarkers();
        menuLockInput(false);
    });

}

$('#locationCheck').on('click', function () {
    $('body').append('<div class="overlay-layer dark-layer"></div>');
    $('body').css('overflow', 'hidden');

    var template = require('../template/insert/location-check.hbs');
    var html = template(location);

    $('body').append(html);
    $('.location-check').show();

    $('.check-cancel').on('click', function () {
        clearDarkLayer();
        menuLockInput(false);
    });

    $('.check-new').on('click', function () {
        clearDarkLayer();
        menuLockInput(false);
    });

    $('.check-around-store > li').on('click', function () {
        var index = $(this).index();
        var lo = location[index];

        $('#lat').val(lo.lat);
        $('#lng').val(lo.lng);
        $('#kk-store-title').val(lo.title);
        menuLockInput(true);

        selectMap(lo);

        clearDarkLayer();
    });
});

function menuLockInput(lock) {
    if (lock) {
        $('#lat').attr('disabled', 'true');
        $('#lng').attr('disabled', 'true');
        $('#kk-store-title').attr('disabled', 'true');
    }
    else {
        $('#lat').removeAttr('disabled');
        $('#lng').removeAttr('disabled');
        $('#kk-store-title').removeAttr('disabled');
    }
}

function clearDarkLayer() {
    $('.overlay-layer.dark-layer').remove();
    $('.location-check').remove();
    $('body').css('overflow', 'auto');
}

// 주변마커 가지고 있는 배열
var markers = [];

// 지도에 마커를 찍는 함수
function addMarkers() {
    for (var i=0; i<location.length; i++) {
        var marker = new googleMaps.Marker({
            position: location[i],
            map: map,
            title: location.title,
            icon: '../img/insert/blue-dot.png'
        });
        markers.push(marker);
    }
}

// 마커를 없에고 배열에도 없에는 함수
function deleteMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}

var clkMarker; // 클릭된 마커가 저장되는 변수
function selectMap(latLng) {
    if (clkMarker) {
        clkMarker.setMap(null);
    }

    clkMarker = new googleMaps.Marker({
        position: latLng,
        map: map,
        icon: '../img/insert/red-dot.png'
    });

    map.panTo(latLng);
}


// 메뉴
var images = [];
$('#kk-btn-background').on('change', function() {
    if (this.files.length === 0) {
        return;
    }

    for (var i=0; i<this.files.length; i++) {
        var file = this.files[i];

        if (!file.type.startsWith('image/')) {
            alert('이미지 파일이 아닙니다.');
            return;
        }
    }

    var fileReader = new FileReader();

    fileReader.onload = function(event) {
        var image = new Image();
        image.src = event.target.result;

        image.onload = function() {
            images.push(image);
            setImage();
        };
    };

    fileReader.readAsDataURL(this.files[0]);
});

function setImage() {
    $('.carousel-inner').empty();
    $('#kk-btn-background').val('');

    if (images[0]) {
        images[0].active = true;
    }

    var imgs = [];
    $.each(images, function () {
        var width = this.width;
        var height = this.height;

        if (width > 640) {
            var ratio = 640/width;
            width = 640;

            height = height * ratio;
        }

        imgs.push({
            active: this.active,
            src: this.src,
            width: width,
            height: height
        })
    });

    var template = require('../template/insert/kk-preview.hbs');
    var html = template(imgs);
    $('.carousel-inner').append(html);
}

$('.btn-menu-plus').on('click', function () {
    var html = require('../template/insert/menu-tag.hbs');
    $('.background-preview').append(html);
    menuDragEvent();
});

function menuDragEvent() {
    var x = 0, y = 0;

    $('.background-preview > .menu-tag').on('dragstart', function (e) {
        console.log('start');
        x = e.pageX - x;
        y = e.pageY - y;
        console.log('page1 - ' + x + ' : ' + y );
    });

    $('.background-preview > .menu-tag').on('dragend', function (e) {
        console.log('end');
        x = e.pageX - x;
        y = e.pageY - y;
        if (x < 0) {
            x = 0;
        }
        if (y < 0) {
            y = 0;
        }
        if (x > 460) {
            x = 460;
        }
        if (y > 430) {
            y = 430;
        }
        $(this).css({
            'top': y + 'px',
            'left': x + 'px'
        });
    });
}