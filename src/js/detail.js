require('bootstrap');
require('../less/detail.less');

var UrlSearchParams = require('url-search-params');
var params = new UrlSearchParams(location.search);
var rid = params.get('rid');

var common = require('./common');

/* 식당별 글들이 모여있는 모델 */
/*var restaurants = [
    require('./model/restaurants/goramen'),
    require('./model/restaurants/fish'),
    require('./model/restaurants/mibundang')
];*/
$.ajax({
    url: 'api/cock/detail/' + rid,
    success: function (result) {
        initContents(result);
    }
});

$.ajax({
    url: '/api/member/get',
    success: function (result) {
        if (result.signedIn) {
            $('.write-button').css('visibility', 'visible');

            $('.write-button').on('click', function () {
                location.href = '../insert.html';
            });
        }
    }
});


/* 데스크탑 */
function setDesktop(restaurant) {
    var template = require('../template/detail/restaurant.hbs');

    //setDesktopCss();

    for (var i = 0; i < restaurant.articles.length; i++) {
        var html = template(restaurant.articles[i]);

        if (restaurant.articles[i].articleId % 2 === 0) {
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

    //setMobileCss();

    for (var i = 0; i < restaurant.articles.length; i++) {
        var html = template(restaurant.articles[i]);

        $('#cock-restaurants-mobile').append(html);
    }
}

var mobileDevice = window.matchMedia('all and (min-width:320px) and (max-width:1024px)');
var desktopDevice = window.matchMedia('all and (min-width:1025px)');

/* 윈도우 크기가 모바일일 경우와
데스크탑일 경우 각각 뷰를 다르게 보여줌 */
function setContents(restaurant) {
    if (desktopDevice.matches) {
        $('#cock-restaurants-mobile').empty();
        setDesktop(restaurant);
    }
    else if (mobileDevice.matches) {
        $('#cock-restaurants-left').empty();
        $('#cock-restaurants-right').empty();
        setMobile(restaurant);
    }
}

// 윈도우 크기가 바뀔때
$(window).resize(function () {
    attachRestInfoEvent();
});

function initContents(restaurant) {
    /* 클릭하고 넘어온 페이지의 rid 값과 각 식당 모델의 rid 을
    비교해서 맞을 경우에 템플릿에 담음 */
    setDesktop(restaurant);
    setMobile(restaurant);

    setLogo(restaurant);
    initRestInfo(restaurant);

    settingBtn(restaurant);

    // 더보기 버튼
    $('.btn-more').on('click', function () {
        var detail = $(this).parent().find('.food-detail');

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

            console.log('더보기 닫기');
        }

        if (detail.hasClass('card-closed')) {
            detail.removeClass('card-closed');
            detail.addClass('card-opened');
            $(this).addClass('card-opened');
            detail.css({
                'width': 'auto',
                'height': 'auto',
                'white-space': 'normal'
            });
            if ($(this).hasClass('card-opened')) {
                $(this).hide();
            }

            console.log('더보기 열기');
        }
    });

    $('.card-setting').on('click', function () {
        $(this).find('.setting-menu').css('visibility', 'visible');
    });

    // 이 글에 동의합니다 버튼 (좋아요)
    $('.food-like').on('click', function () {
        var likeElm = $(this);
        $.ajax({
            url: '/api/member/get',
            success: function (result) {
                if (!result.signedIn) {
                    alert('로그인 상태가 아닙니다.');
                }
                else {
                    if (likeElm.hasClass('fa-heart-o')) {
                        likeElm.removeClass('fa-heart-o').addClass('fa-heart');
                        likeElm.css('color', '#ff4461');
                        likeElm.parent().find('.food-like-count').html();

                        var articleId = likeElm.parents('.content-wrapper').attr('articleId');
                        var likeCount = likeElm.parent().find('.food-like-count');

                        $.ajax({
                            url: '/api/cock/detail/inc/' + rid + '/' + articleId,
                            success: function (result) {
                                console.log(restaurant.articles[articleId].likes);
                                likeCount.html(restaurant.articles[articleId].likes + 1);
                            }
                        });
                    }
                    else if (likeElm.hasClass('fa-heart')) {
                        likeElm.removeClass('fa-heart').addClass('fa-heart-o');
                        likeElm.css('color', '#666');
                        likeElm.parent().find('.food-like-count').html();

                        var articleId = likeElm.parents('.content-wrapper').attr('articleId');
                        var likeCount = likeElm.parent().find('.food-like-count');

                        $.ajax({
                            url: '/api/cock/detail/dec/' + rid + '/' + articleId,
                            success: function (result) {
                                console.log(restaurant.articles[articleId].likes);
                                likeCount.html(restaurant.articles[articleId].likes);
                            }
                        });
                    }
                }
            }
        });
    });

    // 이 글에 반대합니다 버튼 (쓰레기)
    $('.food-trash').on('click', function () {
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
    $('.food-report').on('click', function () {
        location.href = './report.html';
    });

    // 사진 크게보기
    $('.img-responsive').on('click', function () {
        console.log('사진을 펼쳐라~!');
    });
}

function likeThis(restaurant, articleId, likeCount) {
    console.log(articleId);


}

function hateThis() {

}

function settingBtn(restaurant) {
    $('.card-setting').on('click', function () {
        $(this).find('.setting-menu').toggle();
        $(this).find('.setting-menu').addClass('menu-opened');

        if ($(this).find('.setting-menu').hasClass('menu-opened')) {
            var articleId = $(this).parents('.content-wrapper').attr('articleId');
            var uid = $(this).parents('.content-wrapper').find('div').attr('uid');

            $(this).find('#update-article-' + articleId).on('click', function () {
                // 수정페이지로 이동
                $.ajax({
                    url: '/api/member/get',
                    success: function (result) {
                        if (!result.signedIn) {
                            alert('로그인 상태가 아닙니다.');
                            location.reload();
                        }
                        else {
                            if (result.uid !== uid) {
                                alert('본인이 작성한 글만 수정 가능합니다.');
                            }
                            else {
                                location.href = './insert.html?rid=' + rid + '&articleId=' + articleId;
                            }
                        }
                    }
                });
            });

            $(this).find('#delete-article-' + articleId).on('click', function () {
                $.ajax({
                    url: '/api/cock/detail/' + rid + '/' + articleId,
                    method: 'DELETE',
                    success: function (result) {
                        location.href = 'detail.html?rid=' + rid;
                    },
                    error: function () {
                        alert('삭제 실패');
                    }
                });
            });
        }
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

    var html = template(restaurant);

    $('.rest-submenu').html(html);

    attachRestInfoEvent();
}

// 카드 수정/삭제 버튼
function updateDeleteBtn() {

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

// 윈도우 스크롤 할때
$(window).on('scroll', function () {
    relocateGoTopButton();
});

// 페이지 초기화
//initContents(restaurants);
relocateGoTopButton();
