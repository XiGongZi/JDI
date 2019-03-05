define([
    'require',
    "jquery",
], function(
        require,
        $,
    ) {
    'use strict';
   let fun = {
        changePageJSPost:function(){
             // 如何处理请求？  参数：1、页数，2、数据类型
            // 1.处理默认数据
            // 2.根据参数请求特定数据
            // $.ajax({
            //     type: 'POST',
            //     url: ctx + '/managerList.html',
            //     data: {'page':page},
            //     cache: false,
            //     success: function(data){
            //         // 获取最大页
            //         maxPage = data.maxPage;
            //         // alert(maxPage);
            //         // 遍历样品数据
                
            //         // useTable_addInfo(JSON.parse(data));
            //     }
            // });

            // var arr = [];
            // var a = "合同编号",
            //     b = "项目名称",
            //     a1 = "项目地址",
            //     a2 = "甲方名称",
            //     a3 = "合同额",
            //     a4 = "税率",
            //     a5 = "项目负责人",
            //     a6 = "状态",;
            // $.each(json,function(i,n){
            //     var obj ={};
            //     obj[a] = n.proNum;
            //     obj[b] = n.proName;
            //     obj[a1] = n.proAdd;
            //     obj[a2] = n.AName,
            //     obj[a3] = n.a3,
            //     obj[a4] = n.a4,
            //     obj[a5] = n.a5,
            //     obj[a6] = n.a6;
            var exam = {
                "count":"10",
                "page":"1",
                "managerList":[{
                    "proNum":"x1223312",
                    "proName":"xx桥梁建设总合同",
                    "proAdd":"沈阳市测试三好街",
                    "AName":"沈阳市交通设计院",
                    "a3":"10.000.000",
                    "a4":"10%",
                    "a5":"张三",
                    "a6":"竣工"
                }]
            } ;
            fun.useTable_addInfo(exam);
        },
        useTable_addInfo:function(json){
            // console.log(typeof(json));
            //表内容
            var dataInfo = useTable_addInfo_changeForm(json.managerList);
            // 填入页数信息   json.pagesInfo 为页数信息
            var pagesInfo = {
                "count":json.count,
                "page":json.page,
            }
            // console.log(pagesInfo);
            addChangePageMore(pagesInfo);
            // console.log(pgs);
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
                fields: [
                    { name: "合同编号", type: "number", readOnly: true, width:50,  },
                    { name: "项目名称", type: "text", width:100,  },
                    { name: "项目地址", type: "text", width:100,  },
                    { name: "甲方名称", type: "text", width:100,  },
                    { name: "合同额", type: "text", width:60,  },
                    { name: "税率", type: "text", width:30,  },
                    { name: "项目负责人", type: "text", width:50,  },
                    { name: "状态", type: "text", width:30,  },
                    // { type: "control" },
                    {
                            type: "control",width:70,
                            // modeSwitchButton: false,
                            // deleteButton:false,
                            // editButton: true,
                            // headerTemplate: function() {
                            //     return $("<button>").attr("type", "button").addClass("trTitleButton").attr("zhi",1).html("编辑").on("click", function () {
                            //                 //点击事件：获取当前元素的zhi值，并以此来决定一些功能的转换
                            //                     $("#jsGrid").jsGrid({
                            //                         //列表可编辑状态：非
                            //                         editing:false,
                            //                     });
                            //                     //其余功能必须在此代码块后面写，否则不生效！！！
                            //                     // ----分割线----
                            //                     //改文字（状态）
                            //                     $(".trTitleButton").html("编辑");
                            //                     // 改样式
                            //                     $(".trTitleButton").attr("zhi",1);
                            //         });
                            // },
                        }
                ]
            }

            $("#jsGrid").jsGrid(jsGridInfo);
            $(".jsgrid-insert-button").off("click");
            //自定义 绑定事件(非原生)
            // 删
            $(".jsgrid-delete-button").off("click");
            $(".jsgrid-delete-button").click(function(){
                var sampleId = $(this).parents("tr").find("td").eq(0).text();
                deleteInfoJSPost(sampleId);
            });
            //改
            $(".jsgrid-edit-button").click(function(){
                // //获取id
                var a =  $(this).parents("tr").find("td").eq(0).text();
                window.location.href = ctx +"/managerSave.jsp?managerId="+a;
                
                // managerSave.html
            });
            $(".jsgrid-insert-mode-button").off("click");
            $(".jsgrid-insert-mode-button").on("click",function(){
                window.location.href = ctx +"/managerSave.jsp";
            });
            if ( $("#jsGrid").html() != null ){
                //调分页的高度
                var zhi1 = $("#jsGrid").offset().top;
                var zhi2 = $("#jsGrid").height();
                var zhi3 = zhi1 + zhi2 - 60;
                // console.log(zhi3);
                $("#changePage").css("top",zhi3);
            }

            
        },
        //对后台传过来的数据进行转码（给jsgrid使用）
        useTable_addInfo_changeForm:function (json){
            var arr = [];
            var a = "合同编号",
                b = "项目名称",
                a1 = "项目地址",
                a2 = "甲方名称",
                a3 = "合同额",
                a4 = "税率",
                a5 = "项目负责人",
                a6 = "状态";
            $.each(json,function(i,n){
                var obj ={};
                obj[a] = n.proNum;
                obj[b] = n.proName;
                obj[a1] = n.proAdd;
                obj[a2] = n.AName,
                obj[a3] = n.a3,
                obj[a4] = n.a4,
                obj[a5] = n.a5,
                obj[a6] = n.a6;
                arr.push(obj);
            });
            return arr;
        },
   }

});



