define([
    'require',
    "app/PKG_0.0.1",
    "jquery",
    "work/public/bodyFrame/c/main",
    "../M/jsgrid",
], function(
        require,
        PKG,
        $,
        bodyFrame,
        jsgrid,
    ) {
    'use strict';
    $(".bodyFrame-main>.tabs>div>div").click(function(){
        let val0 = $(this).attr("url");
        let val0_index = $(this).index();/**number */
        /**将地址放入iframe */

        /**检查已有的iframes状态 */
        let val2 = [];
        $(".bodyFrame-main>iframe").each(function(){
            let val1 = $(this).attr("pages");
            /**将已有的标签 pages 属性放到数组内(number) */
                val2.push(parseInt(val1));
        });
        /** */
        if(val2.indexOf(val0_index) == -1){
            console.log("iframs中没有这个元素!!");
            $(".bodyFrame-main").append(`
                    <iframe src="${val0}" pages="${val0_index}"  name="mainFrame" frameborder="0" scrolling="no"></iframe>
            `);
        }else{
            console.log("iframs有这个元素");
        }
        /**设置框架显示隐藏 */
        $(".bodyFrame-main iframe").hide();
        $(`.bodyFrame-main iframe[pages="${val0_index}"]`).show();
    });
});


