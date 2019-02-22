define([
    'require',
    "app/PKG_0.0.1",
    "jquery",
    "work/public/bodyFrame/c/main",
    "../M/jsgrid",
    "app/clearOrMore",
], function(
        require,
        PKG,
        $,
        bodyFrame,
        jsgrid,
        COM,
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

    
  
});



