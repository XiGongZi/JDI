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




1. github 新建一个远程仓库

2. 本地新建项目文件夹

3. 本地git 命令 新建仓库 :  git init

4. 本地 全局/本地 设置git 账户密码（全局设置后就不用）

5. 本地设置远程仓库 命令 ： git remote add origin git@github.com:yourName/yourItemNmae.git

6. 其他命令

	git status   查看当前文件修改情况


	git add -A   保存全部文件到暂存盘


     	git commit -m "这里写提交提示，可以中文"  

	
	git push origin master   把master（当前节点）提交到设置的远程仓库

	
	git clone git@github.com:WangWDY/yourRes.git  下载远程项目  


    git reset --hard dad2231   切换到 哈希码 为dad2231...（前五、六位即可）的版本

    git log   查看节点

    git log --pretty=oneline  节点信息成一行的形式展示节点

    git reflog   查看过往节点变更信息 

    git branch    查看当前分支情况

    git branch newBranch  创建分支

    git checkout newBranch 切换分支

    git branch -d newBranch  删除分支 如果该分支没有合并到主分支会报错
    git branch -D newBranch  强制删除分支

    git merge newBranch  将分支内容合并到当前分支


    git clone -b tes git@github.com:XiGongZi/JDI.git  克隆此项目分支名为 tes 的分支
