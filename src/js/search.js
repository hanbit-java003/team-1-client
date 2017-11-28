require('bootstrap');
require('../less/search.less');

var common = require('./common');
var UrlSearchParams = require('url-search-params');
var params = new UrlSearchParams(location.search);
var moment = require('moment');

var rests = [
    {
        rid: 123,
        name: '식당 이름',
        articleCnt: 10,
        favoCnt: 5,
        likeCnt: 20,
        lat: 37.54246763588839,
        lng: 126.94284796714783
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
    if (rests) {
        var template = require('../template/search/search-rest.hbs');
        var html = template(rests);
        $('.search-rest-result').html(html);

        $('.cock-search-rest .search-title > span').text(rests.length);

        setRestImgs();
        reverseGeocoding(rests);
    }
    
    if (articles) {
        var template2 = require('../template/search/search-article.hbs');
        var html2 = template2(articles);
        $('.search-article-result').html(html2);

        $('.cock-search-article .search-title > span').text(articles.length);

        setArticleImgs();
        wrteDate(articles);
    }

    $('.search-article-result-text').on('click', function () {
        var rid = $(this).parent('li').attr('rid');

        location.href = 'detail.html?rid=' + rid;
    });
}

function reverseGeocoding(rests) {

    $.each(rests, function (i, v) {
        var lat = v.lat;
        var lng = v.lng;

        var geocode = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&sensor=false';

        $.ajax({
            url: geocode,
            type: 'POST',
            success: function(result){
                if(result.status == 'OK') {
                    $('li[rid='+ v.rid +'] .search-rest-result-text-adr').text(result.results[0].formatted_address);
                }
            }
        });
    });
}

function wrteDate(articles) {
    $.each(articles, function () {
        var writeDt = this.writeDt;
        var a = moment(writeDt);
        var b = moment(_.now());
        var c = Math.abs(a.diff(b, 'minute'));

        if (c < 60) {
            var text = c + '분 전';
            $('li[rid='+ this.rid +'][article-id='+ this.articleId +'] .search-article-result-date').text(text);
            return;
        }
        c = Math.abs(a.diff(b, 'hour'));
        if (c < 24) {
            var text = c + '시간 전';
            $('li[rid='+ this.rid +'][article-id='+ this.articleId +'] .search-article-result-date').text(text);
            return;
        }
        c = Math.abs(a.diff(b, 'day'));
        if (c < 30) {
            var text = c + '일 전';
            $('li[rid='+ this.rid +'][article-id='+ this.articleId +'] .search-article-result-date').text(text);
            return;
        }
        var text = a.format('YY년MM월DD일');
        $('li[rid='+ this.rid +'][article-id='+ this.articleId +'] .search-article-result-date').text(text);
    });
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

    var restLi = ul.parent();
    var rid = restLi.attr('rid');
    restLi.find('.search-rest-result-text').on('click', function () {
        location.href = 'detail.html?rid=' + rid;
    });
}

function addCntTag(ul) {
    var size = ul.find('li').length;
    var html = '<div class="result-img-cnt">'+ size +'</div>';
    ul.append(html);
}