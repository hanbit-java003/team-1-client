require('bootstrap');
require('../../less/admin/main.less');

var common = require('./common');

function initAdminMain() {
    $.ajax({
        url: '/api/cock/admin/count/rest',
        success: function (result) {
            $('.count-rest').empty();

            $('.count-rest').html(result);
        }
    });

    $.ajax({
        url: '/api/cock/admin/count/article',
        success: function (result) {
            $('.count-article').empty();

            $('.count-article').html(result);
        }
    });

    $.ajax({
        url: '/api/cock/admin/count/member',
        success: function (result) {
            $('.count-member').empty();

            $('.count-member').html(result);
        }
    });
}

initAdminMain();
