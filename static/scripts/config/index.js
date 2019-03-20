({
    baseUrl: '../',
    paths:{   
        "jquery":"./lib/jquery/jquery-1.8.3.min" //把对应的 jquery 这里写对即可  
        ,"app":"./app"  //个人插件
        ,"lib":"./lib"  //第三方插件库
        ,"host":"./work/host"  //页面组件
        ,"public":"./work/public"  //公共组件
        ,"cssPath":"./css"  //css
    },
    name: 'work/host/testSelectAll/C/main',// 模块入口
    optimize: 'uglify',//是否压缩 默认是压缩的，去掉不要就是压缩
    out: "./app/testSelectAll.js",// 输出压缩后的文件位置
})

