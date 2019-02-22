/**从url中获取中间的页面名称 */
let a = "http://192.168.1.11/SenPageDemo.html";
let b = a.split("/");
    a = b[b.length - 1].split(".");
    b = a[0];