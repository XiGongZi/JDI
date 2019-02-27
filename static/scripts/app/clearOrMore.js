define([
    'require',
    "jquery",
    "app/tabsFunctions",
    "app/PKG_0.0.1",
    "app/addTabXIframe"
], function (
    require,
    $,
    tabFunctions,
    PKG,
    ATF
    ) {
    'use strict';
        /**为默认页签绑定事件 */
        let json = {};
        json.add = `.tabs .leftBarPage>div:eq(0)`;
        tabFunctions.setTabsFun(json);

        //     /* 显示隐藏添加合同*/ 
        // $(".showAddNew").click(function(){
        //     if($(".addNew").css("display")=="none"){
        //         $(".addNew").slideDown(500);
        //         $(".showAddNew").html("取消添加");
        //     }else{
        //         $(".addNew").slideUp(500);
        //         $(".showAddNew").html("添加合同");
        //     }
        // });
        /**input旁边小功能封装函数 */
        let funs = {
                setPagesFun_inputIcon:function(data){
                    $(data.add).click(function(){
                            /**新框搜索  */
                            /**  190222 tabs标签过多问题：当页签过多时，一方面可以减小宽度，适度隐藏半条以增加容量，另一方面也可以增加一个省略号表示过多，但是目前先做判断，以限制个数。日后有机会再更新新效果。  */
                            // alert("制作中！");
                            let url0 = data.url;
                            let tabsName = data.tabName;
                            let tabName_attr = data.tabName_attr;
                            let pages = $(".tabs .leftBarPage>div",parent.document).length
                            let status = $(`.tabs .leftBarPage>div[tabName="${tabName_attr}"]`,parent.document).length;
                            /**获取当前leftBar页面ID */
                            let thisLFAdd = $(`iframe[name="leftBar1"]`,parent.document).contents().find("a[hover1='1']").attr("url");
                            let LFID = PKG.get.urlFromStr(thisLFAdd);
                            /**大于0个的时候就可以 */
                            if(status == 0){
                                let data0 = {url0,pages,LFID,tabName_attr,tabsName};
                                $(".leftBarPage>div",parent.document).attr("isFocus","no");
                                $(".bodyFrame-main iframe",parent.document).attr("isHide","yes");
                                ATF.addTabs(data0);
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
                                let statusName = $(`.tabs .leftBarPage>div[tabName="${tabName_attr}"] div`,parent.document).html().replace(/^\s+|\s+$/g,'');;
                                // let val0 = $(`.bodyFrame-main iframe[pages=${tabName_attr}]`,parent.document);
                                console.log("statusIndex is "+statusIndex);
                                console.log("statusName is "+statusName);
                                $(".leftBarPage>div",parent.document).attr("isFocus","no");
                                $(`.tabs .leftBarPage>div[tabName="${tabName_attr}"]`,parent.document).attr("isFocus","yes");
                                $(".bodyFrame-main iframe",parent.document).attr("isHide","yes");
                                $(`.bodyFrame-main iframe[pages=${statusIndex}]`,parent.document).attr("isHide","no");
                                $("#addInfo .third",parent.document).html(">"+statusName);
                            }
                            // $(this,parent.document).click();
                            // window.parent.setTabsFun();
                });
            }
        }
         

        $(".bodyFrame1 .case-icon svg[status='0']").click(function(){
                    /**清除 */
            $(this).parent().parent().find("input").val("");
        })



        return funs;
});


