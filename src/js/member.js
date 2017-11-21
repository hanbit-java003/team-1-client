require('./common.js');
require('../less/member.less');

var common = require('./common.js');

var adminCommon = require('./admin/common');

var bookmark = require('../js/bookmark-review.js');

var nick;
common.ajax({
    url:'/api/member/get',
    success: function (result) {
        if (!result.signedIn) {
            location.href= '/'; // 기본홈으로 돌려보냄.
        }
        nick = result.nick;
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
    $('.cock-member-info-welcome').append('<span class="cock-member-info-nick">'+nick+'</span>'+'님의 회원 정보');

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

        if($('.cock-member-wrote').hasClass('active')){
            /*console.log('실행1');*/
            // 내가쓴 맛집 수 개수
            setCountWrote(member.uid);
            /*// 내가쓴 맛집 리스트
            setWroteList(member.uid);*/
            // 페이징 처리를 위한 토탈..
            setTotalWrote(member.uid);
            // 내가 쓴 맛집 리스트 페이지 처리후.
            requestWroteList(currentPageWrote);

        }
        else if($('.cock-member-bookmark').hasClass('active')){
            /*console.log('실행2');*/
            // 즐겨찾기 한 맛집 개수
            setCountBookmark();
            // 페이징 처리를 위한 토탈..
            setTotalBookmark();

            requestBookmarkList(currentPageBookmark);

        }
    });

        // 내가쓴 맛집 수 개수
        setCountWrote(member.uid);
        /*// 내가쓴 맛집 리스트
        setWroteList(member.uid);*/
        // 페이징 처리를 위한 토탈..
        setTotalWrote(member.uid);
        // 내가 쓴 맛집 리스트 페이지 처리후.
        requestWroteList(currentPageWrote);




}// 페이징 처리를 위한 토탈..
function setTotalWrote(uid) {
    $.ajax({
        url:'/api/cock/member/total/article',
        data:{
            uid : uid
        },
        success: function (result) {
            var total = result.total;

           /* console.log(total);*/

            setPagingWrote(total);
        }
    });
}


var currentPageWrote = 1;  // 현재페이지
var rowsPerPageWrote = 10;  // 페이지내에서 보여지는 게시글의 수
var pagesToShowWrote = 10;  // 페이지 넘기는거 몇개씩 보여주는거

// 페이징 처리를 하기 위해서 만든 메소드
function setPagingWrote(total) {
    var totalPages = total / rowsPerPageWrote
        + (total % rowsPerPageWrote ===0 ? 0 : 1);
    var firstPage= 1;
    var lastPage = totalPages;
    var startPage = parseInt((currentPageWrote -1) / pagesToShowWrote ) * pagesToShowWrote + 1;
    var endPage = Math.min(startPage+ pagesToShowWrote - 1, lastPage);
    // 두개의 값중에 작은 숫자가 리턴이 된다. Math.min
    var prevPage = startPage - 1;
    var nextPage = endPage +1;

    $('.board-list .pagination-wrote').empty(); //이 경로안에 있는걸 다 지운다?

    var pagingHtml = '';
    pagingHtml += '<li'; //클릭하지 못하게 만든 클래스
    if (prevPage < firstPage) {
        pagingHtml += ' class="disabled"';
    }
    pagingHtml +=  '>';
    pagingHtml += '<a class="board-page board-page-wrote"';
    pagingHtml += ' page="' + prevPage + '"';
    pagingHtml += ' href="#" aria-label="Previous">';
    pagingHtml += '<span aria-hidden="true">&laquo;</span>';
    pagingHtml += '</a>';
    pagingHtml += '</li>';  // 왼쪽 버튼

    for(var i = startPage; i<=endPage; i++) {
        pagingHtml += '<li';
        if(i === currentPageWrote) {
            pagingHtml += ' class="active"';
        }

        pagingHtml += '><a class="board-page board-page-wrote"';
        pagingHtml += ' page="' + i + '"';
        pagingHtml += ' href="#">'+ i +'</a></li>' ;  // 페이지 수?
    }
    pagingHtml += '<li';
    if (nextPage > lastPage) {
        pagingHtml += ' class="disabled"';
    }
    pagingHtml += '>';
    pagingHtml += '<a class="board-page board-page-wrote"';
    pagingHtml += ' page="' + nextPage + '"';
    pagingHtml += ' href="#" aria-label="Next">';
    pagingHtml += '<span aria-hidden="true">&raquo;</span>';
    pagingHtml += '</a>';
    pagingHtml += '</li>';  //오른쪽 버튼

    $('.board-list .pagination-wrote').html(pagingHtml); // html안에 넣는다.

    handlePagingEventWrote(); // 이벤트
}

function handlePagingEventWrote() {
    $('.board-page-wrote').on('click', function() {
        event.preventDefault(); //기본동작을 하는게 막혀버린다. 클릭을 하면.

        //pagingHtml class="disabled" 의 클릭을 막기위해서 만든 코드
        //parent는 상위것만.
        if ($(this).parent('li').hasClass('disabled')) {  // parents는 맨위까지 만날때까지 계속
            return;
        }

        var page= parseInt($(this).attr('page')); //클릭된 어트리뷰트의 페이지
        /*console.log(page);*/
        requestWroteList(page); // 이걸 통해서 리스트 페이지를 넘겨준다.
            $('.board-page-wrote').parent('li').removeClass('active');
            $(this).parent('li').addClass('active');



    });
}

// 페이징 처리를 위한 토탈..
function setTotalBookmark() {
    $.ajax({
        url:'/api/cock/member/total/bookmark',
        success: function (result) {
            var total = result.total;

            /*console.log(total+'total');*/

            setPagingBookmark(total);
        }
    });
}


var currentPageBookmark = 1;  // 현재페이지
var rowsPerPageBookmark = 7;  // 페이지내에서 보여지는 게시글의 수
var pagesToShowBookmark = 10;  // 페이지 넘기는거 몇개씩 보여주는거

// 페이징 처리를 하기 위해서 만든 메소드
function setPagingBookmark(total) {
    var totalPages = total / rowsPerPageBookmark
        + (total % rowsPerPageBookmark ===0 ? 0 : 1);
    var firstPage= 1;
    var lastPage = totalPages;
    var startPage = parseInt((currentPageBookmark -1) / pagesToShowBookmark ) * pagesToShowBookmark + 1;
    var endPage = Math.min(startPage+ pagesToShowBookmark - 1, lastPage);
    // 두개의 값중에 작은 숫자가 리턴이 된다. Math.min
    var prevPage = startPage - 1;
    var nextPage = endPage +1;

    $('.board-list .pagination-bookmark').empty(); //이 경로안에 있는걸 다 지운다?

    var pagingHtml = '';
    pagingHtml += '<li'; //클릭하지 못하게 만든 클래스
    if (prevPage < firstPage) {
        pagingHtml += ' class="disabled"';
    }
    pagingHtml +=  '>';
    pagingHtml += '<a class="board-page board-page-bookmark"';
    pagingHtml += ' page="' + prevPage + '"';
    pagingHtml += ' href="#" aria-label="Previous">';
    pagingHtml += '<span aria-hidden="true">&laquo;</span>';
    pagingHtml += '</a>';
    pagingHtml += '</li>';  // 왼쪽 버튼

    for(var i = startPage; i<=endPage; i++) {
        pagingHtml += '<li';
        if(i === currentPageBookmark) {
            pagingHtml += ' class="active"';
        }

        pagingHtml += '><a class="board-page board-page-bookmark"';
        pagingHtml += ' page="' + i + '"';
        pagingHtml += ' href="#">'+ i +'</a></li>' ;  // 페이지 수?
    }
    pagingHtml += '<li';
    if (nextPage > lastPage) {
        pagingHtml += ' class="disabled"';
    }
    pagingHtml += '>';
    pagingHtml += '<a class="board-page board-page-bookmark"';
    pagingHtml += ' page="' + nextPage + '"';
    pagingHtml += ' href="#" aria-label="Next">';
    pagingHtml += '<span aria-hidden="true">&raquo;</span>';
    pagingHtml += '</a>';
    pagingHtml += '</li>';  //오른쪽 버튼

    $('.board-list .pagination-bookmark').html(pagingHtml); // html안에 넣는다.

    handlePagingEventBookmark(); // 이벤트
}

function handlePagingEventBookmark() {
    $('.board-page-bookmark').on('click', function() {
        event.preventDefault(); //기본동작을 하는게 막혀버린다. 클릭을 하면.

        //pagingHtml class="disabled" 의 클릭을 막기위해서 만든 코드
        //parent는 상위것만.
        if ($(this).parent('li').hasClass('disabled')) {  // parents는 맨위까지 만날때까지 계속
            return;
        }

        var page= parseInt($(this).attr('page')); //클릭된 어트리뷰트의 페이지
        /*console.log(page);*/
            requestBookmarkList(page);
            $('.board-page-bookmark').parent('li').removeClass('active');
            $(this).parent('li').addClass('active');

    });
}

// 내가쓴 맛집 리스트 페이지 처리를 해서 나옴.
function requestWroteList(page) {
    $.ajax({
        url: '/api/cock/member/wrote/list',
        data: {
            page: page
        },
        success: function (result) {
            currentPageWrote = page;
            setWroteList(result);
        }
    })
}

// 내가 즐겨찾기 한 맛집 리스트가 페이지 처리를 해서 나옴.
function requestBookmarkList(page) {
    $.ajax({
        url: '/api/cock/member/bookmark/list',
        data: {
            page: page
        },
        success: function (result) {
            /*console.log('실행실행');*/
            currentPageBookmark = page;
            setBookmarkList(result);
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

// 즐겨찾기 한 맛집 개수
function setCountBookmark() {
    $.ajax({
       url: '/api/cock/member/count/bookmark',
        success: function (result) {
           /*console.log(result+'맛 집 개수');*/
            $('.cock-member-count-total-bookmark-article').empty();

            $('.cock-member-count-total-bookmark-article').text(result);
        }
    });
}

// 내가쓴 맛집 리스트
/*function setWroteList(uid) {

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
}*/

// 내가쓴 맛집 리스트
function setWroteList(list){
    $('.cock-member-contents-wrote-table tbody').empty();

    var memberWroteTemplate = require('../template/member/member-wrote.hbs');
    var memberWroteHtml = memberWroteTemplate(list);

    $('.cock-member-contents-wrote-table tbody').html(memberWroteHtml);

    // 리스트 에서 클릭시 detail 페이지로 넘어감.
    $('.cock-member-contents-wrote-table tbody tr').on('click', function () {
        goDetail($(this).attr('rid'));
    });

    function goDetail(rid) {
        location.href = 'detail.html?rid=' + rid;
    }

    // 리스트 에서 클릭시 수정
    $('.cock-member-contents-wrote-table tbody tr .cock-member-wrote-info-btn').on('click', function (event) {
        event.stopPropagation();
        goDetailModify($(this).attr('rid'), $(this).attr('articleId'));
    });
    
    function goDetailModify(rid,articleId) {
        location.href = './insert.html?rid=' + rid + '&articleId=' + articleId;
    }


    // 리스트에서 클릭시 삭제
    $('.cock-member-contents-wrote-table tbody tr .cock-member-wrote-remove-btn').on('click', function (event) {
        event.stopPropagation();
        WroteRemove($(this).attr('rid'), $(this).attr('articleId'));
    });
    
    function WroteRemove(rid,articleId) {
        adminCommon.openDialog({
           body: '&lt; 게시글 삭제 &gt;' +'<br>' + '<br>' + '정말 삭제하시겠습니까?',
           title: 'CockCock 게시글 삭제',
            buttons:[{
                id: 'delete',
                name: '게시글 삭제',
                style: 'danger'
            }],
            handler: function (btnId) {
                if (btnId == 'delete') {
                    common.ajax({
                        url: '/api/cock/detail/' + rid + '/' + articleId,
                        method: 'DELETE',
                        success: function (result) {
                            alert('게시글이 삭제 되었습니다.');
                            location.href = location.href;
                        }
                    });
                }
            }
        });
    }

}

// 내가 즐겨찾기 한 리스트
function setBookmarkList(list) {
       $('.cock-member-contents-bookmark-table tbody').empty();

       var memberBookmarkTemplate = require('../template/member/member-bookmark.hbs');
       var memberBookmarkHtml = memberBookmarkTemplate(list);

       $('.cock-member-contents-bookmark-table tbody').html(memberBookmarkHtml);

       // 리스트 에서 클릭시 detail 페이지로 넘어감.
    $('.cock-member-contents-bookmark-table tbody tr').on('click', function () {
        goDetail($(this).attr('rid'));
    });

    function goDetail(rid) {
        location.href = 'detail.html?rid=' + rid;
    }

    // 리스트 에서 클릭시 즐겨찾기 삭제
    $('.cock-member-contents-bookmark-table tbody tr .cock-member-bookmark-remove-btn').on('click', function (event) {
        event.stopPropagation();

        BookmarkRemove($(this).attr('rid'));

    });

    function BookmarkRemove(rid) {
        adminCommon.openDialog({
            body: '&lt; 즐겨찾기 삭제 &gt;' +'<br>' + '<br>' + '정말 삭제하시겠습니까?',
            title: 'CockCock 즐겨찾기 삭제',
            buttons:[{
                id: 'delete',
                name: '즐겨찾기 삭제',
                style: 'danger'
            }],
            handler: function (btnId) {
                if(btnId === 'delete'){
                    $.ajax({
                        url: '/api/cock/member/bookmark/remove',
                        data: {
                            rid: rid
                        },
                        success: function (result) {
                            alert('즐겨찾기에서 삭제되었습니다.');
                            location.href = location.href;
                        }
                    });
                }

            }
        });
    }
}







