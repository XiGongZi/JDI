define([
    'require',
    "jquery",
    "app/PKG_0.0.1",
    "work/public/alert/c/main",
], function (require,$,PKG,Alert) {
    'use strict';
    let fun={
        /* Fun_1  修改index页当前定位*/
        changePosition:function(data){
            let LFDep_CN = data.LFDep_CN;
            let LFID_CN = data.LFID_CN;
            let tabName_CN = data.tabName_CN;
            let isParentDoc = data.isParentDoc;
            tabName_CN == ""?tabName_CN = "":tabName_CN = " > "+tabName_CN;
            let str = `
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-dangqianchengshi"></use>
                </svg>
            当前位置：>
            <span >${LFDep_CN}</span>> 
            <span >${LFID_CN}</span>
            <span >${tabName_CN}</span>
            `;
            if(isParentDoc === undefined){
                $("#addInfo",parent.document).html(str);            
            }else{
                $("#addInfo").html(str);            
            }
        },
        /* Fun_2  插入T1B1*/
        insertT1B1:function(data){
            let LFID = data.LFID;
            let isParentDoc = data.isParentDoc;
            let str1 = `
            <div  LFID="${LFID}" isShow="yes"></div>
            `;
            if(isParentDoc == undefined){
                $("#tabs .tabs",parent.document).append(str1);
                $("#tabs .iframes",parent.document).append(str1);          
            }else{
                $("#tabs .tabs").append(str1);
                $("#tabs .iframes").append(str1);            
            }
        },
        /* Fun_3  插入T2B2*/
        insertT2B2:function(data){
            let LFID = data.LFID;
            let tabName = data.tabName;
            let tabName_CN = data.tabName_CN;
            let isParentDoc = data.isParentDoc;
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
            if(isParentDoc === undefined){
                $(`#tabs .tabs>div[LFID="${LFID}"]`,parent.document).append(str1);
                $(`#tabs .iframes>div[LFID="${LFID}"]`,parent.document).append(str2);            
            }else{
                $(`#tabs .tabs>div[LFID="${LFID}"]`).append(str1);
                $(`#tabs .iframes>div[LFID="${LFID}"]`).append(str2);            
            }
        },
        /** Fun_7 对 T1B1 设置显示隐藏 */
        showT1B1:function(data){
            let LFID = data.LFID;
            let isParentDoc = data.isParentDoc;
            if(isParentDoc === undefined){
                $(`#tabs .tabs>div`,parent.document).attr("isShow","no");
                $(`#tabs .tabs>div[LFID="${LFID}"]`,parent.document).attr("isShow","yes");
                $(`#tabs .iframes>div`,parent.document).attr("isShow","no");
                $(`#tabs .iframes>div[LFID="${LFID}"]`,parent.document).attr("isShow","yes");           
            }else{
                $(`#tabs .tabs>div`).attr("isShow","no");
                $(`#tabs .tabs>div[LFID="${LFID}"]`).attr("isShow","yes");
                $(`#tabs .iframes>div`).attr("isShow","no");
                $(`#tabs .iframes>div[LFID="${LFID}"]`).attr("isShow","yes");           
            }
        },
        /** Fun_5 对T2B2 设置显示隐藏*/
        showT2B2:function(data){
            let LFID = data.LFID;
            let tabName = data.tabName;
            let isParentDoc = data.isParentDoc;
            if(isParentDoc === undefined){
                $(`#tabs .tabs>div[LFID="${LFID}"]>div`,parent.document).attr("isFocus","no");
                $(`#tabs .tabs>div[LFID="${LFID}"]>div[tabName="${tabName}"]`,parent.document).attr("isFocus","yes");
                $(`#tabs .iframes>div[LFID="${LFID}"]>iframe`,parent.document).attr("isShow","no");
                $(`#tabs .iframes>div[LFID="${LFID}"]>iframe[tabName="${tabName}"]`,parent.document).attr("isShow","yes");           
            }else{
                $(`#tabs .tabs>div[LFID="${LFID}"]>div`).attr("isFocus","no");
                $(`#tabs .tabs>div[LFID="${LFID}"]>div[tabName="${tabName}"]`).attr("isFocus","yes");
                $(`#tabs .iframes>div[LFID="${LFID}"]>iframe`).attr("isShow","no");
                $(`#tabs .iframes>div[LFID="${LFID}"]>iframe[tabName="${tabName}"]`).attr("isShow","yes");            
            }
        },
        /** Fun_6 清除T2B2*/
        removeT2B2:function(data){
            let LFID = data.LFID;
            let tabName = data.tabName;
            let isParentDoc = data.isParentDoc;
            if(isParentDoc === undefined){
                $(`#tabs .tabs>div[LFID="${LFID}"]>div[tabName="${tabName}"]`,parent.document).remove();
                $(`#tabs .iframes>div[LFID="${LFID}"]>iframe[tabName="${tabName}"]`,parent.document).remove();             
            }else{
                $(`#tabs .tabs>div[LFID="${LFID}"]>div[tabName="${tabName}"]`).remove();
                $(`#tabs .iframes>div[LFID="${LFID}"]>iframe[tabName="${tabName}"]`).remove();            
            }
        },
        closeTab:function(data){
            let LFID,tabName,isParentDoc;
            /**未定义的时候 是直接调用此函数关闭当前页签，有定义的时候关闭data内指定的页签 */
            if(data == undefined){
                let json = fun.getLeftBarStatus();
                LFID = json.LFID;
                tabName = $(`#tabs .tabs>div[LFID="${LFID}"]>div[isFocus="yes"]`,parent.document).attr("tabName");

            }else{
                LFID = data.LFID;
                tabName = data.tabName;
                isParentDoc = data.isParentDoc;
            }
            let isFocusTabName = $(`#tabs .tabs>div[LFID="${LFID}"]>div[isFocus="yes"]`,parent.document).attr("tabName");
                //**状态转移 （只有 当前选中的tabName和所点击的tabName相同时才涉及转移）*/
                if(tabName == isFocusTabName){
                    let isFocusTabName_index = $(`#tabs .tabs>div[LFID="${LFID}"]>div[isFocus="yes"]`,parent.document).index();
                    let beforeTabName = $(`#tabs .tabs>div[LFID="${LFID}"]>div:eq(${isFocusTabName_index - 1})`,parent.document).attr("tabName");
                    let beforeTabName_CN = $(`#tabs .tabs>div[LFID="${LFID}"]>div:eq(${isFocusTabName_index - 1})`,parent.document).text();
                    //**获得前一个tabName*/
                    let data1 = {
                        tabName:beforeTabName,
                        LFID,
                    }
                    fun.showT2B2(data1);
                    /**获取当前左导航状态 */
                    let json1 = fun.getLeftBarStatus();
                    let LFDep_CN = json1.LFDep_CN;
                    let LFID_CN = json1.LFID_CN;
                        LFID = json1.LFID;
                        let tabName_CN = " > " + $(this,parent.document).text() ;
                        beforeTabName == LFID ? tabName_CN = "":tabName_CN = tabName_CN ; 
                    let data2 = {
                        LFDep_CN,
                        LFID_CN,
                        tabName_CN:tabName_CN,
                        isParentDoc,
                    }
                    fun.changePosition(data2);
                }
                //**清除 */
                let data0 = {
                    LFID,
                    tabName,
                }
                fun.removeT2B2(data0);

        },
        /** Fun_C 给 新T2 绑定事件*/
        bindTabsFun:function(data){
            let LFID = data.LFID;
            let tabName = data.tabName;
            let isParentDoc = data.isParentDoc;
            //**获得当前选中状态的tabName*/
            $(`#tabs .tabs>div[LFID="${LFID}"]>div[tabName="${tabName}"] svg`,parent.document).click(function(){
                console.log("--------------------");
                let data3 = {
                    tabName,
                    LFID,
                    isParentDoc,
                }
                fun.closeTab(data3);
            });
            $(`#tabs .tabs>div[LFID="${LFID}"]>div[tabName="${tabName}"] div`,parent.document).click(function(){
                /**点击的时候显示此tab和iframe */
                let data1 = {
                    tabName,
                    LFID,
                    isParentDoc,
                }
                fun.showT2B2(data1);
                /**获取当前左导航状态 */
                let json1 = fun.getLeftBarStatus();
                let LFDep_CN = json1.LFDep_CN;
                let LFID_CN = json1.LFID_CN;
                    LFID = json1.LFID;
                let tabName_CN = $(this,parent.document).text() ;
                tabName == LFID ? tabName_CN = "":tabName_CN = tabName_CN ; 
                let data2 = {
                    LFDep_CN,
                    LFID_CN,
                    tabName_CN,
                    isParentDoc,
                };
                fun.changePosition(data2);
            });
            
        },
        bindAddNewTab:function(data){
            let add = data.add;
            let tabName = data.tabName;
            let url = data.url;
            let tabName_CN = data.tabName_CN;
            let isParentDoc = data.isParentDoc;
            $(add).click(function(){
                /**获取当前左导航状态 */
                let json1 = fun.getLeftBarStatus();
                let LFDep_CN = json1.LFDep_CN;
                let LFID_CN = json1.LFID_CN;
                let LFID = json1.LFID;
                /**判断T2是否存在此tabName */
                let thisTabNum = $(`#tabs .tabs>div[LFID="${LFID}"]>div[tabName="${tabName}"]`,parent.document).length;
                if(thisTabNum == 0){
                    let data = {
                        LFID,
                        tabName,
                        tabName_CN,
                        isParentDoc,
                        url,
                    }
                    fun.insertT2B2(data);
                    fun.bindTabsFun(data);
                };
                let data = {
                    LFID,
                    tabName,
                    isParentDoc,
                };
                fun.showT2B2(data);
                let data1 = {
                    LFDep_CN,
                    LFID_CN,
                    tabName_CN,
                    isParentDoc,
                };
                fun.changePosition(data1);
            });

        },
        bindAddNewTabChange:function(data){
            let add = data.add;
            let tabName = data.tabName;
            let url = data.url;
            let LFID = data.LFID;
            let tabName_CN = data.tabName_CN;
            let isParentDoc = data.isParentDoc;
            let getUrl = data.getUrl;
            let postUrl = data.postUrl;
            let field = data.field;
            let LFIDAndTabNames = LFID + LFID;
            let getDataName = LFID + "Data";
            $(add).click(function(){
                /**此处获取第1位的关键词 */
                var keyValue =  $(this).parents("tr").find("td").eq(0).text();
                /**获取当前左导航状态 */
                let json1 = fun.getLeftBarStatus();
                let LFDep_CN = json1.LFDep_CN;
                let LFID_CN = json1.LFID_CN;
                let LFID = json1.LFID;
                /**判断T2是否存在此tabName */
                let thisTabNum = $(`#tabs .tabs>div[LFID="${LFID}"]>div[tabName="${tabName}"]`,parent.document).length;
                if(thisTabNum == 0){
                    let data = {
                        LFID,
                        tabName,
                        tabName_CN,
                        isParentDoc,
                        url,
                    }
                    fun.insertT2B2(data);
                    fun.bindTabsFun(data);
                };
                let data = {
                    LFID,
                    tabName,
                    isParentDoc,
                };
                fun.showT2B2(data);
                let data1 = {
                    LFDep_CN,
                    LFID_CN,
                    tabName_CN,
                    isParentDoc,
                };
                fun.changePosition(data1);

                /**请求数据并填写到页面上 */
                let JGM = require("app/jsGridMethods");
                let data2 = {
                    url:getUrl,
                    data:{},
                    field:getDataName
                }
                data2.data[field] = keyValue;
                console.log("this is data");``
                console.log(data2);
                console.log("this is getThisPageTabStatus");
                console.log(fun.getThisPageTabStatus());
           
                parent.window.changeInfo[LFIDAndTabNames].fieldVal = keyValue;
                
            });

        },
        getLeftBarStatus:function(){
            /**获取当前左导航状态 */
            let LFDep_CN = $(`iframe[name="leftBar1"]`,parent.document).contents().find(".leftBarFrame a[hover1='1']").parent().parent().find(".LFDep_CN").text();
            let LFID_CN = $(`iframe[name="leftBar1"]`,parent.document).contents().find(".leftBarFrame a[hover1='1']").text();
            let LFID_url = $(`iframe[name="leftBar1"]`,parent.document).contents().find(".leftBarFrame a[hover1='1']").attr("url");
            let LFID = PKG.get.urlFromStr(LFID_url);
            let json = {
                LFDep_CN,
                LFID_CN,
                LFID
            }
            return json;
        },
        getThisPageTabStatus:function(){
            /**获取当前页签状态 */
            let LFID = $(`.tabs>div[isshow="yes"]`,parent.document).attr("LFID");
            let tabName = $(`.tabs>div[isshow="yes"]>div[isFocus="yes"]`,parent.document).attr("tabName");
            let json = {
                tabName,
                LFID
            }
            return json;
        },
        getCase:function(data){
            data == undefined?data = "":data = data;
            /**返回带有字段的input和select的状态 */
            let json = {};
            $(data.add+" input[field]").each(function(){
                let field = $(this).attr("field");
                let val = $(this).val();
                json[field] = val;
            });
            $(data.add+" select[field]").each(function(){
                let field = $(this).attr("field");
                let val = $(this).find("option:selected").val();
                json[field] = val;
            });
            $(data.add+" textarea[field]").each(function(){
                let field = $(this).attr("field");
                let val = $(this).val();
                console.log(val)
                json[field] = val;
            });
            console.log(json)
            return json;
        },
        getInfoInCase:function(data){
            let JGM = require("app/jsGridMethods");
            let LFID = data.LFID;
            let tabName = data.tabName;
            let to = LFID + tabName;
            let JSGridConfig = parent.window.JGConfig[to];
            $(data.button).click(function(){
                let da = fun.getCase(data);
                console.log(da)
                JSGridConfig.data = da;
                JSGridConfig.data.page = 1;
                JGM.getInfo(JSGridConfig);
            });
        },
        searchTips:function(data){
            $(data.add).find(`input[field]`).attr("null","false");
            $(data.add).find(`textarea[field]`).attr("null","false");
            $.each(data.body,function(i,e){
                $(data.add).find(`*[field="${e}"]`).attr("null","true");
            });
            console.log(data.body);
            if(data.body.length > 0){
                return false;
            }else{
                return true;
            }
        }
    }
    return fun;
});



