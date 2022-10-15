/**
 * 分页器类
 */
class Paginator {
    constructor(domRoot, callback, conf) {  // 实例化后自动调用，分页器将拥有某些属性，并立即调用了render方法和initListeners方法
        this.domRoot = domRoot;
        this.callback = callback;   // 分页器实例对象接收了传入的函数，callback，用于在特定的时候回调该函数
        this.conf = conf;

        let { totalPages, currentPage } = conf;  // 解构拿出 传入的总页数和当前页数
        this.totalPages = totalPages;

        this.currentPage = currentPage;

        this.render();  // constructor自动调用，render也立即调用，完成初始化默认页数渲染

        this.initListeners();  // constructor自动调用，initListeners也立即调用，初始化事件监听器，
                               // 初始渲染完成后，给控件按钮绑定事件监听
    }

    // 
    render() {
        // 给分页器实例的根元素添加上样式， 设置分页器在根元素内弹性居中
        this.domRoot.style =
            "display: flex; justify-content: center; align-items: center";

        // 渲染页面，往分页器实例根元素丢HTML字符串， 页码部分先写个壳，留白动态显示，一个p为一个序号盒子，但是不是写死的，分了两种显示布局形式
        this.domRoot.innerHTML = `  
      <!-- 首页按钮 -->
          <div
            style="border: 1px solid rgb(51, 51, 51); padding: 0px 5px; margin: 0px 5px"
            id="btnFirst"
          >first</div>
        
          <!-- 上一页 -->
          <div
            style="border: 1px solid rgb(51, 51, 51); padding: 0px 5px; margin: 0px 5px"
            id="btnPrev"
          >prev</div>
        
          <!-- 页码 -->
          <div
            style="display: flex; justify-content: center; align-items: center"
            class="pagers"
          >${this.getPagersHtml()}</div>
        
          <!-- 下一页 -->
          <div
            style="border: 1px solid rgb(51, 51, 51); padding: 0px 5px; margin: 0px 5px"
            id="btnNext"
          >next</div>
        
          <!-- 末页 -->
          <div
            style="border: 1px solid rgb(51, 51, 51); padding: 0px 5px; margin: 0px 5px"
            id="btnLast"
          >last</div>
        
          <!-- 用户输入页码 -->
          <input
            id="ipPage"
            type="number"
            style="outline: none; width: 50px; height: 20px"
          />
        
          <!-- 跳转用户输入的页码 -->
          <button
            id="btnGo"
            style="outline: none; width: 30px; height: 24px; margin-left: 5px"
          >go</button>`;

        // 拿到一些HTML元素，后续进行操作
        this.pagers = Array.from(this.domRoot.querySelectorAll(".pager"));
        this.btnFirst = this.domRoot.querySelector("#btnFirst");
        this.btnLast = this.domRoot.querySelector("#btnLast");
        this.btnPrev = this.domRoot.querySelector("#btnPrev");
        this.btnNext = this.domRoot.querySelector("#btnNext");
        this.ipPage = this.domRoot.querySelector("#ipPage");
        this.btnGo = this.domRoot.querySelector("#btnGo");
    }

    // 动态补上 render里的留白，返回字符串
    getPagersHtml() {
        let pagersHtml = "";

        // 声明一个fn函数，传入arr，且该数组结构为[[1, 5], [], [18, 20]]二维数组
        let fn = (arr) => {
            arr.forEach(([start, end]) => {  // 遍历数组，每一项item对应着一个数组，随便结构赋值，拿到内层数组里面的两个值
                if (start && end) {  // 如果项item里面的数组元素存在两个数字，且不为0
                    for (let i = start; i <= end; i++) {  // 字符串拼串，并且给当前页添加类名，高亮，排他操作，确保其他的没有高亮
                        pagersHtml += `<p style="border: 1px solid rgb(51, 51, 51); margin: 0px 5px; padding: 0px 5px"
                          class="pager ${i === this.currentPage ? "current" : ""
                            }">${i}</p>`;  // 注意this的指向，我们需要拿到分页器实例的currentPage当前页数属性
                    }
                } else {  // 直接搞三个点 ...
                    pagersHtml += "...";
                }
            });
        };

        // 补齐render留白的第一种结构，当前页在头5或尾5，中间...
        if (this.currentPage <= 5 || this.currentPage >= this.totalPages - 4) { 
            fn.call(this, [[1, 5], [], [this.totalPages - 4, this.totalPages]]);  // 调用fn函数，给pagersHtml赋值，拼好对应字符串
            // 注意this的指向，我们需要拿到分页器实例的currentPage当前页数属性， this ==> 分页器实例对象
        }

        // 补齐render留白的第二种结构，当前页中间，则头3尾巴3，"前二中间后二"，加上分割的...
        else {
            fn.call(this, [
                [1, 3],
                [],
                [this.currentPage - 2, this.currentPage + 2],
                [],
                [this.totalPages - 2, this.totalPages],
            ]);
        }

        return pagersHtml;
    }

    // 初始化之绑定控件的监听器
    initListeners() {
        this.domRoot.onclick = (e) => {  // 事件委托给分页器实例的根元素。都为点击事件
            switch (true) {
                // 点击页码序号
                case e.target.classList.contains("pager"):  // 点击末梢元素的类名列表中(contains)包含pager类名
                    console.log(e.target.innerText);
                    let n = e.target.innerText * 1;  // n = 当前点击页码的序号
                    this.setCurrentPage(n);  // 调用分页器实例的setCurrentPage方法，设置当前页码对应当前数据页数
                    break;

                // 点击首页
                case e.target.id === "btnFirst":
                    this.setCurrentPage(1);
                    break;

                // 点击末页
                case e.target.id === "btnLast":
                    this.setCurrentPage(this.totalPages);
                    break;

                // 点击上一页
                case e.target.id === "btnPrev":
                    this.setCurrentPage(-1, true);
                    break;
                    
                // 点击下一页
                case e.target.id === "btnNext":
                    this.setCurrentPage(1, true);
                    break;

                // 点击Go按钮
                case e.target.id === "btnGo":
                    this.setCurrentPage(document.querySelector("#ipPage").value * 1);  // 跳转到用户输入值的页码
                    break;

                default:
                    break;
            }
        };
    }

    setCurrentPage(n, useDelta = false) {
        console.log("setCurrentPage", n);

        // 上一页，下一页专用setCurrentPage(1, true)  setCurrentPage(-1, true)
        // 第二个参数传入true时候才执行
        if (useDelta) { 
            n = this.currentPage + n;  // 当前页码加1，或减1，根据传入的第一个参数，当前页码自增或自减
        }

        // 在合法序号范围内，才执行，超出范围，什么也不做，管你怎么点，都尽头了，我什么也不干
        if (n >= 1 && n <= this.totalPages) { 
            this.currentPage = n;  // 重新给分页器实例的currentPage属性 赋值为 监听事件触发后拿到的当前页码序号n

            this.render();  // 监听事件触发后，修改currentPage后，重新渲染表格分页器实例

            /* *********************** */
            // 核心！
            // 两个不同类之间的关联！！！！！！！！！
            // 分页器实例调用 之前接收的传入函数 mt.turnToPage(n)
            this.callback(n);
                // 之一操作，让表格实例调用turnToPage方法，并且告诉当前页码的序号
                // 跳到对应页数的表格页面
        }
    }
}

/**
 * 学生类
 */
class Student {
    // 传参给类，实例获得对应属性和值
    constructor(id,name,age,gender,clazz,salary=15000){
        this.id = id
        this.name = name
        this.age = age
        this.gender = gender
        this.clazz = clazz
        this.salary = salary
    }
}

/**
 * 表格类  --  在指定父元素下，将给入数据渲染出配置对象要求的表格页面，
 *            实例的核心方法 turnToPage(n)
 *                传入页数，重新渲染，渲染指定n页数的表格页面
 */
class MyTable {
    constructor(dataArr, domRoot, conf) {  // 实例化自动调用constructor()，实例会拥有的属性
      // MyTable传入的参数
      // dataArr: 渲染表格所需数据的数组
      // domRoot: 渲染在哪个dom元素里面
      // conf：配置对象 {pageSize: 20, page: 5} 规定每页显示的数据条数，和默认一开始显示的页数
      
      this.dataArr = dataArr;
      this.domRoot = domRoot;
      this.conf = conf;
  
      let { pageSize, page } = conf;  // 拿出配置对象的默认显示页数
      this.turnToPage(page);  // 表格实例调用turnToPage方法，跳转到默认的显示页数。
    }
    
    /* 下面所有方法都是写在MyTable.prototype原型上的方法，所有实例均可调用 */

    // 渲染表格 先写好外层的壳thead行内留白动态渲染，tbody整体留白动态渲染数据
    render() {
      this.domRoot.innerHTML = `
          <table border="1" cellspacing="0" id="mytable">
              <thead>
                  <tr>${this.getThs()}</tr>
              </thead>
              <tbody>${this.getTrs()}</tbody>
          </table>`;
    }

    // 返回动态HTML字符串， 填上thead行内的留白
    getThs() {
      const stu = this.dataArr[0];  // 拿出全部数据数组中的第一条，即学生实例数组中的第一个学生实例对象。
  
      let ths = "";
      for (let key in stu) {  // 遍历拿出的对象，字符串拼凑，把属性名作为th标题
        ths += `<th>${key}</th>`;
      }
      return ths;
    }
    
    // 返回动态HTML字符串， 填上tbody整体留白
    getTrs() {
      let trs = "";
      this.pageArr.forEach(  // 遍历需要渲染的那个截取出来的子数据数组，即遍历显示那页的每一个学生实例对象
        (stu) => {
          let tr = "<tr>";
          for (let key in stu) {  // 对该对象遍历，用对象的每个属性的值做td的内容
            tr += `<td>${stu[key]}</td>`;
          }
          tr += "</tr>";    // 头尾加上tr，即每个学生为一行，一行内的每一个td为学生的一个属性值
          trs += tr;  // 每遍历一个学生，再把tr行加起来，最后遍历结束，得到tbody里面的内容
        }
      );
      return trs;
    }
    
    // 传入页数参数，
    turnToPage(n) {
      // 给表格实例对象添加一个pageArr属性，值是一个新数组 截取了对应页数需要渲染的学生实例数组。第5页，就截取dataArr中的[0, 20)
      this.pageArr = this.dataArr.slice(  // slice()的第二个参数如果大于数组的长度，就截取到最后
        this.conf.pageSize * (n - 1),     // 所以，最后一页，不够一页页数可以截取出来的
        this.conf.pageSize * n
      );
      
      // 调用表格实例的render方法，渲染出截取数据的表格
      this.render();
    }
  }


/**
 * 实例化
 */
    // 准备一个数组，存放学生实例数据
    const students = []; 
    for (let i = 1; i <= 1234; i++) {  // 创建1234个学生实例对象，并依次推入准备好的数组
    students.push(                     // 每次循环传入随机的参数
        new Student(
        getLengthedNumStr(i, 4),       // 有序的id，补齐长度为4
        getRandomName(),               // 随机姓名name
        getRandom(18, 40),             // 随机年龄age
        getRandomItem(["男", "女", "基", "同"]),  // 随机gender
        getRandom(2101, 2113),         // 随机班级clazz
        getRandom(5000, 30000)         // 随机工资salary
        )
    );
    }

    /* 表格实例 */
    const mt = new MyTable(  // 实例化一个表格，传入参数
    students,                // 学生实例数组
    document.querySelector(".mytable"),  // 渲染在有类名mytable的元素下

    {                       // 配置对象
        pageSize: 20,       // 规定每页有多少条数据，多少个学生
        page: 5,            // 默认上来显示的页数
    }
    );

    /* 分页器实例 */
    const pg = new Paginator(  // 实例化一个分页器，传入参数
    document.querySelector(".paginator"),  // 渲染在哪个根元素下

    (n) => mt.turnToPage(n),  // 回调函数

    {                         // 配置对象，控制分页器的总页数，和当前页数
        totalPages: Math.ceil(students.length / mt.conf.pageSize),  // 与表格联系
        currentPage: 5,  // 默认上来 当前页数
    }
    );



/**
 * 数学工具，math_util    util：跑龙套
 */    
// 返回一个[a, b]闭区间的随机整数
function getRandom(a, b) {
    return a + parseInt((b - a + 1) * Math.random());
}

// 返回arr数组中随机的一个元素
function getRandomItem(arr) {
    return arr[getRandom(0, arr.length - 1)];
}

// 返回str字符串中随机的一个字符  与getRandomItem雷同
function getRandomChar(str){
    return str[parseInt(Math.random()*str.length)]
}

// 返回一个随机的姓名
function getRandomName() {
    const firstName = "赵钱孙李周吴郑王冯陈楚魏蒋沈韩杨朱秦尤许何吕施章";
    const middleaName = "氢氦锂铍硼碳氮氧氟氖钠镁铝硅磷硫氯氩钾钙";
    const lastName = "一二三四五六七八九十";
    return `${getRandomChar(firstName)}${getRandomChar(middleaName)}${getRandomChar(lastName)}`
}

// 返回一个给定len长度的num数字字符串，不足长度在前面用0补上
function getLengthedNumStr(num, len) {
    let retStr = "";
    for (let i = 0; i < len - (num + "").length; i++) {  // 我需要的数字长度 - 当前数字的长度 = 补0的个数
        retStr += "0";
    }
    retStr += num;
    return retStr;
}

// 和getRandom重复了。且有小bug
function getRangeRandom(start, end) {
    return start + Math.round((end - start) * Math.random());
}

// 和getLengthedNumStr雷同，多了转为什么radix进制的功能，默认为10进制
function getLengthedNumberStr(num, len, radix = 10) {
    var str = num.toString(radix);  // 将数字转为radix进制的数字字符串，默认值为10进制
    for (var i = 0; i < len - str.length; i++) {
        str = "0" + str;
    }
    return str;
}

// 返回一个随机的颜色字符串，默认为16进制表示法，传参false则为rgb表示法
function getRandomColor(useHex = true) {
    var red = getRangeRandom(0, 255);
    var green = getRangeRandom(0, 255);
    var blue = getRangeRandom(0, 255);

    if (!useHex) {
        return `rgb(${red},${green},${blue})`;
    } else {
        red = getLengthedNumberStr(red, 2, 16);
        green = getLengthedNumberStr(green, 2, 16);
        blue = getLengthedNumberStr(blue, 2, 16);
        console.log(red, green, blue);

        return `#${red}${green}${blue}`;
    }

    function getRandomItem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
}
    