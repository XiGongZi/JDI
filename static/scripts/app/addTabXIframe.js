define([
    'require',
    "app/PKG_0.0.1",
    "jquery",
], function(
        require,
        PKG,
        $,
    ) {
    'use strict';
    
   
    let fun = {
        addTabs:function(data){
            let str0 = `
                    <div url="${data.url0}" pages="${data.pages}" leftBarID="${data.LFID}" class="tabs-li" style="display:none" tabName="${data.tabName_attr}" isFocus="yes">
                            <div class="flex1">
                                ${data.tabsName}
                            </div>
                            <svg class="icon " aria-hidden="true">
                                <use xlink:href="#icon-clear"></use>
                            </svg>
                        </div>
            `;
            $(".leftBarPage",parent.document).append(str0);
            let str2 = `
                <iframe class="iframes-li" tabName="${data.tabName_attr}" pages="${data.pages}" isHide="no" src="${data.url0}" leftBarID="${data.LFID}"  name="mainFrame" frameborder="0" scrolling="no"></iframe>
            `;
            $(".bodyFrame-main",parent.document).append(str2);
        }
    }
    return fun;   
  
});






