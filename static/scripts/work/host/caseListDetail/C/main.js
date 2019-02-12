define([
    'require',
    "app/PKG_0.0.1",
    "work/public/AJAX/main",
    "work/public/titleBar_eyeDepa/c/main",
    "work/public/titleBar/c/main",
    "work/public/showCenterImg/c/main",
    "work/public/login/c/main",
    "work/public/footer/c/main",
    "jquery"
], function(
        require,
        PKG,
        AJAX,
        titleBar_eyeDepa,
        titleBar,showCenterImg,
        login,
        footer,
        $
    ) {
    'use strict';


    
    /* 组件处理单元 开始 titleBar*/
        let json02 = AJAX.titleBar;
        //此处通过返回的json去获取相应的字符串
        let str02 = titleBar.main.str(json02);
        //将字符串添加到dom里
        $(".TB").prepend(str02);
        //为此节点绑定特定事件
        titleBar.main.fun(json02);
    /* 组件处理单元 结束 titleBar*/





    /* 组件处理单元 开始 titleBar_eyeDepa*/
        let json01 = AJAX.userList;
        //此处通过返回的json去获取相应的字符串
        let str01 = titleBar_eyeDepa.main.str(json01);
        //将字符串添加到dom里
        $(".TB").prepend(str01);
        //为此节点绑定特定事件
        titleBar_eyeDepa.main.fun(json01);
    /* 组件处理单元 结束 titleBar_eyeDepa*/



    /* 组件处理单元 开始 showCenterImg*/
        let imgAdd = AJAX.imgAdd_caseListDetail;
        //此处通过返回的json去获取相应的字符串
        let str03 =showCenterImg.main.str(imgAdd);
        //将字符串添加到dom里
        $(".TB").append(str03);
        //为此节点绑定特定事件
        // showCenterImg.main.fun(json01);
    /* 组件处理单元 结束 showCenterImg*/



    /* 组件处理单元 开始 footer*/
        let imgAdd1 = AJAX.imgAdd_footer;
        //此处通过返回的json去获取相应的字符串
        let str04 =footer.main.str(imgAdd1);
        //将字符串添加到dom里
        $("footer").append(str04);
        //为此节点绑定特定事件
        // footer.main.fun(json01);
    /* 组件处理单元 结束 footer*/

    
    /* 组件处理单元 开始 login*/
    var imgAdd2 = AJAX.imgAdd_login;
        //此处通过返回的json去获取相应的字符串
        var str05 =login.main.str(imgAdd2);
        //将字符串添加到dom里
        $("body").append(str05);
        //为此节点绑定特定事件(显示login)
        var hisUrl = $(".titleBar-main a:eq(2)").attr("href");
        $(".titleBar-main a:eq(2)").attr("href","javascript:void(0)");
        var loginData = {};
        loginData.url = hisUrl;
        login.main.fun(".titleBar-main a:eq(2)");
        login.main.fun(".titleBar_eyeDepa-main .contact img");
        login.main.onceFun(loginData);
    /* 组件处理单元 结束 login*/

});



