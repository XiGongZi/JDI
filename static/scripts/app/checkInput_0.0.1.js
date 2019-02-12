define([
    'require',
    "app/regulars_0.0.1"
], function(require,Reg) {
    'use strict';
    let regTest = {
        //检测一个数组内容是否全等（值和类型），是则返回true，否则返回false，空则返回null  
        sameInput:function(array){
            if(array.length>0){
                return !array.some(function(value,index){
                  return value !== array[0];
                });   
             }else{
                 return null;
             }
        },
        //检测一个文本数组是否匹配正则。 传入值为 [{name:"phone",value:"13952932542"},{name:"userName",value:"公子熄"}]
        inputReg:function(array){
            let arr = [];
            for (let i = 0, j = array.length;i < j;i++){
                arr.push(Reg.base[array[i].name](array[i].value));
            }
            return arr;//返回原数组每个元素对应的布尔值，匹配成功则true，否则返回false
        }
    }
    return{
        "reg":regTest
    }
});