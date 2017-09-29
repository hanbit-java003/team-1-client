require('../less/bookmark.less');
require('bootstrap');
require('./main.js');

var model = require('./bookmark-card');
// model은 bookmark-card.js
var template = require('../template/bookmark-card.hbs');

function initBookmark() {

    for (var i=0; i<model.length; i++) {

        var html = template(model[i]);

        $('.bookmark-container').append(html);
    }

    // Bookmark 버튼 클릭시 변환
    $('.bookmark-btn').on('click', function () {
        if($(this).hasClass('fa-bookmark')) {
            $(this).removeClass('fa-bookmark').addClass('fa-bookmark-o');
            $(this).css('color', '#ff8300');
        }
        else if ($(this).hasClass('fa-bookmark-o')) {
            $(this).removeClass('fa-bookmark-o').addClass('fa-bookmark');
            $(this).css('color', '#ff8300');
        }
    });
}

initBookmark();



