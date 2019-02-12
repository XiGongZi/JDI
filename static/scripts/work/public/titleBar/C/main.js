define([
    'require',
    "jquery",
], function(require,$) {
    'use strict';
    let main = {
        // mainStr 为传出的字符串，json共两个信息，一个是是否返回用户数据的returnFlag，false则未登录，true则已登录，据此返回相应字符串
        str:function(json){
            let str00 = "";
            if(json.returnFlag){
                $.each(json.orderList,function(i,n){
                    str00 += `
                            <a href="${n.href}" >
                                <div class="titleBar-mainName">${n.name}</div>
                                <div class="titleBar-englishName">${n.En}</div>
                                <div class="titleBar-line"></div>

                            </a>
                        `
                });
            }else{
            }
            return `	
            <div class="row titleBar">
                <div class="col-md-1 col-xs-1"></div>
                <div class="col-md-10 col-xs-10 titleBar-main">
                       <span>
                             ${str00} 
                        </span>
                </div>
                <div class="col-md-1 col-xs-1"></div>
            </div>
                    `;
        },
        // 为当前组件添加事件。
        fun:function(){
            $(".titleBar .titleBar-main .contact").click(function(){
                 
            });
        }
    }
    return {
        "main":main,
        // "register":register
    };
});
