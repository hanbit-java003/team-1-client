// sc
require('bootstrap');
require('../less/detail.less');

var common = require('./common');
var restaurants = require('./model/restaurants');

$('.header-logo').on('click', function () {
    location.href = './';
});

function init(restaurants) {
    var template = require('../template/detail/restaurant.hbs');

    for (var i = 0; i < restaurants.length; i++) {
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
        }
        else if ($(this).hasClass('fa-heart')) {
            $(this).removeClass('fa-heart').addClass('fa-heart-o');
        }
    });

    $('.food-trash').on('click', function () {
        alert('이 집 쓰레기!!!!');
    });

    $('.food-report').on('click', function () {
        alert('신고 할거임');
    });

}

init(restaurants);