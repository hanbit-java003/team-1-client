require('bootstrap');
require('../less/insert.less');

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

loadGoogleMapsApi().then(function(googleMaps) {
    initMap(googleMaps);

}).catch(function(error) {
    console.error(error);
});

function initMap(googleMaps) {
    var map = new googleMaps.Map($('#google-map')[0], {
        center: {lat: 37.552331, lng: 126.937588},
        zoom: 16,
        scrollwheel: false
    });

    addMarkers(googleMaps, map);

    map.addListener('click', function (e) {
        selectMap(googleMaps, e.latLng, map);
        //주변 가게 가져오기 구현 필요
        deleteMarkers();
        addMarkers(googleMaps, map);
    });

}
// 주변마커 가지고 있는 배열
var markers = [];

// 지도에 마커를 찍는 함수
function addMarkers(googleMaps, map) {
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

// 마커 전체에 명령을 주는 함수
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

// 마커를 없에고 배열에도 없에는 함수
function deleteMarkers() {
    setMapOnAll(null);
    markers = [];
}

var clkMarker; // 클릭된 마커가 저장되는 변수
function selectMap(googleMaps, latLng, map) {
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