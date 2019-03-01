define([
    'require',
    "jquery",
], function (require,$) {
    'use strict';
    let fun={
        setTabsFun:function (json){
    /**子标签页核心代码  */
            
        $(json.add+">div",parent.document).click(function(){

            /* 获得这个页签pageName */
            // let tabsName = $(this,window.document).parent().attr("")
            // console.log("json.add is "+json.add);
            /**设置点击样式 */
            $(".bodyFrame-main>.tabs>div>div",parent.document).attr("isFocus","no");
            $(this).parent().attr("isFocus","yes");
            /**设置导航提示 */
            let val6 = null;
            if($(this,parent.document).parent().index() != 0){
                val6 = ">" + $(this,parent.document).text()
            }else{
                val6 = "";
            }
            $("#addInfo .third",parent.document).html(val6);

            /**获取点击的标签状态 */
            let val0_index = parseInt($(this,parent.document).parent().attr("pages"));/**number */
            /**将地址放入iframe */

                /**检查已有的iframes状态 */
            let val2 = [];
            $(".bodyFrame-main>iframe",parent.document).each(function(){
                let val1 = $(this,parent.document).attr("pages");
                /**将已有的标签 pages 属性放到数组内(number) */
                    val2.push(parseInt(val1));
            });
            /** */
            // if(val2.indexOf(val0_index) == -1){
            //     // console.log("iframs中没有这个元素!!（已添加）");
            //     $(".bodyFrame-main",parent.document).append(`
            //             <iframe src="${val0}" isHide="no" pages="${val0_index}"  name="mainFrame" frameborder="0" scrolling="no"></iframe>
            //     `);
            // }else{
            //     // console.log("iframs有这个元素");
            // }
            /**设置框架显示隐藏 */
                $(".bodyFrame-main iframe",parent.document).attr("isHide","yes");
                $(`.bodyFrame-main iframe[pages="${val0_index}"]`,parent.document).attr("isHide","no");

                /** 设置当前 页签 与对应的 iframe 显示 */
                 

        });
        /**为标签设置事件 */
            $(json.add+">svg",parent.document).click(function(){
                /**
                 * val0: 所点击的页签 对应的页签 和 iframe 的 pages 属性值
                 * val2: 所点击的页前一个index()值
                 * val3: 倒数第二个页签的 index() 值
                 * val4: 倒数第二个页签 和 iframe 内 pages 属性值
                 * val5:  获得当前iframe 和 页签的 pages 值
                 * val7: 所点击的页前一个pages值
                 */
                /* 1.获取所点击的状态 与当前显示iframe的状态*/
                let val0 = parseInt($(this,parent.document).parent().attr("pages"));/**number */
                let val5 = $(`.bodyFrame-main iframe[isHide="no"]`,parent.document).attr("pages");/**string */
                /* 2.将所点击的对应的iframe删除 同时显示上一个*/
                $(`.bodyFrame-main iframe[pages="${val0}"]`,parent.document).remove();
                    /**页签，点击删除iframe后，自己先动画隐藏，再删除自己 */
                $(`.bodyFrame-main>.tabs>div>div[pages="${val0}"]`,parent.document).hide(200,function(){
                    $(`.bodyFrame-main>.tabs>div>div[pages="${val0}"]`,parent.document).remove();
                });
                /**3.获取倒数第二个 标签number*/
                let val3 =parseInt($(`.bodyFrame-main>.tabs>div>div:last-child`,parent.document).index() - 1);/**number */
                /**4.让这个标签显示 */
                    /**获取这个标签的信息 */
                let val4 = $(`.bodyFrame-main>.tabs>div>div:eq(${val3})`,parent.document).attr("pages");

            /**所点击的页前一个  的 index（）值 和 pages 值 */
            let val2 = parseInt($(this).parent().index() - 1);
            let val7 = $(`.bodyFrame-main>.tabs>div>div:eq(${val2})`,parent.document).attr("pages");
                    /**让相同信息的iframe显示 */
                
                    /**设置留存的 当前显示页 或  最后一个 页签的选中样式 */
                /** 获取当前展示的iframe页的pages，同时获取所点击的对应pages，倒数第二个的pages。如果倒数第二个不等于当前展示的，则不操作，否则展示倒数第二个。 */
                if(val0 == val5  ){
                    /**所点击的x 对应的页签 pages 等于 当前 已展示的 iframes对应的pages */
                    console.log("bingo!");
                    // $(".bodyFrame-main iframe",parent.document).hide();
                    // $(`.bodyFrame-main iframe[pages="${val7}"]`,parent.document).show();
                    $(".bodyFrame-main iframe").attr("isHide","yes");
                    $(`.bodyFrame-main iframe[pages="${val7}"]`,parent.document).attr("isHide","no");
                    $(`.bodyFrame-main>.tabs>div>div`,parent.document).attr("isFocus","no");
                    $(`.bodyFrame-main>.tabs>div>div:eq(${val2})`,parent.document).attr("isFocus","yes");
                }else{
                    console.log("no!!");
                }
            
                /**设置导航提示 */
                let val1 = null;
                if($(this,parent.document).parent().index() != 0  ){
                    val1 = ">" + $(`.bodyFrame-main>.tabs>div>div[isFocus="yes"]`,parent.document).text();
                }else{
                    val1 = "";
                }
                $("#addInfo .third",parent.document).html(val1);

            });

        /**
         * 效果  
         *  点击第N个 
         *      显示 第N个iframe，别的隐藏 、 
         *      页签第二个选中样式
         *  点击第N个的 x,N为最后一个
         *      1.当前选中是 当前所点击的
         *          点击的页签对应的iframe被删除、
         *          iframe显示上一个页签对应的iframe、
         *          点击的页签被删除、
         *          剩下的最后一个页签为选中样式
         *      2.当前选中是 当前所点击的上一个
         *          点击的页签对应的iframe被删除、
         *          点击的页签被删除、
         *      3.当前选中是 当前所点击的上一个之前
         *          点击的页签对应的iframe被删除、
         *          点击的页签被删除、
         *  点击第N个的 x,N 不为最后一个 且 N在选中样式 后
         *  点击第N个的 x,N 不为最后一个 且 N在选中样式 上
         *  点击第N个的 x,N 不为最后一个 且 N在选中样式 前
         */
        },
        /* Fun_1  修改index页当前定位*/
        changePosition:function(data){
            let LFDep_CN = data.LFDep_CN;
            let LFID_CN = data.LFID_CN;
            let tabName_CN = data.tabName_CN;
            let add = data.add;
            let str = `
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-dangqianchengshi"></use>
                </svg>
            当前位置：>
            <span >${LFDep_CN}</span>> 
            <span >${LFID_CN}</span>
            <span >${tabName_CN}</span>
            `;
            $(add).html(str);            
        },
        /* Fun_2  插入T1B1*/
        insertT1B1:function(data){
            let LFID = data.LFID;
            let str1 = `
            <div  LBP="${LFID}" isShow="yes"></div>
            `;
            $(".bodyFrame-main .tabs").append(str1);
            $(".bodyFrame-main .iframes").append(str1);
        },
        /* Fun_3  插入T2B2*/
        insertT2B2:function(data){
            let LFID = data.LFID;
            let tabName = data.tabName;
            let tabName_CN = data.tabName_CN;
            let url = data.url;
            let str1 = `
                <div  leftBarID="${LFID}" class="tabs-li"  tabName="${tabName}" isFocus="yes">
                    <div class="flex1">
                        ${tabName_CN}
                    </div>
                    <svg class="icon " aria-hidden="true">
                        <use xlink:href="#icon-clear"></use>
                    </svg>
                </div>
            `;
            let str2 = `
                <iframe class="iframes-li" tabName="${tabName}" isShow="yes" src="${url}" leftBarID="${LFID}"  name="mainFrame" frameborder="0" scrolling="no"></iframe>
            `;
            $(`.bodyFrame-main .tabs>div[LFID="${LFID}"]`).append(str1);
            $(`.bodyFrame-main .iframes>div[LFID="${LFID}"]`).append(str2);
        },
        /** Fun_7 对 T1B1 设置显示隐藏 */
        showT1B1:function(data){
            let LFID = data.LFID;
            let tabName = data.tabName;
            $(`.bodyFrame-main .tabs>div`).attr("isFocus","no");
            $(`.bodyFrame-main .tabs>div[LFID="${LFID}"]`).attr("isFocus","yes");
            $(`.bodyFrame-main .iframes>div`).attr("isFocus","no");
            $(`.bodyFrame-main .iframes>div[LFID="${LFID}"]`).attr("isFocus","yes");
        },
        /** Fun_5 对T2B2 设置显示隐藏*/
        showT2B2:function(data){
            let LFID = data.LFID;
            let tabName = data.tabName;
            $(`.bodyFrame-main .tabs>div[LFID="${LFID}"]>div`).attr("isFocus","no");
            $(`.bodyFrame-main .tabs>div[LFID="${LFID}"]>div[tabName="${tabName}"]`).attr("isFocus","yes");
            $(`.bodyFrame-main .iframes>div[LFID="${LFID}"]>iframe`).attr("isFocus","no");
            $(`.bodyFrame-main .iframes>div[LFID="${LFID}"]>iframe[tabName="${tabName}"]`).attr("isFocus","yes");
        },
        /** Fun_6 清除T2B2*/
        removeT2B2:function(data){
            let LFID = data.LFID;
            let tabName = data.tabName;
            $(`.bodyFrame-main .tabs>div[LFID="${LFID}"]>div[tabName="${tabName}"]`).remove();
            $(`.bodyFrame-main .iframes>div[LFID="${LFID}"]>iframe[tabName="${tabName}"]`).remove();
        } 
    }
    return fun;
});



