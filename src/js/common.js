require('../less/common.less');
require('./test-login.js');




$('.header-btn-member').on('click', function () {
    location.href = './setting.html';
});

$('.header-logo').on('click', function () {
    location.href = './';
});

$('.header-bt').on('click', function () {
    location.href = './join.html';
});

// 검색 버튼 토글
function searchBarToggle() {
    $('.search-toggle').on('click', function () {
        $('.header-search-icon').toggle();
        $('.header-search-bar').toggle('100');
    });

    $('.search-input').on('keyup', function (event) {
        if (event.keyCode === 13) {     // 엔터를 치면
            var text = $('.search-input').val();
            alert(text + ' 검색하시려구??');
        }
    });
}

searchBarToggle();
