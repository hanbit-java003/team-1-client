require('bootstrap');
require('../less/search.less');

var common = require('./common');
var UrlSearchParams = require('url-search-params');
var params = new UrlSearchParams(location.search);


var rests = {
    rests: [
        {
            name: '식당 이름',
            articleCnt: 10,
            FavoCnt: 5,
            likeCnt: 20,
            latLng: {
                lat: 37.54246763588839,
                lng: 126.94284796714783
            },
            imgs: [
                './img/insert/art-greetings2-2_1_0.png',
                './img/insert/art-duch-1_0_0.jpg',
                './img/insert/art-duch-1_0_0.jpg'
            ]
        },
    ]
};

var articles = {
    articles: [
        {
            name: '식당이',
            comment: '코멘트코메트<br/>코멘트코멘트<br/>코멘트코멘트',
            nick: 'abc',
            writeDt: '1990년12월12일',
            imgs:[
                './img/insert/art-greetings2-2_1_0.png',
                './img/insert/art-duch-1_0_0.jpg',
                './img/insert/art-duch-1_0_0.jpg'
            ],
            menus: [
                '메뉴1',
                '메뉴2',
                '메뉴3',
            ],
            tags: [
                '테그1',
                '테그2',
                '테그3',
            ]
        },
    ]
};

init();

function init() {
    var searchText = params.get('text');

    $.ajax({
        url: '/api/cock/search/get/' + searchText + '/',
        success: function (result) {
            console.log(result);
            //rests = result.rests;
            //articles = result.articles;

            setList();
        }
    });
}

function setList() {
    // 사전 데이터 작업
    // latLng - 주소로 변환
    var template = require('../template/search/search-rest.hbs');
    var html = template(rests);
    $('.search-rest-result').html(html);

    
    // writeDt - 단순 시간으로 할지 지난 시간으로 표시할지 고민
    var template2 = require('../template/search/search-article.hbs');
    var html2 = template2(articles);
    $('.search-article-result').html(html2);

}