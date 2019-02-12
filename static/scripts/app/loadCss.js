define([
    'require',
    "app/PKG_0.0.1"
], function (require, PKG) {
    'use strict';
    //页面入口程序，定义需要载入的css文件   输入本组件的config，输出=>加载css
    let css = (config) => {
            let arr = [];
            for (let i in config.localFile.css) {
                arr = [...config.localFile.css[i]];
            };
            console.log(arr)
            PKG.load.lessPre(arr);
    }
    return {
        css
    }
});

