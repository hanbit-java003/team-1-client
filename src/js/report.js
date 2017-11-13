require('bootstrap');
require('../less/report.less');

var common = require('./common');

$('.report-btn-cancel').on('click', function () {
    history.back();
});

$('.report-btn-save').unbind('click').on('click', function () {
    console.log('저장');
});