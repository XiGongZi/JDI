define([
    'require',
    "jquery",
    "app/tabsFunctions",
    "app/PKG_0.0.1",
    "app/addTabXIframe"
], function (
    require,
    $,
    TBF,
    PKG,
    ATF
    ) {
    'use strict';

        /**input旁边小功能封装函数 */
        let funs = {
               
        }
         

        $(".bodyFrame1 .case-icon svg[status='0']").click(function(){
                    /**清除 */
            $(this).parent().parent().find("input").val("");
        })



        return funs;
});


