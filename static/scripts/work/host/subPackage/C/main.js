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
    $(".showAddNew").click(function(){
        if($(".addNew").css("display")=="none"){
            $(".addNew").slideUp(500);
        }
    });
});



