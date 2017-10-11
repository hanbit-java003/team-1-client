// 지금은 여러 식당이 있지만 실제로는 식당별로 모아야함 그니까 이 모델에는 해당 한군데의 식당의 모든 후기가 있어야함.
module.exports = [{
    userImg: './img/sc-img/Koala.jpg',
    userName: '알라코',
    achievement: [{
        emblem: '국밥충'
    }, {
        emblem: '돼지테리언'
    }, {
        emblem: '신촌멋쟁이'
    }],
    foodImg: './img/sc-img/bbb.jpg',
    eaten: '돼지곰탕 특 1 그릇 14000 원',    // 이건 나중에 더 디테일하게 수정해야함. 메뉴, 그릇, 가격 다 나눠서..
    detail: '합정역 근처 예술적인 맛집!!<br>하루 100 그릇 한정 판매!!<br>점심시간 지나서 가면 못먹어요~<br>',
    menu: [{
        item: "돼지곰탕"
    }, {
        item: "특"
    }, {
        item: "보통"
    }]
}, {
    userImg: './img/sc-img/Koala.jpg',
    userName: '알라코',
    achievement: [{
        emblem: '국밥충'
    }, {
        emblem: '돼지테리언'
    }, {
        emblem: '신촌멋쟁이'
    }],
    foodImg: './img/sc-img/ccc.jpg',
    eaten: '간장게장 1 접시 12000 원',
    detail: ' 밥도둑 간장게장한테<br>내 밥을 도둑맞았어요!!',
    menu: [{
        item: "간장게장"
    }, {
        item: "간장새우"
    }, {
        item: "전복"
    }]
}, {
    userImg: './img/sc-img/Jellyfish.jpg',
    userName: '해파리지앵',
    achievement: [{
        emblem: '면식범'
    }, {
        emblem: '식탐왕'
    }, {
        emblem: '강남제비'
    }],
    foodImg: './img/sc-img/aaa.jpg',
    eaten: '돈코츠라멘 1 그릇 6000 원',
    detail: '친구의 단골집인 일본라멘집.<br>' +
    '처음 먹어본 일본 라멘집이라 그냥 맛 있는 집이라고 생각 했었는데, ' +
    '다른 일본 라면집을 먹어보니 확실히 맛집이란걸 알앗다.<br>' +
    '다른 라멘집은 인스턴트 라면 같은 일본 라면 집이라면 여기는 ' +
    '육수를 끓여 만든 라면 국물을 사용하기 때문에 다른데 보다 속이 편안 하고 먹기 좋다.<br>' +
    '그리고 육수농도(보통,진하게), 면(꼬들꼬들, 보통, 퍼진면) 염도(싱겁게, 보통, 짜게) ' +
    '를 커스텀마이징, 정할수 있어서 자기 취향에 맞는 라면을 먹을수 있다.<br>' +
    '밥, 김치는 무료로 제공해준다.(남길경우 5,000원)<br>',
    menu: [{
        item: "돈코츠라멘"
    }, {
        item: "쇼유라멘"
    }, {
        item: "부타동"
    }, {
        item: "고라멘"
    }, {
        item: "고라멘"
    }, {
        item: "고라멘"
    }, {
        item: "고라멘"
    }, {
        item: "고라멘"
    }, {
        item: "고라멘"
    }, {
        item: "고라멘"
    }, {
        item: "고라멘"
    }, {
        item: "고라멘"
    }]
}];