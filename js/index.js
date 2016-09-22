$(function(){
/*一.banner层级轮播开始-------------------------------------------------------------------------------*/
	(function($){
		// 响应式
		var $big=$(".window .box li a img:nth-child(1)");
		var $s1=$(".window .box li a img:nth-child(2)");
		var $s2=$(".window .box li a img:nth-child(3)");

		$(window).resize(function(){
			var $width=$(window).width();
			if($width>=1260){
				$(".nav").css({width:1000});
				$big.css({marginLeft:0});
				$s1.css({display:"block"});
				$s2.css({display:"block"});
				$(".data").css({display:"block"});

			}else{
				$(".nav").css({width:752});
				$big.css({marginLeft:150});
				$s1.css({display:"none"});
				$s2.css({display:"none"});
				$(".data").css({display:"none"});
			}
		});

		// 轮播图
		// 获取元素
		var $imgs=$(".box li");
		var $cirs=$(".cirs li");

		// 状态初始化
		$imgs.eq(0).css("zIndex","10");
		$cirs.eq(0).css("background","rgba(0,0,0,.3)");

		// 定义当前图片是哪一张
		var n=0;

		// 时间间隔函数
		var t=setInterval(move,2000);

		// move函数
		function move(){
			// 更新状态
			n++;

			// 处理下标越界问题
			if(n==$imgs.length){
				n=0;
			}

			// 遍历imgs，让所有图片消失,让当前图片显示
			// $imgs.animate({opacity:0});
			// $imgs.eq(n).finish();
			// $imgs.eq(n).animate({opacity:1});

			$imgs.fadeOut();
			$imgs.eq(n).finish();
			$imgs.eq(n).fadeIn();

			$cirs.css("background","rgba(0,0,0,.7)").eq(n).css("background","rgba(0,0,0,.3)");
		}

		$(".window").hover(function(){
			clearInterval(t);
		},function(){
			t=setInterval(move,2000);
		});

		// 定义一个开关
		var flag=true;
		$cirs.mouseover(function(){
			var index=$cirs.index(this);
			if(flag){
				flag=false;
				// $imgs.animate({opacity:0});
				// $imgs.eq(index).finish();
				// $imgs.eq(index).animate({opacity:1},function(){
				// 	flag=true;
				// });

				$imgs.fadeOut();
				$imgs.eq(index).finish();
				$imgs.eq(index).fadeIn(function(){
					flag=true;
				});

				$cirs.css("background","rgba(0,0,0,.7)").eq(index).css("background","rgba(0,0,0,.3)");
				n=index;
			}
		})


		// 1.获取元素
		var $type=$(".category li");
		var $kind=$(".kind");
		var $info=$(".info");

// 2.定义一个空数组，用于存放左侧选项卡中字体不同颜色的id名
		var colorArr=["kind1","kind2","kind3","kind4","kind5","kind6","kind7","kind8","kind9","kind10","kind11","kind12","kind13","kind14","kind15","kind16"];
		$type.hover(function(){
			var index=$type.index(this);
			$kind.eq(index).attr({id:colorArr[index]}).css({
				fontWeight:"bold"
			})
			$info.eq(index).css({
				display:"block"
			})
		},function(){
			var index=$type.index(this);
			$kind.eq(index).attr({id:""}).css({
				fontWeight:"normal"
			});
			$info.eq(index).css({
				display:"none"
			})
		})
	})(jQuery);
/*banner层级轮播结束----------------------------------------------------------------------------------------------------------*/
	/*二.楼层跳转-------------------------------------------------------------------------------------------------------------------*/
// (一)获取元素
// 1.顶部搜索框
	var search=$(".top_search")[0];

// 2.左侧楼层导航
	var dump=$(".leftsidebar")[0];

// 3.浏览器窗口的高度
	var ch=document.documentElement.clientHeight;

// 4.获取每个楼层
	var floor=$(".lou");

// 5.定义一个空数组，用于存放每个楼层距离最顶端的位置
	var floorArr=[];

// 6.获取每个楼层距离最顶端的位置--->遍历每个楼层
	for(var i=0;i<floor.length;i++){
		floorArr.push(floor[i].offsetTop);
	}

// 7.获取左导航中的每个楼层跳转按钮
	var anniu=$(".anniu");

// 8.回去置顶按钮
	var top=$(".t9")[0];


// (二)状态初始化
// 左侧导航
	dump.style.opacity=0;

// (三)定义一个开关
// 1.控制顶部搜索框和左侧导航的显示和隐藏
	var sflag=true;
// 2.控制楼层跳转时滚动事件不执行
	var flag=true;


// 定义一个空数组，用于存放左导航中按钮的不同背景颜色的id名
	var bgcolorArr=["ann1","ann2","ann3","ann4","ann5","ann6","ann7","ann8"];


// (四)添加事件
// 1.滚轮滚动事件
	window.onscroll=function(){
		//(1)判断浏览器
		var obj=document.body.scrollTop?document.body:document.documentElement;
		//(2)获取滚动条滚动的距离
		var scrolltop=obj.scrollTop;

		//(3)设置滚动到什么位置时出现搜索框和左导航
		if(scrolltop>=1100){
			if(sflag){
				sflag=false;
				animate(search,{top:0});
				animate(dump,{opacity:1});
			}
		}else{
			if(!sflag){
				sflag=true;
				animate(search,{top:-50});
				animate(dump,{opacity:0});
			}
		}


		// // 每个楼层都要判断
		// for(var i=0;i<floor.length;i++){
		// 	if(lh+scrolltop>=floorArr[i]+100){
		// 		// 获取对应楼层中的所有图片
		// 		var imgs=$("img",floor[i]);

		// 		// 遍历所有图片加载路径
		// 		for(var j=0;j<imgs.length;j++){
		// 			imgs[j].src=imgs[j].getAttribute("imgpath");
		// 		}
		// 	}
		// }

		// (4)随着滚轮滚动，相应楼层的按钮点亮
		if(!flag) return;

		for(var i=0;i<floor.length;i++){
			if(ch+scrolltop>=floorArr[i]+300){
				for(var j=0;j<anniu.length;j++){
					anniu[j].id="";
				}
				anniu[i].id=bgcolorArr[i];
			}
		}
	}

// 2.点击事件
	for(var i=0;i<anniu.length;i++){
		anniu[i].index=i;
		anniu[i].onclick=function(){
			for(var j=0;j<anniu.length;j++){
				anniu[j].id="";
			}
			anniu[this.index].id=bgcolorArr[this.index];

			animate(document.body,{scrollTop:floorArr[this.index]-50});
			animate(document.documentElement,{scrollTop:floorArr[this.index]-50});
		}
	}

// 3.回到顶部
	top.onclick=function(){
		var obj=document.body.scrollTop?document.body:document.documentElement;
		animate(obj,{scrollTop:0});
	}


	/*三.banner选项卡开始------------------------------------------------------------------------------------------------------------*/

// 1.获取元素
	var type=$("li",$(".category")[0]);
	var kind=$(".kind");
	var info=$(".info");

// 2.定义一个空数组，用于存放左侧选项卡中字体不同颜色的id名
	var colorArr=["kind1","kind2","kind3","kind4","kind5","kind6","kind7","kind8","kind9","kind10","kind11","kind12","kind13","kind14","kind15","kind16"];


// 2.让右侧的详细信息出现
	for(var i=0;i<type.length;i++){
		(function(n){
			type[n].onmouseover=function(){
				// 变左侧字的颜色和粗细
				kind[n].id=colorArr[n];
				kind[n].style.fontWeight="bold";

				// 控制右侧详细信息的显示和隐藏
				info[n].style.display="block";
			}
			type[n].onmouseout=function(){
				kind[n].id="";
				kind[n].style.fontWeight="normal";

				// 控制右侧详细信息的显示和隐藏
				info[n].style.display="none";
			}
		})(i);
	}





	/*banner选项卡结束------------------------------------------------------------------------------------------------------------*/


	/*四.楼层图片位置变动开始--------------------------------------------------------------------------------------------------------*/

// 1.中间
	var mimgs=$(".pic-x");
	for(var i=0;i<mimgs.length;i++){
		mimgs[i].index=i;
		mimgs[i].onmouseover=function(){
			animate(mimgs[this.index],{marginLeft:69},Tween.Quad.easeIn,200);
		}
		mimgs[i].onmouseout=function(){
			animate(mimgs[this.index],{marginLeft:89},Tween.Bounce.easeInOut,200);
		}
	}

// 2.第五层单个
	var mimgs1=$(".pic-x1")[0];
	mimgs1.onmouseover=function(){
		animate(mimgs[this.index],{right:20},Tween.Quad.easeIn,200);
	}
	mimgs1.onmouseout=function(){
		animate(mimgs[this.index],{right:0},Tween.Bounce.easeInOut,200);
	}

// 3.右边
	var rimgs=$(".pic-x2");

	for(var i=0;i<rimgs.length;i++){
		rimgs[i].index=i;
		rimgs[i].onmouseover=function(){
			animate(rimgs[this.index],{right:20},Tween.Quad.easeIn,200);
		}
		rimgs[i].onmouseout=function(){
			animate(rimgs[this.index],{right:0},Tween.Bounce.easeInOut,200);
		}
	}

	/*楼层图片位置变动结束--------------------------------------------------------------------------------------------------------*/



	/*六.右导航鼠标经过弹出新的东西，而且从左往右滑动开始----------------------------------------------------------------------------*/
	var hua=$(".hua");
	var huatu=$(".huatu");
	var erWeiMa=$(".erWeiMa")[0];
	var ewmbj=$(".ewmbj")[0];

	for(var i=0;i<hua.length;i++){
		hua[i].index=i;
		hua[i].onmouseover=function(){
			for(var j=0;j<huatu.length;j++){
				huatu[j].style.display="none";
			}
			huatu[this.index].style.display="block";
			animate(huatu[this.index],{right:35});
		}
		hua[i].onmouseout=function(){
			for(var j=0;j<huatu.length;j++){
				huatu[j].style.display="none";
			}
		}
	}



	erWeiMa.onmouseover=function(){
		ewmbj.style.display="block";
	}
	erWeiMa.onmouseout=function(){
		ewmbj.style.display="none";
	}
	/*右导航鼠标经过弹出新的东西，而且从左往右滑动开始----------------------------------------------------------------------------*/


	/*七.品牌经过出现遮罩，离开遮罩消失开始------------------------------------------------------------------------------------------*/
// 获取元素
	var brand=$(".brand-item");
	var zhe=$(".zhe");

	for(var i=0;i<brand.length;i++){
		(function(n){
			// 添加鼠标移入事件
			brand[n].onmouseover=function(){
				zhe[n].style.display="block";
			}

			// 添加鼠标移出事件
			brand[n].onmouseout=function(){
				zhe[n].style.display="none";
			}
		})(i);


	}

	/*品牌经过出现遮罩，离开遮罩消失结束------------------------------------------------------------------------------------------*/

	/*八.鼠标经过加红边框，同时图片透明度降低开始-----------------------------------------------------------------------*/


// 2.猜你喜欢

	var items=$(".item",$(".cai_like")[0]);
	var reds=$(".red",$(".cai_like")[0]);
	var pics=$(".pic",$(".cai_like")[0]);

	for(var i=0;i<items.length;i++){
		items[i].index=i;
		items[i].onmouseover=function(){
			for(var j=0;j<reds.length;j++){
				reds[j].style.display="none";
				pics[j].style.opacity=1;
			}
			reds[this.index].style.display="block";
			pics[this.index].style.opacity=0.7;
		}
	}
	/*八.鼠标经过加红边框，同时图片透明度降低结束-----------------------------------------------------------------------*/

	/*九.楼层种类标题--->鼠标经过显示下边框开始-------------------------------------------------------------------------*/
	var bline=$(".bline");
	var floors=$(".floors")[0];
	var bt=$(".type",floors);

	for(var j=0;j<bt.length;j++){
		bt[j].index=j;
		bt[j].onmouseover=function(){
			bline[this.index].style.display="block";
		}
		bt[j].onmouseout=function(){
			bline[this.index].style.display="none";
		}
	}

/*九.楼层种类标题--->鼠标经过显示下边框结束--------------------------*/

});