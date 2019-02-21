/*! storejs v1.0.24 | MIT (c) 2018 kenny wang <wowohoo@qq.com> | https://github.com/jaywcjlove/store.js */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.store=e()}(this,function(){"use strict";var u=window.localStorage;function f(t){return t=JSON.stringify(t),/^\{[\s\S]*\}$/.test(t)}function s(e){if("string"==typeof e)try{return JSON.parse(e)}catch(t){return e}}function c(t){return"[object Function]"==={}.toString.call(t)}function a(){if(!(this instanceof a))return new a}u=function(e){var t="_Is_Incognit";try{e.setItem(t,"yes")}catch(t){if("QuotaExceededError"===t.name){var r=function(){};e.__proto__={setItem:r,getItem:r,removeItem:r,clear:r}}}finally{"yes"===e.getItem(t)&&e.removeItem(t)}return e}(u),a.prototype={set:function(t,e){if(t&&!f(t))u.setItem(t,void 0===(n=e)||"function"==typeof n?n+"":JSON.stringify(n));else if(f(t))for(var r in t)this.set(r,t[r]);var n;return this},get:function(t){if(!t){var r={};return this.forEach(function(t,e){return r[t]=e}),r}if("?"===t.charAt(0))return this.has(t.substr(1));var e=arguments;if(1<e.length){for(var n={},i=0,o=e.length;i<o;i++){var f=s(u.getItem(e[i]));f&&(n[e[i]]=f)}return n}return s(u.getItem(t))},clear:function(){return u.clear(),this},remove:function(t){var e=this.get(t);return u.removeItem(t),e},has:function(t){return{}.hasOwnProperty.call(this.get(),t)},keys:function(){var e=[];return this.forEach(function(t){e.push(t)}),e},forEach:function(t){for(var e=0,r=u.length;e<r;e++){var n=u.key(e);t(n,this.get(n))}return this},search:function(t){for(var e=this.keys(),r={},n=0,i=e.length;n<i;n++)-1<e[n].indexOf(t)&&(r[e[n]]=this.get(e[n]));return r}};var h=null;function g(t,e){var r=arguments,n=null;if(h||(h=a()),0===r.length)return h.get();if(1===r.length){if("string"==typeof t)return h.get(t);if(f(t))return h.set(t)}if(2===r.length&&"string"==typeof t){if(!e)return h.remove(t);if(e&&"string"==typeof e)return h.set(t,e);e&&c(e)&&(n=null,n=e(t,h.get(t)),g.set(t,n))}if(2===r.length&&"[object Array]"===Object.prototype.toString.call(t)&&c(e))for(var i=0,o=t.length;i<o;i++)n=e(t[i],h.get(t[i])),g.set(t[i],n);return g}for(var t in a.prototype)g[t]=a.prototype[t];return g});