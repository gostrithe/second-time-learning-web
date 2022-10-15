function ajax1(conf) {
    console.log('ajax called');

    let { method, url, onSuccess, onFail, data } = conf;

    const xhr = new XMLHttpRequest();

    // searchParams
    let queryString = '';
    for (const key in data) {
        queryString += `${key}=${data[key]}&`;
    }
    queryString = queryString.slice(0, -1);

    url += `?${queryString}`;

    xhr.onload = () => {
        onSuccess(xhr.responseText);
    };

    xhr.onload = err => {
        onFail(err);
    };

    xhr.open(method, url);
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

    xhr.send(body);
}



