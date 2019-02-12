//1，about require js config//配置信息  
;  
var baseUrl = `./static/scripts`;
var rootUrl = `./`;
require.config({ 
    //define all js file path base on this base path  
    //actually this can setting same to data-main attribute in script tag  
    //定义所有JS文件的基本路径,实际这可跟script标签的data-main有相同的根路径  
    baseUrl:baseUrl
    //define each js frame path, not need to add .js suffix name  
    //定义各个JS框架路径名,不用加后缀 .js  
    ,paths:{   
        "jquery":"./lib/jquery/jquery-1.8.3.min" //把对应的 jquery 这里写对即可  
        ,"app":"./app"  //个人插件
        ,"lib":"./lib"  //第三方插件库
        ,"host":"./work/host"  //页面组件
        ,"public":"./work/public"  //公共组件
        ,"cssPath":"./css"  //css
        ,"npm":"./node_modules"  //css
        ,'allPath':'./work/host/index'
    },
    map: { //map告诉RequireJS在任何模块之前，都先载入这个css模块
        '*': {
            css: 'css.min'
        }
    }, 
      
});  
//2，about load each js code basing on different dependency  
//按不同先后的依赖关系加载各个JS文件
//使用方法：
/*
require([
        "setPlace" // 1.此处放需要用到的依赖模块，同时function里放暴露出来的接口
    ],function(a){//2.此处形参应与上面引入 一一对应，且依赖模块暴露出来的接口应在此形参下一级
        console.log(a);
        a.setPlc.test();//3.使用时应为，形参.模块暴露的接口
});
*/
require([
    ],function(a,b){

        // b.load.css([//加载所有页面必备的css  加载时会有段时间（短时间）的无样式状态，故建议直接在页面上加载，不使用此方式加载css
        //         baseUrl+"./css/default.css",
        //         baseUrl+"./css/yidasi.css",
        //     ]);

        // console.log(a.reg.inputReg(ka));
        // alert(b.ENV.PEOS());
        // console.log(b.get.date());
        // RTWI.login.test(222);
        // console.log(c.base.idCardNum("321322199407161414"));

});
