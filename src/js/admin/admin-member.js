require('bootstrap');
require('../../less/admin/admin-member.less');

var common = require('./common');

$.ajax({
    url: '/api/cock/admin/member',
    success: function (result) {
        setList(result);

        console.log(result);
    }
});

// 회원 관리 리스트
function setList(list) {
    $('.admin-member-table tbody').empty();

    var adminMemberTemplate = require('../../template/admin/admin-member-list.hbs');
    var adminMemberHtml = adminMemberTemplate(list);

    $('.admin-member-table tbody').html(adminMemberHtml);
}

// cock cock 에 가입한 총 회원 수
$.ajax({
    url: '/api/cock/admin/count/member',
    success: function (result) {
        $('.count-total-member').empty();

        $('.count-total-member').text(result);
    }
});