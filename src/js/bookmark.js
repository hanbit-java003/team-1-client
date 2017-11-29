require('../less/bookmark.less');
require('../less/setting.less');
require('bootstrap');

var common = require('./common');


var loadGoogleMapsApi = require('load-google-maps-api-2');

loadGoogleMapsApi.key = 'AIzaSyBItgKQoeoJUNrQiMPHXXMiSqXOBKw1w0w';
loadGoogleMapsApi.language = 'ko';
loadGoogleMapsApi.version = '3';

var bookmarkModel = require('./bookmark-card');
// model은 bookmark-card.js

var bookmarkCardTemplate = require('../template/bookmark/bookmark-card.hbs');

var bookmarkReviewTemplate = require('../template/bookmark/bookmark-review.hbs');

var mainColor = '#f99595';

var i;
var bookmarkMaps;
var marker;
var googleMaps;
var infoWindow;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            initBookmarkMap(position);
        }, function (error) { // 위치 찾기 에러 시 콜백
            console.error(error);
            alert('내 위치 확인을 허용해 주세요.');
            initBookmarkMap();
        }, {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: Infinity
        });
    }
    else {
        alert('GPS를 지원하지 않습니다.');
    }
}

getLocation();

function initBookmarkMap(position) {

    loadGoogleMapsApi().then(function (_googleMaps) {

        googleMaps = _googleMaps;

        infoWindow = new googleMaps.InfoWindow();

        var mapOptions = {
            zoom: 16,
            scrollwheel: false,
            center:
                new googleMaps.LatLng(position.coords.latitude, position.coords.longitude)
        };

        bookmarkMaps = new googleMaps.Map($('.bookmark-map')[0], mapOptions);

        //var spoonMark = '../img/insert/red-dot.png';

        for (i=0; i<bookmarkModel.length; i++) {
            marker = new googleMaps.Marker({
                position: new googleMaps.LatLng(bookmarkModel[i].lat, bookmarkModel[i].lng),
                map: bookmarkMaps,
                icon: '../img/insert/red-dot.png'
            });

            //marker 클릭 시 점포 이름과 주소가 같이 출력

            googleMaps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infoWindow.setContent(bookmarkModel[i].name
                        + '<br/>' + bookmarkModel[i].address);
                    infoWindow.open(bookmarkMaps, marker);
                }
            })(marker, i));
        }
    }).catch(function (error) {
        console.error(error);
    });

    getBookmark();

}

//initBookmarkMap();

var bookmarkModel;

function bookmarkReview() {

    $('.bookmark-container > li').on('click', function () {
        var reviewId = parseInt($(this).attr('rid'));

        // === 를 쓰는것은 String 일 때, == 로 하는 것은 Integer 일 때
        for(i=0; i<bookmarkModel.length; i++) {
            if (reviewId === bookmarkModel[i].rid) {
                var html = bookmarkReviewTemplate(bookmarkModel[i]);

                $('.detail-review').html(html);
                break;
            }
        }
        clickDetail();
    });
}


function getBookmarkReview() {

    $.ajax({
        url:'/api/cock/bookmark/review',
        success: function (result) {
            bookmarkModel = result;

            bookmarkReview();

        }
    });
}


function clickDetail() {
    $('.detail-container > .detail-review > li > a').on('click', function () {
        var goId = $(this).attr('rid');

        bookmarkToDetail(goId);
    });
}


var bookmarkContents;

function getBookmark() {

    $.ajax({
        url: '/api/cock/bookmark/bookmarks',
        success: function (result) {
            initBookmark(result);

            if(result.length === 0) {
                $('.bookmark-container').hide();
                $('.bookmark-result_empty').show();
            }
            else {
                $('.bookmark-result_empty').hide();
            }

            bookmarkContents = result;

            for(i=0; i < result.length; i++) {
                marker = new googleMaps.Marker({
                    position: new googleMaps.LatLng(result[i].lat, result[i].lng),
                    map: bookmarkMaps,
                    icon: '../img/insert/red-dot.png'
                });
            }
            googleMaps.event.addListener(marker, 'click', (function (marker, i) {
               return function () {
                   infoWindow.setContent(result[i].name + '<br/>' + result[i].address);
                   infoWindow.open(map, marker);
               }
            })(marker, i));
        }
    });
}


function initBookmark(bookmarkModel) {
    $('.bookmark-container').empty();

    for (var i=0; i<bookmarkModel.length; i++) {

        var html = bookmarkCardTemplate(bookmarkModel[i]);

        $('.bookmark-container').append(html);
    }

    // Bookmark 버튼 클릭시 변환
    $('.bookmark-btn').unbind('click').on('click', function (event) {
        event.stopPropagation();

        var rid = $(this).parents('li').attr('rid');

        if($(this).hasClass('fa-star')) {

            $(this).removeClass('fa-star').addClass('fa-star-o');
            $(this).css('color', mainColor);

            $.ajax({
               url: 'api/cock/bookmark/delete',
                data: {
                   rid: rid
                },
                success: function (result) {
                    alert("즐겨찾기 목록에서 제거되었습니다.");
                }
            });
        }
        else if ($(this).hasClass('fa-star-o')) {
            $(this).removeClass('fa-star-o').addClass('fa-star');
            $(this).css('color', mainColor);

            $.ajax({
               url: 'api/cock/bookmark/save',
               data: {
                   rid: rid
               },
               success: function (result) {
                   alert("즐겨찾기 목록에 추가되었습니다.");
                   /*이 alert이 필요할런지 모르겠지만 일단은 추가함.*/
               }
            });
        }
    });

    bookmarkClick();
    getBookmarkReview();
}


//북마크 리스트 클릭 이벤트
function bookmarkClick() {

    var spoonMark;

    $('.bookmark-container > li').on('mouseenter', function () {

        spoonMark = '../img/insert/red-dot.png';

        var location = $(this).find('.location-info');

        var lat = parseFloat(location.attr('lat'));
        var lng = parseFloat(location.attr('lng'));

        var locationLatLng = {lat: lat, lng: lng};

        bookmarkMaps.panTo(locationLatLng);

        /*marker = new googleMaps.Marker({
           position: new googleMaps.LatLng(locationLatLng),
           map: bookmarkMaps,
           icon: spoonMark
        });*/

        $(this).on('click', function () {
            spoonMark = '../img/insert/blue-dot.png';

            marker = new googleMaps.Marker({
                position: new googleMaps.LatLng(locationLatLng),
                map: bookmarkMaps,
                icon: spoonMark
            });

            var bookmarkContent = $(this).find('.bookmark-element');

            var markerContents = bookmarkContent.find('.store-name').text()
                + '<br/>' + bookmarkContent.find('.bookmark-address').text();

            infoWindow.setContent(markerContents);
            infoWindow.open(bookmarkMaps, marker);

        });

        $(this).on('mouseleave', function () {
            marker = new googleMaps.Marker({
                position: new googleMaps.LatLng(locationLatLng),
                map: bookmarkMaps,
                icon: '../img/insert/red-dot.png'
            });
        });
    });
}

function bookmarkToDetail(rid) {
    location.href = 'detail.html?rid=' + rid;
}
