require('bootstrap');
require('../../less/admin/main.less');

var common = require('./common');

function initAdminMain() {
    // 등록된 맛집 수
    $.ajax({
        url: '/api/cock/admin/count/rest',
        success: function (result) {
            $('.count-rest').empty();

            $('.count-rest').text(result);
        }
    });

    // 등록된 게시글 수
    $.ajax({
        url: '/api/cock/admin/count/article',
        success: function (result) {
            $('.count-article').empty();

            $('.count-article').text(result);
        }
    });

    // 가입 회원 수
    $.ajax({
        url: '/api/cock/admin/count/member',
        success: function (result) {
            $('.count-member').empty();

            $('.count-member').text(result);
        }
    });
}

initAdminMain();
