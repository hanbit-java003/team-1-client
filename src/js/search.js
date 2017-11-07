require('bootstrap');
require('../less/search.less');

var common = require('./common');
var UrlSearchParams = require('url-search-params');
var params = new UrlSearchParams(location.search);

var rests = [
    {
        rid: 123,
        name: '식당 이름',
        articleCnt: 10,
        favoCnt: 5,
        likeCnt: 20,
        latLng: {
            lat: 37.54246763588839,
            lng: 126.94284796714783
        }
    }
];

var articles = [
    {
        rid: 123,
        articleId: 2323,
        name: '식당이',
        comment: '코멘트코메트<br/>코멘트코멘트<br/>코멘트코멘트',
        likes: 123,
        nick: 'abc',
        writeDt: '1990년12월12일',
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
    }
];

init();

function init() {
    var searchText = params.get('text');

    $.ajax({
        url: '/api/cock/search/get/' + searchText + '/',
        success: function (result) {
            console.log(result);
            rests = result.rests;
            articles = result.articles;

            setList();
        }
    });
}

function setList() {
    // 사전 데이터 작업
    // 검색 식당 수 입력
    // 검색 기사 수 입력
    // latLng - 주소로 변환
    if (rests) {
        var template = require('../template/search/search-rest.hbs');
        var html = template(rests);
        $('.search-rest-result').html(html);

        $('.cock-search-rest .search-title > span').text(rests.length);

        $('.search-rest-result-text').on('click', function () {
            var li = $(this).parent('li');
            location.href = 'detail.html?rid=' + li.attr('rid');
        });

        setRestImgs();
    }
    
    // writeDt - 단순 시간으로 할지 지난 시간으로 표시할지 고민
    if (articles) {
        var template2 = require('../template/search/search-article.hbs');
        var html2 = template2(articles);
        $('.search-article-result').html(html2);

        $('.cock-search-article .search-title > span').text(articles.length);

        $('.search-article-result-text').on('click', function () {
            var li = $(this).parent('li');
            location.href = 'detail.html?rid=' + li.attr('rid');
        });

        setArticleImgs();
    }
}

function setRestImgs() {
    rests.forEach(function (e) {
        $.ajax({
            url: '/api/cock/search/img/rest/'+ e.rid +'/',
            success: function (result) {
                if (!result.imgs) {
                    return;
                }
                var ul = $('.search-rest-result li[rid='+ e.rid +'] .search-rest-result-img');
                ul.empty();
                var template = require('../template/search/result-img.hbs');
                var html = template(result);
                ul.append(html);

                imgClickEvent(ul);

                addCntTag(ul);
            },
            error: function (err) {
                console.log('No img');
            }
        });
    });
}

function setArticleImgs() {
    articles.forEach(function (e) {
        $.ajax({
            url: '/api/cock/search/img/article/'+ e.rid +'/'+ e.articleId +'/',
            success: function (result) {
                if (!result.imgs) {
                    return;
                }
                var ul = $('.search-article-result li[rid='+ e.rid +'][article-id='+ e.articleId +'] .search-article-result-img');
                ul.empty();
                var template = require('../template/search/result-img.hbs');
                var html = template(result);
                ul.append(html);

                imgClickEvent(ul);

                addCntTag(ul);
            },
            error: function (err) {
                console.log('No img');
            }
        });
    });
}

function imgClickEvent(ul) {
    ul.on('click', function () {
        var size = $(this).find('li').length;
        var li = $(this).find('li.active');
        var index = li.index();

        index++;
        if (index >= size) {
            index = 0;
        }
        $(this).find('li.active').removeClass('active');
        $(this).find('li:eq('+ index +')').addClass('active');
    });
}

function addCntTag(ul) {
    var size = ul.find('li').length;
    var html = '<div class="result-img-cnt">'+ size +'</div>';
    ul.append(html);
}
