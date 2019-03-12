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
            /** 输入 page 、 count       根据page请求 更新相应界面，同时控制动画效果。 */
            show:function(data){
                let page = Number(data.page);
                let count = Number(data.count);
                let urlGet = data.urlGet;
                $("#changePage .title1").html(`
                    共有 <b style="color: #A60427" class="showTotalPage">${count}</b> 页记录 每页显示5条 ${page}/${count}页
                `);
                let liList = $(`#changePage .pages li`).length; 
                if(liList == 0){
                    /**如果liList直接子元素为0 */
                    //否  罗列
                    var str = "";
                    //li 里的 pages ：为当前页。最高值为 pgs 。
                    for(var i = 0;i <= count-1;i++){
                        str += `<li pages="${i+1}" class="floatLeft" isFocus="no" isHide="no">${i+1}</li>`;
                    }
                    // 填充进入dom
                    $("#changePage .pages").html(str);
                    $(`#changePage .pages li[pages="1"]`).attr("isFocus","yes");
                    /**点击事件 */
                    $("#changePage .pages li").click(function(e){
                        /**重新focus */
                        $(`#changePage .pages li`).attr("isFocus","no");
                        $(this).attr("isFocus","yes");
                        let thisPage = $(this).attr("pages");
                        if(count >5){
                            /**总页数大于5才有动画 */
                            if(thisPage > 2 && thisPage < (count - 1)){
                                $(`#changePage .pages li[pages="${thisPage - 2}"]`).attr("isHide","yes");
                            }
                        }
                        
                        // fun.showTabClick(e);
                    });
                }else{
                    /**如果liList直接子元素不为0 */
                    console.log(22222);
                }
            },
            showAnimai:function(){

            },
            showTabClick:function(data){
                // console.log(data)
                
            }
   }
   return fun;
});



