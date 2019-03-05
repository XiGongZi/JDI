define([
    'require',
    "app/PKG_0.0.1",
    "jquery",
    "work/public/bodyFrame/c/main",
    // "../M/jsgrid",
    "app/jsgridConfig",
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
        TBF,
        login
    ) {
    'use strict';
           // add :".需要绑定的节点",
            // tabName :"页签ID(代码内标记)",
            // url :"url地址，可带参数",
            // tabName_CN :"页签名（展示出来的页签名）",
            let data = {
                add :".showAddNewCon",
                tabName :"addNewContract",
                url :"./addNewContract.html",
                tabName_CN :"添加新合同",
            }
            /**添加新页签事件 */
            TBF.bindAddNewTab(data);
            let data1 = {
                add :".showAddNewCon2",
                tabName :"addNewContract2",
                url :"./addNewContract.html",
                tabName_CN :"添加新合同2",
            }
            TBF.bindAddNewTab(data1);
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
        login.main.add(json4)
        $(".closeTabs").click(function(){
            /**关闭当前页签 */
            TBF.closeTab();
        });
        jsgrid("1");
     
});



