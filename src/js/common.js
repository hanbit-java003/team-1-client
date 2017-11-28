require('../less/common.less');
require('../less/setting.less');
require('../less/member-layer.less');
require('../less/setting.less');



var _ = require('lodash');
_.move = require('lodash-move').default;

var Search = require('./search/search-service');
var search = new Search($('#search-input'));
var script = require('scriptjs');

var naverLoginPage = require('./naver-callback');



// kakaoTalk 로그인
script('//developers.kakao.com/sdk/js/kakao.min.js', function() {
});
// 네이버 로그인
script("https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js", function () {
});
// 페이스북 로그인
script("http://connect.facebook.net/ko_KR/all.js", function () {
});






$('.header-logo').on('click', function () {
    if (true) {
        location.href = '/';
    }
});

$('.back-button').on('click', function () {
    location.href = '/';
});


// 검색 버튼 토글
function searchBarToggle() {
    $('.search-toggle').on('click', function () {
        $('.header-search-icon').toggle();
        $('.header-search-bar').toggle('100');
        $('#search-input').focus();
    });

    // 검색 출력
    
}

searchBarToggle();


// 에러 코드 나올 시 사용할 수 있게끔. 모듈화
function ajax(options) {


    // 나머지 옵션은 그대로들은 똑같이 들어가고,
    // 에러는 추가해서 들어가게끔
    if (!options.error) {
        options.error = function (jqXHR) {
            var errorCode = jqXHR.responseJSON.errorCode;

            if (errorCode === 403) {
                $('.header-bt').click();
            }

            alert(jqXHR.responseJSON.message);
        };
    }

    $.ajax(options);
}


/*
 *  로그인 레이아웃 나오게끔.
 */
// 로그인 할 시 오른쪽 상단 이미지 보이게 하기 위해서.
$.ajax({
    url: '/api/member/get',
    success: function (result) {
        if (result.signedIn) {
            user = result;
            templateHeader(result);

            if (result.master === 'Y') {
                $('#admin-btn').css('display', 'inline-block');
            }
        }
    }
});

var user;

function getUser() {
    return user;
}

// 오른쪽 상단 버튼
$('.header-bt').on('click', function () {
    $.ajax({
        url: '/api/member/get',
        success: function (result) {
            openMemberLayer(result);
        }
    });

});
function openMemberLayer(memberInfo) {
    $('body').append('<div class="overlay-layer dark-layer"></div>');
    $('body').css('overflow', 'hidden');
    var memberLayerTemplate = require('../template/member-layer.hbs');
    var memberLayer = memberLayerTemplate(memberInfo);

    $('body').append(memberLayer);

    // kakaoTalk 로그인
    script('//developers.kakao.com/sdk/js/kakao.min.js', function() {
    });
    // 네이버 로그인
    script("https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js", function () {
    });
    // 페이스북 로그인
    script("http://connect.facebook.net/ko_KR/all.js", function () {
    });


    $('.cock-member-layer').animate({
        right: '0px' // 몇으로 바꿀건지.
    }, {
        duration: 500,
        complete: function () {
            $('.cock-member-layer-logo').on('click', function () {
               closeMemberLayer(function () {
                   location.href = '../';
               }) ;
            });
            if (!memberInfo.signedIn) {
                // 엔터키 누르면 실행 되게끔.
                $('#cock-login-email').keyup(function (key) {
                    if (key.keyCode == 13) {// 키가 13이면 실행
                        $('#cock-login-btn').click();
                    }
                });
                $('#cock-login-pw').keyup(function (key) {
                    if (key.keyCode == 13) {// 키가 13이면 실행
                        $('#cock-login-btn').click();
                    }
                });


                $('#cock-login-btn').on('click', function () {
                    signIn();
                });


                $('#cock-member-join-btn').on('click', function () {
                    closeMemberLayer(function () {
                        location.href = '../join.html';
                    });
                });

                $('.cock-member-sns-fb').on('click', function () {
                    facebookLogin();
                });

                $('.cock-member-sns-naver').on('click', function () {
                    naverLogin();
                });

                $('.cock-member-sns-kakao').on('click', function () {
                    kakaoLogin();
                });

                $('.cock-logout').on('click', function () {
                   kakaoLogout();
                   naverLogout();
                });

                $('#cock-login-email').focus();
            }
            else {
                $('.cock-logout').on('click', function () {
                    naverLogout();
                    kakaoLogout();
                    signOut();
                });
                $('#cock-setting').on('click', function () {
                    closeMemberLayer(function () {
                        location.href = '../setting.html';
                    });
                });
                $('#cock-member-info').on('click',function () {
                    closeMemberLayer(function () {
                       location.href = '../member.html';
                    });
                });

                $('#cock-insert').on('click',function () {
                    closeMemberLayer(function () {
                        location.href = '../insert.html';
                    });
                });
                $('#cock-bookmark').on('click', function () {
                   closeMemberLayer(function () {
                       location.href = '../bookmark.html';
                   })
                });
            }
        }
    });

    $('.overlay-layer').on('click', function () {
        closeMemberLayer();
    });

}




// 헤더부분 오른쪽 상단 아이콘 이미지 로그인 이후.
function templateHeader(result) {

    var template = require('../template/header.hbs');

    var html = template(result);
    // 기존 헤더를 지우고
    // 그 위에 로그인 하고 나서 그 안에 사진이 나오는..
    $('header').replaceWith(html);

    $('.header-bt').on('click', function () {
        openMemberLayer(result);
    });

    $('.header-logo').on('click', function () {
        location.href = './';
    });

    // 디테일 페이지에서 뒤로가기 버튼. 누르면 홈으로 감
    $('.back-button').on('click', function () {
        location.href = '/';
    });

    var search = new Search($('#search-input'));

    searchBarToggle();

}


//로그아웃
function signOut() {
    $.ajax({
        url: '/api/member/signout',
        success: function () {
            // 탈퇴한 회원인지 아닌지 확인 하기 위해서
            if(bannVall === 'Y') {
                alert('탈퇴한 계정입니다.');
                return;
            }
            location.href = '../';
        }
    });
}

var bannVall;
var master = false;
//로그인
function signIn() {
    var email = $('#cock-login-email').val().trim();
    var pw = $('#cock-login-pw').val().trim();
    var remember = $('#cock-login-remember').prop('checked');

    if (!email) {
        alert('이메일을 입력하세요.');

        $('#cock-login-email').focus();
        return;
    }
    else if (!pw) {
        alert('비밀번호를 입력하세요.');
        $('#cock-login-pw').focus();
        return;
    }


    ajax({
        url: '/api/member/signin',
        method: 'POST',
        data: {
            email: email,
            password: pw,
            remember: remember
        },
        success: function (result) {
            // 탈퇴한 회원인지 아닌지 확인 하기 위해서
            if (result.bann === 'Y') {
                bannVall = result.bann;
                signOut();
                return;
            }
            else {
                // 관리자 인지 아닌지 확인하기 위해서.
                if(result.master === 'Y'){
                    alert('<관리자>' +  result.nick + '님 반갑습니다.');
                    closeMemberLayer(function () {
                            location.href = location.href;
                        }
                    );
                }else{
                    alert(result.nick + '님 반갑습니다.');
                    closeMemberLayer(function () {
                            location.href = location.href;
                        }
                    );
                }
            }
        }
    });


}

var isInitKakao = false;

// kakaoTalk 로그인
function kakaoLogin() {
    if (!isInitKakao) {
        //카카오에서 받은 키
        Kakao.init("53aaee2d65e52a4b5117bf7ed31572fc");
        isInitKakao = true;
    }

    Kakao.Auth.login({
       success: function (result) {
           Kakao.API.request({
               url: '/v1/user/me',
              success: function (kakao) {
                  snsSignIn(kakao);
                  console.log(kakao);
              }
           });
       }
    });
}

function snsSignIn(kakao) {
    var nick = kakao.properties.nickname;
    var avatar = kakao.properties.profile_image;
    var uid = kakao.id;

    console.log(nick);
    console.log(avatar);


    $.ajax({
       url:'/api/member/snsSignin',
        method: 'POST',
        data : {
           nick : nick,
           avatar: avatar,
            uid:uid
        },
        success: function (result) {
            closeMemberLayer(function () {
                    alert('<카카오톡>'+ nick + '님 반갑습니다.');
                    location.href = location.href;
                }
            );
        },
        error: function (jqXHR) {
            alert(jqXHR.responseJSON.message);
        }
    });

}

//카카오톡 로그아웃
function kakaoLogout() {
    if (!isInitKakao) {
        //카카오에서 받은 키
        Kakao.init("53aaee2d65e52a4b5117bf7ed31572fc");
        isInitKakao = true;
    }
    Kakao.Auth.logout();
    if(Kakao.Auth.getRefreshToken()!=undefined&&Kakao.Auth.getRefreshToken().replace(/ /gi,"")!=""){
        kakaoLogout();
    }
}

var naverIdLogin;

// 네이버 로그인
function naverLogin() {                     //클라이언트 id         //콜백 url
    naverIdLogin = new naver_id_login("Ezo6uk0_qHSgskTmDLQn", "http://localhost:88/naver-callback.html");
    var state = naverIdLogin; // 서비스 url
    naverIdLogin.setDomain("http://localhost:88/");
    naverIdLogin.setState(state);
    naverIdLogin.setPopup();
    naverIdLogin.init_naver_id_login();

    // 로그인이 될시 토큰을 받아서 naver-callback 페이지로 넘어감.
}
// 네이버 로그아웃
function naverLogout() {

}



/*window.naverCallback = function() {
    naverIdLogin = new naver_id_login("Ezo6uk0_qHSgskTmDLQn", "http://localhost:88/naver-callback.html");
    // 접근 토큰 값 출력
    console.log("b", naverIdLogin.oauthParams.access_token);
    // 네이버 사용자 프로필 조회
    naverIdLogin.get_naver_userprofile("naverSignInCallback()");
    // 네이버 사용자 프로필 조회 이후 프로필 정보를 처리할 callback function
}

window.$ = $;
window.naverSignInCallback = function() {
    console.log(naverIdLogin.getProfileData('email'));
    console.log(naverIdLogin.getProfileData('nickname'));
    console.log(naverIdLogin.getProfileData('age'));
}*/

var isInitFb = false;
//페이스북 로그인
function facebookLogin() {
    alert('페이스북 준비중 입니다.');

    if(!isInitFb){
        console.log('실행');
        FB.init({
            appId: '{147859285970827}', // 앱 ID
            cookie: true, // 쿠키가 세션을 참조할 수 있도록 허용
            xfbml: true, // 소셜 플러그인이 있으면 처리
            version: 'v2.11' // 버전 2.11 사용
        });
        isInitFb = true;
    }




   /* Window.fbAsyncInit = function () {

    }

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
        console.log(response);
    });*/
}
/*
// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    console.log('statusChangeCallback');

    console.log(response);
// response 객체는 현재 로그인 상태를 나타내는 정보를 보여준다.
// 앱에서 현재의 로그인 상태에 따라 동작하면 된다.
// FB.getLoginStatus().의 레퍼런스에서 더 자세한 내용이 참조 가능하다.
if (response.status === 'connected') {
    // 페이스북을 통해서 로그인이 되어있다.
    testAPI();
    }
    else if (response.status === 'not_authorized')
    { // 페이스북에는 로그인 했으나, 앱에는 로그인이 되어있지 않다.
      document.getElementById('status').innerHTML = 'Please log ' + 'into this app.'; }
      else {
    // 페이스북에 로그인이 되어있지 않다. 따라서, 앱에 로그인이 되어있는지 여부가 불확실하다.
    document.getElementById('status').innerHTML = 'Please log ' + 'into Facebook.';
    }
}

// 이함수는 누군가가 로그인버튼에 대한 처리가 끝났을 떄 호출된다.
// onlogin 핸들러를 아래와 같이 첨부하면 된다.
function checkLoginState() {
    FB.getLoginStatus(
        function(response) {
            statusChangeCallback(response);
        });
}

window.fbAsyncInit = function() {
    FB.init({
        appId: '{147859285970827}', // 앱 ID
        cookie: true, // 쿠키가 세션을 참조할 수 있도록 허용
        xfbml: true, // 소셜 플러그인이 있으면 처리
        version: 'v2.1' // 버전 2.1 사용
    });
    // 자바스크립트 SDK를 초기화 했으니, FB.getLoginStatus()를 호출한다.
    //.이 함수는 이 페이지의 사용자가 현재 로그인 되어있는 상태 3가지 중 하나를 콜백에 리턴한다.
    // 그 3가지 상태는 아래와 같다.
    // 1. 앱과 페이스북에 로그인 되어있다. ('connected')
    // 2. 페이스북에 로그인되어있으나, 앱에는 로그인이 되어있지 않다. ('not_authorized')
    // 3. 페이스북에 로그인이 되어있지 않아서 앱에 로그인이 되었는지 불확실하다.
    //
    // 위에서 구현한 콜백 함수는 이 3가지를 다루도록 되어있다.
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
};

//SDK를 비동기적으로 호출
(function (d, s, id) {
   var js, fjs = d.getElmentsByTagName(s)[0];
   if (d.getElmentById(id)){
       return;
   }
   js = d.createElement(); js.id= id;
   js.src = "//conent.facebook.net/en_US"

});*/


// 로그인이 성공한 다음에는 간단한 그래프 API를 호출한다.
// 이 호출은 statusChangeCallback()에서 이루어진다.
function testAPI() {
    console.log('testAPI');
    FB.api('/me', function (response) {
       console.log('성공 로그인 : '+ response.name );
       document.getElementsById('status').innerHTML = '감사합니다 로그인,' + response.name +'!';
    });
}


// 닫아버려
function closeMemberLayer(callback) {
    $('.cock-member-layer').animate({
        right: '-333px'
    }, {
        duration: 500,
        complete: function () {
            $('.cock-member-layer').remove(); // 위 상단 메뉴 클릭시 나오는 메뉴 사라짐
            $('.overlay-layer').remove();  // 엘리먼트를 없애버린다.속성
            $('body').css('overflow', 'auto');  // 히든에서 클릭으로 속성을 바꿈.

            if (typeof callback === 'function') { // callback이 없을수도? 함수가 아닐수도 있다. 함수는 function인지?
                callback();
            }
        }
    });
}

module.exports = {
    ajax: ajax,
    getUser: getUser,
    signOut : signOut,
};

$('#admin-btn').on('click', function () {
    location.href = '/admin'
});

$('.cock-admin-btn').on('click', function () {
   location.href = location.href
});




