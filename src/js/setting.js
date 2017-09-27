require('./join.js');
require('../less/setting.less');
require('jquery-mask-plugin');

var common = require('./common.js');

var food = require('./join-food.js');



function setList(model) {
    var foodTemplate = require('../template/join-food.hbs');
    var foodHtml = foodTemplate(model);

    $('#cock-member-food').html(foodHtml);
}

setList(food.model);


var model ={
    email : 'jmk0629@cockcock.com',
    currentPw: '',
    password: '',
    detail: {
        nick: '홍길동',
        phone: '01099999999',
        info: 'Y',
        avatar: '../img/avatars/setting-avatar.jpg'
    }
};

function init(model) {
    $('.cock-setting-email').html(model.email);
    $('#cock-member-nick-input').val(model.detail.nick);
    $('#cock-member-phone-input').val(model.detail.phone);
    $('#cock-member-phone-input').mask('000-0000-0000');
    if (model.detail.info === 'Y') {
        $('#cock-member-info-check').attr('checked', true);
    }
    if (model.detail.avatar) {
        $('.cock-setting-avatar-img').css('background-image', 'url('+model.detail.avatar+')');
    }

    $('#cock-setting-avatar-select').on('click',function () {
       $('#cock-setting-avatar-input').click();
    });

    $('#cock-setting-avatar-input').on('change', function () {
       if (this.files.length === 0) {
           return; // 아무것도 안하고 return
       }
       
       var file = this.files[0]; // 첫번째
       var fileReader = new FileReader();// 파일 읽는 녀석

        fileReader.addEventListener('load',function (event) { // 이벤트를 추가.
            var preview = event.target.result; // 결과물을 가져옴.

            $('.cock-setting-avatar-img').css('background-image', 'url('+preview+')');
        }); // 읽기전에 이벤트 추가

        fileReader.readAsDataURL(file); // 파일 읽어줌.
       
    });

}

init(model);

$('.cock-member-food-span').on('click', function () {
   $('.cock-sign-in').toggle(100);
   $('.cock-sign-up').toggle(100);
});


$('.cock-setting-cancel').on('click', function () {
   location.href = './';
});

$('.cock-setting-save').on('click', function () {
    var member = {
        currentPw: $('#cock-member-cpw-input').val().trim(),
        password: $('#cock-member-npw-input').val().trim(),
        detail : {
            nick: $('#cock-member-nick-input').val().trim(),
            phone: $('#cock-member-phone-input').val().trim(),
            info: $('#cock-member-info-check')[0].checked ? 'Y' : 'N'
        }
    }
    var npwc = $('#cock-member-npwc-input').val().trim();
    if (member.currentPw || member.password || npwc) {
        if(!member.currentPw) { //현재 비밀번호가 없으면?
            alert('현재 비밀번호를 입력해주세요.');
            $('#cock-member-cpw-input').focus();
            return;
        }// 새 비밀번호가 없으면?
        else if(!member.password) {
            alert('새 비밀번호를 입력해주세요.');
            $('#cock-member-npw-input').focus();
            return;
        } // 새 비밀번호 확인이 없으면?
        else if(!npwc) {
            alert('새 비밀번호 확인을 입력해주세요.');
            $('#cock-member-npwc-input').focus();
            return;
        }// 새 비밀번호랑 새비밀번호 확인 부분이 다르면?
        else if(member.password !== npwc) {
            alert('새 비밀번호 확인이 다릅니다.');
            $('#cock-member-npwc-input').focus();
            return;
        }
    }
    console.log(member);

    location.href = './';
});
