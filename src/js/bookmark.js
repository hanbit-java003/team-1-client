require('../less/bookmark.less');
require('bootstrap');
require('./main.js');

var loadGoogleMapsApi = require('load-google-maps-api-2');

loadGoogleMapsApi.key = 'AIzaSyBItgKQoeoJUNrQiMPHXXMiSqXOBKw1w0w';
loadGoogleMapsApi.language = 'ko';
loadGoogleMapsApi.version = '3';

var bookmarkModel = require('./bookmark-card');
// model은 bookmark-card.js
var template = require('../template/bookmark-card.hbs');

function initBookmark() {

    for (var i=0; i<bookmarkModel.length; i++) {

        var html = template(bookmarkModel[i]);

        $('.bookmark-container').append(html);
    }

    // Bookmark 버튼 클릭시 변환
    $('.bookmark-btn').on('click', function () {
        if($(this).hasClass('fa-star')) {
            $(this).removeClass('fa-star').addClass('fa-star-o');
            $(this).css('color', '#ff8300');
            alert("즐겨찾기 목록에서 제거되었습니다.")
        }
        else if ($(this).hasClass('fa-star-o')) {
            $(this).removeClass('fa-star-o').addClass('fa-star');
            $(this).css('color', '#ff8300');
            alert("즐겨찾기 목록에 추가되었습니다.")
            /*이 알람이 필요할런지 모르겠지만 일단은 추가함.*/
        }
    });
}

initBookmark();

function initBookmarkMap() {

    loadGoogleMapsApi().then(function (googleMaps) {

        var infowindow = new googleMaps.InfoWindow();
        var marker;
        var i;

        var mapOptions = {
            zoom: 16,
            scrollwheel: false,
            center:
                new googleMaps.LatLng(bookmarkModel[0].lat, bookmarkModel[0].lng)
        };

        var bookmarkMaps = new googleMaps.Map($('.bookmark-map')[0], mapOptions);

        var spoonMark = '../img/spoon_red.png';

        for (i=0; i<bookmarkModel.length; i++) {
            marker = new googleMaps.Marker({
                position: new googleMaps.LatLng(bookmarkModel[i].lat, bookmarkModel[i].lng),
                map: bookmarkMaps,
                icon: spoonMark
            });

            googleMaps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infowindow.setContent(bookmarkModel[i].title);
                    infowindow.open(bookmarkMaps, marker);
                }
            })(marker, i));


        }

/*
        $('.bookmark-list').on('click', function () {

            var mapOptions = {
                zoom: 16,
                scrollwheel: true,
                center:
                    new googleMaps.LatLng(bookmarkModel[i].lat, bookmarkModel[i].lng)
            };

            var goBookmark = new googleMaps.Map($('.bookmark-map')[0], mapOptions);


        });*/


    }).catch(function (error) {
        console.error(error);
    });

}


initBookmarkMap();


function goBookmark() {
    $('.bookmark-list').on('click',function () {
        var bookmarkDetail = $(this).attr('uid');


    });
}
