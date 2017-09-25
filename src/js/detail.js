// sc
require('bootstrap');
require('../less/detail.less');

$('.header-logo').on('click', function () {
    location.href = './';
});

$('.btn-more').on('click', function () {
    $('.btn-more').hide();
    $('.food-detail').css('display', 'block')
});