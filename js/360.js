/*
*/
function Move360(div,imgFolder,imgCount,style){
	var my = this;
	this.div = div;
	this.imgFolder = imgFolder;
	this.imgCount = imgCount;
	this.img = [];
	this.imgDiv = null;
	this.index = 0;
	this.style = style;
	this.x; this.dx; this.timer;
	this.init = function(){
		for(var i=0; i< my.imgCount; i++){
			my.img[i] = new Image();
			my.img[i].src = my.imgFolder+i+'.jpg';
		}
		my.imgDiv = document.createElement('img');
		my.imgDiv.className = my.style;
		my.imgDiv.src = my.img[0].src;
		my.imgDiv.useMap = '#0';
		my.div.appendChild(my.imgDiv);
		my.imgDiv.addEventListener('touchstart', my.TouchStart, false);
		my.imgDiv.addEventListener('touchmove', my.TouchMove, false);
		my.imgDiv.addEventListener('touchend', my.TouchEnd, false);
		my.AutoRotate();
	};
	
	this.AutoRotate = function(){
		if(my.index>=my.imgCount-1) my.index = 0;
		else my.index = my.index + 1;
		my.imgDiv.src = my.img[my.index].src;
		my.imgDiv.useMap = '#'+my.index;
		my.timer = setTimeout(my.AutoRotate,100,my);
	};

	this.TouchStart = function(e){
		clearTimeout(my.timer);
		my.x = e.changedTouches[0].clientX;
	
	};
	this.TouchMove = function(e){
		e.preventDefault();
		var x = e.changedTouches[0].clientX;
		my.dx = x - my.x;
		my.x = x;
		// Move left
		if(my.dx < 0){
			my.index = my.index - 2;
			if(my.index<0) my.index = my.imgCount;
		}
		if(my.dx > 0){
			my.index = my.index + 2;
			if(my.index>my.imgCount) my.index = 0;
		} 
		my.imgDiv.src = my.img[my.index].src;
		my.imgDiv.useMap = '#'+my.index;
	};
	
	this.TouchEnd = function(){
	};
	
	this.init();
	
}

window.onload = function(){
	var div = document.body;
	var style = 'imgDiv';
	var imgFolder = 'img/';
	var imgCount = 59;
	var rotate = new Move360(div,imgFolder,imgCount,style);
} 