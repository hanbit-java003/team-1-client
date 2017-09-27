require('../less/bookmark.less');
require('bootstrap');

var model = require('./bookmark-card');
var template = require('../template/bookmark-card.hbs');


for (var i=0; i<model.length; i++) {

    var html = template(model[i]);

    $('.bookmark-container').append(html);
}
