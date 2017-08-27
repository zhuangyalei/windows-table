
var contextmenuCallback = {
	createFloder:function(e){
		e.stopPropagation();
		var maxId = getMaxId() + 1;
		var newfloder = {
				id:maxId,
				pid:_ID,
				type:'floder',
				name:'新建文件夹',
				time:Date.now(),
				callback:'showfloder',
		};
		create(newfloder);
	},
	createTxt:function(e){
		e.stopPropagation();
		var maxId = getMaxId() + 1;
		var newfloder = {
				id:maxId,
				pid:_ID,
				type:'txt',
				name:'新建文本',
				time:Date.now(),
				callback:'showtxt',
		};
		create(newfloder);
	},
	createHtml:function(e){
		e.stopPropagation();
		var maxId = getMaxId() + 1;
		var newfloder = {
				id:maxId,
				pid:_ID,
				type:'html',
				name:'新建html',
				time:Date.now(),
				callback:'showhtml',
		};
		create(newfloder);
	},

	rename:function(e){
			e.stopPropagation();
			var wrap = document.querySelector('.wrap');
			var activeFlders = wrap.querySelectorAll('.active');
			for (var i=0; i<activeFlders.length;i++) {
				resteName(activeFlders[i]);
			}
			contextmenu.style.display = 'none'
	},
	delete:function(){
		var wrap = document.querySelector('.wrap');
		var activeFlders = wrap.querySelectorAll('.active');
		for (var i =0;i<activeFlders.length;i++) {
			list.removeChild(activeFlders[i]);
			data.list.forEach(function(value){
				if(value.id == activeFlders[i].dataset.numb){
					value.pid = 1
				}
			});
		}
		newOffset(list);
	},
	uploding: function(){
		filed.click();
		var show;
		filed.onchange = function(e){
			var file = this.files[0];
			var fileType = file.type.split('/')[1];
			if(!(fileType == "jpg"
				||fileType == "jpeg"
				||fileType == "png"
				||fileType == "gif"
				||fileType == "mp3"
				||fileType == "ogg"
				||fileType == "avi"
				||fileType == "mp4")){
				alert("暂不支持该格式");
				return;
			}
			if(fileType=="jpg"
			||fileType == "jpeg"
			||fileType == "png"
			||fileType == "gif"){
				show = 'showimg';
			}else if(fileType == "mp3"
					||fileType == "ogg"){
				show = 'showaudio';
			}else{
				show = 'showavideo';
			}
			var maxId = getMaxId() + 1;
			var newfloder = {
					id:maxId,
					pid:_ID,
					type:fileType,
					name:file.name,
					time:Date.now(),
					callback:show,
					file:file
			};
			create(newfloder);
			filed.value = "";
		};
	},
	
	sorTime: function(){
		var datalist = getChildren(_ID);
		datalist.sort(function(a,b){
			if(a.time > b.time){
				return 1;
			}else{
				return -1;
			}
		})
		viewData(datalist,list);
	},
	
	sorType: function(){
		var datalist = getChildren(_ID);
		datalist.sort( function(a, b) {
            if (a.type > b.type) {
                return 1;
            } else {
                return -1;
            }
        } );
       viewData(datalist,list);
	},
	
	showtrash:function(e){
			thisId = this.dataset.numb;
			e.stopPropagation();
			this.classList.remove('active');
			var div = document.createElement('div');
			var span = document.createElement('span');
			var nav = document.createElement('ul');
			var li1 = document.createElement('li');
			var li2 = document.createElement('li');
			var content = document.createElement('ul');
			span.innerHTML = 'x';
			li1.innerHTML = '删除所选';
			li2.innerHTML = '还原所选';
			nav.className = 'nav'
			content.id = 'content'
			div.className = 'showTrash';
			div.appendChild(span);
			div.appendChild(nav);
			div.appendChild(content);
			nav.appendChild(li1);
			nav.appendChild(li2);
			span.onclick = function(e){
				e.cancelBubble;
				wrap.removeChild(div);
			};
			div.addEventListener('mousedown',function(e){
				e.stopPropagation();
				circle(e,div);
			});
			wrap.appendChild(div);
			view(thisId,content);
			li1.onclick = function(){
				var activeFlders = content.querySelectorAll('.active');
				for (var i =0;i<activeFlders.length;i++) {
					content.removeChild(activeFlders[i]);
					data.list =  getdelete(activeFlders[i].dataset.numb)
				}
				newOffset(content);
			}
			li2.onclick = function(){
				var activeFlders = content.querySelectorAll('.active');
				for (var i =0;i<activeFlders.length;i++) {
					content.removeChild(activeFlders[i]);
					data.list.forEach(function(value){
						if(value.id == activeFlders[i].dataset.numb){
							value.pid = 0;
						}
					});
				}
				newOffset(content);
				view(0,list);
			}
	},
	
	showfloder:function(e){
		e.stopPropagation();
		thisId = this.dataset.numb;
		this.classList.remove('active');
		back.style.color = '#000000'
		var span = document.querySelector('.showFloder>span');
		showFloder.style.display = 'block';
		span.onclick = function(){
			crumbs.innerHTML = '';
			search.innerHTML = '';
			showFloder.style.display = 'none';
		}
		back.onmouseover = function(e){
			this.style.border = '1px solid #cce8ff';
			this.style.background = '#e5f3ff';
		}
		
		back.onmouseout = function(e){
			this.style.border = '1px solid #d9d9d9';
			this.style.background = '#ffffff';
		}
		
		back.onmouseup = function(){
			this.style.padding = '5px 10px';
		}
		
		back.onmousedown = function(){
			this.style.padding = '6px 8px 4px 12px';
		}
		back.onclick = function(e){
			var pre = getParent(thisId);
			if(pre === undefined){
				this.style.color = '#d9d9d9'
				return;
			}
			thisId = pre.id;
			view(thisId,nextFloder);
			viewCrumbs(thisId);
		}
		viewCrumbs(thisId);
		view(thisId,nextFloder);
		search.innerHTML = '';
		viewSearch();
	},
	
	showtxt:function(){
		showtxt.style.display = 'block';
		var span = showtxt.querySelector('span');
		span.onclick = function(){
			showtxt.style.display = 'none';
			showtxtArea.innerHTML = '';
		}
	},
	
	showimg:function(){
		var reader = new FileReader();
		var files = getself(this.dataset.numb).file;
		var span = showWrap.querySelector('span');
		showWrap.style.display = 'block';
		var img = document.createElement("img");
		reader.onload = function(e){
			img.src = e.target.result;
			showWrap.appendChild(img);
		};
		reader.readAsDataURL(files);
		
		span.onclick = function(){
			showWrap.style.display = 'none';
			showWrap.removeChild(img);
		}
	},
	showvidio:function(){
		var reader = new FileReader();
		var files = getself(this.dataset.numb).file;
		var span = showWrap.querySelector('span');
		showWrap.style.display = 'block';
		var video = document.createElement("video");
		reader.onload = function(e){
			video.setAttribute('src',e.target.result);
			video.setAttribute('width',"600");
			video.setAttribute('height',"300");
			video.setAttribute('controls',"");
			showWrap.appendChild(video);
		};
		reader.readAsDataURL(files);
		span.onclick = function(){
			showWrap.style.display = 'none';
			showWrap.removeChild(video);
		}
	},
	showaudio:function(){
		console.log(1)
		var reader = new FileReader();
		var files = getself(this.dataset.numb).file;
		var span = showWrap.querySelector('span');
		showWrap.style.display = 'block';
		var audio = document.createElement("audio");
		reader.onload = function(e){
			audio.setAttribute('src',e.target.result);
			audio.setAttribute('width',"600");
			audio.setAttribute('height',"300");
			audio.setAttribute('controls',"");
			showWrap.appendChild(audio);
		};
		reader.readAsDataURL(files);
		span.onclick = function(){
			showWrap.style.display = 'none';
			showWrap.removeChild(audio);
		}
	},
};

/**
 * 业务复用函数
 * @type{Object}
 * */

function showContextmenu(e,menuData){//右键菜单展示
	var contextmenu = document.querySelector('#contextmenu');
	var nextmenu = contextmenu.getElementsByClassName('nextmenu');
	contextmenu.innerHTML = '';
	contextmenu.style.display = 'block';
    contextmenu.style.left = e.clientX + "px";
	contextmenu.style.top = e.clientY + "px";
	resetOffset(e,contextmenu)
	menuData.forEach(function(inite){
		var li = document.createElement('li');
		li.innerHTML = inite.name;
		li.style.position = 'relative'
		if(inite.child){		
			var span = document.createElement('span');
			span.innerHTML = '&gt';
			li.appendChild(span);
		}
		
		li.addEventListener('mouseenter',function(){
			mouseover(li,inite)
		})
		
		li.addEventListener('mousedown',function(){
			e.stopPropagation();
		})
		
		li.addEventListener('click',contextmenuCallback[inite.callback]);
			
		contextmenu.appendChild(li);
	} );
};

function view(id,container){//展示id下数组
	var datalist = getChildren(id);
	viewData(datalist,container);
}

function viewData(datalist,container){//展示所传数组
	container.innerHTML = '';
	var list = document.querySelector('#list');
	datalist.forEach(function(value,index){
		var li = document.createElement('li');
		li.className = value.type;
		li.dataset.actived = 2;
		addNewname(value);
		li.innerHTML = `<p>${value.newname}</p><input type="text" />`;
		li.dataset.numb = value.id;
		setEV(li,value,container);
		container.appendChild(li);
		var offset = getFlderOffset(index,container);
		li.style.left = offset.x+'px';
		li.style.top = offset.y+'px';
	})
};

function addNewname(value){
	if(!value.rename){
		if(value.type === 'floder'
		||value.type === 'trash'
		||value.type === 'jpg'
	    ||value.type === 'jpeg'
	    ||value.type === 'png'
	    ||value.type === 'gif'
	    ||value.type === 'mp3'
	    ||value.type === 'ogg'
	    ||value.type === 'avi'
	    ||value.type === 'mp4'){
			value.newtype = ''
		}else{
			value.newtype = `.${value.type}`
		};
		if(value.extname){
			value.newtype +=`(${value.extname})`
		}
		value.newname = value.name+value.newtype;
	}
}

function showNextmenu(inite,self){//展示子菜单
	ul = document.createElement('ul');
	ul.onmouseover = function(e){
		e.stopPropagation();
	}
	ul.className = 'nextmenu';
	inite.forEach(function(value){
		var li = document.createElement('li');
		li.innerHTML = value.name;
		li.addEventListener('mouseover',function(){
			mouseover(li,inite);
		});
		li.addEventListener('mousedown',contextmenuCallback[value.callback]);
		
		ul.appendChild(li);
	})
	self.appendChild(ul);
	resetUlOffset(ul);
}
function create(newfloder){//创建
	var datalist = getChildren(_ID);
	var floder = [];
	for (var i=0; i<datalist.length; i++) {
		if(datalist[i].type == newfloder.type&&datalist[i].name == newfloder.name){
			floder.push(datalist[i])
		}
	};
	if (floder.length) {
		for (var i=2; i<=floder.length+1; i++) {
			var v =  floder.find(function(ele) {
                return ele.extname == i;
            });
            if (v === undefined) {
            	newfloder.extname = i;
            	break;
            }
		}
	}
	data.list.push(newfloder)
	
    view(_ID,list);
}

function mouseover(el,inite){//右键菜单鼠标移入事件
	var lis = el.parentNode.children;
	for (var i=0;i<lis.length;i++) {
		lis[i].classList.remove('hover');
	}
	el.classList.add('hover');
	var uls = el.parentNode.querySelectorAll('ul');
	for (var i=0;i<uls.length;i++) {
		uls[i].parentNode.removeChild(uls[i]);
	}
	if(inite.child){		
		showNextmenu(inite.child,el);
	}
};


function resetUlOffset(ul){//下一级菜单位置
	var rect = ul.getBoundingClientRect();
	if(rect.right > document.documentElement.clientWidth){
		ul.style.boxShadow = '2px 0  1px rgba(0,0,0,.5)';
		ul.style.left = -(rect.width - 5) + "px";
	}
	if(rect.bottom > document.documentElement.clientHeight){
		ul.style.top = (ul.offsetParent.clientHeight - rect.height) + "px";
	}
}

function resetOffset(e,menu){//设置 下拉菜单的位置 
		var x = css(menu,"left");
		var y = css(menu,"top");
		var maxX = document.documentElement.clientWidth -  menu.offsetWidth;
		var maxY = document.documentElement.clientHeight -  menu.offsetHeight; 
		menu.style.left = Math.min(maxX,x) + "px";
		menu.style.top = (y  > maxY? y  - menu.offsetHeight:y) + "px";
}
function nextmenu(e,nextmenu){//生成子菜单
	nextmenu.forEach(function(inite){
		var li = document.createElement('li');
		li.innerHTML = inite.name;
		contextmenu.appendChild(li);
	} );
}



function  setEV(el,value,container){//文件夹设置事件
	var p = el.children[0];
	var input = el.children[1];
	var list = document.querySelector('#list');
	var lis = container.getElementsByTagName('li');
	el.addEventListener('mouseenter',function(){
		this.classList.add('hover');
	});
	
	el.addEventListener('dblclick',contextmenuCallback[value.callback])
	
	el.addEventListener('contextmenu',function(e){
		e.preventDefault();
		e.stopPropagation();
		if(this.className != 'trash'){
			showContextmenu(e,data.menu.subMenu);
		}
		for (var i= 0; i<lis.length;i++) {
			lis[i].classList.remove('active');
			lis[i].dataset.actived = 2;
		}
		this.classList.add('active');
		this.dataset.actived = 1;
	});
	
	el.addEventListener('mouseleave',function(){
		if(this.className != 'trash'){
			this.classList.remove('hover')
		}
	});
	
	el.addEventListener('click',function(e){
		e.stopPropagation();
		if(el.dataset.actived  == 1){
			for (var i= 0; i<lis.length;i++) {
				lis[i].classList.remove('active');
				lis[i].dataset.actived = 2;
			}
		}
		this.classList.add('active')
		this.dataset.actived = 1;
		contextmenu.style.display = 'none';
	});
	
	el.addEventListener('mousedown',function(e){
		e.stopPropagation();
		if(!e.ctrlKey&&el.dataset.actived  == 2){
			for (var i= 0; i<lis.length;i++) {
				lis[i].classList.remove('active');
				lis[i].dataset.actived = 2;
			}
		}
		if(this.className != 'trash'){
			this.classList.add('active')
			this.dataset.actived = 1;
		}
		contextmenu.style.display = 'none';
	});
	
	el.addEventListener('mousedown',function(e){
			e.stopPropagation();
			var trash = wrap.querySelector('.trash');
			var activeFlder = container.querySelectorAll('.active,.hover');
			if(e.button == 2){
					return;
			}
			var cloneFlder = [];
			var startX = e.clientX;
			var startY = e.clientY;
			var cloneNode = [];
			for (var i =0; i<activeFlder.length;i++) {
				var newNode = activeFlder[i].cloneNode(true);
				newNode.className = getself(activeFlder[i].dataset.numb).type;
				cloneNode.push(newNode);
				css(newNode,"opacity",.4);
				newNode.style.zIndex = 0; 
				newNode.newNodeX = css(activeFlder[i],'left');
				newNode.newNodeY = css(activeFlder[i],'top');
				container.appendChild(newNode);
				cloneFlder.push(newNode);
				if(activeFlder[i] == this&&activeFlder[i] != trash){
					var self = newNode;
				}
			}
			document.addEventListener('mousemove',move);
			document.addEventListener('mouseup',end);
			function move(e){
				cloneNode.forEach(function(value){
					value.style.zIndex = 10
				})
				var nowX = e.clientX;
				var nowY = e.clientY;
				var disX = nowX-startX;
				var disY = nowY-startY;
				for(var i = 0; i < cloneFlder.length; i++){
					css(cloneFlder[i],"left",cloneFlder[i].newNodeX+disX);
					css(cloneFlder[i],"top",cloneFlder[i].newNodeY+disY);
				}
				if(trash){
					if(self&&getCollide(self,trash)){
						trash.classList.add('hover');
					}else{
						trash.classList.remove('hover');
					}
				}
				
			};
			function end(e){
				document.removeEventListener('mousemove',move);
				document.removeEventListener('mouseup',end);
				
				var havetrash = true;
				if(trash){
					trash.classList.remove('hover');
				}
				activeFlder.forEach(data =>{//如果选中的里面有垃圾桶就不删除文件
					if (data==trash) {
						havetrash = false
					}
				});
				
				if(trash&&self&&getCollide(self,trash)&&havetrash){//判断最后点击的那个文件克隆的和trash是否碰撞
					for(var i = 0; i < activeFlder.length; i++){
						container.removeChild(activeFlder[i]);
						data.list.forEach(function(value){
							if(value.id == activeFlder[i].dataset.numb){
								value.pid = 1
							}
						});
					}
					newOffset(list);
				}
				for(var i = 0; i < cloneFlder.length; i++){
					container.removeChild(cloneFlder[i]);
				}
				
			}
		});
	
	p.addEventListener('dblclick',function(e){
		e.stopPropagation();
			if (el.dataset.actived  == 1) {
				resteName(el);
			}
	});
	
	input.addEventListener('blur',function(){
			if(input.value.trim('') == ''){
				p.style.display = 'block';
				input.style.display = 'none';
				return;
			}
			if(hasname(input,this.parentNode.dataset.numb)){
				info.style.display = 'block';
				sure.addEventListener('click',function(e){
					e.stopPropagation();
					input.focus();
					input.select();
					info.style.display = 'none';
				})
				return;
			}
			p.innerHTML = input.value;
			p.style.display = "block";
			input.style.display = "none";
			getself(input.parentNode.dataset.numb).newname = p.innerHTML;
			getself(input.parentNode.dataset.numb).extname = p.innerHTML.charAt(p.innerHTML.length-2);
			getself(input.parentNode.dataset.numb).rename = true;
		})
}

function newOffset(container){
	var	newFlder = container.getElementsByTagName('li');
	for (var i = 0;i<newFlder.length;i++) {
		var offset = getFlderOffset(i,container);
		startMove({
			el:newFlder[i],
			target:{
				left:offset.x,
				top:offset.y,
			},
			type:'easeInStrong',
			time:500,
		});
	}
}

function getCollide(el,el2){
	var rect = el.getBoundingClientRect();
	var rect2 = el2.getBoundingClientRect();
	if(rect.right < rect2.left
	||rect.left > rect2.right
	||rect.bottom<rect2.top
	||rect.top>rect2.bottom){
		return false;
	}
	return true;
}

function resteName(li){
		p = li.children[0];
		input = li.children[1];
		p.style.display = 'none';
		input.style.display = 'block';
		input.value = p.innerHTML;
		setTimeout(function() {//在p标签上的时间发生上  input的焦点还会消失  所以加一个延迟
			input.focus();
			input.select();
		},20)
	};

function hasname(now,id){
	var dataliset = getChildren(id);
	for (var i=0;i<dataliset.length;i++) {
		if(dataliset[i].newname == now.value && dataliset[i]!=getself(now.parentNode.dataset.numb)){
			return true;
		}
	}
	return false;
}

function viewCrumbs(thisId){
	var self = getself(thisId);
	var pathList = getParents(thisId);
	crumbs.innerHTML = '';
	pathList.forEach(function (value) {
        setCrumbs(value);
    });
    if(self){
    	setCrumbs(self);
    }
}

function setCrumbs(value){
	var li = document.createElement('li');
	var span1 = document.createElement('span');
	span1.style.float = 'left'
	span1.innerHTML = '&gt';
	span1.style.padding = '0 5px'
	var span2 = document.createElement('span');
	span2.dataset.id = value.id;
	span2.style.float = 'left'
	span2.innerHTML = value.newname;
	span2.style.padding = '3px 5px';
	span2.style.margin = '1px';
	span2.style.border = '1px solid rgba(0,0,0,0)';
	span2.style.font = '16px/1 "微软雅黑"'
	span2.onmouseover = function(){
		span2.style.border = '1px solid #cce8ff';
		span2.style.background = '#e5f3ff';
	}
	span2.onmouseout = function(){
		span2.style.border = '1px solid rgba(0,0,0,0)';
		span2.style.background = '';
	}
	span2.onmousedown = function(){
		if(value!=self){
			view(value.id,nextFloder);
			thisId = value.id;
		}
		span2.style.padding = '4px 4px 2px 6px';
	}
	span2.onmouseup = function(){
		viewCrumbs(value.id)//递归重新显示面包屑导航
		
		span2.style.padding = '3px 5px';
	}
	li.appendChild(span1);
	li.appendChild(span2);
    crumbs.appendChild(li);
}
	

function getFlderOffset(index,container){//添加文件排序
	var li = container.getElementsByTagName('li');
	index = (typeof (index) != 'undefined'?index:li.length);
	var liW =105;
	var liH = 130;
	if(container == list){
		var ceils = Math.floor(container['clientHeight']/liH);
		var x =  Math.floor(index/ceils);//算出元素在第几列
		var y =index%ceils;//算出元素在第几行
	}else{
		var ceils = Math.floor(container['clientWidth']/liW);
		var y =  Math.floor(index/ceils);
		var x =index%ceils;
	}
	
	return {x: x*liW,y: y*liH}; 
};

function allAddnewname(){
	data.list.forEach(function(value){
		addNewname(value);
	})
};

function viewSearch(){
	var children = getChildren(0);
	var childrens =  children.filter(function(value){
		return value.type == 'floder';
	})
	viewtree(search,childrens,1);
}

function viewtree(container,list,level){
	var numb = level;
	list.forEach(function(value){
		var li = document.createElement('li');
		var div = document.createElement('div');
		var p = document.createElement('p');
		var span = document.createElement('span');
		var childrens = getChildren(value.id);
		if(childrens.length){
			span.innerHTML = '&gt';
		}else{
			span.innerHTML = '';
		}
		p.innerHTML = value.newname;
		div.appendChild(span);
		div.appendChild(p);
		li.appendChild(div);
		container.appendChild(li);
		p.onclick = function(e){
			console.log(1)
			e.cancelBubble = true;
			thisId = value.id;
			viewCrumbs(thisId);
			view(thisId,nextFloder);
		}
		span.onclick = function(e){
			e.cancelBubble = true;
			var lis = search.getElementsByTagName('li');
			for (var i=0;i<lis.length;i++) {
				lis[i].className = ''
			}
			this.parentNode.parentNode.className = 'now';
			var children = getChildren(value.id);
			if(children.length>0){
				var isul = document.querySelectorAll('.now>ul')
				if(!isul.length){
					var ul = document.createElement('ul');
					ul.style.marginLeft = 10 + 'px'
					this.parentNode.parentNode.appendChild(ul);
					viewtree(ul,children,numb+1);
				}else{
					for (var i=0;i<isul.length;i++) {
						if(isul[i].style.display != 'none'){
							isul[i].style.display = 'none';
						}else{
							isul[i].style.display = 'block';
						}
					}
				}
			}
			return false;
		}
	})
}
