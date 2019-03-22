define([
    'require',
    "app/tabsFunctions",
    "app/PKG_0.0.1",
    "app/jsGridMethods",
], function(
    require,
    TBF,
    PKG,
    JGM
    
    ) {
    'use strict';
    
    let fun = {
        add:function(data){
            let LFID = data.LFID;
            let originAdd = data.originAdd;
            let originEnd = data.originEnd;
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
        change:function(data){
            let LFID = data.LFID;
            let originAdd = data.originAdd;
            let originEnd = data.originEnd;
            $(".closeTabs").click(function(){
                /**刷新父下另一个框架iframe */
                        /**存 */
                let JGConfig = {};
                JGConfig.url = `${originAdd}/stockWeb/${LFID}Update${originEnd}`;
                // 去判断是否留空，留空则提醒，否则提交
                    // 获得数据
                    let data3 = {add:".bodyFrame1-main "}
                    let json = TBF.getCase(data3);
                    console.log(json);
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
    }
    return fun;
});