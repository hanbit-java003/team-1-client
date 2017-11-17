require('bootstrap');
require('../../less/admin/admin-alert-article-detail.less');

var common = require('./common');
var UrlSearchParams = require('url-search-params');
var params = new UrlSearchParams(location.search);

var rid = params.get('rid');
var articleId = params.get('articleId');
var aaid = params.get('aaid');

init();
/*
aaid:3
articleId:2
no:0
report:"asdf<br/>123123"
rid:0
status:"미해결"
uid:"ECDNksKGlvhD"
 */
var model = {};
function init() {
    $.ajax({
        url: '/api/cock/admin/alert/article/detail/'+ rid +'/'+ articleId +'/'+ aaid,
        success: function (result) {
            model = result;
            setText();
            onClickEvent();
        }
    });
}

function setText() {
    $('.alert-article-rid').html(model.rid);
    $('.alert-article-articleId').html(model.articleId);
    $('.alert-article-aaid').html(model.aaid);
    $('.alert-article-report').html(model.report);
    $('.alert-article-uid').html(model.uid);
}

var status = '대기';
var isDelete = false;
function onClickEvent() {
    $('.dropdown-menu li').on('click', function () {
        var btn = $(this).parent().parent().find('button');
        status = $(this).text();

        if (status === '삭제') {
            isDelete = confirm('정말로 삭제 하시겠습니까?');

            if(isDelete) {
                btn.removeClass('btn-default');
                btn.addClass('btn-danger')
            }
        }
        else {
            btn.removeClass('btn-danger');
            btn.addClass('btn-warning')
            isDelete = false;
        }

        btn.text(status);
    });

    $('.alert-article-link').on('click', function () {
        location.href = '../detail.html?rid='+ rid;
    });

    $('.alert-article-save').on('click', function () {
        applyEdit();
    });

    $('.alert-article-remove').on('click', function () {
        var isDelete = confirm('신고된 접수를 삭제 하시겠습니까?');

        if(isDelete) {
            $.ajax({
                url:'/api/cock/admin/alert/article/remove',
                async: false,
                method: 'post',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(model),
                success: function (result) {
                    alert(result.msg);
                    location.href = 'admin-alert-article.html';
                }
            });
        }
    });

    $('.alert-article-cencel').on('click', function () {
        history.back();
    });
}

function applyEdit() {
    var text = $('#article-textarea-apply').val();
    if (text === '') {
        alert('처리 현황을 적으세요.');
        return;
    }

    var formData = model;
    var report = model.report;
    report += '<br/>: {' + text + '}';
    formData.report = report;
    formData.status = status;

    console.log(formData);

    $.ajax({
        url:'/api/cock/admin/alert/article/apply',
        async: false,
        method: 'post',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(formData),
        success: function (result) {
            alert(result.msg);
            location.reload();
        }
    });
}