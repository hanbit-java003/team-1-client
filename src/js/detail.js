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

init(restaurants);