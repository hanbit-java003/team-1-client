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
    $('.cock-join-food-img > .dark-layer').on('click', function () {
       // if ($(this).hasClass('dark-layer')){
            $(this).removeClass('dark-layer').addClass('check-layer');
            $(this).css('background-color','rgba(0, 0, 0, 0.0)');
       // }
    });

    $('.cock-join-food-img > .check-layer').on('click', function () {
       // if ($(this).hasClass('check-layer')){
            $(this).removeClass('check-layer').addClass('dark-layer');
            $(this).css('background-color','rgba(0, 0, 0, 0.7)');
       // }
    });


$('.cock-join-food-save').on('click', function () {
   location.href = './setting.html';
});

module.exports ={
    model : model
}