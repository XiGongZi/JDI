define([
    'require',
    "app/PKG_0.0.1",
    "jquery",
    "work/public/bodyFrame/c/main",
    "lib/jsgrid/jsgrid",
    "app/clearOrMore",
], function(
        require,
        PKG,
        $,
        bodyFrame,
        jsGrid,
        COM
    ) {
    'use strict';
// 关于顶部选项卡
// table
//changePages   分页JS
//处理 请求
// 分页
changePageJSPost(1);
function changePageJSPost(page){
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


        
        var exam = {
            "count":"10",
            "page":"1",
            "managerList":[{
                "proNum":"YS123",
                "proName":"zb2312",
                "proAdd":"张XX",
                "AName":"2015-12-21",
            }]
        } ;
        useTable_addInfo(exam);
}
// 修改单条数据
function changeInfoJSPost(json){
    // 如何处理请求？  参数：1、页数，2、数据类型
        // 1.处理默认数据
        // 2.根据参数请求特定数据

        var str = "managerId=" + json.managerId 
                + "&loginId=" + json.loginId 
                + "&loginNick=" + json.loginNick 
                + "&roleId=" + json.roleId
                + "&addTime=" + json.addTime;
        $.ajax({
            type: 'POST',
            url: ctx + '/managerUpdate.html',
            data:str,
            processData: false,
            success: function(data){
                if(data.success){
                   alert("已成功修改数据");
                   changePageJSPost(1);
                //    window.location.href="sampleList.jsp";
                window.location.reload();
                }else{
                    alert(data.errorMsg);
                }
            },
            dataType: 'json'
          });
}
// 删除单条数据
function deleteInfoJSPost(json){
    // 如何处理请求？  参数：1、页数，2、数据类型
        // 1.处理默认数据
        // 2.根据参数请求特定数据
        $.ajax({
            type: 'POST',
            url: ctx + '/managerDelete.html',
            data:{'managerId':json},
            success: function(data){
                // console.log(data)
                if(data.success){
                    alert("已删除ID号为:"+json+"的数据");
                    changePageJSPost(1);
                }else{
                	alert(data.errorMsg);
                }
                // window.location.reload();
            },
            dataType: 'json'
          });
}
function changePageJS(){
    // (先解绑,因为此函数会被多次调用)
    // 直接点击 页面数字的 事件
    $("#changePage .pages li").off("click");
    $("#changePage .pages li").click(function(e){

        // var a = $(this).text();
        //所点击的li pages属性（所点击的是第几页）
        var b = $(this).attr("pages");
        changePageJSPost(b);
        //测试结束  点击页数按钮时改变
    });
    // 点击 跳转到第几页 事件
    $("#changePage .jumpToPage").off("click");  
    $("#changePage .jumpToPage").click(function(){
        //   分页JS  跳转按钮点击事件
        // 1.检测input内容是否合法
            //1.检测是否为数字
        var zhi = parseInt($("#changePage .input input").val());
                        //2.检测是否有这页    (先从有多少条记录中取余出来，后可直接传值)
                    var zhi1 = parseInt($("#changePage .title1").attr("pages")) ;
                    // 总共多少条记录
                    var all = parseInt($("#changePage .title1").attr("allPage"));
                    // console.log(zhi1);
                    // console.log("/////////");
                    if (zhi != NaN && zhi <= zhi1 && zhi > 0){
        }else if(zhi == 0){
            //如果为0
        }
    });
    //点击 上一页下一页 事件
    $("#changePage .turn").off("click");
    $("#changePage .turn").click(function(){
        // 判断点击的是上一页还是下一页
        var zhi = $(this).hasClass("Left");
        // 总共多少条记录
        var all = parseInt($("#changePage .title1").attr("allPage"));
        // 获取当前总页数
        var pages = parseInt($("#changePage .title1").attr("pages"));
        // 获取当前选中页数
        var thisPage = parseInt($("#changePage .pages .checkedStau").attr("pages"));
        // console.log(thisPage);
        if(zhi){
            // console.log("pageUp");
            let b = 1;
            thisPage > 1 ? b = thisPage -1:b = pages;
            changePageJSPost(b);
        }else{
            // console.log("pageDown");
            let b = 1;
            thisPage < pages ? b = thisPage +1:b = 1;
            changePageJSPost(b);
        }
    });
}
function addChangePageMoreClickTest(a){//  addChangePageMore(a) 函数测试开始 
    var example = {
        "pagesInfo":{//页数信息
            "count":"77",//总共多少条记录
            "page":a,//当前第几页
        }
    }
    addChangePageMore(example.pagesInfo);
    //  addChangePageMore(a) 函数测试结束}
}
// addChangePageMoreClickTest(1);
//处理翻页显示(默认第一页)
function addChangePageMore_001(thisPage){
    $("#changePage .pages").html(`
        <li pages="1" class="floatLeft elipsis">...</li>
        <li pages="${thisPage - 1}" class="floatLeft">${thisPage - 1}</li>
        <li pages="${thisPage}" class="floatLeft">${thisPage}</li>
        <li pages="${thisPage+1}" class="floatLeft">${thisPage+1}</li>
        <li pages="0" class="floatLeft elipsis">...</li>
    `);
}
function addChangePageMore_002(pgs){
    $("#changePage .pages").html(`
        <li pages="1" class="floatLeft ">1</li>
        <li pages="2" class="floatLeft ">2</li>
        <li pages="3" class="floatLeft">3</li>
        <li pages="0" class="floatLeft  elipsis">...</li>
        <li pages="${pgs}" class="floatLeft ">${pgs}</li>
    `);
}
function addChangePageMore_003(pgs){
    $("#changePage .pages").html(`
        <li pages="1" class="floatLeft ">1</li>
        <li pages="0" class="floatLeft elipsis">...</li>
        <li pages="${pgs-2}" class="floatLeft ">${pgs-2}</li>
        <li pages="${pgs-1}" class="floatLeft ">${pgs-1}</li>
        <li pages="${pgs}" class="floatLeft ">${pgs}</li>
    `);
}
function addChangePageMore(a){
    //共多少记录
    var allPages = a.count;
    allPages == undefined ? allPages = 1: allPages = allPages;
    //十位向上取整计算需要显示多少页
    var pgs = Math.ceil(allPages/10);
    //当前是第几页
    var thisPage = parseInt(a.page);
    thisPage != thisPage ? thisPage =1 : thisPage = thisPage;
    //本页应为多少条
        //1.检测当前是第几页。2.最后一页则取个位，否则取整
    var b = "";
    thisPage < pgs ? b = "1-10": b = "1-"+ (allPages - (thisPage -1)*10 );
    $("#changePage .title1").attr("pages",pgs).attr("allPage",allPages);
    $("#changePage .title1").html(`
    共有 <b style="color:#A60427">${allPages}</b> 个记录  每页显示10条，本页${b}条 ${thisPage}/${pgs}页
    `);
    //填充页数小方块
        //1.判断总页数是否大于5
        if(pgs > 5){
            //是  中间用省略号
                //根据当前第几页，用算法算排布
                // 必要信息： 1.总页数 （6） 2.当前页数（3）
            // 思路：
                //
                /*
                    1.判断省略号是否小于2，
                        是则 三种情况
                            1.空
                                置 1 2 3 ... n
                            2.显示  1 2 3 ... n
                                通过 当前页判断，2或3则进入状态2，n则 置 1 ... n-2 n-1 n
                            3.显示  1 ... n-2 n-1 n
                                通过 当前页判断，n-2 或 n-1则进入状态2，1则 置 1 2 3 ... n
                        否则 判断 当前页(所点击的页面)情况
                            判断 当前页
                                当前页 小于等于3，置  1 2 3 ... n
                                当前页 大于n-2置  1 ... n-2 n-1 n
                                都不满足  当前页取中间，置  ... n-1 n n+1 ...
                    2.省略号大于1 ，说明 是  … 3 4 5 … 这种形式，则判断
                */
                // console.log(pgs);
            if($("#changePage .pages .elipsis").length > 1){
                    if(thisPage < 4){
                        //形式  1 2 3 ... n
                        addChangePageMore_002(pgs);
                    }else if(thisPage >= (pgs-2)){
                       //形式  1 ... n-2 n-1 n
                       addChangePageMore_003(pgs);
                    }else{
                        //形式  ... n-1 n n+1 ...
                        addChangePageMore_001(thisPage);
                    }
            }else{
                //省略号小于2
                // zhi1 为index值位置，值为 1 3 -1
                var zhi1 =  $("#changePage .pages .elipsis").index();
                // console.log(zhi1);
                
                 if (zhi1 == 3){
                     if(thisPage == 3 || (thisPage > 3 && thisPage < pgs -1)){
                        //形式  ... n-1 n n+1 ...
                        addChangePageMore_001(thisPage);
                     }else if(thisPage == pgs || thisPage == pgs -1){
                        //形式  1 ... n-2 n-1 n
                        addChangePageMore_003(pgs);
                     }else {
                         //形式  1 2 3 ... n
                        addChangePageMore_002(pgs);
                     }
                 }else if( zhi1 == 1){
                    if(thisPage == pgs-2 || (thisPage > 3 && thisPage < pgs -1)){
                        //形式  ... n-1 n n+1 ...
                        addChangePageMore_001(thisPage);
                     }else if(thisPage == 1 || thisPage == 2){
                        //形式  1 2 3 ... n
                        addChangePageMore_002(pgs);
                     }else{
                         //形式  1 ... n-2 n-1 n
                        addChangePageMore_003(pgs);
                     }
                 }else{
                    //形式  1 2 3 ... n
                    addChangePageMore_002(pgs);
                 }
            }
        }else{
            // console.log(pgs);
            //否  罗列
            var str = "";
            //li 里的 pages ：为当前页。最高值为 pgs 。
            for(var i = 0;i <= pgs-1;i++){
                str += `<li pages="${i+1}" class="floatLeft">${i+1}</li>`;
            }
            // 填充进入dom
            $("#changePage .pages").html(str);
        }
        //2.大于5，绑定点击事件
    //给所点击的填充颜色
    $("#changePage .pages li").removeClass("checkedStau");
    $("#changePage .pages li[pages='"+thisPage+"']").addClass("checkedStau");
    //changePagesJS 绑定事件(先解绑,因为此函数会被多次调用)
    changePageJS();
}
function useTable_addInfo(json){
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
            { name: "预算单号", type: "number", readOnly: true, width:50,  },
            { name: "总包合同号", type: "text", width:100,  },
            { name: "制单人", type: "text", width:100,  },
            { name: "制单时间", type: "text", width:100,  },

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
        console.log(zhi3);
        $("#changePage").css("top",zhi3);
    }

    
}
//返回点击的当前按钮同行数据（发给后台） 使用此函数时务必保证是td下有input的状态
function returnObj(elem){
    var obj = {};
    obj.managerId = $(elem).parents("tr").find("input").eq(0).val();
    obj.loginId = $(elem).parents("tr").find("input").eq(1).val();
    obj.loginNick = $(elem).parents("tr").find("input").eq(2).val();
    obj.roleId = $(elem).parents("tr").find("input").eq(3).val();
    obj.addTime = $(elem).parents("tr").find("input").eq(4).val();
    // console.log(obj)
    return obj;
}

//对后台传过来的数据进行转码（给jsgrid使用）
function useTable_addInfo_changeForm(json){
    var arr = [];
    var a = "预算单号",
        b = "总包合同号",
        a1 = "制单人",
        a2 = "制单时间";
    $.each(json,function(i,n){
        var obj ={};
        obj[a] = n.proNum;
        obj[b] = n.proName;
        obj[a1] = n.proAdd;
        obj[a2] = n.AName;
        arr.push(obj);
    });
    return arr;
}

});

