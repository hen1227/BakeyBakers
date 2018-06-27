var placed = [];
var centerx = 0;
var centery = 0;
var averagedist = 0;
var iscircle = false;
var drawn = false; 
var Visual = false;

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
      strokeWeight(1);
    fill (255,0,0);
		ellipse(centerx, centery, 10 ,10);
    for(var k = 0; k < placed.length; k++){
      averagedist += dist(placed[k].x, placed[k].y, centerx, centery);
    }
    averagedist = averagedist / placed.length;
    	noFill();
      strokeWeight(1);
    if(Visual){
	    stroke(255,0,0);
  	  //ellipse(centerx, centery, averagedist-averagedist+placed.length/9, averagedist-averagedist+placed.length/9);
  	  ellipse(centerx, centery, averagedist+averagedist+placed.length/9, averagedist+averagedist+placed.length/9);
    }
    fill(255,0,0);
      stroke(0);
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
	if(dist(mouseX, mouseY, width/2, height/2) < width/2+15){
  if(!drawn){
		placed.push(new dot(mouseX, mouseY));
  }
	}else{
  	drawn = true;
  }
	}
}

function mouseReleased(){
  if(dist(mouseX, mouseY, width/2, height/2) < width/2+10){
		drawn = true;
	}
}
function dot(mex, mey){
	this.x = mex;
	this.y = mey;
	
	this.show = function(){
		strokeWeight(11);
		point(this.x, this.y);
	}
}


function toggleVisual(){
	if(Visual){
  	Visual = false;
    document.getElementById("VisualMode").innerHTML = "Off"; 
  }else{
  	Visual = true;
    document.getElementById("VisualMode").innerHTML = "On"; 
  }
}
