require('bootstrap');
require('../less/insert/insert.less');

var common = require('./common');
var loadGoogleMapsApi = require('load-google-maps-api-2');
var UrlSearchParams = require('url-search-params');
var params = new UrlSearchParams(location.search);

loadGoogleMapsApi.key = 'AIzaSyDfasnDjKf4JZvuEqVnp3N7Ezv3Cm-qAII';
loadGoogleMapsApi.language = 'ko';
loadGoogleMapsApi.version = '3';

// 임시 모델
var model = {
    rid: 1,
    lat: 37.552320,
    lng: 126.937588,
    name: 'title',
    status: '',
    article: {
        article_id: 0,
        comment: 'comment',
        status: '',
        imgs: [
            {
                img_id: 0,
                path: '../img/insert/duch.jpg'
            },
            {
                img_id: 1,
                path: '../img/insert/jeju.jpg'
            }
        ]
    },
    menu: [
        {
            id: 0,
            img_id: 0,
            x: 10,
            y: 10,
            menu: 'img0_menu0'
        },
        {
            id: 0,
            img_id: 1,
            x: 10,
            y: 10,
            menu: 'img1_menu0'
        },
        {
            id: 1,
            img_id: 1,
            x: 40,
            y: 40,
            menu: 'img1_menu1'
        }
    ],
    tag: [
        {
            tag_id: 0,
            tag: 'tag1'
        },
        {
            tag_id: 1,
            tag: 'tag2'
        }
    ]
};

// 현재위치
var latLng = {};
// 메뉴
var images = [];

function getLocation() {
    // GPS 지원
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            latLng.lat = position.lat;
            latLng.lng = position.lng;
        }, function (error) { // 위치 찾기 에러 시 콜백
            console.error(error);
        }, { // 옵션
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: Infinity
        });
    }
    else {
        // GPS 지원 X
        alert('GPS를 지원하지 않습니다.');
    }
}

// 시작
if (!params.get('rId')) {
    init();
}
else {
    $.ajax({
        url: '/api/cock/insert/' + params.get('rId'),
        success: function(result) {
            model = result;
            init();
        }
    });
}

function init() {
    getLocation();

    if (model.rid) {
        $('#lat').val(model.lat);
        $('#lng').val(model.lng);
        $('#cc-rest-name').val(model.name);
        $('#lat').attr('disabled', 'true');
        $('#lng').attr('disabled', 'true');
        $('#cc-rest-name').attr('disabled', 'true');
        $('#locationCheck').hide();
        checkFlag = true;

        latLng = {
            lat: model.lat,
            lng: model.lng
        }
        $('#cc-comment-textarea').val(model.article.comment);

        var tagValue = '';
        for(var i=0; i<model.tag.length; i++) {
           tagValue += model.tag[i].tag + ' ';
        }
        $('#cc-hashtag-textarea').val(tagValue);
    }

    if (model.article.imgs) {
        model.article.imgs.forEach(function (t) {
            var img = new Image();
            $(img).on('load', function () {
                images.push(img);
                setImage(img, true);

                model.menu.forEach(function (t2) {
                    if (t.img_id === t2.img_id) {
                        t2.x += 'px';
                        t2.y += 'px';
                        var template = require('../template/insert/menu-tag.hbs');
                        var html = template(t2);
                        var ul = $('li.cc-preview-img:last-child .background-preview');
                        $(ul).append(html);

                        menuEvent(ul);
                    }
                });
            });
            img.src = t.path;
        });
    }

    loadGoogleMapsApi().then(function(_googleMaps) {
        googleMaps = _googleMaps;
        initMap();
    }).catch(function(error) {
        console.error(error);
    });

}

// 지도 초기화
var map;
var googleMaps;
function initMap() {
    map = new googleMaps.Map($('#google-map')[0], {
        center: {lat:latLng.lat, lng: latLng.lng},
        zoom: 16,
        scrollwheel: false
    });

    addMarkers();

    if (model.rid) {
        new googleMaps.Marker({
            position: latLng,
            map: map,
            title: model.title,
            icon: '../img/insert/red-dot.png'
        });
    }

    if (!model.rid) {
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
}

// 중복 확인
var checkFlag = false;
$('#locationCheck').on('click', function () {
    $('body').append('<div class="overlay-layer dark-layer"></div>');
    $('body').css('overflow', 'hidden');

    var template = require('../template/insert/location-check.hbs');
    var html = template(loc);

    $('body').append(html);
    $('.location-check').show();

    $('.check-cancel').on('click', function () {
        clearDarkLayer();
        menuLockInput(false);
    });

    $('.check-new').on('click', function () {
        clearDarkLayer();
        menuLockInput(false);
        checkFlag = true;
    });

    $('.check-around-store > li').on('click', function () {
        var index = $(this).index();
        var lo = loc[index];

        $('#lat').val(lo.lat);
        $('#lng').val(lo.lng);
        $('#cc-rest-name').val(lo.title);
        menuLockInput(true);

        selectMap(lo);

        clearDarkLayer();
        checkFlag = true;
    });
});

function menuLockInput(lock) {
    if (lock) {
        $('#lat').attr('disabled', 'true');
        $('#lng').attr('disabled', 'true');
        $('#cc-rest-name').attr('disabled', 'true');
    }
    else {
        $('#lat').removeAttr('disabled');
        $('#lng').removeAttr('disabled');
        $('#cc-rest-name').removeAttr('disabled');
    }
}

function clearDarkLayer() {
    $('.overlay-layer.dark-layer').remove();
    $('.location-check').remove();
    $('body').css('overflow', 'auto');
}

// 주변마커 가지고 있는 배열
var markers = [];

// 주변 위치를 담는 배열
var loc = [];

// 지도에 마커를 찍는 함수
function addMarkers() {
    // 주변 위치 가져오기
    //
    //$.ajax();
    //
    loc = [{
        lat: 37.552331, lng: 126.937588, title: 'hello1'
    }, {
        lat: 37.552777, lng: 126.937314, title: 'hello2'
    }, {
        lat: 37.552560, lng: 126.937043, title: 'hello3'
    }, {
        lat: 37.552188, lng: 126.937199, title: 'hello4'
    }];

    for (var i=0; i<loc.length; i++) {
        var marker = new googleMaps.Marker({
            position: loc[i],
            map: map,
            title: loc.title,
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

$('#cc-btn-background').on('change', function() {
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

    if (images.length + this.files.length > 5) {
        alert('최대 올릴 수 있는 사진은 5개 입니다.');
        return;
    }

    for (var i=0; i<this.files.length; i++) {
        var file = this.files[i];

        var fileReader = new FileReader();

        fileReader.onload = function(event) {
            var image = new Image();
            image.src = event.target.result;

            image.onload = function() {
                images.push(image);
                setImage(image, false);
            };
        };

        fileReader.readAsDataURL(file);
    }
});

function setImage(image, save) {
    var width = image.width;
    var height = image.height;

    if (width > 360) {
        var ratio = 360/width;
        width = 360;

        height = height * ratio;
    }

    var imgTemp = {
        src: image.src,
        width: width,
        height: height,
        save: save
    };

    var template = require('../template/insert/preview-img.hbs');
    var html = template(imgTemp);
    $('.cc-preview').append(html);

    $('.cc-preview > li:last-child .cc-btn-delete').on('click', function() {
        var img = $(this).parent('li');

        var saved = img.attr('saved') === 'true';
        var savedPhotoCount = model.imgs ? model.imgs.length : 0

        var index = saved ? img.index() : img.index() - savedPhotoCount;

        if (saved) {
            model.imgs[index] = '_removed_';
            img.hide();
        }
        else {
            images.splice(index, 1);
            img.remove();
        }

        if (!images.length) {
            console.log('clear');
            $('#cc-btn-background').val('');
        }
    });

    $('.cc-preview > li:last-child .background-preview').on('dblclick', function () {
        var menu = {
            x: 0 + 'px',
            y: 0 + 'px',
            menu: ''
        };

        var template = require('../template/insert/menu-tag.hbs');
        var html = template(menu);
        $(this).append(html);

        menuEvent(this);
    });
}

// 메뉴 이벤트
function menuEvent(preview) {
    var drag = $(preview).find('li').last();

    var x = $(drag).position().left; // 부모 기준으로 위치값
    var y = $(drag).position().top;
    var lX = $(preview).width();
    var lY = $(preview).height();

    $(drag).on('dragstart', function (e) {
        console.log('start');
        x = e.pageX - x;
        y = e.pageY - y;
    });

    $(drag).on('dragend', function (e) {
        console.log('end');
        x = e.pageX - x;
        y = e.pageY - y;
        if (x < 0) {
            x = 0;
        }
        if (y < 0) {
            y = 0;
        }
        if (x > lX - 100) {
            x = lX - 100;
        }
        if (y > lY - 21) {
            y = lY - 21;
        }
        $(drag).css({
            'top': y + 'px',
            'left': x + 'px'
        });
    });

    $(drag).find('.menu-btn-delete').on('click', function () {
        $(this).parent('.menu-tag-cage').parent('li').remove();
    });
}