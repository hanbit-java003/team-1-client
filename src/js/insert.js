require('bootstrap');
require('../less/insert/insert.less');
require('./insert/jquery.tagsinput');

var common = require('./common');
var loadGoogleMapsApi = require('load-google-maps-api-2');
var UrlSearchParams = require('url-search-params');
var params = new UrlSearchParams(location.search);

var _ = require('lodash');
_.move = require('lodash-move').default;

loadGoogleMapsApi.key = 'AIzaSyDfasnDjKf4JZvuEqVnp3N7Ezv3Cm-qAII';
loadGoogleMapsApi.language = 'ko';
loadGoogleMapsApi.version = '3';

// 임시 모델
/*var model = {
    rid: 1,
    lat: 37.552320,
    lng: 126.937588,
    name: 'title',
    status: '',
    articles: [{
        articleId: 0,
        comment: 'comment',
        status: '',
        uid: '3HgHeOlylIZR',
        imgs: [
            {
                imgId: 0,
                path: '../img/insert/duch_0.jpg'
            },
            {
                imgId: 1,
                path: '../img/insert/jeju_1.jpg'
            }
        ]
    }],
    menus: [
        {
            id: 0,
            imgId: 0,
            x: 10,
            y: 10,
            menu: 'img0_menu0',
            price: 1000
        },
        {
            id: 0,
            imgId: 1,
            x: 10,
            y: 10,
            menu: 'img1_menu0',
            price: 2000
        },
        {
            id: 1,
            imgId: 1,
            x: 40,
            y: 40,
            menu: 'img1_menu1',
            price: 3000
        }
    ],
    tags: [
        {
            tagId: 0,
            tag: 'tag1'
        },
        {
            tagId: 1,
            tag: 'tag2'
        }
    ]
};*/

var model = {
    articles: [{imgs: []}],
    menus: [],
    tags: []
};

// 현재위치
var latLng = {};

// hashTag 동작위한 plugin 설치
$('#cc-hashtag-textarea').tagsInput();

function getLocation() {
    // GPS 지원
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {

            if (params.get('rid') === null) {
                latLng.lat = position.coords.latitude;
                latLng.lng = position.coords.longitude;
            }

            loadGoogleMapsApi().then(function(_googleMaps) {
                googleMaps = _googleMaps;
                initMap();
            }).catch(function(error) {
                console.error(error);
            });

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
$.ajax({
    url:'/api/member/get',
    success: function (result) {
        if (!result.signedIn) {
            alert('로그인이 필요한 페이지입니다.');
            location.href= '/'; // 기본홈으로 돌려보냄.
        }

        var uid = result.uid;
        insertInit(uid);
    }
});

function insertInit(uid) {
    if (params.get('rid') === null) { // 식당 입력
        model.articles[0].uid = uid;
        init();
    }
    else if (params.get('rid') !== null && params.get('articleId') === null) { // 식당의 후기 입력
        $.ajax({
            url: '/api/cock/insert/' + params.get('rid'),
            success: function(result) {
                model = result;
                model.articles = [{
                    uid: uid,
                    imgs: []
                }];
                init();
            }
        });
    }
    else { // 식당의 후기 수정
        $.ajax({
            url: '/api/cock/insert/' + params.get('rid') + '/' + params.get('articleId'),
            success: function(result) {
                model = result;
                model.articles[0].uid = uid;
                init();
            }
        });
    }
}

function init() {
    // model.articles[0].uid = '3HgHeOlylIZR'; // 임시 TEST용

    if (params.get('rid') !== null) {
        $('#cc-lat').val(model.lat);
        $('#cc-lng').val(model.lng);
        $('#cc-rest-name').val(model.name);
        menuLockInput(true);
        $('#locationCheck').hide();
        checkFlag = true;

        latLng.lat = parseFloat(model.lat);
        latLng.lng = parseFloat(model.lng);

        if (params.get('articleId') !== null) {
            var textarea = $('#cc-comment-textarea');
            $(textarea).val(model.articles[0].comment);
            $(textarea).val().replace(/<br\/>/ig, '\n');
            $(textarea).val().replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
        }

        var tagValue = '';
        if (model.tags) {
            for(var i=0; i<model.tags.length; i++) {
                tagValue += model.tags[i].tag + ', ';
            }
        }

        $('#cc-hashtag-textarea').importTags(tagValue);

    }

    if (params.get('articleId') !== null) {
        imgNum = model.articles[0].imgs.length;

        model.articles[0].imgs.forEach(function (t) {
            var addPreview = '<li class="cc-preview-img" img-num="' + t.imgId + '" saved="true"></li>'
            $('.cc-preview').append(addPreview);

            var img = new Image();
            $(img).on('load', function () {
                setImage(img, t.imgId);

                model.menus.forEach(function (t2) {
                    if (t.imgId === t2.imgId) {
                        t2.x += 'px';
                        t2.y += 'px';
                        t2.menuNum = menuNum;
                        menuNum++;

                        var template = require('../template/insert/menu-tag.hbs');
                        var html = template(t2);
                        var ul = $('.cc-preview-img[img-num=' + t2.imgId + '] .background-preview');
                        $(ul).append(html);
                        setWidth(t2.menu, $(ul).find('li[menu-num=' + t2.menuNum + ']'));

                        var template = require('../template/insert/menu-input.hbs');
                        var html = template(t2);
                        $(ul).parent('li').find('.cc-menu').append(html);

                        menuEvent(ul);
                        refMenuEvent();
                    }
                });
            });
            img.src = t.path;

        });
    }

    getLocation();
}

// 지도 초기화
var map;
var googleMaps;
function initMap() {
    map = new googleMaps.Map($('#google-map')[0], {
        center: {
            lat: latLng.lat,
            lng: latLng.lng
        },
        zoom: 16,
        scrollwheel: false
    });

    addMarkers();

    if (params.get('rid') === null) {
        map.addListener('click', function (e) {
            selectMap(e.latLng);

            $('#cc-lat').val(e.latLng.lat);
            $('#cc-lng').val(e.latLng.lng);

            latLng.lat = $('#cc-lat').val();
            latLng.lng = $('#cc-lng').val();

            //주변 가게 가져오기 구현 필요
            deleteMarkers();
            addMarkers();
            menuLockInput(false);
        });
    }
    else {
        selectMap(latLng);
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

        location.href = 'insert.html?rid=' + lo.rid;
    });
});

function menuLockInput(lock) {
    if (lock) {
        $('#cc-lat').attr('disabled', 'true');
        $('#cc-lng').attr('disabled', 'true');
        $('#cc-rest-name').attr('disabled', 'true');
    }
    else {
        $('#cc-lat').removeAttr('disabled');
        $('#cc-lng').removeAttr('disabled');
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

// 지도 주변에 마커를 찍는 함수
function addMarkers() {
    $.ajax({
        url: '/api/cock/insert/position/' + latLng.lat
           + ',' + latLng.lng + '/',
        success: function(result) {
            loc = result;
            console.log(loc);
            for (var i=0; i<loc.length; i++) {
                if (loc[i].rid !== model.rid) {
                    var marker = new googleMaps.Marker({
                        position: loc[i],
                        map: map,
                        title: loc.title,
                        icon: '../img/insert/blue-dot.png'
                    });

                    markers.push(marker);
                }
            }
        },
        error: function () {
            // 임시 TEST용
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
    });
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

var images = [];
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

        images.push(file);

        fileReader.onload = function(event) {
            var addPreview = '<li class="cc-preview-img" img-num="' + imgNum + '" saved="false"></li>'
            $('.cc-preview').append(addPreview);

            var image = new Image();
            image.src = event.target.result;

            image.onload = function() {
                setImage(image, imgNum);
                imgNum++;
            };
        };

        fileReader.readAsDataURL(file);
    }
});

// 이미지 폭 = 380px
var IMG_WIDTH = 380;
var menuNum = 0;
var imgNum = 0;
function setImage(image, num) {
    var width = image.width;
    var height = image.height;

    if (width > IMG_WIDTH) {
        var ratio = IMG_WIDTH/width;
        width = IMG_WIDTH;

        height = height * ratio;
    }

    var imgSrc = {
        src: image.src,
        width: width,
        height: height
    };

    var template = require('../template/insert/preview-img.hbs');
    var html = template(imgSrc);
    $('.cc-preview-img[img-num=' + num + ']').append(html);

    $('.cc-preview-img[img-num=' + num + '] .background-preview .cc-btn-delete').on('click', function() {
        var img = $(this).parents('li');

        var saved = img.attr('saved') === 'true';

        /*if (params.get('rid') === null || params.get('articleId') === null) {
            var savedPhotoCount = 0;
        }
        else {*/
            var savedPhotoCount = model.articles[0].imgs ? model.articles[0].imgs.length : 0
        //}

        var index = saved ? img.index() : img.index() - savedPhotoCount;

        if (saved) {
            model.articles[0].imgs[index].path = '_removed_';
            img.hide();
            $(img).find('.background-preview').remove();
        }
        else {
            images.splice(index, 1);
            img.remove();
        }
    });

    $('.cc-preview-img[img-num=' + num + '] .background-preview').on('dblclick', function () {
        var menu = {
            menuNum: menuNum,
            x: 0 + 'px',
            y: 0 + 'px',
            menu: '메뉴요',
            price: 0
        };

        menuNum++;

        var template = require('../template/insert/menu-tag.hbs');
        var html = template(menu);
        $(this).append(html);
        var template = require('../template/insert/menu-input.hbs');
        var html = template(menu);
        $(this).parent('li').find('.cc-menu').append(html);

        menuEvent(this);
        refMenuEvent();
    });

    $('.cc-preview-img[img-num=' + num + '] .cc-menu-plus').on('click', function () {
        var menu = {
            menuNum: menuNum,
            x: 0 + 'px',
            y: 0 + 'px',
            menu: '메뉴요',
            price: 0
        };

        menuNum++;

        var template = require('../template/insert/menu-tag.hbs');
        var html = template(menu);
        var tag = $(this).parent('.cc-preview-img').find('.background-preview');
        $(tag).append(html);
        var template = require('../template/insert/menu-input.hbs');
        var html = template(menu);
        $(this).parent('.cc-preview-img').find('.cc-menu').append(html);

        menuEvent(tag);
        refMenuEvent();
    });

}

// 기존 메뉴 알림 페이지 이벤트
var searchTimer;
var lastSearchTime = _.now();
function refMenuEvent() {
    $('.cc-menu li .menu-input-text2').off('input');
    $('.cc-menu li .menu-input-text2').on('input', function () {
        if (typeof model.rid === 'number') {
            clearTimeout(searchTimer);
            var delay = 500;
            var now = _.now();
            var input = $(this);
            var menuText = $(this).val();

            if (now - lastSearchTime > 1000) {
                delay = 0;
            }

            searchTimer = setTimeout(function () {
                $.ajax({
                    url:'/api/cock/insert/get/menu/' + model.rid + '/' + menuText + '/',
                    success: function (result) {
                        var refMenu = result;

                        /*var refMenu = [
                            {menu: 'asdf1', price: 100},
                            {menu: 'asdf2', price: 200},
                            {menu: 'asdf3', price: 300}
                        ];*/

                        refMenuList(input, refMenu);

                        lastSearchTime = _.now();
                    }
                });
            }, delay);

        }
    });
}

function refMenuList(input, ref) {
    var li = input.parent('li');
    if (li.find('.ref-menu')) {
        li.find('.ref-menu').empty();
    }
    var template = require('../template/insert/ref-menu.hbs');
    var html = template(ref);
    li.append(html);

    var menuNum = li.attr('menu-num');
    li.find('.ref-menu > li').on('click', function () {
        var text = $(this).find('.ref-menu-text').text();
        var price = $(this).find('.ref-menu-price').text();
        $('li[menu-num='+ menuNum +']').each(function () {
            $(this).find('.menu-input-text2').val(text);
            $(this).find('.menu-input-number2').val(price);

            $(this).find('.menu-block-text').text(text);
            $(this).find('.menu-block-number').text(price);
            setWidth(text, $(this).find('.menu-block-text'));
        });

        $(this).parent('ul').empty();
    });

    $('body').off('click');
    $('body').on('click', function (e) {
        if ($('.ref-menu').css('display') === 'block') {
            if (!$('.ref-menu').has(e.target).length) {
                $('.ref-menu').empty();
            }
        }
    });
}

// 메뉴 이벤트
function menuEvent(preview) {
    var drag = $(preview).find('.menu-tag').last(); // .menu-tag

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
        var thisWidth = $(this).width();

        x = e.pageX - x;
        y = e.pageY - y;
        if (x < 0) {
            x = 0;
        }
        if (y < 0) {
            y = 0;
        }
        if (x > lX - thisWidth) {
            x = lX - thisWidth;
        }
        if (y > lY - 21) {
            y = lY - 21;
        }
        $(drag).css({
            'top': y + 'px',
            'left': x + 'px'
        });
    });

    var eventMenuNum = $(drag).attr('menu-num');

    $(drag).find('.menu-btn-delete').on('click', function () {
        $('li[menu-num=' + eventMenuNum +']').remove();
    });

    $(preview).parent('li').find('.cc-menu > li[menu-num=' + eventMenuNum + '] .menu-input-text2').on('keyup', function(e){
        var value = $(this).val();
        setWidth(value, drag);

        $(drag).find('.menu-block-text').text(value);
    });

    $(preview).parent('li').find('.cc-menu > li[menu-num=' + eventMenuNum + '] .menu-input-number2').on('keyup', function(e){
        var value = $(this).val();
        $(drag).find('.menu-block-number').text(value);
    });
}

function setWidth(value, pos) {
    $('.cc-preview').append('<div id="virtual_dom">' + value + '</div>');

    var inputWidth =  $('#virtual_dom').width() + 20; // 글자 하나의 대략적인 크기

    $(pos).css('width', inputWidth);
    $('#virtual_dom').remove();
}

$('.cc-btn-save').on('click', function () {
    // model.rid = 없으면 서버에서 만듬
    model.lat = parseFloat($('#cc-lat').val());
    model.lng = parseFloat($('#cc-lng').val());
    model.name = $('#cc-rest-name').val();
    if (!checkFlag) {
        alert('중복 체크는 필수입니다.');
        $('#cc-lat').focus();
        return;
    }
    else if (!model.lat) {
        alert('위도를 입력하세요.');
        $('#cc-lat').focus();
        return;
    }
    else if (!model.lng) {
        alert('경도를 입력하세요.');
        $('#cc-lng').focus();
        return;
    }
    else if (!model.name) {
        alert('식당 이름을 입력하세요.');
        $('#cc-rest-name').focus();
        return;
    }
    else if (!images.length && !_.filter(model.articles[0].imgs, function(value) {
        return value.path !== '_removed_';
        }).length) { // 추가파일과 모델의 파일을 구분
        alert('사진을 한 개는 필수 입니다.');
        return;
    }
    // model.status - 보류
    // model.articles.article_id - 없으면 서버에서 만듬
    model.articles[0].comment = $('#cc-comment-textarea').val();
    // model.articles.status - 보류

    // menus
    model.menus = [];
    var imgsLi = $('.cc-preview-img');
    imgsLi.each(function () {
        if ($(this).css('display') === 'none') {
            $(this).remove();
        }
    });

    imgsLi = $('.cc-preview-img');
    for (var i=0; i<imgsLi.length; i++) {
        var menuLi = $(imgsLi[i]).find('.menu-tag');
        $(menuLi).each(function () {
            var menu = {
                imgId: i,
                id: $(this).index(),
                x: parseInt($(this).css('left')),
                y: parseInt($(this).css('top')),
                menu: $(this).find('.menu-block-text').text(),
                price: parseInt($(this).find('.menu-block-number').text())
            };
            model.menus.push(menu);
        });
    }

    // tags
    delete model.tags;
    model.tags = [];
    var t = $('#cc-hashtag-textarea').val();
    _.split(t, ',').forEach(function (value) {
        model.tags.push({tag: value});
    });

    var formData = new FormData();
    formData.append('model', JSON.stringify(model));

    images.forEach(function(img) {
        formData.append('imgs', img);
    });

    $.ajax({
        url: '/api/cock/insert/save',
        method: 'POST',
        contentType: false,
        processData: false,
        data: formData,
        success: function(result) {
            alert('정상적으로 저장되었습니다.');

            location.href = 'insert.html?rid=' + result.rid + '&articleId=' + result.articleId;
        },
        error: function() {
            alert('저장 중 오류가 발생하였습니다.');
        }
    });
});

$('.cc-btn-cancel').on('click', function () {
    history.back();
});