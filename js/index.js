var info = document.querySelector('.info');
var box = info.querySelector('.box');
var sure = box.querySelector('input');
var wrap = document.querySelector('.wrap');
var list = wrap.querySelector('#list');
var lis = list.getElementsByTagName('li');
var contextmenu = document.querySelector('#contextmenu');
var filed = document.querySelector('#file');
var showFloder = wrap.querySelector('.showFloder');
var back = showFloder.querySelector('.back');
var crumbs = showFloder.querySelector('.crumbs');
var search = showFloder.querySelector('.search');
var nextFloder = showFloder.querySelector('#nextFloder');
var showtxt = wrap.querySelector('.showtxt');
var showtxtArea = showtxt.querySelector('textarea');
var showWrap = document.querySelector('.showWrap');
var showall = showWrap.querySelector('.showall');
view(0,list);

allAddnewname();

var _ID = 0;
(function infoSetoffset(e){//弹出层
	elX = css(box,'width');
	elY = css(box,'height');
	clienX = document.documentElement.clientWidth;
	clienY =document.documentElement.clientHeight;
	box.style.left = (clienX-elX)/2 + 'px';
	box.style.top = (clienY-elX)/2 + 'px';
})();


document.addEventListener('contextmenu',function(e) {
	e.preventDefault();
    showContextmenu(e,data.menu.main);
    for (var i=0;i<lis.length;i++) {
		lis[i].classList.remove('active');
		lis[i].dataset.actived = 2;
	}

});


contextmenu.addEventListener('mousedown',function(e) {
	e.preventDefault();
    e.stopPropagation();
});
contextmenu.addEventListener('click',function(e) {
	e.preventDefault();
    e.stopPropagation();
    contextmenu.style.display = 'none'
});

info.addEventListener('contextmenu',function(e) {
	e.preventDefault();
    e.stopPropagation();
    
});

document.addEventListener('mousedown',function(e) {
	contextmenu.style.display = 'none'
	for (var i=0;i<lis.length;i++) {
		lis[i].classList.remove('active');
		lis[i].dataset.actived = 2;
	}
});

(function(){
document.addEventListener('keydown',function(e){
	if(e.keyCode == 113){
		for(var i = 0; i < lis.length; i++){
			if(lis[i].classList.contains("active")){
				resteName(lis[i]);
				return;
			}
		}
	}
	if(e.keyCode == 46){
		for(var i = 0; i < lis.length; i++){
			if(lis[i].classList.contains("active")){
				data.list = getdelete(lis[i].dataset.numb);
				list.removeChild(lis[i]);
				i--;
			};
		};
		newOffset();
	}
})
})();

document.addEventListener('mousedown',function(e){
	circle(e,list);
});

nextFloder.addEventListener('mousedown',function(e){
	e.stopPropagation();
	circle(e,nextFloder);
});

function circle(e,container){//框选
	if(e.button==1||e.button==2){
		return;
	}
	var div = document.createElement('div');
	var lis = container.getElementsByTagName('li');
	contextmenu.addEventListener('mousedown', function(e) {
		e.stopPropagation();
	});
	var startX = e.clientX;
	var startY = e.clientY;
	var offfX = startX-container.getBoundingClientRect().left;
	var offfY = startY-container.getBoundingClientRect().top;
	div.className = 'circle';
	if(container != list){
		div.style.backgroundColor = 'rgba(51,153,255,.4)';
		div.style.border = '1px  solid  #3399ff';
	}else{
		div.style.border = ' 1px dashed #000 ';
	};
	div.style.left = offfX + 'px';
	div.style.top = offfY+ 'px';
	div.style.zIndex = '5';
	container.appendChild(div);
	document.addEventListener('mousemove',move);
	document.addEventListener('mouseup',end);
	function move(e){
		window.isMove = true;
		var nowX = e.clientX;
		var nowY = e.clientY;
		div.style.width = Math.abs(nowX-startX) + 'px';
		div.style.height = Math.abs(nowY-startY) + 'px';
		if(nowX < startX){
			div.style.left = (nowX-container.getBoundingClientRect().left) + "px";
		} else {
			div.style.left = offfX + "px";
		}
		if(nowY < startY){
			div.style.top = (nowY-container.getBoundingClientRect().top) + "px";
		} else {
			div.style.top = offfY + "px";
		}
		for (var i=0;i<lis.length;i++) {
			if(getCollide(div,lis[i])){
				lis[i].classList.add('active');
				lis[i].dataset.actived = 1;
			}else{
				lis[i].classList.remove('active');
				lis[i].dataset.actived = 2;
			}
		}
	}
	function end(){
		document.removeEventListener('mousemove',move);
		document.removeEventListener('mouseup',end);
		container.removeChild(div);
		window.isMove = false;
	}
}



