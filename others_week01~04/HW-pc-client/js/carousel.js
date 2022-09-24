/* 
 *  轮播图特效  
 *  日期：2022/8/13
 *  姓名：jack
 */

// 开局IIFE
(function () {
    // 获取ul
    var carousel = document.getElementById('carousel-list');
    // 获取左按钮
    var leftBtn = document.getElementById('leftBtn');
    // 获取右按钮
    var rightBtn = document.getElementById('rightBtn');
    // 获取ol
    var circle_ol = document.getElementById('circle_ol');
    // 获取ol中每个li
    var circlse_list = circle_ol.getElementsByTagName('li');
    // 获取区块section
    var banner = document.getElementById('banner');

    // 克隆第一张图片并保存
    var clone_li = carousel.firstElementChild.cloneNode(true);
    // 将克隆的孤儿节点上树
    carousel.appendChild(clone_li);


    // 定义当前张数，表示第一张图为0
    var index = 0;
    // 节流锁
    var lock = true;

    // 设置当前小圆点current函数, 添加当前动画
    function setCircles() {
        for (var i = 0; i < 2; i++) {
            if (i == index % 2) {
                // circlse_list[i].className = 'current';
                // 获取span
                var lispan = circlse_list[i].getElementsByTagName('span')[0];
                lispan.style.transition = 'width 1s linear 0s';
                lispan.style.width = '100px';
            } else {
                // circlse_list[i].className = '';
                var lispan = circlse_list[i].getElementsByTagName('span')[0];
                lispan.style.transition = 'none';
                lispan.style.width = '0';
            }
        }
    }

    // 右按钮函数
    function rgiht_btn_handler() {
        // 锁没开，直接退出
        if (!lock) return;

        // 拉动之前确保ul的过渡是有的
        carousel.style.transition = 'transform 0.5s ease 0s';
        // 第一张index是0，先加再用于运算拉动
        index++;
        // 拉动大盒子ul
        carousel.style.transform = 'translateX(' + -33.333 * index + '%)';
        
        // 最后一张图（不包括克隆）时候点击
        if (index == 2) {
            // 0.5s后（拉向克隆图后），ul瞬间取消过渡变回初始状态，并且重置index的值
            setTimeout(function () {
                carousel.style.transition = 'none';
                carousel.style.transform = 'none';
                index = 0;
            }, 500)
        }

        setCircles();

        // 代码执行完，关锁，延时再打开
        lock = false;
        setTimeout(function () {
            lock = true;
        }, 500)
    }
    
    // 绑定右按钮事件监听。
    rightBtn.onclick = rgiht_btn_handler;

    // 绑定左按钮事件监听
    leftBtn.onclick = function () {
        // 判断节流锁状态
        if (!lock) return;

        // 当为第一张图时候
        if (index == 0) {
            // 取消过渡
            carousel.style.transition = 'none';
            // 瞬间变为最后克隆那张
            carousel.style.transform = 'translateX(-66.666%)';
            // 修改index值为最后一张（不包括克隆）
            index = 1;

            // 0秒延迟器，瞬间添加上过渡。再拉动到最后一张对应index，
            setTimeout(function () {
                // 加过渡
                carousel.style.transition = 'transform 0.5s ease 0s';
                // 拉动
                carousel.style.transform = 'translateX(' + -33.333 * index + '%)';
            }, 0)
        } else { // 不是第一张正常拉动
            // 先减,用于后面运算
            index--;
            // 拉动对应位移
            carousel.style.transform = 'translateX(' + -33.333 * index + '%)';
        }

        setCircles();

        // 关锁
        lock = false;
        // 延迟打开
        setTimeout(function () {
            lock = true;
        }, 500)
    }

    // 自动轮播, 右按钮定时一直执行
    // 保存定时器timer
    var timer = setInterval(rgiht_btn_handler, 1000);

    // 鼠标进入停止定时器
    // 绑定鼠标进入事件
    banner.onmouseenter = function () {
        // 关掉timer定时器
        clearInterval(timer);
    }

    // 鼠标移出来后继续轮播
    banner.onmouseleave = function () {
        // 设表先关
        clearInterval(timer);
        // 重新开启定时器,还是存为全局的timer
        timer = setInterval(rgiht_btn_handler, 1000);
    }

    // 事件委托绑定监听li小圆点
    circle_ol.onclick = function (e) {
        // 如果点击的是ol中的li
        if (e.target.tagName.toLowerCase() == 'li') {
            // 获取点击li的data-n属性
            var n = Number(e.target.getAttribute('data-n'));
        }
        // 第n个点对应第index张图,把n的值赋给index
        index = n; 
        // 拉动到对应的图
        carousel.style.transform = 'translateX(' + -33.333 * index + '%)';
        // 添加动画
        setCircles();
    }
})()