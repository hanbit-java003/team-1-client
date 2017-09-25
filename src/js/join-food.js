require('../less/join-food.less');

var join = require('./join');

var model = [{
    background:'./img/Koala.jpg'
},{
    background:'./img/Koala.jpg'
},{
    background:'./img/Koala.jpg'
},{
    background:'./img/Koala.jpg'
},{
    background:'./img/Koala.jpg'
},{
    background:'./img/Koala.jpg'
},{
    background:'./img/Koala.jpg'
},{
    background:'./img/Koala.jpg'
},{
    background:'./img/Koala.jpg'
}];

function setList(model) {
    var foodTemplate = require('../template/join-food.hbs');
    var foodHtml = foodTemplate(model);

    $('.cock-join-food').html(foodHtml);
}

setList(model);


$('.cock-join-food-save').on('click', function () {
   location.href = './setting.html';
});