require('bootstrap');
require('../less/detail.less');

var UrlSearchParams = require('url-search-params');
var params = new UrlSearchParams(location.search);

var common = require('./common');


/**
 * 식당별 글들이 모여있는 모델
 * */
var restaurants = [
    require('./model/restaurants/goramen'),
    require('./model/restaurants/fish'),
    require('./model/restaurants/mibundang')
];

function init(restaurants) {
    var template = require('../template/detail/restaurant.hbs');
    var html;

    /**
     * 클릭하고 넘어온 페이지의 rid 값과 각 식당 모델의 rid 를 비교해서
     * 맞을 경우에 템플릿에 담음
     * */
    for (var i = 0; i < restaurants.length; i++) {
        if (params.get('rid') === restaurants[i][0].rid) {
            html = template(restaurants[i][0]);
        }
    }

    $('.cock-restaurants').html(html);

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
     * 좋아요, 쓰레기 카운트는 나중에 DB 에서 받아오고
     * 버튼 누를때마다 리프레시 해야하나
     * 아니면 쓰레기는 개수가 아니라 첨엔 약간 투명하다가
     * 쓰레기 많이 눌리면 진하게 표시되게 하는것도 괜찮을듯..
     * */
    var likeCount = 0;
    var trashCount = 0;

    /**
     *  이 글에 동의합니다 버튼 (좋아요)
     */
    $('.food-like').on('click', function () {
        if ($(this).hasClass('fa-heart-o')) {
            $(this).removeClass('fa-heart-o').addClass('fa-heart');
            $(this).css('color', '#ff4461');
            likeCount += 1;
            $(this).parent().find('.food-like-count').html(likeCount);
        }
        else if ($(this).hasClass('fa-heart')) {
            $(this).removeClass('fa-heart').addClass('fa-heart-o');
            $(this).css('color', '#666');
            likeCount = likeCount - 1;
            $(this).parent().find('.food-like-count').html(likeCount);
        }
    });

    /**
     * 이 글에 반대합니다 버튼 (쓰레기)
     * */
    $('.food-trash').on('click', function () {
        if ($(this).hasClass('fa-trash-o')) {
            $(this).removeClass('fa-trash-o').addClass('fa-trash');
            $(this).css('color', '#ff4461');
            trashCount += 1;
            $(this).parent().find('.food-trash-count').html(trashCount);
        }
        else if ($(this).hasClass('fa-trash')) {
            $(this).removeClass('fa-trash').addClass('fa-trash-o');
            $(this).css('color', '#bbb');
            trashCount -= 1;
            $(this).parent().find('.food-trash-count').html(trashCount);
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

init(restaurants);
