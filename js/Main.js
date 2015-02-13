var imgList = [];
var pos = [12,43,76,105,137,168];
var play = false;
var cur = 0;
var end = 0;
var _index = 0;
var timer ;
var div ;
var mainVid ;
var but;
var sq,txt,end,start;

function  LoadImg(){
    for(var i=0; i< 94; i++){
        imgList[i] = new Image(10,10);
        imgList[i].src = 'img/seri/'+(i+1)+'.jpg';
    }
}

function MoveTo(n,m){
    if(play==true){
        //c = mainPlay.currentTime;
        //cur = Math.floor(c*187/30000);
        //play = false;
        return;
    }
    clearTimeout(timer);
    end = n;
    but.className = 'div'+m;
    div.style.visibility = 'visible';
    if(cur<end) MoveNext();
    else MovePre();

}

function MoveNext(){
    if(cur != end){
        div.src = imgList[cur].src;
        cur = cur + 1;
        timer = setTimeout(MoveNext,100);
    }
    else{
        div.src = imgList[cur].src;
        clearTimeout(timer);
    }
}

function MovePre(){
    if(cur != end){
        div.src = imgList[cur].src;
        cur = cur - 1;
        timer = setTimeout(MovePre,100);
    }
    else{
        div.src = imgList[cur].src;
        clearTimeout(timer);
    }
    
}

window.onload = function(){
    LoadImg();
    document.body.addEventListener('touchmove', function(e){e.preventDefault();},false);
    but = document.getElementById('button');
    mainVid = document.getElementById("main_Vid");
    mainPlay = document.getElementById("main_Play");
    div = document.getElementById("pic");
	
	sq = document.getElementById('square');
	txt = document.getElementById('text');
	
	if(navigator.platform=='iPad'){
		sq.addEventListener('touchstart',function(f){
			div.style.visibility = 'visible';
			but.style.visibility = 'visible';
			if(mainVid.play) mainPlay.stop;
			var self=this;
			start = f.changedTouches[0].clientX;
			_index = Math.floor((start-97)/((926-97)/94));
			var l =  start-18;
			if(l<81) l = 81;
			if(l>908) l = 908;
			but.style.left = l+'px';
			div.src = imgList[_index].src;
			this.addEventListener('touchmove',function(e){
				end = e.changedTouches[0].clientX;
				_index = Math.floor((end-97)/((926-97)/94));
				var l =  end-18;
				if(l<81) l = 81;
				if(l>908) l = 908;
				but.style.left = l+'px';
					div.src = imgList[_index].src;
				},false)
		},false);
	}
	else{
		sq.addEventListener('mousedown',function(f){
			div.style.visibility = 'visible';
			but.style.visibility = 'visible';
			var self=this;
			start = f.clientX;
			_index = Math.floor((start-97)/((926-97)/94));
			but.style.left = start-18+'px';
			div.src = imgList[_index].src;
			this.addEventListener('mousemove',function(e){
				end = e.clientX;
				_index = Math.floor((end-97)/((926-97)/94));
				but.style.left = end-18+ 'px';
				div.src = imgList[_index].src;
			},false)
		},false);
	}
    mainPlay.addEventListener('click',function(){
	div.style.visibility = 'hidden';
	but.style.left = '81px';
	but.style.visibility = 'hidden';
        if(mainPlay.end) mainPlay.stop;
        mainVid.play();
        div.src = imgList[93].src;
        cur = 93;
        play = true;
        setTimeout(function(){
	    play = false;
	    div.style.visibility = 'visible';
	},30000);
    },false);
    
	
}