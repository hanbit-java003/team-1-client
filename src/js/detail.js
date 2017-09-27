// sc
require('bootstrap');
require('../less/detail.less');

var UrlSearchParams = require('url-search-params');
var params = new UrlSearchParams(location.search);

var common = require('./common');
var restaurants = require('./model/restaurants');
var cardContentsModel = require('./model/card-contents-list');

$('.header-logo').on('click', function () {
    location.href = './';
});

function init(restaurants, cardContentsModel) {
    var template = require('../template/detail/restaurant.hbs');
    var shops = 0;

    // 지금은 임시로 메인페이지의 카운트값을 받아 상세페이지 카드 개수를 정했는데
    // 실제로는 반대로 해야함.
    for (var i = 0; i < cardContentsModel.length; i++) {
        if (params.get('uid') === cardContentsModel[i].id) {
            shops = cardContentsModel[i].count;
        }
    }

    for (var i = 0; i < shops; i++) {
        var html = template(restaurants[i]);

        $('.cock-restaurants').append(html);
    }

    $('.btn-more').on('click', function () {
        $(this).toggle();
        $(this).parent().find('.food-detail').toggle();
    });

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

    $('.food-report').on('click', function () {
        alert('신고 할거임');
    });

}

init(restaurants, cardContentsModel);