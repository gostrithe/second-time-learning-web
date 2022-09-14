/**
 * 将str中的脏字进行过滤
 * @param {string} str 要过滤的大字符串
 * @param {string[]} dirtyWords 脏话数组
 * @returns 过滤后的str
 */
function filterDirtyWords(str, dirtyWords) {
  /* 提前封装一个函数将字符串重复n次 */
  function getRepeatedStr(str, n) {
    var ret = "";
    for (var i = 0; i < n; i++) {
      ret += str;
    }
    return ret;
  }

  //   var str = "asdasd脑残asdasdasd小可爱sdasdasdDAMNsadasd";
  //   var arr = ["脑残", "小可爱", "DAMN"];

  // 将高级用于数组进行遍历 将每个高级用语都执行替换
  dirtyWords.forEach(function (item) {
    str = str.replaceAll(item, function (sub) {
      return getRepeatedStr("*", sub.length);
    });
    // console.log(str);
  });

  return str;
}

/**
 * 反转字符串
 * @param {string} str
 * @returns 反转后的字符串
 */
function reverseStr(str) {
  // 先肢解为字符数组=>字符数组反转=>重新连接为字符串
  return str.split("").reverse().join("");
}

/**
 * 统计str中每个字符出现的个数
 * @param {string} str 待统计的字符串
 * @returns {object} 统计结果
 */
function countChars(str) {
  var obj = {};
  for (var i = 0; i < str.length; i++) {
    var char = str[i];
    // if(!obj[char]){
    //     obj[char]=1
    // }else{
    //     obj[char]++
    // }
    !obj[char] ? (obj[char] = 1) : obj[char]++;
  }
  return obj;
}

/**
 * 从str中获取不重复的字符 形成一个字符串并返回之
 * @param {string} str 待分析的字符串
 * @returns {string} 无重复的字符串
 */
function getUnrepeatedChars(str) {
  // var str = "话说天下大势，分久必合，合久必分";

  let firstChars = "";
  for (var i = 0; i < str.length; i++) {
    var char = str[i];

    // 判断char是否首次出现
    // if(str.indexOf(char)===i){
    //   将首次出现的字符拼接到firstChars
    //   firstChars+=char
    // }

    // 单if分支简写
    str.indexOf(char) === i && (firstChars += char);
  }

  // console.log(firstChars);
  return firstChars;
}

/**
 * 从str中获取不重复的字符 形成一个字符串并返回之
 * @param {string} str 待分析的字符串
 * @returns {string} 无重复的字符串
 */
function getUnrepeatedChars2(str) {
  return str
    .split("")
    .filter(function (char, index, _arr) {
      return _arr.indexOf(char) === index;
    })
    .join("");
}

/**
 * 检测str是否可回文字符串
 * @param {string} str 待检测的字符串
 * @returns {boolean}
 */
function isReversableStr(str) {
  return str.split("").reverse().join("") === str;
}

/**
 * 获得rgb格式的随机颜色
 * @returns {string} rgb格式的随机颜色
 */
function getRandomColorRGB() {
  var red = parseInt(Math.random() * 256);
  var green = parseInt(Math.random() * 256);
  var blue = parseInt(Math.random() * 256);
  var color = `rgb(${red},${green},${blue})`;
  return color;
}

/**
 * 获得16进制格式的随机颜色
 * @returns {string} 16进制格式的随机颜色
 */
function getRandomColorHex() {
  var red = parseInt(Math.random() * 256);
  var green = parseInt(Math.random() * 256);
  var blue = parseInt(Math.random() * 256);

  var color = `#${addPrefix(red.toString(16), "0", 2)}${addPrefix(
    green.toString(16),
    "0",
    2
  )}${addPrefix(blue.toString(16), "0", 2)}`;

  return color;
}

/**
 * 给字符串添加前缀 以便达到固定长度
 * @param {string} str 要添加前缀的字符串
 * @param {string} prefix 前缀
 * @param {number} len 最终要形成的总长度
 * @returns {string} 最终的字符串
 */
function addPrefix(str, prefix, len) {
  var prefixes = "";
  for (var i = 0; i < len - str.length; i++) {
    prefixes += prefix;
  }
  return prefixes + str;
}

/**
 * 格式化Date对象
 * @param {Date} date
 * @returns {string}
 */
function formatDate(date) {
  console.log("formatDate", date);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var _date = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  return `${addPrefix(year + "", "0", 4)}-${addPrefix(
    month + "",
    "0",
    2
  )}-${addPrefix(_date + "", "0", 2)} ${addPrefix(
    hour + "",
    "0",
    2
  )}:${addPrefix(minute + "", "0", 2)}:${addPrefix(second + "", "0", 2)}`;
}
