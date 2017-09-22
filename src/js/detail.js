// sc
require('bootstrap');
require('../less/detail.less');

$('.btn-more').on('click', function () {
    $('.btn-more').hide();
    $('.food-detail').css('display', 'block')
});