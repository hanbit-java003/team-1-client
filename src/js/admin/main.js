require('bootstrap');
require('../../less/admin/main.less');
require('./common');

var common = require('../common');

common.ajax({
    url:'/api/member/get',
    success: function (result) {
        if (!result.signedIn) {
            alert('로그인이 필요한 페이지 입니다.');
            location.href= '/'; // 기본홈으로 돌려보냄.
        }
        masterVall(result);
    }
});

function masterVall(master) {
    if(master.master !== 'Y'){
        alert('관리자 아이디가 아닙니다.');
        location.href = '/';
    }
}

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
