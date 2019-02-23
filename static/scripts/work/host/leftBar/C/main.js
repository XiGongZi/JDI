define([
    'require',
    "app/PKG_0.0.1",
    "jquery",
], function(
        require,
        PKG,
        $,
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
    /*原LBID*/
    let str11 = $(".leftBarFrame-son a[hover1='1']").attr("href");
    let val12 = PKG.get.urlFromStr(str11);

    /*上一个页面的 页面 id*/
    let info_beforePage = val12;
    /*上一个页面的 显示的页签 pages属性*/
    let info_tabName = $(`.leftBarPage>div[isFocus='yes']`,parent.document).attr("tabName");
    info_tabName == undefined ? info_tabName = "default":info_tabName = info_tabName;
    console.log("info_tabName is "+info_tabName)
    /*存入*/
    $("body").attr(info_beforePage,info_tabName);


    /**从url中获取中间的页面名称 */
    let val0 = $(this).attr("href");
    let val1 = PKG.get.urlFromStr(val0);
    // console.log(val1);
    $(".leftBarFrame-son a").attr("hover1","0");
    $(this).attr("hover1","1");
    /*传值给父级index   zhi2 一级菜单  zhi1 二级菜单*/
    var zhi2 = $(".leftBarFrame-li .leftBarFrame-main[rotatestatus='1'] .flex1").text();
    var zhi1 = $(".leftBarFrame-son a[hover1='1']").text() ;
    $("#addInfo .first",parent.document).html(zhi2);
    $("#addInfo .seconed",parent.document).html(zhi1);
    $("#addInfo .third",parent.document).html("");
    /*传值给 tabs 标签页 */
    $(".leftBarPage",parent.document).attr("LBP",val1);
    $(".leftBarPage .tabs-main .flex1",parent.document).html(zhi1);
    /* 设置与leftBar页相关的 tabs 显示隐藏 */
        /*第一种方法 直接删除*/
        // $(".leftBarPage .tabs-li",parent.document).remove();
        // $(".bodyFrame-main iframe:eq(0)",parent.document).siblings("iframe").remove();
        // $(".bodyFrame-main iframe:eq(0)",parent.document).attr("isHide","no");
        /*第二种方法 隐藏*/
            /*要存下当前 信息以便恢复 */

            
        // <iframe pages="0" isHide="no" src="./totalPackage.html" name="mainFrame" frameborder="0" scrolling="no"></iframe>
        
        // let str00 = `
        // <iframe class="iframes-li" tabName="${tabName_attr}" pages="${pages}" isHide="no" src="${url0}" leftBarID="${LFID}"  name="mainFrame" frameborder="0" scrolling="no"></iframe>
        // `
        
        /*先执行默认的，非我隐藏*/
        console.log("val1 is "+val1)
        $(`.leftBarPage>div`,parent.document).attr("isFocus","no");
        $(`.leftBarPage .tabs-li[leftBarID!=${val1}]`,parent.document).hide();
        $(`.bodyFrame-main .iframes-li[leftBarID!=${val1}]`,parent.document).attr("isHide","yes");
        /*取出所点击页的信息*/
        let info_thisHistory = $("body").attr(val1);
        console.log("info_thisHistory is "+info_thisHistory);
        if( info_thisHistory == undefined || info_thisHistory == "default"){
            /*若未定义，则说明没有点击过，执行默认*/
            $(`.leftBarPage .tabs-main`,parent.document).attr("isFocus","yes");
            $(`.bodyFrame-main iframe[pages='0']`,parent.document).attr("isHide","no");
            $(`.bodyFrame-main iframe[pages='0']`,parent.document).attr("src",str11);
        }else{
            /*否则按存的信息 重置状态。*/
            $(`.leftBarPage>div[leftBarID=${val1}]`,parent.document).show();
            $(`.leftBarPage>div[leftBarID=${val1}][tabName=${info_thisHistory}]`,parent.document).attr("isFocus","yes");
            $(`.bodyFrame-main .iframes-li[leftBarID=${val1}][tabName=${info_thisHistory}]`,parent.document).attr("isHide","no");
        }

        
        // $(`.leftBarPage .tabs-li[leftBarID=${val1}]`,parent.document).show();
        
        // $(`.bodyFrame-main .iframes-li[leftBarID=${val1}]`,parent.document).attr("isHide","no");
        // let thisTabsL = $(".leftBarPage ",parent.document)


    });
    $(".leftBarFrame-son a").hover(function(){
    $(".leftBarFrame-son a").attr("hover","0");
    $(this).attr("hover","1");
    });
    $(".leftBarFrame-son a").mouseout(function(){
    $(".leftBarFrame-son a").attr("hover","0");
    });

    window.onload=function(){
    var zhi0 = $(".leftBarFrame-son a[hover1='1']").text() ;
    var zhi1 = $(".leftBarFrame-li .leftBarFrame-main[rotatestatus='1'] .flex1").text();
    zhi1 == ""?zhi1 = "综合部门":zhi1 = zhi1;
    $(".bodyFrame .leftBar").click(function(e){
        
    });
    }

});



