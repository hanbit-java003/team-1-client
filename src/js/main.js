require('bootstrap');
require('../less/main.less');
var hello = require('./sample/hello');


$('.say-hello').on('click', function () {
    alert(hello.hello($('#txt-hello').val()));
});

$('.goto-sub').on('click', function () {
    location.href = 'sub.html';
});

$('#btn-test').on('click', function () {
    location.href = 'detail.html';
});

$('#btn-join-test').on('click', function () {
    location.href = 'join.html';
});

$('#btn-join-food-test').on('click', function () {
    location.href = 'join-food.html';
})