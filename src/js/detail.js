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

}

init(restaurants);