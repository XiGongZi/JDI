define([
    'require',
], function(require) {
    'use strict';
    let set = {
        notFound:function(topHei,displayBlock,tipsInfo){
            let zhi = $(".noInfo").length;
            let zhi00;
            tipsInfo == undefined ? zhi00 = "暂无信息！": zhi00 = tipsInfo;
            // alert(zhi00)
            // console.log(zhi)
            if(zhi == 0){//如果有
                $("body").append(`
                <div class="MaxAn noInfo">
                    <div class="" style="height:80px;width:1px"></div>
                    <div class="patientIDCardBG">
                        <div class="patientIDCardIMG">
                            <div>
                                <img src="${ctx }static/image/none.png" alt="">
                            </div>
                            <div class="title">${zhi00}</div>
                        </div>
                    </div>
                </div>
            `);
                //设置背景等高与设备
                $(".noInfo").height($(window).height()+"px");
                setDivWidth(".noInfo img");
                // $(".noInfo img").css("margin","0 auto");
                //hide loadingInformation
                $(".noInfo").css({"display":"block"});
                // alert(1);
                let top = parseInt(topHei) +134; 
                $(".noInfo").css("top",top+"px");
                $(".noInfo").show();

            }else if( $(".noInfo").css("display") == "block" ){
                
                $(".noInfo .title").html(zhi00);

                let top = parseInt(topHei) +134; 
                $(".noInfo").css("top",top+"px");
                $(".noInfo").hide();

            }else if( $(".noInfo").css("display") == "none" ){
                $(".noInfo .title").html(zhi00);
                // let topNavHei = 134;
                let top = parseInt(topHei) +134; 
                $(".noInfo").css("top",top+"px");
                $(".noInfo").show();

            }
            if(displayBlock == true &&  $(".noInfo").css("display") == "none" ){
                let top = parseInt(topHei) +134; 
                $(".noInfo").css("top",top+"px");
                $(".noInfo").show();

            }else if(displayBlock == false && $(".noInfo").css("display") == "block" ){
                let top = parseInt(topHei) +134; 
                $(".noInfo").css("top",top+"px");
                $(".noInfo").hide();
            }else if( $(".noInfo").css("display") == "block"){
                let top = parseInt(topHei) +134; 
                $(".noInfo").css("top",top+"px");

            }
        }
    }
});