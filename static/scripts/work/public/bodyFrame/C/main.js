define([
    'require',
    "jquery",
], function(require,$) {
    'use strict';
    //登陆注册点击事件
    let main = {
        // mainStr 为传出的字符串，json共两个信息，一个是是否返回用户数据的returnFlag，false则未登录，true则已登录，据此返回相应字符串
        str:function(json){
            return `
                    `;
        },
        // 为当前组件添加事件。
        fun:function(){
            $(".pageTitle .pageTitle-main .contact").click(function(){

            });
        }
    }
    return {
        "main":main,
        // "register":register
    };

});
