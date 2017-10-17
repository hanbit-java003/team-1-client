require('bootstrap');
require('../less/detail.less');

var UrlSearchParams = require('url-search-params');
var params = new UrlSearchParams(location.search);

var common = require('./common');

/* 식당별 글들이 모여있는 모델 */
var restaurants = [
    require('./model/restaurants/goramen'),
    require('./model/restaurants/fish'),
    require('./model/restaurants/mibundang')
];

/* 데스크탑 */
function setDesktop(restaurant) {
    var template = require('../template/detail/restaurant.hbs');

    for (var i = 0; i < restaurant.contents.length; i++) {
        var html = template(restaurant.contents[i]);

        setDesktopCss();

        if (i % 2 === 0) {
            $('#cock-restaurants-left').append(html);
        } else {
            $('#cock-restaurants-right').append(html);
        }
    }
}

/* 모바일 */
function setMobile(restaurant) {
    var template = require('../template/detail/restaurant.hbs');

    for (var i = 0; i < restaurant.contents.length; i++) {
        var html = template(restaurant.contents[i]);

        setMobileCss();

        $('#cock-restaurants-mobile').append(html);
    }
}

/* 데스크탑 반응형 css */
function setDesktopCss() {

}

/* 모바일 반응형 css */
function setMobileCss() {

}

var mobileDevice = window.matchMedia('all and (min-width:320px) and (max-width:1024px)');
var desktopDevice = window.matchMedia('all and (min-width:1025px)');

/* 윈도우 크기가 모바일일 경우와
데스크탑일 경우 각각 뷰를 다르게 보여줌 */
function setContents(restaurant) {
    if (desktopDevice.matches) {
        $('#cock-restaurants-mobile').empty();
        setDesktop(restaurant);
    } else if (mobileDevice.matches) {
        $('#cock-restaurants-left').empty();
        $('#cock-restaurants-right').empty();
        setMobile(restaurant);
    }
}

$(window).resize(function() {});

function initContents(restaurants) {
    /* 클릭하고 넘어온 페이지의 rid 값과 각 식당 모델의 rid 를
    비교해서 맞을 경우에 템플릿에 담음 */
    for (var i = 0; i < restaurants.length; i++) {
        var restaurant = restaurants[i][0];

        if (params.get('rid') === restaurant.rid) {
            setDesktop(restaurant);
            setMobile(restaurant);
        }
    }

    // 더보기 버튼
    $('.btn-more').on('click', function() {
        var detail = $(this).parent().find('.food-detail');
        $(this).toggle();
        detail.css({
            'width': 'auto',
            'height': 'auto',
            'white-space': 'normal'
        });
    });

    /* 좋아요, 쓰레기 갯수 */
    var likeCount = 0;
    var trashCount = 0;

    // 이 글에 동의합니다 버튼 (좋아요)
    $('.food-like').on('click', function() {
        if ($(this).hasClass('fa-heart-o')) {
            $(this).removeClass('fa-heart-o').addClass('fa-heart');
            $(this).css('color', '#ff4461');
            likeCount += 1;
            $(this).parent().find('.food-like-count').html(likeCount);
        } else if ($(this).hasClass('fa-heart')) {
            $(this).removeClass('fa-heart').addClass('fa-heart-o');
            $(this).css('color', '#666');
            likeCount = likeCount - 1;
            $(this).parent().find('.food-like-count').html(likeCount);
        }
    });

    // 이 글에 반대합니다 버튼 (쓰레기)
    $('.food-trash').on('click', function() {
        if ($(this).hasClass('fa-trash-o')) {
            $(this).removeClass('fa-trash-o').addClass('fa-trash');
            $(this).css('color', '#ff4461');
            trashCount += 1;
            $(this).parent().find('.food-trash-count').html(trashCount);
        } else if ($(this).hasClass('fa-trash')) {
            $(this).removeClass('fa-trash').addClass('fa-trash-o');
            $(this).css('color', '#bbb');
            trashCount -= 1;
            $(this).parent().find('.food-trash-count').html(trashCount);
        }
    });

    // 신고 버튼
    $('.food-report').on('click', function() {
        location.href = './report.html';
    });

    // 사진 크게보기
    $('.img-responsive').on('click', function() {
        popImg(this);
    });
}

/* 이미지 크게 보기
창이 너무 안이뻐서 바꿀거임.. */
function popImg(img) {
    var winImg = window.open('', '', 'width=0, height=0, menubar=0, toolbar=0, directories=0, scrollbars=1, status=0, location=0, resizable=1');
    var data = "<html><head><title></title></head>";
    data += "<body>";
    data += "<img src='" + img.src + "' border='0' style='cursor:pointer' onclick='window.close();'" +
        " onload='window.resizeTo(this.width+30, this.height+90);" +
        " window.moveTo( (screen.width-this.width)/2, (screen.height-this.height)/2-50 )'>";
    data += "</body></html>";

    winImg.document.write(data);
}

// 맨 위로 버튼
$('.go-top-btn').on('click', function() {
    $('body, html').animate({
        scrollTop: 0
    }, 100);
    return false;
});

// 맨 위로 버튼 보였다 안보였다
function relocateGoTopButton() {
    var scrollTop = $(window).scrollTop();
    var footerHeight = $('footer').outerHeight();
    var bodyHeight = $('body').height();
    var windowHeight = $(window).height();

    if (scrollTop > 300) {
        $('.go-top-btn').fadeIn(600);
    } else {
        $('.go-top-btn').fadeOut(600);
    }

    if (bodyHeight - footerHeight - scrollTop < windowHeight) {
        $('.go-top-btn').css({
            position: 'absolute',
            bottom: -55
        });
    } else {
        $('.go-top-btn').css({
            position: 'fixed',
            bottom: 20
        });
    }
}

$(window).on('scroll', function() {
    relocateGoTopButton();
});
relocateGoTopButton();

initContents(restaurants);
