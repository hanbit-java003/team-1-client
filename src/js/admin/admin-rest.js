require('bootstrap');
require('../../less/admin/admin-rest.less');

var common = require('./common');

// 맛집 관리 리스트
// rid, name, count(article_id), lat, lng 만 가져옴.
$.ajax({
    url: '/api/cock/admin/rest',
    success: function (result) {
        setList(result);

        console.log(result);
    }
});

function setList(list) {
    $('.admin-rest-table tbody').empty();

    var adminRestTemplate = require('../../template/admin/admin-rest-list.hbs');
    var adminRestHtml = adminRestTemplate(list);

    $('.admin-rest-table tbody').html(adminRestHtml);

    $('.rest-edit-btn').on('click', function () {
        var restId = $(this).attr('restId');

        location = './admin-rest-edit.html?rid=' + restId;
    });
}

// cock cock 에 등록된 총 맛집 수
$.ajax({
    url: '/api/cock/admin/count/rest',
    success: function (result) {
        $('.count-total-rest').empty();

        $('.count-total-rest').text(result);
    }
});
