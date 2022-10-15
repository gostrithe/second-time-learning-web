console.log('1');

setTimeout(function () {
    console.log('2');
    process.nextTick(function () {
        console.log('3');
    });
    new Promise(function (resolve) {
        console.log('4');
        resolve();
    }).then(function () {
        console.log('5');
    });
});
process.nextTick(function () {
    console.log('6');
});
new Promise(function (resolve) {
    console.log('7');
    resolve();
}).then(function () {
    console.log('8');
});

setTimeout(function () {
    console.log('9');
    process.nextTick(function () {
        console.log('10');
    });
    new Promise(function (resolve) {
        console.log('11');
        resolve();
    }).then(function () {
        console.log('12');
    });
});

/* node环境下的输出 */
// 1 7 6 8 2 4 3 5 9 11 10 12


/* 作者：张倩qianniuer
链接：https://juejin.cn/post/6844903638238756878
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。 */


// 秃头题
Promise.resolve()
    .then(() => {
        console.log(0);
        return Promise.resolve(4444444);
    })
    .then((res) => {
        console.log(res);
        // console.log(4);
    });
Promise.resolve()
    .then(() => {
        console.log(1);
    })
    .then(() => {
        console.log(2);
    })
    .then(() => {
        console.log(3);
    })
    .then(() => {
        console.log(5);
    })
    .then(() => {
        console.log(6);
    });

// 输出 1 2 3 4 5 6
// https://juejin.cn/post/7109088946889424932



// 最终理解
console.log(1);
setTimeout(() => { // T1
    console.log(2);
    Promise.resolve().then(() => { //P1 t1
        console.log(3);
    });
});
new Promise((resolve, reject) => { //P2
    console.log(4);
    resolve(5);
}).then((data) => { //t2
    console.log(data);
    Promise.resolve().then(() => { //P3 t3
        console.log(6);
    }).then(() => { // t4
        console.log(7);
        setTimeout(() => { // T3
            console.log(8);
        }, 0);
    });
}).then(() => { // t5
    console.log(11);
}).then(() => { //t6
    console.log(12);
});
setTimeout(() => { // T2
    console.log(9);
});
console.log(10);

// 输出
// 1 4 10 5 6 11 7 12 2 3 9 8


/* 作者：YongCode;
链接：https://juejin.cn/post/6844904181870886925
来源：稀土掘金;
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。 */