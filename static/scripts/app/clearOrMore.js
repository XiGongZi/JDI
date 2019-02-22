define([
    'require',
    "jquery",
    "app/tabsFunctions",
], function (
    require,
    $,
    tabFunctions,
    ) {
    'use strict';
        /**为默认页签绑定事件 */
        let json = {};
        json.add = `.tabs .leftBarPage>div:eq(0)`;
        tabFunctions.setTabsFun(json);

            /* 显示隐藏添加合同*/ 
        $(".showAddNew").click(function(){
            if($(".addNew").css("display")=="none"){
                $(".addNew").slideDown(500);
                $(".showAddNew").html("取消添加");
            }else{
                $(".addNew").slideUp(500);
                $(".showAddNew").html("添加合同");
            }
        });

        /* input旁边小功能*/ 
        $(".bodyFrame1 .bodyFrame1-main .case-icon").click(function(){
            let zhi = $(this).children("svg").attr("status");
            switch (zhi) {
                case "0":
                    /**清除 */
                    $(this).parent().find("input").val("");
                    break;
                case "1":
                    /**新框搜索  */
                    /**  190222 tabs标签过多问题：当页签过多时，一方面可以减小宽度，适度隐藏半条以增加容量，另一方面也可以增加一个省略号表示过多，但是目前先做判断，以限制个数。日后有机会再更新新效果。  */
                    // alert("制作中！");
                    let url0 = "./TP-caseToSearch.html";
                    let tabsName = "添加合同";
                    let tabName_attr = "newTB";
                    let pages = $(".tabs .leftBarPage>div",parent.document).length
                    let status = $(`.tabs .leftBarPage>div[tabName="${tabName_attr}"]`,parent.document).length;
                    
                    /**大于0个的时候就可以 */
                    if(status == 0){
                        let str0 = `
                                    <div url="${url0}" pages="${pages}" class="tabs-li" style="display:none" tabName="${tabName_attr}" isFocus="yes">
                                        <div class="flex1">
                                            ${tabsName}
                                        </div>
                                        <svg class="icon " aria-hidden="true">
                                            <use xlink:href="#icon-clear"></use>
                                        </svg>
                                    </div>
                                `;
                        let str1 = `
                                <iframe pages="${pages}" isHide="no" src="${url0}" name="mainFrame" frameborder="0" scrolling="no"></iframe>
                        `
                        $(".leftBarPage>div",parent.document).attr("isFocus","no");
                        $(".leftBarPage",parent.document).append(str0);
                        $(".bodyFrame-main iframe",parent.document).attr("isHide","yes");
                        $(".bodyFrame-main",parent.document).append(str1);
                        $("#addInfo .third",parent.document).html(">"+tabsName);


                        $(`.leftBarPage>div:eq(-1)`,parent.document).show(200,function(){
                            /** 重置方法  目前是新添一个时，全都再绑定一个事件  
                             *          需要 取消绑定 或 只绑定新添加的。
                             *              若只绑定新添加的，则需要更改tabsFunction，传入参数。
                             */
                            let json = {};
                            json.add = `.tabs .leftBarPage>div:eq(-1)`;
                            json.turnBool = true ;
                            tabFunctions.setTabsFun(json);
                            
                        });
                    }else{
                        /**若tabs里已经有 这个页签了，需要去通过那个页签的名字 以获得它的pages */
                        let statusIndex = $(`.tabs .leftBarPage>div[tabName="${tabName_attr}"]`,parent.document).attr("pages");
                        let statusName = $(`.tabs .leftBarPage>div[tabName="${tabName_attr}"] div`,parent.document).html();
                        let val0 = $(`.bodyFrame-main iframe[pages=${tabName_attr}]`,parent.document);
                        $(".leftBarPage>div",parent.document).attr("isFocus","no");
                        $(`.tabs .leftBarPage>div[tabName="${tabName_attr}"]`,parent.document).attr("isFocus","yes");
                        $(".bodyFrame-main iframe",parent.document).attr("isHide","yes");
                        $(`.bodyFrame-main iframe[pages=${statusIndex}]`,parent.document).attr("isHide","no");
                        $("#addInfo .third",parent.document).html(">"+statusName);
                    }
                    // $(this,parent.document).click();
                    // window.parent.setTabsFun();
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


