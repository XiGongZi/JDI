define([
    'require',
    "app/PKG_0.0.1",
    "jquery",
    "work/public/bodyFrame/c/main",
    // "../M/jsgrid",
    // "app/jsgridConfig",
    "app/clearOrMore",
    "app/tabsFunctions",
    "work/public/alert/c/main",
    "app/jsGridMethods",
], function( 
        require,
        PKG,
        $,
        bodyFrame,
        // jsgrid,
        COM,
        TBF,
        login,
        JGM,
    ) {
    'use strict';
        // let json4 = {
        //     "add":".contractN0",
        //     "str":`
        //     <div class="loginMax" style="display:none;">
        //         <div class="blackBG">
        //         </div>
        //             <div class="body">
        //                     <div class="bodyFrame1 displayFlex">
        //                         <div class="bodyFrame1-main flex1 ">
        //                                 <!-- 此处存放众搜索选项 -->
        //                             <!-- 添加  ---------------------------------------------------------------------->
        //                             <!-- 添加 -->
        //                             <div class="addNew" style="display:block">
        //                                     <!-- 此处存放众搜索选项 -->
        //                                     <div class="space40px"></div>
        //                                     <div class="case">
        //                                         <!-- 每一个筛选条件组件 -->
        //                                         <div class="">
        //                                             <div class="case-name">合同编号:</div>
        //                                             <div class="case-input">
        //                                                 <input type="text">
        //                                             </div>
        //                                             <div class="case-icon">
        //                                                 <svg class="icon" aria-hidden="true" status="0">
        //                                                     <use xlink:href="#icon-clear"></use>
        //                                                 </svg>
        //                                             </div>
        //                                             <span class="clear"></span>
        //                                         </div>
        //                                     </div>
        //                                     <!-- 此处为搜索选项 -->
        //                                     <div class="button">
        //                                         <div>确认</div>
        //                                     </div>
        //                                     <div class="clearBoth"></div>
        //                                 </div>
        //                             <!-- 表格 -->
        //                             <div class="space10px"></div>
                                
        //                         </div>
        //                     </div>
            
            
        //             </div>
        //     </div>
        //             `
        // }
        // login.main.add(json4)

        $(".closeTabs").click(function(){
            /**刷新父下另一个框架iframe */
                    /**存 */
            let JGConfig = {};
            JGConfig.data = {
                "faddress": "辽宁省沈阳市于洪区",
                "ffile": "",
                "fmanager": "小明",
                "fmoney": 1000000,
                "fno": "20190308094416",
                "fnote": "已完成",
                "fpeojectname": "桥梁1",
                "fphone": "15524349999",
                "fstate": "竣工",
                "ftax": 0,
                "funitname": "测试名称3",
            };
            JGConfig.url = "http://192.168.1.100/stockWeb/spactSave";
            JGM.addInfo(JGConfig);

            $(`#tabs .iframes>div[LFID="totalPackage"]>iframe[tabName="totalPackage"]`,parent.document)[0].contentWindow.location.reload();
            /**关闭当前页签 */
            TBF.closeTab();
        });
      


});
