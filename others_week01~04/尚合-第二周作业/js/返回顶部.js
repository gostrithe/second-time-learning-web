(function () {
    var backToTop = document.getElementById('backToTop')

    var timer;
    backToTop.addEventListener('click', function () {
        clearInterval(timer);
        timer = setInterval(function () {
            document.documentElement.scrollTop -= 50;

            if (document.documentElement.scrollTop <= 0) {
                clearInterval(timer);
            }
        }, 20)
    }, false)
})()