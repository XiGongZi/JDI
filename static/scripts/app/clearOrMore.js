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
                                    <div url="${url0}" pages="${pages}" class="tabs-li" style="display:none" tabName="${tabName_attr}">
                                        <div class="flex1">
                                            ${tabsName}
                                        </div>
                                        <svg class="icon " aria-hidden="true">
                                            <use xlink:href="#icon-clear"></use>
                                        </svg>
                                    </div>
                                `;
                        $(".leftBarPage",parent.document).append(str0);
                        $(`.leftBarPage>div:eq(-1)`,parent.document).show(200,function(){
                            /** 重置方法  目前是新添一个时，全都再绑定一个事件  
                             *          需要 取消绑定 或 只绑定新添加的。
                             *              若只绑定新添加的，则需要更改tabsFunction，传入参数。
                             */
                            let json = {};
                            json.add = `.tabs .leftBarPage>div:eq(-1)`;
                            tabFunctions.setTabsFun(json);
                            $(this,parent.document).click();
                        });
                    }else{
                    }
                    
                    
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


