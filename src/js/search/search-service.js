var _ = require('lodash');

function Search(searchinput) {
    var searchText;

    var inputbox = searchinput;

    addEvents();
    var searchTimer;
    var lastSearchTime = _.now();

    function addEvents() { // pricate - 외부에서 부를 수 없다.
        inputbox.on('paste cut', function (event) {
            setTimeout(search, 500);
        });

        inputbox.on('keyup', function (event) {
            switch (event.keyCode) {
                case 13: {  // enter
                    updateText();
                    location.href = 'search.html?text=' + searchText;
                    break;
                }
            }
        });

        inputbox.on('input', function () {
            clearTimeout(searchTimer);
            var delay = 500;
            var now = _.now();

            if (now - lastSearchTime > 1000) {
                delay = 0;
            }

            searchTimer = setTimeout(function () {
                search();
            }, delay);
        });
    }

    function updateText() {
        searchText = inputbox.val();
        searchText.trim();
        console.log(searchText);
    }

    function search() {
        updateText();

        $.ajax({
            url: '/api/cock/search/get/' + searchText + '/',
            success: function (result) {
                console.log(result);
            },
            error: function () {
                console.log('null');
            }
        });

        lastSearchTime = _.now();
    }
}

module.exports = Search;