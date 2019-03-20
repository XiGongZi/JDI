define([
    'require',
    "app/PKG_0.0.1",
    "jquery",
    "work/public/bodyFrame/c/main",
    "app/clearOrMore",
    "app/tabsFunctions",
    "work/public/alert/c/main",
    "app/jsGridMethods",
    "app/changePage"
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
    ) {
    'use strict';
        // console.log(1);
           // add :".需要绑定的节点",
            // tabName :"页签ID(代码内标记)",
            // url :"url地址，可带参数",
            // tabName_CN :"页签名（展示出来的页签名）",
        let LFID = "T_pacttype";
        let tabName = "T_pacttype";
        let LFIDAndTabName = LFID + tabName;
        let urlGet =   `http://192.168.1.100:8080/stockWeb/pacttypeList`;
        let urlDelete = "http://192.168.1.100:8080/stockWeb/pacttypeDelete";
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
                dele.data= {fid:Id};
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
        }

        /**将当前表配置信息存入sessionStorage */
        let funName = parent.window.JGConfig;
        parent.window.JGConfig = funName || {};
        parent.window.JGConfig[LFIDAndTabName] = JGConfig;

        // 直接按配置请求
        JGM.getInfo(JGConfig);
        // let seesionInfoName = LFIDAndTabName + "JGConfig";
        // sessionStorage.removeItem(seesionInfoName);
        // sessionStorage.setItem(seesionInfoName,JSON.stringify(JGConfig));  
        // setTimeout(function(){
        //     let data = {
        //         page:"1",
        //         count:"6",
        //         urlGet,
        //     }
        //     CP.show(data);
        // },5000);
        /**给查询绑定事件 */
        TBF.getInfoInCase(searchJson);
});
