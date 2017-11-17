require('bootstrap');
require('../less/detail.less');
require('../less/setting.less');

var UrlSearchParams = require('url-search-params');
var params = new UrlSearchParams(location.search);
var rid = params.get('rid');

var common = require('./common');

var mobileDevice = window.matchMedia('all and (min-width:320px) and (max-width:1024px)');
var desktopDevice = window.matchMedia('all and (min-width:1025px)');

var signedIn = false;
var user;
var sort = false;

common.ajax({
    url: '/api/member/get',
    success: function (result) {
        if (result.signedIn) {
            $('.write-button').css('visibility', 'visible');

            $('.write-button').on('click', function () {
                location.href = '../insert.html?rid=' + rid;
            });

            signedIn = true;
            user = result.uid;

            if (result.master === 'Y') {
                $('.master-button').css('visibility', 'visible');

                $('.master-button').on('click', function () {
                    location.href = './admin/admin-rest-edit.html?rid=' + rid;
                });
            }

        }
    }
});

/* 데스크탑 */
function setDesktop(restaurant) {
    var template = require('../template/detail/restaurant.hbs');

    $('#cock-restaurants-left').empty();
    $('#cock-restaurants-right').empty();

    for (var i = 0; i < restaurant.articles.length; i++) {
        restaurant.articles[i].comment = _.replace(restaurant.articles[i].comment, /(?:\r\n|\r|\n)/g, '<br/>');
        var html = template(restaurant.articles[i]);

        if (i % 2 === 0) {
            $('#cock-restaurants-left').append(html);
        }
        else {
            $('#cock-restaurants-right').append(html);
        }
    }
}

/* 모바일 */
function setMobile(restaurant) {
    var template = require('../template/detail/restaurant.hbs');

    $('#cock-restaurants-mobile').empty();

    for (var i = 0; i < restaurant.articles.length; i++) {
        var html = template(restaurant.articles[i]);

        $('#cock-restaurants-mobile').append(html);
    }
}

// article 수정/삭제 버튼
function settingBtn() {
    $('.card-setting').unbind('click').on('click', function (e) {
        $(this).find('.setting-menu').show();

        var articleId = $(this).parents('.content-wrapper').attr('articleId');
        var uid = $(this).parents('.content-wrapper').find('div').attr('uid');

        $(this).find('#update-article-' + articleId).unbind('click').on('click', function () {
            if (!signedIn) {
                alert('로그인 상태가 아닙니다.');
            }
            else {
                if (user !== uid) {
                    alert('본인이 작성한 글만 수정 가능합니다.');
                }
                else {
                    location.href = './insert.html?rid=' + rid + '&articleId=' + articleId;
                }
            }
        });

        $(this).find('#delete-article-' + articleId).unbind('click').on('click', function () {
            if (!signedIn) {
                alert('로그인 상태가 아닙니다.');
            }
            else {
                if (user !== uid) {
                    alert('본인이 작성한 글만 삭제 가능합니다.');
                }
                else {
                    common.ajax({
                        url: '/api/cock/detail/' + rid + '/' + articleId,
                        method: 'DELETE',
                        success: function (result) {
                            location.href = 'detail.html?rid=' + rid;
                        }
                    });
                }
            }
        });
    });
}

function closeSetting(e) {
    var container = $('.setting-menu');
    if (container.has(e.target).length === 0) {
        container.hide();
    }
}

// 맨 위로 버튼
$('.go-top-btn').on('click', function () {
    $('body, html').animate({
        scrollTop: 0
    }, 100);
    return false;
});

// 맨 위로 버튼 위치 및 숨김 효과
function relocateGoTopButton() {
    var scrollTop = $(window).scrollTop();
    var footerHeight = $('footer').outerHeight();
    var bodyHeight = $('body').height();
    var windowHeight = $(window).height();

    if (scrollTop > 300) {
        $('.go-top-btn').fadeIn(600);
    }
    else {
        $('.go-top-btn').fadeOut(600);
    }

    if (bodyHeight - footerHeight - scrollTop < windowHeight) {
        $('.go-top-btn').css({
            position: 'absolute',
            bottom: -55
        });
    }
    else {
        $('.go-top-btn').css({
            position: 'fixed',
            bottom: 20
        });
    }
}

// 상세페이지 로고 -> 맛집 이름으로 변경
function setLogo(restaurant) {
    $('.header-logo').css('display', 'none');
    $('.header-title').css('display', 'inline-block');
    $('.header-title').text(restaurant.name);
    $('.back-button').css('display', 'inline-block');
}

/* 맛집 간략정보 팝업 설정 */
function initRestInfo(restaurant) {
    var template = require('../template/rest-info.hbs');

    $('.rest-submenu').empty();

    common.ajax({
        url: '/api/cock/detail/info/' + rid,
        success: function (result) {
            var html = template(result);
            $('.rest-submenu').html(html);
        }
    });

    attachRestInfoEvent();
}

// 팝업창에 마우스 또는 터치 이벤트
function attachRestInfoEvent() {
    if (desktopDevice.matches) {
        $('.header-title').on('mouseover', function () {
            $(this).parents().find('.rest-submenu').show(300);
        });

        $('.header-title').on('mouseout', function () {
            $(this).parents().find('.rest-submenu').hide(300);
        });

        $('body').on('mousewheel', function () {
            $(this).parents().find('.rest-submenu').hide(300);
        });
    }
    else {
        $('.header-title').on('touchstart', function () {
            $(this).parents().find('.rest-submenu').show(300);
        });

        $('body').on('touchmove', function () {
            $(this).parents().find('.rest-submenu').hide(300);
        });
    }
}

// articles 정렬 버튼 (최신순/좋아요순)
function sortBtn() {
    $('#detail-sort-latest').on('click', function () {
        if ($(this).hasClass('active')) {
            return;
        }

        $(this).parent().find('li').removeClass('active');
        $(this).addClass('active');

        init(false);
    });

    $('#detail-sort-likes').on('click', function () {
        if ($(this).hasClass('active')) {
            return;
        }

        $(this).parent('.detail-sort-wrapper').find('li').removeClass('active');
        $(this).addClass('active');

        init(true);
    });
}

// 페이지 초기화
function init(sort) {
    common.ajax({
        url: 'api/cock/detail/' + rid + '/' + sort,
        success: function (result) {
            initContents(result);
        }
    });
}

function initLikes(restaurant) {
    common.ajax({
        url: 'api/cock/detail/likes/' + rid,
        success: function (result) {
            for (var i = 0; i < restaurant.articles.length; i++) {
                for (var j = 0; j < result.length; j++) {
                    if (user === result[j].uid) {
                        $('#like-icon-' + result[j].articleId).removeClass('fa-heart-o').addClass('fa-heart').css('color', '#ff4461');
                    }
                }
            }
        }
    });
}

// articles 초기화
function initContents(restaurant) {
    if (restaurant.articles.length === 0) {
        location.href = '/';
    }

    setLogo(restaurant);
    setDesktop(restaurant);
    setMobile(restaurant);

    initRestInfo(restaurant);
    initLikes(restaurant);

    sortBtn();
    settingBtn();

    // 더보기 버튼
    $('.btn-more').unbind('click').on('click', function () {
        articleOpen($(this));
    });

    // 이 글에 동의합니다 버튼 (좋아요)
    $('.food-like').unbind('click').on('click', function () {
        likes($(this), restaurant);
    });

    // 이 글에 반대합니다 버튼 (쓰레기)
    $('.food-trash').unbind('click').on('click', function () {
        if ($(this).hasClass('fa-trash-o')) {
            $(this).removeClass('fa-trash-o').addClass('fa-trash');
            $(this).css('color', '#ff4461');
            $(this).parent().find('.food-trash-count').html();
            console.log('쓰레기 추가');
        }
        else if ($(this).hasClass('fa-trash')) {
            $(this).removeClass('fa-trash').addClass('fa-trash-o');
            $(this).css('color', '#bbb');
            $(this).parent().find('.food-trash-count').html();
            console.log('쓰레기 삭제');
        }
    });

    // 신고 버튼
    $('.food-report').unbind('click').on('click', function () {
        var articleId = $(this).parents('.content-wrapper').attr('articleId');
        location.href = './report.html?rid='+ rid +'&articleId='+ articleId;
    });

    // 사진 클릭
    $('.img-responsive').unbind('click').on('click', function () {
        if ($(this).parent().find($('.detail-menu-tag')).hasClass('visible')) {
            $(this).parent().find($('.detail-menu-tag')).css('visibility', 'hidden');
            $(this).parent().find($('.detail-menu-tag')).removeClass('visible');
        }
        else {
            $(this).parent().find($('.detail-menu-tag')).css('visibility', 'visible');
            $(this).parent().find($('.detail-menu-tag')).addClass('visible');
        }
    });

    for (var i = 0; i < restaurant.articles.length; i++) {
        if (restaurant.articles[i].imgs.length > 1) {
            $('#img-more-' + restaurant.articles[i].articleId).css('visibility', 'visible');
        }
    }
}

// 더보기
function articleOpen(more) {
    var detail = more.parent().find('.food-detail');

    if ($('.food-detail').hasClass('card-opened')) {
        $('.food-detail').removeClass('card-opened');
        $('.food-detail').css({
            'width': '130',
            'height': '20',
            'white-space': 'nowrap'
        });
        $('.food-detail').addClass('card-closed');
        $('.btn-more').addClass('card-closed');

        if ($('.btn-more').hasClass('card-closed')) {
            $('.btn-more').show();
        }
    }

    if (detail.hasClass('card-closed')) {
        detail.removeClass('card-closed');
        detail.addClass('card-opened');
        more.addClass('card-opened');
        detail.css({
            'width': 'auto',
            'height': 'auto',
            'white-space': 'normal'
        });
        if (more.hasClass('card-opened')) {
            more.hide();
        }
    }
}

// 좋아요
function likes(likeElm, restaurant) {
    if (!signedIn) {
        alert('로그인 상태가 아닙니다.');
        return;
    }

    if (likeElm.hasClass('fa-heart-o')) {

        var articleId = likeElm.parents('.content-wrapper').attr('articleId');

        common.ajax({
            url: '/api/cock/detail/inc/' + restaurant.rid + '/' + articleId,
            data: {
                uid: user
            },
            success: function (result) {
                var like = result.like;

                likeElm.removeClass('fa-heart-o').addClass('fa-heart');
                likeElm.css('color', '#ff4461');
                likeElm.parent().find('.food-like-count').html();

                likeElm.parent().find('#likes-' + articleId).html(like + 1);
            }
        });
    }
    else if (likeElm.hasClass('fa-heart')) {


        var articleId = likeElm.parents('.content-wrapper').attr('articleId');

        common.ajax({
            url: '/api/cock/detail/dec/' + restaurant.rid + '/' + articleId,
            data: {
                uid: user
            },
            success: function (result) {
                var like = result.like;
                likeElm.removeClass('fa-heart').addClass('fa-heart-o');
                likeElm.css('color', '#666');
                likeElm.parent().find('.food-like-count').html();
                likeElm.parent().find('#likes-' + articleId).html(like - 1);
            }
        });
    }
}

// 윈도우 크기가 바뀔때
$(window).resize(function () {
    attachRestInfoEvent();
});

// 윈도우 스크롤 할때
$(window).on('scroll', function () {
    relocateGoTopButton();
});

$(document).mouseup(function (e) {
    closeSetting(e);
});

init(sort);
relocateGoTopButton();
