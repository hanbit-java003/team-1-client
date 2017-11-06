require('bootstrap');
require('../../less/admin/admin-rest-edit.less');

var common = require('./common');

var UrlSearchParams = require('url-search-params');
var params = new UrlSearchParams(location.search);