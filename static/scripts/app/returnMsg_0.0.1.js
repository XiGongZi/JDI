define([],function(){
    'use strict'
    // errorMsg 注册登录时返回的错误提示信息,需要一个字符串类型的参数
    let errorMsg = {
            info:function(word){
                switch (word) {
                    //phoneNumber 手机号
                    case "000":
                        return ("请输入正确的手机号！");
                        break;
                    case "001":
                        return ("手机号格式不正确！");
                        break;
                    case "002":
                        return ("已经存在该手机号格！");
                        break;
                    //password 密码
                    case "010":
                        return ("密码格式为6到16位数字字母下划线！");
                        break;
                    case "011":
                        return ("两次输入的密码不匹配！");
                        break;
                    //userName 用户名
                    case "020":
                        return ("姓名为二到五位汉字！");
                        break;
                    //idCardNumer 身份证号
                    case "030":
                        return ("请输入正确的身份证号码！");
                        break;
                    case "031":
                        return ("身份证号码格式不正确！");
                        break;
                    case "032":
                        return ("已经存在该身份证号码！");
                        break;
                    case "033":
                        return ("禁止添加已经存在的身份证号码！");
                        break;
                    //illegal 违法操作
                    case "040":
                        return ("非法绑定,禁止操作！");
                        break;
                    case "041":
                        return ("手机号或密码不正确！");
                        break;
                    default:
                        break;
                }
           }
    };
    

    // alert(111)
    return {
        "errMsg":errorMsg,
        // "register":register
    };
});

