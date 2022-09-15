// globalVariable
var carousel, imgBox, lis, leftBtn, rightBtn, pointBox, lisArr, circles, copy1, copy5, carouselWidth, index, lock, timer;
// 全局变量赋值
function globalVariableAssign() {
    // HTML元素  DOM节点
    carousel = document.querySelector('.carousel');
    imgBox = carousel.querySelector('.imgBox');
    lis = imgBox.querySelectorAll('li');
    leftBtn = carousel.querySelector('.prev');
    rightBtn = carousel.querySelector('.next');
    pointBox = carousel.querySelector('.pointBox');

    lisArr = Array.from(lis);  // 转真数组

    // 克隆节点
    copy1 = lis[0].cloneNode(true);
    copy5 = lis[lis.length - 1].cloneNode(true);

    // 轮播图宽度的数值 600
    carouselWidth = parseFloat(window.getComputedStyle(carousel).width);

    // 初始化
    index = 1;  // 当前的图片张数，默认开始为第一张
    lock = true;  // 节流锁，默认为开启状态
    timer = null;  // 定时器默认为空
}

// 初始化，和一些准备工作
function init() {
    // 生成对应原来图片的小圆点指示器
    lisArr.forEach(function (item, index) {  // 这里的lisArr是没把克隆图片插入时候的长度
        var circle = document.createElement('li');  // 创建孤儿节点
        pointBox.appendChild(circle);  // 孤儿节点上DOM树
        circle.setAttribute('data-n', index);  // 给每个小圆点添加自定义属性 data-n  0~4
    });

    // 初始状态，默认为第一张图片，对应第一个小圆点，默认激活样式
    circles = pointBox.querySelectorAll('li');  // 等上树后再获取ol里面的li伪数组
    circles[0].className = 'active';

    // 提前更改ul的宽度，为后面克隆的两个li上树作准备。
    imgBox.style.width = carouselWidth * (lis.length + 2) + 'px';  // 之前的li长度+2

    // 克隆的节点上DOM树
    imgBox.appendChild(copy1);  // 插尾
    imgBox.insertBefore(copy5, lis[0]);  // 插头

    // 由于头部也插了一张克隆图，所以下一张才是真正的第一张。
    // 初始化 ul的位置，一开始就处于真正的第一张的位置
    imgBox.style.left = -carouselWidth + 'px';
}



// 节流锁打开
function functionLockOpen() {
    setTimeout(function () {
        lock = true;
    }, 1000);
}

function move(index) {
    imgBox.style.left = -carouselWidth * index + 'px';
}

// 一秒后 由克隆体 瞬间 变回本体
function carouselMagic(index) {
    setTimeout(function () {
        // 先取消过渡，瞒天过海
        imgBox.style.transition = 'none';
        move(index);
    }, 1000);
}

// 更新指示器的激活状态 n为激活的序号，其他为不激活
function updatePoint(n) {
    for (var circle of circles) {
        circle.className = '';
    }
    circles[n].className = 'active';
}

function rightBtnHandler() {
    if (!lock) return;
    lock = false;

    console.log('点击前', index);  // 1
    imgBox.style.transition = 'all 1s ease 0s';
    index++;
    move(index);
    console.log('点击后', index);  // 2

    if (index === lis.length + 1) {  // index === 6
        // 重置index
        index = 1;
        // 一秒后瞬间变回第一张
        carouselMagic(index);
    }

    updatePoint(index - 1);

    functionLockOpen();
}

function leftBtnHandler() {
    if (!lock) return;
    lock = false;

    console.log('点击前', index);  // 1
    imgBox.style.transition = 'all 1s ease 0s';
    index--;
    move(index);
    console.log('点击后', index);  // 
    if (index === 0) {  // index === 0
        // 重置index
        index = 5;
        // 一秒后瞬间变回第五张
        carouselMagic(index);
    }

    updatePoint(index - 1);

    functionLockOpen();
}

function autoplay() {
    // 自动轮播
    timer = setInterval(rightBtnHandler, 2000);
    // 鼠标进入停止轮播
    carousel.onmouseenter = function () {
        clearInterval(timer);
    };
    // 鼠标出来开始轮播
    carousel.onmouseleave = function () {
        timer = setInterval(rightBtnHandler, 2000);
    };
}

// 主函数
function main() {
    globalVariableAssign();
    init();
    rightBtn.onclick = rightBtnHandler;
    leftBtn.onclick = leftBtnHandler;
    autoplay();
    // 小圆点指示器的点击
    // 事件委托
    pointBox.onclick = function (e) {
        if (!lock) return;
        lock = false;

        if (e.target.nodeName === 'LI') {
            var n = e.target.getAttribute('data-n') * 1;
            console.log('点了第', n, '个点');
            imgBox.style.transition = 'all 1s ease 0s';
            move((n + 1));
            // 移动后记得修改index的值为对应张数
            index = n + 1;

            updatePoint(n);
        }

        functionLockOpen();
    };
}
main();