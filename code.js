var animate = /*window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||*/
function(callback) { window.setTimeout(callback, 1000/60) };
var canvas=document.createElement ("canvas");
var ctx;
ctx=canvas.getContext("2d");


var width=800;
var height=800;
canvas.width=width;
canvas.height=height;


var tipoButton=document.createElement("button");
tipoButton.innerHTML="wall";
tipoButton.style.position="absolute";
tipoButton.style.top=height

var tipoelem=0;
var elementi=[];
init(elementi)

var step = function(){
	aggiungiElementi(Nuovielementi);
	draw(elementi);
	elementi=nextWater(elementi);
	animate(step);
};

function nextWater(elementi){
	var newElementi=[];
	var i,j;
	var mol;
	for(i=0;i<height;i++){
		
		for(j=0;j<width;j++){
			if(elementi[i*width+j].type==1 ){
				if( i!=height-1 && elementi[(i+1)*width+j].type==-1){
					
					newElementi[(i+1)*width+j]=elementi[i*width+j];
					newElementi[i*width+j]=elementi[(1+i)*width+j];
					
					//console.log("ok");
				}
				else {
					switch(Math.floor(Math.random()*2)){
						case 0:mol=1;break;
						case 1:mol=-1;break;
						default :mol=0;break;
					}
					if(mol!=0){
					if((j+mol)<width &&(j+mol)>=0 && elementi[i*width+j+mol].type==-1){
						if(newElementi[i*width+j+mol]==null || newElementi[i*width+j+mol].type==-1){
							newElementi[i*width+j]=elementi[i*width+j+mol];
							newElementi[i*width+j+mol]=elementi[i*width+j];
						}
						else if(newElementi[i*width+j]==null)
						newElementi[i*width+j]=elementi[i*width+j];
					
					//console.log("ok");
					}
					else if((j-mol)>=0 &&(j-mol)<width && elementi[i*width+j-mol].type==-1){
						if(newElementi[i*width+j-mol]==null || newElementi[i*width+j-mol].type==-1){
							newElementi[i*width+j]=elementi[i*width+j-mol];
							newElementi[i*width+j-mol]=elementi[i*width+j];
						}
						else if(newElementi[i*width+j]==null)
						newElementi[i*width+j]=elementi[i*width+j];					
						
						//console.log("ok");
					}else{
						if(newElementi[i*width+j]==null)
						newElementi[i*width+j]=elementi[i*width+j];
						//console.log("NONok");
					}
					
					}else{
						if(newElementi[i*width+j]==null)
						newElementi[i*width+j]=elementi[i*width+j];
						//console.log("NONok");
					}
					
				}
				
			}
			else{
				if(newElementi[i*width+j]==null){
						newElementi[i*width+j]=elementi[i*width+j];
				}
			
			}
		}
	}
	return newElementi;
}


function draw(elem){
	var imgData=ctx.createImageData(width, height);
	var i=0;
	for(i=0;i<width*height;i++){
		try{
		imgData.data[4*i]=elem[i].r;
		imgData.data[4*i+1]=elem[i].g;
		imgData.data[4*i+2]=elem[i].b;
		imgData.data[4*i+3]=elem[i].a;
		}
		catch (err){
			break;
		}
	}
	ctx.putImageData(imgData,0,0);
}


function init(elementi){
	var i;
	for(i=0;i<height*width;i++){
		elementi[i]=new vuoto(0,0);
	}
	console.log("inizializzato");
}

function aggiungiElementi(nuovi){
	var i=0;
	for(i=0;i<size;i++){
		if(nuovi[i].type==-1){
		elementi[nuovi[i].y*width+nuovi[i].x]=nuovi[i];
		}
		else{
			if(elementi[nuovi[i].y*width+nuovi[i].x].type==-1){
				elementi[nuovi[i].y*width+nuovi[i].x]=nuovi[i];
			}
		}
	}
	nuovi=[];
	size=0;
}

function vuoto(x,y){
	this.type=-1;
	this.x=x;
	this.y=y;
	this.r=0;
	this.g=0;
	this.b=0;
	this.a=255;
}

function water(x,y){
	this.type=1;
	this.x=x;
	this.y=y;
	this.r=0;
	this.g=0;
	this.b=255;
	this.a=255;
}
function wall(x,y){
	this.type=0;
	this.x=x;
	this.y=y;
	this.r=240;
	this.g=240;
	this.b=240;
	this.a=255;		
} 


var Nuovielementi=[];
var size=0;
var click=false
var radius=5; 
canvas.addEventListener ("mousedown",function(event){
	click=true;
Mousex= event.clientX-canvas.offsetLeft;
 Mousey= event.clientY-canvas.offsetTop;

 var i=0;
 var j=0;
 for(i= -radius;i<=radius;i++){
	 for(j=-radius;j<=radius;j++){
		 if(tipoelem==0){
			Nuovielementi[size]=new wall(Mousex+i,Mousey+j);
			size++;
			}
		else if(tipoelem==1){
			Nuovielementi[size]=new water(Mousex+i,Mousey+j);
			 size++;
		}
		else{
			Nuovielementi[size]=new vuoto(Mousex+i,Mousey+j);
			 size++;
		}
	 }
	 
 }
 
 


});
canvas.addEventListener ("mousemove",function(event){
	if(click==true){
Mousex= event.clientX-canvas.offsetLeft;
 Mousey= event.clientY-canvas.offsetTop;

 var i=0;
 var j=0;
 for(i=radius*(-1);i<radius;i++){
	 for(j=radius*(-1);j<radius;j++){
		 if(tipoelem==0){
			Nuovielementi[size]=new wall(Mousex+i,Mousey+j);
			 size++;
			}
		else if(tipoelem==1){
			Nuovielementi[size]=new water(Mousex+i,Mousey+j);
			 size++;
		}
		else{
			Nuovielementi[size]=new vuoto(Mousex+i,Mousey+j);
			 size++;
		}
	 }
	 
 }
}
});

canvas.addEventListener ("mouseup",function(event){
	click=false;

});

tipoButton.addEventListener ("mousedown",function(event){
	tipoelem=(tipoelem+1)%3;
	switch(tipoelem){
		case 0:tipoButton.innerHTML="wall";break;
		case 1:tipoButton.innerHTML="water";break;
		default:tipoButton.innerHTML="erase";break;
	}
 
});

window.onload=function(){
document.body.appendChild(canvas);
document.body.appendChild(tipoButton);
animate(step);
};
