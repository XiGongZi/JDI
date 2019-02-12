<!-- 最后一次更新 20181207 gongzixi110@qq.com -->
    参考资料： 
    
    require https://www.cnblogs.com/yexiaochai/p/3633855.html
    less基础    http://www.bootcss.com/p/lesscss/#guide
    node/npm 安装与使用 廖雪峰版介绍     https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/00143450141843488beddae2a1044cab5acb5125baf0882000


    使用此框架需要准备什么？
        1. node 环境。
        2. node 需要安装 fs 文件模块。
        3. 使用less写样式
    

    利用requireJs的模块化开发流程：
        1.配置基础文件
        2.针对性模块开发（js采用require框架，这个比较容易理解，方便整理js代码。按格式写就对了。css采用less，这个可以直接在浏览器上运行，而且和css比较像，学习成本低，最后打包后还可以直接生成css。）
        3.分别打包生成最终文件


    关于less打包：
        前提：有node环境，且在全局安装了fs文件模块
        1.在 ./scripts/ 目录下，用命令行执行以下命令  注：通过修改index，即页面位置以改变打包起点。
            打包完的文件会存在同目录下，为 Final.less。上线时可先编译，再使用。
            node ./config/r.js -o cssIn=./work/host/index/V/main.less out=./work/host/index/V/Final.less optimizeCss=standard
        2.打包完的less同样可直接在页面上使用，上线时可以在线转css格式以获得更快的速度，同时可以删除页面上的less相关而使用传统css的引入方式了。

        190111: 此方法打包会出现一个问题，即不删除单行注释。一旦有单行注释则后面全部被注释了。




    关于js打包：
        1. 在 ./config/build.js 文件里修改配置，主要是页面组件的入口文件，以及输出位置
        2.在 ./scripts/ 目录下的命令行运行如下命令 
                 node ./config/r.js -o ./config/build.js

                 example
                 node ./config/r.js -o ./config/build.js
        3.打包完在页面直接require就可以了
            注意！！！
                一定要在打包完的js里最后面require一下此js的入口！
                一定要在打包完的js里最后面require一下此js的入口！
                一定要在打包完的js里最后面require一下此js的入口！
        页面使用的时候，是在页面require一下你打包后的js文件位置，但是r.js打包后内容全部是define，故最后一行需要require一下定义一个总的入口。
        另外，每个组件尽量使用scripts/main.js里配置的相对路径。





