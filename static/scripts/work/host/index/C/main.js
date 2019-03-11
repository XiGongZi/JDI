
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
        //     LBID:"spact",
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
        let json111 = {
            "body":[{
                "proNum":"x1223312",
                "proName":"xx桥梁建设总合同",
                "proAdd":"沈阳市测试三好街",
                "AName":"沈阳市交通设计院",
                "a3":"10.000.000",
                "a4":"10%",
                "a5":"张三",
                "a6":"竣工"
            },{
                "proNum":"x1223311",
                "proName":"桥梁建设总合同",
                "proAdd":"沈阳市测",
                "AName":"沈阳市交通设计院",
                "a3":"10.000.000",
                "a4":"10%",
                "a5":"张三",
                "a6":"竣工"
            }],
        }
        // 转成 
        let final = [
            {
                "合同编号":"x1223312", 
                "项目名称":"xx桥梁建设总合同",
                "项目地址":"沈阳市测试三好街",
                "甲方名称":"沈阳市交通设计院",
                "合同额":"10.000.000",
                "税率":"10%",
                "项目负责人":"张三",
                "状态":"竣工",
            }
        ];


});


