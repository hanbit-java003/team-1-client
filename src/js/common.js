require('../less/common.less');

$('.header-logo').on('click', function () {
    location.href = './';
});

$('.header-bt').on('click', function () {
    location.href = './join.html';
});

// 검색 버튼
function searchBarToggle() {
    $('.search-toggle').on('click', function () {
        $('.header-search-icon').toggle();
        $('.header-search-bar').toggle('100');
    });

    $('.search-input').on('keyup', function (event) {
        if (event.keyCode === 13) {
            var text = $('.search-input').val();
            alert(text + ' 검색하시려구??')
            //location.href = './search.html?' + text;
        }
    });
}

searchBarToggle();