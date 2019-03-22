define([
    'require',
    "jquery",
], function(
        require,
        $,
    ) {
    'use strict';
    
   let fun = {
        changePageJSPost:function (data){
                // 如何处理请求？  参数：1、页数，2、数据类型
                // 1.处理默认数据
                // 2.根据参数请求特定数据、
                console.log("CP_changePageJSPost is ");
                console.log(data);
                let LFID = data.LFID;
                let tabName = data.tabName;
                let LTIndex = LFID + tabName;
                let JGConfig = parent.window.JGConfig[LTIndex];
                let fields = JGConfig.fields;
                let getUrl = JGConfig.url;
                let page = data.page;

                let TBF = require("app/tabsFunctions");
                /**获得当前搜索条件状态 */
                let searchJson = {
                    add:".bodyFrame1-main",
                };
                // TBF.getCase(searchJson); 

                let searchRes = TBF.getCase(searchJson);
                console.log("searchRes is ")
                console.log(searchRes); 
                /**此处获得的是搜索条件，下面开始判断，如果是非0，则带搜索条件继续搜索 */

                if(page != "0"){
                    /**代表分页事件请求 */
                    let data = {
                        page,
                    };
                    data = $.extend(data, searchRes);
                    let json = {
                        LFID,
                        tabName,
                        url:getUrl,
                        page,
                        data,
                        fields,
                    };
                    console.log("this is CP_ pageValue");
                    console.log(page);
                    let JGM = require("app/jsGridMethods");
                    JGM.getInfo(json);

                }else{
                    /**代表默认请求 */
                    /**此处应为请求数据添加 */
                }
                
                /**此处代码块作用，用来临时赋值。默认 容器为undefined，请求到数据时为其赋值（其他模块），生命周期开始时，此代码块在此不断询问目标对象书否为undefined，是则等待一会继续询问，直到不为undefined（别的模块已赋值），此时取出数据，使用完后再设置undefined，生命周期结束。 */
                let IPCB = setInterval(function(){//每隔Nms去判断  是否被申明，是则取消循环，输出
                    try {
                        if(parent.window.JGData[LTIndex] != undefined){
                            clearInterval(IPCB);
                            let JGData = parent.window.JGData[LTIndex];
                            let totalCount = JGData.totalCount;
                            let totalPage = JGData.totalPage;
                            let currentPage = JGData.currentPage;
                            // let dataList = JGData.dataList;
                            var pagesInfo = {
                                "count":totalCount,
                                "page":totalPage,
                                "thisPage":currentPage,
                                LFID,
                                tabName,
                            }
                            fun.addChangePageMore(pagesInfo);
                            parent.window.JGData[LTIndex] = undefined;
                        }
                    } catch (error) {console.log("Error! window.JGData")}
                }, 80);

        },
        changePageJS:function(data){
            let LFID = data.LFID;
            let tabName = data.tabName;

            // (先解绑,因为此函数会被多次调用)
            // 直接点击 页面数字的 事件
            $("#changePage .pages li").off("click");
            $("#changePage .pages li").click(function(e){
                // var a = $(this).text();
                //所点击的li pages属性（所点击的是第几页）
                var b = $(this).attr("pages");
                let json = {
                    LFID,
                    tabName,
                    page:b,
                }
                fun.changePageJSPost(json);
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
                    let json = {
                        LFID,
                        tabName,
                        page:b,
                    }
                    fun.changePageJSPost(json);
                }else{
                    // console.log("pageDown");
                    let b = 1;
                    thisPage < pages ? b = thisPage +1:b = 1;
                    let json = {
                        LFID,
                        tabName,
                        page:b,
                    }
                    fun.changePageJSPost(json);
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
             let LFID = a.LFID;
             let tabName = a.tabName;
             let page = a.page;
             console.log("this is CP_addChangePageMore!")
             console.log(a);
            //共多少记录
            var allPages = a.count;
            allPages == undefined ? allPages = 1: allPages = allPages;
            //十位向上取整计算需要显示多少页
            var pgs = a.page;
            //当前是第几页
            var thisPage = parseInt(a.thisPage);
            /**验证thisPage不为NaN */
            thisPage != thisPage ? thisPage =1 : thisPage = thisPage;
            console.log("thisPage is ")
            console.log(thisPage)
            //本页应为多少条
                //1.检测当前是第几页。2.最后一页则取个位，否则取整
            var b = "";
            // thisPage < pgs ? b = "1-5": b = "1-"+ (allPages - (thisPage -1)*5 );
                $("#changePage .title1").attr("pages",pgs).attr("allPage",allPages);
                $("#changePage .title1").html(`
                        共有 <b style="color:#A60427">${allPages}</b> 个记录 ,  ${thisPage}/${pgs}页
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
            let data = {
                LFID,
                tabName,
            }
            fun.changePageJS(data);
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
