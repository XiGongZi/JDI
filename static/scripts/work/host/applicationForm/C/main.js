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
    
      
        let json3 = {
            "add":".showAddNewCon",
            "url":"./addApplication.html",
            "tabName":"添加新申请表",
            "tabName_attr":"addApplication"
        };
        
        COM.setPagesFun_inputIcon(json3);

        let json4 = {
            "add":".contractN0",
            "str":`
            <div class="loginMax" style="display:none;">
                <div class="blackBG">
                </div>
                    <div class="body">
                            <div class="bodyFrame1 displayFlex">
                                <div class="bodyFrame1-main flex1 ">
                                        <!-- 此处存放众搜索选项 -->
                                    <!-- 添加  ---------------------------------------------------------------------->
                                    <!-- 添加 -->
                                    <div class="addNew" style="display:block">
                                            <!-- 此处存放众搜索选项 -->
                                            <div class="space40px"></div>
                                            <div class="case">
                                                <!-- 每一个筛选条件组件 -->
                                                <div class="">
                                                    <div class="case-name">合同编号:</div>
                                                    <div class="case-input">
                                                        <input type="text">
                                                    </div>
                                                    <div class="case-icon">
                                                        <svg class="icon" aria-hidden="true" status="0">
                                                            <use xlink:href="#icon-clear"></use>
                                                        </svg>
                                                    </div>
                                                    <span class="clear"></span>
                                                </div>
                                            </div>
                                            <!-- 此处为搜索选项 -->
                                            <div class="button">
                                                <div>确认</div>
                                            </div>
                                            <div class="clearBoth"></div>
                                        </div>
                                    <!-- 表格 -->
                                    <div class="space10px"></div>
                                
                                </div>
                            </div>
            
            
                    </div>
            </div>
            
                    `
        }
        login.main.add(json4);
        $(".tabs-main",window.document).attr("url","./applicationForm.html")
        let kda = {};
        kda.add = `.tabs-main`;
        tabFunctions.setTabsFun(kda);
  
});



