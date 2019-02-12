define([],function(sas){
    'use strict'
    // errorMsg 注册登录时返回的错误提示信息,需要一个字符串类型的参数
    let base = {
            phone:function(v){
                let reg = (/^[1][3,4,5,7,8][0-9]{9}$/);//手机号的正则
                //当前规则：大陆11位手机号，13、14、15、17、18开头
                return reg.test(v);
            },
            userName:function(v){
                let reg = (/^[\u4e00-\u9fa5]{2,5}$/);//用户姓名的正则
                //当前规则：二到五位汉字
                return reg.test(v);
            },
            password:function(v){
                let reg = (/^[a-z0-9_-]{6,16}$/i);//密码的正则
                //当前规则： 6到16位数字字母下划线
                return reg.test(v);
            },
            idCardNum:function(v){
                let reg = (/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/);//身份证号的正则
                //当前规则：大陆身份证号支持15位和18位
                return reg.test(v);
            },
    }; 
    return {
        "base":base,
        // "register":register
    };
});

