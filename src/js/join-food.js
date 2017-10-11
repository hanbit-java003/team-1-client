require('../less/join-food.less');

var join = require('./join');

var model = [{
    background:'./img/aaa.jpg'
},{
    background:'./img/aaa.jpg'
},{
    background:'./img/aaa.jpg'
},{
    background:'./img/aaa.jpg'
},{
    background:'./img/aaa.jpg'
},{
    background:'./img/aaa.jpg'
},{
    background:'./img/aaa.jpg'
},{
    background:'./img/aaa.jpg'
},{
    background:'./img/aaa.jpg'
}];

function setList(model) {
    var foodTemplate = require('../template/join-food.hbs');
    var foodHtml = foodTemplate(model);

    $('.cock-join-food').html(foodHtml);
}

setList(model);


$('.cock-join-food-img > div').on('click', function () {

    $(this).css('background-color','rgba(0, 0, 0, 0.0)');


});



$('.cock-join-food-save').on('click', function () {
   location.href = '../';
});

module.exports ={
    model : model
}