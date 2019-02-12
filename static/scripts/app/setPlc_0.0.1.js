define(["jquery"],function($){
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