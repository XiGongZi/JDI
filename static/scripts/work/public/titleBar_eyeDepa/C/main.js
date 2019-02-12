define([
    'require',
    "jquery",
], function(require,$) {
    'use strict';
    //登陆注册点击事件
    let main = {
        // mainStr 为传出的字符串，json共两个信息，一个是是否返回用户数据的returnFlag，false则未登录，true则已登录，据此返回相应字符串
        str:function(json){
            let str01 = "";
            if(json.returnFlag){
                str01 = `   <a href="#">
                                <img src="./static/image/test/logined.png" alt="">
                            </a>
                        `;
            }else{
                str01 = `   <a href="#">
                                <img src="./static/image/test/loginPlz.png" alt="">
                            </a>
                        `;
            }
            return `<div class="row titleBar_eyeDepa">
                        <div class="col-md-1 col-xs-1"></div>
                        <div class="col-md-10 col-xs-10 titleBar_eyeDepa-main">
                            <div class="title">
                                <img src="./static/image/test/logo2.jpg" alt="">
                            </div>
                            <div class="contact">
                               ${str01}
                            </div>
                        </div>
                        <div class="col-md-1 col-xs-1"></div>
                    </div>
                    `;
        },
        // 为当前组件添加事件。
        fun:function(){
            $(".titleBar_eyeDepa .titleBar_eyeDepa-main .contact").click(function(){

            });
        }
    }
    return {
        "main":main,
        // "register":register
    };

});
