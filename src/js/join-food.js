require('../less/join-food.less');

var model = {
    background:'./img/Koala.jpg'
};

function setList(model) {
    var foodTemplate = require('../template/join-food.hbs');
    var foodHtml = foodTemplate(model);

    $('.cock-join-food').html(foodHtml);
}

setList(model);