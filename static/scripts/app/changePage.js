define([
    'require',
    "jquery",
    "app/jsGridMethods",
], function(
        require,
        $,
        JGM,
    ) {
    'use strict';
   let fun = {
            /**fun_1 */
            getInfo:function(data){
                let LFID = data.LFID;
                let tabName = data.tabName;
                let LFIDAndTabName = LFID + tabName;
                let page = data.page;
                // 1.获取当前页名
                let str = LFIDAndTabName+"JGConfig";

                let body = JSON.parse(sessionStorage.getItem(str));
                body.data.page = page;
                let jgg = require("app/jsGridMethods");
                jgg.getInfo(body);
            },
            show:function(data){
                let page = Number(data.page);
                let count = Number(data.count);
                $("#changePage .title1").html(`
                    共有 <b style="color: #A60427" class="showTotalPage">${count}</b> 页记录 每页显示5条 ${page}/${count}页
                `);
                let liList = $(`#changePage .pages li`).length; 
                console.log(liList);
                if(liList == 0){
                    //否  罗列
                    var str = "";
                    //li 里的 pages ：为当前页。最高值为 pgs 。
                    for(var i = 0;i <= count-1;i++){
                        str += `<li pages="${i+1}" class="floatLeft" isFocus="no">${i+1}</li>`;
                    }
                    // 填充进入dom
                    $("#changePage .pages").html(str);
                    $(`#changePage .pages li[pages="${page}"]`).attr("isFocus","yes");
                }

                
            },
            
   }
   return fun;
});



