20190304

1.Fun_C 搭建完毕。

    使用：

    let data = {
        LFID,tabName,isParentDoc
    }
    注：isParentDoc 是是否为iframe内，不填则是在iframe内页使用方法，否（不为空）则是在index页使用
    bindTabsFun(data);

2.Fun_A 搭建完毕

点击左导航栏任意项，右边显示当前项定位、tab标签组、iframe组（保存状态）
若是404页，则只修改定位及tab;


3.开始制作 Fun_B



20190219

主体基本完成。


1.表单使用了jsgrid插件

2.页面没有全部做，只有总包合同。原因是 更改表格需要对接口进行修改，这一步需要先确定后台接口。

3.点击 添加合同 后会展开直接填信息添加，同时可以在表格上添加修改。

20190220

待解决问题：

    1.不同iframe之间通信问题，要求一个iframe改变别的都要改变

20190222

tabs标签过多问题：
    当页签过多时，一方面可以减小宽度，适度隐藏半条以增加容量，另一方面也可以增加一个省略号表示过多，但是目前先做判断，以限制个数。日后有机会参考参考浏览器页签特效后再更新效果。   

tabsFunctions.js 绑定问题

    标签的绑定事件会被重复绑定，但是不影响效果。页面请求在第一次点击的时候就执行了，不会产生重复请求的事件。但是以后可以考虑改下这个bug。

15.22

    点击 更多 可以滑出新页面了，同时新页面为选中状态。 此时点击页签时可以正常切换，同时再次点击 相同按钮（更多）
    时，可以切回新页面。关闭新页面后再点击 更多 按钮，如此往复。

16.28

关于点击leftBar a标签后，tabs页签刷新问题

    有两种思路。第一种暴力点，点击的时候直接清除多余的内容。第二种是隐藏多余的内容。

    第一种方法最简单，只需要在点击事件里加两行代码清除就ok，省时省力，但是交互感不友好。

    最好是第二种隐藏。这样的话，点别的单子后再点回来，刚才在这个页面点出来的tabs列表还会存留，避免重新点击。


    此处暂时先用第一种方法，先做出个效果来，再想办法做出第二种效果。


待做的三件事：

1.tabs刷新问题的第二种方法

2.input小功能的事件封装

3.debug


整理下思路

1.点击leftBar a标签时，检查是否含有 同名tabs 。无则添加，有则显示。iframe 同理
        iframe 有则需要确定 tabName名。
        
2.刷新时需要默认第一页。