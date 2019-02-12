define([
    'require',
], function(
        require,
    ) {
    'use strict';
        // 此处返回公共信息（需要请求服务器的）
        return {
            titleBar:{
                "returnFlag":true,
                "orderList":[
                    {
                        "href":"./index.html",
                        "name":"主页",
                        "En":"index"
                    },
                    {
                        "href":"./news.html",
                        "name":"新闻动态",
                        "En":"news"
                    },
                    {
                        "href":"./caseList.html",
                        "name":"病例平台",
                        "En":"caseList"
                    },
                    {
                        "href":"./contactUs.html",
                        "name":"联系我们",
                        "En":"contactUs"
                    }
                ]
            },
            userList:{
                "returnFlag":false,
            },
            imgAdd_body :`./static/image/test/index.png`,
            imgAdd_footer :`./static/image/test/footer.png`,
            imgAdd_login :`./static/image/test/loginInput.png`,
            imgAdd_map :`./static/image/test/map.png`,
            imgAdd_news :`./static/image/test/news.png`,
            imgAdd_caseList :`./static/image/test/caseList.png`,
            imgAdd_caseListDetail :`./static/image/test/caseListDetail.png`,
        }
});



