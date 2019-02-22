define([
    'require',
    "jquery"
], function (require,$) {
    'use strict';
    let fun={
        setTabsFun:function (json){
    /**子标签页核心代码  */
            
        $(json.add+">div",parent.document).click(function(){
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
            let val0 = $(this,parent.document).parent().attr("url");/**string */
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
            if(val2.indexOf(val0_index) == -1){
                // console.log("iframs中没有这个元素!!（已添加）");
                $(".bodyFrame-main",parent.document).append(`
                        <iframe src="${val0}" isHide="no" pages="${val0_index}"  name="mainFrame" frameborder="0" scrolling="no"></iframe>
                `);
            }else{
                // console.log("iframs有这个元素");
            }
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
                
                // console.log("val0 is "+val0)
                // console.log("val2 is "+val2)
                // console.log("val3 is "+val3)
                // console.log("val4 is "+val4)
                // console.log("val5 is "+val5)
                // console.log("val7 is "+val7)


                    /**让相同信息的iframe显示 */
                
                    /**设置留存的 当前显示页 或  最后一个 页签的选中样式 */
                /** 获取当前展示的iframe页的pages，同时获取所点击的对应pages，倒数第二个的pages。如果倒数第二个不等于当前展示的，则不操作，否则展示倒数第二个。 */
                if(val0 == val5  ){
                    /**所点击的x 对应的页签 pages 等于 当前 已展示的 iframes对应的pages */
                    console.log("bingo!");
                    $(".bodyFrame-main iframe",parent.document).hide();
                    $(`.bodyFrame-main iframe[pages="${val7}"]`,parent.document).show();
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
        }
    }
    return fun;
});


// ---------------------------------------------


// define([
//     'require',
//     "jquery"
// ], function (require,$) {
//     'use strict';
//     let fun={
//         setTabsFun:function (){
//     /**子标签页核心代码  */
//         $(json.add+">div").click(function(e){
//             /**设置点击样式 */
//             $(".bodyFrame-main>.tabs>div>div").attr("isFocus","no");
//             $(this).parent().attr("isFocus","yes");
//             /**设置导航提示 */
//             let val6 = null;
//             if($(this).parent().index() != 0){
//                 val6 = ">" + $(this).text()
//             }else{
//                 val6 = "";
//             }
//             $("#addInfo .third").html(val6);

//             /**获取点击的标签状态 */
//             let val0 = $(this).parent().attr("url");/**string */
//             let val0_index = parseInt($(this).parent().attr("pages"));/**number */
//             /**将地址放入iframe */

//                 /**检查已有的iframes状态 */
//             let val2 = [];
//             $(".bodyFrame-main>iframe").each(function(){
//                 let val1 = $(this).attr("pages");
//                 /**将已有的标签 pages 属性放到数组内(number) */
//                     val2.push(parseInt(val1));
//             });
//             /** */
//             if(val2.indexOf(val0_index) == -1){
//                 // console.log("iframs中没有这个元素!!（已添加）");
//                 $(".bodyFrame-main").append(`
//                         <iframe src="${val0}" isHide="no" pages="${val0_index}"  name="mainFrame" frameborder="0" scrolling="no"></iframe>
//                 `);
//             }else{
//                 // console.log("iframs有这个元素");
//             }
//             /**设置框架显示隐藏 */
//                 $(".bodyFrame-main iframe").hide();
//                 $(".bodyFrame-main iframe").attr("isHide","yes");
//                 $(`.bodyFrame-main iframe[pages="${val0_index}"]`).show();
//                 $(`.bodyFrame-main iframe[pages="${val0_index}"]`).attr("isHide","no");
            
//         });

//         /**为标签设置事件 */
//             $(".bodyFrame-main .tabs svg").click(function(){
//                 /**
//                  * val0: 所点击的页签 对应的页签 和 iframe 的 pages 属性值
//                  * val2: 所点击的页前一个index()值
//                  * val3: 倒数第二个页签的 index() 值
//                  * val4: 倒数第二个页签 和 iframe 内 pages 属性值
//                  * val5:  获得当前iframe 和 页签的 pages 值
//                  * val7: 所点击的页前一个pages值
//                  */
//                 /* 1.获取所点击的状态 与当前显示iframe的状态*/
//                 let val0 = parseInt($(this).parent().attr("pages"));/**number */
//                 let val5 = $(`.bodyFrame-main iframe[isHide="no"]`).attr("pages");/**string */
//                 /* 2.将所点击的对应的iframe删除 同时显示上一个*/
//                 $(`.bodyFrame-main iframe[pages="${val0}"]`).remove();
//                     /**页签，点击删除iframe后，自己先动画隐藏，再删除自己 */
//                 $(`.bodyFrame-main>.tabs>div>div[pages="${val0}"]`).hide(200,function(){
//                     $(`.bodyFrame-main>.tabs>div>div[pages="${val0}"]`).remove();
//                 });
//                 /**3.获取倒数第二个 标签number*/
//                 let val3 =parseInt($(`.bodyFrame-main>.tabs>div>div:last-child`).index() - 1);/**number */
//                 /**4.让这个标签显示 */
//                     /**获取这个标签的信息 */
//                 let val4 = $(`.bodyFrame-main>.tabs>div>div:eq(${val3})`).attr("pages");

//             /**所点击的页前一个  的 index（）值 和 pages 值 */
//             let val2 = parseInt($(this).parent().index() - 1);
//             let val7 = $(`.bodyFrame-main>.tabs>div>div:eq(${val2})`).attr("pages");
                
//                 console.log("val0 is "+val0)
//                 console.log("val2 is "+val2)
//                 console.log("val3 is "+val3)
//                 console.log("val4 is "+val4)
//                 console.log("val5 is "+val5)
//                 console.log("val7 is "+val7)


//                     /**让相同信息的iframe显示 */
                
//                     /**设置留存的 当前显示页 或  最后一个 页签的选中样式 */
//                 /** 获取当前展示的iframe页的pages，同时获取所点击的对应pages，倒数第二个的pages。如果倒数第二个不等于当前展示的，则不操作，否则展示倒数第二个。 */
//                 if(val0 == val5  ){
//                     /**所点击的x 对应的页签 pages 等于 当前 已展示的 iframes对应的pages */
//                     console.log("bingo!");
//                     $(".bodyFrame-main iframe").hide();
//                     $(`.bodyFrame-main iframe[pages="${val7}"]`).show();
//                     $(".bodyFrame-main iframe").attr("isHide","yes");
//                     $(`.bodyFrame-main iframe[pages="${val7}"]`).attr("isHide","no");
//                     $(`.bodyFrame-main>.tabs>div>div`).attr("isFocus","no");
//                     $(`.bodyFrame-main>.tabs>div>div:eq(${val2})`).attr("isFocus","yes");
//                 }else{
//                     console.log("no!!");
//                 }
            
//                 /**设置导航提示 */
//                 let val1 = null;
//                 if($(this).parent().index() != 0  ){
//                     val1 = ">" + $(`.bodyFrame-main>.tabs>div>div[isFocus="yes"]`).text();
//                 }else{
//                     val1 = "";
//                 }
//                 $("#addInfo .third").html(val1);

//             });



//         /**iframe内点击事件影响到index事件*/
        




//         /**
//          * 效果  
//          *  点击第N个 
//          *      显示 第N个iframe，别的隐藏 、 
//          *      页签第二个选中样式
//          *  点击第N个的 x,N为最后一个
//          *      1.当前选中是 当前所点击的
//          *          点击的页签对应的iframe被删除、
//          *          iframe显示上一个页签对应的iframe、
//          *          点击的页签被删除、
//          *          剩下的最后一个页签为选中样式
//          *      2.当前选中是 当前所点击的上一个
//          *          点击的页签对应的iframe被删除、
//          *          点击的页签被删除、
//          *      3.当前选中是 当前所点击的上一个之前
//          *          点击的页签对应的iframe被删除、
//          *          点击的页签被删除、
//          *  点击第N个的 x,N 不为最后一个 且 N在选中样式 后
//          *  点击第N个的 x,N 不为最后一个 且 N在选中样式 上
//          *  点击第N个的 x,N 不为最后一个 且 N在选中样式 前
//          */
//         }
//     }
//     return fun;
// });


