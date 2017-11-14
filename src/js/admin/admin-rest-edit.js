require('bootstrap');
require('../../less/admin/admin-rest-edit.less');

var common = require('./common');

var UrlSearchParams = require('url-search-params');
var params = new UrlSearchParams(location.search);

var rid = params.get('rid');
var model = {};
var saveType;

// 맛집 수정 페이지
$.ajax({
    url: '/api/cock/admin/rest/' + rid,
    success: function (result) {
        var restName = result[0].name;
        var restId = result[0].rid;
        var restArticleCount = result[0].count;
        var restLat = result[0].lat;
        var restLng = result[0].lng;
        var restAddress = result[0].address;
        var restPhoneNo = result[0].phone;
        var restTime = result[0].operating;
        var restSignature = result[0].signature;
        var restStatus = result[0].status;

        $('.admin-rest-title').text(restName);

        $('#rest-edit-count').val(restArticleCount);
        $('#rest-edit-count').attr('disabled', true);

        $('#rest-edit-rid').val(restId);
        $('#rest-edit-rid').attr('disabled', true);

        $('#rest-edit-lat').val(restLat);
        $('#rest-edit-lat').attr('disabled', true);

        $('#rest-edit-lng').val(restLng);
        $('#rest-edit-lng').attr('disabled', true);

        if (restAddress) {
            $('#rest-edit-address').val(restAddress);
        }

        if (restPhoneNo) {
            $('#rest-edit-phone').val(restPhoneNo);
        }

        if (restTime) {
            $('#rest-edit-time').val(restTime);
        }

        if (restSignature) {
            $('#rest-edit-signature').val(restSignature);
        }

        if (restStatus) {
            $('#rest-edit-status').val(restStatus);
        }

        // 추가 입력사항이 입력되어 있지 않으면 insert 타입.
        if (!restAddress && !restPhoneNo && !restTime && !restSignature) {
            saveType = 'insert';
        }
        //      "       이 입력되어 있으면 edit 타입.
        else {
            saveType = 'edit';
        }

    }
});

// 맛집 추가 입력사항 저장
$('#rest-edit-save').on('click', function () {
    model.rid = $('#rest-edit-rid').val().trim();
    model.address = $('#rest-edit-address').val().trim();
    model.phone = $('#rest-edit-phone').val().trim();
    model.time = $('#rest-edit-time').val().trim();
    model.signature = $('#rest-edit-signature').val().trim();
    model.status = $('#rest-edit-status').val().trim();

    if (!model.address) {
        alert('주소를 입력하세요.');
        $('#rest-edit-address').focus();
        return;
    }
    else if (!model.phone) {
        alert('전화번호를 입력하세요.');
        $('#rest-edit-phone').focus();
        return;
    }
    else if (!model.time) {
        alert('영업시간을 입력하세요.');
        $('#rest-edit-time').focus();
        return;
    }
    else if (!model.signature) {
        alert('대표메뉴를 입력하세요.');
        $('#rest-edit-signature').focus();
        return;
    }
    else if (!model.status) {
        alert('상태를 입력하세요.');
        $('#rest-edit-status').focus();
        return;
    }

    // console.log(model);

    if (saveType === 'insert') {
        $.ajax({
            url: '/api/cock/admin/rest/save',
            data: {
                rid: model.rid,
                address: model.address,
                phone: model.phone,
                operating: model.time,
                signature: model.signature,
                status: model.status
            },
            success: function () {
                alert('정상적으로 저장되었습니다.');
                location.reload();
            },
            error: function () {
                alert('저장 중 오류가 발생하였습니다.');
            }
        });
        // console.log('insertType');
    }
    else if (saveType === 'edit') {
        $.ajax({
            url: '/api/cock/admin/rest/edit',
            data: {
                rid: model.rid,
                address: model.address,
                phone: model.phone,
                operating: model.time,
                signature: model.signature,
                status: model.status
            },
            success: function () {
                alert('정상적으로 저장되었습니다.');
                location.reload();
            },
            error: function () {
                alert('저장 중 오류가 발생하였습니다.');
            }
        });
        // console.log('editType');
    }

});

// 맛집 기본 & 추가 입력사항 삭제
$('#rest-edit-delete').on('click', function () {
    common.openDialog({
        body: '정말 삭제하시겠습니까?',
        buttons: [{
            id: 'delete',
            name: '삭제',
            style: 'danger'
        }],
        handler: function (btnId) {
            if (btnId == 'delete') {
                $.ajax({
                    url: '/api/cock/admin/rest/' + rid,
                    method: 'DELETE',
                    success: function (result) {
                        location.href = './admin-rest.html';
                    },
                    error: function () {
                        alert('해당 맛집에 게시글이 남아 있으면 삭제할 수 없습니다.');
                    }
                });

                common.closeDialog();
            }
        }
    })
});

$('#rest-edit-cancel').on('click', function () {
    history.back();
});