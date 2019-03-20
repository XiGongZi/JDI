define([
    'require',
    "app/PKG_0.0.1",
    "jquery",
    "app/clearOrMore",
    "app/tabsFunctions",
    "work/public/alert/c/main",
    "app/jsGridMethods",
], function( 
        require,
        PKG,
        $,
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
            JGConfig.url = "http://192.168.1.100:8080/stockWeb/projectteamAdd";
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
            url:`http://192.168.1.100:8080/stockWeb/departmentList`,
            fun:function(value){
                let str = "";
                $.each(value,function(i,n){
                    str +=`<option>${n.fname}</option>`;
                });
                $("select[field='fdepartment']").html(str);
            }
        }
        JGM.getInfo_return(json31);
        // var data2 = sessionStorage.getItem('spactJGConfig');
        // console.log(JSON.parse(data2))
        // console.log("111")

});
