define([
    'require',
    "jquery",
    "app/setPlc_0.0.1"
], function(require,$,setPlc) {
    'use strict';
    let main = {
        // mainStr 为传出的字符串，json共两个信息，一个是是否返回用户数据的returnFlag，false则未登录，true则已登录，据此返回相应字符串
        str:function(imgAdd){
            return `	
                      <div class=" loginMax" style="display:none;">
                            <img src="${imgAdd}" alt="">
                            <div class="blackBG hasHand"></div>
                        </div>
                    `;
        },
        str2:function(imgAdd){
            return `	
                      <div class=" loginMax" style="display:none;">
                            <img src="${imgAdd}" alt="">
                            <div class="blackBG hasHand"></div>
                        </div>
                    `;
        },
        // 为当前组件添加事件。
        fun:function(add){
            $(add).click(function(){
                $(".loginMax").show();
                //绑定 禁止滑动事件
                $("body").bind("touchmove",function(event){
                    event.preventDefault;
                });
                // $("body").css("overflow","hidden");
                $('body').css({'position':'fixed',"width":"100%"});
            });
        },
        onceFun:function(json){
            $(".blackBG").click(function(){
                // alert(2)
                $(".loginMax").hide();
                //取消 禁止滑动事件
                $("body").unbind("touchmove");
                // $("body").css("overflow","auto");
                $("body").css({"position":"initial","height":"auto"});      
            });
            $(".loginMax img").click(function(){
                window.location.href=rootUrl + json.url;
            });
            //居中
            setPlc.DivWidth(".loginMax img");
            // setPlc.DivHeight(".loginMax img");
        },
        add:function(json){
            let loginMaxLen = $("body .loginMax",parent.document).length;
            if(loginMaxLen > 0){
                $("body .loginMax",parent.document).remove();
            }
            $("body",parent.document).append(json.str)
            $(json.add).click(function(){
                $(".loginMax",parent.document).show();
                //绑定 禁止滑动事件
                $("body",parent.document).bind("touchmove",function(event){
                    event.preventDefault;
                });
                // $("body").css("overflow","hidden");
                $('body',parent.document).css({'position':'fixed',"width":"100%"});
            });
            $(".blackBG",parent.document).click(function(){
                // alert(2)
                $(".loginMax",parent.document).hide();
                //取消 禁止滑动事件
                $("body",parent.document).unbind("touchmove");
                // $("body").css("overflow","auto");
                $("body",parent.document).css({"position":"initial","height":"auto"});      
            });

            $(".loginMax .button>div",parent.document).click(function(){
                $(".loginMax",parent.document).hide();
                //取消 禁止滑动事件
                $("body",parent.document).unbind("touchmove");
                // $("body").css("overflow","auto");
                $("body",parent.document).css({"position":"initial","height":"auto"});      
            });


            //居中
            let zhi1 = $(".loginMax .body",parent.document).parent().width();
            let zhi2 = $(".loginMax .body",parent.document).width();
            let zhi = (zhi1 - zhi2) / 2;
            $(".loginMax .body",parent.document).css("margin-left", zhi + "px");
        }
    }
    return {
        "main":main,
        // "register":register
    };

//     /* 组件处理单元 开始 login*/
//     var imgAdd2 = AJAX.imgAdd_login;
//     //此处通过返回的json去获取相应的字符串
//     var str05 =login.main.str(imgAdd2);
//     //将字符串添加到dom里
//     $("body").append(str05);
//     //为此节点绑定特定事件(显示login)
//     var hisUrl = $(".titleBar-main a:eq(2)").attr("href");
//     $(".titleBar-main a:eq(2)").attr("href","javascript:void(0)");
//     var loginData = {};
//     loginData.url = hisUrl;
//     login.main.fun(".titleBar-main a:eq(2)");
//     login.main.fun(".titleBar_eyeDepa-main .contact img");
//     login.main.onceFun(loginData);
// /* 组件处理单元 结束 login*/
});
