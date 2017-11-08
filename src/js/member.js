require('./common.js');
require('../less/member.less');

var common = require('./common.js');


common.ajax({
    url:'/api/member/get',
    success: function (result) {
        if (!result.signedIn) {
            location.href= '/'; // 기본홈으로 돌려보냄.
        }
        getMemberDetail();
    }
});

function getMemberDetail() {
    common.ajax({
        url: '/api/member/detail',
        success: function (result) {
            init(result);
        }
    });
}

function init(member) {
    $('.cock-member-info-welcome').append('<span class="cock-member-info-nick">'+member.nick+'</span>'+'님의 회원 정보');

    $('.cock-member-tab-btns > li').on('click', function () {
       if ($(this).hasClass('active')) {
           return;
       }

       var tabIndex = $(this).index();

       // 즐겨찾기 버튼[0], 내가 쓴 글 버튼[1]
       var tabBtns = $(this).parent('.cock-member-tab-btns').find('li');
       tabBtns.removeClass('active');
       $(tabBtns[tabIndex]).addClass('active');

       // 즐겨찾기 버튼[0], 내가 쓴 글 버튼[1]
        var tabContents = $(this).parents('.cock-member-tab').find('.cock-member-tab-contents > li');
        tabContents.removeClass('active');
        $(tabContents[tabIndex]).addClass('active');


    });
}