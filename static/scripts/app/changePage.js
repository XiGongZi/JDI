define([
    'require',
    "jquery",
    "app/jsGridMethods",
], function(
        require,
        $,
        JGM,
    ) {
    'use strict';
   let fun = {
            // /**fun_1 */
            // getInfo:function(data){
            //     let LFID = data.LFID;
            //     let tabName = data.tabName;
            //     let LFIDAndTabName = LFID + tabName;
            //     let page = data.page;
            //     // 1.获取当前页名
            //     let str = LFIDAndTabName+"JGConfig";

            //     let body = JSON.parse(sessionStorage.getItem(str));
            //     body.data.page = page;
            //     let jgg = require("app/jsGridMethods");
            //     jgg.getInfo(body);
            // },
            // /** 输入 page 、 count       根据page请求 更新相应界面，同时控制动画效果。 */
            // show:function(data){
            //     let page = Number(data.page);
            //     let count = Number(data.count);
            //     let urlGet = data.urlGet;
            //     $("#changePage .title1").html(`
            //         共有 <b style="color: #A60427" class="showTotalPage">${count}</b> 页记录 每页显示5条 ${page}/${count}页
            //     `);
            //     let liList = $(`#changePage .pages li`).length; 
            //     if(liList == 0){
            //         /**如果liList直接子元素为0 */
            //         //否  罗列
            //         var str = "";
            //         //li 里的 pages ：为当前页。最高值为 pgs 。
            //         for(var i = 0;i <= count-1;i++){
            //             str += `<li pages="${i+1}" class="floatLeft" isFocus="no" isHide="no">${i+1}</li>`;
            //         }
            //         // 填充进入dom
            //         $("#changePage .pages").html(str);
            //         $(`#changePage .pages li[pages="1"]`).attr("isFocus","yes");
            //         /**点击事件 */
            //         $("#changePage .pages li").click(function(e){
            //             /**重新focus */
            //             $(`#changePage .pages li`).attr("isFocus","no");
            //             $(this).attr("isFocus","yes");
            //             let thisPage = $(this).attr("pages");
            //             if(count >5){
            //                 /**总页数大于5才有动画 */
            //                 if(thisPage > 2 && thisPage < (count - 1)){
            //                     $(`#changePage .pages li[pages="${thisPage - 2}"]`).attr("isHide","yes");
            //                 }
            //             }
                        
            //             // fun.showTabClick(e);
            //         });
            //     }else{
            //         /**如果liList直接子元素不为0 */
            //         console.log(22222);
            //     }
            // },
            // showAnimai:function(){

            // },
            // showTabClick:function(data){
            //     // console.log(data)
                
            // },
        changePageJSPost:function (data){
            // 如何处理请求？  参数：1、页数，2、数据类型
                // 1.处理默认数据
                // 2.根据参数请求特定数据
                let LFID = data.LFID;
                let tabName = data.tabName;
                let LTIndex = LFID + tabName;
                let JGConfig = parent.window.JGConfig[LTIndex];
                let url = JGConfig.url;
                let page = data.page;

                /**获得当前搜索条件状态 */

                let searchJson = {
                    add:".bodyFrame1-main",
                };
                TBF.getCase(searchJson); 
                
                // let searchRes = TBF.getCase(searchJson); 
                // searchRes.page = page;


                // let getInfoJson = {
                //     url,
                //     data:searchRes
                // }
                // JGM.getInfo(getInfoJson);




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
                        "proAdd":"沈阳市三好街",
                        "AName":"沈阳市交通设计院",
                        "a3":"10.000.000",
                        "a4":"10%",
                        "a5":"张三",
                        "a6":"竣工"
                    }]
                } ;
                fun.useTable_addInfo(exam);
        },
        changePageJS:function(){
            // (先解绑,因为此函数会被多次调用)
            // 直接点击 页面数字的 事件
            $("#changePage .pages li").off("click");
            $("#changePage .pages li").click(function(e){
                // var a = $(this).text();
                //所点击的li pages属性（所点击的是第几页）
                var b = $(this).attr("pages");
                fun.changePageJSPost(b);
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
                    fun.changePageJSPost(b);
                }else{
                    // console.log("pageDown");
                    let b = 1;
                    thisPage < pages ? b = thisPage +1:b = 1;
                    fun.changePageJSPost(b);
                }
            });
        },
         addChangePageMoreClickTest:function(a){//  addChangePageMore(a) 函数测试开始 
            var example = {
                "pagesInfo":{//页数信息
                    "count":"77",//总共多少条记录
                    "page":a,//当前第几页
                }
            }
            fun.addChangePageMore(example.pagesInfo);
            //  addChangePageMore(a) 函数测试结束}
        },
        // addChangePageMoreClickTest(1);
        //处理翻页显示(默认第一页)
         addChangePageMore_001:function(thisPage){
            $("#changePage .pages").html(`
                <li pages="1" class="floatLeft elipsis">...</li>
                <li pages="${thisPage - 1}" class="floatLeft">${thisPage - 1}</li>
                <li pages="${thisPage}" class="floatLeft">${thisPage}</li>
                <li pages="${thisPage+1}" class="floatLeft">${thisPage+1}</li>
                <li pages="0" class="floatLeft elipsis">...</li>
            `);
        },
         addChangePageMore_002:function(pgs){
            $("#changePage .pages").html(`
                <li pages="1" class="floatLeft ">1</li>
                <li pages="2" class="floatLeft ">2</li>
                <li pages="3" class="floatLeft">3</li>
                <li pages="0" class="floatLeft  elipsis">...</li>
                <li pages="${pgs}" class="floatLeft ">${pgs}</li>
            `);
        },
         addChangePageMore_003:function(pgs){
            $("#changePage .pages").html(`
                <li pages="1" class="floatLeft ">1</li>
                <li pages="0" class="floatLeft elipsis">...</li>
                <li pages="${pgs-2}" class="floatLeft ">${pgs-2}</li>
                <li pages="${pgs-1}" class="floatLeft ">${pgs-1}</li>
                <li pages="${pgs}" class="floatLeft ">${pgs}</li>
            `);
        },
         addChangePageMore:function(a){
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
                                fun.addChangePageMore_002(pgs);
                            }else if(thisPage >= (pgs-2)){
                            //形式  1 ... n-2 n-1 n
                            fun.addChangePageMore_003(pgs);
                            }else{
                                //形式  ... n-1 n n+1 ...
                                fun.addChangePageMore_001(thisPage);
                            }
                    }else{
                        //省略号小于2
                        // zhi1 为index值位置，值为 1 3 -1
                        var zhi1 =  $("#changePage .pages .elipsis").index();
                        // console.log(zhi1);
                        
                        if (zhi1 == 3){
                            if(thisPage == 3 || (thisPage > 3 && thisPage < pgs -1)){
                                //形式  ... n-1 n n+1 ...
                                fun.addChangePageMore_001(thisPage);
                            }else if(thisPage == pgs || thisPage == pgs -1){
                                //形式  1 ... n-2 n-1 n
                                fun.addChangePageMore_003(pgs);
                            }else {
                                //形式  1 2 3 ... n
                                fun.addChangePageMore_002(pgs);
                            }
                        }else if( zhi1 == 1){
                            if(thisPage == pgs-2 || (thisPage > 3 && thisPage < pgs -1)){
                                //形式  ... n-1 n n+1 ...
                                fun.addChangePageMore_001(thisPage);
                            }else if(thisPage == 1 || thisPage == 2){
                                //形式  1 2 3 ... n
                                fun.addChangePageMore_002(pgs);
                            }else{
                                //形式  1 ... n-2 n-1 n
                                fun.addChangePageMore_003(pgs);
                            }
                        }else{
                            //形式  1 2 3 ... n
                            fun.addChangePageMore_002(pgs);
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
            fun.changePageJS();
        },
         useTable_addInfo:function(json){
            // 填入页数信息   json.pagesInfo 为页数信息
            var pagesInfo = {
                "count":json.count,
                "page":json.page,
            }
            fun.addChangePageMore(pagesInfo);
        }

           
   }
   return fun;
});
