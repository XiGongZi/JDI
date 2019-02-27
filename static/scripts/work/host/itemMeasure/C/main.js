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
            "add":".contractN0 .case-icon svg[status='1']",
            "url":"./TP-caseToSearch.html",
            "tabName":"添加",
            "tabName_attr":"addContract"
        };
        let json2 = {
            "add":".itemName .case-icon svg[status='1']",
            "url":"./test2.html",
            "tabName":"测试2",
            "tabName_attr":"test2"
        };

        // COM.setPagesFun_inputIcon(json1);
        COM.setPagesFun_inputIcon(json2);

});



