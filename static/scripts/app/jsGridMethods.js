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
            return arr;
        },
        changeForm2:function(data){
            console.log(data)
            let value = null;
            let value2 = {};
            value2.fields = data.fields;
            value2.dataList= data.dataList;
            value = fun.changeForm(value2);
            console.log(value)
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
                        json.dataList = data.dataList 
                        fun.changeForm2(json);
                        console.table(data.dataList);
                    }else{
                        console.log("0.0");
                    }
                    // useTable_addInfo(JSON.parse(data));
                },
                error:function(){
                    try {
                        console.log("请求失败")
                    }catch(e){
                        console.log("请求失败!!!!!!")
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
                        json.dataList = data.dataList 
                        fun.changeForm2(json);
                        console.table(data.dataList);
                    }else{
                        console.log("0.0");
                    }
                    // useTable_addInfo(JSON.parse(data));
                },
                error:function(){
                    try {
                        console.log("请求失败")
                    }catch(e){
                        console.log("请求失败!!!!!!")
                    }
                }
            });
            console.log("deleted");
        },
        useTable_addInfo:function(json){
            // console.log(typeof(json));
            //表内容
            console.log(json)
            let dataInfo = json.dataList;
            let fields = json.fields;
            // var dataInfo = useTable_addInfo_changeForm(json.managerList);
            // 填入页数信息   json.pagesInfo 为页数信息
            let pagesInfo = {
                "count":json.count,
                "page":json.page,
            }
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
            json.fun();
        },

   }
   return fun;
});



