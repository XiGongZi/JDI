define([
    'require',
], function(require,Reg) {
    'use strict';
    Date.prototype.format = function(format) {//时间具象化
        // 使用：
        // 对Date的扩展，将 Date 转化为指定格式的String 
        // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
        // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
        // 例子： 
        // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
        // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
        let o = {
            "M+": this.getMonth() + 1,
            // month
            "d+": this.getDate(),
            // day
            "h+": this.getHours(),
            // hour
            "m+": this.getMinutes(),
            // minute
            "s+": this.getSeconds(),
            // second
            "q+": Math.floor((this.getMonth() + 3) / 3),
            // quarter
            "S": this.getMilliseconds()
            // millisecond
        }
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (let k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    }
    var Ajax={
        get: function(url, fn) {
          // XMLHttpRequest对象用于在后台与服务器交换数据   
          var xhr = new XMLHttpRequest();            
          xhr.open('GET', url, true);
          xhr.onreadystatechange = function() {
            // readyState == 4说明请求已完成
            if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) { 
              // 从服务器获得数据 
              fn.call(this, xhr.responseText);  
            }
          };
          xhr.send();
        },
        // datat应为'a=a1&b=b1'这种字符串格式，在jq里如果data为对象会自动将对象转成这种字符串格式
        post: function (url, data, fn) {
          var xhr = new XMLHttpRequest();
          xhr.open("POST", url, true);
          // 添加http头，发送信息至服务器时内容编码类型
          xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
          xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
              fn.call(this, xhr.responseText);
            }
          };
          xhr.send(data);
        }
      }
    let load = { 
        css:function(url){//定义函数内容 //动态加载css 在最后
            for (let i = 0,j = url.length;i < j;i ++){
                let script;
                script = document.createElement("link");
                script.href = url[i];
                script.rel = "stylesheet";
                document.head.appendChild(script);
            }
        },
        lessPre:function(url){//定义函数内容 //动态加载css  在最前
            for (let i = 0,j = url.length;i < j;i ++){
                let script;
                script = document.createElement("link");
                script.href = url[i];
                script.rel = "stylesheet/less";
                document.head.prepend(script);
            }
        },  
        cssPre:function(url){//定义函数内容 //动态加载css  在最前
            for (let i = 0,j = url.length;i < j;i ++){
                let script;
                script = document.createElement("link");
                script.href = url[i];
                script.rel = "stylesheet";
                document.head.prepend(script);
            }
        },        
        js:function(url){ //动态加载js
            for (let i = 0,j = url.length;i < j;i ++){
                let script;
                script = document.createElement("script");
                script.src = url[i];
                document.body.appendChild(script);
            }
        }
    }
    let get ={
        ip:function(fun){
            load.js(['http://pv.sohu.com/cityjson?ie=utf-8']);
            let IPCB = setInterval(function(){//每隔Nms去判断 returnCitySN 是否被申明，是则取消循环，输出
                try {
                    if(returnCitySN != undefined){
                        clearInterval(IPCB);
                        fun.callBack(returnCitySN);
                    }
                } catch (error) {
                    
                }
                
            }, 30);
        },
        urlValue:function(name) {
            //获取地址栏信息，此处需要传入一个字符串，内容为想要取出的 属性名
            let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
            let r = window.location.search.substr(1).match(reg); // 匹配目标参数
            if (r != null) return unescape(r[2]);
            return null; // 返回参数值
        },
        date:function(dateK) {
            // 判断输入的数是否合法
            dateK == undefined ? dateK = 0 : dateK = dateK ;
            if(dateK != parseInt(dateK)){return `not a number`;}
            dateK = dateK + 1;
            let mydate = new Date();
            let oneday = 1000 * 60 * 60 * 24;
            let newDate = new Date(mydate - (-(dateK - 1) * oneday));
            let thisYear = JSON.stringify(newDate.getFullYear()); // 获取当前年份(2位)
            let thisMonth = newDate.getMonth() + 1; // 获取当前月份(0-11,0代表1月)
            let today = newDate.getDate(); // 获取当前日(1-31)
            let thisHour = newDate.getHours();
            let thisMinutes = newDate.getMinutes();
            let thisSeconds = newDate.getSeconds();
            let MM = thisMonth < 10 ? "0" + thisMonth : JSON.stringify(thisMonth);
            let DD = today < 10 ? "0" + today : JSON.stringify(today);
            let thisWeek = JSON.stringify(newDate.getDay()); // 获取当前星期X(0-6,0代表星期天)
            let HH = thisHour < 10 ? "0" + thisHour : JSON.stringify(thisHour);
            let m = thisMinutes < 10 ? "0" + thisMinutes : JSON.stringify(thisMinutes);
            let s = thisSeconds < 10 ? "0" + thisSeconds : JSON.stringify(thisSeconds);
            let value = {};
            value.year = thisYear;
            value.month = MM;
            value.day = DD;
            value.week = thisWeek;
            value.hour = HH;
            value.minute = m;
            value.second = s;
            return (value);
            // 此处返回值  {"year":2018,"month":12,"day":"04","week":2,"hour":"11","minutes":"58","seconds":"03"}
            // 功能: 使用此函数需要传入一个数字整型的参数，
        },
        urlFromStr:function (data){
            /**从url中获取中间的页面名称 */
            let val0 = data;
            let val1 = val0.split("/");
            val0 = val1[val1.length - 1].split(".");
            val1 = val0[0];
            return val1;
        },
    }
    let ENV = {
        PEOS:function () {
            let os = navigator.userAgent;
            if( os.match(/Android/i)){
                return "Android";
            }else if( os.match(/webOS/i)){
                return "webOS";
            }else if( os.match(/iPhone/i)){
                return "iPhone";
            }else if( os.match(/iPad/i)){
                return "iPad";
            }else if( os.match(/iPod/i)){
                return "iPod";
            }else if( os.match(/BlackBerry/i)){
                return "BlackBerry";
            }else if( os.match(/Windows Phone/i)){ 
                 return "Windows Phone";
            }else {
                return false;
            }
        },
        isPE:function () {
            if( navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
            ){
                return true;
            }
            else {
                return false;
            }
        },
        bro:function(){
            let ua = navigator.userAgent.toLocaleLowerCase();
            let browserType = null;
            if (ua.match(/msie/) != null || ua.match(/trident/) != null) {
                browserType = "IE";
                browserVersion = ua.match(/msie ([\d.]+)/) != null ? ua.match(/msie ([\d.]+)/)[1] : ua.match(/rv:([\d.]+)/)[1];
            } else if (ua.match(/firefox/) != null) {
                browserType = "火狐";
            } else if (ua.match(/ubrowser/) != null) {
                browserType = "UC";
            } else if (ua.match(/opera/) != null) {
                browserType = "欧朋";
            } else if (ua.match(/bidubrowser/) != null) {
                browserType = "百度";
            } else if (ua.match(/metasr/) != null) {
                browserType = "搜狗";
            } else if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
                browserType = "QQ";
            } else if (ua.match(/maxthon/) != null) {
                browserType = "遨游";
            } else if (ua.match(/chrome/) != null) {
                browserType = 'chrome';
            } else if (ua.match(/safari/) != null) {
                browserType = "Safari";0
            }
            return browserType;
        },
        isWeChat:function(){
            // 判断是不是在微信浏览器中打开
            let ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                return true;
            } else {
                return false;
            }
        },
    }
    return {
        "load":load,
        "get":get,
        "ENV":ENV,
        "ajax":Ajax
    };
});