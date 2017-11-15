require('bootstrap');
require('../../less/admin/admin-article.less');

var common = require('./common');

// 게시글 관리 1페이지
requestList(1);

// cock cock 에 등록된 총 게시글 수
$.ajax({
    url: '/api/cock/admin/count/article',
    success: function (result) {
        $('.count-total-article').empty();

        $('.count-total-article').text(result);

        setPaging(result);
    }
});

var currentPage = 1;
var rowsPerPage = 20;
var pagesToShow = 5;

// 페이지 계산 & 페이지네이션 태그 생성
function setPaging(total) {
    var totalPages = total / rowsPerPage + (total % rowsPerPage === 0 ? 0 : 1); // ex) total = 25, (25 / 20 => 1) + (25 % 20 = 5 !== 0 => 1) => 1 + 1 = 2 <totalPages = 2>
    var firstPage = 1;
    var lastPage = totalPages;
    var startPage = parseInt((currentPage - 1) / pagesToShow) * pagesToShow + 1; // ex) ((0 / 5 = 0) * 5 = 0) + 1 = 1 <startPage = 1> cf) if (currentPage = 2) => (2 - 1) / 5 = parseInt(1 / 5) = 1 * 5 = 5 + 1 = 6 <startPage = 2>
    var endPage = Math.min(startPage + pagesToShow - 1, lastPage); // 둘 중 더 작은 값 ex) 총 게시글이 25개라서 totalPages = 2 라면 lastPage = tatalPages 이므로 2 페이지까지만 나옴
    var prevPage = startPage - 1;
    var nextPage = endPage + 1;

    // console.log('totalPages: ' + totalPages);
    // console.log('firstPage: ' + firstPage);
    // console.log('lastPage: ' + lastPage);
    // console.log('startPage: ' + startPage);
    // console.log('endPage: ' + endPage);
    // console.log('prevPage: ' + prevPage);
    // console.log('nextPage: ' + nextPage);

    $('.admin-article-pagination .pagination').empty();

    var pagingHtml = ' ';
    pagingHtml += '<li';

    if (prevPage < firstPage) {
        pagingHtml += ' class="disabled"';
    }

    // previous 버튼
    pagingHtml += '>';
    pagingHtml += '<a class="board-page" page="' + prevPage + '" href="#" aria-label="Previous">';
    pagingHtml += '<span aria-hidden="true">&laquo;</span>'; // &laquo 는 <<
    pagingHtml += '</a>';
    pagingHtml += '</li>';

    // page 버튼
    for (var i=startPage; i<=lastPage; i++) {
        pagingHtml += '<li';

        if (i === currentPage) {
            pagingHtml += ' class="active"';
        }

        pagingHtml += '>';
        pagingHtml += '<a class="board-page" page="' + i + '" href="#">' + i + '</a></li>';
    }

    // next 버튼
    pagingHtml += '<li';

    if (nextPage > lastPage) {
        pagingHtml += ' class="disabled"';
    }

    pagingHtml += '>';
    pagingHtml += '<a class="board-page" page="' + nextPage + '" href="#" aria-label="Next">';
    pagingHtml += '<span aria-hidden="true">&raquo;</span>'; // &raquo 는 >>
    pagingHtml += '</a>';
    pagingHtml += '</li>';

    $('.admin-article-pagination .pagination').html(pagingHtml);

    handlePagination();
}

// 페이지네이션 클릭이벤트
function handlePagination() {
    $('.board-page').on('click', function (event) {
        event.preventDefault();

        if ($(this).parent('li').hasClass('disabled')) {
            return;
        }

        var page = parseInt($(this).attr('page'));

        requestList(page);

        $('.board-page').parent('li').removeClass('active');
        $(this).parent('li').addClass('active');
    });
}

function requestList(page) {
    $.ajax({
        url: '/api/cock/admin/article',
        data: {
            page: page
        },
        success: function(result) {
            currentPage = page;

            // console.log(currentPage);

            setList(result);
        }
    });
}

function setList(list) {
    $('.admin-article-table tbody').empty();

    var adminArticleTemplate = require('../../template/admin/admin-article-list.hbs');
    var adminArticleHtml = adminArticleTemplate(list);

    $('.admin-article-table tbody').html(adminArticleHtml);

    $('.article-delete-btn').on('click', function () {
        var rid = $(this).attr('rid');
        var articleId = $(this).attr('articleId');
        // console.log('rid = ' + rid);
        // console.log('articleId = ' + articleId);

        common.openDialog({
            body: '&lt; WARNING!! &gt;' + '<br>' + '<br>' + '음란, 불법 게시글 및 광고 이외에는 작성자에게 확인 후 삭제해주십시오.' + '<br>' + '<br>' + '정말 삭제하시겠습니까?',
            buttons: [{
                id: 'delete',
                name: '삭제',
                style: 'danger'
            }],
            handler: function (btnId) {
                if (btnId == 'delete') {
                    $.ajax({
                        url: '/api/cock/admin/' + rid + '/' + articleId,
                        method: 'DELETE',
                        success: function (result) {
                            location.href = './admin-article.html';
                        },
                        error: function () {
                            alert('삭제 중 오류가 발생하였습니다.');
                        }
                    });

                    common.closeDialog();
                }
            }
        })
    });

}