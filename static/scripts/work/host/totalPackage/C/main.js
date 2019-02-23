define([
    'require',
    "app/PKG_0.0.1",
    "jquery",
    "work/public/bodyFrame/c/main",
    "../M/jsgrid",
    "app/clearOrMore",
    "app/tabsFunctions",
], function(
        require,
        PKG,
        $,
        bodyFrame,
        jsgrid,
        COM,
        tabFunctions,
    ) {
    'use strict';
    
        /* input旁边小功能*/ 
        let json1 = {
            "add":".contractN0  .case-icon svg[status='1']",
            "url":"./test3.html",
            "tabName":"合同编号",
            "tabName_attr":"contractNoTotal"
        };
        let json2 = {
            "add":".itemName  .case-icon svg[status='1']",
            "url":"./test2.html",
            "tabName":"项目名称",
            "tabName_attr":"test2"
        };
        let json3 = {
            "add":".showAddNewCon",
            "url":"./TP-caseToSearch.html",
            "tabName":"添加总合同",
            "tabName_attr":"addContract"
        };
        COM.setPagesFun_inputIcon(json1);
        COM.setPagesFun_inputIcon(json2);
        COM.setPagesFun_inputIcon(json3);

      
    
  
});



