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
            "add":".contractN0",
            "url":"./TP-caseToSearch.html",
            "tabName":"添加合同",
            "tabName_attr":"addContract"
        };
        let json2 = {
            "add":".itemName",
            "url":"./test2.html",
            "tabName":"测试2",
            "tabName_attr":"test2"
        };

        COM.setPagesFun_inputIcon(json1);
        COM.setPagesFun_inputIcon(json2);



        let data0 = {
            url0:"./subPackage.html",
            pages:"0",
            LFID:"subPackage",
            tabName_attr:"defaule",
            tabsName:"分包合同表"
        };

        $(".leftBarPage>div",parent.document).attr("isFocus","no");
        $(".bodyFrame-main iframe",parent.document).attr("isHide","yes");
        ATF.addTabs(data0);
        alert(111)
});



