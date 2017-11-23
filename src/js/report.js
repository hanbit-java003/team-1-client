require('bootstrap');
require('../less/report.less');

var UrlSearchParams = require('url-search-params');
var params = new UrlSearchParams(location.search);
var rid = params.get('rid');
var articleId = params.get('articleId');
var common = require('./common');

$('.report-btn-cancel').on('click', function () {
    history.back();
});

// aaid, rid, article_id, uid, report, status
var report = {};
$('.report-btn-save').unbind('click').on('click', function () {
    report.rid = rid;
    report.articleId = articleId;
    report.uid = common.getUser().uid;
    report.report = $('#report-alert-article').val() + '<br/>' + $('#report-textarea').val()
    report.status = '미해결';

    $.ajax({
        type: 'POST',
        url: '/api/cock/admin/alert/article/insert',
        data: JSON.stringify(report),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            history.back();
        }
    });
});