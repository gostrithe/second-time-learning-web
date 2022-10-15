class CookieUtil {
    static setCookie(key, value, path = '/', expires = null) {
        path = encodeURI(path);
        if (expires) {
            expires = new Date(Date.now() - 8 * 3600 * 1000 + expires).toString();
        }
        document.cookie = `${key}=${value}; path=${path}; expires=${expires}`;
        console.log('setCookie success!', this.getCookieAll());
    }

    static getCookieAll() {
        const cookieArr = document.cookie.split('; ');
        const cookieObj = {};
        cookieArr.forEach(aCookie => {
            let [key, value] = aCookie.split('=');
            cookieObj[key] = value;
        });
        return cookieObj;
    }

    static accessCookie(key) {
        return this.getCookieAll()[key];
    }

    static removeCookie(key) {
        document.cookie = `${key}=goToHell; expires=${new Date(0).toString()}`;
        console.log('removeCookie success!', this.getCookieAll());
    }
}

// test
CookieUtil.setCookie('name', 'jack', 'http://127.0.0.1:5500/我的二阶段/week9/day01.html', 3000);
CookieUtil.setCookie('age', 18, 'http://127.0.0.1:5500/我的二阶段/week9/day01.html', 3000);
console.log(CookieUtil.accessCookie('name'));
CookieUtil.removeCookie('age');
console.log(CookieUtil.getCookieAll());