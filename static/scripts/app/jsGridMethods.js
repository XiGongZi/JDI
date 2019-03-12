define([
    'require',
    "jquery",
    "lib/jsgrid/jsgrid",
    "app/changePage"
], function(
        require,
        $,
        jsGrid,
        CP,
    ) {
    'use strict';
   let fun = {
        changeForm:function(data){
            let arr = [];
            let obj1 = {};
            $.each(data.fields,function(i,j){
                if(j.PreName != undefined){
                    obj1[j.PreName] = j.name
                }
            });
            $.each(data.dataList,function(i,e){
                let obj = {};
                $.each(e,function(j,k){
                    obj[obj1[j]] = k;
                });
                    arr.push(obj)
            });
            console.log(arr)
            return arr;
        },
        changeForm2:function(data){
            let value = null;
            let value2 = {};
            value2.fields = data.fields;
            value2.dataList= data.dataList;
            value = fun.changeForm(value2);
            data.dataList= value;
            fun.useTable_addInfo(data);
        },
        getInfo:function(json){
            $.ajax({
                type: 'post',
                url: json.url,
                data: json.data,
                cache: false,
                dataType: "json",
                success: function(data){
                    if(data.resultFlag){
                        console.log(data)
                        json.dataList = data.dataList 
                        // json.count = data.totalPage;
                        json.count = "6";
                        json.page = "1";
                        fun.changeForm2(json);
                    }else{
                        console.log("0.0");
                    }
                    // useTable_addInfo(JSON.parse(data));
                },
                error:function(){
                    try {
                        console.log("请求失败")
                    }catch(e){
                    }
                }
            });
        },
        deleteInfo:function(json){
            $.ajax({
                type: 'post',
                url: json.url,
                data: json.data,
                cache: false,
                dataType: "json",
                success: function(data){
                    if(data.resultFlag){
                        console.table(data);
                    }else{
                        console.log("0.0");
                    }
                },
                error:function(){
                    try {
                        console.log("请求失败")
                    }catch(e){
                    }
                }
            });
            console.log("deleted");
        },
        addInfo:function(json){
            $.ajax({
                type: 'post',
                url: json.url,
                data: json.data,
                cache: false,
                dataType: "json",
                success: function(data){
                    if(data.resultFlag){
                        console.table(data);
                    }else{
                        console.log("0.0");
                    }
                },
                error:function(){
                    try {
                        console.log("请求失败");
                    }catch(e){
                    }
                }
            });
            console.log("deleted");
        },
        useTable_addInfo:function(json){
            //表内容
            let dataInfo = json.dataList;
            let fields = json.fields;
            let LFID = json.LFID;
            let tabName = json.tabName;
            let funName = LFID + tabName;
            // var dataInfo = useTable_addInfo_changeForm(json.managerList);
            // 填入页数信息   json.pagesInfo 为页数信息
            let pagesInfo = {
                "count":json.count,
                "page":json.page,
                "urlGet":json.urlGet,
            }
            let CP = require("app/changePage");
            CP.show(pagesInfo);
            console.log(pagesInfo)
            //填入表内容、表相关配置、相关元素事件
            var jsGridInfo = {
                heading:true,
                // dataName:"各种离子浓度表",
                width: "100%",
                height: "600px",
                align:"center",
                autoload: false,
                inserting: true,
                sorting: true,
                paging: true,
                visible:true,
                data: dataInfo,//表内容
                editing:false,//是否可编辑
                pgbuttons:true,
                search:true,
                deleteConfirm: "确定删除吗？",
                required:true,
                fields,
            }
            $("#jsGrid").jsGrid(jsGridInfo);
            console.log(parent.window.JGConfig)
            parent.window.JGConfig[funName].funs();
        },
   }
   return fun;
});



