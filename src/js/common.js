require('../less/common.less');
require('../less/member-layer.less');

var _ = require('lodash');
_.move = require('lodash-move').default;

var Search = require('./search/search-service');
var search = new Search($('#search-input'));
var script = require('scriptjs');

script('//developers.kakao.com/sdk/js/kakao.min.js', function() {
});

// kakaoTalk 로그인
/*scriptjs('//developers.kakao.com/sdk/js/kakao.js', function () {
    kakaoLogin();
});*/



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
            templateHeader(result);
        }
    }
});


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
                    alert('페이스북 준비중 입니다.');
                });

                $('.cock-member-sns-naver').on('click', function () {
                    alert('네이버 준비중 입니다.');
                });

                $('.cock-member-sns-kakao').on('click', function () {
                    kakaoLogin();
                });

                $('#kakao-logout').on('click', function () {
                   kakaoLogout();
                });

                $('#cock-login-email').focus();
            }
            else {
                $('#cock-logout').on('click', function () {
                    signOut();
                    kakaoLogout();
                    location.href = '../';
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
        }
    });
}

var bannVall;
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


// kakaoTalk 로그인
function kakaoLogin() {
    //카카오에서 받은 키
    Kakao.init("53aaee2d65e52a4b5117bf7ed31572fc");
    Kakao.Auth.login({
       success: function (result) {
           Kakao.API.request({
              url: '/v1/user/me',
              success: function (kakao) {
                  snsSignIn(kakao);
              }
           });
       }
    });
}

function snsSignIn(kakao) {
    var nick = kakao.properties.nickname;
    var avatar = kakao.properties.profile_image;

    console.log(nick);
    console.log(avatar);


    $.ajax({
       url:'/api/member/snsSignin',
        method: 'POST',
        data : {
           nick : nick,
           avatar: avatar
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
    //카카오에서 받은 키
    Kakao.init("53aaee2d65e52a4b5117bf7ed31572fc");
    Kakao.Auth.logout();
    if(Kakao.Auth.getRefreshToken()!=undefined&&Kakao.Auth.getRefreshToken().replace(/ /gi,"")!=""){
        kakaoLogout();
    }
    location.href = '../';
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
    signOut : signOut
}

$('#admin-btn').on('click', function () {
    location.href = '/admin'
});

$('.cock-admin-btn').on('click', function () {
   location.href = '/admin'
});

