define([
    'require',
], function(require) {
    'use strict';
    let path = require.toUrl("./");
    return {
        root : path,
        title : "YIDASI hospitalSSM errMsg_0.0.1",
        author : "gongzixi110@qq.com",
        gitbook : "0.0.1",
        plugins : [],
        localFile:{
            css : {
                "errPage_0.0.1#main" :[ path + "../V/main.less"],
            },
            js : [
                
            ]
        }

    }
});