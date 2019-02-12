用git作为版本控制器。本仓库暂时绑定的是   XiGongZi 的远程仓库，若有后来者，需要自己创建一个新账户以提供远程仓储。


1.添加一个本地库，在本地使用git命令：
    git init

1.1查看当前文件状态
    git status
    
2.使用命令提交修改
    git add xxxfiles

3.使用命令提交修改
    git commit -m "修改信息"

4.关联远程仓库：
    a.首先需要在github上新建一个库，如requireDemo
    b.执行如下命令绑定库
        git remote add origin git@github.com:XiGongZi/requireDemo.git

5.推送修改到远程库
    git push origin master

6.clone远程库
    git clone git@hithub.com:XiGongZi/requireDemo.git

7.查看修改日志
    git log