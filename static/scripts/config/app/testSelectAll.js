define('app/PKG_0.0.1',[
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
            let val0 ;
            let val1 = data.split("/");
            val0 = val1[val1.length - 1].split(".");
            val1 = val0[0];
            return val1;
        },
        //生成从minNum到maxNum的随机数
        randomNum:function(minNum,maxNum){ 
            switch(arguments.length){ 
                case 1: 
                    return parseInt(Math.random()*minNum+1,10); 
                break; 
                case 2: 
                    return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
                break; 
                    default: 
                        return 0; 
                    break; 
            } 
        } 
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

    };
    let judge = {
        pickNull:function(data){
            let arr = [];
            for(let a in data){
                if(data[a] == ""){
                    arr.push(a);
                }
            }
            return arr;
        }
    }
    return {
        "load":load,
        "get":get,
        "ENV":ENV,
        "ajax":Ajax,
        judge,
    };
});
/*! jQuery v1.8.3 jquery.com | jquery.org/license */
(function(e,t){function _(e){var t=M[e]={};return v.each(e.split(y),function(e,n){t[n]=!0}),t}function H(e,n,r){if(r===t&&e.nodeType===1){var i="data-"+n.replace(P,"-$1").toLowerCase();r=e.getAttribute(i);if(typeof r=="string"){try{r=r==="true"?!0:r==="false"?!1:r==="null"?null:+r+""===r?+r:D.test(r)?v.parseJSON(r):r}catch(s){}v.data(e,n,r)}else r=t}return r}function B(e){var t;for(t in e){if(t==="data"&&v.isEmptyObject(e[t]))continue;if(t!=="toJSON")return!1}return!0}function et(){return!1}function tt(){return!0}function ut(e){return!e||!e.parentNode||e.parentNode.nodeType===11}function at(e,t){do e=e[t];while(e&&e.nodeType!==1);return e}function ft(e,t,n){t=t||0;if(v.isFunction(t))return v.grep(e,function(e,r){var i=!!t.call(e,r,e);return i===n});if(t.nodeType)return v.grep(e,function(e,r){return e===t===n});if(typeof t=="string"){var r=v.grep(e,function(e){return e.nodeType===1});if(it.test(t))return v.filter(t,r,!n);t=v.filter(t,r)}return v.grep(e,function(e,r){return v.inArray(e,t)>=0===n})}function lt(e){var t=ct.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}function Lt(e,t){return e.getElementsByTagName(t)[0]||e.appendChild(e.ownerDocument.createElement(t))}function At(e,t){if(t.nodeType!==1||!v.hasData(e))return;var n,r,i,s=v._data(e),o=v._data(t,s),u=s.events;if(u){delete o.handle,o.events={};for(n in u)for(r=0,i=u[n].length;r<i;r++)v.event.add(t,n,u[n][r])}o.data&&(o.data=v.extend({},o.data))}function Ot(e,t){var n;if(t.nodeType!==1)return;t.clearAttributes&&t.clearAttributes(),t.mergeAttributes&&t.mergeAttributes(e),n=t.nodeName.toLowerCase(),n==="object"?(t.parentNode&&(t.outerHTML=e.outerHTML),v.support.html5Clone&&e.innerHTML&&!v.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):n==="input"&&Et.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):n==="option"?t.selected=e.defaultSelected:n==="input"||n==="textarea"?t.defaultValue=e.defaultValue:n==="script"&&t.text!==e.text&&(t.text=e.text),t.removeAttribute(v.expando)}function Mt(e){return typeof e.getElementsByTagName!="undefined"?e.getElementsByTagName("*"):typeof e.querySelectorAll!="undefined"?e.querySelectorAll("*"):[]}function _t(e){Et.test(e.type)&&(e.defaultChecked=e.checked)}function Qt(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=Jt.length;while(i--){t=Jt[i]+n;if(t in e)return t}return r}function Gt(e,t){return e=t||e,v.css(e,"display")==="none"||!v.contains(e.ownerDocument,e)}function Yt(e,t){var n,r,i=[],s=0,o=e.length;for(;s<o;s++){n=e[s];if(!n.style)continue;i[s]=v._data(n,"olddisplay"),t?(!i[s]&&n.style.display==="none"&&(n.style.display=""),n.style.display===""&&Gt(n)&&(i[s]=v._data(n,"olddisplay",nn(n.nodeName)))):(r=Dt(n,"display"),!i[s]&&r!=="none"&&v._data(n,"olddisplay",r))}for(s=0;s<o;s++){n=e[s];if(!n.style)continue;if(!t||n.style.display==="none"||n.style.display==="")n.style.display=t?i[s]||"":"none"}return e}function Zt(e,t,n){var r=Rt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function en(e,t,n,r){var i=n===(r?"border":"content")?4:t==="width"?1:0,s=0;for(;i<4;i+=2)n==="margin"&&(s+=v.css(e,n+$t[i],!0)),r?(n==="content"&&(s-=parseFloat(Dt(e,"padding"+$t[i]))||0),n!=="margin"&&(s-=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0)):(s+=parseFloat(Dt(e,"padding"+$t[i]))||0,n!=="padding"&&(s+=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0));return s}function tn(e,t,n){var r=t==="width"?e.offsetWidth:e.offsetHeight,i=!0,s=v.support.boxSizing&&v.css(e,"boxSizing")==="border-box";if(r<=0||r==null){r=Dt(e,t);if(r<0||r==null)r=e.style[t];if(Ut.test(r))return r;i=s&&(v.support.boxSizingReliable||r===e.style[t]),r=parseFloat(r)||0}return r+en(e,t,n||(s?"border":"content"),i)+"px"}function nn(e){if(Wt[e])return Wt[e];var t=v("<"+e+">").appendTo(i.body),n=t.css("display");t.remove();if(n==="none"||n===""){Pt=i.body.appendChild(Pt||v.extend(i.createElement("iframe"),{frameBorder:0,width:0,height:0}));if(!Ht||!Pt.createElement)Ht=(Pt.contentWindow||Pt.contentDocument).document,Ht.write("<!doctype html><html><body>"),Ht.close();t=Ht.body.appendChild(Ht.createElement(e)),n=Dt(t,"display"),i.body.removeChild(Pt)}return Wt[e]=n,n}function fn(e,t,n,r){var i;if(v.isArray(t))v.each(t,function(t,i){n||sn.test(e)?r(e,i):fn(e+"["+(typeof i=="object"?t:"")+"]",i,n,r)});else if(!n&&v.type(t)==="object")for(i in t)fn(e+"["+i+"]",t[i],n,r);else r(e,t)}function Cn(e){return function(t,n){typeof t!="string"&&(n=t,t="*");var r,i,s,o=t.toLowerCase().split(y),u=0,a=o.length;if(v.isFunction(n))for(;u<a;u++)r=o[u],s=/^\+/.test(r),s&&(r=r.substr(1)||"*"),i=e[r]=e[r]||[],i[s?"unshift":"push"](n)}}function kn(e,n,r,i,s,o){s=s||n.dataTypes[0],o=o||{},o[s]=!0;var u,a=e[s],f=0,l=a?a.length:0,c=e===Sn;for(;f<l&&(c||!u);f++)u=a[f](n,r,i),typeof u=="string"&&(!c||o[u]?u=t:(n.dataTypes.unshift(u),u=kn(e,n,r,i,u,o)));return(c||!u)&&!o["*"]&&(u=kn(e,n,r,i,"*",o)),u}function Ln(e,n){var r,i,s=v.ajaxSettings.flatOptions||{};for(r in n)n[r]!==t&&((s[r]?e:i||(i={}))[r]=n[r]);i&&v.extend(!0,e,i)}function An(e,n,r){var i,s,o,u,a=e.contents,f=e.dataTypes,l=e.responseFields;for(s in l)s in r&&(n[l[s]]=r[s]);while(f[0]==="*")f.shift(),i===t&&(i=e.mimeType||n.getResponseHeader("content-type"));if(i)for(s in a)if(a[s]&&a[s].test(i)){f.unshift(s);break}if(f[0]in r)o=f[0];else{for(s in r){if(!f[0]||e.converters[s+" "+f[0]]){o=s;break}u||(u=s)}o=o||u}if(o)return o!==f[0]&&f.unshift(o),r[o]}function On(e,t){var n,r,i,s,o=e.dataTypes.slice(),u=o[0],a={},f=0;e.dataFilter&&(t=e.dataFilter(t,e.dataType));if(o[1])for(n in e.converters)a[n.toLowerCase()]=e.converters[n];for(;i=o[++f];)if(i!=="*"){if(u!=="*"&&u!==i){n=a[u+" "+i]||a["* "+i];if(!n)for(r in a){s=r.split(" ");if(s[1]===i){n=a[u+" "+s[0]]||a["* "+s[0]];if(n){n===!0?n=a[r]:a[r]!==!0&&(i=s[0],o.splice(f--,0,i));break}}}if(n!==!0)if(n&&e["throws"])t=n(t);else try{t=n(t)}catch(l){return{state:"parsererror",error:n?l:"No conversion from "+u+" to "+i}}}u=i}return{state:"success",data:t}}function Fn(){try{return new e.XMLHttpRequest}catch(t){}}function In(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}function $n(){return setTimeout(function(){qn=t},0),qn=v.now()}function Jn(e,t){v.each(t,function(t,n){var r=(Vn[t]||[]).concat(Vn["*"]),i=0,s=r.length;for(;i<s;i++)if(r[i].call(e,t,n))return})}function Kn(e,t,n){var r,i=0,s=0,o=Xn.length,u=v.Deferred().always(function(){delete a.elem}),a=function(){var t=qn||$n(),n=Math.max(0,f.startTime+f.duration-t),r=n/f.duration||0,i=1-r,s=0,o=f.tweens.length;for(;s<o;s++)f.tweens[s].run(i);return u.notifyWith(e,[f,i,n]),i<1&&o?n:(u.resolveWith(e,[f]),!1)},f=u.promise({elem:e,props:v.extend({},t),opts:v.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:qn||$n(),duration:n.duration,tweens:[],createTween:function(t,n,r){var i=v.Tween(e,f.opts,t,n,f.opts.specialEasing[t]||f.opts.easing);return f.tweens.push(i),i},stop:function(t){var n=0,r=t?f.tweens.length:0;for(;n<r;n++)f.tweens[n].run(1);return t?u.resolveWith(e,[f,t]):u.rejectWith(e,[f,t]),this}}),l=f.props;Qn(l,f.opts.specialEasing);for(;i<o;i++){r=Xn[i].call(f,e,l,f.opts);if(r)return r}return Jn(f,l),v.isFunction(f.opts.start)&&f.opts.start.call(e,f),v.fx.timer(v.extend(a,{anim:f,queue:f.opts.queue,elem:e})),f.progress(f.opts.progress).done(f.opts.done,f.opts.complete).fail(f.opts.fail).always(f.opts.always)}function Qn(e,t){var n,r,i,s,o;for(n in e){r=v.camelCase(n),i=t[r],s=e[n],v.isArray(s)&&(i=s[1],s=e[n]=s[0]),n!==r&&(e[r]=s,delete e[n]),o=v.cssHooks[r];if(o&&"expand"in o){s=o.expand(s),delete e[r];for(n in s)n in e||(e[n]=s[n],t[n]=i)}else t[r]=i}}function Gn(e,t,n){var r,i,s,o,u,a,f,l,c,h=this,p=e.style,d={},m=[],g=e.nodeType&&Gt(e);n.queue||(l=v._queueHooks(e,"fx"),l.unqueued==null&&(l.unqueued=0,c=l.empty.fire,l.empty.fire=function(){l.unqueued||c()}),l.unqueued++,h.always(function(){h.always(function(){l.unqueued--,v.queue(e,"fx").length||l.empty.fire()})})),e.nodeType===1&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],v.css(e,"display")==="inline"&&v.css(e,"float")==="none"&&(!v.support.inlineBlockNeedsLayout||nn(e.nodeName)==="inline"?p.display="inline-block":p.zoom=1)),n.overflow&&(p.overflow="hidden",v.support.shrinkWrapBlocks||h.done(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t){s=t[r];if(Un.exec(s)){delete t[r],a=a||s==="toggle";if(s===(g?"hide":"show"))continue;m.push(r)}}o=m.length;if(o){u=v._data(e,"fxshow")||v._data(e,"fxshow",{}),"hidden"in u&&(g=u.hidden),a&&(u.hidden=!g),g?v(e).show():h.done(function(){v(e).hide()}),h.done(function(){var t;v.removeData(e,"fxshow",!0);for(t in d)v.style(e,t,d[t])});for(r=0;r<o;r++)i=m[r],f=h.createTween(i,g?u[i]:0),d[i]=u[i]||v.style(e,i),i in u||(u[i]=f.start,g&&(f.end=f.start,f.start=i==="width"||i==="height"?1:0))}}function Yn(e,t,n,r,i){return new Yn.prototype.init(e,t,n,r,i)}function Zn(e,t){var n,r={height:e},i=0;t=t?1:0;for(;i<4;i+=2-t)n=$t[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}function tr(e){return v.isWindow(e)?e:e.nodeType===9?e.defaultView||e.parentWindow:!1}var n,r,i=e.document,s=e.location,o=e.navigator,u=e.jQuery,a=e.$,f=Array.prototype.push,l=Array.prototype.slice,c=Array.prototype.indexOf,h=Object.prototype.toString,p=Object.prototype.hasOwnProperty,d=String.prototype.trim,v=function(e,t){return new v.fn.init(e,t,n)},m=/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,g=/\S/,y=/\s+/,b=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,w=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,E=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,S=/^[\],:{}\s]*$/,x=/(?:^|:|,)(?:\s*\[)+/g,T=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,N=/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,C=/^-ms-/,k=/-([\da-z])/gi,L=function(e,t){return(t+"").toUpperCase()},A=function(){i.addEventListener?(i.removeEventListener("DOMContentLoaded",A,!1),v.ready()):i.readyState==="complete"&&(i.detachEvent("onreadystatechange",A),v.ready())},O={};v.fn=v.prototype={constructor:v,init:function(e,n,r){var s,o,u,a;if(!e)return this;if(e.nodeType)return this.context=this[0]=e,this.length=1,this;if(typeof e=="string"){e.charAt(0)==="<"&&e.charAt(e.length-1)===">"&&e.length>=3?s=[null,e,null]:s=w.exec(e);if(s&&(s[1]||!n)){if(s[1])return n=n instanceof v?n[0]:n,a=n&&n.nodeType?n.ownerDocument||n:i,e=v.parseHTML(s[1],a,!0),E.test(s[1])&&v.isPlainObject(n)&&this.attr.call(e,n,!0),v.merge(this,e);o=i.getElementById(s[2]);if(o&&o.parentNode){if(o.id!==s[2])return r.find(e);this.length=1,this[0]=o}return this.context=i,this.selector=e,this}return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e)}return v.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),v.makeArray(e,this))},selector:"",jquery:"1.8.3",length:0,size:function(){return this.length},toArray:function(){return l.call(this)},get:function(e){return e==null?this.toArray():e<0?this[this.length+e]:this[e]},pushStack:function(e,t,n){var r=v.merge(this.constructor(),e);return r.prevObject=this,r.context=this.context,t==="find"?r.selector=this.selector+(this.selector?" ":"")+n:t&&(r.selector=this.selector+"."+t+"("+n+")"),r},each:function(e,t){return v.each(this,e,t)},ready:function(e){return v.ready.promise().done(e),this},eq:function(e){return e=+e,e===-1?this.slice(e):this.slice(e,e+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(l.apply(this,arguments),"slice",l.call(arguments).join(","))},map:function(e){return this.pushStack(v.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:[].sort,splice:[].splice},v.fn.init.prototype=v.fn,v.extend=v.fn.extend=function(){var e,n,r,i,s,o,u=arguments[0]||{},a=1,f=arguments.length,l=!1;typeof u=="boolean"&&(l=u,u=arguments[1]||{},a=2),typeof u!="object"&&!v.isFunction(u)&&(u={}),f===a&&(u=this,--a);for(;a<f;a++)if((e=arguments[a])!=null)for(n in e){r=u[n],i=e[n];if(u===i)continue;l&&i&&(v.isPlainObject(i)||(s=v.isArray(i)))?(s?(s=!1,o=r&&v.isArray(r)?r:[]):o=r&&v.isPlainObject(r)?r:{},u[n]=v.extend(l,o,i)):i!==t&&(u[n]=i)}return u},v.extend({noConflict:function(t){return e.$===v&&(e.$=a),t&&e.jQuery===v&&(e.jQuery=u),v},isReady:!1,readyWait:1,holdReady:function(e){e?v.readyWait++:v.ready(!0)},ready:function(e){if(e===!0?--v.readyWait:v.isReady)return;if(!i.body)return setTimeout(v.ready,1);v.isReady=!0;if(e!==!0&&--v.readyWait>0)return;r.resolveWith(i,[v]),v.fn.trigger&&v(i).trigger("ready").off("ready")},isFunction:function(e){return v.type(e)==="function"},isArray:Array.isArray||function(e){return v.type(e)==="array"},isWindow:function(e){return e!=null&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return e==null?String(e):O[h.call(e)]||"object"},isPlainObject:function(e){if(!e||v.type(e)!=="object"||e.nodeType||v.isWindow(e))return!1;try{if(e.constructor&&!p.call(e,"constructor")&&!p.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}var r;for(r in e);return r===t||p.call(e,r)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw new Error(e)},parseHTML:function(e,t,n){var r;return!e||typeof e!="string"?null:(typeof t=="boolean"&&(n=t,t=0),t=t||i,(r=E.exec(e))?[t.createElement(r[1])]:(r=v.buildFragment([e],t,n?null:[]),v.merge([],(r.cacheable?v.clone(r.fragment):r.fragment).childNodes)))},parseJSON:function(t){if(!t||typeof t!="string")return null;t=v.trim(t);if(e.JSON&&e.JSON.parse)return e.JSON.parse(t);if(S.test(t.replace(T,"@").replace(N,"]").replace(x,"")))return(new Function("return "+t))();v.error("Invalid JSON: "+t)},parseXML:function(n){var r,i;if(!n||typeof n!="string")return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(s){r=t}return(!r||!r.documentElement||r.getElementsByTagName("parsererror").length)&&v.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&g.test(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(C,"ms-").replace(k,L)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,n,r){var i,s=0,o=e.length,u=o===t||v.isFunction(e);if(r){if(u){for(i in e)if(n.apply(e[i],r)===!1)break}else for(;s<o;)if(n.apply(e[s++],r)===!1)break}else if(u){for(i in e)if(n.call(e[i],i,e[i])===!1)break}else for(;s<o;)if(n.call(e[s],s,e[s++])===!1)break;return e},trim:d&&!d.call("\ufeff\u00a0")?function(e){return e==null?"":d.call(e)}:function(e){return e==null?"":(e+"").replace(b,"")},makeArray:function(e,t){var n,r=t||[];return e!=null&&(n=v.type(e),e.length==null||n==="string"||n==="function"||n==="regexp"||v.isWindow(e)?f.call(r,e):v.merge(r,e)),r},inArray:function(e,t,n){var r;if(t){if(c)return c.call(t,e,n);r=t.length,n=n?n<0?Math.max(0,r+n):n:0;for(;n<r;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,s=0;if(typeof r=="number")for(;s<r;s++)e[i++]=n[s];else while(n[s]!==t)e[i++]=n[s++];return e.length=i,e},grep:function(e,t,n){var r,i=[],s=0,o=e.length;n=!!n;for(;s<o;s++)r=!!t(e[s],s),n!==r&&i.push(e[s]);return i},map:function(e,n,r){var i,s,o=[],u=0,a=e.length,f=e instanceof v||a!==t&&typeof a=="number"&&(a>0&&e[0]&&e[a-1]||a===0||v.isArray(e));if(f)for(;u<a;u++)i=n(e[u],u,r),i!=null&&(o[o.length]=i);else for(s in e)i=n(e[s],s,r),i!=null&&(o[o.length]=i);return o.concat.apply([],o)},guid:1,proxy:function(e,n){var r,i,s;return typeof n=="string"&&(r=e[n],n=e,e=r),v.isFunction(e)?(i=l.call(arguments,2),s=function(){return e.apply(n,i.concat(l.call(arguments)))},s.guid=e.guid=e.guid||v.guid++,s):t},access:function(e,n,r,i,s,o,u){var a,f=r==null,l=0,c=e.length;if(r&&typeof r=="object"){for(l in r)v.access(e,n,l,r[l],1,o,i);s=1}else if(i!==t){a=u===t&&v.isFunction(i),f&&(a?(a=n,n=function(e,t,n){return a.call(v(e),n)}):(n.call(e,i),n=null));if(n)for(;l<c;l++)n(e[l],r,a?i.call(e[l],l,n(e[l],r)):i,u);s=1}return s?e:f?n.call(e):c?n(e[0],r):o},now:function(){return(new Date).getTime()}}),v.ready.promise=function(t){if(!r){r=v.Deferred();if(i.readyState==="complete")setTimeout(v.ready,1);else if(i.addEventListener)i.addEventListener("DOMContentLoaded",A,!1),e.addEventListener("load",v.ready,!1);else{i.attachEvent("onreadystatechange",A),e.attachEvent("onload",v.ready);var n=!1;try{n=e.frameElement==null&&i.documentElement}catch(s){}n&&n.doScroll&&function o(){if(!v.isReady){try{n.doScroll("left")}catch(e){return setTimeout(o,50)}v.ready()}}()}}return r.promise(t)},v.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(e,t){O["[object "+t+"]"]=t.toLowerCase()}),n=v(i);var M={};v.Callbacks=function(e){e=typeof e=="string"?M[e]||_(e):v.extend({},e);var n,r,i,s,o,u,a=[],f=!e.once&&[],l=function(t){n=e.memory&&t,r=!0,u=s||0,s=0,o=a.length,i=!0;for(;a&&u<o;u++)if(a[u].apply(t[0],t[1])===!1&&e.stopOnFalse){n=!1;break}i=!1,a&&(f?f.length&&l(f.shift()):n?a=[]:c.disable())},c={add:function(){if(a){var t=a.length;(function r(t){v.each(t,function(t,n){var i=v.type(n);i==="function"?(!e.unique||!c.has(n))&&a.push(n):n&&n.length&&i!=="string"&&r(n)})})(arguments),i?o=a.length:n&&(s=t,l(n))}return this},remove:function(){return a&&v.each(arguments,function(e,t){var n;while((n=v.inArray(t,a,n))>-1)a.splice(n,1),i&&(n<=o&&o--,n<=u&&u--)}),this},has:function(e){return v.inArray(e,a)>-1},empty:function(){return a=[],this},disable:function(){return a=f=n=t,this},disabled:function(){return!a},lock:function(){return f=t,n||c.disable(),this},locked:function(){return!f},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],a&&(!r||f)&&(i?f.push(t):l(t)),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!r}};return c},v.extend({Deferred:function(e){var t=[["resolve","done",v.Callbacks("once memory"),"resolved"],["reject","fail",v.Callbacks("once memory"),"rejected"],["notify","progress",v.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return v.Deferred(function(n){v.each(t,function(t,r){var s=r[0],o=e[t];i[r[1]](v.isFunction(o)?function(){var e=o.apply(this,arguments);e&&v.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[s+"With"](this===i?n:this,[e])}:n[s])}),e=null}).promise()},promise:function(e){return e!=null?v.extend(e,r):r}},i={};return r.pipe=r.then,v.each(t,function(e,s){var o=s[2],u=s[3];r[s[1]]=o.add,u&&o.add(function(){n=u},t[e^1][2].disable,t[2][2].lock),i[s[0]]=o.fire,i[s[0]+"With"]=o.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=l.call(arguments),r=n.length,i=r!==1||e&&v.isFunction(e.promise)?r:0,s=i===1?e:v.Deferred(),o=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?l.call(arguments):r,n===u?s.notifyWith(t,n):--i||s.resolveWith(t,n)}},u,a,f;if(r>1){u=new Array(r),a=new Array(r),f=new Array(r);for(;t<r;t++)n[t]&&v.isFunction(n[t].promise)?n[t].promise().done(o(t,f,n)).fail(s.reject).progress(o(t,a,u)):--i}return i||s.resolveWith(f,n),s.promise()}}),v.support=function(){var t,n,r,s,o,u,a,f,l,c,h,p=i.createElement("div");p.setAttribute("className","t"),p.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=p.getElementsByTagName("*"),r=p.getElementsByTagName("a")[0];if(!n||!r||!n.length)return{};s=i.createElement("select"),o=s.appendChild(i.createElement("option")),u=p.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t={leadingWhitespace:p.firstChild.nodeType===3,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(r.getAttribute("style")),hrefNormalized:r.getAttribute("href")==="/a",opacity:/^0.5/.test(r.style.opacity),cssFloat:!!r.style.cssFloat,checkOn:u.value==="on",optSelected:o.selected,getSetAttribute:p.className!=="t",enctype:!!i.createElement("form").enctype,html5Clone:i.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",boxModel:i.compatMode==="CSS1Compat",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},u.checked=!0,t.noCloneChecked=u.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!o.disabled;try{delete p.test}catch(d){t.deleteExpando=!1}!p.addEventListener&&p.attachEvent&&p.fireEvent&&(p.attachEvent("onclick",h=function(){t.noCloneEvent=!1}),p.cloneNode(!0).fireEvent("onclick"),p.detachEvent("onclick",h)),u=i.createElement("input"),u.value="t",u.setAttribute("type","radio"),t.radioValue=u.value==="t",u.setAttribute("checked","checked"),u.setAttribute("name","t"),p.appendChild(u),a=i.createDocumentFragment(),a.appendChild(p.lastChild),t.checkClone=a.cloneNode(!0).cloneNode(!0).lastChild.checked,t.appendChecked=u.checked,a.removeChild(u),a.appendChild(p);if(p.attachEvent)for(l in{submit:!0,change:!0,focusin:!0})f="on"+l,c=f in p,c||(p.setAttribute(f,"return;"),c=typeof p[f]=="function"),t[l+"Bubbles"]=c;return v(function(){var n,r,s,o,u="padding:0;margin:0;border:0;display:block;overflow:hidden;",a=i.getElementsByTagName("body")[0];if(!a)return;n=i.createElement("div"),n.style.cssText="visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",a.insertBefore(n,a.firstChild),r=i.createElement("div"),n.appendChild(r),r.innerHTML="<table><tr><td></td><td>t</td></tr></table>",s=r.getElementsByTagName("td"),s[0].style.cssText="padding:0;margin:0;border:0;display:none",c=s[0].offsetHeight===0,s[0].style.display="",s[1].style.display="none",t.reliableHiddenOffsets=c&&s[0].offsetHeight===0,r.innerHTML="",r.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",t.boxSizing=r.offsetWidth===4,t.doesNotIncludeMarginInBodyOffset=a.offsetTop!==1,e.getComputedStyle&&(t.pixelPosition=(e.getComputedStyle(r,null)||{}).top!=="1%",t.boxSizingReliable=(e.getComputedStyle(r,null)||{width:"4px"}).width==="4px",o=i.createElement("div"),o.style.cssText=r.style.cssText=u,o.style.marginRight=o.style.width="0",r.style.width="1px",r.appendChild(o),t.reliableMarginRight=!parseFloat((e.getComputedStyle(o,null)||{}).marginRight)),typeof r.style.zoom!="undefined"&&(r.innerHTML="",r.style.cssText=u+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=r.offsetWidth===3,r.style.display="block",r.style.overflow="visible",r.innerHTML="<div></div>",r.firstChild.style.width="5px",t.shrinkWrapBlocks=r.offsetWidth!==3,n.style.zoom=1),a.removeChild(n),n=r=s=o=null}),a.removeChild(p),n=r=s=o=u=a=p=null,t}();var D=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,P=/([A-Z])/g;v.extend({cache:{},deletedIds:[],uuid:0,expando:"jQuery"+(v.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(e){return e=e.nodeType?v.cache[e[v.expando]]:e[v.expando],!!e&&!B(e)},data:function(e,n,r,i){if(!v.acceptData(e))return;var s,o,u=v.expando,a=typeof n=="string",f=e.nodeType,l=f?v.cache:e,c=f?e[u]:e[u]&&u;if((!c||!l[c]||!i&&!l[c].data)&&a&&r===t)return;c||(f?e[u]=c=v.deletedIds.pop()||v.guid++:c=u),l[c]||(l[c]={},f||(l[c].toJSON=v.noop));if(typeof n=="object"||typeof n=="function")i?l[c]=v.extend(l[c],n):l[c].data=v.extend(l[c].data,n);return s=l[c],i||(s.data||(s.data={}),s=s.data),r!==t&&(s[v.camelCase(n)]=r),a?(o=s[n],o==null&&(o=s[v.camelCase(n)])):o=s,o},removeData:function(e,t,n){if(!v.acceptData(e))return;var r,i,s,o=e.nodeType,u=o?v.cache:e,a=o?e[v.expando]:v.expando;if(!u[a])return;if(t){r=n?u[a]:u[a].data;if(r){v.isArray(t)||(t in r?t=[t]:(t=v.camelCase(t),t in r?t=[t]:t=t.split(" ")));for(i=0,s=t.length;i<s;i++)delete r[t[i]];if(!(n?B:v.isEmptyObject)(r))return}}if(!n){delete u[a].data;if(!B(u[a]))return}o?v.cleanData([e],!0):v.support.deleteExpando||u!=u.window?delete u[a]:u[a]=null},_data:function(e,t,n){return v.data(e,t,n,!0)},acceptData:function(e){var t=e.nodeName&&v.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),v.fn.extend({data:function(e,n){var r,i,s,o,u,a=this[0],f=0,l=null;if(e===t){if(this.length){l=v.data(a);if(a.nodeType===1&&!v._data(a,"parsedAttrs")){s=a.attributes;for(u=s.length;f<u;f++)o=s[f].name,o.indexOf("data-")||(o=v.camelCase(o.substring(5)),H(a,o,l[o]));v._data(a,"parsedAttrs",!0)}}return l}return typeof e=="object"?this.each(function(){v.data(this,e)}):(r=e.split(".",2),r[1]=r[1]?"."+r[1]:"",i=r[1]+"!",v.access(this,function(n){if(n===t)return l=this.triggerHandler("getData"+i,[r[0]]),l===t&&a&&(l=v.data(a,e),l=H(a,e,l)),l===t&&r[1]?this.data(r[0]):l;r[1]=n,this.each(function(){var t=v(this);t.triggerHandler("setData"+i,r),v.data(this,e,n),t.triggerHandler("changeData"+i,r)})},null,n,arguments.length>1,null,!1))},removeData:function(e){return this.each(function(){v.removeData(this,e)})}}),v.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=v._data(e,t),n&&(!r||v.isArray(n)?r=v._data(e,t,v.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=v.queue(e,t),r=n.length,i=n.shift(),s=v._queueHooks(e,t),o=function(){v.dequeue(e,t)};i==="inprogress"&&(i=n.shift(),r--),i&&(t==="fx"&&n.unshift("inprogress"),delete s.stop,i.call(e,o,s)),!r&&s&&s.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return v._data(e,n)||v._data(e,n,{empty:v.Callbacks("once memory").add(function(){v.removeData(e,t+"queue",!0),v.removeData(e,n,!0)})})}}),v.fn.extend({queue:function(e,n){var r=2;return typeof e!="string"&&(n=e,e="fx",r--),arguments.length<r?v.queue(this[0],e):n===t?this:this.each(function(){var t=v.queue(this,e,n);v._queueHooks(this,e),e==="fx"&&t[0]!=="inprogress"&&v.dequeue(this,e)})},dequeue:function(e){return this.each(function(){v.dequeue(this,e)})},delay:function(e,t){return e=v.fx?v.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,s=v.Deferred(),o=this,u=this.length,a=function(){--i||s.resolveWith(o,[o])};typeof e!="string"&&(n=e,e=t),e=e||"fx";while(u--)r=v._data(o[u],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(a));return a(),s.promise(n)}});var j,F,I,q=/[\t\r\n]/g,R=/\r/g,U=/^(?:button|input)$/i,z=/^(?:button|input|object|select|textarea)$/i,W=/^a(?:rea|)$/i,X=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,V=v.support.getSetAttribute;v.fn.extend({attr:function(e,t){return v.access(this,v.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){v.removeAttr(this,e)})},prop:function(e,t){return v.access(this,v.prop,e,t,arguments.length>1)},removeProp:function(e){return e=v.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,s,o,u;if(v.isFunction(e))return this.each(function(t){v(this).addClass(e.call(this,t,this.className))});if(e&&typeof e=="string"){t=e.split(y);for(n=0,r=this.length;n<r;n++){i=this[n];if(i.nodeType===1)if(!i.className&&t.length===1)i.className=e;else{s=" "+i.className+" ";for(o=0,u=t.length;o<u;o++)s.indexOf(" "+t[o]+" ")<0&&(s+=t[o]+" ");i.className=v.trim(s)}}}return this},removeClass:function(e){var n,r,i,s,o,u,a;if(v.isFunction(e))return this.each(function(t){v(this).removeClass(e.call(this,t,this.className))});if(e&&typeof e=="string"||e===t){n=(e||"").split(y);for(u=0,a=this.length;u<a;u++){i=this[u];if(i.nodeType===1&&i.className){r=(" "+i.className+" ").replace(q," ");for(s=0,o=n.length;s<o;s++)while(r.indexOf(" "+n[s]+" ")>=0)r=r.replace(" "+n[s]+" "," ");i.className=e?v.trim(r):""}}}return this},toggleClass:function(e,t){var n=typeof e,r=typeof t=="boolean";return v.isFunction(e)?this.each(function(n){v(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if(n==="string"){var i,s=0,o=v(this),u=t,a=e.split(y);while(i=a[s++])u=r?u:!o.hasClass(i),o[u?"addClass":"removeClass"](i)}else if(n==="undefined"||n==="boolean")this.className&&v._data(this,"__className__",this.className),this.className=this.className||e===!1?"":v._data(this,"__className__")||""})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;n<r;n++)if(this[n].nodeType===1&&(" "+this[n].className+" ").replace(q," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,s=this[0];if(!arguments.length){if(s)return n=v.valHooks[s.type]||v.valHooks[s.nodeName.toLowerCase()],n&&"get"in n&&(r=n.get(s,"value"))!==t?r:(r=s.value,typeof r=="string"?r.replace(R,""):r==null?"":r);return}return i=v.isFunction(e),this.each(function(r){var s,o=v(this);if(this.nodeType!==1)return;i?s=e.call(this,r,o.val()):s=e,s==null?s="":typeof s=="number"?s+="":v.isArray(s)&&(s=v.map(s,function(e){return e==null?"":e+""})),n=v.valHooks[this.type]||v.valHooks[this.nodeName.toLowerCase()];if(!n||!("set"in n)||n.set(this,s,"value")===t)this.value=s})}}),v.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,s=e.type==="select-one"||i<0,o=s?null:[],u=s?i+1:r.length,a=i<0?u:s?i:0;for(;a<u;a++){n=r[a];if((n.selected||a===i)&&(v.support.optDisabled?!n.disabled:n.getAttribute("disabled")===null)&&(!n.parentNode.disabled||!v.nodeName(n.parentNode,"optgroup"))){t=v(n).val();if(s)return t;o.push(t)}}return o},set:function(e,t){var n=v.makeArray(t);return v(e).find("option").each(function(){this.selected=v.inArray(v(this).val(),n)>=0}),n.length||(e.selectedIndex=-1),n}}},attrFn:{},attr:function(e,n,r,i){var s,o,u,a=e.nodeType;if(!e||a===3||a===8||a===2)return;if(i&&v.isFunction(v.fn[n]))return v(e)[n](r);if(typeof e.getAttribute=="undefined")return v.prop(e,n,r);u=a!==1||!v.isXMLDoc(e),u&&(n=n.toLowerCase(),o=v.attrHooks[n]||(X.test(n)?F:j));if(r!==t){if(r===null){v.removeAttr(e,n);return}return o&&"set"in o&&u&&(s=o.set(e,r,n))!==t?s:(e.setAttribute(n,r+""),r)}return o&&"get"in o&&u&&(s=o.get(e,n))!==null?s:(s=e.getAttribute(n),s===null?t:s)},removeAttr:function(e,t){var n,r,i,s,o=0;if(t&&e.nodeType===1){r=t.split(y);for(;o<r.length;o++)i=r[o],i&&(n=v.propFix[i]||i,s=X.test(i),s||v.attr(e,i,""),e.removeAttribute(V?i:n),s&&n in e&&(e[n]=!1))}},attrHooks:{type:{set:function(e,t){if(U.test(e.nodeName)&&e.parentNode)v.error("type property can't be changed");else if(!v.support.radioValue&&t==="radio"&&v.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}},value:{get:function(e,t){return j&&v.nodeName(e,"button")?j.get(e,t):t in e?e.value:null},set:function(e,t,n){if(j&&v.nodeName(e,"button"))return j.set(e,t,n);e.value=t}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(e,n,r){var i,s,o,u=e.nodeType;if(!e||u===3||u===8||u===2)return;return o=u!==1||!v.isXMLDoc(e),o&&(n=v.propFix[n]||n,s=v.propHooks[n]),r!==t?s&&"set"in s&&(i=s.set(e,r,n))!==t?i:e[n]=r:s&&"get"in s&&(i=s.get(e,n))!==null?i:e[n]},propHooks:{tabIndex:{get:function(e){var n=e.getAttributeNode("tabindex");return n&&n.specified?parseInt(n.value,10):z.test(e.nodeName)||W.test(e.nodeName)&&e.href?0:t}}}}),F={get:function(e,n){var r,i=v.prop(e,n);return i===!0||typeof i!="boolean"&&(r=e.getAttributeNode(n))&&r.nodeValue!==!1?n.toLowerCase():t},set:function(e,t,n){var r;return t===!1?v.removeAttr(e,n):(r=v.propFix[n]||n,r in e&&(e[r]=!0),e.setAttribute(n,n.toLowerCase())),n}},V||(I={name:!0,id:!0,coords:!0},j=v.valHooks.button={get:function(e,n){var r;return r=e.getAttributeNode(n),r&&(I[n]?r.value!=="":r.specified)?r.value:t},set:function(e,t,n){var r=e.getAttributeNode(n);return r||(r=i.createAttribute(n),e.setAttributeNode(r)),r.value=t+""}},v.each(["width","height"],function(e,t){v.attrHooks[t]=v.extend(v.attrHooks[t],{set:function(e,n){if(n==="")return e.setAttribute(t,"auto"),n}})}),v.attrHooks.contenteditable={get:j.get,set:function(e,t,n){t===""&&(t="false"),j.set(e,t,n)}}),v.support.hrefNormalized||v.each(["href","src","width","height"],function(e,n){v.attrHooks[n]=v.extend(v.attrHooks[n],{get:function(e){var r=e.getAttribute(n,2);return r===null?t:r}})}),v.support.style||(v.attrHooks.style={get:function(e){return e.style.cssText.toLowerCase()||t},set:function(e,t){return e.style.cssText=t+""}}),v.support.optSelected||(v.propHooks.selected=v.extend(v.propHooks.selected,{get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}})),v.support.enctype||(v.propFix.enctype="encoding"),v.support.checkOn||v.each(["radio","checkbox"],function(){v.valHooks[this]={get:function(e){return e.getAttribute("value")===null?"on":e.value}}}),v.each(["radio","checkbox"],function(){v.valHooks[this]=v.extend(v.valHooks[this],{set:function(e,t){if(v.isArray(t))return e.checked=v.inArray(v(e).val(),t)>=0}})});var $=/^(?:textarea|input|select)$/i,J=/^([^\.]*|)(?:\.(.+)|)$/,K=/(?:^|\s)hover(\.\S+|)\b/,Q=/^key/,G=/^(?:mouse|contextmenu)|click/,Y=/^(?:focusinfocus|focusoutblur)$/,Z=function(e){return v.event.special.hover?e:e.replace(K,"mouseenter$1 mouseleave$1")};v.event={add:function(e,n,r,i,s){var o,u,a,f,l,c,h,p,d,m,g;if(e.nodeType===3||e.nodeType===8||!n||!r||!(o=v._data(e)))return;r.handler&&(d=r,r=d.handler,s=d.selector),r.guid||(r.guid=v.guid++),a=o.events,a||(o.events=a={}),u=o.handle,u||(o.handle=u=function(e){return typeof v=="undefined"||!!e&&v.event.triggered===e.type?t:v.event.dispatch.apply(u.elem,arguments)},u.elem=e),n=v.trim(Z(n)).split(" ");for(f=0;f<n.length;f++){l=J.exec(n[f])||[],c=l[1],h=(l[2]||"").split(".").sort(),g=v.event.special[c]||{},c=(s?g.delegateType:g.bindType)||c,g=v.event.special[c]||{},p=v.extend({type:c,origType:l[1],data:i,handler:r,guid:r.guid,selector:s,needsContext:s&&v.expr.match.needsContext.test(s),namespace:h.join(".")},d),m=a[c];if(!m){m=a[c]=[],m.delegateCount=0;if(!g.setup||g.setup.call(e,i,h,u)===!1)e.addEventListener?e.addEventListener(c,u,!1):e.attachEvent&&e.attachEvent("on"+c,u)}g.add&&(g.add.call(e,p),p.handler.guid||(p.handler.guid=r.guid)),s?m.splice(m.delegateCount++,0,p):m.push(p),v.event.global[c]=!0}e=null},global:{},remove:function(e,t,n,r,i){var s,o,u,a,f,l,c,h,p,d,m,g=v.hasData(e)&&v._data(e);if(!g||!(h=g.events))return;t=v.trim(Z(t||"")).split(" ");for(s=0;s<t.length;s++){o=J.exec(t[s])||[],u=a=o[1],f=o[2];if(!u){for(u in h)v.event.remove(e,u+t[s],n,r,!0);continue}p=v.event.special[u]||{},u=(r?p.delegateType:p.bindType)||u,d=h[u]||[],l=d.length,f=f?new RegExp("(^|\\.)"+f.split(".").sort().join("\\.(?:.*\\.|)")+"(\\.|$)"):null;for(c=0;c<d.length;c++)m=d[c],(i||a===m.origType)&&(!n||n.guid===m.guid)&&(!f||f.test(m.namespace))&&(!r||r===m.selector||r==="**"&&m.selector)&&(d.splice(c--,1),m.selector&&d.delegateCount--,p.remove&&p.remove.call(e,m));d.length===0&&l!==d.length&&((!p.teardown||p.teardown.call(e,f,g.handle)===!1)&&v.removeEvent(e,u,g.handle),delete h[u])}v.isEmptyObject(h)&&(delete g.handle,v.removeData(e,"events",!0))},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(n,r,s,o){if(!s||s.nodeType!==3&&s.nodeType!==8){var u,a,f,l,c,h,p,d,m,g,y=n.type||n,b=[];if(Y.test(y+v.event.triggered))return;y.indexOf("!")>=0&&(y=y.slice(0,-1),a=!0),y.indexOf(".")>=0&&(b=y.split("."),y=b.shift(),b.sort());if((!s||v.event.customEvent[y])&&!v.event.global[y])return;n=typeof n=="object"?n[v.expando]?n:new v.Event(y,n):new v.Event(y),n.type=y,n.isTrigger=!0,n.exclusive=a,n.namespace=b.join("."),n.namespace_re=n.namespace?new RegExp("(^|\\.)"+b.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,h=y.indexOf(":")<0?"on"+y:"";if(!s){u=v.cache;for(f in u)u[f].events&&u[f].events[y]&&v.event.trigger(n,r,u[f].handle.elem,!0);return}n.result=t,n.target||(n.target=s),r=r!=null?v.makeArray(r):[],r.unshift(n),p=v.event.special[y]||{};if(p.trigger&&p.trigger.apply(s,r)===!1)return;m=[[s,p.bindType||y]];if(!o&&!p.noBubble&&!v.isWindow(s)){g=p.delegateType||y,l=Y.test(g+y)?s:s.parentNode;for(c=s;l;l=l.parentNode)m.push([l,g]),c=l;c===(s.ownerDocument||i)&&m.push([c.defaultView||c.parentWindow||e,g])}for(f=0;f<m.length&&!n.isPropagationStopped();f++)l=m[f][0],n.type=m[f][1],d=(v._data(l,"events")||{})[n.type]&&v._data(l,"handle"),d&&d.apply(l,r),d=h&&l[h],d&&v.acceptData(l)&&d.apply&&d.apply(l,r)===!1&&n.preventDefault();return n.type=y,!o&&!n.isDefaultPrevented()&&(!p._default||p._default.apply(s.ownerDocument,r)===!1)&&(y!=="click"||!v.nodeName(s,"a"))&&v.acceptData(s)&&h&&s[y]&&(y!=="focus"&&y!=="blur"||n.target.offsetWidth!==0)&&!v.isWindow(s)&&(c=s[h],c&&(s[h]=null),v.event.triggered=y,s[y](),v.event.triggered=t,c&&(s[h]=c)),n.result}return},dispatch:function(n){n=v.event.fix(n||e.event);var r,i,s,o,u,a,f,c,h,p,d=(v._data(this,"events")||{})[n.type]||[],m=d.delegateCount,g=l.call(arguments),y=!n.exclusive&&!n.namespace,b=v.event.special[n.type]||{},w=[];g[0]=n,n.delegateTarget=this;if(b.preDispatch&&b.preDispatch.call(this,n)===!1)return;if(m&&(!n.button||n.type!=="click"))for(s=n.target;s!=this;s=s.parentNode||this)if(s.disabled!==!0||n.type!=="click"){u={},f=[];for(r=0;r<m;r++)c=d[r],h=c.selector,u[h]===t&&(u[h]=c.needsContext?v(h,this).index(s)>=0:v.find(h,this,null,[s]).length),u[h]&&f.push(c);f.length&&w.push({elem:s,matches:f})}d.length>m&&w.push({elem:this,matches:d.slice(m)});for(r=0;r<w.length&&!n.isPropagationStopped();r++){a=w[r],n.currentTarget=a.elem;for(i=0;i<a.matches.length&&!n.isImmediatePropagationStopped();i++){c=a.matches[i];if(y||!n.namespace&&!c.namespace||n.namespace_re&&n.namespace_re.test(c.namespace))n.data=c.data,n.handleObj=c,o=((v.event.special[c.origType]||{}).handle||c.handler).apply(a.elem,g),o!==t&&(n.result=o,o===!1&&(n.preventDefault(),n.stopPropagation()))}}return b.postDispatch&&b.postDispatch.call(this,n),n.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return e.which==null&&(e.which=t.charCode!=null?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,s,o,u=n.button,a=n.fromElement;return e.pageX==null&&n.clientX!=null&&(r=e.target.ownerDocument||i,s=r.documentElement,o=r.body,e.pageX=n.clientX+(s&&s.scrollLeft||o&&o.scrollLeft||0)-(s&&s.clientLeft||o&&o.clientLeft||0),e.pageY=n.clientY+(s&&s.scrollTop||o&&o.scrollTop||0)-(s&&s.clientTop||o&&o.clientTop||0)),!e.relatedTarget&&a&&(e.relatedTarget=a===e.target?n.toElement:a),!e.which&&u!==t&&(e.which=u&1?1:u&2?3:u&4?2:0),e}},fix:function(e){if(e[v.expando])return e;var t,n,r=e,s=v.event.fixHooks[e.type]||{},o=s.props?this.props.concat(s.props):this.props;e=v.Event(r);for(t=o.length;t;)n=o[--t],e[n]=r[n];return e.target||(e.target=r.srcElement||i),e.target.nodeType===3&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,r):e},special:{load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(e,t,n){v.isWindow(this)&&(this.onbeforeunload=n)},teardown:function(e,t){this.onbeforeunload===t&&(this.onbeforeunload=null)}}},simulate:function(e,t,n,r){var i=v.extend(new v.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?v.event.trigger(i,null,t):v.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},v.event.handle=v.event.dispatch,v.removeEvent=i.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]=="undefined"&&(e[r]=null),e.detachEvent(r,n))},v.Event=function(e,t){if(!(this instanceof v.Event))return new v.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?tt:et):this.type=e,t&&v.extend(this,t),this.timeStamp=e&&e.timeStamp||v.now(),this[v.expando]=!0},v.Event.prototype={preventDefault:function(){this.isDefaultPrevented=tt;var e=this.originalEvent;if(!e)return;e.preventDefault?e.preventDefault():e.returnValue=!1},stopPropagation:function(){this.isPropagationStopped=tt;var e=this.originalEvent;if(!e)return;e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=tt,this.stopPropagation()},isDefaultPrevented:et,isPropagationStopped:et,isImmediatePropagationStopped:et},v.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){v.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,s=e.handleObj,o=s.selector;if(!i||i!==r&&!v.contains(r,i))e.type=s.origType,n=s.handler.apply(this,arguments),e.type=t;return n}}}),v.support.submitBubbles||(v.event.special.submit={setup:function(){if(v.nodeName(this,"form"))return!1;v.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=v.nodeName(n,"input")||v.nodeName(n,"button")?n.form:t;r&&!v._data(r,"_submit_attached")&&(v.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),v._data(r,"_submit_attached",!0))})},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&v.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){if(v.nodeName(this,"form"))return!1;v.event.remove(this,"._submit")}}),v.support.changeBubbles||(v.event.special.change={setup:function(){if($.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")v.event.add(this,"propertychange._change",function(e){e.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),v.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),v.event.simulate("change",this,e,!0)});return!1}v.event.add(this,"beforeactivate._change",function(e){var t=e.target;$.test(t.nodeName)&&!v._data(t,"_change_attached")&&(v.event.add(t,"change._change",function(e){this.parentNode&&!e.isSimulated&&!e.isTrigger&&v.event.simulate("change",this.parentNode,e,!0)}),v._data(t,"_change_attached",!0))})},handle:function(e){var t=e.target;if(this!==t||e.isSimulated||e.isTrigger||t.type!=="radio"&&t.type!=="checkbox")return e.handleObj.handler.apply(this,arguments)},teardown:function(){return v.event.remove(this,"._change"),!$.test(this.nodeName)}}),v.support.focusinBubbles||v.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){v.event.simulate(t,e.target,v.event.fix(e),!0)};v.event.special[t]={setup:function(){n++===0&&i.addEventListener(e,r,!0)},teardown:function(){--n===0&&i.removeEventListener(e,r,!0)}}}),v.fn.extend({on:function(e,n,r,i,s){var o,u;if(typeof e=="object"){typeof n!="string"&&(r=r||n,n=t);for(u in e)this.on(u,n,r,e[u],s);return this}r==null&&i==null?(i=n,r=n=t):i==null&&(typeof n=="string"?(i=r,r=t):(i=r,r=n,n=t));if(i===!1)i=et;else if(!i)return this;return s===1&&(o=i,i=function(e){return v().off(e),o.apply(this,arguments)},i.guid=o.guid||(o.guid=v.guid++)),this.each(function(){v.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,s;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,v(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if(typeof e=="object"){for(s in e)this.off(s,n,e[s]);return this}if(n===!1||typeof n=="function")r=n,n=t;return r===!1&&(r=et),this.each(function(){v.event.remove(this,e,r,n)})},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},live:function(e,t,n){return v(this.context).on(e,this.selector,t,n),this},die:function(e,t){return v(this.context).off(e,this.selector||"**",t),this},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return arguments.length===1?this.off(e,"**"):this.off(t,e||"**",n)},trigger:function(e,t){return this.each(function(){v.event.trigger(e,t,this)})},triggerHandler:function(e,t){if(this[0])return v.event.trigger(e,t,this[0],!0)},toggle:function(e){var t=arguments,n=e.guid||v.guid++,r=0,i=function(n){var i=(v._data(this,"lastToggle"+e.guid)||0)%r;return v._data(this,"lastToggle"+e.guid,i+1),n.preventDefault(),t[i].apply(this,arguments)||!1};i.guid=n;while(r<t.length)t[r++].guid=n;return this.click(i)},hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),v.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){v.fn[t]=function(e,n){return n==null&&(n=e,e=null),arguments.length>0?this.on(t,null,e,n):this.trigger(t)},Q.test(t)&&(v.event.fixHooks[t]=v.event.keyHooks),G.test(t)&&(v.event.fixHooks[t]=v.event.mouseHooks)}),function(e,t){function nt(e,t,n,r){n=n||[],t=t||g;var i,s,a,f,l=t.nodeType;if(!e||typeof e!="string")return n;if(l!==1&&l!==9)return[];a=o(t);if(!a&&!r)if(i=R.exec(e))if(f=i[1]){if(l===9){s=t.getElementById(f);if(!s||!s.parentNode)return n;if(s.id===f)return n.push(s),n}else if(t.ownerDocument&&(s=t.ownerDocument.getElementById(f))&&u(t,s)&&s.id===f)return n.push(s),n}else{if(i[2])return S.apply(n,x.call(t.getElementsByTagName(e),0)),n;if((f=i[3])&&Z&&t.getElementsByClassName)return S.apply(n,x.call(t.getElementsByClassName(f),0)),n}return vt(e.replace(j,"$1"),t,n,r,a)}function rt(e){return function(t){var n=t.nodeName.toLowerCase();return n==="input"&&t.type===e}}function it(e){return function(t){var n=t.nodeName.toLowerCase();return(n==="input"||n==="button")&&t.type===e}}function st(e){return N(function(t){return t=+t,N(function(n,r){var i,s=e([],n.length,t),o=s.length;while(o--)n[i=s[o]]&&(n[i]=!(r[i]=n[i]))})})}function ot(e,t,n){if(e===t)return n;var r=e.nextSibling;while(r){if(r===t)return-1;r=r.nextSibling}return 1}function ut(e,t){var n,r,s,o,u,a,f,l=L[d][e+" "];if(l)return t?0:l.slice(0);u=e,a=[],f=i.preFilter;while(u){if(!n||(r=F.exec(u)))r&&(u=u.slice(r[0].length)||u),a.push(s=[]);n=!1;if(r=I.exec(u))s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=r[0].replace(j," ");for(o in i.filter)(r=J[o].exec(u))&&(!f[o]||(r=f[o](r)))&&(s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=o,n.matches=r);if(!n)break}return t?u.length:u?nt.error(e):L(e,a).slice(0)}function at(e,t,r){var i=t.dir,s=r&&t.dir==="parentNode",o=w++;return t.first?function(t,n,r){while(t=t[i])if(s||t.nodeType===1)return e(t,n,r)}:function(t,r,u){if(!u){var a,f=b+" "+o+" ",l=f+n;while(t=t[i])if(s||t.nodeType===1){if((a=t[d])===l)return t.sizset;if(typeof a=="string"&&a.indexOf(f)===0){if(t.sizset)return t}else{t[d]=l;if(e(t,r,u))return t.sizset=!0,t;t.sizset=!1}}}else while(t=t[i])if(s||t.nodeType===1)if(e(t,r,u))return t}}function ft(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function lt(e,t,n,r,i){var s,o=[],u=0,a=e.length,f=t!=null;for(;u<a;u++)if(s=e[u])if(!n||n(s,r,i))o.push(s),f&&t.push(u);return o}function ct(e,t,n,r,i,s){return r&&!r[d]&&(r=ct(r)),i&&!i[d]&&(i=ct(i,s)),N(function(s,o,u,a){var f,l,c,h=[],p=[],d=o.length,v=s||dt(t||"*",u.nodeType?[u]:u,[]),m=e&&(s||!t)?lt(v,h,e,u,a):v,g=n?i||(s?e:d||r)?[]:o:m;n&&n(m,g,u,a);if(r){f=lt(g,p),r(f,[],u,a),l=f.length;while(l--)if(c=f[l])g[p[l]]=!(m[p[l]]=c)}if(s){if(i||e){if(i){f=[],l=g.length;while(l--)(c=g[l])&&f.push(m[l]=c);i(null,g=[],f,a)}l=g.length;while(l--)(c=g[l])&&(f=i?T.call(s,c):h[l])>-1&&(s[f]=!(o[f]=c))}}else g=lt(g===o?g.splice(d,g.length):g),i?i(null,o,g,a):S.apply(o,g)})}function ht(e){var t,n,r,s=e.length,o=i.relative[e[0].type],u=o||i.relative[" "],a=o?1:0,f=at(function(e){return e===t},u,!0),l=at(function(e){return T.call(t,e)>-1},u,!0),h=[function(e,n,r){return!o&&(r||n!==c)||((t=n).nodeType?f(e,n,r):l(e,n,r))}];for(;a<s;a++)if(n=i.relative[e[a].type])h=[at(ft(h),n)];else{n=i.filter[e[a].type].apply(null,e[a].matches);if(n[d]){r=++a;for(;r<s;r++)if(i.relative[e[r].type])break;return ct(a>1&&ft(h),a>1&&e.slice(0,a-1).join("").replace(j,"$1"),n,a<r&&ht(e.slice(a,r)),r<s&&ht(e=e.slice(r)),r<s&&e.join(""))}h.push(n)}return ft(h)}function pt(e,t){var r=t.length>0,s=e.length>0,o=function(u,a,f,l,h){var p,d,v,m=[],y=0,w="0",x=u&&[],T=h!=null,N=c,C=u||s&&i.find.TAG("*",h&&a.parentNode||a),k=b+=N==null?1:Math.E;T&&(c=a!==g&&a,n=o.el);for(;(p=C[w])!=null;w++){if(s&&p){for(d=0;v=e[d];d++)if(v(p,a,f)){l.push(p);break}T&&(b=k,n=++o.el)}r&&((p=!v&&p)&&y--,u&&x.push(p))}y+=w;if(r&&w!==y){for(d=0;v=t[d];d++)v(x,m,a,f);if(u){if(y>0)while(w--)!x[w]&&!m[w]&&(m[w]=E.call(l));m=lt(m)}S.apply(l,m),T&&!u&&m.length>0&&y+t.length>1&&nt.uniqueSort(l)}return T&&(b=k,c=N),x};return o.el=0,r?N(o):o}function dt(e,t,n){var r=0,i=t.length;for(;r<i;r++)nt(e,t[r],n);return n}function vt(e,t,n,r,s){var o,u,f,l,c,h=ut(e),p=h.length;if(!r&&h.length===1){u=h[0]=h[0].slice(0);if(u.length>2&&(f=u[0]).type==="ID"&&t.nodeType===9&&!s&&i.relative[u[1].type]){t=i.find.ID(f.matches[0].replace($,""),t,s)[0];if(!t)return n;e=e.slice(u.shift().length)}for(o=J.POS.test(e)?-1:u.length-1;o>=0;o--){f=u[o];if(i.relative[l=f.type])break;if(c=i.find[l])if(r=c(f.matches[0].replace($,""),z.test(u[0].type)&&t.parentNode||t,s)){u.splice(o,1),e=r.length&&u.join("");if(!e)return S.apply(n,x.call(r,0)),n;break}}}return a(e,h)(r,t,s,n,z.test(e)),n}function mt(){}var n,r,i,s,o,u,a,f,l,c,h=!0,p="undefined",d=("sizcache"+Math.random()).replace(".",""),m=String,g=e.document,y=g.documentElement,b=0,w=0,E=[].pop,S=[].push,x=[].slice,T=[].indexOf||function(e){var t=0,n=this.length;for(;t<n;t++)if(this[t]===e)return t;return-1},N=function(e,t){return e[d]=t==null||t,e},C=function(){var e={},t=[];return N(function(n,r){return t.push(n)>i.cacheLength&&delete e[t.shift()],e[n+" "]=r},e)},k=C(),L=C(),A=C(),O="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",_=M.replace("w","w#"),D="([*^$|!~]?=)",P="\\["+O+"*("+M+")"+O+"*(?:"+D+O+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+_+")|)|)"+O+"*\\]",H=":("+M+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:"+P+")|[^:]|\\\\.)*|.*))\\)|)",B=":(even|odd|eq|gt|lt|nth|first|last)(?:\\("+O+"*((?:-\\d)?\\d*)"+O+"*\\)|)(?=[^-]|$)",j=new RegExp("^"+O+"+|((?:^|[^\\\\])(?:\\\\.)*)"+O+"+$","g"),F=new RegExp("^"+O+"*,"+O+"*"),I=new RegExp("^"+O+"*([\\x20\\t\\r\\n\\f>+~])"+O+"*"),q=new RegExp(H),R=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,U=/^:not/,z=/[\x20\t\r\n\f]*[+~]/,W=/:not\($/,X=/h\d/i,V=/input|select|textarea|button/i,$=/\\(?!\\)/g,J={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),NAME:new RegExp("^\\[name=['\"]?("+M+")['\"]?\\]"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+P),PSEUDO:new RegExp("^"+H),POS:new RegExp(B,"i"),CHILD:new RegExp("^:(only|nth|first|last)-child(?:\\("+O+"*(even|odd|(([+-]|)(\\d*)n|)"+O+"*(?:([+-]|)"+O+"*(\\d+)|))"+O+"*\\)|)","i"),needsContext:new RegExp("^"+O+"*[>+~]|"+B,"i")},K=function(e){var t=g.createElement("div");try{return e(t)}catch(n){return!1}finally{t=null}},Q=K(function(e){return e.appendChild(g.createComment("")),!e.getElementsByTagName("*").length}),G=K(function(e){return e.innerHTML="<a href='#'></a>",e.firstChild&&typeof e.firstChild.getAttribute!==p&&e.firstChild.getAttribute("href")==="#"}),Y=K(function(e){e.innerHTML="<select></select>";var t=typeof e.lastChild.getAttribute("multiple");return t!=="boolean"&&t!=="string"}),Z=K(function(e){return e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",!e.getElementsByClassName||!e.getElementsByClassName("e").length?!1:(e.lastChild.className="e",e.getElementsByClassName("e").length===2)}),et=K(function(e){e.id=d+0,e.innerHTML="<a name='"+d+"'></a><div name='"+d+"'></div>",y.insertBefore(e,y.firstChild);var t=g.getElementsByName&&g.getElementsByName(d).length===2+g.getElementsByName(d+0).length;return r=!g.getElementById(d),y.removeChild(e),t});try{x.call(y.childNodes,0)[0].nodeType}catch(tt){x=function(e){var t,n=[];for(;t=this[e];e++)n.push(t);return n}}nt.matches=function(e,t){return nt(e,null,null,t)},nt.matchesSelector=function(e,t){return nt(t,null,null,[e]).length>0},s=nt.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(i===1||i===9||i===11){if(typeof e.textContent=="string")return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=s(e)}else if(i===3||i===4)return e.nodeValue}else for(;t=e[r];r++)n+=s(t);return n},o=nt.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?t.nodeName!=="HTML":!1},u=nt.contains=y.contains?function(e,t){var n=e.nodeType===9?e.documentElement:e,r=t&&t.parentNode;return e===r||!!(r&&r.nodeType===1&&n.contains&&n.contains(r))}:y.compareDocumentPosition?function(e,t){return t&&!!(e.compareDocumentPosition(t)&16)}:function(e,t){while(t=t.parentNode)if(t===e)return!0;return!1},nt.attr=function(e,t){var n,r=o(e);return r||(t=t.toLowerCase()),(n=i.attrHandle[t])?n(e):r||Y?e.getAttribute(t):(n=e.getAttributeNode(t),n?typeof e[t]=="boolean"?e[t]?t:null:n.specified?n.value:null:null)},i=nt.selectors={cacheLength:50,createPseudo:N,match:J,attrHandle:G?{}:{href:function(e){return e.getAttribute("href",2)},type:function(e){return e.getAttribute("type")}},find:{ID:r?function(e,t,n){if(typeof t.getElementById!==p&&!n){var r=t.getElementById(e);return r&&r.parentNode?[r]:[]}}:function(e,n,r){if(typeof n.getElementById!==p&&!r){var i=n.getElementById(e);return i?i.id===e||typeof i.getAttributeNode!==p&&i.getAttributeNode("id").value===e?[i]:t:[]}},TAG:Q?function(e,t){if(typeof t.getElementsByTagName!==p)return t.getElementsByTagName(e)}:function(e,t){var n=t.getElementsByTagName(e);if(e==="*"){var r,i=[],s=0;for(;r=n[s];s++)r.nodeType===1&&i.push(r);return i}return n},NAME:et&&function(e,t){if(typeof t.getElementsByName!==p)return t.getElementsByName(name)},CLASS:Z&&function(e,t,n){if(typeof t.getElementsByClassName!==p&&!n)return t.getElementsByClassName(e)}},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace($,""),e[3]=(e[4]||e[5]||"").replace($,""),e[2]==="~="&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),e[1]==="nth"?(e[2]||nt.error(e[0]),e[3]=+(e[3]?e[4]+(e[5]||1):2*(e[2]==="even"||e[2]==="odd")),e[4]=+(e[6]+e[7]||e[2]==="odd")):e[2]&&nt.error(e[0]),e},PSEUDO:function(e){var t,n;if(J.CHILD.test(e[0]))return null;if(e[3])e[2]=e[3];else if(t=e[4])q.test(t)&&(n=ut(t,!0))&&(n=t.indexOf(")",t.length-n)-t.length)&&(t=t.slice(0,n),e[0]=e[0].slice(0,n)),e[2]=t;return e.slice(0,3)}},filter:{ID:r?function(e){return e=e.replace($,""),function(t){return t.getAttribute("id")===e}}:function(e){return e=e.replace($,""),function(t){var n=typeof t.getAttributeNode!==p&&t.getAttributeNode("id");return n&&n.value===e}},TAG:function(e){return e==="*"?function(){return!0}:(e=e.replace($,"").toLowerCase(),function(t){return t.nodeName&&t.nodeName.toLowerCase()===e})},CLASS:function(e){var t=k[d][e+" "];return t||(t=new RegExp("(^|"+O+")"+e+"("+O+"|$)"))&&k(e,function(e){return t.test(e.className||typeof e.getAttribute!==p&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r,i){var s=nt.attr(r,e);return s==null?t==="!=":t?(s+="",t==="="?s===n:t==="!="?s!==n:t==="^="?n&&s.indexOf(n)===0:t==="*="?n&&s.indexOf(n)>-1:t==="$="?n&&s.substr(s.length-n.length)===n:t==="~="?(" "+s+" ").indexOf(n)>-1:t==="|="?s===n||s.substr(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r){return e==="nth"?function(e){var t,i,s=e.parentNode;if(n===1&&r===0)return!0;if(s){i=0;for(t=s.firstChild;t;t=t.nextSibling)if(t.nodeType===1){i++;if(e===t)break}}return i-=r,i===n||i%n===0&&i/n>=0}:function(t){var n=t;switch(e){case"only":case"first":while(n=n.previousSibling)if(n.nodeType===1)return!1;if(e==="first")return!0;n=t;case"last":while(n=n.nextSibling)if(n.nodeType===1)return!1;return!0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||nt.error("unsupported pseudo: "+e);return r[d]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?N(function(e,n){var i,s=r(e,t),o=s.length;while(o--)i=T.call(e,s[o]),e[i]=!(n[i]=s[o])}):function(e){return r(e,0,n)}):r}},pseudos:{not:N(function(e){var t=[],n=[],r=a(e.replace(j,"$1"));return r[d]?N(function(e,t,n,i){var s,o=r(e,null,i,[]),u=e.length;while(u--)if(s=o[u])e[u]=!(t[u]=s)}):function(e,i,s){return t[0]=e,r(t,null,s,n),!n.pop()}}),has:N(function(e){return function(t){return nt(e,t).length>0}}),contains:N(function(e){return function(t){return(t.textContent||t.innerText||s(t)).indexOf(e)>-1}}),enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&!!e.checked||t==="option"&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},parent:function(e){return!i.pseudos.empty(e)},empty:function(e){var t;e=e.firstChild;while(e){if(e.nodeName>"@"||(t=e.nodeType)===3||t===4)return!1;e=e.nextSibling}return!0},header:function(e){return X.test(e.nodeName)},text:function(e){var t,n;return e.nodeName.toLowerCase()==="input"&&(t=e.type)==="text"&&((n=e.getAttribute("type"))==null||n.toLowerCase()===t)},radio:rt("radio"),checkbox:rt("checkbox"),file:rt("file"),password:rt("password"),image:rt("image"),submit:it("submit"),reset:it("reset"),button:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&e.type==="button"||t==="button"},input:function(e){return V.test(e.nodeName)},focus:function(e){var t=e.ownerDocument;return e===t.activeElement&&(!t.hasFocus||t.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},active:function(e){return e===e.ownerDocument.activeElement},first:st(function(){return[0]}),last:st(function(e,t){return[t-1]}),eq:st(function(e,t,n){return[n<0?n+t:n]}),even:st(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:st(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:st(function(e,t,n){for(var r=n<0?n+t:n;--r>=0;)e.push(r);return e}),gt:st(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}},f=y.compareDocumentPosition?function(e,t){return e===t?(l=!0,0):(!e.compareDocumentPosition||!t.compareDocumentPosition?e.compareDocumentPosition:e.compareDocumentPosition(t)&4)?-1:1}:function(e,t){if(e===t)return l=!0,0;if(e.sourceIndex&&t.sourceIndex)return e.sourceIndex-t.sourceIndex;var n,r,i=[],s=[],o=e.parentNode,u=t.parentNode,a=o;if(o===u)return ot(e,t);if(!o)return-1;if(!u)return 1;while(a)i.unshift(a),a=a.parentNode;a=u;while(a)s.unshift(a),a=a.parentNode;n=i.length,r=s.length;for(var f=0;f<n&&f<r;f++)if(i[f]!==s[f])return ot(i[f],s[f]);return f===n?ot(e,s[f],-1):ot(i[f],t,1)},[0,0].sort(f),h=!l,nt.uniqueSort=function(e){var t,n=[],r=1,i=0;l=h,e.sort(f);if(l){for(;t=e[r];r++)t===e[r-1]&&(i=n.push(r));while(i--)e.splice(n[i],1)}return e},nt.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},a=nt.compile=function(e,t){var n,r=[],i=[],s=A[d][e+" "];if(!s){t||(t=ut(e)),n=t.length;while(n--)s=ht(t[n]),s[d]?r.push(s):i.push(s);s=A(e,pt(i,r))}return s},g.querySelectorAll&&function(){var e,t=vt,n=/'|\\/g,r=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,i=[":focus"],s=[":active"],u=y.matchesSelector||y.mozMatchesSelector||y.webkitMatchesSelector||y.oMatchesSelector||y.msMatchesSelector;K(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||i.push("\\["+O+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),e.querySelectorAll(":checked").length||i.push(":checked")}),K(function(e){e.innerHTML="<p test=''></p>",e.querySelectorAll("[test^='']").length&&i.push("[*^$]="+O+"*(?:\"\"|'')"),e.innerHTML="<input type='hidden'/>",e.querySelectorAll(":enabled").length||i.push(":enabled",":disabled")}),i=new RegExp(i.join("|")),vt=function(e,r,s,o,u){if(!o&&!u&&!i.test(e)){var a,f,l=!0,c=d,h=r,p=r.nodeType===9&&e;if(r.nodeType===1&&r.nodeName.toLowerCase()!=="object"){a=ut(e),(l=r.getAttribute("id"))?c=l.replace(n,"\\$&"):r.setAttribute("id",c),c="[id='"+c+"'] ",f=a.length;while(f--)a[f]=c+a[f].join("");h=z.test(e)&&r.parentNode||r,p=a.join(",")}if(p)try{return S.apply(s,x.call(h.querySelectorAll(p),0)),s}catch(v){}finally{l||r.removeAttribute("id")}}return t(e,r,s,o,u)},u&&(K(function(t){e=u.call(t,"div");try{u.call(t,"[test!='']:sizzle"),s.push("!=",H)}catch(n){}}),s=new RegExp(s.join("|")),nt.matchesSelector=function(t,n){n=n.replace(r,"='$1']");if(!o(t)&&!s.test(n)&&!i.test(n))try{var a=u.call(t,n);if(a||e||t.document&&t.document.nodeType!==11)return a}catch(f){}return nt(n,null,null,[t]).length>0})}(),i.pseudos.nth=i.pseudos.eq,i.filters=mt.prototype=i.pseudos,i.setFilters=new mt,nt.attr=v.attr,v.find=nt,v.expr=nt.selectors,v.expr[":"]=v.expr.pseudos,v.unique=nt.uniqueSort,v.text=nt.getText,v.isXMLDoc=nt.isXML,v.contains=nt.contains}(e);var nt=/Until$/,rt=/^(?:parents|prev(?:Until|All))/,it=/^.[^:#\[\.,]*$/,st=v.expr.match.needsContext,ot={children:!0,contents:!0,next:!0,prev:!0};v.fn.extend({find:function(e){var t,n,r,i,s,o,u=this;if(typeof e!="string")return v(e).filter(function(){for(t=0,n=u.length;t<n;t++)if(v.contains(u[t],this))return!0});o=this.pushStack("","find",e);for(t=0,n=this.length;t<n;t++){r=o.length,v.find(e,this[t],o);if(t>0)for(i=r;i<o.length;i++)for(s=0;s<r;s++)if(o[s]===o[i]){o.splice(i--,1);break}}return o},has:function(e){var t,n=v(e,this),r=n.length;return this.filter(function(){for(t=0;t<r;t++)if(v.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e,!1),"not",e)},filter:function(e){return this.pushStack(ft(this,e,!0),"filter",e)},is:function(e){return!!e&&(typeof e=="string"?st.test(e)?v(e,this.context).index(this[0])>=0:v.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,t){var n,r=0,i=this.length,s=[],o=st.test(e)||typeof e!="string"?v(e,t||this.context):0;for(;r<i;r++){n=this[r];while(n&&n.ownerDocument&&n!==t&&n.nodeType!==11){if(o?o.index(n)>-1:v.find.matchesSelector(n,e)){s.push(n);break}n=n.parentNode}}return s=s.length>1?v.unique(s):s,this.pushStack(s,"closest",e)},index:function(e){return e?typeof e=="string"?v.inArray(this[0],v(e)):v.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.prevAll().length:-1},add:function(e,t){var n=typeof e=="string"?v(e,t):v.makeArray(e&&e.nodeType?[e]:e),r=v.merge(this.get(),n);return this.pushStack(ut(n[0])||ut(r[0])?r:v.unique(r))},addBack:function(e){return this.add(e==null?this.prevObject:this.prevObject.filter(e))}}),v.fn.andSelf=v.fn.addBack,v.each({parent:function(e){var t=e.parentNode;return t&&t.nodeType!==11?t:null},parents:function(e){return v.dir(e,"parentNode")},parentsUntil:function(e,t,n){return v.dir(e,"parentNode",n)},next:function(e){return at(e,"nextSibling")},prev:function(e){return at(e,"previousSibling")},nextAll:function(e){return v.dir(e,"nextSibling")},prevAll:function(e){return v.dir(e,"previousSibling")},nextUntil:function(e,t,n){return v.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return v.dir(e,"previousSibling",n)},siblings:function(e){return v.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return v.sibling(e.firstChild)},contents:function(e){return v.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:v.merge([],e.childNodes)}},function(e,t){v.fn[e]=function(n,r){var i=v.map(this,t,n);return nt.test(e)||(r=n),r&&typeof r=="string"&&(i=v.filter(r,i)),i=this.length>1&&!ot[e]?v.unique(i):i,this.length>1&&rt.test(e)&&(i=i.reverse()),this.pushStack(i,e,l.call(arguments).join(","))}}),v.extend({filter:function(e,t,n){return n&&(e=":not("+e+")"),t.length===1?v.find.matchesSelector(t[0],e)?[t[0]]:[]:v.find.matches(e,t)},dir:function(e,n,r){var i=[],s=e[n];while(s&&s.nodeType!==9&&(r===t||s.nodeType!==1||!v(s).is(r)))s.nodeType===1&&i.push(s),s=s[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)e.nodeType===1&&e!==t&&n.push(e);return n}});var ct="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",ht=/ jQuery\d+="(?:null|\d+)"/g,pt=/^\s+/,dt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,vt=/<([\w:]+)/,mt=/<tbody/i,gt=/<|&#?\w+;/,yt=/<(?:script|style|link)/i,bt=/<(?:script|object|embed|option|style)/i,wt=new RegExp("<(?:"+ct+")[\\s/>]","i"),Et=/^(?:checkbox|radio)$/,St=/checked\s*(?:[^=]|=\s*.checked.)/i,xt=/\/(java|ecma)script/i,Tt=/^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,Nt={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},Ct=lt(i),kt=Ct.appendChild(i.createElement("div"));Nt.optgroup=Nt.option,Nt.tbody=Nt.tfoot=Nt.colgroup=Nt.caption=Nt.thead,Nt.th=Nt.td,v.support.htmlSerialize||(Nt._default=[1,"X<div>","</div>"]),v.fn.extend({text:function(e){return v.access(this,function(e){return e===t?v.text(this):this.empty().append((this[0]&&this[0].ownerDocument||i).createTextNode(e))},null,e,arguments.length)},wrapAll:function(e){if(v.isFunction(e))return this.each(function(t){v(this).wrapAll(e.call(this,t))});if(this[0]){var t=v(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&e.firstChild.nodeType===1)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return v.isFunction(e)?this.each(function(t){v(this).wrapInner(e.call(this,t))}):this.each(function(){var t=v(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=v.isFunction(e);return this.each(function(n){v(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){v.nodeName(this,"body")||v(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.appendChild(e)})},prepend:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.insertBefore(e,this.firstChild)})},before:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(e,this),"before",this.selector)}},after:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this.nextSibling)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(this,e),"after",this.selector)}},remove:function(e,t){var n,r=0;for(;(n=this[r])!=null;r++)if(!e||v.filter(e,[n]).length)!t&&n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),v.cleanData([n])),n.parentNode&&n.parentNode.removeChild(n);return this},empty:function(){var e,t=0;for(;(e=this[t])!=null;t++){e.nodeType===1&&v.cleanData(e.getElementsByTagName("*"));while(e.firstChild)e.removeChild(e.firstChild)}return this},clone:function(e,t){return e=e==null?!1:e,t=t==null?e:t,this.map(function(){return v.clone(this,e,t)})},html:function(e){return v.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return n.nodeType===1?n.innerHTML.replace(ht,""):t;if(typeof e=="string"&&!yt.test(e)&&(v.support.htmlSerialize||!wt.test(e))&&(v.support.leadingWhitespace||!pt.test(e))&&!Nt[(vt.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(dt,"<$1></$2>");try{for(;r<i;r++)n=this[r]||{},n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),n.innerHTML=e);n=0}catch(s){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(e){return ut(this[0])?this.length?this.pushStack(v(v.isFunction(e)?e():e),"replaceWith",e):this:v.isFunction(e)?this.each(function(t){var n=v(this),r=n.html();n.replaceWith(e.call(this,t,r))}):(typeof e!="string"&&(e=v(e).detach()),this.each(function(){var t=this.nextSibling,n=this.parentNode;v(this).remove(),t?v(t).before(e):v(n).append(e)}))},detach:function(e){return this.remove(e,!0)},domManip:function(e,n,r){e=[].concat.apply([],e);var i,s,o,u,a=0,f=e[0],l=[],c=this.length;if(!v.support.checkClone&&c>1&&typeof f=="string"&&St.test(f))return this.each(function(){v(this).domManip(e,n,r)});if(v.isFunction(f))return this.each(function(i){var s=v(this);e[0]=f.call(this,i,n?s.html():t),s.domManip(e,n,r)});if(this[0]){i=v.buildFragment(e,this,l),o=i.fragment,s=o.firstChild,o.childNodes.length===1&&(o=s);if(s){n=n&&v.nodeName(s,"tr");for(u=i.cacheable||c-1;a<c;a++)r.call(n&&v.nodeName(this[a],"table")?Lt(this[a],"tbody"):this[a],a===u?o:v.clone(o,!0,!0))}o=s=null,l.length&&v.each(l,function(e,t){t.src?v.ajax?v.ajax({url:t.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):v.error("no ajax"):v.globalEval((t.text||t.textContent||t.innerHTML||"").replace(Tt,"")),t.parentNode&&t.parentNode.removeChild(t)})}return this}}),v.buildFragment=function(e,n,r){var s,o,u,a=e[0];return n=n||i,n=!n.nodeType&&n[0]||n,n=n.ownerDocument||n,e.length===1&&typeof a=="string"&&a.length<512&&n===i&&a.charAt(0)==="<"&&!bt.test(a)&&(v.support.checkClone||!St.test(a))&&(v.support.html5Clone||!wt.test(a))&&(o=!0,s=v.fragments[a],u=s!==t),s||(s=n.createDocumentFragment(),v.clean(e,n,s,r),o&&(v.fragments[a]=u&&s)),{fragment:s,cacheable:o}},v.fragments={},v.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){v.fn[e]=function(n){var r,i=0,s=[],o=v(n),u=o.length,a=this.length===1&&this[0].parentNode;if((a==null||a&&a.nodeType===11&&a.childNodes.length===1)&&u===1)return o[t](this[0]),this;for(;i<u;i++)r=(i>0?this.clone(!0):this).get(),v(o[i])[t](r),s=s.concat(r);return this.pushStack(s,e,o.selector)}}),v.extend({clone:function(e,t,n){var r,i,s,o;v.support.html5Clone||v.isXMLDoc(e)||!wt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(kt.innerHTML=e.outerHTML,kt.removeChild(o=kt.firstChild));if((!v.support.noCloneEvent||!v.support.noCloneChecked)&&(e.nodeType===1||e.nodeType===11)&&!v.isXMLDoc(e)){Ot(e,o),r=Mt(e),i=Mt(o);for(s=0;r[s];++s)i[s]&&Ot(r[s],i[s])}if(t){At(e,o);if(n){r=Mt(e),i=Mt(o);for(s=0;r[s];++s)At(r[s],i[s])}}return r=i=null,o},clean:function(e,t,n,r){var s,o,u,a,f,l,c,h,p,d,m,g,y=t===i&&Ct,b=[];if(!t||typeof t.createDocumentFragment=="undefined")t=i;for(s=0;(u=e[s])!=null;s++){typeof u=="number"&&(u+="");if(!u)continue;if(typeof u=="string")if(!gt.test(u))u=t.createTextNode(u);else{y=y||lt(t),c=t.createElement("div"),y.appendChild(c),u=u.replace(dt,"<$1></$2>"),a=(vt.exec(u)||["",""])[1].toLowerCase(),f=Nt[a]||Nt._default,l=f[0],c.innerHTML=f[1]+u+f[2];while(l--)c=c.lastChild;if(!v.support.tbody){h=mt.test(u),p=a==="table"&&!h?c.firstChild&&c.firstChild.childNodes:f[1]==="<table>"&&!h?c.childNodes:[];for(o=p.length-1;o>=0;--o)v.nodeName(p[o],"tbody")&&!p[o].childNodes.length&&p[o].parentNode.removeChild(p[o])}!v.support.leadingWhitespace&&pt.test(u)&&c.insertBefore(t.createTextNode(pt.exec(u)[0]),c.firstChild),u=c.childNodes,c.parentNode.removeChild(c)}u.nodeType?b.push(u):v.merge(b,u)}c&&(u=c=y=null);if(!v.support.appendChecked)for(s=0;(u=b[s])!=null;s++)v.nodeName(u,"input")?_t(u):typeof u.getElementsByTagName!="undefined"&&v.grep(u.getElementsByTagName("input"),_t);if(n){m=function(e){if(!e.type||xt.test(e.type))return r?r.push(e.parentNode?e.parentNode.removeChild(e):e):n.appendChild(e)};for(s=0;(u=b[s])!=null;s++)if(!v.nodeName(u,"script")||!m(u))n.appendChild(u),typeof u.getElementsByTagName!="undefined"&&(g=v.grep(v.merge([],u.getElementsByTagName("script")),m),b.splice.apply(b,[s+1,0].concat(g)),s+=g.length)}return b},cleanData:function(e,t){var n,r,i,s,o=0,u=v.expando,a=v.cache,f=v.support.deleteExpando,l=v.event.special;for(;(i=e[o])!=null;o++)if(t||v.acceptData(i)){r=i[u],n=r&&a[r];if(n){if(n.events)for(s in n.events)l[s]?v.event.remove(i,s):v.removeEvent(i,s,n.handle);a[r]&&(delete a[r],f?delete i[u]:i.removeAttribute?i.removeAttribute(u):i[u]=null,v.deletedIds.push(r))}}}}),function(){var e,t;v.uaMatch=function(e){e=e.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0"}},e=v.uaMatch(o.userAgent),t={},e.browser&&(t[e.browser]=!0,t.version=e.version),t.chrome?t.webkit=!0:t.webkit&&(t.safari=!0),v.browser=t,v.sub=function(){function e(t,n){return new e.fn.init(t,n)}v.extend(!0,e,this),e.superclass=this,e.fn=e.prototype=this(),e.fn.constructor=e,e.sub=this.sub,e.fn.init=function(r,i){return i&&i instanceof v&&!(i instanceof e)&&(i=e(i)),v.fn.init.call(this,r,i,t)},e.fn.init.prototype=e.fn;var t=e(i);return e}}();var Dt,Pt,Ht,Bt=/alpha\([^)]*\)/i,jt=/opacity=([^)]*)/,Ft=/^(top|right|bottom|left)$/,It=/^(none|table(?!-c[ea]).+)/,qt=/^margin/,Rt=new RegExp("^("+m+")(.*)$","i"),Ut=new RegExp("^("+m+")(?!px)[a-z%]+$","i"),zt=new RegExp("^([-+])=("+m+")","i"),Wt={BODY:"block"},Xt={position:"absolute",visibility:"hidden",display:"block"},Vt={letterSpacing:0,fontWeight:400},$t=["Top","Right","Bottom","Left"],Jt=["Webkit","O","Moz","ms"],Kt=v.fn.toggle;v.fn.extend({css:function(e,n){return v.access(this,function(e,n,r){return r!==t?v.style(e,n,r):v.css(e,n)},e,n,arguments.length>1)},show:function(){return Yt(this,!0)},hide:function(){return Yt(this)},toggle:function(e,t){var n=typeof e=="boolean";return v.isFunction(e)&&v.isFunction(t)?Kt.apply(this,arguments):this.each(function(){(n?e:Gt(this))?v(this).show():v(this).hide()})}}),v.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Dt(e,"opacity");return n===""?"1":n}}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":v.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(!e||e.nodeType===3||e.nodeType===8||!e.style)return;var s,o,u,a=v.camelCase(n),f=e.style;n=v.cssProps[a]||(v.cssProps[a]=Qt(f,a)),u=v.cssHooks[n]||v.cssHooks[a];if(r===t)return u&&"get"in u&&(s=u.get(e,!1,i))!==t?s:f[n];o=typeof r,o==="string"&&(s=zt.exec(r))&&(r=(s[1]+1)*s[2]+parseFloat(v.css(e,n)),o="number");if(r==null||o==="number"&&isNaN(r))return;o==="number"&&!v.cssNumber[a]&&(r+="px");if(!u||!("set"in u)||(r=u.set(e,r,i))!==t)try{f[n]=r}catch(l){}},css:function(e,n,r,i){var s,o,u,a=v.camelCase(n);return n=v.cssProps[a]||(v.cssProps[a]=Qt(e.style,a)),u=v.cssHooks[n]||v.cssHooks[a],u&&"get"in u&&(s=u.get(e,!0,i)),s===t&&(s=Dt(e,n)),s==="normal"&&n in Vt&&(s=Vt[n]),r||i!==t?(o=parseFloat(s),r||v.isNumeric(o)?o||0:s):s},swap:function(e,t,n){var r,i,s={};for(i in t)s[i]=e.style[i],e.style[i]=t[i];r=n.call(e);for(i in t)e.style[i]=s[i];return r}}),e.getComputedStyle?Dt=function(t,n){var r,i,s,o,u=e.getComputedStyle(t,null),a=t.style;return u&&(r=u.getPropertyValue(n)||u[n],r===""&&!v.contains(t.ownerDocument,t)&&(r=v.style(t,n)),Ut.test(r)&&qt.test(n)&&(i=a.width,s=a.minWidth,o=a.maxWidth,a.minWidth=a.maxWidth=a.width=r,r=u.width,a.width=i,a.minWidth=s,a.maxWidth=o)),r}:i.documentElement.currentStyle&&(Dt=function(e,t){var n,r,i=e.currentStyle&&e.currentStyle[t],s=e.style;return i==null&&s&&s[t]&&(i=s[t]),Ut.test(i)&&!Ft.test(t)&&(n=s.left,r=e.runtimeStyle&&e.runtimeStyle.left,r&&(e.runtimeStyle.left=e.currentStyle.left),s.left=t==="fontSize"?"1em":i,i=s.pixelLeft+"px",s.left=n,r&&(e.runtimeStyle.left=r)),i===""?"auto":i}),v.each(["height","width"],function(e,t){v.cssHooks[t]={get:function(e,n,r){if(n)return e.offsetWidth===0&&It.test(Dt(e,"display"))?v.swap(e,Xt,function(){return tn(e,t,r)}):tn(e,t,r)},set:function(e,n,r){return Zt(e,n,r?en(e,t,r,v.support.boxSizing&&v.css(e,"boxSizing")==="border-box"):0)}}}),v.support.opacity||(v.cssHooks.opacity={get:function(e,t){return jt.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=v.isNumeric(t)?"alpha(opacity="+t*100+")":"",s=r&&r.filter||n.filter||"";n.zoom=1;if(t>=1&&v.trim(s.replace(Bt,""))===""&&n.removeAttribute){n.removeAttribute("filter");if(r&&!r.filter)return}n.filter=Bt.test(s)?s.replace(Bt,i):s+" "+i}}),v(function(){v.support.reliableMarginRight||(v.cssHooks.marginRight={get:function(e,t){return v.swap(e,{display:"inline-block"},function(){if(t)return Dt(e,"marginRight")})}}),!v.support.pixelPosition&&v.fn.position&&v.each(["top","left"],function(e,t){v.cssHooks[t]={get:function(e,n){if(n){var r=Dt(e,t);return Ut.test(r)?v(e).position()[t]+"px":r}}}})}),v.expr&&v.expr.filters&&(v.expr.filters.hidden=function(e){return e.offsetWidth===0&&e.offsetHeight===0||!v.support.reliableHiddenOffsets&&(e.style&&e.style.display||Dt(e,"display"))==="none"},v.expr.filters.visible=function(e){return!v.expr.filters.hidden(e)}),v.each({margin:"",padding:"",border:"Width"},function(e,t){v.cssHooks[e+t]={expand:function(n){var r,i=typeof n=="string"?n.split(" "):[n],s={};for(r=0;r<4;r++)s[e+$t[r]+t]=i[r]||i[r-2]||i[0];return s}},qt.test(e)||(v.cssHooks[e+t].set=Zt)});var rn=/%20/g,sn=/\[\]$/,on=/\r?\n/g,un=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,an=/^(?:select|textarea)/i;v.fn.extend({serialize:function(){return v.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?v.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||an.test(this.nodeName)||un.test(this.type))}).map(function(e,t){var n=v(this).val();return n==null?null:v.isArray(n)?v.map(n,function(e,n){return{name:t.name,value:e.replace(on,"\r\n")}}):{name:t.name,value:n.replace(on,"\r\n")}}).get()}}),v.param=function(e,n){var r,i=[],s=function(e,t){t=v.isFunction(t)?t():t==null?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};n===t&&(n=v.ajaxSettings&&v.ajaxSettings.traditional);if(v.isArray(e)||e.jquery&&!v.isPlainObject(e))v.each(e,function(){s(this.name,this.value)});else for(r in e)fn(r,e[r],n,s);return i.join("&").replace(rn,"+")};var ln,cn,hn=/#.*$/,pn=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,dn=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,vn=/^(?:GET|HEAD)$/,mn=/^\/\//,gn=/\?/,yn=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bn=/([?&])_=[^&]*/,wn=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,En=v.fn.load,Sn={},xn={},Tn=["*/"]+["*"];try{cn=s.href}catch(Nn){cn=i.createElement("a"),cn.href="",cn=cn.href}ln=wn.exec(cn.toLowerCase())||[],v.fn.load=function(e,n,r){if(typeof e!="string"&&En)return En.apply(this,arguments);if(!this.length)return this;var i,s,o,u=this,a=e.indexOf(" ");return a>=0&&(i=e.slice(a,e.length),e=e.slice(0,a)),v.isFunction(n)?(r=n,n=t):n&&typeof n=="object"&&(s="POST"),v.ajax({url:e,type:s,dataType:"html",data:n,complete:function(e,t){r&&u.each(r,o||[e.responseText,t,e])}}).done(function(e){o=arguments,u.html(i?v("<div>").append(e.replace(yn,"")).find(i):e)}),this},v.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(e,t){v.fn[t]=function(e){return this.on(t,e)}}),v.each(["get","post"],function(e,n){v[n]=function(e,r,i,s){return v.isFunction(r)&&(s=s||i,i=r,r=t),v.ajax({type:n,url:e,data:r,success:i,dataType:s})}}),v.extend({getScript:function(e,n){return v.get(e,t,n,"script")},getJSON:function(e,t,n){return v.get(e,t,n,"json")},ajaxSetup:function(e,t){return t?Ln(e,v.ajaxSettings):(t=e,e=v.ajaxSettings),Ln(e,t),e},ajaxSettings:{url:cn,isLocal:dn.test(ln[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":Tn},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":e.String,"text html":!0,"text json":v.parseJSON,"text xml":v.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:Cn(Sn),ajaxTransport:Cn(xn),ajax:function(e,n){function T(e,n,s,a){var l,y,b,w,S,T=n;if(E===2)return;E=2,u&&clearTimeout(u),o=t,i=a||"",x.readyState=e>0?4:0,s&&(w=An(c,x,s));if(e>=200&&e<300||e===304)c.ifModified&&(S=x.getResponseHeader("Last-Modified"),S&&(v.lastModified[r]=S),S=x.getResponseHeader("Etag"),S&&(v.etag[r]=S)),e===304?(T="notmodified",l=!0):(l=On(c,w),T=l.state,y=l.data,b=l.error,l=!b);else{b=T;if(!T||e)T="error",e<0&&(e=0)}x.status=e,x.statusText=(n||T)+"",l?d.resolveWith(h,[y,T,x]):d.rejectWith(h,[x,T,b]),x.statusCode(g),g=t,f&&p.trigger("ajax"+(l?"Success":"Error"),[x,c,l?y:b]),m.fireWith(h,[x,T]),f&&(p.trigger("ajaxComplete",[x,c]),--v.active||v.event.trigger("ajaxStop"))}typeof e=="object"&&(n=e,e=t),n=n||{};var r,i,s,o,u,a,f,l,c=v.ajaxSetup({},n),h=c.context||c,p=h!==c&&(h.nodeType||h instanceof v)?v(h):v.event,d=v.Deferred(),m=v.Callbacks("once memory"),g=c.statusCode||{},b={},w={},E=0,S="canceled",x={readyState:0,setRequestHeader:function(e,t){if(!E){var n=e.toLowerCase();e=w[n]=w[n]||e,b[e]=t}return this},getAllResponseHeaders:function(){return E===2?i:null},getResponseHeader:function(e){var n;if(E===2){if(!s){s={};while(n=pn.exec(i))s[n[1].toLowerCase()]=n[2]}n=s[e.toLowerCase()]}return n===t?null:n},overrideMimeType:function(e){return E||(c.mimeType=e),this},abort:function(e){return e=e||S,o&&o.abort(e),T(0,e),this}};d.promise(x),x.success=x.done,x.error=x.fail,x.complete=m.add,x.statusCode=function(e){if(e){var t;if(E<2)for(t in e)g[t]=[g[t],e[t]];else t=e[x.status],x.always(t)}return this},c.url=((e||c.url)+"").replace(hn,"").replace(mn,ln[1]+"//"),c.dataTypes=v.trim(c.dataType||"*").toLowerCase().split(y),c.crossDomain==null&&(a=wn.exec(c.url.toLowerCase()),c.crossDomain=!(!a||a[1]===ln[1]&&a[2]===ln[2]&&(a[3]||(a[1]==="http:"?80:443))==(ln[3]||(ln[1]==="http:"?80:443)))),c.data&&c.processData&&typeof c.data!="string"&&(c.data=v.param(c.data,c.traditional)),kn(Sn,c,n,x);if(E===2)return x;f=c.global,c.type=c.type.toUpperCase(),c.hasContent=!vn.test(c.type),f&&v.active++===0&&v.event.trigger("ajaxStart");if(!c.hasContent){c.data&&(c.url+=(gn.test(c.url)?"&":"?")+c.data,delete c.data),r=c.url;if(c.cache===!1){var N=v.now(),C=c.url.replace(bn,"$1_="+N);c.url=C+(C===c.url?(gn.test(c.url)?"&":"?")+"_="+N:"")}}(c.data&&c.hasContent&&c.contentType!==!1||n.contentType)&&x.setRequestHeader("Content-Type",c.contentType),c.ifModified&&(r=r||c.url,v.lastModified[r]&&x.setRequestHeader("If-Modified-Since",v.lastModified[r]),v.etag[r]&&x.setRequestHeader("If-None-Match",v.etag[r])),x.setRequestHeader("Accept",c.dataTypes[0]&&c.accepts[c.dataTypes[0]]?c.accepts[c.dataTypes[0]]+(c.dataTypes[0]!=="*"?", "+Tn+"; q=0.01":""):c.accepts["*"]);for(l in c.headers)x.setRequestHeader(l,c.headers[l]);if(!c.beforeSend||c.beforeSend.call(h,x,c)!==!1&&E!==2){S="abort";for(l in{success:1,error:1,complete:1})x[l](c[l]);o=kn(xn,c,n,x);if(!o)T(-1,"No Transport");else{x.readyState=1,f&&p.trigger("ajaxSend",[x,c]),c.async&&c.timeout>0&&(u=setTimeout(function(){x.abort("timeout")},c.timeout));try{E=1,o.send(b,T)}catch(k){if(!(E<2))throw k;T(-1,k)}}return x}return x.abort()},active:0,lastModified:{},etag:{}});var Mn=[],_n=/\?/,Dn=/(=)\?(?=&|$)|\?\?/,Pn=v.now();v.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Mn.pop()||v.expando+"_"+Pn++;return this[e]=!0,e}}),v.ajaxPrefilter("json jsonp",function(n,r,i){var s,o,u,a=n.data,f=n.url,l=n.jsonp!==!1,c=l&&Dn.test(f),h=l&&!c&&typeof a=="string"&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Dn.test(a);if(n.dataTypes[0]==="jsonp"||c||h)return s=n.jsonpCallback=v.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,o=e[s],c?n.url=f.replace(Dn,"$1"+s):h?n.data=a.replace(Dn,"$1"+s):l&&(n.url+=(_n.test(f)?"&":"?")+n.jsonp+"="+s),n.converters["script json"]=function(){return u||v.error(s+" was not called"),u[0]},n.dataTypes[0]="json",e[s]=function(){u=arguments},i.always(function(){e[s]=o,n[s]&&(n.jsonpCallback=r.jsonpCallback,Mn.push(s)),u&&v.isFunction(o)&&o(u[0]),u=o=t}),"script"}),v.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(e){return v.globalEval(e),e}}}),v.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),v.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=i.head||i.getElementsByTagName("head")[0]||i.documentElement;return{send:function(s,o){n=i.createElement("script"),n.async="async",e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,i){if(i||!n.readyState||/loaded|complete/.test(n.readyState))n.onload=n.onreadystatechange=null,r&&n.parentNode&&r.removeChild(n),n=t,i||o(200,"success")},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(0,1)}}}});var Hn,Bn=e.ActiveXObject?function(){for(var e in Hn)Hn[e](0,1)}:!1,jn=0;v.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&Fn()||In()}:Fn,function(e){v.extend(v.support,{ajax:!!e,cors:!!e&&"withCredentials"in e})}(v.ajaxSettings.xhr()),v.support.ajax&&v.ajaxTransport(function(n){if(!n.crossDomain||v.support.cors){var r;return{send:function(i,s){var o,u,a=n.xhr();n.username?a.open(n.type,n.url,n.async,n.username,n.password):a.open(n.type,n.url,n.async);if(n.xhrFields)for(u in n.xhrFields)a[u]=n.xhrFields[u];n.mimeType&&a.overrideMimeType&&a.overrideMimeType(n.mimeType),!n.crossDomain&&!i["X-Requested-With"]&&(i["X-Requested-With"]="XMLHttpRequest");try{for(u in i)a.setRequestHeader(u,i[u])}catch(f){}a.send(n.hasContent&&n.data||null),r=function(e,i){var u,f,l,c,h;try{if(r&&(i||a.readyState===4)){r=t,o&&(a.onreadystatechange=v.noop,Bn&&delete Hn[o]);if(i)a.readyState!==4&&a.abort();else{u=a.status,l=a.getAllResponseHeaders(),c={},h=a.responseXML,h&&h.documentElement&&(c.xml=h);try{c.text=a.responseText}catch(p){}try{f=a.statusText}catch(p){f=""}!u&&n.isLocal&&!n.crossDomain?u=c.text?200:404:u===1223&&(u=204)}}}catch(d){i||s(-1,d)}c&&s(u,f,c,l)},n.async?a.readyState===4?setTimeout(r,0):(o=++jn,Bn&&(Hn||(Hn={},v(e).unload(Bn)),Hn[o]=r),a.onreadystatechange=r):r()},abort:function(){r&&r(0,1)}}}});var qn,Rn,Un=/^(?:toggle|show|hide)$/,zn=new RegExp("^(?:([-+])=|)("+m+")([a-z%]*)$","i"),Wn=/queueHooks$/,Xn=[Gn],Vn={"*":[function(e,t){var n,r,i=this.createTween(e,t),s=zn.exec(t),o=i.cur(),u=+o||0,a=1,f=20;if(s){n=+s[2],r=s[3]||(v.cssNumber[e]?"":"px");if(r!=="px"&&u){u=v.css(i.elem,e,!0)||n||1;do a=a||".5",u/=a,v.style(i.elem,e,u+r);while(a!==(a=i.cur()/o)&&a!==1&&--f)}i.unit=r,i.start=u,i.end=s[1]?u+(s[1]+1)*n:n}return i}]};v.Animation=v.extend(Kn,{tweener:function(e,t){v.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;r<i;r++)n=e[r],Vn[n]=Vn[n]||[],Vn[n].unshift(t)},prefilter:function(e,t){t?Xn.unshift(e):Xn.push(e)}}),v.Tween=Yn,Yn.prototype={constructor:Yn,init:function(e,t,n,r,i,s){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=s||(v.cssNumber[n]?"":"px")},cur:function(){var e=Yn.propHooks[this.prop];return e&&e.get?e.get(this):Yn.propHooks._default.get(this)},run:function(e){var t,n=Yn.propHooks[this.prop];return this.options.duration?this.pos=t=v.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Yn.propHooks._default.set(this),this}},Yn.prototype.init.prototype=Yn.prototype,Yn.propHooks={_default:{get:function(e){var t;return e.elem[e.prop]==null||!!e.elem.style&&e.elem.style[e.prop]!=null?(t=v.css(e.elem,e.prop,!1,""),!t||t==="auto"?0:t):e.elem[e.prop]},set:function(e){v.fx.step[e.prop]?v.fx.step[e.prop](e):e.elem.style&&(e.elem.style[v.cssProps[e.prop]]!=null||v.cssHooks[e.prop])?v.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},Yn.propHooks.scrollTop=Yn.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},v.each(["toggle","show","hide"],function(e,t){var n=v.fn[t];v.fn[t]=function(r,i,s){return r==null||typeof r=="boolean"||!e&&v.isFunction(r)&&v.isFunction(i)?n.apply(this,arguments):this.animate(Zn(t,!0),r,i,s)}}),v.fn.extend({fadeTo:function(e,t,n,r){return this.filter(Gt).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=v.isEmptyObject(e),s=v.speed(t,n,r),o=function(){var t=Kn(this,v.extend({},e),s);i&&t.stop(!0)};return i||s.queue===!1?this.each(o):this.queue(s.queue,o)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return typeof e!="string"&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=e!=null&&e+"queueHooks",s=v.timers,o=v._data(this);if(n)o[n]&&o[n].stop&&i(o[n]);else for(n in o)o[n]&&o[n].stop&&Wn.test(n)&&i(o[n]);for(n=s.length;n--;)s[n].elem===this&&(e==null||s[n].queue===e)&&(s[n].anim.stop(r),t=!1,s.splice(n,1));(t||!r)&&v.dequeue(this,e)})}}),v.each({slideDown:Zn("show"),slideUp:Zn("hide"),slideToggle:Zn("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){v.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),v.speed=function(e,t,n){var r=e&&typeof e=="object"?v.extend({},e):{complete:n||!n&&t||v.isFunction(e)&&e,duration:e,easing:n&&t||t&&!v.isFunction(t)&&t};r.duration=v.fx.off?0:typeof r.duration=="number"?r.duration:r.duration in v.fx.speeds?v.fx.speeds[r.duration]:v.fx.speeds._default;if(r.queue==null||r.queue===!0)r.queue="fx";return r.old=r.complete,r.complete=function(){v.isFunction(r.old)&&r.old.call(this),r.queue&&v.dequeue(this,r.queue)},r},v.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},v.timers=[],v.fx=Yn.prototype.init,v.fx.tick=function(){var e,n=v.timers,r=0;qn=v.now();for(;r<n.length;r++)e=n[r],!e()&&n[r]===e&&n.splice(r--,1);n.length||v.fx.stop(),qn=t},v.fx.timer=function(e){e()&&v.timers.push(e)&&!Rn&&(Rn=setInterval(v.fx.tick,v.fx.interval))},v.fx.interval=13,v.fx.stop=function(){clearInterval(Rn),Rn=null},v.fx.speeds={slow:600,fast:200,_default:400},v.fx.step={},v.expr&&v.expr.filters&&(v.expr.filters.animated=function(e){return v.grep(v.timers,function(t){return e===t.elem}).length});var er=/^(?:body|html)$/i;v.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){v.offset.setOffset(this,e,t)});var n,r,i,s,o,u,a,f={top:0,left:0},l=this[0],c=l&&l.ownerDocument;if(!c)return;return(r=c.body)===l?v.offset.bodyOffset(l):(n=c.documentElement,v.contains(n,l)?(typeof l.getBoundingClientRect!="undefined"&&(f=l.getBoundingClientRect()),i=tr(c),s=n.clientTop||r.clientTop||0,o=n.clientLeft||r.clientLeft||0,u=i.pageYOffset||n.scrollTop,a=i.pageXOffset||n.scrollLeft,{top:f.top+u-s,left:f.left+a-o}):f)},v.offset={bodyOffset:function(e){var t=e.offsetTop,n=e.offsetLeft;return v.support.doesNotIncludeMarginInBodyOffset&&(t+=parseFloat(v.css(e,"marginTop"))||0,n+=parseFloat(v.css(e,"marginLeft"))||0),{top:t,left:n}},setOffset:function(e,t,n){var r=v.css(e,"position");r==="static"&&(e.style.position="relative");var i=v(e),s=i.offset(),o=v.css(e,"top"),u=v.css(e,"left"),a=(r==="absolute"||r==="fixed")&&v.inArray("auto",[o,u])>-1,f={},l={},c,h;a?(l=i.position(),c=l.top,h=l.left):(c=parseFloat(o)||0,h=parseFloat(u)||0),v.isFunction(t)&&(t=t.call(e,n,s)),t.top!=null&&(f.top=t.top-s.top+c),t.left!=null&&(f.left=t.left-s.left+h),"using"in t?t.using.call(e,f):i.css(f)}},v.fn.extend({position:function(){if(!this[0])return;var e=this[0],t=this.offsetParent(),n=this.offset(),r=er.test(t[0].nodeName)?{top:0,left:0}:t.offset();return n.top-=parseFloat(v.css(e,"marginTop"))||0,n.left-=parseFloat(v.css(e,"marginLeft"))||0,r.top+=parseFloat(v.css(t[0],"borderTopWidth"))||0,r.left+=parseFloat(v.css(t[0],"borderLeftWidth"))||0,{top:n.top-r.top,left:n.left-r.left}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||i.body;while(e&&!er.test(e.nodeName)&&v.css(e,"position")==="static")e=e.offsetParent;return e||i.body})}}),v.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);v.fn[e]=function(i){return v.access(this,function(e,i,s){var o=tr(e);if(s===t)return o?n in o?o[n]:o.document.documentElement[i]:e[i];o?o.scrollTo(r?v(o).scrollLeft():s,r?s:v(o).scrollTop()):e[i]=s},e,i,arguments.length,null)}}),v.each({Height:"height",Width:"width"},function(e,n){v.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){v.fn[i]=function(i,s){var o=arguments.length&&(r||typeof i!="boolean"),u=r||(i===!0||s===!0?"margin":"border");return v.access(this,function(n,r,i){var s;return v.isWindow(n)?n.document.documentElement["client"+e]:n.nodeType===9?(s=n.documentElement,Math.max(n.body["scroll"+e],s["scroll"+e],n.body["offset"+e],s["offset"+e],s["client"+e])):i===t?v.css(n,r,i,u):v.style(n,r,i,u)},n,o?i:t,o,null)}})}),e.jQuery=e.$=v,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return v})})(window);
define('work/public/bodyFrame/c/main',[
    'require',
    "jquery",
], function(require,$) {
    'use strict';
    //登陆注册点击事件
    let main = {
        // mainStr 为传出的字符串，json共两个信息，一个是是否返回用户数据的returnFlag，false则未登录，true则已登录，据此返回相应字符串
        str:function(json){
            return `
                    `;
        },
        // 为当前组件添加事件。
        fun:function(){
            $(".pageTitle .pageTitle-main .contact").click(function(){

            });
        }
    }
    return {
        "main":main,
        // "register":register
    };

});

define('app/setPlc_0.0.1',["jquery"],function($){
    'use strict'
    return {
                LineHeight:function(Ele) {
                    $(Ele).css("line-height", $(Ele).parent().height() + "px");
                },
                LineHeightSelf:function(Ele) {
                    $(Ele).css("line-height", $(Ele).height() + "px");
                },
                DivHeight:function(Ele) {
                    let zhi1 = $(Ele).parent().height();
                    let zhi2 = $(Ele).height();
                    let zhi = (zhi1 - zhi2) / 2;
                    $(Ele).css("margin-top", zhi + "px");
                },
                DivWidth:function(Ele) {
                    let zhi1 = $(Ele).parent().width();
                    let zhi2 = $(Ele).width();
                    let zhi = (zhi1 - zhi2) / 2;
                    $(Ele).css("margin-left", zhi + "px");
                },
                DivWidthParent:function(Ele) {
                    let zhi1 = $(Ele).parent().parent().width();
                    let zhi2 = $(Ele).width();
                    let zhi = (zhi1 - zhi2) / 2;
                    $(Ele).css("margin-left", zhi + "px");
                },
                DivMarginLeft:function(Ele) {
                    let zhi1 = $(Ele).parent().width();
                    let zhi2 = $(Ele).width();
                    $(Ele).css("margin-left", (zhi1 - zhi2) / 2 + "px")
                },
                resetLeftPlace:function(a, b) {
                    console.log($(a).css("margin-left"));
                    $(b).css("margin-left", parseInt($(a).position().left) + "px");
                }

             };
});
define('work/public/alert/c/main',[
    'require',
    "jquery",
    "app/setPlc_0.0.1"
], function(require,$,setPlc) {
    'use strict';
    let main = {
        // mainStr 为传出的字符串，json共两个信息，一个是是否返回用户数据的returnFlag，false则未登录，true则已登录，据此返回相应字符串
        str:function(imgAdd){
            return `	
                      <div class=" loginMax" style="display:none;">
                            <img src="${imgAdd}" alt="">
                            <div class="blackBG hasHand"></div>
                        </div>
                    `;
        },
        str2:function(imgAdd){
            return `	
                      <div class=" loginMax" style="display:none;">
                            <img src="${imgAdd}" alt="">
                            <div class="blackBG hasHand"></div>
                        </div>
                    `;
        },
        str3:function(add){
            return `
                
            `;
        },
        // 为当前组件添加事件。
        fun:function(add){
            $(add).click(function(){
                $(".loginMax").show();
                //绑定 禁止滑动事件
                $("body").bind("touchmove",function(event){
                    event.preventDefault;
                });
                // $("body").css("overflow","hidden");
                $('body').css({'position':'fixed',"width":"100%"});
            });
        },
        onceFun:function(json){
            $(".blackBG").click(function(){
                // alert(2)
                $(".loginMax").hide();
                //取消 禁止滑动事件
                $("body").unbind("touchmove");
                // $("body").css("overflow","auto");
                $("body").css({"position":"initial","height":"auto"});      
            });
            $(".loginMax img").click(function(){
                window.location.href=rootUrl + json.url;
            });
            //居中
            setPlc.DivWidth(".loginMax img");
            // setPlc.DivHeight(".loginMax img");
        },
        add:function(json){
            let loginMaxLen = $("body .loginMax",parent.document).length;
            if(loginMaxLen > 0){
                $("body .loginMax",parent.document).remove();
            }
            $("body",parent.document).append(json.str)
            $(json.add).click(function(){
                $(".loginMax",parent.document).show();
                //绑定 禁止滑动事件
                $("body",parent.document).bind("touchmove",function(event){
                    event.preventDefault;
                });
                // $("body").css("overflow","hidden");
                $('body',parent.document).css({'position':'fixed',"width":"100%"});
            });
            $(".blackBG",parent.document).click(function(){
                // alert(2)
                $(".loginMax",parent.document).hide();
                //取消 禁止滑动事件
                $("body",parent.document).unbind("touchmove");
                // $("body").css("overflow","auto");
                $("body",parent.document).css({"position":"initial","height":"auto"});      
            });
            $(".loginMax .button>div",parent.document).click(function(){
                $(".loginMax",parent.document).hide();
                //取消 禁止滑动事件
                $("body",parent.document).unbind("touchmove");
                // $("body").css("overflow","auto");
                $("body",parent.document).css({"position":"initial","height":"auto"});      
            });
            //居中
            let zhi1 = $(".loginMax .body",parent.document).parent().width();
            let zhi2 = $(".loginMax .body",parent.document).width();
            let zhi = (zhi1 - zhi2) / 2;
            $(".loginMax .body",parent.document).css("margin-left", zhi + "px");
        }
    }
    return {
        "main":main,
        // "register":register
    };

//     /* 组件处理单元 开始 login*/
//     var imgAdd2 = AJAX.imgAdd_login;
//     //此处通过返回的json去获取相应的字符串
//     var str05 =login.main.str(imgAdd2);
//     //将字符串添加到dom里
//     $("body").append(str05);
//     //为此节点绑定特定事件(显示login)
//     var hisUrl = $(".titleBar-main a:eq(2)").attr("href");
//     $(".titleBar-main a:eq(2)").attr("href","javascript:void(0)");
//     var loginData = {};
//     loginData.url = hisUrl;
//     login.main.fun(".titleBar-main a:eq(2)");
//     login.main.fun(".titleBar_eyeDepa-main .contact img");
//     login.main.onceFun(loginData);
// /* 组件处理单元 结束 login*/
});

define('app/tabsFunctions',[
    'require',
    "jquery",
    "app/PKG_0.0.1",
    "work/public/alert/c/main",
], function (require,$,PKG,Alert) {
    'use strict';
    let fun={
        /* Fun_1  修改index页当前定位*/
        changePosition:function(data){
            let LFDep_CN = data.LFDep_CN;
            let LFID_CN = data.LFID_CN;
            let tabName_CN = data.tabName_CN;
            let isParentDoc = data.isParentDoc;
            tabName_CN == ""?tabName_CN = "":tabName_CN = " > "+tabName_CN;
            let str = `
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-dangqianchengshi"></use>
                </svg>
            当前位置：>
            <span >${LFDep_CN}</span>> 
            <span >${LFID_CN}</span>
            <span >${tabName_CN}</span>
            `;
            if(isParentDoc === undefined){
                $("#addInfo",parent.document).html(str);            
            }else{
                $("#addInfo").html(str);            
            }
        },
        /* Fun_2  插入T1B1*/
        insertT1B1:function(data){
            let LFID = data.LFID;
            let isParentDoc = data.isParentDoc;
            let str1 = `
            <div  LFID="${LFID}" isShow="yes"></div>
            `;
            if(isParentDoc == undefined){
                $("#tabs .tabs",parent.document).append(str1);
                $("#tabs .iframes",parent.document).append(str1);          
            }else{
                $("#tabs .tabs").append(str1);
                $("#tabs .iframes").append(str1);            
            }
        },
        /* Fun_3  插入T2B2*/
        insertT2B2:function(data){
            let LFID = data.LFID;
            let tabName = data.tabName;
            let tabName_CN = data.tabName_CN;
            let isParentDoc = data.isParentDoc;
            let url = data.url;
            let str1 = `
                <div  leftBarID="${LFID}" class="tabs-li"  tabName="${tabName}" isFocus="yes">
                    <div class="flex1">
                        ${tabName_CN}
                    </div>
                    <svg class="icon " aria-hidden="true">
                        <use xlink:href="#icon-clear"></use>
                    </svg>
                </div>
            `;
            let str2 = `
                <iframe class="iframes-li" tabName="${tabName}" isShow="yes" src="${url}" leftBarID="${LFID}"  name="mainFrame" frameborder="0" scrolling="no"></iframe>
            `;
            if(isParentDoc === undefined){
                $(`#tabs .tabs>div[LFID="${LFID}"]`,parent.document).append(str1);
                $(`#tabs .iframes>div[LFID="${LFID}"]`,parent.document).append(str2);            
            }else{
                $(`#tabs .tabs>div[LFID="${LFID}"]`).append(str1);
                $(`#tabs .iframes>div[LFID="${LFID}"]`).append(str2);            
            }
        },
        /** Fun_7 对 T1B1 设置显示隐藏 */
        showT1B1:function(data){
            let LFID = data.LFID;
            let isParentDoc = data.isParentDoc;
            if(isParentDoc === undefined){
                $(`#tabs .tabs>div`,parent.document).attr("isShow","no");
                $(`#tabs .tabs>div[LFID="${LFID}"]`,parent.document).attr("isShow","yes");
                $(`#tabs .iframes>div`,parent.document).attr("isShow","no");
                $(`#tabs .iframes>div[LFID="${LFID}"]`,parent.document).attr("isShow","yes");           
            }else{
                $(`#tabs .tabs>div`).attr("isShow","no");
                $(`#tabs .tabs>div[LFID="${LFID}"]`).attr("isShow","yes");
                $(`#tabs .iframes>div`).attr("isShow","no");
                $(`#tabs .iframes>div[LFID="${LFID}"]`).attr("isShow","yes");           
            }
        },
        /** Fun_5 对T2B2 设置显示隐藏*/
        showT2B2:function(data){
            let LFID = data.LFID;
            let tabName = data.tabName;
            let isParentDoc = data.isParentDoc;
            if(isParentDoc === undefined){
                $(`#tabs .tabs>div[LFID="${LFID}"]>div`,parent.document).attr("isFocus","no");
                $(`#tabs .tabs>div[LFID="${LFID}"]>div[tabName="${tabName}"]`,parent.document).attr("isFocus","yes");
                $(`#tabs .iframes>div[LFID="${LFID}"]>iframe`,parent.document).attr("isShow","no");
                $(`#tabs .iframes>div[LFID="${LFID}"]>iframe[tabName="${tabName}"]`,parent.document).attr("isShow","yes");           
            }else{
                $(`#tabs .tabs>div[LFID="${LFID}"]>div`).attr("isFocus","no");
                $(`#tabs .tabs>div[LFID="${LFID}"]>div[tabName="${tabName}"]`).attr("isFocus","yes");
                $(`#tabs .iframes>div[LFID="${LFID}"]>iframe`).attr("isShow","no");
                $(`#tabs .iframes>div[LFID="${LFID}"]>iframe[tabName="${tabName}"]`).attr("isShow","yes");            
            }
        },
        /** Fun_6 清除T2B2*/
        removeT2B2:function(data){
            let LFID = data.LFID;
            let tabName = data.tabName;
            let isParentDoc = data.isParentDoc;
            if(isParentDoc === undefined){
                $(`#tabs .tabs>div[LFID="${LFID}"]>div[tabName="${tabName}"]`,parent.document).remove();
                $(`#tabs .iframes>div[LFID="${LFID}"]>iframe[tabName="${tabName}"]`,parent.document).remove();             
            }else{
                $(`#tabs .tabs>div[LFID="${LFID}"]>div[tabName="${tabName}"]`).remove();
                $(`#tabs .iframes>div[LFID="${LFID}"]>iframe[tabName="${tabName}"]`).remove();            
            }
        },
        closeTab:function(data){
            let LFID,tabName,isParentDoc;
            /**未定义的时候 是直接调用此函数关闭当前页签，有定义的时候关闭data内指定的页签 */
            if(data == undefined){
                let json = fun.getLeftBarStatus();
                LFID = json.LFID;
                tabName = $(`#tabs .tabs>div[LFID="${LFID}"]>div[isFocus="yes"]`,parent.document).attr("tabName");

            }else{
                LFID = data.LFID;
                tabName = data.tabName;
                isParentDoc = data.isParentDoc;
            }
            let isFocusTabName = $(`#tabs .tabs>div[LFID="${LFID}"]>div[isFocus="yes"]`,parent.document).attr("tabName");
                //**状态转移 （只有 当前选中的tabName和所点击的tabName相同时才涉及转移）*/
                if(tabName == isFocusTabName){
                    let isFocusTabName_index = $(`#tabs .tabs>div[LFID="${LFID}"]>div[isFocus="yes"]`,parent.document).index();
                    let beforeTabName = $(`#tabs .tabs>div[LFID="${LFID}"]>div:eq(${isFocusTabName_index - 1})`,parent.document).attr("tabName");
                    let beforeTabName_CN = $(`#tabs .tabs>div[LFID="${LFID}"]>div:eq(${isFocusTabName_index - 1})`,parent.document).text();
                    //**获得前一个tabName*/
                    let data1 = {
                        tabName:beforeTabName,
                        LFID,
                    }
                    fun.showT2B2(data1);
                    /**获取当前左导航状态 */
                    let json1 = fun.getLeftBarStatus();
                    let LFDep_CN = json1.LFDep_CN;
                    let LFID_CN = json1.LFID_CN;
                        LFID = json1.LFID;
                        let tabName_CN = " > " + $(this,parent.document).text() ;
                        beforeTabName == LFID ? tabName_CN = "":tabName_CN = tabName_CN ; 
                    let data2 = {
                        LFDep_CN,
                        LFID_CN,
                        tabName_CN:tabName_CN,
                        isParentDoc,
                    }
                    fun.changePosition(data2);
                }
                //**清除 */
                let data0 = {
                    LFID,
                    tabName,
                }
                fun.removeT2B2(data0);

        },
        /** Fun_C 给 新T2 绑定事件*/
        bindTabsFun:function(data){
            let LFID = data.LFID;
            let tabName = data.tabName;
            let isParentDoc = data.isParentDoc;
            //**获得当前选中状态的tabName*/
            $(`#tabs .tabs>div[LFID="${LFID}"]>div[tabName="${tabName}"] svg`,parent.document).click(function(){
                console.log("--------------------");
                let data3 = {
                    tabName,
                    LFID,
                    isParentDoc,
                }
                fun.closeTab(data3);
            });
            $(`#tabs .tabs>div[LFID="${LFID}"]>div[tabName="${tabName}"] div`,parent.document).click(function(){
                /**点击的时候显示此tab和iframe */
                let data1 = {
                    tabName,
                    LFID,
                    isParentDoc,
                }
                fun.showT2B2(data1);
                /**获取当前左导航状态 */
                let json1 = fun.getLeftBarStatus();
                let LFDep_CN = json1.LFDep_CN;
                let LFID_CN = json1.LFID_CN;
                    LFID = json1.LFID;
                let tabName_CN = $(this,parent.document).text() ;
                tabName == LFID ? tabName_CN = "":tabName_CN = tabName_CN ; 
                let data2 = {
                    LFDep_CN,
                    LFID_CN,
                    tabName_CN,
                    isParentDoc,
                };
                fun.changePosition(data2);
            });
            
        },
        bindAddNewTab:function(data){
            let add = data.add;
            let tabName = data.tabName;
            let url = data.url;
            let tabName_CN = data.tabName_CN;
            let isParentDoc = data.isParentDoc;
            $(add).click(function(){
                /**获取当前左导航状态 */
                let json1 = fun.getLeftBarStatus();
                let LFDep_CN = json1.LFDep_CN;
                let LFID_CN = json1.LFID_CN;
                let LFID = json1.LFID;
                /**判断T2是否存在此tabName */
                let thisTabNum = $(`#tabs .tabs>div[LFID="${LFID}"]>div[tabName="${tabName}"]`,parent.document).length;
                if(thisTabNum == 0){
                    let data = {
                        LFID,
                        tabName,
                        tabName_CN,
                        isParentDoc,
                        url,
                    }
                    fun.insertT2B2(data);
                    fun.bindTabsFun(data);
                };
                let data = {
                    LFID,
                    tabName,
                    isParentDoc,
                };
                fun.showT2B2(data);
                let data1 = {
                    LFDep_CN,
                    LFID_CN,
                    tabName_CN,
                    isParentDoc,
                };
                fun.changePosition(data1);
            });

        },
        bindAddNewTabChange:function(data){
            let add = data.add;
            let tabName = data.tabName;
            let url = data.url;
            let LFID = data.LFID;
            let tabName_CN = data.tabName_CN;
            let isParentDoc = data.isParentDoc;
            let getUrl = data.getUrl;
            let postUrl = data.postUrl;
            let field = data.field;
            let LFIDAndTabNames = LFID + LFID;
            let getDataName = LFID + "Data";
            $(add).click(function(){
                /**此处获取第1位的关键词 */
                var keyValue =  $(this).parents("tr").find("td").eq(0).text();
                /**获取当前左导航状态 */
                let json1 = fun.getLeftBarStatus();
                let LFDep_CN = json1.LFDep_CN;
                let LFID_CN = json1.LFID_CN;
                let LFID = json1.LFID;
                /**判断T2是否存在此tabName */
                let thisTabNum = $(`#tabs .tabs>div[LFID="${LFID}"]>div[tabName="${tabName}"]`,parent.document).length;
                if(thisTabNum == 0){
                    let data = {
                        LFID,
                        tabName,
                        tabName_CN,
                        isParentDoc,
                        url,
                    }
                    fun.insertT2B2(data);
                    fun.bindTabsFun(data);
                };
                let data = {
                    LFID,
                    tabName,
                    isParentDoc,
                };
                fun.showT2B2(data);
                let data1 = {
                    LFDep_CN,
                    LFID_CN,
                    tabName_CN,
                    isParentDoc,
                };
                fun.changePosition(data1);

                /**请求数据并填写到页面上 */
                let JGM = require("app/jsGridMethods");
                let data2 = {
                    url:getUrl,
                    data:{},
                    field:getDataName
                }
                data2.data[field] = keyValue;
                console.log("this is data");``
                console.log(data2);
                console.log("this is getThisPageTabStatus");
                console.log(fun.getThisPageTabStatus());
           
                parent.window.changeInfo[LFIDAndTabNames].fieldVal = keyValue;
                
            });

        },
        getLeftBarStatus:function(){
            /**获取当前左导航状态 */
            let LFDep_CN = $(`iframe[name="leftBar1"]`,parent.document).contents().find(".leftBarFrame a[hover1='1']").parent().parent().find(".LFDep_CN").text();
            let LFID_CN = $(`iframe[name="leftBar1"]`,parent.document).contents().find(".leftBarFrame a[hover1='1']").text();
            let LFID_url = $(`iframe[name="leftBar1"]`,parent.document).contents().find(".leftBarFrame a[hover1='1']").attr("url");
            let LFID = PKG.get.urlFromStr(LFID_url);
            let json = {
                LFDep_CN,
                LFID_CN,
                LFID
            }
            return json;
        },
        getThisPageTabStatus:function(){
            /**获取当前页签状态 */
            let LFID = $(`.tabs>div[isshow="yes"]`,parent.document).attr("LFID");
            let tabName = $(`.tabs>div[isshow="yes"]>div[isFocus="yes"]`,parent.document).attr("tabName");
            let json = {
                tabName,
                LFID
            }
            return json;
        },
        getCase:function(data){
            data == undefined?data = "":data = data;
            /**返回带有字段的input和select的状态 */
            let json = {};
            $(data.add+" input[field]").each(function(){
                let field = $(this).attr("field");
                let val = $(this).val();
                json[field] = val;
            });
            $(data.add+" select[field]").each(function(){
                let field = $(this).attr("field");
                let val = $(this).find("option:selected").val();
                json[field] = val;
            });
            $(data.add+" textarea[field]").each(function(){
                let field = $(this).attr("field");
                let val = $(this).val();
                console.log(val)
                json[field] = val;
            });
            console.log(json)
            return json;
        },
        getInfoInCase:function(data){
            let JGM = require("app/jsGridMethods");
            let LFID = data.LFID;
            let tabName = data.tabName;
            let to = LFID + tabName;
            let JSGridConfig = parent.window.JGConfig[to];
            $(data.button).click(function(){
                let da = fun.getCase(data);
                console.log(da)
                JSGridConfig.data = da;
                JSGridConfig.data.page = 1;
                JGM.getInfo(JSGridConfig);
            });
        },
        searchTips:function(data){
            $(data.add).find(`input[field]`).attr("null","false");
            $(data.add).find(`textarea[field]`).attr("null","false");
            $.each(data.body,function(i,e){
                $(data.add).find(`*[field="${e}"]`).attr("null","true");
            });
            console.log(data.body);
            if(data.body.length > 0){
                return false;
            }else{
                return true;
            }
        }
    }
    return fun;
});




define('app/addTabXIframe',[
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
                    <div  leftBarID="${data.LFID}" class="tabs-li" style="display:block" tabName="${data.tabName_attr}" isFocus="yes">
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
                <iframe class="iframes-li" tabName="${data.tabName_attr}" isHide="no" src="${data.url0}" leftBarID="${data.LFID}"  name="mainFrame" frameborder="0" scrolling="no"></iframe>
            `;
            $(".bodyFrame-main",parent.document).append(str2);
        }
    }
    return fun;   
  
});







define('app/clearOrMore',[
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



/*
 * jsGrid v1.5.3 (http://js-grid.com)
 * (c) 2016 Artem Tabalin
 * Licensed under MIT (https://github.com/tabalinas/jsgrid/blob/master/LICENSE)
 */

define('lib/jsgrid/jsgrid',[
    'require',
    "jquery",
], function(
        require,
        $,
    ) {
    (function(window, $, undefined) {

        var JSGRID = "JSGrid",
            JSGRID_DATA_KEY = JSGRID,
            JSGRID_ROW_DATA_KEY = "JSGridItem",
            JSGRID_EDIT_ROW_DATA_KEY = "JSGridEditRow",
    
            SORT_ORDER_ASC = "asc",
            SORT_ORDER_DESC = "desc",
    
            FIRST_PAGE_PLACEHOLDER = "{first}",
            PAGES_PLACEHOLDER = "{pages}",
            PREV_PAGE_PLACEHOLDER = "{prev}",
            NEXT_PAGE_PLACEHOLDER = "{next}",
            LAST_PAGE_PLACEHOLDER = "{last}",
            PAGE_INDEX_PLACEHOLDER = "{pageIndex}",
            PAGE_COUNT_PLACEHOLDER = "{pageCount}",
            ITEM_COUNT_PLACEHOLDER = "{itemCount}",
    
            EMPTY_HREF = "javascript:void(0);";
    
        var getOrApply = function(value, context) {
            if($.isFunction(value)) {
                return value.apply(context, $.makeArray(arguments).slice(2));
            }
            return value;
        };
    
        var normalizePromise = function(promise) {
            var d = $.Deferred();
    
            if(promise && promise.then) {
                promise.then(function() {
                    d.resolve.apply(d, arguments);
                }, function() {
                    d.reject.apply(d, arguments);
                });
            } else {
                d.resolve(promise);
            }
    
            return d.promise();
        };
    
        var defaultController = {
            loadData: $.noop,
            insertItem: $.noop,
            updateItem: $.noop,
            deleteItem: $.noop
        };
    
    
        function Grid(element, config) {
            var $element = $(element);
    
            $element.data(JSGRID_DATA_KEY, this);
    
            this._container = $element;
    
            this.data = [];
            this.fields = [];
    
            this._editingRow = null;
            this._sortField = null;
            this._sortOrder = SORT_ORDER_ASC;
            this._firstDisplayingPage = 1;
    
            this._init(config);
            this.render();
        }
    
        Grid.prototype = {
            width: "auto",
            height: "auto",
            updateOnResize: true,
    
            rowClass: $.noop,
            rowRenderer: null,
    
            rowClick: function(args) {
                if(this.editing) {
                    this.editItem($(args.event.target).closest("tr"));
                }
            },
            rowDoubleClick: $.noop,
    
            noDataContent: "Not found",
            noDataRowClass: "jsgrid-nodata-row",
    
            heading: true,
            headerRowRenderer: null,
            headerRowClass: "jsgrid-header-row",
            headerCellClass: "jsgrid-header-cell",
    
            filtering: false,
            filterRowRenderer: null,
            filterRowClass: "jsgrid-filter-row",
    
            inserting: false,
            insertRowRenderer: null,
            insertRowClass: "jsgrid-insert-row",
    
            editing: false,
            editRowRenderer: null,
            editRowClass: "jsgrid-edit-row",
    
            confirmDeleting: true,
            deleteConfirm: "确定删除吗？",
    
            selecting: true,
            selectedRowClass: "jsgrid-selected-row",
            oddRowClass: "jsgrid-row",
            evenRowClass: "jsgrid-alt-row",
            cellClass: "jsgrid-cell",
    
            sorting: false,
            sortableClass: "jsgrid-header-sortable",
            sortAscClass: "jsgrid-header-sort jsgrid-header-sort-asc",
            sortDescClass: "jsgrid-header-sort jsgrid-header-sort-desc",
    
            paging: false,
            pagerContainer: null,
            pageIndex: 1,
            pageSize: 20,
            pageButtonCount: 15,
            pagerFormat: "Pages: {first} {prev} {pages} {next} {last} &nbsp;&nbsp; {pageIndex} of {pageCount}",
            pagePrevText: "Prev",
            pageNextText: "Next",
            pageFirstText: "First",
            pageLastText: "Last",
            pageNavigatorNextText: "...",
            pageNavigatorPrevText: "...",
            pagerContainerClass: "jsgrid-pager-container",
            pagerClass: "jsgrid-pager",
            pagerNavButtonClass: "jsgrid-pager-nav-button",
            pagerNavButtonInactiveClass: "jsgrid-pager-nav-inactive-button",
            pageClass: "jsgrid-pager-page",
            currentPageClass: "jsgrid-pager-current-page",
    
            customLoading: false,
            pageLoading: false,
    
            autoload: false,
            controller: defaultController,
    
            loadIndication: true,
            loadIndicationDelay: 500,
            loadMessage: "Please, wait...",
            loadShading: true,
    
            invalidMessage: "Invalid data entered!",
    
            invalidNotify: function(args) {
                var messages = $.map(args.errors, function(error) {
                    return error.message || null;
                });
    
                window.alert([this.invalidMessage].concat(messages).join("\n"));
            },
    
            onInit: $.noop,
            onRefreshing: $.noop,
            onRefreshed: $.noop,
            onPageChanged: $.noop,
            onItemDeleting: $.noop,
            onItemDeleted: $.noop,
            onItemInserting: $.noop,
            onItemInserted: $.noop,
            onItemEditing: $.noop,
            onItemUpdating: $.noop,
            onItemUpdated: $.noop,
            onItemInvalid: $.noop,
            onDataLoading: $.noop,
            onDataLoaded: $.noop,
            onOptionChanging: $.noop,
            onOptionChanged: $.noop,
            onError: $.noop,
    
            invalidClass: "jsgrid-invalid",
    
            containerClass: "jsgrid",
            tableClass: "jsgrid-table",
            gridHeaderClass: "jsgrid-grid-header",
            gridBodyClass: "jsgrid-grid-body",
    
            _init: function(config) {
                $.extend(this, config);
                this._initLoadStrategy();
                this._initController();
                this._initFields();
                this._attachWindowLoadResize();
                this._attachWindowResizeCallback();
                this._callEventHandler(this.onInit)
            },
    
            loadStrategy: function() {
                return this.pageLoading
                    ? new jsGrid.loadStrategies.PageLoadingStrategy(this)
                    : new jsGrid.loadStrategies.DirectLoadingStrategy(this);
            },
    
            _initLoadStrategy: function() {
                this._loadStrategy = getOrApply(this.loadStrategy, this);
            },
    
            _initController: function() {
                this._controller = $.extend({}, defaultController, getOrApply(this.controller, this));
            },
    
            renderTemplate: function(source, context, config) {
                args = [];
                for(var key in config) {
                    args.push(config[key]);
                }
    
                args.unshift(source, context);
    
                source = getOrApply.apply(null, args);
                return (source === undefined || source === null) ? "" : source;
            },
    
            loadIndicator: function(config) {
                return new jsGrid.LoadIndicator(config);
            },
    
            validation: function(config) {
                return jsGrid.Validation && new jsGrid.Validation(config);
            },
    
            _initFields: function() {
                var self = this;
                self.fields = $.map(self.fields, function(field) {
                    if($.isPlainObject(field)) {
                        var fieldConstructor = (field.type && jsGrid.fields[field.type]) || jsGrid.Field;
                        field = new fieldConstructor(field);
                    }
                    field._grid = self;
                    return field;
                });
            },
    
            _attachWindowLoadResize: function() {
                $(window).on("load", $.proxy(this._refreshSize, this));
            },
    
            _attachWindowResizeCallback: function() {
                if(this.updateOnResize) {
                    $(window).on("resize", $.proxy(this._refreshSize, this));
                }
            },
    
            _detachWindowResizeCallback: function() {
                $(window).off("resize", this._refreshSize);
            },
    
            option: function(key, value) {
                var optionChangingEventArgs,
                    optionChangedEventArgs;
    
                if(arguments.length === 1)
                    return this[key];
    
                optionChangingEventArgs = {
                    option: key,
                    oldValue: this[key],
                    newValue: value
                };
                this._callEventHandler(this.onOptionChanging, optionChangingEventArgs);
    
                this._handleOptionChange(optionChangingEventArgs.option, optionChangingEventArgs.newValue);
    
                optionChangedEventArgs = {
                    option: optionChangingEventArgs.option,
                    value: optionChangingEventArgs.newValue
                };
                this._callEventHandler(this.onOptionChanged, optionChangedEventArgs);
            },
    
            fieldOption: function(field, key, value) {
                field = this._normalizeField(field);
    
                if(arguments.length === 2)
                    return field[key];
    
                field[key] = value;
                this._renderGrid();
            },
    
            _handleOptionChange: function(name, value) {
                this[name] = value;
    
                switch(name) {
                    case "width":
                    case "height":
                        this._refreshSize();
                        break;
                    case "rowClass":
                    case "rowRenderer":
                    case "rowClick":
                    case "rowDoubleClick":
                    case "noDataRowClass":
                    case "noDataContent":
                    case "selecting":
                    case "selectedRowClass":
                    case "oddRowClass":
                    case "evenRowClass":
                        this._refreshContent();
                        break;
                    case "pageButtonCount":
                    case "pagerFormat":
                    case "pagePrevText":
                    case "pageNextText":
                    case "pageFirstText":
                    case "pageLastText":
                    case "pageNavigatorNextText":
                    case "pageNavigatorPrevText":
                    case "pagerClass":
                    case "pagerNavButtonClass":
                    case "pageClass":
                    case "currentPageClass":
                    case "pagerRenderer":
                        this._refreshPager();
                        break;
                    case "fields":
                        this._initFields();
                        this.render();
                        break;
                    case "data":
                    case "editing":
                    case "heading":
                    case "filtering":
                    case "inserting":
                    case "paging":
                        this.refresh();
                        break;
                    case "loadStrategy":
                    case "pageLoading":
                        this._initLoadStrategy();
                        this.search();
                        break;
                    case "pageIndex":
                        this.openPage(value);
                        break;
                    case "pageSize":
                        this.refresh();
                        this.search();
                        break;
                    case "editRowRenderer":
                    case "editRowClass":
                        this.cancelEdit();
                        break;
                    case "updateOnResize":
                        this._detachWindowResizeCallback();
                        this._attachWindowResizeCallback();
                        break;
                    case "invalidNotify":
                    case "invalidMessage":
                        break;
                    default:
                        this.render();
                        break;
                }
            },
    
            destroy: function() {
                this._detachWindowResizeCallback();
                this._clear();
                this._container.removeData(JSGRID_DATA_KEY);
            },
    
            render: function() {
                this._renderGrid();
                return this.autoload ? this.loadData() : $.Deferred().resolve().promise();
            },
    
            _renderGrid: function() {
                this._clear();
    
                this._container.addClass(this.containerClass)
                    .css("position", "relative")
                    .append(this._createHeader())
                    .append(this._createBody());
    
                this._pagerContainer = this._createPagerContainer();
                this._loadIndicator = this._createLoadIndicator();
                this._validation = this._createValidation();
    
                this.refresh();
            },
    
            _createLoadIndicator: function() {
                return getOrApply(this.loadIndicator, this, {
                    message: this.loadMessage,
                    shading: this.loadShading,
                    container: this._container
                });
            },
    
            _createValidation: function() {
                return getOrApply(this.validation, this);
            },
    
            _clear: function() {
                this.cancelEdit();
    
                clearTimeout(this._loadingTimer);
    
                this._pagerContainer && this._pagerContainer.empty();
    
                this._container.empty()
                    .css({ position: "", width: "", height: "" });
            },
    
            _createHeader: function() {
                var $headerRow = this._headerRow = this._createHeaderRow(),
                    $filterRow = this._filterRow = this._createFilterRow(),
                    $insertRow = this._insertRow = this._createInsertRow();
    
                var $headerGrid = this._headerGrid = $("<table>").addClass(this.tableClass)
                    .append($headerRow)
                    .append($filterRow)
                    .append($insertRow);
    
                var $header = this._header = $("<div>").addClass(this.gridHeaderClass)
                    .addClass(this._scrollBarWidth() ? "jsgrid-header-scrollbar" : "")
                    .append($headerGrid);
    
                return $header;
            },
    
            _createBody: function() {
                var $content = this._content = $("<tbody>");
    
                var $bodyGrid = this._bodyGrid = $("<table>").addClass(this.tableClass)
                    .append($content);
    
                var $body = this._body = $("<div>").addClass(this.gridBodyClass)
                    .append($bodyGrid)
                    .on("scroll", $.proxy(function(e) {
                        this._header.scrollLeft(e.target.scrollLeft);
                    }, this));
    
                return $body;
            },
    
            _createPagerContainer: function() {
                var pagerContainer = this.pagerContainer || $("<div>").appendTo(this._container);
                return $(pagerContainer).addClass(this.pagerContainerClass);
            },
    
            _eachField: function(callBack) {
                var self = this;
                $.each(this.fields, function(index, field) {
                    if(field.visible) {
                        callBack.call(self, field, index);
                    }
                });
            },
    
            _createHeaderRow: function() {
                if($.isFunction(this.headerRowRenderer))
                    return $(this.renderTemplate(this.headerRowRenderer, this));
    
                var $result = $("<tr>").addClass(this.headerRowClass);
    
                this._eachField(function(field, index) {
                    var $th = this._prepareCell("<th>", field, "headercss", this.headerCellClass)
                        .append(this.renderTemplate(field.headerTemplate, field))
                        .appendTo($result);
    
                    if(this.sorting && field.sorting) {
                        $th.addClass(this.sortableClass)
                            .on("click", $.proxy(function() {
                                this.sort(index);
                            }, this));
                    }
                });
    
                return $result;
            },
    
            _prepareCell: function(cell, field, cssprop, cellClass) {
                return $(cell).css("width", field.width)
                    .addClass(cellClass || this.cellClass)
                    .addClass((cssprop && field[cssprop]) || field.css)
                    .addClass(field.align ? ("jsgrid-align-" + field.align) : "");
            },
    
            _createFilterRow: function() {
                if($.isFunction(this.filterRowRenderer))
                    return $(this.renderTemplate(this.filterRowRenderer, this));
    
                var $result = $("<tr>").addClass(this.filterRowClass);
    
                this._eachField(function(field) {
                    this._prepareCell("<td>", field, "filtercss")
                        .append(this.renderTemplate(field.filterTemplate, field))
                        .appendTo($result);
                });
    
                return $result;
            },
    
            _createInsertRow: function() {
                if($.isFunction(this.insertRowRenderer))
                    return $(this.renderTemplate(this.insertRowRenderer, this));
    
                var $result = $("<tr>").addClass(this.insertRowClass);
    
                this._eachField(function(field) {
                    this._prepareCell("<td>", field, "insertcss")
                        .append(this.renderTemplate(field.insertTemplate, field))
                        .appendTo($result);
                });
    
                return $result;
            },
    
            _callEventHandler: function(handler, eventParams) {
                handler.call(this, $.extend(eventParams, {
                    grid: this
                }));
    
                return eventParams;
            },
    
            reset: function() {
                this._resetSorting();
                this._resetPager();
                return this._loadStrategy.reset();
            },
    
            _resetPager: function() {
                this._firstDisplayingPage = 1;
                this._setPage(1);
            },
    
            _resetSorting: function() {
                this._sortField = null;
                this._sortOrder = SORT_ORDER_ASC;
                this._clearSortingCss();
            },
    
            refresh: function() {
                this._callEventHandler(this.onRefreshing);
    
                this.cancelEdit();
    
                this._refreshHeading();
                this._refreshFiltering();
                this._refreshInserting();
                this._refreshContent();
                this._refreshPager();
                this._refreshSize();
    
                this._callEventHandler(this.onRefreshed);
            },
    
            _refreshHeading: function() {
                this._headerRow.toggle(this.heading);
            },
    
            _refreshFiltering: function() {
                this._filterRow.toggle(this.filtering);
            },
    
            _refreshInserting: function() {
                this._insertRow.toggle(this.inserting);
            },
    
            _refreshContent: function() {
                var $content = this._content;
                $content.empty();
    
                if(!this.data.length) {
                    $content.append(this._createNoDataRow());
                    return this;
                }
    
                var indexFrom = this._loadStrategy.firstDisplayIndex();
                var indexTo = this._loadStrategy.lastDisplayIndex();
    
                for(var itemIndex = indexFrom; itemIndex < indexTo; itemIndex++) {
                    var item = this.data[itemIndex];
                    $content.append(this._createRow(item, itemIndex));
                }
            },
    
            _createNoDataRow: function() {
                var amountOfFields = 0;
                this._eachField(function() {
                    amountOfFields++;
                });
    
                return $("<tr>").addClass(this.noDataRowClass)
                    .append($("<td>").addClass(this.cellClass).attr("colspan", amountOfFields)
                        .append(this.renderTemplate(this.noDataContent, this)));
            },
    
            _createRow: function(item, itemIndex) {
                var $result;
    
                if($.isFunction(this.rowRenderer)) {
                    $result = this.renderTemplate(this.rowRenderer, this, { item: item, itemIndex: itemIndex });
                } else {
                    $result = $("<tr>");
                    this._renderCells($result, item);
                }
    
                $result.addClass(this._getRowClasses(item, itemIndex))
                    .data(JSGRID_ROW_DATA_KEY, item)
                    .on("click", $.proxy(function(e) {
                        this.rowClick({
                            item: item,
                            itemIndex: itemIndex,
                            event: e
                        });
                    }, this))
                    .on("dblclick", $.proxy(function(e) {
                        this.rowDoubleClick({
                            item: item,
                            itemIndex: itemIndex,
                            event: e
                        });
                    }, this));
    
                if(this.selecting) {
                    this._attachRowHover($result);
                }
    
                return $result;
            },
    
            _getRowClasses: function(item, itemIndex) {
                var classes = [];
                classes.push(((itemIndex + 1) % 2) ? this.oddRowClass : this.evenRowClass);
                classes.push(getOrApply(this.rowClass, this, item, itemIndex));
                return classes.join(" ");
            },
    
            _attachRowHover: function($row) {
                var selectedRowClass = this.selectedRowClass;
                $row.hover(function() {
                        $(this).addClass(selectedRowClass);
                    },
                    function() {
                        $(this).removeClass(selectedRowClass);
                    }
                );
            },
    
            _renderCells: function($row, item) {
                this._eachField(function(field) {
                    $row.append(this._createCell(item, field));
                });
                return this;
            },
    
            _createCell: function(item, field) {
                var $result;
                var fieldValue = this._getItemFieldValue(item, field);
    
                var args = { value: fieldValue, item : item };
                if($.isFunction(field.cellRenderer)) {
                    $result = this.renderTemplate(field.cellRenderer, field, args);
                } else {
                    $result = $("<td>").append(this.renderTemplate(field.itemTemplate || fieldValue, field, args));
                }
    
                return this._prepareCell($result, field);
            },
    
            _getItemFieldValue: function(item, field) {
                var props = field.name.split('.');
                var result = item[props.shift()];
    
                while(result && props.length) {
                    result = result[props.shift()];
                }
    
                return result;
            },
    
            _setItemFieldValue: function(item, field, value) {
                var props = field.name.split('.');
                var current = item;
                var prop = props[0];
    
                while(current && props.length) {
                    item = current;
                    prop = props.shift();
                    current = item[prop];
                }
    
                if(!current) {
                    while(props.length) {
                        item = item[prop] = {};
                        prop = props.shift();
                    }
                }
    
                item[prop] = value;
            },
    
            sort: function(field, order) {
                if($.isPlainObject(field)) {
                    order = field.order;
                    field = field.field;
                }
    
                this._clearSortingCss();
                this._setSortingParams(field, order);
                this._setSortingCss();
                return this._loadStrategy.sort();
            },
    
            _clearSortingCss: function() {
                this._headerRow.find("th")
                    .removeClass(this.sortAscClass)
                    .removeClass(this.sortDescClass);
            },
    
            _setSortingParams: function(field, order) {
                field = this._normalizeField(field);
                order = order || ((this._sortField === field) ? this._reversedSortOrder(this._sortOrder) : SORT_ORDER_ASC);
    
                this._sortField = field;
                this._sortOrder = order;
            },
    
            _normalizeField: function(field) {
                if($.isNumeric(field)) {
                    return this.fields[field];
                }
    
                if(typeof field === "string") {
                    return $.grep(this.fields, function(f) {
                        return f.name === field;
                    })[0];
                }
    
                return field;
            },
    
            _reversedSortOrder: function(order) {
                return (order === SORT_ORDER_ASC ? SORT_ORDER_DESC : SORT_ORDER_ASC);
            },
    
            _setSortingCss: function() {
                var fieldIndex = this._visibleFieldIndex(this._sortField);
    
                this._headerRow.find("th").eq(fieldIndex)
                    .addClass(this._sortOrder === SORT_ORDER_ASC ? this.sortAscClass : this.sortDescClass);
            },
    
            _visibleFieldIndex: function(field) {
                return $.inArray(field, $.grep(this.fields, function(f) { return f.visible; }));
            },
    
            _sortData: function() {
                var sortFactor = this._sortFactor(),
                    sortField = this._sortField;
    
                if(sortField) {
                    this.data.sort(function(item1, item2) {
                        return sortFactor * sortField.sortingFunc(item1[sortField.name], item2[sortField.name]);
                    });
                }
            },
    
            _sortFactor: function() {
                return this._sortOrder === SORT_ORDER_ASC ? 1 : -1;
            },
    
            _itemsCount: function() {
                return this._loadStrategy.itemsCount();
            },
    
            _pagesCount: function() {
                var itemsCount = this._itemsCount(),
                    pageSize = this.pageSize;
                return Math.floor(itemsCount / pageSize) + (itemsCount % pageSize ? 1 : 0);
            },
    
            _refreshPager: function() {
                var $pagerContainer = this._pagerContainer;
                $pagerContainer.empty();
    
                if(this.paging) {
                    $pagerContainer.append(this._createPager());
                }
    
                var showPager = this.paging && this._pagesCount() > 1;
                $pagerContainer.toggle(showPager);
            },
    
            _createPager: function() {
                var $result;
    
                if($.isFunction(this.pagerRenderer)) {
                    $result = $(this.pagerRenderer({
                        pageIndex: this.pageIndex,
                        pageCount: this._pagesCount()
                    }));
                } else {
                    $result = $("<div>").append(this._createPagerByFormat());
                }
    
                $result.addClass(this.pagerClass);
    
                return $result;
            },
    
            _createPagerByFormat: function() {
                var pageIndex = this.pageIndex,
                    pageCount = this._pagesCount(),
                    itemCount = this._itemsCount(),
                    pagerParts = this.pagerFormat.split(" ");
    
                return $.map(pagerParts, $.proxy(function(pagerPart) {
                    var result = pagerPart;
    
                    if(pagerPart === PAGES_PLACEHOLDER) {
                        result = this._createPages();
                    } else if(pagerPart === FIRST_PAGE_PLACEHOLDER) {
                        result = this._createPagerNavButton(this.pageFirstText, 1, pageIndex > 1);
                    } else if(pagerPart === PREV_PAGE_PLACEHOLDER) {
                        result = this._createPagerNavButton(this.pagePrevText, pageIndex - 1, pageIndex > 1);
                    } else if(pagerPart === NEXT_PAGE_PLACEHOLDER) {
                        result = this._createPagerNavButton(this.pageNextText, pageIndex + 1, pageIndex < pageCount);
                    } else if(pagerPart === LAST_PAGE_PLACEHOLDER) {
                        result = this._createPagerNavButton(this.pageLastText, pageCount, pageIndex < pageCount);
                    } else if(pagerPart === PAGE_INDEX_PLACEHOLDER) {
                        result = pageIndex;
                    } else if(pagerPart === PAGE_COUNT_PLACEHOLDER) {
                        result = pageCount;
                    } else if(pagerPart === ITEM_COUNT_PLACEHOLDER) {
                        result = itemCount;
                    }
    
                    return $.isArray(result) ? result.concat([" "]) : [result, " "];
                }, this));
            },
    
            _createPages: function() {
                var pageCount = this._pagesCount(),
                    pageButtonCount = this.pageButtonCount,
                    firstDisplayingPage = this._firstDisplayingPage,
                    pages = [];
    
                if(firstDisplayingPage > 1) {
                    pages.push(this._createPagerPageNavButton(this.pageNavigatorPrevText, this.showPrevPages));
                }
    
                for(var i = 0, pageNumber = firstDisplayingPage; i < pageButtonCount && pageNumber <= pageCount; i++, pageNumber++) {
                    pages.push(pageNumber === this.pageIndex
                        ? this._createPagerCurrentPage()
                        : this._createPagerPage(pageNumber));
                }
    
                if((firstDisplayingPage + pageButtonCount - 1) < pageCount) {
                    pages.push(this._createPagerPageNavButton(this.pageNavigatorNextText, this.showNextPages));
                }
    
                return pages;
            },
    
            _createPagerNavButton: function(text, pageIndex, isActive) {
                return this._createPagerButton(text, this.pagerNavButtonClass + (isActive ? "" : " " + this.pagerNavButtonInactiveClass),
                    isActive ? function() { this.openPage(pageIndex); } : $.noop);
            },
    
            _createPagerPageNavButton: function(text, handler) {
                return this._createPagerButton(text, this.pagerNavButtonClass, handler);
            },
    
            _createPagerPage: function(pageIndex) {
                return this._createPagerButton(pageIndex, this.pageClass, function() {
                    this.openPage(pageIndex);
                });
            },
    
            _createPagerButton: function(text, css, handler) {
                var $link = $("<a>").attr("href", EMPTY_HREF)
                    .html(text)
                    .on("click", $.proxy(handler, this));
    
                return $("<span>").addClass(css).append($link);
            },
    
            _createPagerCurrentPage: function() {
                return $("<span>")
                    .addClass(this.pageClass)
                    .addClass(this.currentPageClass)
                    .text(this.pageIndex);
            },
    
            _refreshSize: function() {
                this._refreshHeight();
                this._refreshWidth();
            },
    
            _refreshWidth: function() {
                var width = (this.width === "auto") ? this._getAutoWidth() : this.width;
    
                this._container.width(width);
            },
    
            _getAutoWidth: function() {
                var $headerGrid = this._headerGrid,
                    $header = this._header;
    
                $headerGrid.width("auto");
    
                var contentWidth = $headerGrid.outerWidth();
                var borderWidth = $header.outerWidth() - $header.innerWidth();
    
                $headerGrid.width("");
    
                return contentWidth + borderWidth;
            },
    
            _scrollBarWidth: (function() {
                var result;
    
                return function() {
                    if(result === undefined) {
                        var $ghostContainer = $("<div style='width:50px;height:50px;overflow:hidden;position:absolute;top:-10000px;left:-10000px;'></div>");
                        var $ghostContent = $("<div style='height:100px;'></div>");
                        $ghostContainer.append($ghostContent).appendTo("body");
                        var width = $ghostContent.innerWidth();
                        $ghostContainer.css("overflow-y", "auto");
                        var widthExcludingScrollBar = $ghostContent.innerWidth();
                        $ghostContainer.remove();
                        result = width - widthExcludingScrollBar;
                    }
                    return result;
                };
            })(),
    
            _refreshHeight: function() {
                var container = this._container,
                    pagerContainer = this._pagerContainer,
                    height = this.height,
                    nonBodyHeight;
    
                container.height(height);
    
                if(height !== "auto") {
                    height = container.height();
    
                    nonBodyHeight = this._header.outerHeight(true);
                    if(pagerContainer.parents(container).length) {
                        nonBodyHeight += pagerContainer.outerHeight(true);
                    }
    
                    this._body.outerHeight(height - nonBodyHeight);
                }
            },
    
            showPrevPages: function() {
                var firstDisplayingPage = this._firstDisplayingPage,
                    pageButtonCount = this.pageButtonCount;
    
                this._firstDisplayingPage = (firstDisplayingPage > pageButtonCount) ? firstDisplayingPage - pageButtonCount : 1;
    
                this._refreshPager();
            },
    
            showNextPages: function() {
                var firstDisplayingPage = this._firstDisplayingPage,
                    pageButtonCount = this.pageButtonCount,
                    pageCount = this._pagesCount();
    
                this._firstDisplayingPage = (firstDisplayingPage + 2 * pageButtonCount > pageCount)
                    ? pageCount - pageButtonCount + 1
                    : firstDisplayingPage + pageButtonCount;
    
                this._refreshPager();
            },
    
            openPage: function(pageIndex) {
                if(pageIndex < 1 || pageIndex > this._pagesCount())
                    return;
    
                this._setPage(pageIndex);
                this._loadStrategy.openPage(pageIndex);
            },
    
            _setPage: function(pageIndex) {
                var firstDisplayingPage = this._firstDisplayingPage,
                    pageButtonCount = this.pageButtonCount;
    
                this.pageIndex = pageIndex;
    
                if(pageIndex < firstDisplayingPage) {
                    this._firstDisplayingPage = pageIndex;
                }
    
                if(pageIndex > firstDisplayingPage + pageButtonCount - 1) {
                    this._firstDisplayingPage = pageIndex - pageButtonCount + 1;
                }
    
                this._callEventHandler(this.onPageChanged, {
                    pageIndex: pageIndex
                });
            },
    
            _controllerCall: function(method, param, isCanceled, doneCallback) {
                if(isCanceled)
                    return $.Deferred().reject().promise();
    
                this._showLoading();
    
                var controller = this._controller;
                if(!controller || !controller[method]) {
                    throw Error("controller has no method '" + method + "'");
                }
    
                return normalizePromise(controller[method](param))
                    .done($.proxy(doneCallback, this))
                    .fail($.proxy(this._errorHandler, this))
                    .always($.proxy(this._hideLoading, this));
            },
    
            _errorHandler: function() {
                this._callEventHandler(this.onError, {
                    args: $.makeArray(arguments)
                });
            },
    
            _showLoading: function() {
                if(!this.loadIndication)
                    return;
    
                clearTimeout(this._loadingTimer);
    
                this._loadingTimer = setTimeout($.proxy(function() {
                    this._loadIndicator.show();
                }, this), this.loadIndicationDelay);
            },
    
            _hideLoading: function() {
                if(!this.loadIndication)
                    return;
    
                clearTimeout(this._loadingTimer);
                this._loadIndicator.hide();
            },
    
            search: function(filter) {
                this._resetSorting();
                this._resetPager();
                return this.loadData(filter);
            },
    
            loadData: function(filter) {
                filter = filter || (this.filtering ? this.getFilter() : {});
    
                $.extend(filter, this._loadStrategy.loadParams(), this._sortingParams());
    
                var args = this._callEventHandler(this.onDataLoading, {
                    filter: filter
                });
    
                return this._controllerCall("loadData", filter, args.cancel, function(loadedData) {
                    if(!loadedData)
                        return;
    
                    this._loadStrategy.finishLoad(loadedData);
    
                    this._callEventHandler(this.onDataLoaded, {
                        data: loadedData
                    });
                });
            },
    
            getFilter: function() {
                var result = {};
                this._eachField(function(field) {
                    if(field.filtering) {
                        this._setItemFieldValue(result, field, field.filterValue());
                    }
                });
                return result;
            },
    
            _sortingParams: function() {
                if(this.sorting && this._sortField) {
                    return {
                        sortField: this._sortField.name,
                        sortOrder: this._sortOrder
                    };
                }
                return {};
            },
    
            getSorting: function() {
                var sortingParams = this._sortingParams();
                return {
                    field: sortingParams.sortField,
                    order: sortingParams.sortOrder
                };
            },
    
            clearFilter: function() {
                var $filterRow = this._createFilterRow();
                this._filterRow.replaceWith($filterRow);
                this._filterRow = $filterRow;
                return this.search();
            },
    
            insertItem: function(item) {
                var insertingItem = item || this._getValidatedInsertItem();
    
                if(!insertingItem)
                    return $.Deferred().reject().promise();
    
                var args = this._callEventHandler(this.onItemInserting, {
                    item: insertingItem
                });
    
                return this._controllerCall("insertItem", insertingItem, args.cancel, function(insertedItem) {
                    insertedItem = insertedItem || insertingItem;
                    this._loadStrategy.finishInsert(insertedItem);
    
                    this._callEventHandler(this.onItemInserted, {
                        item: insertedItem
                    });
                });
            },
    
            _getValidatedInsertItem: function() {
                var item = this._getInsertItem();
                return this._validateItem(item, this._insertRow) ? item : null;
            },
    
            _getInsertItem: function() {
                var result = {};
                this._eachField(function(field) {
                    if(field.inserting) {
                        this._setItemFieldValue(result, field, field.insertValue());
                    }
                });
                return result;
            },
    
            _validateItem: function(item, $row) {
                var validationErrors = [];
    
                var args = {
                    item: item,
                    itemIndex: this._rowIndex($row),
                    row: $row
                };
    
                this._eachField(function(field) {
                    if(!field.validate ||
                       ($row === this._insertRow && !field.inserting) ||
                       ($row === this._getEditRow() && !field.editing))
                        return;
    
                    var fieldValue = this._getItemFieldValue(item, field);
    
                    var errors = this._validation.validate($.extend({
                        value: fieldValue,
                        rules: field.validate
                    }, args));
    
                    this._setCellValidity($row.children().eq(this._visibleFieldIndex(field)), errors);
    
                    if(!errors.length)
                        return;
    
                    validationErrors.push.apply(validationErrors,
                        $.map(errors, function(message) {
                            return { field: field, message: message };
                        }));
                });
    
                if(!validationErrors.length)
                    return true;
    
                var invalidArgs = $.extend({
                    errors: validationErrors
                }, args);
                this._callEventHandler(this.onItemInvalid, invalidArgs);
                this.invalidNotify(invalidArgs);
    
                return false;
            },
    
            _setCellValidity: function($cell, errors) {
                $cell
                    .toggleClass(this.invalidClass, !!errors.length)
                    .attr("title", errors.join("\n"));
            },
    
            clearInsert: function() {
                var insertRow = this._createInsertRow();
                this._insertRow.replaceWith(insertRow);
                this._insertRow = insertRow;
                this.refresh();
            },
    
            editItem: function(item) {
                var $row = this.rowByItem(item);
                if($row.length) {
                    this._editRow($row);
                }
            },
    
            rowByItem: function(item) {
                if(item.jquery || item.nodeType)
                    return $(item);
    
                return this._content.find("tr").filter(function() {
                    return $.data(this, JSGRID_ROW_DATA_KEY) === item;
                });
            },
    
            _editRow: function($row) {
                if(!this.editing)
                    return;
    
                var item = $row.data(JSGRID_ROW_DATA_KEY);
    
                var args = this._callEventHandler(this.onItemEditing, {
                    row: $row,
                    item: item,
                    itemIndex: this._itemIndex(item)
                });
    
                if(args.cancel)
                    return;
    
                if(this._editingRow) {
                    this.cancelEdit();
                }
    
                var $editRow = this._createEditRow(item);
    
                this._editingRow = $row;
                $row.hide();
                $editRow.insertBefore($row);
                $row.data(JSGRID_EDIT_ROW_DATA_KEY, $editRow);
            },
    
            _createEditRow: function(item) {
                if($.isFunction(this.editRowRenderer)) {
                    return $(this.renderTemplate(this.editRowRenderer, this, { item: item, itemIndex: this._itemIndex(item) }));
                }
    
                var $result = $("<tr>").addClass(this.editRowClass);
    
                this._eachField(function(field) {
                    var fieldValue = this._getItemFieldValue(item, field);
    
                    this._prepareCell("<td>", field, "editcss")
                        .append(this.renderTemplate(field.editTemplate || "", field, { value: fieldValue, item: item }))
                        .appendTo($result);
                });
    
                return $result;
            },
    
            updateItem: function(item, editedItem) {
                if(arguments.length === 1) {
                    editedItem = item;
                }
    
                var $row = item ? this.rowByItem(item) : this._editingRow;
                editedItem = editedItem || this._getValidatedEditedItem();
    
                if(!editedItem)
                    return;
    
                return this._updateRow($row, editedItem);
            },
    
            _getValidatedEditedItem: function() {
                var item = this._getEditedItem();
                return this._validateItem(item, this._getEditRow()) ? item : null;
            },
    
            _updateRow: function($updatingRow, editedItem) {
                var updatingItem = $updatingRow.data(JSGRID_ROW_DATA_KEY),
                    updatingItemIndex = this._itemIndex(updatingItem),
                    updatedItem = $.extend(true, {}, updatingItem, editedItem);
    
                var args = this._callEventHandler(this.onItemUpdating, {
                    row: $updatingRow,
                    item: updatedItem,
                    itemIndex: updatingItemIndex,
                    previousItem: updatingItem
                });
    
                return this._controllerCall("updateItem", updatedItem, args.cancel, function(loadedUpdatedItem) {
                    var previousItem = $.extend(true, {}, updatingItem);
                    updatedItem = loadedUpdatedItem || $.extend(true, updatingItem, editedItem);
    
                    var $updatedRow = this._finishUpdate($updatingRow, updatedItem, updatingItemIndex);
    
                    this._callEventHandler(this.onItemUpdated, {
                        row: $updatedRow,
                        item: updatedItem,
                        itemIndex: updatingItemIndex,
                        previousItem: previousItem
                    });
                });
            },
    
            _rowIndex: function(row) {
                return this._content.children().index($(row));
            },
    
            _itemIndex: function(item) {
                return $.inArray(item, this.data);
            },
    
            _finishUpdate: function($updatingRow, updatedItem, updatedItemIndex) {
                this.cancelEdit();
                this.data[updatedItemIndex] = updatedItem;
    
                var $updatedRow = this._createRow(updatedItem, updatedItemIndex);
                $updatingRow.replaceWith($updatedRow);
                return $updatedRow;
            },
    
            _getEditedItem: function() {
                var result = {};
                this._eachField(function(field) {
                    if(field.editing) {
                        this._setItemFieldValue(result, field, field.editValue());
                    }
                });
                return result;
            },
    
            cancelEdit: function() {
                if(!this._editingRow)
                    return;
    
                this._getEditRow().remove();
                this._editingRow.show();
                this._editingRow = null;
            },
    
            _getEditRow: function() {
                return this._editingRow && this._editingRow.data(JSGRID_EDIT_ROW_DATA_KEY);
            },
    
            deleteItem: function(item) {
                var $row = this.rowByItem(item);
    
                if(!$row.length)
                    return;
    
                if(this.confirmDeleting && !window.confirm(getOrApply(this.deleteConfirm, this, $row.data(JSGRID_ROW_DATA_KEY))))
                    return;
    
                return this._deleteRow($row);
            },
    
            _deleteRow: function($row) {
                var deletingItem = $row.data(JSGRID_ROW_DATA_KEY),
                    deletingItemIndex = this._itemIndex(deletingItem);
    
                var args = this._callEventHandler(this.onItemDeleting, {
                    row: $row,
                    item: deletingItem,
                    itemIndex: deletingItemIndex
                });
    
                return this._controllerCall("deleteItem", deletingItem, args.cancel, function() {
                    this._loadStrategy.finishDelete(deletingItem, deletingItemIndex);
    
                    this._callEventHandler(this.onItemDeleted, {
                        row: $row,
                        item: deletingItem,
                        itemIndex: deletingItemIndex
                    });
                });
            }
        };
    
        $.fn.jsGrid = function(config) {
            var args = $.makeArray(arguments),
                methodArgs = args.slice(1),
                result = this;
    
            this.each(function() {
                var $element = $(this),
                    instance = $element.data(JSGRID_DATA_KEY),
                    methodResult;
    
                if(instance) {
                    if(typeof config === "string") {
                        methodResult = instance[config].apply(instance, methodArgs);
                        if(methodResult !== undefined && methodResult !== instance) {
                            result = methodResult;
                            return false;
                        }
                    } else {
                        instance._detachWindowResizeCallback();
                        instance._init(config);
                        instance.render();
                    }
                } else {
                    new Grid($element, config);
                }
            });
    
            return result;
        };
    
        var fields = {};
    
        var setDefaults = function(config) {
            var componentPrototype;
    
            if($.isPlainObject(config)) {
                componentPrototype = Grid.prototype;
            } else {
                componentPrototype = fields[config].prototype;
                config = arguments[1] || {};
            }
    
            $.extend(componentPrototype, config);
        };
    
        var locales = {};
    
        var locale = function(lang) {
            var localeConfig = $.isPlainObject(lang) ? lang : locales[lang];
    
            if(!localeConfig)
                throw Error("unknown locale " + lang);
    
            setLocale(jsGrid, localeConfig);
        };
    
        var setLocale = function(obj, localeConfig) {
            $.each(localeConfig, function(field, value) {
                if($.isPlainObject(value)) {
                    setLocale(obj[field] || obj[field[0].toUpperCase() + field.slice(1)], value);
                    return;
                }
    
                if(obj.hasOwnProperty(field)) {
                    obj[field] = value;
                } else {
                    obj.prototype[field] = value;
                }
            });
        };
    
        window.jsGrid = {
            Grid: Grid,
            fields: fields,
            setDefaults: setDefaults,
            locales: locales,
            locale: locale,
            version: '1.5.3'
        };
    
    }(window, jQuery));
    
    (function(jsGrid, $, undefined) {
    
        function LoadIndicator(config) {
            this._init(config);
        }
    
        LoadIndicator.prototype = {
    
            container: "body",
            message: "Loading...",
            shading: true,
    
            zIndex: 1000,
            shaderClass: "jsgrid-load-shader",
            loadPanelClass: "jsgrid-load-panel",
    
            _init: function(config) {
                $.extend(true, this, config);
    
                this._initContainer();
                this._initShader();
                this._initLoadPanel();
            },
    
            _initContainer: function() {
                this._container = $(this.container);
            },
    
            _initShader: function() {
                if(!this.shading)
                    return;
    
                this._shader = $("<div>").addClass(this.shaderClass)
                    .hide()
                    .css({
                        position: "absolute",
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        zIndex: this.zIndex
                    })
                    .appendTo(this._container);
            },
    
            _initLoadPanel: function() {
                this._loadPanel = $("<div>").addClass(this.loadPanelClass)
                    .text(this.message)
                    .hide()
                    .css({
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        zIndex: this.zIndex
                    })
                    .appendTo(this._container);
            },
    
            show: function() {
                var $loadPanel = this._loadPanel.show();
    
                var actualWidth = $loadPanel.outerWidth();
                var actualHeight = $loadPanel.outerHeight();
    
                $loadPanel.css({
                    marginTop: -actualHeight / 2,
                    marginLeft: -actualWidth / 2
                });
    
                this._shader.show();
            },
    
            hide: function() {
                this._loadPanel.hide();
                this._shader.hide();
            }
    
        };
    
        jsGrid.LoadIndicator = LoadIndicator;
    
    }(jsGrid, jQuery));
    
    (function(jsGrid, $, undefined) {
    
        function DirectLoadingStrategy(grid) {
            this._grid = grid;
        }
    
        DirectLoadingStrategy.prototype = {
    
            firstDisplayIndex: function() {
                var grid = this._grid;
                return grid.option("paging") ? (grid.option("pageIndex") - 1) * grid.option("pageSize") : 0;
            },
    
            lastDisplayIndex: function() {
                var grid = this._grid;
                var itemsCount = grid.option("data").length;
    
                return grid.option("paging")
                    ? Math.min(grid.option("pageIndex") * grid.option("pageSize"), itemsCount)
                    : itemsCount;
            },
    
            itemsCount: function() {
                return this._grid.option("data").length;
            },
    
            openPage: function(index) {
                this._grid.refresh();
            },
    
            loadParams: function() {
                return {};
            },
    
            sort: function() {
                this._grid._sortData();
                this._grid.refresh();
                return $.Deferred().resolve().promise();
            },
    
            reset: function() {
                this._grid.refresh();
                return $.Deferred().resolve().promise();
            },
    
            finishLoad: function(loadedData) {
                this._grid.option("data", loadedData);
            },
    
            finishInsert: function(insertedItem) {
                var grid = this._grid;
                grid.option("data").push(insertedItem);
                grid.refresh();
            },
    
            finishDelete: function(deletedItem, deletedItemIndex) {
                var grid = this._grid;
                grid.option("data").splice(deletedItemIndex, 1);
                grid.reset();
            }
        };
    
    
        function PageLoadingStrategy(grid) {
            this._grid = grid;
            this._itemsCount = 0;
        }
    
        PageLoadingStrategy.prototype = {
    
            firstDisplayIndex: function() {
                return 0;
            },
    
            lastDisplayIndex: function() {
                return this._grid.option("data").length;
            },
    
            itemsCount: function() {
                return this._itemsCount;
            },
    
            openPage: function(index) {
                this._grid.loadData();
            },
    
            loadParams: function() {
                var grid = this._grid;
                return {
                    pageIndex: grid.option("pageIndex"),
                    pageSize: grid.option("pageSize")
                };
            },
    
            reset: function() {
                return this._grid.loadData();
            },
    
            sort: function() {
                return this._grid.loadData();
            },
    
            finishLoad: function(loadedData) {
                this._itemsCount = loadedData.itemsCount;
                this._grid.option("data", loadedData.data);
            },
    
            finishInsert: function(insertedItem) {
                this._grid.search();
            },
    
            finishDelete: function(deletedItem, deletedItemIndex) {
                this._grid.search();
            }
        };
    
        jsGrid.loadStrategies = {
            DirectLoadingStrategy: DirectLoadingStrategy,
            PageLoadingStrategy: PageLoadingStrategy
        };
    
    }(jsGrid, jQuery));
    
    (function(jsGrid, $, undefined) {
    
        var isDefined = function(val) {
            return typeof(val) !== "undefined" && val !== null;
        };
    
        var sortStrategies = {
            string: function(str1, str2) {
                if(!isDefined(str1) && !isDefined(str2))
                    return 0;
    
                if(!isDefined(str1))
                    return -1;
    
                if(!isDefined(str2))
                    return 1;
    
                return ("" + str1).localeCompare("" + str2);
            },
    
            number: function(n1, n2) {
                return n1 - n2;
            },
    
            date: function(dt1, dt2) {
                return dt1 - dt2;
            },
    
            numberAsString: function(n1, n2) {
                return parseFloat(n1) - parseFloat(n2);
            }
        };
    
        jsGrid.sortStrategies = sortStrategies;
    
    }(jsGrid, jQuery));
    
    (function(jsGrid, $, undefined) {
    
        function Validation(config) {
            this._init(config);
        }
    
        Validation.prototype = {
    
            _init: function(config) {
                $.extend(true, this, config);
            },
    
            validate: function(args) {
                var errors = [];
    
                $.each(this._normalizeRules(args.rules), function(_, rule) {
                    if(rule.validator(args.value, args.item, rule.param))
                        return;
    
                    var errorMessage = $.isFunction(rule.message) ? rule.message(args.value, args.item) : rule.message;
                    errors.push(errorMessage);
                });
    
                return errors;
            },
    
            _normalizeRules: function(rules) {
                if(!$.isArray(rules))
                    rules = [rules];
    
                return $.map(rules, $.proxy(function(rule) {
                    return this._normalizeRule(rule);
                }, this));
            },
    
            _normalizeRule: function(rule) {
                if(typeof rule === "string")
                    rule = { validator: rule };
    
                if($.isFunction(rule))
                    rule = { validator: rule };
    
                if($.isPlainObject(rule))
                    rule = $.extend({}, rule);
                else
                    throw Error("wrong validation config specified");
    
                if($.isFunction(rule.validator))
                    return rule;
    
                return this._applyNamedValidator(rule, rule.validator);
            },
    
            _applyNamedValidator: function(rule, validatorName) {
                delete rule.validator;
    
                var validator = validators[validatorName];
                if(!validator)
                    throw Error("unknown validator \"" + validatorName + "\"");
    
                if($.isFunction(validator)) {
                    validator = { validator: validator };
                }
    
                return $.extend({}, validator, rule);
            }
        };
    
        jsGrid.Validation = Validation;
    
    
        var validators = {
            required: {
                message: "Field is required",
                validator: function(value) {
                    return value !== undefined && value !== null && value !== "";
                }
            },
    
            rangeLength: {
                message: "Field value length is out of the defined range",
                validator: function(value, _, param) {
                    return value.length >= param[0] && value.length <= param[1];
                }
            },
    
            minLength: {
                message: "Field value is too short",
                validator: function(value, _, param) {
                    return value.length >= param;
                }
            },
    
            maxLength: {
                message: "Field value is too long",
                validator: function(value, _, param) {
                    return value.length <= param;
                }
            },
    
            pattern: {
                message: "Field value is not matching the defined pattern",
                validator: function(value, _, param) {
                    if(typeof param === "string") {
                        param = new RegExp("^(?:" + param + ")$");
                    }
                    return param.test(value);
                }
            },
    
            range: {
                message: "Field value is out of the defined range",
                validator: function(value, _, param) {
                    return value >= param[0] && value <= param[1];
                }
            },
    
            min: {
                message: "Field value is too small",
                validator: function(value, _, param) {
                    return value >= param;
                }
            },
    
            max: {
                message: "Field value is too large",
                validator: function(value, _, param) {
                    return value <= param;
                }
            }
        };
    
        jsGrid.validators = validators;
    
    }(jsGrid, jQuery));
    
    (function(jsGrid, $, undefined) {
    
        function Field(config) {
            $.extend(true, this, config);
            this.sortingFunc = this._getSortingFunc();
        }
    
        Field.prototype = {
            name: "",
            title: null,
            css: "",
            align: "",
            width: 100,
    
            visible: true,
            filtering: true,
            inserting: true,
            editing: true,
            sorting: true,
            sorter: "string", // name of SortStrategy or function to compare elements
    
            headerTemplate: function() {
                return (this.title === undefined || this.title === null) ? this.name : this.title;
            },
    
            itemTemplate: function(value, item) {
                return value;
            },
    
            filterTemplate: function() {
                return "";
            },
    
            insertTemplate: function() {
                return "";
            },
    
            editTemplate: function(value, item) {
                this._value = value;
                return this.itemTemplate(value, item);
            },
    
            filterValue: function() {
                return "";
            },
    
            insertValue: function() {
                return "";
            },
    
            editValue: function() {
                return this._value;
            },
    
            _getSortingFunc: function() {
                var sorter = this.sorter;
    
                if($.isFunction(sorter)) {
                    return sorter;
                }
    
                if(typeof sorter === "string") {
                    return jsGrid.sortStrategies[sorter];
                }
    
                throw Error("wrong sorter for the field \"" + this.name + "\"!");
            }
        };
    
        jsGrid.Field = Field;
    
    }(jsGrid, jQuery));
    
    (function(jsGrid, $, undefined) {
    
        var Field = jsGrid.Field;
    
        function TextField(config) {
            Field.call(this, config);
        }
    
        TextField.prototype = new Field({
    
            autosearch: true,
            readOnly: false,
    
            filterTemplate: function() {
                if(!this.filtering)
                    return "";
    
                var grid = this._grid,
                    $result = this.filterControl = this._createTextBox();
    
                if(this.autosearch) {
                    $result.on("keypress", function(e) {
                        if(e.which === 13) {
                            grid.search();
                            e.preventDefault();
                        }
                    });
                }
    
                return $result;
            },
    
            insertTemplate: function() {
                if(!this.inserting)
                    return "";
    
                return this.insertControl = this._createTextBox();
            },
    
            editTemplate: function(value) {
                if(!this.editing)
                    return this.itemTemplate.apply(this, arguments);
    
                var $result = this.editControl = this._createTextBox();
                $result.val(value);
                return $result;
            },
    
            filterValue: function() {
                return this.filterControl.val();
            },
    
            insertValue: function() {
                return this.insertControl.val();
            },
    
            editValue: function() {
                return this.editControl.val();
            },
    
            _createTextBox: function() {
                return $("<input>").attr("type", "text")
                    .prop("readonly", !!this.readOnly);
            }
        });
    
        jsGrid.fields.text = jsGrid.TextField = TextField;
    
    }(jsGrid, jQuery));
    
    (function(jsGrid, $, undefined) {
    
        var TextField = jsGrid.TextField;
    
        function NumberField(config) {
            TextField.call(this, config);
        }
    
        NumberField.prototype = new TextField({
    
            sorter: "number",
            align: "right",
            readOnly: false,
    
            filterValue: function() {
                return this.filterControl.val()
                    ? parseInt(this.filterControl.val() || 0, 10)
                    : undefined;
            },
    
            insertValue: function() {
                return this.insertControl.val()
                    ? parseInt(this.insertControl.val() || 0, 10)
                    : undefined;
            },
    
            editValue: function() {
                return this.editControl.val()
                    ? parseInt(this.editControl.val() || 0, 10)
                    : undefined;
            },
    
            _createTextBox: function() {
                return $("<input>").attr("type", "number")
                    .prop("readonly", !!this.readOnly);
            }
        });
    
        jsGrid.fields.number = jsGrid.NumberField = NumberField;
    
    }(jsGrid, jQuery));
    
    (function(jsGrid, $, undefined) {
    
        var TextField = jsGrid.TextField;
    
        function TextAreaField(config) {
            TextField.call(this, config);
        }
    
        TextAreaField.prototype = new TextField({
    
            insertTemplate: function() {
                if(!this.inserting)
                    return "";
    
                return this.insertControl = this._createTextArea();
            },
    
            editTemplate: function(value) {
                if(!this.editing)
                    return this.itemTemplate.apply(this, arguments);
    
                var $result = this.editControl = this._createTextArea();
                $result.val(value);
                return $result;
            },
    
            _createTextArea: function() {
                return $("<textarea>").prop("readonly", !!this.readOnly);
            }
        });
    
        jsGrid.fields.textarea = jsGrid.TextAreaField = TextAreaField;
    
    }(jsGrid, jQuery));
    
    (function(jsGrid, $, undefined) {
    
        var NumberField = jsGrid.NumberField;
        var numberValueType = "number";
        var stringValueType = "string";
    
        function SelectField(config) {
            this.items = [];
            this.selectedIndex = -1;
            this.valueField = "";
            this.textField = "";
    
            if(config.valueField && config.items.length) {
                var firstItemValue = config.items[0][config.valueField];
                this.valueType = (typeof firstItemValue) === numberValueType ? numberValueType : stringValueType;
            }
    
            this.sorter = this.valueType;
    
            NumberField.call(this, config);
        }
    
        SelectField.prototype = new NumberField({
    
            align: "center",
            valueType: numberValueType,
    
            itemTemplate: function(value) {
                var items = this.items,
                    valueField = this.valueField,
                    textField = this.textField,
                    resultItem;
    
                if(valueField) {
                    resultItem = $.grep(items, function(item, index) {
                        return item[valueField] === value;
                    })[0] || {};
                }
                else {
                    resultItem = items[value];
                }
    
                var result = (textField ? resultItem[textField] : resultItem);
    
                return (result === undefined || result === null) ? "" : result;
            },
    
            filterTemplate: function() {
                if(!this.filtering)
                    return "";
    
                var grid = this._grid,
                    $result = this.filterControl = this._createSelect();
    
                if(this.autosearch) {
                    $result.on("change", function(e) {
                        grid.search();
                    });
                }
    
                return $result;
            },
    
            insertTemplate: function() {
                if(!this.inserting)
                    return "";
    
                return this.insertControl = this._createSelect();
            },
    
            editTemplate: function(value) {
                if(!this.editing)
                    return this.itemTemplate.apply(this, arguments);
    
                var $result = this.editControl = this._createSelect();
                (value !== undefined) && $result.val(value);
                return $result;
            },
    
            filterValue: function() {
                var val = this.filterControl.val();
                return this.valueType === numberValueType ? parseInt(val || 0, 10) : val;
            },
    
            insertValue: function() {
                var val = this.insertControl.val();
                return this.valueType === numberValueType ? parseInt(val || 0, 10) : val;
            },
    
            editValue: function() {
                var val = this.editControl.val();
                return this.valueType === numberValueType ? parseInt(val || 0, 10) : val;
            },
    
            _createSelect: function() {
                var $result = $("<select>"),
                    valueField = this.valueField,
                    textField = this.textField,
                    selectedIndex = this.selectedIndex;
    
                $.each(this.items, function(index, item) {
                    var value = valueField ? item[valueField] : index,
                        text = textField ? item[textField] : item;
    
                    var $option = $("<option>")
                        .attr("value", value)
                        .text(text)
                        .appendTo($result);
    
                    $option.prop("selected", (selectedIndex === index));
                });
    
                $result.prop("disabled", !!this.readOnly);
    
                return $result;
            }
        });
    
        jsGrid.fields.select = jsGrid.SelectField = SelectField;
    
    }(jsGrid, jQuery));
    
    (function(jsGrid, $, undefined) {
    
        var Field = jsGrid.Field;
    
        function CheckboxField(config) {
            Field.call(this, config);
        }
    
        CheckboxField.prototype = new Field({
    
            sorter: "number",
            align: "center",
            autosearch: true,
    
            itemTemplate: function(value) {
                return this._createCheckbox().prop({
                    checked: value,
                    disabled: true
                });
            },
    
            filterTemplate: function() {
                if(!this.filtering)
                    return "";
    
                var grid = this._grid,
                    $result = this.filterControl = this._createCheckbox();
    
                $result.prop({
                    readOnly: true,
                    indeterminate: true
                });
    
                $result.on("click", function() {
                    var $cb = $(this);
    
                    if($cb.prop("readOnly")) {
                        $cb.prop({
                            checked: false,
                            readOnly: false
                        });
                    }
                    else if(!$cb.prop("checked")) {
                        $cb.prop({
                            readOnly: true,
                            indeterminate: true
                        });
                    }
                });
    
                if(this.autosearch) {
                    $result.on("click", function() {
                        grid.search();
                    });
                }
    
                return $result;
            },
    
            insertTemplate: function() {
                if(!this.inserting)
                    return "";
    
                return this.insertControl = this._createCheckbox();
            },
    
            editTemplate: function(value) {
                if(!this.editing)
                    return this.itemTemplate.apply(this, arguments);
    
                var $result = this.editControl = this._createCheckbox();
                $result.prop("checked", value);
                return $result;
            },
    
            filterValue: function() {
                return this.filterControl.get(0).indeterminate
                    ? undefined
                    : this.filterControl.is(":checked");
            },
    
            insertValue: function() {
                return this.insertControl.is(":checked");
            },
    
            editValue: function() {
                return this.editControl.is(":checked");
            },
    
            _createCheckbox: function() {
                return $("<input>").attr("type", "checkbox");
            }
        });
    
        jsGrid.fields.checkbox = jsGrid.CheckboxField = CheckboxField;
    
    }(jsGrid, jQuery));
    
    (function(jsGrid, $, undefined) {
    
        var Field = jsGrid.Field;
    
        function ControlField(config) {
            Field.call(this, config);
            this._configInitialized = false;
        }
    
        ControlField.prototype = new Field({
            css: "jsgrid-control-field",
            align: "center",
            width: 50,
            filtering: false,
            inserting: false,
            editing: false,
            sorting: false,
    
            buttonClass: "jsgrid-button",
            modeButtonClass: "jsgrid-mode-button",
    
            modeOnButtonClass: "jsgrid-mode-on-button",
            searchModeButtonClass: "jsgrid-search-mode-button",
            insertModeButtonClass: "jsgrid-insert-mode-button",
            editButtonClass: "jsgrid-edit-button",
            deleteButtonClass: "jsgrid-delete-button",
            searchButtonClass: "jsgrid-search-button",
            clearFilterButtonClass: "jsgrid-clear-filter-button",
            insertButtonClass: "jsgrid-insert-button",
            updateButtonClass: "jsgrid-update-button",
            cancelEditButtonClass: "jsgrid-cancel-edit-button",
    
            searchModeButtonTooltip: "Switch to searching",
            insertModeButtonTooltip: "Switch to inserting",
            editButtonTooltip: "Edit",
            deleteButtonTooltip: "Delete",
            searchButtonTooltip: "Search",
            clearFilterButtonTooltip: "Clear filter",
            insertButtonTooltip: "Insert",
            updateButtonTooltip: "Update",
            cancelEditButtonTooltip: "Cancel edit",
    
            editButton: true,
            deleteButton: true,
            clearFilterButton: true,
            modeSwitchButton: true,
    
            _initConfig: function() {
                this._hasFiltering = this._grid.filtering;
                this._hasInserting = this._grid.inserting;
    
                if(this._hasInserting && this.modeSwitchButton) {
                    this._grid.inserting = false;
                }
    
                this._configInitialized = true;
            },
            headerTemplate: function() {
                if(!this._configInitialized) {
                    this._initConfig();
                }
    
                var hasFiltering = this._hasFiltering;
                var hasInserting = this._hasInserting;
    
                if(!this.modeSwitchButton || (!hasFiltering && !hasInserting))
                    return "";
    
                if(hasFiltering && !hasInserting)
                    return this._createFilterSwitchButton();
    
                if(hasInserting && !hasFiltering)
                    return this._createInsertSwitchButton();
    
                return this._createModeSwitchButton();
            },
    
            itemTemplate: function(value, item) {
                var $result = $([]);
    
                if(this.editButton) {
                    $result = $result.add(this._createEditButton(item));
                }
    
                if(this.deleteButton) {
                    $result = $result.add(this._createDeleteButton(item));
                }
    
                return $result;
            },
    
            filterTemplate: function() {
                var $result = this._createSearchButton();
                return this.clearFilterButton ? $result.add(this._createClearFilterButton()) : $result;
            },
    
            insertTemplate: function() {
                return this._createInsertButton();
            },
    
            editTemplate: function() {
                return this._createUpdateButton().add(this._createCancelEditButton());
            },
    
            _createFilterSwitchButton: function() {
                return this._createOnOffSwitchButton("filtering", this.searchModeButtonClass, true);
            },
    
            _createInsertSwitchButton: function() {
                return this._createOnOffSwitchButton("inserting", this.insertModeButtonClass, false);
            },
    
            _createOnOffSwitchButton: function(option, cssClass, isOnInitially) {
                var isOn = isOnInitially;
    
                var updateButtonState = $.proxy(function() {
                    $button.toggleClass(this.modeOnButtonClass, isOn);
                }, this);
    
                var $button = this._createGridButton(this.modeButtonClass + " " + cssClass, "", function(grid) {
                    isOn = !isOn;
                    grid.option(option, isOn);
                    updateButtonState();
                });
    
                updateButtonState();
    
                return $button;
            },
    
            _createModeSwitchButton: function() {
                var isInserting = false;
    
                var updateButtonState = $.proxy(function() {
                    $button.attr("title", isInserting ? this.searchModeButtonTooltip : this.insertModeButtonTooltip)
                        .toggleClass(this.insertModeButtonClass, !isInserting)
                        .toggleClass(this.searchModeButtonClass, isInserting);
                }, this);
    
                var $button = this._createGridButton(this.modeButtonClass, "", function(grid) {
                    isInserting = !isInserting;
                    grid.option("inserting", isInserting);
                    grid.option("filtering", !isInserting);
                    updateButtonState();
                });
    
                updateButtonState();
    
                return $button;
            },
    
            _createEditButton: function(item) {
                return this._createGridButton(this.editButtonClass, this.editButtonTooltip, function(grid, e) {
                    grid.editItem(item);
                    e.stopPropagation();
                });
            },
    
            _createDeleteButton: function(item) {
                return this._createGridButton(this.deleteButtonClass, this.deleteButtonTooltip, function(grid, e) {
                    grid.deleteItem(item);
                    e.stopPropagation();
                });
            },
    
            _createSearchButton: function() {
                return this._createGridButton(this.searchButtonClass, this.searchButtonTooltip, function(grid) {
                    grid.search();
                });
            },
    
            _createClearFilterButton: function() {
                return this._createGridButton(this.clearFilterButtonClass, this.clearFilterButtonTooltip, function(grid) {
                    grid.clearFilter();
                });
            },
    
            _createInsertButton: function() {
                return this._createGridButton(this.insertButtonClass, this.insertButtonTooltip, function(grid) {
                    grid.insertItem().done(function() {
                        grid.clearInsert();
                    });
                });
            },
    
            _createUpdateButton: function() {
                return this._createGridButton(this.updateButtonClass, this.updateButtonTooltip, function(grid, e) {
                    grid.updateItem();
                    e.stopPropagation();
                });
            },
    
            _createCancelEditButton: function() {
                return this._createGridButton(this.cancelEditButtonClass, this.cancelEditButtonTooltip, function(grid, e) {
                    grid.cancelEdit();
                    e.stopPropagation();
                });
            },
    
            _createGridButton: function(cls, tooltip, clickHandler) {
                var grid = this._grid;
    
                return $("<input>").addClass(this.buttonClass)
                    .addClass(cls)
                    .attr({
                        type: "button",
                        title: tooltip
                    })
                    .on("click", function(e) {
                        clickHandler(grid, e);
                    });
            },
    
            editValue: function() {
                return "";
            }
    
        });
    
        jsGrid.fields.control = jsGrid.ControlField = ControlField;
    
    }(jsGrid, jQuery));
    
});
 
define('app/changePage',[
    'require',
    "jquery",
], function(
        require,
        $,
    ) {
    'use strict';
    
   let fun = {
        changePageJSPost:function (data){
                // 如何处理请求？  参数：1、页数，2、数据类型
                // 1.处理默认数据
                // 2.根据参数请求特定数据、
                console.log("CP_changePageJSPost is ");
                console.log(data);
                let LFID = data.LFID;
                let tabName = data.tabName;
                let LTIndex = LFID + tabName;
                let JGConfig = parent.window.JGConfig[LTIndex];
                let fields = JGConfig.fields;
                let getUrl = JGConfig.url;
                let page = data.page;

                let TBF = require("app/tabsFunctions");
                /**获得当前搜索条件状态 */
                let searchJson = {
                    add:".bodyFrame1-main",
                };
                // TBF.getCase(searchJson); 

                let searchRes = TBF.getCase(searchJson);
                console.log("searchRes is ")
                console.log(searchRes); 
                /**此处获得的是搜索条件，下面开始判断，如果是非0，则带搜索条件继续搜索 */

                if(page != "0"){
                    /**代表分页事件请求 */
                    let data = {
                        page,
                    };
                    data = $.extend(data, searchRes);
                    let json = {
                        LFID,
                        tabName,
                        url:getUrl,
                        page,
                        data,
                        fields,
                    };
                    console.log("this is CP_ pageValue");
                    console.log(page);
                    let JGM = require("app/jsGridMethods");
                    JGM.getInfo(json);

                }else{
                    /**代表默认请求 */
                    /**此处应为请求数据添加 */
                }
                
                /**此处代码块作用，用来临时赋值。默认 容器为undefined，请求到数据时为其赋值（其他模块），生命周期开始时，此代码块在此不断询问目标对象书否为undefined，是则等待一会继续询问，直到不为undefined（别的模块已赋值），此时取出数据，使用完后再设置undefined，生命周期结束。 */
                let IPCB = setInterval(function(){//每隔Nms去判断  是否被申明，是则取消循环，输出
                    try {
                        if(parent.window.JGData[LTIndex] != undefined){
                            clearInterval(IPCB);
                            let JGData = parent.window.JGData[LTIndex];
                            let totalCount = JGData.totalCount;
                            let totalPage = JGData.totalPage;
                            let currentPage = JGData.currentPage;
                            // let dataList = JGData.dataList;
                            var pagesInfo = {
                                "count":totalCount,
                                "page":totalPage,
                                "thisPage":currentPage,
                                LFID,
                                tabName,
                            }
                            fun.addChangePageMore(pagesInfo);
                            parent.window.JGData[LTIndex] = undefined;
                        }
                    } catch (error) {console.log("Error! window.JGData")}
                }, 80);

        },
        changePageJS:function(data){
            let LFID = data.LFID;
            let tabName = data.tabName;

            // (先解绑,因为此函数会被多次调用)
            // 直接点击 页面数字的 事件
            $("#changePage .pages li").off("click");
            $("#changePage .pages li").click(function(e){
                // var a = $(this).text();
                //所点击的li pages属性（所点击的是第几页）
                var b = $(this).attr("pages");
                let json = {
                    LFID,
                    tabName,
                    page:b,
                }
                fun.changePageJSPost(json);
                //测试结束  点击页数按钮时改变
            });
            // 点击 跳转到第几页 事件
            $("#changePage .jumpToPage").off("click");  
            $("#changePage .jumpToPage").click(function(){
                //   分页JS  跳转按钮点击事件
                // 1.检测input内容是否合法
                    //1.检测是否为数字
                var zhi = parseInt($("#changePage .input input").val());
                    //2.检测是否有这页    (先从有多少条记录中取余出来，后可直接传值)
                var zhi1 = parseInt($("#changePage .title1").attr("pages")) ;
                // 总共多少条记录
                var all = parseInt($("#changePage .title1").attr("allPage"));
                // console.log(zhi1);
                // console.log("/////////");
                if (zhi != NaN && zhi <= zhi1 && zhi > 0){
                    
                }else if(zhi == 0){
                    //如果为0
                }
            });
            //点击 上一页下一页 事件
            $("#changePage .turn").off("click");
            $("#changePage .turn").click(function(){
                // 判断点击的是上一页还是下一页
                var zhi = $(this).hasClass("Left");
                // 总共多少条记录
                var all = parseInt($("#changePage .title1").attr("allPage"));
                // 获取当前总页数
                var pages = parseInt($("#changePage .title1").attr("pages"));
                // 获取当前选中页数
                var thisPage = parseInt($("#changePage .pages .checkedStau").attr("pages"));
                // console.log(thisPage);
                if(zhi){
                    // console.log("pageUp");
                    let b = 1;
                    thisPage > 1 ? b = thisPage -1:b = pages;
                    let json = {
                        LFID,
                        tabName,
                        page:b,
                    }
                    fun.changePageJSPost(json);
                }else{
                    // console.log("pageDown");
                    let b = 1;
                    thisPage < pages ? b = thisPage +1:b = 1;
                    let json = {
                        LFID,
                        tabName,
                        page:b,
                    }
                    fun.changePageJSPost(json);
                }
            });
        },
         addChangePageMoreClickTest:function(a){//  addChangePageMore(a) 函数测试开始 
            var example = {
                "pagesInfo":{//页数信息
                    "count":"77",//总共多少条记录
                    "page":a,//当前第几页
                }
            }
            fun.addChangePageMore(example.pagesInfo);
            //  addChangePageMore(a) 函数测试结束}
        },
        // addChangePageMoreClickTest(1);
        //处理翻页显示(默认第一页)
         addChangePageMore_001:function(thisPage){
            $("#changePage .pages").html(`
                <li pages="1" class="floatLeft elipsis">...</li>
                <li pages="${thisPage - 1}" class="floatLeft">${thisPage - 1}</li>
                <li pages="${thisPage}" class="floatLeft">${thisPage}</li>
                <li pages="${thisPage+1}" class="floatLeft">${thisPage+1}</li>
                <li pages="0" class="floatLeft elipsis">...</li>
            `);
        },
         addChangePageMore_002:function(pgs){
            $("#changePage .pages").html(`
                <li pages="1" class="floatLeft ">1</li>
                <li pages="2" class="floatLeft ">2</li>
                <li pages="3" class="floatLeft">3</li>
                <li pages="0" class="floatLeft  elipsis">...</li>
                <li pages="${pgs}" class="floatLeft ">${pgs}</li>
            `);
        },
         addChangePageMore_003:function(pgs){
            $("#changePage .pages").html(`
                <li pages="1" class="floatLeft ">1</li>
                <li pages="0" class="floatLeft elipsis">...</li>
                <li pages="${pgs-2}" class="floatLeft ">${pgs-2}</li>
                <li pages="${pgs-1}" class="floatLeft ">${pgs-1}</li>
                <li pages="${pgs}" class="floatLeft ">${pgs}</li>
            `);
        },
         addChangePageMore:function(a){
             let LFID = a.LFID;
             let tabName = a.tabName;
             let page = a.page;
             console.log("this is CP_addChangePageMore!")
             console.log(a);
            //共多少记录
            var allPages = a.count;
            allPages == undefined ? allPages = 1: allPages = allPages;
            //十位向上取整计算需要显示多少页
            var pgs = a.page;
            //当前是第几页
            var thisPage = parseInt(a.thisPage);
            /**验证thisPage不为NaN */
            thisPage != thisPage ? thisPage =1 : thisPage = thisPage;
            //本页应为多少条
                //1.检测当前是第几页。2.最后一页则取个位，否则取整
            var b = "";
            thisPage < pgs ? b = "1-5": b = "1-"+ (allPages - (thisPage -1)*5 );
            $("#changePage .title1").attr("pages",pgs).attr("allPage",allPages);
            $("#changePage .title1").html(`
            共有 <b style="color:#A60427">${allPages}</b> 个记录 , 本页${b}条 ${thisPage}/${pgs}页
            `);
            //填充页数小方块
                //1.判断总页数是否大于5
                if(pgs > 5){
                    //是  中间用省略号
                        //根据当前第几页，用算法算排布
                        // 必要信息： 1.总页数 （6） 2.当前页数（3）
                    // 思路：
                        //
                        /*
                            1.判断省略号是否小于2，
                                是则 三种情况
                                    1.空
                                        置 1 2 3 ... n
                                    2.显示  1 2 3 ... n
                                        通过 当前页判断，2或3则进入状态2，n则 置 1 ... n-2 n-1 n
                                    3.显示  1 ... n-2 n-1 n
                                        通过 当前页判断，n-2 或 n-1则进入状态2，1则 置 1 2 3 ... n
                                否则 判断 当前页(所点击的页面)情况
                                    判断 当前页
                                        当前页 小于等于3，置  1 2 3 ... n
                                        当前页 大于n-2置  1 ... n-2 n-1 n
                                        都不满足  当前页取中间，置  ... n-1 n n+1 ...
                            2.省略号大于1 ，说明 是  … 3 4 5 … 这种形式，则判断
                        */
                        // console.log(pgs);
                    if($("#changePage .pages .elipsis").length > 1){
                            if(thisPage < 4){
                                //形式  1 2 3 ... n
                                fun.addChangePageMore_002(pgs);
                            }else if(thisPage >= (pgs-2)){
                            //形式  1 ... n-2 n-1 n
                            fun.addChangePageMore_003(pgs);
                            }else{
                                //形式  ... n-1 n n+1 ...
                                fun.addChangePageMore_001(thisPage);
                            }
                    }else{
                        //省略号小于2
                        // zhi1 为index值位置，值为 1 3 -1
                        var zhi1 =  $("#changePage .pages .elipsis").index();
                        // console.log(zhi1);
                        
                        if (zhi1 == 3){
                            if(thisPage == 3 || (thisPage > 3 && thisPage < pgs -1)){
                                //形式  ... n-1 n n+1 ...
                                fun.addChangePageMore_001(thisPage);
                            }else if(thisPage == pgs || thisPage == pgs -1){
                                //形式  1 ... n-2 n-1 n
                                fun.addChangePageMore_003(pgs);
                            }else {
                                //形式  1 2 3 ... n
                                fun.addChangePageMore_002(pgs);
                            }
                        }else if( zhi1 == 1){
                            if(thisPage == pgs-2 || (thisPage > 3 && thisPage < pgs -1)){
                                //形式  ... n-1 n n+1 ...
                                fun.addChangePageMore_001(thisPage);
                            }else if(thisPage == 1 || thisPage == 2){
                                //形式  1 2 3 ... n
                                fun.addChangePageMore_002(pgs);
                            }else{
                                //形式  1 ... n-2 n-1 n
                                fun.addChangePageMore_003(pgs);
                            }
                        }else{
                            //形式  1 2 3 ... n
                            fun.addChangePageMore_002(pgs);
                        }
                    }
                }else{
                    // console.log(pgs);
                    //否  罗列
                    var str = "";
                    //li 里的 pages ：为当前页。最高值为 pgs 。
                    for(var i = 0;i <= pgs-1;i++){
                        str += `<li pages="${i+1}" class="floatLeft">${i+1}</li>`;
                    }
                    // 填充进入dom
                    $("#changePage .pages").html(str);
                }
                //2.大于5，绑定点击事件
            //给所点击的填充颜色
            $("#changePage .pages li").removeClass("checkedStau");
            $("#changePage .pages li[pages='"+thisPage+"']").addClass("checkedStau");
            //changePagesJS 绑定事件(先解绑,因为此函数会被多次调用)
            let data = {
                LFID,
                tabName,
            }
            fun.changePageJS(data);
        },
         useTable_addInfo:function(json){
            // 填入页数信息   json.pagesInfo 为页数信息
            var pagesInfo = {
                "count":json.count,
                "page":json.page,
            }
            fun.addChangePageMore(pagesInfo);
        }

           
   }

  

   return fun;
});

define('app/jsGridMethods',[
    'require',
    "jquery",
    "lib/jsgrid/jsgrid",
    "app/changePage"
], function(
        require,
        $,
        jsGrid,
        CP,
    ) {
    'use strict';
   let fun = {
        changeForm:function(data){
            let arr = [];
            let obj1 = {};
            $.each(data.fields,function(i,j){
                if(j.PreName != undefined){
                    obj1[j.PreName] = j.name
                }
            });
            $.each(data.dataList,function(i,e){
                let obj = {};
                $.each(e,function(j,k){
                    obj[obj1[j]] = k;
                });
                    arr.push(obj)
            });
            return arr;
        },
        changeForm2:function(data){
            let value = null;
            let value2 = {};
            value2.fields = data.fields;
            value2.dataList= data.dataList;
            value = fun.changeForm(value2);
            data.dataList= value;
            fun.useTable_addInfo(data);
        },
        getInfo:function(json){
            let LFID = json.LFID;
            let tabName = json.tabName;
            let LFIDAndTabName = LFID+tabName;
            $.ajax({
                type: 'post',
                url: json.url,
                data: json.data,
                cache: false,
                dataType: "json",
                success: function(data){
                    if(data.resultFlag){
                        json.dataList = data.dataList 
                        // json.count = data.totalPage;
                        // json.count = "6";
                        // json.page = data.page;

                        /**每次请求成功后就更新windows对象 */
                        let funName = parent.window.JGData;
                        parent.window.JGData = funName || {};
                        parent.window.JGData[LFIDAndTabName] = data;


                        fun.changeForm2(json);
                        // 待更新分页
                        // let CP = require("app/changePage");
                        // let pagesInfo = {
                        //     "count":json.count,
                        //     "page":json.page,
                        // }
                        // let dataJson = {
                        //     page:"1",
                        //     LFID:"spact",
                        //     tabName:"spact"
                        // }
                        // CP.changePageJSPost(dataJson);
                        // CP.addChangePageMore(pagesInfo);
                    }else{
                    }
                    // useTable_addInfo(JSON.parse(data));
                },
                error:function(){
                    try {
                    }catch(e){
                    }
                }
            });
        },
        getInfo_insertInput:function(json){
            $.ajax({
                type: 'post',
                url: json.url,
                data: json.data,
                cache: false,
                dataType: "json",
                success: function(data){
                    if(data.resultFlag){
                        console.log(json.field)
                         let dates = data[json.field];
                        console.log("this is change page");
                        console.log(dates);

                        $.each(dates,function(i,e){
                            $(`input[field="${i}"]`).attr("value",e)
                        });
                        $.each(dates,function(i,e){
                            $(`textarea[field="${i}"]`).val(e)
                        });
                        $.each(dates,function(i,e){
                            $(`select[field="${i}"]`).find(`option[value="${e}"]`).attr("selected",true);
                        });

                        

                    }else{
                    }
                    // useTable_addInfo(JSON.parse(data));
                },
                error:function(){
                    try {
                    }catch(e){
                    }
                }
            });
        },
        getInfo_return:function(json){
            $.ajax({
                type: 'post',
                url: json.url,
                data: json.data,
                cache: false,
                dataType: "json",
                success: function(data){
                    if(data.resultFlag){
                        json.fun(data.dataList);
                        // json.dataList = data.dataList 
                        // json.count = data.totalPage;
                        // // json.count = "6";
                        // json.page = data.page;
                    }else{
                    }
                    // useTable_addInfo(JSON.parse(data));
                },
                error:function(){
                    try {
                    }catch(e){
                    }
                }
            });
        },
        deleteInfo:function(json){
            $.ajax({
                type: 'post',
                url: json.url,
                data: json.data,
                cache: false,
                dataType: "json",
                success: function(data){
                    if(data.resultFlag){
                        console.table(data);
                    }else{
                        console.log("0.0");
                    }
                },
                error:function(){
                    try {
                        console.log("请求失败")
                    }catch(e){
                    }
                }
            });
        },
        addInfo:function(json){
            $.ajax({
                type: 'post',
                url: json.url,
                data: json.data,
                cache: false,
                dataType: "json",
                success: function(data){
                    if(data.resultFlag){
                        console.table(data);
                    }else{
                        console.log("0.0");
                    }
                },
                error:function(){
                    try {
                        console.log("请求失败");
                    }catch(e){
                    }
                }
            });
        },
        updateInfo:function(json){
            $.ajax({
                type: 'post',
                url: json.url,
                data: json.data,
                cache: false,
                dataType: "json",
                success: function(data){
                    if(data.resultFlag){
                        console.table(data);
                    }else{
                        console.log("0.0");
                    }
                },
                error:function(){
                    try {
                        console.log("请求失败");
                    }catch(e){
                    }
                }
            });
        },
        useTable_addInfo:function(json){
            //表内容
            let dataInfo = json.dataList;
            let fields = json.fields;
            let LFID = json.LFID;
            let tabName = json.tabName;
            let funName = LFID + tabName;
            // var dataInfo = useTable_addInfo_changeForm(json.managerList);
            // 填入页数信息   json.pagesInfo 为页数信息
            // let pagesInfo = {
            //     "count":json.count,
            //     "page":json.page,
            //     "urlGet":json.url,
            // }
            // let CP = require("app/changePage");
            // CP.addChangePageMore(pagesInfo);
            // console.log(pagesInfo)
            //填入表内容、表相关配置、相关元素事件
            var jsGridInfo = {
                heading:true,
                // dataName:"各种离子浓度表",
                width: "100%",
                height: "600px",
                align:"center",
                autoload: false,
                inserting: true,
                sorting: true,
                paging: true,
                visible:true,
                data: dataInfo,//表内容
                editing:false,//是否可编辑
                pgbuttons:true,
                search:true,
                deleteConfirm: "确定删除吗？",
                required:true,
                fields,
            }
            $("#jsGrid").jsGrid(jsGridInfo);
            parent.window.JGConfig[funName].funs();
        },

   }
   return fun;
});




define('work/host/testSelectAll/C/main',[
    'require',
    "app/PKG_0.0.1",
    "jquery",
    "work/public/bodyFrame/c/main",
    "app/clearOrMore",
    "app/tabsFunctions",
    "work/public/alert/c/main",
    "app/jsGridMethods",
    "app/changePage"
], function( 
        require,
        PKG,
        $,
        bodyFrame,
        COM,
        TBF,
        login,
        JGM,
        CP,
    ){
    'use strict';
    // $(".bodyFrame1-main>.title").css("cursor","pointer");
    // $(".bodyFrame1-main>.title").click(function(){
    //     window.location.reload();
    // });
    var originAdd = `http://192.168.1.100:80`;
    var originEnd = `.do`;
    // 获得页面名称
    switch (TPN) {
        case "Login":
            /** login */
            (function(){
                /*
                var check = document.querySelector("#checkBox .check");
                var check2 = document.querySelector("#checkBox .check_icon");
                var status = document.querySelector("#checkBox .check_icon");
                status.setAttribute("checked","false");

                check.onclick = function(){
                        var status = document.querySelector("#checkBox .check_icon");
                        status.setAttribute("checked","true");
                };
                check2.onclick = function(){
                        var status = document.querySelector("#checkBox .check_icon");
                        status.setAttribute("checked","false");
                };
                */
               $("#imgCode").attr("src",`${originAdd}/stockWeb/getLoginCode${originEnd}`);
               $(".submit").click(function(){
                    let data3 = {add:".loginBox"}
                    let json = TBF.getCase(data3);
                    let dd = PKG.judge.pickNull(json);
                    data3.body = dd;
                    if(TBF.searchTips(data3)){
                        // JGM.addInfo(JGConfig);
                        console.log(json)
                        $.ajax({
                            type : 'POST',
                            url :  `${originAdd}/stockWeb/login${originEnd}`,
                            data : json,
                            dataType : 'json',
                            success : function(result) {
                                if(result.resultFlag){
                                    alert("登录成功");
                                    window.location.href="index.html";
                                }else{
                                    $("#errorMsg").text(result.errorMsg);
                                }
                            }
                        });
                        /**这里获得填好的用户名和密码 */

                    }else{
                        alert("请填写完信息！");
                    };

                });
                 // 获取验证码
                 $("#imgCode").click(function() {
                    $("#imgCode").attr('src', changeUrl($("#imgCode").attr("src")));
                });
            })();
            //为了使每次生成图片不一致，即不让浏览器读缓存，所以需要加上时间戳   
            function changeUrl(url) {
                var timestamp = PKG.get.randomNum(1,30) + PKG.get.randomNum(30,60) + PKG.get.randomNum(15,45);
                // var timestamp = (new Date()).valueOf();
                // alert(url);
                var name = `getLoginCode${originEnd}`;
                url = url.split(name);
                console.log(url);
                var kd = url[0]+name;
                
                
                if ((url[1].indexOf("&") >= 0)) {
                    kd = kd + "×tamp=" + timestamp;   
                } else {
                    kd = kd + "?timestamp=" + timestamp;   
                }
                console.log(kd)
                return kd;
            }
            
        break;
        case "T_pacttype":
        /**合同类型 */
                (function(){
                    let LFID = "T_pacttype";
                    let tabName = "T_pacttype";
                    let LFIDAndTabName = LFID + tabName;
                    let urlGet =   `${originAdd}/stockWeb/pacttypeList${originEnd}`;
                    let urlDelete = `${originAdd}/stockWeb/pacttypeDelete${originEnd}`;
                    /**search事件 */
                    let searchJson = {
                        add:".bodyFrame1-main .search",
                        button:".showAddNewCon2",
                        LFID,
                        tabName,
                    };
                    /**添加新页签事件 */
                    let data = {
                        add :".showAddNewCon",
                        tabName :"T_pacttype_addNew",
                        url :"./T_pacttype_addNew.html",
                        tabName_CN :"添加",
                    }
                    TBF.bindAddNewTab(data);
                    // let data1 = {
                    //     add :".showAddNewCon2",
                    //     tabName :"addNewContract2",
                    //     url :"./addNewContract.html",
                    //     tabName_CN :"添加新合同2",
                    // }
                    // TBF.bindAddNewTab(data1);
                    let JGConfig = {};
                    JGConfig.data = {page:1};
                    JGConfig.LFID = LFID;
                    JGConfig.tabName = tabName;
                    JGConfig.url = urlGet ;
                    /** 表格头，必须设置PreName，值对应为后台传过来的数据属性名 此对象可设置的属性详情见 https://github.com/tabalinas/jsgrid */
                    JGConfig.fields = [
                        { name: "编码",PreName:"fnumber", type: "number", readOnly: true, width:70,},
                        { name: "名称",PreName:"fname", type: "text", readOnly: true, width:70,  },
                        {type: "control",width:70,}
                    ];
                    // let funName = parent.window.JGConfigFuns;
                    // parent.window.JGConfigFuns = funName || {};
                    //将方法存入window对象中
                    JGConfig.funs = function (){
                        $(".jsgrid-insert-button").off("click");
                        // 删
                        $(".jsgrid-delete-button").off("click");
                        $(".jsgrid-delete-button").click(function(){
                            var Id = $(this).parents("tr").find("td").eq(0).text();
                            console.log(Id)
                            let dele = {}
                            dele.data= {fnumber:Id};
                            dele.url = urlDelete;
                            let isDelete = confirm("确定删除？");
                            if(isDelete){
                                JGM.deleteInfo(dele);
                                window.location.reload();
                            }
                        });
                        // 改
                        $(".jsgrid-edit-button").click(function(){
                            // //获取id
                            var a =  $(this).parents("tr").find("td").eq(0).text();
                            // window.location.href = ctx +"/managerSave.jsp?managerId="+a;
                            // managerSave.html
                        });
                        $(".jsgrid-insert-mode-button").off("click");
                        $(".jsgrid-insert-mode-button").on("click",function(){
                            // window.location.href = ctx +"/managerSave.jsp";
                        });
                        if ( $("#jsGrid").html() != null ){
                            //调分页的高度
                            var zhi1 = $("#jsGrid").offset().top;
                            var zhi2 = $("#jsGrid").height();
                            var zhi3 = zhi1 + zhi2 - 60;
                            // console.log(zhi3);
                            $("#changePage").css("top",zhi3);
                        }
                    
                                /**添加新页签事件 */
                            let data = {
                                add :".jsgrid-insert-mode-button",
                                tabName :"T_pacttype_addNew",
                                url :"./T_pacttype_addNew.html",
                                tabName_CN :"添加",
                            }
                            TBF.bindAddNewTab(data);



                            }
            

                    /**将当前表配置信息存入 */
                    let funName = parent.window.JGConfig;
                    parent.window.JGConfig = funName || {};
                    parent.window.JGConfig[LFIDAndTabName] = JGConfig;
    
                    // 直接按配置请求
                    JGM.getInfo(JGConfig);
                    /**给查询绑定事件 */
                    TBF.getInfoInCase(searchJson);
                })();  
            break;
/******************************************************************************** */  
        case "T_pacttype_addNew":
        /**新增合同类型 */
                (function(){
                    $(".closeTabs").click(function(){
                        /**刷新父下另一个框架iframe */
                                /**存 */
                        let JGConfig = {};
                        JGConfig.url = `${originAdd}/stockWeb/pacttypeAdd${originEnd}`;
                        // 去判断是否留空，留空则提醒，否则提交
                            // 获得数据
                            let LFID = "T_pacttype";
                            let data3 = {add:".bodyFrame1-main"}
                            let json = TBF.getCase(data3);
                            let dd = PKG.judge.pickNull(json);
                            data3.body = dd;
                            if(TBF.searchTips(data3)){
                                // JGM.addInfo(JGConfig);
                                JGConfig.data= json;
                                JGM.addInfo(JGConfig);
                                $(`#tabs .iframes>div[LFID="${LFID}"]>iframe[tabName="${LFID}"]`,parent.document)[0].contentWindow.location.reload();
                                TBF.closeTab();
                            }else{
                                alert("有未填字段！");
                            };
                        // JGM.addInfo(JGConfig);
                        /**关闭当前页签 */
                        // TBF.closeTab();
                    });
                })();
            break;
/******************************************************************************** */  
        case "T_supplyer":
                (function(){
                    let LFID = "T_supplyer";
                    let tabName = "T_supplyer";
                    let LFIDAndTabName = LFID + tabName;
                    let urlGet =   `${originAdd}/stockWeb/supplyerList${originEnd}`;
                    let urlDelete = `${originAdd}/stockWeb/supplyerDelete${originEnd}`;
                    /**search事件 */
                    let searchJson = {
                        add:".bodyFrame1-main .search",
                        button:".showAddNewCon2",
                        LFID,
                        tabName,
                    };
                    let data = {
                        add :".showAddNewCon",
                        tabName :"T_supplyer_addNew",
                        url :"./T_supplyer_addNew.html",
                        tabName_CN :"添加",
                    }
                    TBF.bindAddNewTab(data);
                    let JGConfig = {};
                    JGConfig.data = {};
                    JGConfig.LFID = LFID;
                    JGConfig.tabName = tabName;
                    JGConfig.url = urlGet ;
                    /** 表格头，必须设置PreName，值对应为后台传过来的数据属性名 此对象可设置的属性详情见 https://github.com/tabalinas/jsgrid */
                    JGConfig.fields = [
                        { name: "内码",PreName:"fitemid", type: "number", readOnly: true, width:70,},
                        { name: "编码",PreName:"fnumber", type: "text", readOnly: true, width:70,  },
                        { name: "类型",PreName:"ftype", type: "select", readOnly: true, width:70,  },
                        { name: "名称",PreName:"fname", type: "text", readOnly: true, width:70,  },
                        { name: "联系人",PreName:"frelax", type: "text", readOnly: true, width:70,  },
                        { name: "电话",PreName:"fphone", type: "number", readOnly: true, width:70,  },
                        { name: "备注",PreName:"fnote", type: "text", readOnly: true, width:70,  },
                        { name: "状态",PreName:"fstate", type: "select", readOnly: true, width:70,  },
                        {type: "control",width:70,}
                    ];
                    // let funName = parent.window.JGConfigFuns;
                    // parent.window.JGConfigFuns = funName || {};
                    //将方法存入window对象中
                    JGConfig.funs = function (){
                        $(".jsgrid-insert-button").off("click");
                        // 删
                        $(".jsgrid-delete-button").off("click");
                        $(".jsgrid-delete-button").click(function(){
                            var Id = $(this).parents("tr").find("td").eq(0).text();
                            console.log(Id)
                            let dele = {}
                            dele.data= {fitemid:Id};
                            dele.url = urlDelete;
                            let isDelete = confirm("确定删除？");
                            if(isDelete){
                                JGM.deleteInfo(dele);
                                window.location.reload();
                            }
                        });
                        // 改
                        $(".jsgrid-edit-button").click(function(){
                            // //获取id
                            var a =  $(this).parents("tr").find("td").eq(0).text();
                            // window.location.href = ctx +"/managerSave.jsp?managerId="+a;
                            // managerSave.html
                        });
                        $(".jsgrid-insert-mode-button").off("click");
                        $(".jsgrid-insert-mode-button").on("click",function(){
                            // window.location.href = ctx +"/managerSave.jsp";
                        });
                        if ( $("#jsGrid").html() != null ){
                            //调分页的高度
                            var zhi1 = $("#jsGrid").offset().top;
                            var zhi2 = $("#jsGrid").height();
                            var zhi3 = zhi1 + zhi2 - 60;
                            // console.log(zhi3);
                            $("#changePage").css("top",zhi3);
                        }
                    
                                /**添加新页签事件 */
                            let data = {
                                add :".jsgrid-insert-mode-button",
                                tabName :"T_supplyer_addNew",
                                url :"./T_supplyer_addNew.html",
                                tabName_CN :"添加",
                            }
                            TBF.bindAddNewTab(data);

                            }
                            
                    let funName = parent.window.JGConfig;
                    parent.window.JGConfig = funName || {};
                    parent.window.JGConfig[LFIDAndTabName] = JGConfig;
                    // 直接按配置请求
                    JGM.getInfo(JGConfig);
                    /**给查询绑定事件 */
                    TBF.getInfoInCase(searchJson);
                })();
            break;
/******************************************************************************** */
        case "T_department":
                (function(){
                    let LFID = "T_department";
                    let tabName = "T_department";
                    let LFIDAndTabName = LFID + tabName;
                    let urlGet =   `${originAdd}/stockWeb/departmentList${originEnd}`;
                    let urlDelete = `${originAdd}/stockWeb/departmentDelete${originEnd}`;
                    /**search事件 */
                    let searchJson = {
                        add:".bodyFrame1-main .search",
                        button:".showAddNewCon2",
                        LFID,
                        tabName,
                    };
                    /**添加新页签事件 */
                    let data = {
                        add :".showAddNewCon",
                        tabName :"T_department_addDept",
                        url :"./T_department_addDept.html",
                        tabName_CN :"添加新部门",
                    }
                    TBF.bindAddNewTab(data);

                    // let data1 = {
                    //     add :".showAddNewCon2",
                    //     tabName :"addNewContract2",
                    //     url :"./addNewContract.html",
                    //     tabName_CN :"添加新合同2",
                    // }
                    // TBF.bindAddNewTab(data1);
                
                    let JGConfig = {};
                    JGConfig.data = {};
                    JGConfig.LFID = LFID;
                    JGConfig.tabName = tabName;
                    JGConfig.url = urlGet ;
                    /** 表格头，必须设置PreName，值对应为后台传过来的数据属性名 此对象可设置的属性详情见 https://github.com/tabalinas/jsgrid */
                    JGConfig.fields = [
                        { name: "编码",PreName:"fnumber", type: "number", readOnly: true, width:70,},
                        { name: "名称",PreName:"fname", type: "text", readOnly: true, width:70,  },
                        {type: "control",width:70,}
                    ];
                    // let funName = parent.window.JGConfigFuns;
                    // parent.window.JGConfigFuns = funName || {};
                    //将方法存入window对象中
                    JGConfig.funs = function (){
                        $(".jsgrid-insert-button").off("click");
                        // 删
                        $(".jsgrid-delete-button").off("click");
                        $(".jsgrid-delete-button").click(function(){
                            /**需要改的地方！！！！！ */
                            var Id = $(this).parents("tr").find("td").eq(0).text();
                            console.log(Id)
                            let dele = {}
                            /**需要改的地方！！！！！ */
                            dele.data= {fnumber:Id};
                            console.log(dele.data)
                            dele.url = urlDelete;
                            let isDelete = confirm("确定删除？");
                            if(isDelete){
                                console.log(dele)
                                JGM.deleteInfo(dele);
                                window.location.reload();
                            }
                        });
                        // 改
                        $(".jsgrid-edit-button").click(function(){
                            // //获取id
                            var a =  $(this).parents("tr").find("td").eq(0).text();
                            // window.location.href = ctx +"/managerSave.jsp?managerId="+a;
                            // managerSave.html
                        });
                        $(".jsgrid-insert-mode-button").off("click");
                        $(".jsgrid-insert-mode-button").on("click",function(){
                            // window.location.href = ctx +"/managerSave.jsp";
                        });
                        if ( $("#jsGrid").html() != null ){
                            //调分页的高度
                            var zhi1 = $("#jsGrid").offset().top;
                            var zhi2 = $("#jsGrid").height();
                            var zhi3 = zhi1 + zhi2 - 60;
                            // console.log(zhi3);
                            $("#changePage").css("top",zhi3);
                        }
                    
                                /**添加新页签事件 */
                            let data = {
                                add :".jsgrid-insert-mode-button",
                                tabName :"T_department_addDept",
                                url :"./T_department_addDept.html",
                                tabName_CN :"添加新部门",
                            }
                            TBF.bindAddNewTab(data);

                            }


                    /**将当前表配置信息存入sessionStorage */
                    let funName = parent.window.JGConfig;
                    parent.window.JGConfig = funName || {};
                    parent.window.JGConfig[LFIDAndTabName] = JGConfig;

                    // 直接按配置请求
                    JGM.getInfo(JGConfig);
                    /**给查询绑定事件 */
                    // TBF.getInfoInCase(searchJson);
                })();
            break;
/******************************************************************************** */  
case "T_department_addDept":
        (function(){
            $(".closeTabs").click(function(){
                /**刷新父下另一个框架iframe */
                        /**存 */
                let JGConfig = {};
                JGConfig.url = `${originAdd}/stockWeb/departmentAdd${originEnd}`;
                // 去判断是否留空，留空则提醒，否则提交
                    // 获得数据
                    let LFID = "T_department";
                    let data3 = {add:".bodyFrame1-main"}
                    let json = TBF.getCase(data3);
                    let dd = PKG.judge.pickNull(json);
                    data3.body = dd;
                    if(TBF.searchTips(data3)){
                        // JGM.addInfo(JGConfig);
                        JGConfig.data= json;
                        JGM.addInfo(JGConfig);
                        $(`#tabs .iframes>div[LFID="${LFID}"]>iframe[tabName="${LFID}"]`,parent.document)[0].contentWindow.location.reload();
                        TBF.closeTab();
                    }else{
                        alert("有未填字段！");
                    };
    
                // JGM.addInfo(JGConfig);
                /**关闭当前页签 */
                // TBF.closeTab();
            });
        })();
    break;
/******************************************************************************** */   
case "T_item":
            (function(){
                let LFID = "T_item";
                let tabName = "T_item";
                let LFIDAndTabName = LFID + tabName;
                let urlGet =   `${originAdd}/stockWeb/itemList${originEnd}`;
                let urlDelete = `${originAdd}/stockWeb/itemDelete${originEnd}`;
                /**search事件 */
                let searchJson = {
                    add:".bodyFrame1-main .search",
                    button:".showAddNewCon2",
                    LFID,
                    tabName,
                };
                /**添加新页签事件 */
                let data = {
                    add :".showAddNewCon",
                    tabName :"T_item_addNew",
                    url :"./T_item_addNew.html",
                    tabName_CN :"添加",
                }
                TBF.bindAddNewTab(data);
                let JGConfig = {};
                JGConfig.data = {page:1};
                JGConfig.LFID = LFID;
                JGConfig.tabName = tabName;
                JGConfig.url = urlGet ;
                /** 表格头，必须设置PreName，值对应为后台传过来的数据属性名 此对象可设置的属性详情见 https://github.com/tabalinas/jsgrid */
                JGConfig.fields = [
                    { name: "内码",PreName:"fitemid", type: "number", readOnly: true, width:70,},
                    { name: "编码",PreName:"fnumber", type: "text", readOnly: true, width:70,  },
                    { name: "类型",PreName:"ftype", type: "text", readOnly: true, width:70,  },
                    { name: "名称",PreName:"fname", type: "text", readOnly: true, width:70,  },
                    { name: "规格",PreName:"fmodel", type: "text", readOnly: true, width:70,  },
                    { name: "单位",PreName:"funit", type: "text", readOnly: true, width:70,  },
                    { name: "备注",PreName:"fnote", type: "text", readOnly: true, width:70,  },
                    { name: "价格",PreName:"fprice", type: "number", readOnly: true, width:70,  },
                    {type: "control",width:70,}
                ];
                // let funName = parent.window.JGConfigFuns;
                // parent.window.JGConfigFuns = funName || {};
                //将方法存入window对象中
                JGConfig.funs = function (){
                    $(".jsgrid-insert-button").off("click");
                    // 删
                    $(".jsgrid-delete-button").off("click");
                    $(".jsgrid-delete-button").click(function(){
                        var Id = $(this).parents("tr").find("td").eq(0).text();
                        console.log(Id)
                        let dele = {}
                        dele.data= {fitemid:Id};
                        dele.url = urlDelete;
                        let isDelete = confirm("确定删除？");
                        if(isDelete){
                            JGM.deleteInfo(dele);
                            window.location.reload();
                        }
                    });
                    // 改
                    $(".jsgrid-edit-button").click(function(){
                        // //获取id
                        var a =  $(this).parents("tr").find("td").eq(0).text();
                        // window.location.href = ctx +"/managerSave.jsp?managerId="+a;
                        // managerSave.html
                    });
                    $(".jsgrid-insert-mode-button").off("click");
                    $(".jsgrid-insert-mode-button").on("click",function(){
                        // window.location.href = ctx +"/managerSave.jsp";
                    });
                    if ( $("#jsGrid").html() != null ){
                        //调分页的高度
                        var zhi1 = $("#jsGrid").offset().top;
                        var zhi2 = $("#jsGrid").height();
                        var zhi3 = zhi1 + zhi2 - 60;
                        // console.log(zhi3);
                        $("#changePage").css("top",zhi3);
                    }

                                            /**添加新页签事件 */
                        let data = {
                            add :".jsgrid-insert-mode-button",
                            tabName :"T_item_addNew",
                            url :"./T_item_addNew.html",
                            tabName_CN :"添加",
                        }
                        TBF.bindAddNewTab(data);


                        
                }
                let funName = parent.window.JGConfig;
                parent.window.JGConfig = funName || {};
                parent.window.JGConfig[LFIDAndTabName] = JGConfig;
                // 直接按配置请求
                JGM.getInfo(JGConfig);
                /**给查询绑定事件 */
                TBF.getInfoInCase(searchJson);
            })();
    break;
/******************************************************************************** */   
case "T_projectteam":
            (function(){
                let LFID = "T_projectteam";
                let tabName = "T_projectteam";
                let LFIDAndTabName = LFID + tabName;
                let urlGet =   `${originAdd}/stockWeb/projectteamList${originEnd}`;
                let urlDelete = `${originAdd}/stockWeb/projectteamDelete${originEnd}`;
                /**search事件 */
                let searchJson = {
                    add:".bodyFrame1-main .search",
                    button:".showAddNewCon2",
                    LFID,
                    tabName,
                };
                /**添加新页签事件 */
                let data = {
                    add :".showAddNewCon",
                    tabName :"T_projectteam_addNew",
                    url :"./T_projectteam_addNew.html",
                    tabName_CN :"添加新部门",
                }
                TBF.bindAddNewTab(data);
        
                // let data1 = {
                //     add :".showAddNewCon2",
                //     tabName :"addNewContract2",
                //     url :"./addNewContract.html",
                //     tabName_CN :"添加新合同2",
                // }
                // TBF.bindAddNewTab(data1);
              
                let JGConfig = {};
                JGConfig.data = {page:1};
                JGConfig.LFID = LFID;
                JGConfig.tabName = tabName;
                JGConfig.url = urlGet ;
                /** 表格头，必须设置PreName，值对应为后台传过来的数据属性名 此对象可设置的属性详情见 https://github.com/tabalinas/jsgrid */
                JGConfig.fields = [
                    { name: "编码",PreName:"fnumber", type: "number", readOnly: true, width:70,},
                    { name: "部门",PreName:"fdepartment", type: "text", readOnly: true, width:70,  },
                    { name: "名称",PreName:"fname", type: "text", readOnly: true, width:70,  },
                    {type: "control",width:70,}
                ];
        
                // let funName = parent.window.JGConfigFuns;
                // parent.window.JGConfigFuns = funName || {};
                //将方法存入window对象中
                JGConfig.funs = function (){
                    $(".jsgrid-insert-button").off("click");
                    // 删
                    $(".jsgrid-delete-button").off("click");
                    $(".jsgrid-delete-button").click(function(){
                        var Id = $(this).parents("tr").find("td").eq(0).text();
                        console.log(Id)
                        let dele = {}
                        dele.data= {fnumber:Id};
                        dele.url = urlDelete;
                        let isDelete = confirm("确定删除？");
                        if(isDelete){
                            JGM.deleteInfo(dele);
                            window.location.reload();
                        }
                    });
                    // 改
                    $(".jsgrid-edit-button").click(function(){
                        // //获取id
                        var a =  $(this).parents("tr").find("td").eq(0).text();
                        // window.location.href = ctx +"/managerSave.jsp?managerId="+a;
                        // managerSave.html
                    });
                    $(".jsgrid-insert-mode-button").off("click");
                    $(".jsgrid-insert-mode-button").on("click",function(){
                        // window.location.href = ctx +"/managerSave.jsp";
                    });
                    if ( $("#jsGrid").html() != null ){
                        //调分页的高度
                        var zhi1 = $("#jsGrid").offset().top;
                        var zhi2 = $("#jsGrid").height();
                        var zhi3 = zhi1 + zhi2 - 60;
                        // console.log(zhi3);
                        $("#changePage").css("top",zhi3);
                    }

                        /**添加新页签事件 */
                        let data = {
                            add :".jsgrid-insert-mode-button",
                            tabName :"T_projectteam_addNew",
                            url :"./T_projectteam_addNew.html",
                            tabName_CN :"添加新部门",
                        }
                        TBF.bindAddNewTab(data);
                }
        
                /**将当前表配置信息存入sessionStorage */
                let funName = parent.window.JGConfig;
                parent.window.JGConfig = funName || {};
                parent.window.JGConfig[LFIDAndTabName] = JGConfig;
        
                // 直接按配置请求
                JGM.getInfo(JGConfig);
                /**给查询绑定事件 */
                // TBF.getInfoInCase(searchJson);
            })();
break;
/******************************************************************************** */   
case "T_projectteam_addNew":
    (function(){
        $(".closeTabs").click(function(){
            /**刷新父下另一个框架iframe */
                    /**存 */
            let JGConfig = {};
            JGConfig.url = `${originAdd}/stockWeb/projectteamAdd${originEnd}`;
            // 去判断是否留空，留空则提醒，否则提交
                // 获得数据
                let LFID = "T_projectteam";
                let data3 = {add:".bodyFrame1-main"}
                let json = TBF.getCase(data3);
                let dd = PKG.judge.pickNull(json);
                data3.body = dd;
                if(TBF.searchTips(data3)){
                    // JGM.addInfo(JGConfig);
                    JGConfig.data= json;
                    console.log(json)
                    JGM.addInfo(JGConfig);
                    $(`#tabs .iframes>div[LFID="${LFID}"]>iframe[tabName="${LFID}"]`,parent.document)[0].contentWindow.location.reload();
                    TBF.closeTab();
                }else{
                    alert("有未填字段！");
                };
            // JGM.addInfo(JGConfig);
            /**关闭当前页签 */
            // TBF.closeTab();
        });
        /**请求部门 */
        let json31 = {
            url:`${originAdd}/stockWeb/departmentList${originEnd}`,
            fun:function(value){
                let str = "";
                $.each(value,function(i,n){
                    str +=`<option>${n.fname}</option>`;
                });
                $("select[field='fdepartment']").html(str);
            }
        }
        JGM.getInfo_return(json31);
    })();
break;
/******************************************************************************** */  
case "T_supplyer_addNew":
    (function(){
        $(".closeTabs").click(function(){
            /**刷新父下另一个框架iframe */
                    /**存 */
            let JGConfig = {};
            JGConfig.url = `${originAdd}/stockWeb/supplyerAdd${originEnd}`;
            // 去判断是否留空，留空则提醒，否则提交
                // 获得数据
                let LFID = "T_supplyer";
                let data3 = {add:".bodyFrame1-main"}
                let json = TBF.getCase(data3);
                let dd = PKG.judge.pickNull(json);
                data3.body = dd;
                if(TBF.searchTips(data3)){
                    // JGM.addInfo(JGConfig);
                    JGConfig.data= json;
                    console.log(json)
                    JGM.addInfo(JGConfig);
                    $(`#tabs .iframes>div[LFID="${LFID}"]>iframe[tabName="${LFID}"]`,parent.document)[0].contentWindow.location.reload();
                    TBF.closeTab();
                }else{
                    alert("有未填字段！");
                };
            // JGM.addInfo(JGConfig);
            /**关闭当前页签 */
            // TBF.closeTab();
        });
        
    })();
break;
/******************************************************************************** */  
case "T_item_addNew":
(function(){
    $(".closeTabs").click(function(){
        /**刷新父下另一个框架iframe */
                /**存 */
        let JGConfig = {};
        JGConfig.url = `${originAdd}/stockWeb/itemAdd${originEnd}`;
        // 去判断是否留空，留空则提醒，否则提交
            // 获得数据
            let LFID = "T_item";
            let data3 = {add:".bodyFrame1-main"}
            let json = TBF.getCase(data3);
            let dd = PKG.judge.pickNull(json);
            data3.body = dd;
            if(TBF.searchTips(data3)){
                // JGM.addInfo(JGConfig);
                JGConfig.data= json;
                JGM.addInfo(JGConfig);
                $(`#tabs .iframes>div[LFID="${LFID}"]>iframe[tabName="${LFID}"]`,parent.document)[0].contentWindow.location.reload();
                TBF.closeTab();
            }else{
                alert("有未填字段！");
            };
        // JGM.addInfo(JGConfig);
        /**关闭当前页签 */
        // TBF.closeTab();
    });
    
})();
break;
/******************************************************************************** */  
case "spact":
        (function(){
            let LFID = "spact";
            let tabName = "spact";
            let LFIDAndTabName = LFID + tabName;
            var urlGet = `${originAdd}/stockWeb/spactList${originEnd}`;
            var urlDelete = `${originAdd}/stockWeb/spactDelete${originEnd}`;
            /**search事件 */
            let searchJson = {
                add:".bodyFrame1-main .search",
                button:".showAddNewCon2",
                LFID,
                tabName,
            };
            let data = {
                add :".showAddNewCon",
                tabName :"spact_addNew",
                url :"./spact_addNew.html",
                tabName_CN :"添加",
            }
            /**添加新页签事件 */
            TBF.bindAddNewTab(data);
            // let data1 = {
            //     add :".showAddNewCon2",
            //     tabName :"addNewContract2",
            //     url :"./addNewContract.html",
            //     tabName_CN :"添加新合同2",
            // }
            // TBF.bindAddNewTab(data1);
            let JGConfig = {};
            JGConfig.data = {page:1};
            JGConfig.LFID = LFID;
            JGConfig.tabName = tabName;
            JGConfig.url = urlGet ;
            /** 表格头，必须设置PreName，值对应为后台传过来的数据属性名 此对象可设置的属性详情见 https://github.com/tabalinas/jsgrid */
            JGConfig.fields = [
                { name: "id",PreName:"fid", type: "number", readOnly: true, width:10,},
                { name: "合同编号",PreName:"fno", type: "number", readOnly: true, width:70,  },
                { name: "项目名称",PreName:"fpeojectname", type: "text", width:100,  },
                { name: "项目地址",PreName:"faddress", type: "text", width:100,  },
                { name: "甲方名称",PreName:"funitname", type: "text", width:100,  },
                { name: "合同额",PreName:"fmoney", type: "text", width:60,  },
                { name: "税率",PreName:"ftax", type: "text", width:30,  },
                { name: "项目负责人",PreName:"fmanager", type: "text", width:50,  },
                { name: "状态",PreName:"fstate", type: "text", width:30,  },
                {type: "control",width:70,}
            ];

            // let funName = parent.window.JGConfigFuns;
            // parent.window.JGConfigFuns = funName || {};
            //将方法存入window对象中
            JGConfig.funs = function (){
                $(".jsgrid-insert-button").off("click");
                // 删
                $(".jsgrid-delete-button").off("click");
                $(".jsgrid-delete-button").click(function(){
                    var Id = $(this).parents("tr").find("td").eq(0).text();
                    console.log(Id);
                    let dele = {}
                    dele.data= {fid:Id};
                    dele.url = urlDelete;
                    let isDelete = confirm("确定删除？");
                    if(isDelete){
                        JGM.deleteInfo(dele);
                        window.location.reload();
                    }
                });
                // 改
                $(".jsgrid-edit-button").click(function(){
                    // //获取id
                    var a =  $(this).parents("tr").find("td").eq(0).text();
                    // window.location.href = ctx +"/managerSave.jsp?managerId="+a;
                    // managerSave.html
                });
                $(".jsgrid-insert-mode-button").off("click");
                $(".jsgrid-insert-mode-button").on("click",function(){
                    // window.location.href = ctx +"/managerSave.jsp";
                });
                if ( $("#jsGrid").html() != null ){
                    //调分页的高度
                    var zhi1 = $("#jsGrid").offset().top;
                    var zhi2 = $("#jsGrid").height();
                    var zhi3 = zhi1 + zhi2 - 60;
                    // console.log(zhi3);
                    $(`#changePage`).css(`top`,zhi3);
                }
                let data = {
                    add :`.jsgrid-insert-mode-button`,
                    tabName :`${tabName}_addNew`,
                    url :`./${tabName}_addNew.html`,
                    tabName_CN :`添加`,
                }
                /**添加新页签事件 */
                TBF.bindAddNewTab(data);
                /* 获得点击的所在的关键词 */
                // let data4 = {
                //     add :`.jsgrid-edit-button`,
                //     tabName :`${tabName}_addNew`,
                //     url :`./${tabName}_addNew.html`,
                //     tabName_CN :`添加`,
                // }
                let data1 = {
                    add :`.jsgrid-edit-button`,
                    tabName :`${tabName}_changeNew`,
                    LFID,
                    getUrl :`${originAdd}/stockWeb/${tabName}${originEnd}`,
                    tabName_CN :`修改`,
                    url :`./${tabName}_changeNew.html`,
                    field:`fid`,
                }
                /**添加新页签事件 */
                let changeInfoList = parent.window.changeInfo;
                parent.window.changeInfo = changeInfoList || {};
                parent.window.changeInfo[LFIDAndTabName] = data1;



                // 将方法存入window对象中
                TBF.bindAddNewTabChange(data1);
            }
            /**将当前表配置信息存入sessionStorage */
            let funName = parent.window.JGConfig;
            parent.window.JGConfig = funName || {};
            parent.window.JGConfig[LFIDAndTabName] = JGConfig;

            
            // 直接按配置请求
            JGM.getInfo(JGConfig);
            /**给查询绑定事件 */
            TBF.getInfoInCase(searchJson);



            /**分页 */
            let FYJson = {
                LFID,
                tabName,
                page:"0",
                url:urlGet,
            }
            CP.changePageJSPost(FYJson);

            /**这里是 测试——三秒后请求第二页 */
            // setTimeout(function(){
            //     console.log("开始请求第二页");
            //     let FYJson2 = {
            //         LFID,
            //         tabName,
            //         page:"2",
            //         url:urlGet,
            //     }
            //     CP.changePageJSPost(FYJson2);
            // },3000);
            

    })();
break;
/******************************************************************************** */  

case `spact_changeNew`:
    (function(){
        let LFID = "spact";
        let tabName = "spact_changeNew";
        let LFIDAndTabName_changeInfo = LFID + LFID;
        let data = parent.window.changeInfo[LFIDAndTabName_changeInfo];
        let field = data.field;
        let fieldVal = data.fieldVal;
        let fieldName = LFID + "Data";
        console.log("this is spact_changeNew'data");
        console.log(data);

        let fData = {}
        fData[field] = fieldVal;

        let json = {
            field:fieldName,
            url:data.getUrl,
            data:fData,
        }
        JGM.getInfo_insertInput(json);

        $(".closeTabs").click(function(){
            /**刷新父下另一个框架iframe */
                    /**存 */
            let JGConfig = {};
            JGConfig.url = `${originAdd}/stockWeb/spactUpdate${originEnd}`;
            // 去判断是否留空，留空则提醒，否则提交
                // 获得数据
                let LFID = "spact";
                let data3 = {add:".bodyFrame1-main .addNew"}
                

                let json = TBF.getCase(data3);
                console.log(json);
                let dd = PKG.judge.pickNull(json);
                data3.body = dd;
                if(TBF.searchTips(data3)){
                    // JGM.addInfo(JGConfig);
                    json[field] = fieldVal;
                    console.log("json is ")
                    console.log(json)
                    JGConfig.data= json;
                    console.log("this is JGConfig")
                    console.log(JGConfig.data);
                    JGM.updateInfo(JGConfig);
                    $(`#tabs .iframes>div[LFID="${LFID}"]>iframe[tabName="${LFID}"]`,parent.document)[0].contentWindow.location.reload();
                    TBF.closeTab();
                }else{
                    alert("有未填字段！");
                };
            // JGM.addInfo(JGConfig);
            /**关闭当前页签 */
            // TBF.closeTab();
        });

    })();
break;
/******************************************************************************** */  
case "spact_addNew":
(function(){
    $(".closeTabs").click(function(){
        /**刷新父下另一个框架iframe */
                /**存 */
        let JGConfig = {};
        JGConfig.url = `${originAdd}/stockWeb/spactAdd${originEnd}`;
        // 去判断是否留空，留空则提醒，否则提交
            // 获得数据
            let LFID = "spact";
            let data3 = {add:".bodyFrame1-main"}
            let json = TBF.getCase(data3);
            let dd = PKG.judge.pickNull(json);
            data3.body = dd;
            if(TBF.searchTips(data3)){
                // JGM.addInfo(JGConfig);
                JGConfig.data= json;
                JGM.addInfo(JGConfig);
                $(`#tabs .iframes>div[LFID="${LFID}"]>iframe[tabName="${LFID}"]`,parent.document)[0].contentWindow.location.reload();
                TBF.closeTab();
            }else{
                alert("有未填字段！");
            };
        // JGM.addInfo(JGConfig);
        /**关闭当前页签 */
        // TBF.closeTab();
    });
})();
break;
/******************************************************************************** */  
case "ssubpact":
    (function(){
        let LFID = "ssubpact";
        let tabName = "ssubpact";
        let LFIDAndTabName = LFID + tabName;
        var urlGet =   `${originAdd}/stockWeb/ssubpactList${originEnd}`;
         var urlDelete = `${originAdd}/stockWeb/ssubpactDelete${originEnd}`;
        /**search事件 */
        let searchJson = {
            add:".bodyFrame1-main .search",
            button:".toSearch",
            LFID,
            tabName,
        };
        /**添加新页 */
        let data = {
            add :".showAddNewCon",
            tabName :"ssubpact_addNew",
            url :"./ssubpact_addNew.html",
            tabName_CN :"添加",
        }
        /**添加新页签事件 */
        TBF.bindAddNewTab(data);
        // let data1 = {
        //     add :".showAddNewCon2",
        //     tabName :"addNewContract2",
        //     url :"./addNewContract.html",
        //     tabName_CN :"添加新合同2",
        // }
        // TBF.bindAddNewTab(data1);
        let JGConfig = {};
        JGConfig.data = {page:1};
        JGConfig.LFID = LFID;
        JGConfig.tabName = tabName;
        JGConfig.url = urlGet ;
        /** 表格头，必须设置PreName，值对应为后台传过来的数据属性名 此对象可设置的属性详情见 https://github.com/tabalinas/jsgrid */
        JGConfig.fields = [
            { name: "id",PreName:"fid", type: "number", readOnly: true, width:10,},
            { name: "日期",PreName:"fdate", type: "number", readOnly: true, width:70,  },
            { name: "分包合同号",PreName:"fsubpactno", type: "text", width:100,  },
            { name: "总包合同号",PreName:"fpactid", type: "text", width:100,  },
            { name: "项目名称",PreName:"fpeojectname", type: "text", width:100,  },
            { name: "制单人",PreName:"fcreater", type: "text", width:60,  },
            { name: "制单时间",PreName:"fcreatetime", type: "text", width:30,  },
            { name: "项客商ID",PreName:"fitemid", type: "text", width:50,  },
            { name: "客商名称",PreName:"fitemname", type: "text", width:30,  },
            { name: "合同额",PreName:"famount", type: "text", width:30,  },
            { name: "税率",PreName:"ftax", type: "text", width:30,  },
            { name: "客商负责人",PreName:"fmanager", type: "text", width:30,  },
            { name: "负责人电话",PreName:"fphone", type: "text", width:30,  },
            { name: "状态",PreName:"fstate", type: "text", width:30,  },
            { name: "附件",PreName:"ffile", type: "text", width:30,  },
            {type: "control",width:70,}
        ];

        // let funName = parent.window.JGConfigFuns;
        // parent.window.JGConfigFuns = funName || {};
        //将方法存入window对象中
        JGConfig.funs = function (){
            $(".jsgrid-insert-button").off("click");
            // 删
            $(".jsgrid-delete-button").off("click");
            $(".jsgrid-delete-button").click(function(){
                var Id = $(this).parents("tr").find("td").eq(0).text();
                console.log(Id)
                let dele = {}
                dele.data= {fid:Id};
                dele.url = urlDelete;
                let isDelete = confirm("确定删除？");
                if(isDelete){
                    JGM.deleteInfo(dele);
                    window.location.reload();
                }
            });
            // 改
            $(".jsgrid-edit-button").click(function(){
                // //获取id
                var a =  $(this).parents("tr").find("td").eq(0).text();
                // window.location.href = ctx +"/managerSave.jsp?managerId="+a;
                // managerSave.html
            });
            $(".jsgrid-insert-mode-button").off("click");
            $(".jsgrid-insert-mode-button").on("click",function(){
                // window.location.href = ctx +"/managerSave.jsp";
            });
            if ( $("#jsGrid").html() != null ){
                //调分页的高度
                var zhi1 = $("#jsGrid").offset().top;
                var zhi2 = $("#jsGrid").height();
                var zhi3 = zhi1 + zhi2 - 60;
                // console.log(zhi3);
                $("#changePage").css("top",zhi3);
            }
            let data = {
                add :".jsgrid-insert-mode-button",
                tabName :"ssubpact_addNew",
                url :"./ssubpact_addNew.html",
                tabName_CN :"添加",
            }
            /**添加新页签事件 */
            TBF.bindAddNewTab(data);
        }

        /**将当前表配置信息存入sessionStorage */
        let funName = parent.window.JGConfig;
        parent.window.JGConfig = funName || {};
        parent.window.JGConfig[LFIDAndTabName] = JGConfig;

        // 直接按配置请求
        JGM.getInfo(JGConfig);
        // let seesionInfoName = LFIDAndTabName + "JGConfig";
        // sessionStorage.removeItem(seesionInfoName);
        // sessionStorage.setItem(seesionInfoName,JSON.stringify(JGConfig));  
        // setTimeout(function(){
        //     let data = {
        //         page:"1",
        //         count:"6",
        //         urlGet,
        //     }
        //     CP.show(data);
        // },5000);
        /**给查询绑定事件 */
        TBF.getInfoInCase(searchJson);
    })();
break;
/******************************************************************************** */  
case "ssubpact_addNew":
    (function(){
        $(".closeTabs").click(function(){
            /**刷新父下另一个框架iframe */
                    /**存 */
            let JGConfig = {};
            JGConfig.url = `${originAdd}/stockWeb/ssubpactAdd${originEnd}`;
            // 去判断是否留空，留空则提醒，否则提交
                // 获得数据
                let LFID = "ssubpact";
                let data3 = {add:".bodyFrame1-main"}
                let json = TBF.getCase(data3);
                let dd = PKG.judge.pickNull(json);
                data3.body = dd;
                if(TBF.searchTips(data3)){
                    // JGM.addInfo(JGConfig);
                    JGConfig.data= json;
                    console.log(json)
                    JGM.addInfo(JGConfig);
                    $(`#tabs .iframes>div[LFID="${LFID}"]>iframe[tabName="${LFID}"]`,parent.document)[0].contentWindow.location.reload();
                    TBF.closeTab();
                }else{
                    alert("有未填字段！");
                };
            // JGM.addInfo(JGConfig);
            /**关闭当前页签 */
            // TBF.closeTab();
        });
    })();
break;
/******************************************************************************** */  
case "sincome":
    (function(){
        let LFID = "sincome";
        let tabName = "sincome";
        let LFIDAndTabName = LFID + tabName;
        var urlGet =   `${originAdd}/stockWeb/sincomeList${originEnd}`;
         var urlDelete = `${originAdd}/stockWeb/sincomeDelete${originEnd}`;
        /**search事件 */
        let searchJson = {
            add:".bodyFrame1-main .search",
            button:".toSearch",
            LFID,
            tabName,
        };
        /**添加新页 */
        let data = {
            add :".showAddNewCon",
            tabName :"sincome_addNew",
            url :"./sincome_addNew.html",
            tabName_CN :"添加",
        }
        /**添加新页签事件 */
        TBF.bindAddNewTab(data);
        // let data1 = {
        //     add :".showAddNewCon2",
        //     tabName :"addNewContract2",
        //     url :"./addNewContract.html",
        //     tabName_CN :"添加新合同2",
        // }
        // TBF.bindAddNewTab(data1);
        let JGConfig = {};
        JGConfig.data = {page:1};
        JGConfig.LFID = LFID;
        JGConfig.tabName = tabName;
        JGConfig.url = urlGet ;
        /** 表格头，必须设置PreName，值对应为后台传过来的数据属性名 此对象可设置的属性详情见 https://github.com/tabalinas/jsgrid */
        JGConfig.fields = [
            { name: "计量单号",PreName:"fid", type: "number", readOnly: true, width:10,},
            { name: "日期",PreName:"fdate", type: "number", readOnly: true, width:70,  },
            { name: "总包合同号",PreName:"fpactid", type: "text", width:100,  },
            { name: "项目名称",PreName:"fpeojectname", type: "text", width:100,  },
            { name: "制单人",PreName:"fcreater", type: "text", width:60,  },
            { name: "制单时间",PreName:"fcreatetime", type: "text", width:30,  },
            { name: "金额",PreName:"famount", type: "text", width:30,  },
            { name: "备注",PreName:"fnote", type: "text", width:30,  },
            {type: "control",width:70,}
        ];

        // let funName = parent.window.JGConfigFuns;
        // parent.window.JGConfigFuns = funName || {};
        //将方法存入window对象中
        JGConfig.funs = function (){
            $(".jsgrid-insert-button").off("click");
            // 删
            $(".jsgrid-delete-button").off("click");
            $(".jsgrid-delete-button").click(function(){
                var Id = $(this).parents("tr").find("td").eq(0).text();
                console.log(Id)
                let dele = {}
                dele.data= {fid:Id};
                dele.url = urlDelete;
                let isDelete = confirm("确定删除？");
                if(isDelete){
                    JGM.deleteInfo(dele);
                    window.location.reload();
                }
            });
            // 改
            $(".jsgrid-edit-button").click(function(){
                // //获取id
                var a =  $(this).parents("tr").find("td").eq(0).text();
                // window.location.href = ctx +"/managerSave.jsp?managerId="+a;
                // managerSave.html
            });
            $(".jsgrid-insert-mode-button").off("click");
            $(".jsgrid-insert-mode-button").on("click",function(){
                // window.location.href = ctx +"/managerSave.jsp";
            });
            if ( $("#jsGrid").html() != null ){
                //调分页的高度
                var zhi1 = $("#jsGrid").offset().top;
                var zhi2 = $("#jsGrid").height();
                var zhi3 = zhi1 + zhi2 - 60;
                // console.log(zhi3);
                $("#changePage").css("top",zhi3);
            }
            let data = {
                add :".jsgrid-insert-mode-button",
                tabName :"sincome_addNew",
                url :"./sincome_addNew.html",
                tabName_CN :"添加",
            }
            /**添加新页签事件 */
            TBF.bindAddNewTab(data);
        }

        /**将当前表配置信息存入sessionStorage */
        let funName = parent.window.JGConfig;
        parent.window.JGConfig = funName || {};
        parent.window.JGConfig[LFIDAndTabName] = JGConfig;

        // 直接按配置请求
        JGM.getInfo(JGConfig);
        /**给查询绑定事件 */
        TBF.getInfoInCase(searchJson);
    })();
break;
/******************************************************************************** */  
case "":
    (function(){

    })();
break;
/******************************************************************************** */  

default:
break;
    }
    

});

