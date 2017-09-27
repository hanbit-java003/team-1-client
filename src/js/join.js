require('../less/join.less');

var common = require('./common.js');


$('.cock-join-btn-cancel').on('click', function () {
    location.href = './';
});

$('.cock-join-btn-save').on('click', function () {
    location.href = './join-food.html';
});