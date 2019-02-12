<!-- 结构： 最后一次更新20181204 gongzixi@qq.com -->

{
    "scripts":{
        mainJs:"主程序入口，配置相关信息",
        requireJs:"requireJs",
        app:{
            Info:"此处存放公共功能库",
            checkInputJs:"检查input相关，目前暴露接口为 reg ",
            PKGJs:"继承原医大四的package库，目前暴露接口为 load get EVN  注：时间具象化已启用",
            regularJs:"存放正则，通过相应名称调用。目前暴露接口为 base ",
            warningInfoJs:"输入提示码，返回提示信息。目前暴露接口为 errMsg ",
            serPlcJs:"通过js来强制居中或别的操作，以实现更改位置的目的，目前暴露接口为 setPlc"
        },
        lib:{
            Info:"此处存放第三方插件库",
            "jquery":"jquery 库",
            "Chart.js.master":"统计图插件"
        },
        node-module:{
            Info:"npm下载的包"
        }
        work:{
            Info:"此处存放项目模块",
            public:{
                Info:"此处存放所有页面公共模块"
            },
            host:{
                Info:"此处存放每个页面的直接入口",
            }
        }
    }
}

已基本完成之模块：
    1.app/regular
    2.app/checkInput
    3.app/setPlc
    4.app/PKG
    5.app/warningInfo
<!-- update-005 20181212 gongzixi110@qq.com -->
    css的问题已经改成用less解决。
    页面内需要引入页面组件的main.less，紧接后面需要引入less.min.js以解析less。
    所有less文件头部需要写出依赖项，以便打包。

    测试import的打包
    已测试完成。非常完美，打包后自动去除import寻址，并且自动压缩。完全不需要再用config重新设置。

<!-- update-004 20181207 gongzixi110@qq.com -->
   昨天深夜画完的结构图例 file:///E:\王安成项目\require\结构图示.jpg

   关于css的问题，打算使用第一种方案，稍加改进。使用  抛出异常则无视的方案，如try catch或者判断此文件是否存在。这样就不用管多余的加载css的代码了。
   require并没有找到直接打包css的方案，需要手动填写 @import 1.css 这样的依赖css文件。于是手动写了一段代码，从依赖项的config.js中加载出所需的css，
   并且return。在页面组件入口处合成所有的依赖项，输出 @import 1.css 这样格式的文本或直接生成这样的 css依赖文件。之后再根据这个css依赖文件进行打包。


   打包后css和js会各自成为单独的文件，关于css这一块说明一下：因为最后生成@import 的时候，是从依赖项开始，最后才是入口文件的css，同时又因为css的就近原则，
   即从上往下执行，下面有相同选择器名则用下面的，以此可以进行如下操作：

        1.将组件的css复制到入口文件，进行关于此页面的单独修改，原组件的css成为默认设置。此时的修改完全不影响原组件。


    关于css打包：  已经在页面写了一个语句，console.log(a.pathCss);   此语句用来输出入口组件的所有css依赖的路径。此时如果想要打包，则：
        前提：有node环境，且在全局安装了fs文件模块
        1.控制台复制输出的代码，形式如：
            @import ../../../../../static/js/scripts/work/host/index/main.css ;
            @import ../../../../../static/js/scripts/./work/public/titleBar/main.css ;

        2.将代码粘贴到 scripts/  目录下的setCss.js的cssPath变量内。

        3.在 scripts/ 目录下，按住shift,右键，打开DOS窗口，输入以下命令：
            node setCss.js

        4.在  scripts/config/app/ 目录会生成一个 test.css 文件，
            此时已自动生成当前页面的所有依赖项css的路径

        5.在同 scripts/ 的目录下 执行以下命令
                node ./config/r.js -o cssIn=./config/app/test.css out=./config/app/all.css optimizeCss=standard
            
            此时在 scripts/config/app/ 目录下会生成一个 all.css 文件 ，文件名和路径可以在上面5的命令里修改。
            此文件即所有依赖项的打包后的结果。

    关于js打包：
        1. 在 ./config/build.js 文件里修改配置，主要是页面组件的入口文件，以及输出位置
        2.在 scripts/ 目录下的命令行运行如下命令 
                 node ./config/r.js -o ./config/build.js
        3.打包完在页面直接require就可以了
            注意！！！
                一定要在打包完的js里最后面require一下此js的入口！
                一定要在打包完的js里最后面require一下此js的入口！
                一定要在打包完的js里最后面require一下此js的入口！
        页面使用的时候，是在页面require一下你打包后的js文件位置，但是r.js打包后内容全部是define，故最后一行需要require一下定义一个总的入口。
        另外，每个组件尽量使用scripts/main.js里配置的相对路径。
            



    思考？  
        
        关于js的打包，打完包后如何使用？为什么百度上一点关于这方面的解释都没有？打包后全是define，是需要在什么地方require吗？
        【已解决，解决办法已更新在上面关于js打包里】
        
        虽然顺便解决了延时问题，css打包后直接引入，刷新时不会出现暂时没有样式的情况了


<!-- update-003 20181206 gongzixi110@qq.com -->

关于昨天css的问题，目前有三种解决方案

一：不使用require的css模块加载，使用loadCss后期加载css，这样在打包js的时候不会异常可以直接打包，打完包后需要运行delete.bat来去除相应的加载css的字符串

二：使用require的css模块加载，打包时将引入模块的部分删除或者注释。

三：取消原计划的组件，将css统一放于packageCss里执行。并直接load全部引用

其他方法：考虑webpack打包方式，或者vue方案。

<!-- update-002 20181205 gongzixi110@qq.com -->

利用requireJs的模块化开发流程：
    1.配置基础文件
    2.针对性模块开发
    3.打包生成最终文件


css与js的打包 ：
    打包的目的：将开发环境与生产环境分离，整合模块化后的组件，并加以压缩，以减少文件的请求次数。
    打包背景：
            1.node环境  打包的命令需要用到node
            2.r.js  下载可使用npm命令   npm install -g requirejs
        打包css的方式：在config 目录下（r.js）  命令行运行  node ./r.js -o cssIn=./app/test.css out=./app/all.css optimizeCss=standard
            cssIn=../css/build.css : 需要写一个配置css文件，用  @import "login.css"; 方式@出需要打包的css路径
                css配置格式
                    @import "a.css";
                    @import "b.css";
                    ...
            out=../css/all.css     ：打包后的css生成的路径
            注：这两个路径是相对build.js 配置的路径，而打包命令也是在build.js内执行的

        打包js的方式：在配置文件内填上需要打包的模块入口， 命令行运行  node config/r.js -o config/build.js
            js配置格式（build.js的位置：script/config/build.js）.注意！当使用 css！./main.css 加载css模块时，此时打包会报错。此时应
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
                    name: 'host/index/main',// 模块入口
                    optimize: 'none',//是否压缩 默认是压缩的，去掉不要就是压缩
                    out: "app/build",// 输出压缩后的文件位置

                })
    小记：模块化固然方便，但也同时出现了一个问题，即：
            在开发环境的时候，页面模块有引入css的代码，但是打包后这段代码就不需要了。或者考虑下，把引入css的代码直接放入config，且模块不再引入config？不行，不引入的话这段代码便不执行了。或者考虑使用艾特import，

            需求不能变：  组件化，整个文件夹可以即插即用。内含的css，既可以在开发环境使用，也不会在生产环境出现引入问题。满足这两个条件即可。

                1.现有格式（在页面模块里直接获取css列表并引入），打包后需要删除指定关键字内的内容。
                2.
<!-- update-001 20181204 http://www.gongzixi110@qq.com -->

写下更新这个的想法。按需求，要将医大四的项目前端代码进行拆分，模块化。于是选择了requireJs来达成此目的。
相应可以看下官网 https://requirejs.org

本次欲做成之结构已放入相应图片，具体Ctrl+click查看 file:///E:\王安成项目\require\index.png

