define([
    'require',
    "jquery",
], function(
        require,
        $,
        jsGrid,
    ) {
    'use strict';
   let fun = {
            changePageJS:function (){
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
            },
            addChangePageMoreClickTest:function (a){//  addChangePageMore(a) 函数测试开始 
                var example = {
                    "pagesInfo":{//页数信息
                        "count":"77",//总共多少条记录
                        "page":a,//当前第几页
                    }
                }
                addChangePageMore(example.pagesInfo);
                //  addChangePageMore(a) 函数测试结束}
            },
            // addChangePageMoreClickTest(1);
            //处理翻页显示(默认第一页)
            addChangePageMore_001:function (thisPage){
                $("#changePage .pages").html(`
                    <li pages="1" class="floatLeft elipsis">...</li>
                    <li pages="${thisPage - 1}" class="floatLeft">${thisPage - 1}</li>
                    <li pages="${thisPage}" class="floatLeft">${thisPage}</li>
                    <li pages="${thisPage+1}" class="floatLeft">${thisPage+1}</li>
                    <li pages="0" class="floatLeft elipsis">...</li>
                `);
            },
            addChangePageMore_002:function (pgs){
                $("#changePage .pages").html(`
                    <li pages="1" class="floatLeft ">1</li>
                    <li pages="2" class="floatLeft ">2</li>
                    <li pages="3" class="floatLeft">3</li>
                    <li pages="0" class="floatLeft  elipsis">...</li>
                    <li pages="${pgs}" class="floatLeft ">${pgs}</li>
                `);
            },
            addChangePageMore_003:function (pgs){
                $("#changePage .pages").html(`
                    <li pages="1" class="floatLeft ">1</li>
                    <li pages="0" class="floatLeft elipsis">...</li>
                    <li pages="${pgs-2}" class="floatLeft ">${pgs-2}</li>
                    <li pages="${pgs-1}" class="floatLeft ">${pgs-1}</li>
                    <li pages="${pgs}" class="floatLeft ">${pgs}</li>
                `);
            },
            addChangePageMore:function (a){
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
   }
   return fun;
});



