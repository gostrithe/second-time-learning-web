/**
 * 发起HTTP请求，GET和POST方法，响应成功则回调成功函数，将响应文本responseText作为入参。失败则回调失败函数，将入参err浏览器提供的错误提示响应
 * @param {Object} conf 配置对象， {HTTP方法, 请求目标url, 成功回调函数, 失败回调函数, 传送的数据对象, 传送数据的类型}
 */
function ajax2(conf) {
    console.log('ajax called');

    let { method, url, onSuccess, onFail, data, dataType } = conf;

    const xhr = new XMLHttpRequest();

    // method === 'GET' && (url += `?${getSearchParams(data)}`);
    switch (true) {
        case method === 'GET':
            (url += `?${getSearchParams(data)}`);
            break;

        case method === 'POST' && dataType === 'form':
            body = getSearchParams(data);
            break;

        case method === 'POST' && dataType === 'json':
            body = JSON.stringify(data);
            break;

        default:
            break;
    }

    let body = null;

    xhr.onload = () => {
        onSuccess(xhr.responseText);
    };

    xhr.onload = err => {
        onFail(err);
    };

    xhr.open(method, url);

    switch (dataType) {
        case 'form':
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            break;
        case 'josn':
            xhr.setRequestHeader('Content-Type', 'application/json');
            break;

        default:
            break;
    }

    xhr.send(null);
}

function getSearchParams(data) {
    let queryString = '';
    for (const key in data) {
        queryString += `${key}=${data[key]}&`;
    }
    queryString = queryString.slice(0, -1);

    return queryString;
}