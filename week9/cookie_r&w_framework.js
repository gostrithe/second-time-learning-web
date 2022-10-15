/*\
|*|
|*|  :: cookies.js ::
|*|
|*|  A complete cookies reader/writer framework with full unicode support.
|*|
|*|  https://developer.mozilla.org/en-US/docs/DOM/document.cookie
|*|
|*|  This framework is released under the GNU Public License, version 3 or later.
|*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|  Syntaxes:
|*|
|*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
|*|  * docCookies.getItem(name)
|*|  * docCookies.removeItem(name[, path], domain)
|*|  * docCookies.hasItem(name)
|*|  * docCookies.keys()
|*|
\*/

var docCookies = {
    getItem: function (sKey) {
      return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
      if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
      var sExpires = "";
      if (vEnd) {
        switch (vEnd.constructor) {
          case Number:
            sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
            break;
          case String:
            sExpires = "; expires=" + vEnd;
            break;
          case Date:
            sExpires = "; expires=" + vEnd.toUTCString();
            break;
        }
      }
      document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
      return true;
    },
    removeItem: function (sKey, sPath, sDomain) {
      if (!sKey || !this.hasItem(sKey)) { return false; }
      document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
      return true;
    },
    hasItem: function (sKey) {
      return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },
    keys: /* optional method: you can safely remove it! */ function () {
      var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
      for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
      return aKeys;
    }
  };

/* 实例用法 */
/* 
docCookies.setItem("test0", "Hello world!");
docCookies.setItem("test1", "Unicode test: \u00E0\u00E8\u00EC\u00F2\u00F9", Infinity);
docCookies.setItem("test2", "Hello world!", new Date(2020, 5, 12));
docCookies.setItem("test3", "Hello world!", new Date(2027, 2, 3), "/blog");
docCookies.setItem("test4", "Hello world!", "Sun, 06 Nov 2022 21:43:15 GMT");
docCookies.setItem("test5", "Hello world!", "Tue, 06 Dec 2022 13:11:07 GMT", "/home");
docCookies.setItem("test6", "Hello world!", 150);
docCookies.setItem("test7", "Hello world!", 245, "/content");
docCookies.setItem("test8", "Hello world!", null, null, "example.com");
docCookies.setItem("test9", "Hello world!", null, null, null, true);
docCookies.setItem("test1;=", "Safe character test;=", Infinity);

alert(docCookies.keys().join("\n"));
alert(docCookies.getItem("test1"));
alert(docCookies.getItem("test5"));
docCookies.removeItem("test1");
docCookies.removeItem("test5", "/home");
alert(docCookies.getItem("test1"));
alert(docCookies.getItem("test5"));
alert(docCookies.getItem("unexistingCookie"));
alert(docCookies.getItem());
alert(docCookies.getItem("test1;=")); 
*/


/* test */
// 写入 docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
docCookies.setItem('username', 'jack');
// 得到cookie docCookies.getItem(name)
console.log(docCookies.getItem('username'));
// 移除cookie docCookies.removeItem(name[, path],domain)
docCookies.removeItem('username');
// 检测cookie docCookies.hasItem(name)
console.log(docCookies.hasItem('username'));
// 得到所有 cookie 的列表 docCookies.keys()
console.log(docCookies.keys());