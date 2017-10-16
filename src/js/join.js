require('../less/join.less');

var common = require('./common.js');
$.getScript('https://www.google.com/recaptcha/api.js');

// 캡차부분.
var vall = false;

window.verifyCallback = function() {
    vall = true;
};

/*window.onloadCallback = function() {
    grecaptcha.render('cock-prevent', {
        'sitekey' : '6Lc5fzIUAAAAAEehrbbislWASM_D5je_Q-LIudbG',
        'theme' : 'light',
        'callback' :verifyCallback
    });
};*/



// 인증 연습
/*$('#cock-join-email-btn').on('click', function () {
    console.log('dsadasd');

    var email = $('#cock-join-email').val().trim();

    $.ajax({
        url:'/api/sendMail/auth',
        method:'POST',
        data: {
            email: email
        },
        success: function (result) {
            console.log(result);
        },
        error: function (jqXHR) {
            console.log('dsadsa');
        }


    });

});*/



$('.cock-join-btn-cancel').on('click', function () {
    location.href = './';
});

$('.cock-join-btn-save').on('click', function () {
    cockJoin();
});




function cockJoin() {
    // 검증  벨리데이션
    var email = $('#cock-join-email').val().trim();
    var nick = $('#cock-join-nick').val().trim();
    var pw = $('#cock-join-pw').val().trim();
    var pwc = $('#cock-join-pwc').val().trim();
    var agree = $('.cock-join-check-input').prop('checked');
    var re=/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;

    if(!email) {
        alert('이메일을 입력하세요.');
        $('#cock-join-email').focus();
        return;
    }
    else if(!re.test(email)) {
        alert('이메일 형식이 맞지 않습니다.');
        $('#cock-join-email').focus();
        return;
    }
    else if(!nick){
        alert('별명을 입력하세요.');
        $('#cock-join-nick').focus();
        return;
    }
    else if(!pw){
        alert('비밀번호를 입력하세요.');
        $('#cock-join-pw').focus();
        return;
    }
    else if(!pwc){
        alert('비밀번호 재확인을 입력하세요.');
        $('#cock-join-pwc').focus();
        return;
    }// 비밀번호랑 비밀번호 확인 부분이 다르면?
    else if(pw !== pwc) {
        alert('새 비밀번호 확인이 다릅니다.');
        $('#cock-join-pwc').focus();
        return;
    }
    else if(vall !== true) {
        alert('자동등록방지를 푸셔야 합니다.');
        $('#cock-prevent').focus();
        return;
    }
    else if(!agree){
        alert('약관의 동의 하셔야 됩니다.');
        return;
    }

    $.ajax({
        url: '/api/member/signup',
        method: 'POST',
        data: {
            email: email,
            password: pw,
            nick : nick
        },
        success: function (result) {
            alert('정상적으로 가입되셨습니다.');
            location.href = './join-food.html';
        },
        error: function (jqXHR) { // Xml Http Request
            alert(jqXHR.responseJSON.message);
        }
    });
}

