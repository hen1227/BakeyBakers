var circles = [];
var gravityAcc = 9.82;
var nextSize = 0;

function setup(){
	createCanvas(800,800);
	frameRate(120);
	gravityAcc /= 120;
	// for(var i = 0; i < 500; i++){
		// circles.push(new circle(random(width), 400, createVector(0,0), 10, 5, 0.6));
	// }
	////////////////////////posx, posy,       velVec, mass, size, bounciness
	// circles.push(new circle(random(width), 400, createVector(0,0), 10, 20, 1));
	// circles.push(new circle(random(width), 200, createVector(0,0), 10, 60, 1));
	// circles.push(new circle(random(width), 400, createVector(0,0), 10, 30, 1));
	// circles.push(new circle(random(width), 600, createVector(0,0), 10, 60, 1));
}

function draw(){
	background(200,200,250);
	for(var i = 0; i < circles.length; i++){
		circles[i].show();
		circles[i].move();
		if(circles[i].y > height - circles[i].size/2){
			circles[i].vel.y = -Math.abs(circles[i].vel.y) * circles[i].bounciness;
		}else{
			circles[i].vel.y += gravityAcc;
		}
		if(circles[i].x < circles[i].size/2){
			circles[i].vel.x = Math.abs(circles[i].vel.x) * circles[i].bounciness;
		}
		if(circles[i].x > width - circles[i].size/2){
			circles[i].vel.x = -Math.abs(circles[i].vel.x) * circles[i].bounciness;
		}
	}
	if (mouseIsPressed) {
		if(nextSize < 600){
			nextSize++;
		}
		ellipse(mouseX, mouseY, nextSize, nextSize)
	}
	// cvn.mouseReleased(mouseWasReleased);
	// cvn.mousePressed(mouseWasDown);
}
function mouseReleased(){
	if(nextSize > 25){
		circles.push(new circle(mouseX, mouseY, createVector(0,0), nextSize/5, nextSize, 0.7));
		nextSize = 0;
	}
}

function circle(_x, _y, _vel, _mass, _size, _bounciness){
  this.x = _x;
  this.y = _y;
  this.vel = _vel;
  this.mass = _mass;
  this.size = _size;
  this.bounciness = _bounciness;

  this.show = function(){
    ellipse(this.x, this.y, this.size, this.size);
  }
  this.move = function(){
    this.x += this.vel.x;
    this.y += this.vel.y;
    for(var i = 0; i < circles.length; i++){
      if(dist(circles[i].x, circles[i].y, this.x, this.y) < (circles[i].size +this.size)/2 && dist(circles[i].x, circles[i].y, this.x, this.y) > 0){
        var pointPX = (circles[i].x + this.x)/2;
        var pointPY = (circles[i].y + this.y)/2;
//         pointPX = map(pointPX, 0, (circles[i].size +this.size)/2, -1, 1);
//         pointPY = map(pointPY, 0, (circles[i].size +this.size)/2, -1, 1);
        this.vel.x = pointPX - circles[i].x;
        this.vel.y = pointPY - circles[i].y;
        // this.vel.x *= 2;
        // this.vel.y *= 2;
        // this.vel.x /= ((circles[i].size +this.size)/2);
        // this.vel.y /= ((circles[i].size +this.size)/2);
        this.vel.x = (this.vel.x/this.mass)*this.bounciness;
        this.vel.y = (this.vel.y/this.mass)*this.bounciness;
      }
    }
  }
}

