require('bootstrap');
require('../../less/admin/admin-rest.less');

var common = require('./common');

$.ajax({
    url: '/api/cock/admin/rest',
    success: function (result) {
        setList(result);

        console.log(result);
    }
});

function setList(list) {
    $('.admin-rest-table tbody').empty();

    var adminRestTemplate = require('../../template/admin/admin-rest-list.hbs');
    var adminRestHtml = adminRestTemplate(list);

    $('.admin-rest-table tbody').html(adminRestHtml);
}

$.ajax({
    url: '/api/cock/admin/count/rest',
    success: function (result) {
        $('.count-total-rest').empty();

        $('.count-total-rest').text(result);
    }
});