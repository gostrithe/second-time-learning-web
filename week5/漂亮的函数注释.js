/**
 * 判断字符串是否为纯数字
 * @param {number} n 字符串
 * @returns 
 */
function isNumber(n) {
    if (n === '') {
        // 注意空字符转数字为0，这里是隐式转换。
        return false;
    }
    // isNaN(n) ? return false : return true 不能这样写，会报错。
    // 注意三目运算符是有返回值的，里面不能写return了
    // 下面为正确用法
        // 接受返回值，或者直接return返回值
    // return isNaN(n) ? false : true;

    // 终极高尚版本
    return !isNaN(n);  // 因为isNaN()本身就返回布尔值
}


/**
 *  /斜杆**星号星号
 */
