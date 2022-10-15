/**
 * 传入配置对象conf
 * {
 *   method: 'GET',    -- HTTP方法
 *   url: 'https://www.baidu.com',    -- 请求的目标地址
 *   data: {name: 'jack', age: 18},    -- 传入参数，或者数据 
 *   dataType: 'form',    -- 设置请求头的Content-Type内容类型
 *   onSuccess: response => console.log('success', response),    -- 请求成功时的回调函数
 *   onFail: reason => console.log('error=', reason)    -- 请求失败时的回调函数
 * }
 */
/* 发起ajax(XMLHttpRequest)请求 */
function ajax(conf) {
    // 设置默认配置对象
    // 如果传入的配置中没有method、onSuccess、onFail，则时候默认的
    // 如果有，则用户配置会覆盖默认配置
    const defaultConf = {
        method: 'GET',
        onSuccess: responseText => console.log('HTTP请求成功, responseText=', responseText),
        onFail: err => console.log('HTTP请求失败, error=', err),

        ...conf
    };

    // 解构赋值
    let { method, url, data, dataType, onSuccess, onFail } = defaultConf;

    // url是一定要自己写的，如果用户没写，抛出错误
    if (!url) { throw new Error('请传入请求目标地址url!!!'); }

    // 设置默认请求体为null
    let requestBody = null;  // 默认为get方法，xhr.send(null)


    // 核心正文，先new一个XMLHttpRequest实例
    const httpRequest = new XMLHttpRequest();

    // 早早开始监听请求的状态
    // 当请求完成时，会触发load事件
    // 将响应的文本作为入参，回调用户传入的成功函数
    httpRequest.addEventListener('load', () => {
        onSuccess(xhr.responseText);
    });

    // 同理 
    // 请求失败时候会有一个err入参，为请求失败的原因
    httpRequest.addEventListener('error', (err) => {
        onFail(err);
    });

    // 情景之：如果是发GET请求，且用户传了参数
    // 这时候需要重新配置url为  地址?a=1&b=2 格式
    if (method === 'GET' && data) {
        url += `?${getSearchParams(data)}`;
    }

    // 打开通道，准备发送请求
    httpRequest.open(method, url);

    // 设置dataType对应的请求头内容类型，Content-Type
    switch (true) {
        case dataType === 'form':
            httpRequest.setRequestHeader('Content-Tpye', 'application/x-www-form-urlencoded');
            // 请求体 为表单类型的数据a=1&b=2
            requestBody = getSearchParams(data);
            break;

        case dataType === 'json':
            httpRequest.setRequestHeader('Content-Tpye', 'application/json');
            // 请求体 为json类型的数据
            requestBody = JSON.stringify(data);
            break;

        default:
            break;
    }

    // 核心 发送请求，且传入对应请求体
    httpRequest.send(requestBody);
}

function getSearchParams(data) {
    let str = '';
    for (const key in data) {
        str += `${key}=${data[key]}&`;
    }
    // 锯掉最后一个&
    str = str.slice(0, -1);
    return str;
}


/**
 * 用Promise包装ajax函数，
 * 目的，返回一个Promise对象，防止请求成功时再次发起请求
 *                          -- 即是成功时执行回调函数，回调函数里面再次发起请求，层层嵌套，形成回调地狱
 * 而Promise就是用来解决回调地狱问题的
 *      请求成功时返回一个成功态的promise对象
 *      请求失败时返回一个失败态的promise对象
 * 刚好对应，后面就可以promise链式编程
 */
function ajaxPromise(conf) {
    return new Promise((resolve, reject) => {
        // Promise这里的函数参数里面
        // 只需要考虑，什么时候resolve，什么时候reject就行
        // 不要想太多
        ajax({
            ...conf, // 由于我们写的ajax里面有默认的配置，有默认的成功失败回调
            // 这里把默认的回调配置和用户的传进来的回调配置全部覆盖了

            // 现在实现我们的想法
            // 成功时返回一个成功态的promise，且把responseText作为入参，传递下去
            // onSuccess: responseText => resolve(responseText),
            // 失败时返回一个失败态的promise，且把请求失败的错误作为reject的入参。
            // onFail: err => reject(err)

            // better code
            onSuccess: responseText => {
                conf.onSuccess && conf.onSuccess();
                resolve(responseText);
            },
            onFail: err => {
                conf.onFail && conf.onFail();
                reject(err);
            }
        });
    });
}