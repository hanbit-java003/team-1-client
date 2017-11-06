require('bootstrap');
require('../../less/admin/main.less');

var common = require('./common');

function initAdminMain() {
    $.ajax({
        url: '/api/cock/admin/count/rest',
        success: function (result) {
            $('.count-rest').empty();

            $('.count-rest').text(result);
        }
    });

    $.ajax({
        url: '/api/cock/admin/count/article',
        success: function (result) {
            $('.count-article').empty();

            $('.count-article').text(result);
        }
    });

    $.ajax({
        url: '/api/cock/admin/count/member',
        success: function (result) {
            $('.count-member').empty();

            $('.count-member').text(result);
        }
    });
}

initAdminMain();
