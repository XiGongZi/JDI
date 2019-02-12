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
        }
    }
    return {
        "main":main,
        // "register":register
    };
});
