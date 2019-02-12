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



    /* 组件处理单元 开始 showCenterImg*/
        let imgAdd = AJAX.imgAdd_caseList;
        //此处通过返回的json去获取相应的字符串
        let str03 =showCenterImg.main.str(imgAdd);
        //将字符串添加到dom里
        $(".TB").append(str03);
        //为此节点绑定特定事件
        let fun = function(json){
            $(".showImg img").click(function(){
                window.location.href = rootUrl + `./caseListDetail.html`
            });
        }
        let json03 = {};
        json03.extraFun = fun;
        showCenterImg.main.fun(json03);
    /* 组件处理单元 结束 showCenterImg*/




        /**测试相对坐标 开始 */
        var kdaZhi0 = parseInt($(".kda").offset().top);
        var kdaZhi1 = parseInt($(".kda").offset().left);
        var kdaZhi2 = parseInt($(".showImg img").offset().top);
        var kdaZhi3 = parseInt($(".showImg img").offset().left);
        alert(`坐标是 [${(kdaZhi0 - kdaZhi2)},${(kdaZhi1 - kdaZhi3)}]`);
        /**测试相对坐标 结束 */

});



