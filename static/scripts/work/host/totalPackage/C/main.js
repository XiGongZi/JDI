define([
    'require',
    "app/PKG_0.0.1",
    "jquery",
    "work/public/bodyFrame/c/main",
    "../M/jsgrid",
    "app/clearOrMore",
    "app/tabsFunctions",
    "work/public/alert/c/main",
], function(
        require,
        PKG,
        $,
        bodyFrame,
        jsgrid,
        COM,
        tabFunctions,
        login
    ) {
    'use strict';
    
        // /* input旁边小功能*/ 
        // let json1 = {
        //     "add":".contractN0  .case-icon svg[status='1']",
        //     "url":"./test3.html",
        //     "tabName":"合同编号",
        //     "tabName_attr":"contractNoTotal"
        // };
        // let json2 = {
        //     "add":".itemName  .case-icon svg[status='1']",
        //     "url":"./test2.html",
        //     "tabName":"项目名称",
        //     "tabName_attr":"test2"
        // };
        // let json3 = {
        //     "add":".showAddNewCon",
        //     "url":"./TP-caseToSearch.html",
        //     "tabName":"添加总合同",
        //     "tabName_attr":"addContract"
        // };
        // // COM.setPagesFun_inputIcon(json1);
        // COM.setPagesFun_inputIcon(json2);
        // COM.setPagesFun_inputIcon(json3);

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
        // /**给tp-caseToSearch.html  (总包合同里新增合同)的确认添加按钮 加事件 */
        // let json5 = {
        //     add:".closeTabs",
        //     LBID:"totalPackage",
        //     tabName:"addContract"
        // }
        // let json6 = {
        //     add:".closeTabs",
        //     LBID:"itemMeasure",
        //     tabName:"addMeasure"
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


});



