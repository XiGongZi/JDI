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
    /**为默认页签绑定事件 */
    let json = {};
    json.add = `.tabs .leftBarPage>div:eq(0)`;
    tabFunctions.setTabsFun(json);
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

    
  
});



