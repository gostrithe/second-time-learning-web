/**
 * 动画轮子1.0
 * @param {HTMLElement} el 元素
 */
function animate(el) {
    var frameCount = 0;  // 用于累计 运动帧数，帧数到达某值时，停止动画
    var timer = setInterval (function () {
        // window.getComputedStyle(el) 每次执行，获得当前计算好的元素全部样式
        // window.getComputedStyle(el).left 拿到当前的left的样式 
        // parseFloat(window.getComputedStyle(el).left) 取浮点数，将字符串类型转为数值，
                                                        // -- 即且掉px，且拿到数值类型
        el.style.left = parseFloat(window.getComputedStyle(el).left) + 20 + 'px';
        // 运动的核心： 修改left的值为  当前值 + 20px
        // 每次比上一次多20px

        // 累加帧数
        frameCount++;

        if (frameCount === 25) {  // 25帧时候，也就是一秒后，停止动画
            clearInterval(timer);
        }
    }, 40)  // 设置定时器，40毫秒一次，即一秒（1000毫秒）执行25次，即一秒25帧   
}


/**
 * 动画轮子2.0 只支持带px单位
 * @param {HTMLElement} el 元素
 * @param {Object} target 目标位置,修改的属性和值 的终点状态
 * @param {number} duration 时长 毫秒
 */
function animate2(el, targetObj, duration) {
    // 计算用户传入的时长一共有多少帧，用于判断停止动画
    // 我们默认每秒25帧（人眼无法分辨更低的了）
    // 即每40毫秒执行一次
    var totalFrames = 25 * (duration / 1000);
    // 累加帧数
    var frameCount = 0;

    // 得到动画开始之前的 当前全部样式 
    // 即动画的初始状态的全部样式
    var startStyles = window.getComputedStyle(el);


    /* 
    核心
    构建新的数据结构，且存储动画速度speed
    更加优雅
    目标： 
        将用户传入的对象{left: '300px', top: '400px'}
        构建新的数据结构{left: ['300px', speed], top: ['400px', speed]}
    */
    
    for (var key in targetObj) {  // 遍历用户传入的对象，key为left、top属性名
        // 先计算出动画速度speed
        // speed = (终止状态 - 初始状态) / 动画总帧数
        // 即speed为每帧变化的量

        var endValue = targetObj[key];
        var startValue = startStyles[key];
        // 上面的数据都是字符串，需要做一些处理
        var speed = (parseFloat(endValue) - parseFloat(startValue)) / totalFrames;

        // 修改用户传入的对象数据
        // 重构为我们目标的数据结构
        targetObj[key] = [endValue, speed];
    }


    // 处理好数据后，下面是动画的核心
    // 设置定时器
    var timer = setInterval(function () {
        for (var key in targetObj) {  // 遍历每个需要更改的属性
            // 修改为 上一次的状态加上speed
            // speed就存放在新的数据结构中 targetObj[key][1]
            el.style[key] = parseFloat(window.getComputedStyle(el)[key]) + targetObj[key][1] + 'px';
            // 注意这里不能用之前声明的var startStyles = window.getComputedStyle(el);
            // 因为，startStyles是作为初始状态的，这里定时器里面，每次执行再去计算上一次的状态
        }

        // 累加帧数
        frameCount++;

        // 每一帧都执行完后，结束动画
        if (frameCount === totalFrames) {
            clearInterval(timer);

            // 结束动画后，用于浮点数的计算，可能存在误差
            // 最后，暴力强改，修正到用户给定的终止状态
            for (var key in targetObj) {
                // targetObj[key][0]为字符串，不用处理了
                el.style[key] = targetObj[key][0];
            }
        } 
    }, 40)
}



/**
 * 动画轮子X.0 只支持带px单位和无单位
 * @param {HTMLElement} el 元素
 * @param {Object} targetObj 目标位置,修改的属性和值 的终点状态
 * @param {number} duration 时长 毫秒
 * @param {function} callback 
 */
function animateX(el, targetObj, duration = 1000, callback = null) {
    var totalFrames = 25 * (duration / 1000);
    var frameCount = 0;

    var startStyles = window.getComputedStyle(el);

    /* 
        重构新的数据类型来储存数据
        目标：
            {
                left: [300, 'px', speed]
                top: [400, 'px', speed]
                opacity: [0.5, '', speed]
            }

    */
    
    function getNumUnitArr(str) {
        // 如果进来的是数字，也返回一个空字符串单位
        if (typeof(str) === 'number') {
            return [str, '']
        }
            
        var num = parseFloat(str);
        // 字符串切片，得到单位
        var unit = str.slice((num + '').length)   

        return [num, unit]
    }

    for (var key in targetObj) {
        var numUnitArr = getNumUnitArr(targetObj[key]);  // [300, 'px']
        var num = numUnitArr[0];
        var unit = numUnitArr[1];

        var endValue = num;  // 300
        var startValue = startStyles[key];  
        var speed = (endValue - parseFloat(startValue)) / totalFrames;

        // targetObj[key] = numUnitArr.concat(speed);
        targetObj[key] = [num, unit, speed];
    }
    // 上面已经重构好了数据结构,只是为了优雅。


    var timer = setInterval(function () {
        for (var key in targetObj) {
            el.style[key] = (parseFloat(window.getComputedStyle(el)[key]) + targetObj[key][2]) + targetObj[key][1];
        }

        frameCount++;

        if (frameCount === totalFrames) {
            clearInterval(timer);

            for (var key in targetObj) {
                el.style[key] = targetObj[key][0] + targetObj[key][1];
                console.log(targetObj[key][0] + targetObj[key][1], el.style[key]);
            }

            // 如果有回调函数传进来，就调用。
            callback && callback();
        }
    }, 40)
}