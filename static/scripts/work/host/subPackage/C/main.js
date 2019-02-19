define([
    'require',
    "app/PKG_0.0.1",
    "jquery",
    "../M/jsgrid",
], function(
        require,
        PKG,
        $,
        jsgrid,
    ) {
    'use strict';
    $(".showAddNew").click(function(){
        if($(".addNew").css("display")=="none"){
            $(".addNew").slideUp(500);
        }
    });
});



