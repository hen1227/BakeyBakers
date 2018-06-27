var placed = [];
var centerx = 0;
var centery = 0;
var averagedist = 0;
var iscircle = false;
var drawn = false; 

function setup() {
  createCanvas(400, 400);
  
}
function draw() {
  background(220);
	textSize(20);
	text("Try to draw a good circle", width/15, 20);
	for(var i = 0; i < placed.length; i++){
		placed[i].show();
  }
  
	if(placed.length > 50){
		for(var j = 0; j < placed.length; j++){
			centerx += placed[j].x;
			centery += placed[j].y
    }
		centerx = centerx / placed.length;
		centery = centery / placed.length;
		// print(centerx, centery);
    fill (255,0,0);
    strokeWeight(1);
		ellipse(centerx, centery, 10 ,10);
    for(var k = 0; k < placed.length; k++){
      averagedist += dist(placed[k].x, placed[k].y, centerx, centery);
    }
    averagedist = averagedist / placed.length;
     iscircle = true;
    for(var l = 0; l < placed.length; l++){
      if(dist(placed[l].x, placed[l].y, centerx, centery) < averagedist+placed.length/9 && dist(placed[l].x, placed[l].y, centerx, centery) > averagedist-placed.length/9){}else{
      	iscircle = false;
      }
    }
    for(var b = 1; b < placed.length; b++){
    	if(dist(placed[b].x, placed[b].y, placed[b-1].x, placed[b-1].y) < 10){
      }else{
        iscircle = false;
    	}
  }
  	if(dist(placed[placed.length-1].x, placed[placed.length-1].y, placed[0].x, placed[0].y) < 10){
    }else{
      iscircle = false;
    }
    
    
	}
  if(iscircle){
  	text("That looks like a circle", 15, 300);
  }
}

function mouseDragged(){
  if(!drawn){
		placed.push(new dot(mouseX, mouseY));
	}else{
  	
  }
}

function mouseReleased(){
	drawn = true;
}
function dot(mex, mey){
	this.x = mex;
	this.y = mey;
	
	this.show = function(){
		strokeWeight(11);
		point(this.x, this.y);
	}
}
