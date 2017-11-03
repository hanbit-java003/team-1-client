require('bootstrap');
require('../../less/admin/common.less');

$('#admin-main').on('click', function () {
    location.href = '/admin';
});

$('#admin-rest').on('click', function () {
    location.href = '/admin/admin-rest.html';
});

$('#admin-article').on('click', function () {
    location.href = '/admin/admin-article.html';
});

$('#admin-member').on('click', function () {
    location.href = '/admin/admin-member.html';
});