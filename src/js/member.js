require('./common.js');
require('../less/member.less');

var common = require('./common.js');

var bookmark = require('../js/bookmark-review.js');


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
    $.ajax({
        url: '/api/cock/member/wrote',
        data: {
            uid : member.uid
        },
        success: function (result) {
            setWroteList(result);
        }
    });

    $.ajax({
        url:'/api/cock/member/count/article',
        data : {
            uid : member.uid
        },
        success: function (result) {
            $('.cock-member-count-total-wrote-article').empty();

            $('.cock-member-count-total-wrote-article').text(result);
        }

    });
}

function setWroteList(list) {
    $('.cock-member-contents-wrote-table tbody').empty();


    var memberWroteTemplate = require('../template/member/member-wrote.hbs');
    var memberWroteHtml = memberWroteTemplate(list);

    $('.cock-member-contents-wrote-table tbody').html(memberWroteHtml);
}

function setBookmarkList(list) {
       $('.cock-member-contents-bookmark-table tbody').empty();

       var memberBookmarkTemplate = require('../template/member/member-bookmark.hbs');
       var memberBookmarkHtml = memberBookmarkTemplate(list);

       $('.cock-member-contents-bookmark-table tbody').html(memberBookmarkHtml);
}

setBookmarkList(bookmark);




