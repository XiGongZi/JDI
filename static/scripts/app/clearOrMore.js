define([
    'require',
    "jquery"
], function (require,$) {
    'use strict';
    //页面入口程序，定义需要载入的css文件   输入本组件的config，输出=>加载css
        /* input旁边小功能*/ 
        $(".bodyFrame1 .bodyFrame1-main .case-icon").click(function(){

            let zhi = $(this).children("svg").attr("status");
            switch (zhi) {
                case "0":
                    /**清除 */
                    $(this).parent().find("input").val("");
                    break;
                case "1":
                    /**弹出新框搜索 */
                    // alert("制作中！");
                    let url0 = "./TP-caseToSearch.html";
                    let tabsName = "添加合同";
                    let pages = $(".tabs .leftBarPage>div",parent.document).length
                    let str0 = `
                                    <div url="${url0}" pages="${pages}" class="tabs-li" style="display:none">
                                        <div class="flex1">
                                            ${tabsName}
                                        </div>
                                        <svg class="icon " aria-hidden="true">
                                            <use xlink:href="#icon-clear"></use>
                                        </svg>
                                    </div>
                                `
                    $(".leftBarPage",parent.document).append(str0);
                    $(`.leftBarPage>div:eq(-1)`,parent.document).show(200);
                    window.parent.setTabsFun();

                    break;
                case "1":
                    /**下拉 */
                    $(this).parent().find("select").focus();
                    break;
                default:
                    break;
            }
        })
});


