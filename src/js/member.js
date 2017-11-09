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

    // 내가쓴 맛집 수 개수
    setCountWrote(member.uid);
    // 내가쓴 맛집 리스트
    setWroteList(member.uid);
    // 페이징 처리를 위한 토탈..
    setTotalWrote(member.uid);



}
// 페이징 처리를 위한 토탈..
function setTotalWrote(uid) {
    $.ajax({
        url:'/api/cock/member/total',
        data:{
            uid : uid
        },
        success: function (result) {
            var total = result.total;

            console.log(total);

            setPaging(total);
        }
    })
}

var currentPage = 1;  // 현재페이지
var rowsPerPage = 5;  // 페이지내에서 보여지는 게시글의 수
var pagesToShow = 2;  // 페이지 넘기는거 몇개씩 보여주는거
var currentNo; //변수선언

// 페이징 처리를 하기 위해서 만든 메소드
function setPaging(total) {
    var totalPages = total / rowsPerPage
        + (total % rowsPerPage ===0 ? 0 : 1);
    var firstPage= 1;
    var lastPage = totalPages;
    var startPage = parseInt((currentPage -1) / pagesToShow ) * pagesToShow + 1;
    var endPage = Math.min(startPage+ pagesToShow - 1, lastPage);
    // 두개의 값중에 작은 숫자가 리턴이 된다. Math.min
    var prevPage = startPage - 1;
    var nextPage = endPage +1;

    $('.board-list .pagination').empty(); //이 경로안에 있는걸 다 지운다?

    var pagingHtml = '';
    pagingHtml += '<li'; //클릭하지 못하게 만든 클래스
    if (prevPage < firstPage) {
        pagingHtml += ' class="disabled"';
    }
    pagingHtml +=  '>';
    pagingHtml += '<a class="board-page"';
    pagingHtml += ' page="' + prevPage + '"';
    pagingHtml += ' href="#" aria-label="Previous">';
    pagingHtml += '<span aria-hidden="true">&laquo;</span>';
    pagingHtml += '</a>';
    pagingHtml += '</li>';  // 왼쪽 버튼

    for(var i = startPage; i<=endPage; i++) {
        pagingHtml += '<li';
        if(i === currentPage) {
            pagingHtml += ' class="active"';
        }

        pagingHtml += '><a class="board-page"';
        pagingHtml += ' page="' + i + '"';
        pagingHtml += ' href="#">'+ i +'</a></li>' ;  // 페이지 수?
    }
    pagingHtml += '<li';
    if (nextPage > lastPage) {
        pagingHtml += ' class="disabled"';
    }
    pagingHtml += '>';
    pagingHtml += '<a class="board-page"';
    pagingHtml += ' page="' + nextPage + '"';
    pagingHtml += ' href="#" aria-label="Next">';
    pagingHtml += '<span aria-hidden="true">&raquo;</span>';
    pagingHtml += '</a>';
    pagingHtml += '</li>';  //오른쪽 버튼

    $('.board-list .pagination').html(pagingHtml); // html안에 넣는다.

    handlePagingEvent(); // 이벤트
}

function handlePagingEvent() {
    $('.board-page').on('click', function() {
        event.preventDefault(); //기본동작을 하는게 막혀버린다. 클릭을 하면.

        //pagingHtml class="disabled" 의 클릭을 막기위해서 만든 코드
        //parent는 상위것만.
        if ($(this).parent('li').hasClass('disabled')) {  // parents는 맨위까지 만날때까지 계속
            return;
        }

        var page= parseInt($(this).attr('page')); //클릭된 어트리뷰트의 페이지
        console.log(page);
        requestList(page); // 이걸 통해서 리스트 페이지를 넘겨준다.
    });
}

function requestList(page) {
    $.ajax({
        url: '/api/cock/member/list',
        data: {
            page: page
        },
        success: function (result) {
            currentPage = page;
            console.log(result);
            setWroteListTemplate(result);
        }
    })
}
// 내가쓴 맛집 수 개수
function setCountWrote(uid) {
    $.ajax({
        url:'/api/cock/member/count/article',
        data : {
            uid : uid
        },
        success: function (result) {
            $('.cock-member-count-total-wrote-article').empty();

            $('.cock-member-count-total-wrote-article').text(result);
        }

    });
}


// 내가쓴 맛집 리스트
function setWroteList(uid) {

    $.ajax({
        url: '/api/cock/member/wrote',
        data: {
            uid : uid
        },
        success: function (result) {
            console.log(result);
            setWroteListTemplate(result);
        }
    });


}
// 내가쓴 맛집 리스트
function setWroteListTemplate(list){
    $('.cock-member-contents-wrote-table tbody').empty();
    for (var i=0; i<list.length; i++){
        var row = list[i];
        var memberWroteTemplate = require('../template/member/member-wrote.hbs');
        var memberWroteHtml = memberWroteTemplate(list);

        $('.cock-member-contents-wrote-table tbody').html(memberWroteHtml);
    }
}

function setBookmarkList(list) {
       $('.cock-member-contents-bookmark-table tbody').empty();

       var memberBookmarkTemplate = require('../template/member/member-bookmark.hbs');
       var memberBookmarkHtml = memberBookmarkTemplate(list);

       $('.cock-member-contents-bookmark-table tbody').html(memberBookmarkHtml);
}

setBookmarkList(bookmark);




