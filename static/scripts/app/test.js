define([
    'require',
    "app/PKG_0.0.1",
], function(require,b) {
    'use strict';
    //页面入口程序，定义需要载入的文件
    let url = require.toUrl("lib/jquery");
    //此处参数    ../lib > static/js/scripts/lib
    //      ../app/test > static/js/scripts/./app/test
    //           ./test > static/js/scripts/./app/test
    //            /test > /test
    //         app/test >  static/js/scripts/./app/test
    //         lib/jquery >  static/js/scripts/lib/jquery

    console.log(url)
    //使用 b.get.ip()时，应为需要异步回调，所以必须先定义回调函数，放进对象中，再将对象作为参数传入此函数内。 
    let fun = {};
    fun.callBack = function (e){console.log(e)}
    b.get.ip(fun);//加载请求js


    let someThing = new Date();
    // someThing.  
});
