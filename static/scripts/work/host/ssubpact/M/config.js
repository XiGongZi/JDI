define([
    'require',
], function(require) {
    'use strict';
    let path = require.toUrl("./");
    return {
        root : path,
        title : "YIDASI hospitalSSM indexPage",
        author : "gongzixi110@qq.com",
        gitbook : "0.0.1",
        plugins : ["PKG_0.0.1"],
        localFile :{ 
            css : {
                "PageIndex_0.0.1#main" :[ path + "../V/main.less"],
            },
            js : [

            ]},
        
        }
});