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
        TBF,
        ATF,
    ) {
    'use strict';
    /**
     *            // add :".需要绑定的节点",
            // tabName :"页签ID(代码内标记)",
            // url :"url地址，可带参数",
            // tabName_CN :"页签名（展示出来的页签名）",
     */
        /* input旁边小功能*/ 
        let json1 = {
            "add":".showAddNew",
            "url":"./addNewSub.html",
            "tabName_CN":"添加新分包合同",
            "tabName":"addSubContract"
        };
        TBF.bindAddNewTab(json1);
        let json2 = {
            "add":".itemName .case-icon svg[status='1']",
            "url":"./test2.html",
            "tabName_CN":"测试2",
            "tabName":"test2"
        };

        TBF.bindAddNewTab(json2);
 
         

});



