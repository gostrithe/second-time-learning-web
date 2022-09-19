var imgs = document.getElementsByTagName('img');
var circles_ol = document.getElementById('circle')
var circles = document.querySelectorAll('#circle li');
var bannerBox = document.getElementById('bannerBox');

var index = 0;

function breath() {
    imgs[index].style.opacity = '0';
    index++;
    if (index == 2) index = 0;
    imgs[index].style.opacity = '1'

    for (var i = 0; i < circles.length; i++) {
        if (i == index) {
            circles[i].className = 'current';
        } else {
            circles[i].className = '';
        }
    }
}

var timer = setInterval(breath, 2000);

bannerBox.onmouseenter = function () {
    clearInterval(timer);
}

bannerBox.onmouseleave = function () {
    clearInterval(timer);
    timer = setInterval(breath, 2000);
}

var lock = true;
circles_ol.onclick = function (e) {
    if (!lock) return;
    
    if (e.target.tagName.toLowerCase() == 'li') {
        var n = Number(e.target.getAttribute('data-n'));
    }
    
    for (var i = 0; i < 2; i++) {
        if (n == i) {
            imgs[i].style.opacity = '1';
            circles[i].className = 'current';
        } else {
            imgs[i].style.opacity = '0';
            circles[i].className = '';
        }
    }
    
    lock = false;
    setTimeout(function() {
        lock = true;
    }, 2000)
}
