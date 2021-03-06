define([
    'require',
    "app/PKG_0.0.1",
    "jquery",
    "work/public/bodyFrame/c/main",
    "app/clearOrMore",
    "app/tabsFunctions",
    "work/public/alert/c/main",
    "app/jsGridMethods",
    "app/changePage",
    "app/ADCS",
], function( 
        require,
        PKG,
        $,
        bodyFrame,
        COM,
        TBF,
        login,
        JGM,
        CP,
        ADCS,
    ){
    'use strict';
    // $(".bodyFrame1-main>.title").css("cursor","pointer");
    // $(".bodyFrame1-main>.title").click(function(){
    //     window.location.reload();
    // });
    var originAdd = `http://192.168.1.100:80`;
    var originEnd = `.do`;
    // 获得页面名称
    switch (TPN) {
        case "Login":
            /** login */
            (function(){
                /*
                var check = document.querySelector("#checkBox .check");
                var check2 = document.querySelector("#checkBox .check_icon");
                var status = document.querySelector("#checkBox .check_icon");
                status.setAttribute("checked","false");

                check.onclick = function(){
                        var status = document.querySelector("#checkBox .check_icon");
                        status.setAttribute("checked","true");
                };
                check2.onclick = function(){
                        var status = document.querySelector("#checkBox .check_icon");
                        status.setAttribute("checked","false");
                };
                */
               $("#imgCode").attr("src",`${originAdd}/stockWeb/getLoginCode${originEnd}`);
               $(".submit").click(function(){
                    let data3 = {add:".loginBox"}
                    let json = TBF.getCase(data3);
                    let dd = PKG.judge.pickNull(json);
                    data3.body = dd;
                    if(TBF.searchTips(data3)){
                        // JGM.addInfo(JGConfig);
                        console.log(json)
                        $.ajax({
                            type : 'POST',
                            url :  `${originAdd}/stockWeb/login${originEnd}`,
                            data : json,
                            dataType : 'json',
                            success : function(result) {
                                if(result.resultFlag){
                                    alert("登录成功");
                                    window.location.href="index.html";
                                }else{
                                    $("#errorMsg").text(result.errorMsg);
                                }
                            }
                        });
                        /**这里获得填好的用户名和密码 */

                    }else{
                        alert("请填写完信息！");
                    };

                });
                 // 获取验证码
                 $("#imgCode").click(function() {
                    $("#imgCode").attr('src', changeUrl($("#imgCode").attr("src")));
                });
            })();
            //为了使每次生成图片不一致，即不让浏览器读缓存，所以需要加上时间戳   
            function changeUrl(url) {
                var timestamp = PKG.get.randomNum(1,30) + PKG.get.randomNum(30,60) + PKG.get.randomNum(15,45);
                // var timestamp = (new Date()).valueOf();
                // alert(url);
                var name = `getLoginCode${originEnd}`;
                url = url.split(name);
                console.log(url);
                var kd = url[0]+name;
                
                
                if ((url[1].indexOf("&") >= 0)) {
                    kd = kd + "×tamp=" + timestamp;   
                } else {
                    kd = kd + "?timestamp=" + timestamp;   
                }
                console.log(kd)
                return kd;
            }
        break;
        case "T_pacttype":
        /**合同类型 */
                (function(){
                    let LFID = "T_pacttype";
                    let tabName = "T_pacttype";
                    let LFIDAndTabName = LFID + tabName;
                    let urlGet =   `${originAdd}/stockWeb/pacttypeList${originEnd}`;
                    let urlDelete = `${originAdd}/stockWeb/pacttypeDelete${originEnd}`;
                    /**search事件 */
                    let searchJson = {
                        add:".bodyFrame1-main .search",
                        button:".showAddNewCon2",
                        LFID,
                        tabName,
                    };
                    /**添加新页签事件 */
                    let data = {
                        add :".showAddNewCon",
                        tabName :"T_pacttype_addNew",
                        url :"./T_pacttype_addNew.html",
                        tabName_CN :"添加",
                    }
                    TBF.bindAddNewTab(data);
                    // let data1 = {
                    //     add :".showAddNewCon2",
                    //     tabName :"addNewContract2",
                    //     url :"./addNewContract.html",
                    //     tabName_CN :"添加新合同2",
                    // }
                    // TBF.bindAddNewTab(data1);
                    let JGConfig = {};
                    JGConfig.data = {page:1};
                    JGConfig.LFID = LFID;
                    JGConfig.tabName = tabName;
                    JGConfig.url = urlGet ;
                    /** 表格头，必须设置PreName，值对应为后台传过来的数据属性名 此对象可设置的属性详情见 https://github.com/tabalinas/jsgrid */
                    JGConfig.fields = [
                        { name: "编码",PreName:"fnumber", type: "number", readOnly: true, width:70,},
                        { name: "名称",PreName:"fname", type: "text", readOnly: true, width:70,  },
                        {type: "control",width:70,}
                    ];
                    // let funName = parent.window.JGConfigFuns;
                    // parent.window.JGConfigFuns = funName || {};
                    //将方法存入window对象中
                    JGConfig.funs = function (){
                        $(".jsgrid-insert-button").off("click");
                        // 删
                        $(".jsgrid-delete-button").off("click");
                        $(".jsgrid-delete-button").click(function(){
                            var Id = $(this).parents("tr").find("td").eq(0).text();
                            console.log(Id)
                            let dele = {}
                            dele.data= {fnumber:Id};
                            dele.url = urlDelete;
                            let isDelete = confirm("确定删除？");
                            if(isDelete){
                                JGM.deleteInfo(dele);
                                window.location.reload();
                            }
                        });
                        // 改
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
                    
                                /**添加新页签事件 */
                            let data = {
                                add :".jsgrid-insert-mode-button",
                                tabName :"T_pacttype_addNew",
                                url :"./T_pacttype_addNew.html",
                                tabName_CN :"添加",
                            }
                            TBF.bindAddNewTab(data);



                            }
            

                    /**将当前表配置信息存入 */
                    let funName = parent.window.JGConfig;
                    parent.window.JGConfig = funName || {};
                    parent.window.JGConfig[LFIDAndTabName] = JGConfig;
    
                    // 直接按配置请求
                    JGM.getInfo(JGConfig);
                    /**给查询绑定事件 */
                    TBF.getInfoInCase(searchJson);
                })();  
            break;
/******************************************************************************** */  
        case "T_pacttype_addNew":
        /**新增合同类型 */
                (function(){
                    $(".closeTabs").click(function(){
                        /**刷新父下另一个框架iframe */
                                /**存 */
                        let JGConfig = {};
                        JGConfig.url = `${originAdd}/stockWeb/pacttypeAdd${originEnd}`;
                        // 去判断是否留空，留空则提醒，否则提交
                            // 获得数据
                            let LFID = "T_pacttype";
                            let data3 = {add:".bodyFrame1-main"}
                            let json = TBF.getCase(data3);
                            let dd = PKG.judge.pickNull(json);
                            data3.body = dd;
                            if(TBF.searchTips(data3)){
                                // JGM.addInfo(JGConfig);
                                JGConfig.data= json;
                                JGM.addInfo(JGConfig);
                                $(`#tabs .iframes>div[LFID="${LFID}"]>iframe[tabName="${LFID}"]`,parent.document)[0].contentWindow.location.reload();
                                TBF.closeTab();
                            }else{
                                alert("有未填字段！");
                            };
                        // JGM.addInfo(JGConfig);
                        /**关闭当前页签 */
                        // TBF.closeTab();
                    });
                })();
            break;
/******************************************************************************** */  
        case "T_supplyer":
                (function(){
                    let LFID = "T_supplyer";
                    let tabName = "T_supplyer";
                    let LFIDAndTabName = LFID + tabName;
                    let urlGet =   `${originAdd}/stockWeb/supplyerList${originEnd}`;
                    let urlDelete = `${originAdd}/stockWeb/supplyerDelete${originEnd}`;
                    /**search事件 */
                    let searchJson = {
                        add:".bodyFrame1-main .search",
                        button:".showAddNewCon2",
                        LFID,
                        tabName,
                    };
                    let data = {
                        add :".showAddNewCon",
                        tabName :"T_supplyer_addNew",
                        url :"./T_supplyer_addNew.html",
                        tabName_CN :"添加",
                    }
                    TBF.bindAddNewTab(data);
                    let JGConfig = {};
                    JGConfig.data = {};
                    JGConfig.LFID = LFID;
                    JGConfig.tabName = tabName;
                    JGConfig.url = urlGet ;
                    /** 表格头，必须设置PreName，值对应为后台传过来的数据属性名 此对象可设置的属性详情见 https://github.com/tabalinas/jsgrid */
                    JGConfig.fields = [
                        { name: "内码",PreName:"fitemid", type: "number", readOnly: true, width:70,},
                        { name: "编码",PreName:"fnumber", type: "text", readOnly: true, width:70,  },
                        { name: "类型",PreName:"ftype", type: "select", readOnly: true, width:70,  },
                        { name: "名称",PreName:"fname", type: "text", readOnly: true, width:70,  },
                        { name: "联系人",PreName:"frelax", type: "text", readOnly: true, width:70,  },
                        { name: "电话",PreName:"fphone", type: "number", readOnly: true, width:70,  },
                        { name: "备注",PreName:"fnote", type: "text", readOnly: true, width:70,  },
                        { name: "状态",PreName:"fstate", type: "select", readOnly: true, width:70,  },
                        {type: "control",width:70,}
                    ];
                    // let funName = parent.window.JGConfigFuns;
                    // parent.window.JGConfigFuns = funName || {};
                    //将方法存入window对象中
                    JGConfig.funs = function (){
                        $(".jsgrid-insert-button").off("click");
                        // 删
                        $(".jsgrid-delete-button").off("click");
                        $(".jsgrid-delete-button").click(function(){
                            var Id = $(this).parents("tr").find("td").eq(0).text();
                            console.log(Id)
                            let dele = {}
                            dele.data= {fitemid:Id};
                            dele.url = urlDelete;
                            let isDelete = confirm("确定删除？");
                            if(isDelete){
                                JGM.deleteInfo(dele);
                                window.location.reload();
                            }
                        });
                        // 改
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
                    
                                /**添加新页签事件 */
                            let data = {
                                add :".jsgrid-insert-mode-button",
                                tabName :"T_supplyer_addNew",
                                url :"./T_supplyer_addNew.html",
                                tabName_CN :"添加",
                            }
                            TBF.bindAddNewTab(data);

                            }
                            
                    let funName = parent.window.JGConfig;
                    parent.window.JGConfig = funName || {};
                    parent.window.JGConfig[LFIDAndTabName] = JGConfig;
                    // 直接按配置请求
                    JGM.getInfo(JGConfig);
                    /**给查询绑定事件 */
                    TBF.getInfoInCase(searchJson);
                })();
            break;
/******************************************************************************** */
        case "T_department":
                (function(){
                    let LFID = "T_department";
                    let tabName = "T_department";
                    let LFIDAndTabName = LFID + tabName;
                    let urlGet =   `${originAdd}/stockWeb/departmentList${originEnd}`;
                    let urlDelete = `${originAdd}/stockWeb/departmentDelete${originEnd}`;
                    /**search事件 */
                    let searchJson = {
                        add:".bodyFrame1-main .search",
                        button:".showAddNewCon2",
                        LFID,
                        tabName,
                    };
                    /**添加新页签事件 */
                    let data = {
                        add :".showAddNewCon",
                        tabName :"T_department_addDept",
                        url :"./T_department_addDept.html",
                        tabName_CN :"添加新部门",
                    }
                    TBF.bindAddNewTab(data);

                    // let data1 = {
                    //     add :".showAddNewCon2",
                    //     tabName :"addNewContract2",
                    //     url :"./addNewContract.html",
                    //     tabName_CN :"添加新合同2",
                    // }
                    // TBF.bindAddNewTab(data1);
                
                    let JGConfig = {};
                    JGConfig.data = {};
                    JGConfig.LFID = LFID;
                    JGConfig.tabName = tabName;
                    JGConfig.url = urlGet ;
                    /** 表格头，必须设置PreName，值对应为后台传过来的数据属性名 此对象可设置的属性详情见 https://github.com/tabalinas/jsgrid */
                    JGConfig.fields = [
                        { name: "编码",PreName:"fnumber", type: "number", readOnly: true, width:70,},
                        { name: "名称",PreName:"fname", type: "text", readOnly: true, width:70,  },
                        {type: "control",width:70,}
                    ];
                    // let funName = parent.window.JGConfigFuns;
                    // parent.window.JGConfigFuns = funName || {};
                    //将方法存入window对象中
                    JGConfig.funs = function (){
                        $(".jsgrid-insert-button").off("click");
                        // 删
                        $(".jsgrid-delete-button").off("click");
                        $(".jsgrid-delete-button").click(function(){
                            /**需要改的地方！！！！！ */
                            var Id = $(this).parents("tr").find("td").eq(0).text();
                            console.log(Id)
                            let dele = {}
                            /**需要改的地方！！！！！ */
                            dele.data= {fnumber:Id};
                            console.log(dele.data)
                            dele.url = urlDelete;
                            let isDelete = confirm("确定删除？");
                            if(isDelete){
                                console.log(dele)
                                JGM.deleteInfo(dele);
                                window.location.reload();
                            }
                        });
                        // 改
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
                    
                                /**添加新页签事件 */
                            let data = {
                                add :".jsgrid-insert-mode-button",
                                tabName :"T_department_addDept",
                                url :"./T_department_addDept.html",
                                tabName_CN :"添加新部门",
                            }
                            TBF.bindAddNewTab(data);

                            }


                    /**将当前表配置信息存入sessionStorage */
                    let funName = parent.window.JGConfig;
                    parent.window.JGConfig = funName || {};
                    parent.window.JGConfig[LFIDAndTabName] = JGConfig;

                    // 直接按配置请求
                    JGM.getInfo(JGConfig);
                    /**给查询绑定事件 */
                    // TBF.getInfoInCase(searchJson);
                })();
            break;
/******************************************************************************** */  
case "T_department_addDept":
        (function(){
            $(".closeTabs").click(function(){
                /**刷新父下另一个框架iframe */
                        /**存 */
                let JGConfig = {};
                JGConfig.url = `${originAdd}/stockWeb/departmentAdd${originEnd}`;
                // 去判断是否留空，留空则提醒，否则提交
                    // 获得数据
                    let LFID = "T_department";
                    let data3 = {add:".bodyFrame1-main"}
                    let json = TBF.getCase(data3);
                    let dd = PKG.judge.pickNull(json);
                    data3.body = dd;
                    if(TBF.searchTips(data3)){
                        // JGM.addInfo(JGConfig);
                        JGConfig.data= json;
                        JGM.addInfo(JGConfig);
                        $(`#tabs .iframes>div[LFID="${LFID}"]>iframe[tabName="${LFID}"]`,parent.document)[0].contentWindow.location.reload();
                        TBF.closeTab();
                    }else{
                        alert("有未填字段！");
                    };
    
                // JGM.addInfo(JGConfig);
                /**关闭当前页签 */
                // TBF.closeTab();
            });
        })();
    break;
/******************************************************************************** */   
case "T_item":
            (function(){
                let LFID = "T_item";
                let tabName = "T_item";
                let LFIDAndTabName = LFID + tabName;
                let urlGet =   `${originAdd}/stockWeb/itemList${originEnd}`;
                let urlDelete = `${originAdd}/stockWeb/itemDelete${originEnd}`;
                /**search事件 */
                let searchJson = {
                    add:".bodyFrame1-main .search",
                    button:".showAddNewCon2",
                    LFID,
                    tabName,
                };
                /**添加新页签事件 */
                let data = {
                    add :".showAddNewCon",
                    tabName :"T_item_addNew",
                    url :"./T_item_addNew.html",
                    tabName_CN :"添加",
                }
                TBF.bindAddNewTab(data);
                let JGConfig = {};
                JGConfig.data = {page:1};
                JGConfig.LFID = LFID;
                JGConfig.tabName = tabName;
                JGConfig.url = urlGet ;
                /** 表格头，必须设置PreName，值对应为后台传过来的数据属性名 此对象可设置的属性详情见 https://github.com/tabalinas/jsgrid */
                JGConfig.fields = [
                    { name: "内码",PreName:"fitemid", type: "number", readOnly: true, width:70,},
                    { name: "编码",PreName:"fnumber", type: "text", readOnly: true, width:70,  },
                    { name: "类型",PreName:"ftype", type: "text", readOnly: true, width:70,  },
                    { name: "名称",PreName:"fname", type: "text", readOnly: true, width:70,  },
                    { name: "规格",PreName:"fmodel", type: "text", readOnly: true, width:70,  },
                    { name: "单位",PreName:"funit", type: "text", readOnly: true, width:70,  },
                    { name: "备注",PreName:"fnote", type: "text", readOnly: true, width:70,  },
                    { name: "价格",PreName:"fprice", type: "number", readOnly: true, width:70,  },
                    {type: "control",width:70,}
                ];
                // let funName = parent.window.JGConfigFuns;
                // parent.window.JGConfigFuns = funName || {};
                //将方法存入window对象中
                JGConfig.funs = function (){
                    $(".jsgrid-insert-button").off("click");
                    // 删
                    $(".jsgrid-delete-button").off("click");
                    $(".jsgrid-delete-button").click(function(){
                        var Id = $(this).parents("tr").find("td").eq(0).text();
                        console.log(Id)
                        let dele = {}
                        dele.data= {fitemid:Id};
                        dele.url = urlDelete;
                        let isDelete = confirm("确定删除？");
                        if(isDelete){
                            JGM.deleteInfo(dele);
                            window.location.reload();
                        }
                    });
                    // 改
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

                                            /**添加新页签事件 */
                        let data = {
                            add :".jsgrid-insert-mode-button",
                            tabName :"T_item_addNew",
                            url :"./T_item_addNew.html",
                            tabName_CN :"添加",
                        }
                        TBF.bindAddNewTab(data);


                        
                }
                let funName = parent.window.JGConfig;
                parent.window.JGConfig = funName || {};
                parent.window.JGConfig[LFIDAndTabName] = JGConfig;
                // 直接按配置请求
                JGM.getInfo(JGConfig);
                /**给查询绑定事件 */
                TBF.getInfoInCase(searchJson);
            })();
    break;
/******************************************************************************** */   
case "T_projectteam":
            (function(){
                let LFID = "T_projectteam";
                let tabName = "T_projectteam";
                let LFIDAndTabName = LFID + tabName;
                let urlGet =   `${originAdd}/stockWeb/projectteamList${originEnd}`;
                let urlDelete = `${originAdd}/stockWeb/projectteamDelete${originEnd}`;
                /**search事件 */
                let searchJson = {
                    add:".bodyFrame1-main .search",
                    button:".showAddNewCon2",
                    LFID,
                    tabName,
                };
                /**添加新页签事件 */
                let data = {
                    add :".showAddNewCon",
                    tabName :"T_projectteam_addNew",
                    url :"./T_projectteam_addNew.html",
                    tabName_CN :"添加新部门",
                }
                TBF.bindAddNewTab(data);
        
                // let data1 = {
                //     add :".showAddNewCon2",
                //     tabName :"addNewContract2",
                //     url :"./addNewContract.html",
                //     tabName_CN :"添加新合同2",
                // }
                // TBF.bindAddNewTab(data1);
              
                let JGConfig = {};
                JGConfig.data = {page:1};
                JGConfig.LFID = LFID;
                JGConfig.tabName = tabName;
                JGConfig.url = urlGet ;
                /** 表格头，必须设置PreName，值对应为后台传过来的数据属性名 此对象可设置的属性详情见 https://github.com/tabalinas/jsgrid */
                JGConfig.fields = [
                    { name: "编码",PreName:"fnumber", type: "number", readOnly: true, width:70,},
                    { name: "部门",PreName:"fdepartment", type: "text", readOnly: true, width:70,  },
                    { name: "名称",PreName:"fname", type: "text", readOnly: true, width:70,  },
                    {type: "control",width:70,}
                ];
        
                // let funName = parent.window.JGConfigFuns;
                // parent.window.JGConfigFuns = funName || {};
                //将方法存入window对象中
                JGConfig.funs = function (){
                    $(".jsgrid-insert-button").off("click");
                    // 删
                    $(".jsgrid-delete-button").off("click");
                    $(".jsgrid-delete-button").click(function(){
                        var Id = $(this).parents("tr").find("td").eq(0).text();
                        console.log(Id)
                        let dele = {}
                        dele.data= {fnumber:Id};
                        dele.url = urlDelete;
                        let isDelete = confirm("确定删除？");
                        if(isDelete){
                            JGM.deleteInfo(dele);
                            window.location.reload();
                        }
                    });
                    // 改
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

                        /**添加新页签事件 */
                        let data = {
                            add :".jsgrid-insert-mode-button",
                            tabName :"T_projectteam_addNew",
                            url :"./T_projectteam_addNew.html",
                            tabName_CN :"添加新部门",
                        }
                        TBF.bindAddNewTab(data);
                }
        
                /**将当前表配置信息存入sessionStorage */
                let funName = parent.window.JGConfig;
                parent.window.JGConfig = funName || {};
                parent.window.JGConfig[LFIDAndTabName] = JGConfig;
        
                // 直接按配置请求
                JGM.getInfo(JGConfig);
                /**给查询绑定事件 */
                // TBF.getInfoInCase(searchJson);
            })();
break;
/******************************************************************************** */   
case "T_projectteam_addNew":
    (function(){
        $(".closeTabs").click(function(){
            /**刷新父下另一个框架iframe */
                    /**存 */
            let JGConfig = {};
            JGConfig.url = `${originAdd}/stockWeb/projectteamAdd${originEnd}`;
            // 去判断是否留空，留空则提醒，否则提交
                // 获得数据
                let LFID = "T_projectteam";
                let data3 = {add:".bodyFrame1-main"}
                let json = TBF.getCase(data3);
                let dd = PKG.judge.pickNull(json);
                data3.body = dd;
                if(TBF.searchTips(data3)){
                    // JGM.addInfo(JGConfig);
                    JGConfig.data= json;
                    console.log(json)
                    JGM.addInfo(JGConfig);
                    $(`#tabs .iframes>div[LFID="${LFID}"]>iframe[tabName="${LFID}"]`,parent.document)[0].contentWindow.location.reload();
                    TBF.closeTab();
                }else{
                    alert("有未填字段！");
                };
            // JGM.addInfo(JGConfig);
            /**关闭当前页签 */
            // TBF.closeTab();
        });

        /**请求部门 */
        let json31 = {
            url:`${originAdd}/stockWeb/departmentList${originEnd}`,
            fun:function(value){
                let str = "";
                $.each(value,function(i,n){
                    str +=`<option>${n.fname}</option>`;
                });
                $("select[field='fdepartment']").html(str);
            }
        }
        JGM.getInfo_return(json31);
    })();
break;
/******************************************************************************** */  
case "T_supplyer_addNew":
    (function(){
        $(".closeTabs").click(function(){
            /**刷新父下另一个框架iframe */
                    /**存 */
            let JGConfig = {};
            JGConfig.url = `${originAdd}/stockWeb/supplyerAdd${originEnd}`;
            // 去判断是否留空，留空则提醒，否则提交
                // 获得数据
                let LFID = "T_supplyer";
                let data3 = {add:".bodyFrame1-main"}
                let json = TBF.getCase(data3);
                let dd = PKG.judge.pickNull(json);
                data3.body = dd;
                if(TBF.searchTips(data3)){
                    // JGM.addInfo(JGConfig);
                    JGConfig.data= json;
                    console.log(json)
                    JGM.addInfo(JGConfig);
                    $(`#tabs .iframes>div[LFID="${LFID}"]>iframe[tabName="${LFID}"]`,parent.document)[0].contentWindow.location.reload();
                    TBF.closeTab();
                }else{
                    alert("有未填字段！");
                };
            // JGM.addInfo(JGConfig);
            /**关闭当前页签 */
            // TBF.closeTab();
        });
        
    })();
break;
/******************************************************************************** */  
case "T_item_addNew":
(function(){
    $(".closeTabs").click(function(){
        /**刷新父下另一个框架iframe */
                /**存 */
        let JGConfig = {};
        JGConfig.url = `${originAdd}/stockWeb/itemAdd${originEnd}`;
        // 去判断是否留空，留空则提醒，否则提交
            // 获得数据
            let LFID = "T_item";
            let data3 = {add:".bodyFrame1-main"}
            let json = TBF.getCase(data3);
            let dd = PKG.judge.pickNull(json);
            data3.body = dd;
            if(TBF.searchTips(data3)){
                // JGM.addInfo(JGConfig);
                JGConfig.data= json;
                JGM.addInfo(JGConfig);
                $(`#tabs .iframes>div[LFID="${LFID}"]>iframe[tabName="${LFID}"]`,parent.document)[0].contentWindow.location.reload();
                TBF.closeTab();
            }else{
                alert("有未填字段！");
            };
        // JGM.addInfo(JGConfig);
        /**关闭当前页签 */
        // TBF.closeTab();
    });
    
})();
break;

/******************************************************************************** */  
case "spact":
        (function(){
            /**大页 */
            let LFID = "spact";
            /**小页 */
            let tabName = "spact";
            /**是否有分页 */
            let hasFYP = true;
            /**修改时需要的关键词 */
            let change_key = `fid`;
            /**修改时需要的关键词所在的index */
            let change_keyIdex = `0`;
            let JGConfig = {};
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
            let mainData = {JGConfig,tabName, LFID, originAdd,originEnd,change_key,hasFYP,change_keyIdex, }
            ADCS.SD(mainData);
    })();
break;
/******************************************************************************** */  
case `spact_changeNew`:
    (function(){
        let LFID = "spact";
        let mainData = {LFID,originAdd,originEnd,}
        ADCS.change(mainData);
    })();
break;
/******************************************************************************** */  
case "spact_addNew":
(function(){
    let LFID = "spact";
    let data = { LFID,originAdd, originEnd,};
    ADCS.add(data);
})();
break;
/******************************************************************************** */  
case "ssubpact":
    (function(){
            /**大页 */
            let LFID = "ssubpact";
            /**小页 */
            let tabName = "ssubpact";
            /**是否有分页 */
            let hasFYP = true;
            /**修改时需要的关键词 */
            let change_key = `fid`;
            /**修改时需要的关键词所在的index */
            let change_keyIdex = `0`;
            let JGConfig = {};
            JGConfig.fields = [
                { name: "id",PreName:"fid", type: "number", readOnly: true, width:10,},
                // { name: "日期",PreName:"fdate", type: "number", readOnly: true, width:30,  },
                { name: "分包合同号",PreName:"fsubpactno", type: "text", width:50,  },
                { name: "总包合同号",PreName:"fpactid", type: "text", width:50,  },
                { name: "项目名称",PreName:"fpeojectname", type: "text", width:50,  },
                { name: "制单人",PreName:"fcreater", type: "text", width:60,  },
                // { name: "制单时间",PreName:"fcreatetime", type: "text", width:30,  },
                // { name: "项客商ID",PreName:"fitemid", type: "text", width:50,  },
                { name: "客商名称",PreName:"fitemname", type: "text", width:30,  },
                { name: "合同额",PreName:"famount", type: "text", width:30,  },
                { name: "税率",PreName:"ftax", type: "text", width:30,  },
                { name: "客商负责人",PreName:"fmanager", type: "text", width:30,  },
                { name: "负责人电话",PreName:"fphone", type: "text", width:30,  },
                { name: "状态",PreName:"fstate", type: "text", width:30,  },
                { name: "附件",PreName:"ffile", type: "text", width:30,  },
                {type: "control",width:50,}
            ];
            let mainData = {JGConfig,tabName, LFID, originAdd,originEnd,change_key,hasFYP,change_keyIdex, }
            ADCS.SD(mainData);
    })();
break;
/******************************************************************************** */  
case "ssubpact_changeNew":
    (function(){
        let LFID = "ssubpact";
        let mainData = {LFID,originAdd,originEnd,}
        ADCS.change(mainData);
    })();
break;
/******************************************************************************** */  
case "ssubpact_addNew":
    (function(){
        let LFID = "ssubpact";
        let mainData = {LFID,originAdd,originEnd,}
        ADCS.add(mainData);
    })();
break;
/******************************************************************************** */  

case "sbudget":
    (function(){
            /**大页 */
            let LFID = "sbudget";
            /**小页 */
            let tabName = "sbudget";
            /**是否有分页 */
            let hasFYP = true;
            /**修改时需要的关键词 */
            let change_key = `fid`;
            /**修改时需要的关键词所在的index */
            let change_keyIdex = `0`;
            let JGConfig = {};
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
            let mainData = {JGConfig,tabName, LFID, originAdd,originEnd,change_key,hasFYP,change_keyIdex, }
            ADCS.SD(mainData);
    })();
break;
/******************************************************************************** */  
case "sbudget_changeNew":
    (function(){
        let LFID = "sbudget";
        let mainData = {LFID,originAdd,originEnd,}
        ADCS.change(mainData);
    })();
break;
/******************************************************************************** */  
case "sbudget_addNew":
    (function(){
        let LFID = "sbudget";
        let mainData = {LFID,originAdd,originEnd,}
        ADCS.add(mainData);
    })();
break;
/******************************************************************************** */  

/**预算详情单 */


case "sbudgetentry":
    (function(){
            /**大页 */
            let LFID = "sbudgetentry";
            /**小页 */
            let tabName = "sbudgetentry";
            /**是否有分页 */
            let hasFYP = true;
            /**修改时需要的关键词 */
            let change_key = `fid`;
            /**修改时需要的关键词所在的index */
            let change_keyIdex = `0`;
            let JGConfig = {};
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
            let mainData = {JGConfig,tabName, LFID, originAdd,originEnd,change_key,hasFYP,change_keyIdex, }
            ADCS.SD(mainData);
    })();
break;
/******************************************************************************** */  
case "sbudgetentry_changeNew":
    (function(){
        let LFID = "sbudgetentry";
        let mainData = {LFID,originAdd,originEnd,}
        ADCS.change(mainData);
    })();
break;
/******************************************************************************** */  
case "sbudgetentry_addNew":
    (function(){
        let LFID = "sbudgetentry";
        let mainData = {LFID,originAdd,originEnd,}
        ADCS.add(mainData);
    })();
break;
/******************************************************************************** */  

/**项目计量单 */
/******************************************************************************** */  
case "sincome":
        (function(){
            /**大页 */
            let LFID = "sincome";
            /**小页 */
            let tabName = "sincome";
            /**是否有分页 */
            let hasFYP = true;
            /**修改时需要的关键词 */
            let change_key = `fid`;
            /**修改时需要的关键词所在的index */
            let change_keyIdex = `0`;
            let JGConfig = {};
            JGConfig.fields = [
                { name: "计量单号", PreName:"fid",type: "text", readOnly: true, width:50,  },
                { name: "总包合同号",  PreName:"fpactid",type: "text", width:100,  },
                { name: "项目名称",  PreName:"fpeojectname",type: "text", width:100,  },
                { name: "制单人",  PreName:"fcreater",type: "text", width:60,  },
                { name: "制单时间",  PreName:"fcreatetime",type: "text", width:30,  },
                { name: "金额",  PreName:"famount",type: "text", width:100,  },
                { name: "备注",  PreName:"fnote",type: "text", width:100,  },
            ];
            let mainData = {JGConfig,tabName, LFID, originAdd,originEnd,change_key,hasFYP,change_keyIdex, }
            ADCS.SD(mainData);
    })();
break;
/******************************************************************************** */  
case `sincome_changeNew`:
    (function(){
        let LFID = "sincome";
        let mainData = {LFID,originAdd,originEnd,}
        ADCS.change(mainData);
    })();
break;
/******************************************************************************** */  
case "sincome_addNew":
(function(){
    let LFID = "sincome";
    let data = { LFID,originAdd, originEnd,};
    ADCS.add(data);
})();
break;
/******************************************************************************** */  

/**成本确认单 */
/******************************************************************************** */  
case "scost":
        (function(){
            /**大页 */
            let LFID = "scost";
            /**小页 */
            let tabName = "scost";
            /**是否有分页 */
            let hasFYP = true;
            /**修改时需要的关键词 */
            let change_key = `fid`;
            /**修改时需要的关键词所在的index */
            let change_keyIdex = `0`;
            let JGConfig = {};
            JGConfig.fields = [
                { name: "成本确认单号", PreName:"fid",type: "number", readOnly: true, width:100,  },
                { name: "部门",PreName:"fdepartment", type: "text", width:100,  },
                { name: "类型",PreName:"ftype", type: "text", width:100,  },
                { name: "总包合同号",PreName:"fpactid", type: "text", width:100,  },
                { name: "项目名称",PreName:"fpeojectname", type: "text", width:100,  },
                { name: "分包/采购合同号",PreName:"fsubpactid", type: "text", width:100,  },
                { name: "客商名称",PreName:"Fitemid", type: "text", width:100,  },
                { name: "制单人", PreName:"fcreater",type: "text", width:30,  },
                { name: "金额", PreName:"famount",type: "text", width:100,  },
                { name: "税率", PreName:"ftax",type: "text", width:30,  },
                { name: "备注", PreName:"fnote",type: "text", width:60,  },
                {type: "control",width:70,}
            ];
            let mainData = {JGConfig,tabName, LFID, originAdd,originEnd,change_key,hasFYP,change_keyIdex, }
            ADCS.SD(mainData);
    })();
break;
/******************************************************************************** */  
case `scost_changeNew`:
    (function(){
        let LFID = "scost";
        let mainData = {LFID,originAdd,originEnd,}
        ADCS.change(mainData);
    })();
break;
/******************************************************************************** */  
case "scost_addNew":
(function(){
    let LFID = "scost";
    let data = { LFID,originAdd, originEnd,};
    ADCS.add(data);
})();
break;
/******************************************************************************** */  


/**支出确认单 */
/******************************************************************************** */  
case "spay":
        (function(){
            /**大页 */
            let LFID = "spay";
            /**小页 */
            let tabName = "spay";
            /**是否有分页 */
            let hasFYP = true;
            /**修改时需要的关键词 */
            let change_key = `fid`;
            /**修改时需要的关键词所在的index */
            let change_keyIdex = `0`;
            let JGConfig = {};
            JGConfig.fields = [
                { name: "确认单号", PreName:"fid",type: "number", readOnly: true, width:100,  },
                { name: "部门",PreName:"fdepartment", type: "text", width:100,  },
                { name: "类型",PreName:"ftype", type: "text", width:100,  },
                { name: "总包合同号",PreName:"fpactid", type: "text", width:100,  },
                { name: "项目名称",PreName:"fpeojectname", type: "text", width:100,  },
                { name: "分包/采购合同号",PreName:"fsubpactid", type: "text", width:100,  },
                { name: "客商名称",PreName:"Fitemid", type: "text", width:100,  },
                { name: "制单人", PreName:"fcreater",type: "text", width:30,  },
                { name: "金额", PreName:"famount",type: "text", width:100,  },
                { name: "税率", PreName:"ftax",type: "text", width:30,  },
                { name: "备注", PreName:"fnote",type: "text", width:60,  },
                {type: "control",width:70,}
            ];
            let mainData = {JGConfig,tabName, LFID, originAdd,originEnd,change_key,hasFYP,change_keyIdex, }
            ADCS.SD(mainData);
    })();
break;
/******************************************************************************** */  
case `spay_changeNew`:
    (function(){
        let LFID = "spay";
        let mainData = {LFID,originAdd,originEnd,}
        ADCS.change(mainData);
    })();
break;
/******************************************************************************** */  
case "spay_addNew":
(function(){
    let LFID = "spay";
    let data = { LFID,originAdd, originEnd,};
    ADCS.add(data);
})();
break;
/******************************************************************************** */  


/**合同额追加单 */
/******************************************************************************** */  
case "saddamount":
        (function(){
            /**大页 */
            let LFID = "saddamount";
            /**小页 */
            let tabName = "saddamount";
            /**是否有分页 */
            let hasFYP = true;
            /**修改时需要的关键词 */
            let change_key = `fid`;
            /**修改时需要的关键词所在的index */
            let change_keyIdex = `0`;
            let JGConfig = {};
            JGConfig.fields = [
                { name: "追加单号", PreName:"fid",type: "number", readOnly: true, width:100,  },
                { name: "追加单类型", PreName:"ftype",type: "text", width:100,  },
                { name: "总包/分包合同号",PreName:"fpactid", type: "text", width:100,  },
                { name: "项目名称",PreName:"fpeojectname", type: "text", width:100,  },
                { name: "客商名称",PreName:"Fitemid", type: "text", width:100,  },
                { name: "制单人", PreName:"fcreater",type: "text", width:30,  },
                { name: "金额", PreName:"famount",type: "text", width:100,  },
                { name: "备注", PreName:"fnote",type: "text", width:60,  },
                {type: "control",width:70,}
            ];
            let mainData = {JGConfig,tabName, LFID, originAdd,originEnd,change_key,hasFYP,change_keyIdex, }
            ADCS.SD(mainData);
    })();
break;
/******************************************************************************** */  
case `saddamount_changeNew`:
    (function(){
        let LFID = "saddamount";
        let mainData = {LFID,originAdd,originEnd,}
        ADCS.change(mainData);
    })();
break;
/******************************************************************************** */  
case "saddamount_addNew":
(function(){
    let LFID = "saddamount";
    let data = { LFID,originAdd, originEnd,};
    ADCS.add(data);
})();
break;
/******************************************************************************** */  


/**采购合同单 */
/******************************************************************************** */  
case "spurchasepact":
        (function(){
            /**大页 */
            let LFID = "spurchasepact";
            /**小页 */
            let tabName = "spurchasepact";
            /**是否有分页 */
            let hasFYP = true;
            /**修改时需要的关键词 */
            let change_key = `fid`;
            /**修改时需要的关键词所在的index */
            let change_keyIdex = `0`;
            let JGConfig = {};
            JGConfig.fields = [
                { name: "主键", PreName:"fid",type: "number", readOnly: true, width:100,  },
                { name: "分包合同号",PreName:"fsubpactno", type: "text", width:100,  },
                { name: "总包合同号",PreName:"fpactid", type: "text", width:100,  },
                { name: "项目名称",PreName:"fpeojectname", type: "text", width:100,  },
                { name: "制单人", PreName:"fcreater",type: "text", width:30,  },
                { name: "客商ID",PreName:"fitemid", type: "text", width:100,  },
                { name: "客商名称",PreName:"fitemname", type: "text", width:100,  },
                { name: "合同额", PreName:"famount",type: "text", width:100,  },
                { name: "税率", PreName:"ftax",type: "text", width:100,  },
                { name: "客商负责人", PreName:"fmanager",type: "text", width:100,  },
                { name: "负责人电话", PreName:"fphone",type: "text", width:100,  },
                { name: "状态", PreName:"fstate",type: "text", width:100,  },
                { name: "附件", PreName:"ffile",type: "text", width:60,  },
                {type: "control",width:70,}
            ];
            let mainData = {JGConfig,tabName, LFID, originAdd,originEnd,change_key,hasFYP,change_keyIdex, }
            ADCS.SD(mainData);
    })();
break;
/******************************************************************************** */  
case `spurchasepact_changeNew`:
    (function(){
        let LFID = "spurchasepact";
        let mainData = {LFID,originAdd,originEnd,}
        ADCS.change(mainData);
    })();
break;
/******************************************************************************** */  
case "spurchasepact_addNew":
(function(){
    let LFID = "spurchasepact";
    let data = { LFID,originAdd, originEnd,};
    ADCS.add(data);
})();
break;
/******************************************************************************** */ 


/**合同明细信息 */
/******************************************************************************** */  
case "spurchasepactentry":
        (function(){
            /**大页 */
            let LFID = "spurchasepactentry";
            /**小页 */
            let tabName = "spurchasepactentry";
            /**是否有分页 */
            let hasFYP = true;
            /**修改时需要的关键词 */
            let change_key = `fid`;
            /**修改时需要的关键词所在的index */
            let change_keyIdex = `0`;
            let JGConfig = {};
            JGConfig.fields = [
                { name: "合同单号", PreName:"fid",type: "number", readOnly: true, width:100,  },
                { name: "总包合同号",PreName:"fpactid", type: "text", width:100,  },
                { name: "项目名称",PreName:"fpeojectname", type: "text", width:100,  },
                { name: "申请单号",PreName:"fapplyid", type: "text", width:100,  },
                { name: "申请单序号",PreName:"fapplyentryid", type: "text", width:100,  },
                { name: "序号",PreName:"fentryid", type: "text", width:100,  },
                { name: "产品/设备名称", PreName:"fitemid",type: "text", width:30,  },
                { name: "申请数量",PreName:"fapplyqty", type: "text", width:100,  },
                { name: "数量",PreName:"fqty", type: "text", width:100,  },
                { name: "单位", PreName:"funitid",type: "text", width:100,  },
                { name: "单价", PreName:"fprice",type: "text", width:100,  },
                { name: "金额", PreName:"famount",type: "text", width:100,  },
                { name: "备注", PreName:"fnote",type: "text", width:100,  },
                {type: "control",width:70,}
            ];
            let mainData = {JGConfig,tabName, LFID, originAdd,originEnd,change_key,hasFYP,change_keyIdex, }
            ADCS.SD(mainData);
    })();
break;
/******************************************************************************** */  
case `spurchasepactentry_changeNew`:
    (function(){
        let LFID = "spurchasepactentry";
        let mainData = {LFID,originAdd,originEnd,}
        ADCS.change(mainData);
    })();
break;
/******************************************************************************** */  
case "spurchasepactentry_addNew":
(function(){
    let LFID = "spurchasepactentry";
    let data = { LFID,originAdd, originEnd,};
    ADCS.add(data);
})();
break;
/******************************************************************************** */ 


/**报销单 */
/******************************************************************************** */  
case "sreimbursement":
        (function(){
            /**大页 */
            let LFID = "sreimbursement";
            /**小页 */
            let tabName = "sreimbursement";
            /**是否有分页 */
            let hasFYP = true;
            /**修改时需要的关键词 */
            let change_key = `fid`;
            /**修改时需要的关键词所在的index */
            let change_keyIdex = `0`;
            let JGConfig = {};
            JGConfig.fields = [
                { name: "报销单号", PreName:"fid",type: "number", readOnly: true, width:100,  },
                { name: "类型",PreName:"ftype", type: "text", width:100,  },
                { name: "金额",PreName:"famout", type: "text", width:100,  },
                { name: "客商名称",PreName:"fitemid", type: "text", width:100,  },
                { name: "报销人",PreName:"fpayer", type: "text", width:100,  },
                { name: "制单人",PreName:"fcreater", type: "text", width:100,  },
                { name: "备注", PreName:"fnote",type: "text", width:100,  },
                {type: "control",width:70,}
            ];
            let mainData = {JGConfig,tabName, LFID, originAdd,originEnd,change_key,hasFYP,change_keyIdex, }
            ADCS.SD(mainData);
    })();
break;
/******************************************************************************** */  
case `sreimbursement_changeNew`:
    (function(){
        let LFID = "sreimbursement";
        let mainData = {LFID,originAdd,originEnd,}
        ADCS.change(mainData);
    })();
break;
/******************************************************************************** */  
case "sreimbursement_addNew":
(function(){
    let LFID = "sreimbursement";
    let data = { LFID,originAdd, originEnd,};
    ADCS.add(data);
})();
break;
/******************************************************************************** */ 


/**报销单明细信息 */
/******************************************************************************** */  
case "Sreimbursemententry":
        (function(){
            /**大页 */
            let LFID = "Sreimbursemententry";
            /**小页 */
            let tabName = "Sreimbursemententry";
            /**是否有分页 */
            let hasFYP = true;
            /**修改时需要的关键词 */
            let change_key = `fid`;
            /**修改时需要的关键词所在的index */
            let change_keyIdex = `0`;
            let JGConfig = {};
            JGConfig.fields = [
                { name: "报销单号", PreName:"fid",type: "number", readOnly: true, width:100,  },
                { name: "总包合同号",PreName:"fpactid", type: "text", width:100,  },
                { name: "采购合同号",PreName:"fpurchase", type: "text", width:100,  },
                { name: "项目名称",PreName:"fprojectname", type: "text", width:100,  },
                { name: "客商名称",PreName:"fitemid", type: "text", width:100,  },
                { name: "金额",PreName:"famount", type: "text", width:100,  },
                { name: "备注", PreName:"fnote",type: "text", width:100,  },
                {type: "control",width:70,}
            ];
            let mainData = {JGConfig,tabName, LFID, originAdd,originEnd,change_key,hasFYP,change_keyIdex, }
            ADCS.SD(mainData);
    })();
break;
/******************************************************************************** */  
case `Sreimbursemententry_changeNew`:
    (function(){
        let LFID = "Sreimbursemententry";
        let mainData = {LFID,originAdd,originEnd,}
        ADCS.change(mainData);
    })();
break;
/******************************************************************************** */  
case "Sreimbursemententry_addNew":
(function(){
    let LFID = "Sreimbursemententry";
    let data = { LFID,originAdd, originEnd,};
    ADCS.add(data);
})();
break;
/******************************************************************************** */ 

/**物资采购申请单 */
/******************************************************************************** */  
case "spurchaseapply":
        (function(){
            /**大页 */
            let LFID = "spurchaseapply";
            /**小页 */
            let tabName = "spurchaseapply";
            /**是否有分页 */
            let hasFYP = true;
            /**修改时需要的关键词 */
            let change_key = `fid`;
            /**修改时需要的关键词所在的index */
            let change_keyIdex = `0`;
            let JGConfig = {};
            JGConfig.fields = [
                { name: "申请单号", PreName:"fid",type: "number", readOnly: true, width:100,  },
                { name: "部门",PreName:"fdepertmentid", type: "text", width:100,  },
                { name: "项目部",PreName:"fpeojectdepartment", type: "text", width:100,  },
                { name: "总包合同号",PreName:"fpactid", type: "text", width:100,  },
                { name: "项目名称",PreName:"fprojectname", type: "text", width:100,  },
                { name: "类型",PreName:"ftype", type: "text", width:100,  },
                { name: "制单人",PreName:"fcreater", type: "text", width:100,  },
                { name: "备注", PreName:"fnote",type: "text", width:100,  },
                { name: "状态",PreName:"fstate", type: "text", width:100,  },
                {type: "control",width:70,}
            ];
            let mainData = {JGConfig,tabName, LFID, originAdd,originEnd,change_key,hasFYP,change_keyIdex, }
            ADCS.SD(mainData);
    })();
break;
/******************************************************************************** */  
case `spurchaseapply_changeNew`:
    (function(){
        let LFID = "spurchaseapply";
        let mainData = {LFID,originAdd,originEnd,}
        ADCS.change(mainData);
    })();
break;
/******************************************************************************** */  
case "spurchaseapply_addNew":
(function(){
    let LFID = "spurchaseapply";
    let data = { LFID,originAdd, originEnd,};
    ADCS.add(data);
})();
break;
/******************************************************************************** */ 


/**物资采购申请单  明细信息 */
/******************************************************************************** */  
case "spurchaseapplyentry":
        (function(){
            /**大页 */
            let LFID = "spurchaseapplyentry";
            /**小页 */
            let tabName = "spurchaseapplyentry";
            /**是否有分页 */
            let hasFYP = true;
            /**修改时需要的关键词 */
            let change_key = `fid`;
            /**修改时需要的关键词所在的index */
            let change_keyIdex = `0`;
            let JGConfig = {};
            JGConfig.fields = [
                { name: "申请单号",PreName:"fapplyid", type: "text", width:100,  },
                { name: "序号",PreName:"fentryid", type: "text", width:100,  },
                { name: "产品/设备名称", PreName:"fitemid",type: "text", width:30,  },
                { name: "规格", PreName:"fmodel",type: "text", width:30,  },
                { name: "申请数量",PreName:"fqty", type: "text", width:100,  },
                { name: "单位", PreName:"funit",type: "text", width:100,  },
                { name: "单价", PreName:"fprice",type: "text", width:100,  },
                { name: "金额", PreName:"famount",type: "text", width:100,  },
                { name: "备注", PreName:"fnote",type: "text", width:100,  },
                {type: "control",width:70,}
            ];
            let mainData = {JGConfig,tabName, LFID, originAdd,originEnd,change_key,hasFYP,change_keyIdex, }
            ADCS.SD(mainData);
    })();
break;
/******************************************************************************** */  
case `spurchaseapplyentry_changeNew`:
    (function(){
        let LFID = "spurchaseapplyentry";
        let mainData = {LFID,originAdd,originEnd,}
        ADCS.change(mainData);
    })();
break;
/******************************************************************************** */  
case "spurchaseapplyentry_addNew":
(function(){
    let LFID = "spurchaseapplyentry";
    let data = { LFID,originAdd, originEnd,};
    ADCS.add(data);
})();
break;
/******************************************************************************** */ 


default:
break;
    }
    

});
