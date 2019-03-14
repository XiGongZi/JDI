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
        $(".closeTabs").click(function(){
            /**刷新父下另一个框架iframe */
                    /**存 */
            let JGConfig = {};
            JGConfig.data = {
                "faddress": "辽宁省沈阳市于洪区",
                "ffile": "",
                "fmanager": "小明3",
                "fmoney": 1000000,
                "fno": "20190308094416",
                "fnote": "已完成",
                "fpeojectname": "桥梁3",
                "fphone": "15524349991",
                "fstate": "竣工",
                "ftax": 0,
                "funitname": "测试名称4",
            };
            JGConfig.url = "http://192.168.1.100:8080/stockWeb/spactSave";

            // 获得数据
            let data3 = {add:".bodyFrame1-main"}
            let dd = PKG.judge.pickNull(TBF.getCase(data3));
            data3.body = dd;
            TBF.searchTips(data3);

            // JGM.addInfo(JGConfig);
            $(`#tabs .iframes>div[LFID="spact"]>iframe[tabName="spact"]`,parent.document)[0].contentWindow.location.reload();
            /**关闭当前页签 */
            // TBF.closeTab();
        });
        
        // var data2 = sessionStorage.getItem('spactJGConfig');
        // console.log(JSON.parse(data2))
        // console.log("111")

        
});
