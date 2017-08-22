

function addcity(mycity) {
	localStorage.city = mycity;
	city = mycity;
	clearcss();
	loadInfo();
}

function position() {
	$('html, body').animate({scrollTop:0}, 'slow');
	var bodyheight = $(window).height(); //获得屏幕高度
	if(bodyheight/2 <230){
		$(".div90").hide();
		$(".listTxt").show();
	}else{
		$(".div90").show();
		$(".listTxt").hide();
	}
	console.log();
	$("#top").height(bodyheight / 2);
	$(".foot").height(bodyheight / 2 + 1);
	$(".foot2").height(bodyheight / 2);
	$(".middle").height(bodyheight / 2);
	$(".citylist").height(bodyheight / 2 + 1);
	var tmpheight = $("#tmp").height();
	var loadheight = $(".loading").height();
	$(".aqi").css({
		"top": bodyheight / 2 - 25 + "px"
	})
	$(".loading").css({
		"top": (bodyheight / 2 - loadheight) / 2 + "px"
	})
	$("#hourlist1").css({
		"top": bodyheight / 2 - 25 + "px"
	})
	$("#tmp").css({
		"top": (bodyheight / 2 - tmpheight) / 2 + "px"
	})
	$("#icon").css({
		"bottom": (bodyheight / 2 - 100) / 2 + "px"
	})
//	$(".citylist").css({
//		"top": bodyheight + "px"
//	})
	$(".foot2").css({
		"top": bodyheight + "px"
	})
	$(".list").css({
		"margin-top": (bodyheight / 2 - (7 * 34)) / 2 + "px"
	})
}
position();

function loadInfo() {
	var city = localStorage.city;
    //var city = "南京";
    if (localStorage.city) {
    	city = localStorage.city;
    }else{
	    city = "南京";
	    localStorage.city = "南京";
    }
	var url = "https://free-api.heweather.com/v5/weather?city=" + city + "&key=ae2ffc6eaa01421097314a07bc50d115";
	$.getJSON(url, function(data) {
		$(".loading").addClass("hide");
		var libing = data["HeWeather5"][0];
		if(libing["status"] == "unknown city"){
			alert("亲，你是文盲吧！中国有这个城市吗？")
			addcity("南京");
		}
		$("#icon").removeClass("hide");
		$(".bgimg").removeClass("hide");
		$("#tmp").addClass("pt-page-moveCircle2");
		$(".aqi").addClass("pt-page-moveCircle2");
		//星期的运算开始--------------------------
		var myDate = new Date();
		var weekday = new Array(7);
		weekday[0] = "Sun";
		weekday[1] = "Mon";
		weekday[2] = "Tue";
		weekday[3] = "Wed";
		weekday[4] = "Thu";
		weekday[5] = "Fri";
		weekday[6] = "Sat";
		weekday[7] = "Sun";
		weekday[8] = "Mon";
		weekday[9] = "Tue";
		weekday[10] = "Wed";
		weekday[11] = "Thu";
		weekday[12] = "Fri";
		weekday[13] = "Sat";
		var week = weekday[myDate.getDay()];
		//星期的运算结束--------------------------
		$("#city").html("<span class='toptxt'>" + libing["basic"]["city"] + "</span>");
		$("#txtD").html("<span class='toptxt'>" + libing["daily_forecast"][0]["cond"]["txt_d"] + " | " + libing["daily_forecast"][0]["cond"]["txt_n"] + "</span>");
		if (myDate.getHours() >= 18) {
			$("#icon img").attr("src", "icon/" + libing["daily_forecast"][0]["cond"]["code_n"] + ".png");
		} else {
			$("#icon img").attr("src", "icon/" + libing["daily_forecast"][0]["cond"]["code_d"] + ".png");
		}
		$("#tmpNow").html(libing["now"]["tmp"]);
		$("#km").html(" / " + libing["now"]["vis"] + "km ");
		$(".tmpL").html(libing["daily_forecast"][0]["tmp"]["min"] + "<sup class='c'>℃</sup>");
		$(".tmpH").html(libing["daily_forecast"][0]["tmp"]["max"] + "<sup class='c'>℃</sup>");

		if (libing["aqi"]) {
			$("#aqi").html("AQI~" + libing["aqi"]["city"]["aqi"]);
			$("#pm25").html(" / PM2.5~<span class='pmcolor'>" + libing["aqi"]["city"]["pm25"] + "</span>");
			$("#pm10").html(" / PM10~" + libing["aqi"]["city"]["pm10"]);
			var pm25 = libing["aqi"]["city"]["pm25"];
			if (pm25 <= 35) {
				$(".pmcolor").css({
					"color": "#99ff00"
				})
			} else if (pm25 > 35 && pm25 <= 70) {
				$(".pmcolor").css({
					"color": "#ff0"
				})
			} else if (pm25 > 70 && pm25 <= 120) {
				$(".pmcolor").css({
					"color": "#ff6600"
				})
			} else {
				$(".pmcolor").css({
					"color": "#ff0000"
				})
			}
		} else {
			$("#aqi").html("AQI~No");
			$("#pm25").html(" / PM2.5~<span class='pmcolor'>No</span>");
			$("#pm10").html(" / PM10~No");
		}

		for (var i = 0; i < libing["hourly_forecast"].length; i++) {
			$("#hourlist1").append("&nbsp;<span class='Hlist'><span class='Hlist2'>" + libing["hourly_forecast"][i]["date"].substring(11, 16) + "</span>-" + libing["hourly_forecast"][i]["pop"] + "%-" + libing["hourly_forecast"][i]["tmp"] + "&nbsp;</span> ");
		}
		$("#rain").html(" / R " + libing["daily_forecast"][0]["pop"] + "%");
		$("#Humidity").html(" / H " + libing["now"]["hum"] + "%");
		$("#wind").html(" / W " + libing["now"]["wind"]["sc"]);
		if (libing["now"]["wind"]["sc"] == "微风") {
			$("#wind").html(" / Wind 0-1");
		}
		var updateT = libing["basic"]["update"]["loc"];
		$("#updateTime").html("Update " + updateT.substring(11, 16));

		var lb1 = "Today";
		for (var i = 0; i < 7; i++) {
			if (i > 0) {
				var lb1a = libing["daily_forecast"][i]["date"];
				lb1 = lb1a.substring(5, 10);
			}
			var lb2 = libing["daily_forecast"][i]["cond"]["code_d"];
			var lb3 = libing["daily_forecast"][i]["tmp"]["max"] + "<sup class='cc'>℃</sup>";
			var lb4 = libing["daily_forecast"][i]["tmp"]["min"] + "<sup class='cc'>℃</sup>";
			var lb5 = libing["daily_forecast"][i]["vis"];
			var lb6 = libing["daily_forecast"][i]["hum"] + "%";
			var lb7 = libing["daily_forecast"][i]["wind"]["sc"];
			var lb8 = libing["daily_forecast"][i]["pop"] + "%";
			var lb9 = weekday[myDate.getDay() + i];
			if (lb7 == "微风") {
				lb7 = "0-1";
			}
			$(".div90").append(
				"<div class='div20 left'>" + lb1 + "</div><div class='div10 left Tleft2'>" + lb9 + "</div><div class='div10 left'><img src='http://files.heweather.com/cond_icon/" + lb2 + ".png' ></div> <div class='div10 left Tright'>" + lb3 + "</div><div class='div10 left Tleft'>" + lb4 + "</div><div class='div10 left'>" + lb8 + "</div><div class='div15 left'>" + lb6 + "</div><div class='div15 left'>W " + lb7 + "</div>"
			);
		}
	});
	position();
}

function clearcss() {
	$(".div90").empty();
	$("#hourlist1").empty();
	$("#icon").addClass("hide");
	$(".bgimg").addClass("hide");
	$("#tmp").removeClass("pt-page-moveCircle2");
	$(".aqi").removeClass("pt-page-moveCircle2");
	$(".aqi").removeClass("hide");
	$("#hourlist1").addClass("hide");
	$(".loading").removeClass("hide");
}
$(window).resize(function() { // 当调整窗口的时候动态修正位置
	position();
})
$("#icon img").click(function() {
	//location.reload();
	clearcss();
	loadInfo();
})
$(".aqi").click(function() {
//	$(".aqi").addClass("hide");
//	$("#hourlist1").removeClass("hide");
    $(".aqi").slideToggle("fast");
    $("#hourlist1").fadeIn();
})
$("#hourlist1").click(function() {
    $(".aqi").slideToggle("fast");
    $("#hourlist1").fadeOut();
})
$("#city").click(function(){
//	$(".citylist").top("hide");
    $(".citylist").slideToggle();
})
$("#cancel").click(function(){
    $(".citylist").slideToggle();
})
$(".citylistName").click(function(){
	addcity($(this).text());
    $(".citylist").slideToggle();
})
$("#accept").click(function(){
	addcity($(".inputTxt").val());
    $(".citylist").slideToggle();
})

//function listHide() {
//	//if ($(".foot").height() < 240) {
//		for (var i = 0; i < 14; i++) {
//			$(".left").eq(i).hide();
//		}
//	//}
//}
