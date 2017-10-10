require('../less/common.less');
require('../less/setting.less');

var common = require('./common.js');

// 로그인 정보 테스트
$('.header-btn-member').on('click',function () {

    $.ajax({
        url: '/api/member/get',
        success: function (result) {
            loginpage(result);
        }
    });

    function loginpage(memberInfo) {
        /*var memberLayerTemplate = require('../test-login.hbs');
        var memberLayer = memberLayerTemplate(memberInfo);

        $('body').append(memberLayer);*/
        // 로그인 테스트
        if(!memberInfo.signedIn){
            console.log('dasdas');
            $('#cock-login-btn').on('click', function () {
                signIn();
            });
        }
        else {
            $('#cock-logout').on('click', function () {
                signOut();
            });
            $('#cock-setting').on('click', function () {
               location.href = '../setting.html';
            });
        }

        location.href='../test-login.html';
    }

});

function signOut() {
    $.ajax({
       url: '/api/member/signout',
        success:function () {
            location.href='../';
        }
    });
}



function signIn(){
    var email = $('#cock-login-email').val().trim();
    var pw = $('#cock-login-pw').val().trim();
    var remember = $('#cock-login-remember').prop('checked');

    if (!email){
        alert('이메일을 입력하세요.');
        $('#cock-login-email').focus();
        return;
    }
    else if(!pw) {
        alert('비밀번호를 입력하세요.');
        $('#cock-login-pw').focus();
        return;
    }

    $.ajax({
        url:'/api/member/signin',
        method: 'POST',
        data: {
            email: email,
            password: pw,
            remember: remember
        },
        success: function (result) {
            alert('로그인 성공');
            location.href = './';
        },
        error: function (jqXHR) {
            alert(jqXHR.responseJSON.message());
        }
    })
}