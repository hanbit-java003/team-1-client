require('../less/join.less');

var common = require('./common.js');

$('#cock-join-email-btn').on('click', function () {
    console.log('dsadasd');

    var email = $('#cock-join-email').val().trim();

    $.ajax({
        url:'/api/sendMail/auth',
        method:'POST',
        data: {
            email: email
        },
        success: function (result) {
            console.log(result);
        },
        error: function (jqXHR) {
            console.log('dsadsa');
        }


    });

});



$('.cock-join-btn-cancel').on('click', function () {
    location.href = './';
});

$('.cock-join-btn-save').on('click', function () {
    location.href = './join-food.html';
});