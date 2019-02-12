define([
    'require',
    "jquery",
    "app/setPlc_0.0.1"
], function(require,$,setPlc) {
    'use strict';
    let main = {
        // mainStr 为传出的字符串，json共两个信息，一个是是否返回用户数据的returnFlag，false则未登录，true则已登录，据此返回相应字符串
        str:function(imgAdd){
            return `	<div class="row showImg">
                            <div class="col-md-1 col-xs-1"></div>
                            <div class="col-md-10 col-xs-10 showImg-main">
                                    <img src="${imgAdd}" alt="">
                            </div>
                            <div class="col-md-1 col-xs-1"></div>
                        </div>
                    `;
        },
        // 为当前组件添加事件。
        fun:function(json){
            //此处执行传进来的参数
            if(json != undefined && json.extraFun != undefined){
                json.extraFun();
            }
            setPlc.DivWidth(".showImg img");
        }
    }
    return {
        "main":main,
        // "register":register
    };
});
