define([
    'require',
    "app/tabsFunctions",
    "app/PKG_0.0.1",
    "app/jsGridMethods",
    "app/changePage",
], function(
    require,
    TBF,
    PKG,
    JGM,
    CP,
    
    ) {
    'use strict';
    
    let fun = {
        add:function(data_A){
            let LFID = data_A.LFID;
            let originAdd = data_A.originAdd;
            let originEnd = data_A.originEnd;
            $(".closeTabs").click(function(){
                /**刷新父下另一个框架iframe */
                        /**存 */
                let JGConfig = {};
                JGConfig.url = `${originAdd}/stockWeb/${LFID}Add${originEnd}`;
                // 去判断是否留空，留空则提醒，否则提交
                    // 获得数据
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
            });
        },
        change:function(data_C){
            let LFID = data_C.LFID;
            let originAdd = data_C.originAdd;
            let originEnd = data_C.originEnd;

            let LFIDAndTabName_changeInfo = LFID + LFID;
            let data = parent.window.changeInfo[LFIDAndTabName_changeInfo];
            console.log("----------")
            console.log("----------")
            console.log("----------")
            let field = data.field;
            let fieldVal = data.fieldVal;
            let fieldName = LFID + "Data";
            let fData = {}
            fData[field] = fieldVal;
            let json = {
                field:fieldName,
                url:data.getUrl,
                data:fData,
            }
            JGM.getInfo_insertInput(json);

            $(".closeTabs").click(function(){
                /**刷新父下另一个框架iframe */
                        /**存 */
                let JGConfig = {};
                JGConfig.url = `${originAdd}/stockWeb/${LFID}Update${originEnd}`;
                // 去判断是否留空，留空则提醒，否则提交
                    // 获得数据
                    let data3 = {add:".bodyFrame1-main "}
                    let json = TBF.getCase(data3);
                    let dd = PKG.judge.pickNull(json);
                    data3.body = dd;
                    if(TBF.searchTips(data3)){
                        // JGM.addInfo(JGConfig);
                        json[field] = fieldVal;
                        JGConfig.data= json;
                        JGM.updateInfo(JGConfig);
                        $(`#tabs .iframes>div[LFID="${LFID}"]>iframe[tabName="${LFID}"]`,parent.document)[0].contentWindow.location.reload();
                        TBF.closeTab();
                    }else{
                        alert("有未填字段！");
                    };
            });
        },
        SD:function(data_SD){
            let LFID = data_SD.LFID;
            let tabName = data_SD.tabName;
            let JGConfig = data_SD.JGConfig;
            let originAdd = data_SD.originAdd;
            let originEnd = data_SD.originEnd;
            let change_key = data_SD.change_key;
            let change_keyIdex = data_SD.change_keyIdex;
            let hasFYP = data_SD.hasFYP; 
            /**上是从data_SD中获取的值，下是生成的值 */
            let LFIDAndTabName = LFID + tabName;
            var urlGet = `${originAdd}/stockWeb/${LFID}List${originEnd}`;
            var urlDelete = `${originAdd}/stockWeb/${LFID}Delete${originEnd}`;
            /**search事件 */
            let searchJson = {
                add:".bodyFrame1-main .search",
                button:".showAddNewCon2",
                LFID,
                tabName,
            };
            let data = {
                add :".showAddNewCon",
                tabName :`${LFID}_addNew`,
                url :`./${LFID}_addNew.html`,
                tabName_CN :"添加",
            }
            /**添加新页签事件 */
            TBF.bindAddNewTab(data);
            JGConfig.data = {page:1};
            JGConfig.LFID = LFID;
            JGConfig.tabName = tabName;
            JGConfig.url = urlGet ;
            JGConfig.funs = function (){
                $(".jsgrid-insert-button").off("click");
                // 删
                $(".jsgrid-delete-button").off("click");
                $(".jsgrid-delete-button").click(function(){
                    var Id = $(this).parents("tr").find("td").eq(change_keyIdex).text();
                    let dele = {}
                    //**!!!!!!!!!!!!         这里很重要，需要修改删除的时候传的值 位数,如fid为0         !!!!!!!!!!!!!!!! */
                    dele.data= {};
                    dele.data[change_key] = Id;
                    dele.url = urlDelete;
                    let isDelete = confirm("确定删除？");
                    if(isDelete){
                        JGM.deleteInfo(dele);
                        window.location.reload();
                    }
                });
                if ( $("#jsGrid").html() != null ){
                    //调分页的高度
                    var zhi1 = $("#jsGrid").offset().top;
                    var zhi2 = $("#jsGrid").height();
                    var zhi3 = zhi1 + zhi2 - 60;
                    // console.log(zhi3);
                    $(`#changePage`).css(`top`,zhi3);
                }
                let data = {
                    add :`.jsgrid-insert-mode-button`,
                    tabName :`${LFID}_addNew`,
                    url :`./${LFID}_addNew.html`,
                    tabName_CN :`添加`,
                }
                /**添加新页签事件  添加*/
                TBF.bindAddNewTab(data);
                let data1 = {
                    add :`.jsgrid-edit-button`,
                    tabName :`${LFID}_changeNew`,
                    LFID,
                    getUrl :`${originAdd}/stockWeb/${LFID}${originEnd}`,
                    tabName_CN :`修改`,
                    url :`./${LFID}_changeNew.html`,
                    field:change_key,
                }
                // 将方法存入window对象中
                let changeInfoList = parent.window.changeInfo;
                parent.window.changeInfo = changeInfoList || {};
                parent.window.changeInfo[LFIDAndTabName] = data1;
                /**添加新页签事件  修改*/
                TBF.bindAddNewTabChange(data1);
            }
            /**将当前表配置信息存入sessionStorage */
            let funName = parent.window.JGConfig;
            parent.window.JGConfig = funName || {};
            parent.window.JGConfig[LFIDAndTabName] = JGConfig;
            // 直接按配置请求
            JGM.getInfo(JGConfig);
            /**给查询绑定事件 */
            TBF.getInfoInCase(searchJson);
            if(hasFYP){
                /**分页 */
                let FYJson = {
                    LFID,
                    tabName,
                    page:"0",
                    url:urlGet,
                }
                CP.changePageJSPost(FYJson);
            }else{
                $("#changePage").hide();
            }
        },
    }
    return fun;
});