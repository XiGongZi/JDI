define([
    'require',
    "app/PKG_0.0.1",
    "jquery",
    "app/tabsFunctions",
], function(
        require,
        PKG,
        $,
        TBF,
    ) {
    'use strict';
        
    //当父级点击时
    $(".leftBarFrame-main").click(function(){
    /*获取点击的状态，0为被折叠，1为展开*/
    var zhi1 = $(this).attr("rotateStatus");
    /* 全部折叠开始*/
    $(".leftBarFrame-main .arrow svg").attr("rotate","rotateArr2");
    $(".leftBarFrame-main").attr("rotateStatus","0");
    $(".leftBarFrame-son").slideUp(500);
    /* 全部折叠结束*/
    if(zhi1 == 0){
        $(this).children(".arrow").children("svg").attr("rotate","rotateArr");
        $(this).attr("rotateStatus","1");
        $(this).siblings(".leftBarFrame-son").slideDown(500);
    }else{
        $(this).children(".arrow").children("svg").attr("rotate","rotateArr2");
        $(this).attr("rotateStatus","0");
        $(this).siblings(".leftBarFrame-son").slideUp(500);
    }
    });
    /* 一级菜单调整*/
    $(".leftBarFrame-son a").click(function(){
        /**设置选中样式 */
        $(".leftBarFrame-son a").attr("hover1","0");
        $(this).attr("hover1","1");
        /**------------------------------------- ------------------------------------- */
        /**获取当前页url、pageName，并取出关键词LFID同时将index定位改为此pageName */
        /**从url中获取中间的页面名称 */
        let url = $(this).attr("url");
        let LFID = PKG.get.urlFromStr(url);
        /*传值给父级index 获取位置   LFDep_CN 一级菜单  LFID_CN 二级菜单*/
        var LFDep_CN = $(".leftBarFrame-li .leftBarFrame-main[rotatestatus='1'] .flex1").text();
        var LFID_CN = $(".leftBarFrame-son a[hover1='1']").text() ;
        let data01 = {
            LFID,
            LFDep_CN,
            LFID_CN,
            tabName_CN:"",
        }
        /**传值给父级index 获取位置 */
        TBF.changePosition(data01);
        /**------------------------------------- ------------------------------------- */
        /**判断T1是否存在此LFID 若不存在 */
        let case0 = $(`#tabs .tabs>div[LFID="${LFID}"]`,parent.document).length;
        if(case0 == 0){
            /**-------------------------------------*/
            /** 插入T1B1 */
            let data02 = {
                LFID,
            }
            TBF.insertT1B1(data02);
            /**-------------------------------------*/
            /** 插入T2B2 */
            let data03 = {
                LFID,
                tabName:LFID,
                tabName_CN:LFID_CN,
                url,
            }
            TBF.insertT2B2(data03);
            /**-------------------------------------*/
            /** 给新页签绑定点击事件 */
            let data04 = {
                LFID,
                tabName:LFID,
            }
            TBF.bindTabsFun(data04)
        }


    });
    $(".leftBarFrame-son a").hover(function(){
    $(".leftBarFrame-son a").attr("hover","0");
    $(this).attr("hover","1");
    });
    $(".leftBarFrame-son a").mouseout(function(){
    $(".leftBarFrame-son a").attr("hover","0");
    });

    // window.onload=function(){
    // var zhi0 = $(".leftBarFrame-son a[hover1='1']").text() ;
    // var zhi1 = $(".leftBarFrame-li .leftBarFrame-main[rotatestatus='1'] .flex1").text();
    // zhi1 == ""?zhi1 = "综合部门":zhi1 = zhi1;
    // $(".bodyFrame .leftBar").click(function(e){
        
    // });
    // }

});



