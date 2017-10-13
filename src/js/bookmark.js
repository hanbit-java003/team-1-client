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

var i;
var bookmarkMaps;


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
            alert("즐겨찾기 목록에서 제거되었습니다.");
        }
        else if ($(this).hasClass('fa-star-o')) {
            $(this).removeClass('fa-star-o').addClass('fa-star');
            $(this).css('color', '#ff8300');
            alert("즐겨찾기 목록에 추가되었습니다.");
            /*이 알람이 필요할런지 모르겠지만 일단은 추가함.*/
        }
    });

    bookmarkHover();
}

initBookmark();

function initBookmarkMap() {

    loadGoogleMapsApi().then(function (googleMaps) {

        var infowindow = new googleMaps.InfoWindow();
        var marker;

        var mapOptions = {
            zoom: 16,
            scrollwheel: false,
            center:
                new googleMaps.LatLng(bookmarkModel[0].lat, bookmarkModel[0].lng)
        };

        bookmarkMaps = new googleMaps.Map($('.bookmark-map')[0], mapOptions);

        var spoonMark = '../img/spoon_red.png';

        for (i=0; i<bookmarkModel.length; i++) {
            marker = new googleMaps.Marker({
                position: new googleMaps.LatLng(bookmarkModel[i].lat, bookmarkModel[i].lng),
                map: bookmarkMaps,
                icon: spoonMark
            });

            //marker 클릭 시 점포 이름과 주소가 같이 출력

            googleMaps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infowindow.setContent(bookmarkModel[i].title
                        + '<br/>' + bookmarkModel[i].address);
                    infowindow.open(bookmarkMaps, marker);
                }

            })(marker, i));

        }

    }).catch(function (error) {
        console.error(error);
    });

}

initBookmarkMap();

//북마크 리스트 마우스 오버 이벤트
function bookmarkHover() {
    $('.bookmark-container > li').on('mouseenter', function () {

        var location = $(this).find('.location-info');
        var lat = parseFloat(location.attr('lat'));
        var lng = parseFloat(location.attr('lng'));

        var locationLatLng = {lat: lat, lng: lng};
        bookmarkMaps.panTo(locationLatLng);
    });
}

