define([
    'require',
    "app/PKG_0.0.1",
    "jquery",
    "work/public/bodyFrame/c/main",
    "../M/jsgrid",
], function(
        require,
        PKG,
        $,
        bodyFrame,
        jsgrid,
    ) {
    'use strict';
    /* 显示隐藏添加合同*/ 
    $(".showAddNew").click(function(){
        if($(".addNew").css("display")=="none"){
            $(".addNew").slideDown(500);
            $(".showAddNew").html("取消添加");
        }else{
            $(".addNew").slideUp(500);
            $(".showAddNew").html("添加合同");
        }
    });
    
    $(".addNew .button").click(function(){
        if($(".addNew").css("display")=="none"){
            $(".addNew").slideDown(500);
            $(".showAddNew").html("取消添加");
        }else{
            $(".addNew").slideUp(500);
            $(".showAddNew").html("添加合同");
        }
    });
    /* input旁边小功能*/ 

    $(".bodyFrame1 .bodyFrame1-main .case-icon").click(function(){

        let zhi = $(this).children("svg").attr("status");
        switch (zhi) {
            case "0":
                /**清除 */
                $(this).parent().find("input").val("");
                break;
            case "1":
                /**弹出新框搜索 */
                // alert("制作中！");
                break;
            case "1":
                /**下拉 */
                $(this).parent().find("select").focus();
                break;
            default:
                break;
        }
    })
});



