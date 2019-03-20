//1.判断输入年份是闰年还是普通年
function leapyear(year){
    if(((year%400==0) || (year%100!=0) ) && (year%4==0)){
        return true;
    }else{
        return false;
    }
}
//2.任意输入一个年月日，计算并输出这天是该年的第几天？
	// 1.判断是平年还是闰年(判断输入数据是否合法)
		// 1.平年：累加前几个月天数和当前月的当前日 输出
		// 2.闰年: 判断同2月29号的关系
				//1. 之前
					// 累加前几个月天数和当前月的当前日 输出
				//2. 当前或之后
					//累加前几个月天数和当前月的当前日并加1 输出
	// 2.输出
function isInteger(obj){//判断是否是整数
	return  Math.round(obj) === obj   //是整数，则返回true，否则返回false
}

function checkMounth(a){//检验数据是否合法  月
	if( 0 < a < 13 ){
		return true;
	}else{
		return false;
	}
}
function checkDay(a,b,c){//检验数据是否合法  日
	// 1.检测是平年闰年
	// 2.检测当前月是否为整数型且大于0小于13
	// 3.检测当前日是否在当前月的范围内
	let arrMounth = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
	if(leapyear(a)){
		arrMounth[1] = 29;
	}
	if ( 0 < c && c <= arrMounth[b-1] ){
		return true;
	}else{
		return false;
	}
}
function calcPresentDay(a,b){//累加前几个月天数和当前月的当前日
	var arrMounth = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
	if (a <= 1){
		return b ;
	}else {
		var zhi = 0;
		for(var i = 0 ; i <= a - 2 ; i ++ ){
			zhi += arrMounth[i];
		}
		return (zhi + b);
	}
}
function judgeDay(a,b,c){//任意输入一个年月日，计算并输出这天是该年的第几天？
		if(checkMounth(b) && checkDay(a,b,c)){//检验 月 日 的合法性
			var zhi = 0;
			if(leapyear(a)){//平年
				zhi = calcPresentDay(b,c);
			}else{//闰年
				if( b <= 2 ){//3月之前
					zhi = calcPresentDay(b,c);
				}else{
					zhi = calcPresentDay(b,c) + 1;
				}
			}
			return zhi ;
		} else{
			return false;
		}
}

//程序的使用方法：   1.打开网页 2.f12 在控制台粘贴代码  3. 输入 judgeDay(a,b,c); a b 依次为年月日 