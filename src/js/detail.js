require('bootstrap');
require('../less/detail.less');

var UrlSearchParams = require('url-search-params');
var params = new UrlSearchParams(location.search);

var common = require('./common');
var restaurants = require('./model/restaurants');
var cardContentsModel = require('./model/card-contents-nearby');

$('.header-logo').on('click', function () {
    location.href = './';
});

function init(restaurants, cardContentsModel) {
    var template = require('../template/detail/restaurant.hbs');
    var shops = 0;

    /**
     * 지금은 임시로 메인페이지의 카운트값을 받아 상세페이지 카드 개수를 정했는데
     * 실제로는 반대로 해야함.
     * */
    for (var i = 0; i < cardContentsModel.length; i++) {
        if (params.get('uid') === cardContentsModel[i].id) {
            shops = cardContentsModel[i].count;
        }
    }

    for (var j = 0; j < shops; j++) {
        var html = template(restaurants[j]);

        $('.cock-restaurants').append(html);
    }

    /**
     * 더보기 버튼
     */
    $('.btn-more').on('click', function () {
        var detail = $(this).parent().find('.food-detail');
        $(this).toggle();
        detail.css('width', 'auto');
        detail.css('height', 'auto');
        detail.css('white-space', 'normal');
    });


    /**
     *  이 글에 동의합니다 버튼 (좋아요)
     */
    $('.food-like').on('click', function () {
        if ($(this).hasClass('fa-heart-o')) {
            $(this).removeClass('fa-heart-o').addClass('fa-heart');
            $(this).css('color', '#ff4461');
        }
        else if ($(this).hasClass('fa-heart')) {
            $(this).removeClass('fa-heart').addClass('fa-heart-o');
            $(this).css('color', '#666');
        }
    });

    /**
     * 이 글에 반대합니다 버튼 (쓰레기)
     * */
    $('.food-trash').on('click', function () {
        if ($(this).hasClass('fa-trash-o')) {
            $(this).removeClass('fa-trash-o').addClass('fa-trash');
            $(this).css('color', '#ff4461');
        }
        else if ($(this).hasClass('fa-trash')) {
            $(this).removeClass('fa-trash').addClass('fa-trash-o');
            $(this).css('color', '#bbb');
        }
    });

    /**
     * 신고 버튼
     * */
    $('.food-report').on('click', function () {
        location.href = './report.html';
    });

    $('.img-responsive').on('click', function () {
        popImg(this);
    });

}

/**
 * 이미지 크게 보기
 * 창이 너무 안이쁨.. 바꿀거임
 */
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

init(restaurants, cardContentsModel);
