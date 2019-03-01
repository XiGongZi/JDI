
define([
    'require',
    "app/PKG_0.0.1",
    "jquery",
    "work/public/bodyFrame/c/main",
    "../M/jsgrid",
    "app/tabsFunctions",
], function(
    require,
    PKG,
    $,
    bodyFrame,
    jsgrid,
    TBF,
    ) {
        // 'use strict';
        // /**title导航管理 */
     
        // // let store = LS.store;
        // // store.set("as","1");`
   
        // // tabsFunctions.setTabsFun();


        // let json5 = {
        //     add:".closeTabs",
        //     LBID:"totalPackage",
        //     tabName:"addContract"
        // }
        

        // window.onload=function(){
        //     addCloseTabs(json5)
        // }

        // function addCloseTabs(data){
        //     $(data.add).click(function(){
        //         $(`iframe[pages="0"]`,parent.document).attr("isHide","no");
        //         $(`.tabs .tabs-main`,parent.document).attr("isFocus","yes");
        //         $(`.tabs .tabs-li`,parent.document).remove();
        //         $(`iframe[leftBarId="${data.LBID}"][tabName="${data.tabName}"]`,parent.document).remove();
        //     });
            
    
        // }
        /** 给新页签绑定点击事件 */
        let data04 = {
            LFID:"totalPackage",
            tabName:"totalPackage",
        }
        TBF.bindTabsFun(data04);
        let data05 = {
            LFID:"totalPackage",
            tabName:"totalPackage2",
        }
        TBF.bindTabsFun(data05);
});


