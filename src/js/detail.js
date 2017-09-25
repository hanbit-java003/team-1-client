// sc
require('bootstrap');
require('../less/detail.less');

$('.header-logo').on('click', function() {
  location.href = './';
});

// 일단 하드코딩
$('.btn-more-1').on('click', function() {
  $('.btn-more-1').hide();
  $('.food-detail-1').css('display', 'block');
});

$('.btn-more-2').on('click', function() {
  $('.btn-more-2').hide();
  $('.food-detail-2').css('display', 'block');
});

$('.btn-more-3').on('click', function() {
  $('.btn-more-3').hide();
  $('.food-detail-3').css('display', 'block');
});

$('.food-detail-1').on('click', function() {
  $('.food-detail-1').css('display', 'none');
  $('.btn-more-1').show();
});

$('.food-detail-2').on('click', function() {
  $('.food-detail-2').css('display', 'none');
  $('.btn-more-2').show();
});

$('.food-detail-3').on('click', function() {
  $('.food-detail-3').css('display', 'none');
  $('.btn-more-3').show();
});
