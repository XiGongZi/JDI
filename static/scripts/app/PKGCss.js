define([
    'require',
], function(require) {
    'use strict';
        let    main = (obj)=>{
            let str = "";
            for (let i in obj){
                if(obj.hasOwnProperty(i)===true){      //此处hasOwnProperty是判断自有属性，使用 for in 循环遍历对象的属性时，原型链上的所有属性都将被访问会避免原型对象扩展带来的干扰
                    for (let j of obj[i] ){
                        // console.log(j)
                        str +=  `@import ../../../../../${j } ;` + "\n";
                    }
                } 
            }
            return str;
        }
    return {
        main
    }
});