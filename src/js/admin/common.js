require('bootstrap');
require('../../less/admin/common.less');

var common = require('../common');

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

$('#admin-alert-rest').on('click', function () {
    location.href = '/admin/admin-alert-rest.html';
});

$('#admin-alert-article').on('click', function () {
    location.href = '/admin/admin-alert-article.html';
});

$('#admin-logout').on('click', function () {
    common.signOut();
});

// modal 열림
function openDialog(options) {
    var modalTemplate =require('../../template/admin/modal.hbs');
    var modalHtml = modalTemplate({
        title: options.title || 'Cock Cock System',
        body: options.body,
        buttons: options.buttons || []
    });

    var dialog = $(modalHtml);

    $('body').append(dialog);

    $('#cock-modal').modal('show');

    // 삭제확인 창에서 삭제 버튼 클릭.
    $('.cock-dialog-btn').on('click', function () {
        if (typeof options.handler === 'function') {
            var btnId = $(this).attr('btn-id');

            options.handler(btnId);
        }
    });

    // modal 이 숨겨지면 지움.
    $('#cock-modal').on('hidden.bs.modal', function () {
        $('#cock-modal').remove();
    });
}

// modal 닫힘
function closeDialog() {
    $('#cock-modal').modal('hide');
}

module.exports = {
    openDialog: openDialog,
    closeDialog: closeDialog
};