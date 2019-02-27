define([
    'require',
    "app/PKG_0.0.1",
    "jquery",
    "work/public/bodyFrame/c/main",
    "../M/jsgrid",
    "app/clearOrMore",
    "app/tabsFunctions",
    "app/addTabXIframe",
], function(
        require,
        PKG,
        $,
        bodyFrame,
        jsgrid,
        COM,
        tabFunctions,
        ATF,
    ) {
    'use strict';
    
        /* input旁边小功能*/ 
        let json1 = {
            "pages":"0",
            "LFID":"subpackage",
            "url0":"./addNewSub.html",
            "tabsName":"添加新分包",
            "tabName_attr":"addSubContract"
        };
        let json2 = {
            "add":".itemName .case-icon svg[status='1']",
            "url":"./test2.html",
            "tabName":"测试2",
            "tabName_attr":"test2"
        };
        COM.setPagesFun_inputIcon(json2);
        $(".showAddNew").click(function(){
            $(".tabs>div>div",parent.document).attr("isFocus","no");
            $(".tabs>div .tabs-li",parent.document).remove();
            $("iframe",parent.document).attr("isHide","yes");
            ATF.addTabs(json1);
        })
         /*原LBID*/
         let str11 = $(".leftBarFrame-son a[hover1='1']").attr("url");
         window.onload=function(){
            $(".tabs-main",parent.document).unbind("click")
            $(".tabs-main",parent.document).click(function(){
                $(`iframe[leftBarId="subPackage"]:eq(0)`).attr("isHide","no");
                $(`iframe:eq(0)`).attr("isHide","yes");
            })
         }

 
         

});



