window.onload = function () {
		var prev = document.getElementById('prev');
		var next = document.getElementById('next');
		var ppt = document.getElementById("ppt");
		var ppt_box = document.getElementById("ppt_box");
		var ppt_bottom = document.getElementById("ppt_bottom");
		var triangle = document.getElementById("triangle");
		// var ul1=ppt_box.getElementsByTagName("ul")[0];
		// var li1=ppt_box.getElementsByTagName("li");
		var li2 = ppt_bottom.getElementsByTagName("li");
		var index = 1;
		var timer = null;

		function change(m) {
			var newTran = parseInt(triangle.style.left) + m;
			triangle.style.left = newTran + "px";
			if (newTran > 165) {
				triangle.style.left = 4 + "px";
			}
			if (newTran < 4) {
				triangle.style.left = 165 + "px";
			}
		}


		function animate(offset) {
			//获取的是style.left，是相对左边获取距离，所以第一张图后style.left都为负值，
			//且style.left获取的是字符串，需要用parseInt()取整转化为数字。
			var newLeft = parseInt(ppt_box.style.left) + offset;
			ppt_box.style.left = newLeft + 'px';

			if (newLeft < -1680) {
				ppt_box.style.left = 0 + 'px';
			}
			if (newLeft > 0) {
				ppt_box.style.left = -1680 + 'px';
			}
		}
		prev.onclick = function () {
			animate(240);
			change(23);
		}
		next.onclick = function () {
			animate(-240);
			change(-23);
		}

		function play() {
			timer = setInterval(function () {
				prev.onclick()
			}, 1500)
		}
		play();

		function stop() {
			clearInterval(timer);
		}
		ppt.onmouseover = stop;
		ppt.onmouseout = play;

		function buttonsShow() {
			//这里需要清除之前的样式
			for (var i = 0; i < li2.length; i++) {
				if (li2[i].className == 'on') {
					li2[i].className = '';
				}
			}
			//数组从0开始，故index需要-1
			li2[index - 1].className = 'on';
		}

		prev.onclick = function () {
			index -= 1;
			if (index < 1) {
				index = 8;
			}
			buttonsShow();
			animate(240);
			change(23);
		}
		next.onclick = function () {
			//由于上边定时器的作用，index会一直递增下去，我们只有5个小圆点，所以需要做出判断
			index += 1;
			if (index > 8) {
				index = 1;
			}
			buttonsShow();
			animate(-240);
			change(-23);
		}
		for (var i = 0; i < li2.length; i++) {
			// 这里使用的是立即执行函数，
			(function (i) {
				li2[i].onclick = function () {
					var clickIndex = parseInt(this.getAttribute('index'));
					var offset = 240 * (index - clickIndex);
					var m = (index - clickIndex) * 23;
					animate(offset);
					index = clickIndex;
					buttonsShow();
					change(m);
				}
			})(i)
		}
	}
	// JavaScript Document