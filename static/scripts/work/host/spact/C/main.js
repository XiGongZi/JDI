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
        // console.log(1);
           // add :".需要绑定的节点",
            // tabName :"页签ID(代码内标记)",
            // url :"url地址，可带参数",
            // tabName_CN :"页签名（展示出来的页签名）",
            let data = {
                add :".showAddNewCon",
                tabName :"spact_addContract",
                url :"./spact_addContract.html",
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
            /**刷新父下另一个框架iframe */
            $(`#tabs .iframes>div[LFID="spact"]>iframe[tabName="spact"]`,parent.document)[0].contentWindow.location.reload();
            /**关闭当前页签 */
            TBF.closeTab();
        });
      

        let JGConfig = {};
        JGConfig.data = {page:1};
        JGConfig.url = "http://192.168.1.100/stockWeb/spactList";
        /** 表格头，必须设置PreName，值对应为后台传过来的数据属性名 此对象可设置的属性详情见 https://github.com/tabalinas/jsgrid */
        JGConfig.fields = [
            { name: "id",PreName:"fid", type: "number", readOnly: true, width:10,},
            { name: "合同编号",PreName:"fno", type: "number", readOnly: true, width:70,  },
            { name: "项目名称",PreName:"fpeojectname", type: "text", width:100,  },
            { name: "项目地址",PreName:"faddress", type: "text", width:100,  },
            { name: "甲方名称",PreName:"funitname", type: "text", width:100,  },
            { name: "合同额",PreName:"fmoney", type: "text", width:60,  },
            { name: "税率",PreName:"ftax", type: "text", width:30,  },
            { name: "项目负责人",PreName:"fmanager", type: "text", width:50,  },
            { name: "状态",PreName:"fstate", type: "text", width:30,  },
            {type: "control",width:70,}
        ];
        
        //自定义 绑定事件(非原生)
        JGConfig.fun = function (){
            $(".jsgrid-insert-button").off("click");
            // 删
            $(".jsgrid-delete-button").off("click");
            $(".jsgrid-delete-button").click(function(){
                var Id = $(this).parents("tr").find("td").eq(0).text();
                console.log(Id)
                let dele = {}
                dele.data= {fid:Id};
                dele.url = "http://192.168.1.100/stockWeb/spactDelete";
                let isDelete = confirm("确定删除？");
                if(isDelete){
                    JGM.deleteInfo(dele);
                    window.location.reload();
                }
            });
            //改
            $(".jsgrid-edit-button").click(function(){
                // //获取id
                var a =  $(this).parents("tr").find("td").eq(0).text();
                // window.location.href = ctx +"/managerSave.jsp?managerId="+a;
                // managerSave.html
            });
            $(".jsgrid-insert-mode-button").off("click");
            $(".jsgrid-insert-mode-button").on("click",function(){
                // window.location.href = ctx +"/managerSave.jsp";
            });
            if ( $("#jsGrid").html() != null ){
                //调分页的高度
                var zhi1 = $("#jsGrid").offset().top;
                var zhi2 = $("#jsGrid").height();
                var zhi3 = zhi1 + zhi2 - 60;
                // console.log(zhi3);
                $("#changePage").css("top",zhi3);
            }
        }
        JGM.getInfo(JGConfig);
});
