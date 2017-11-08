module.exports = function() {
    if (arguments.length == 1) {
        return 0;
    }

    var sum = 0;

    for (var i=0; i<arguments.length - 1; i++) {
        sum += arguments[i];
    }

    return sum;
};

