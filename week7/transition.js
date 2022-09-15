/**
 * 我的动画轮子，辣鸡版本transition 仅支持px单位和无单位
 * @param {HTMLElement} el 元素
 * @param {object} targetObj 目标对象
 * @param {number} duration 时长
 * @param {function} callback 回调函数
 */
function transitionAll(el, targetObj, duration = 1000, callback = null) {
    const totalFrames = 25 * (duration / 1000);
    let frameCount = 0;
    // 初始状态的全部样式
    const startStyles = window.getComputedStyle(el);

    let speed;
    let unit;
    for (const prop in targetObj) {
        speed = (parseFloat(targetObj[prop]) - parseFloat(startStyles[prop])) / totalFrames;
        unit = typeof (targetObj[prop]) === 'number' ? '' : 'px';
        targetObj[prop] = [parseFloat(targetObj[prop]), speed, unit];
    }
    console.log(targetObj);

    let timer = setInterval(() => {
        for (const prop in targetObj) {
            el.style[prop] = (parseFloat(window.getComputedStyle(el)[prop]) + targetObj[prop][1]) + targetObj[prop][2];
            console.log(el.style[prop]);
        }

        frameCount++;

        if (frameCount === totalFrames) {
            console.log(7);
            clearInterval(timer);
    
            for (const prop in targetObj) {
                el.style[prop] = targetObj[prop][0] + targetObj[prop][2];
            }
    
            callback && callback();
        }
    }, 40);

}