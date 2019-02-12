define([
    'require',
], function(require) {
    'use strict';
     let  css = (arr,arr2)=>{//第一个参数是本地css组件，第二个参数是获取的returnCss组件.合成两个对象。每个模块输出一个数组。
            // let arr2 = {};
            //     arr2 = {
            //         modelName21:["cssPath001","cssPath002"],
            //         modelName22:["cssPath003","cssPath004"],
            //     }
            // let arr = {};
            //     arr = {
            //         modelName11:["arr005","arr006"],
            //         modelName12:["arr007","arr008"],
            //     }
            arr2 == undefined?arr2 = []:arr2 = arr2;
            for (let j = 0,k = arr2.length;j<k;j++){
                for (let i in arr2[j]){
                    if(arr2[j].hasOwnProperty(i)===true){      //此处hasOwnProperty是判断自有属性，使用 for in 循环遍历对象的属性时，原型链上的所有属性都将被访问会避免原型对象扩展带来的干扰
                        arr[i] = arr2[j][i];
                    } 
                    // return arr
                }
            }
            // console.log(arr)
            //将获取到的值生成依赖项
            return arr
        }
        // 输入config，输出css的对象
    return css;
});