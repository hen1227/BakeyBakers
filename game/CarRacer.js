var carX;
var carY;
var carWidth = 30;
var carHeight = 50;
let vel;
let acc;
var accRate = 0.4;
var angle = 0;
var rotateRate;
var friction = 1.06;
let goToPoint;
let wheelTrail = [];
var crashed = false;
let cones = [];
//
function setup(){
	createCanvas(600,600);
	carX = width/4;
	carY = height/4;
	rectMode(CENTER);
	goToPoint = createVector(0, 0.05);
	acc = createVector(0, 0);
	vel = createVector(0, 0);
	rotateRate = PI/80;

	cones.push(new trafficCone(100, 100));
	cones.push(new Coin(200, 100));
}
//
function draw(){
	background(200);
	//Walls <<<<<<<<<<------------->>>>>>>>>>
	fill(0);
	strokeWeight(6);
	stroke(0);
	line(0, 0, 0, height);
	line(0, height, width, height);
	line(0, 0, width, 0);
	line(width, 0, width, height);
	//Cones <<<<<<<<<<------------->>>>>>>>>>
	for(var i = 0; i < cones.length; i++)
	{
			cones[i].show();
			cones[i].hit();
	}


	// print(acc);
	acc.x /= friction;
	acc.y /= friction;
	vel.x /= friction;
	vel.y /= friction;
	vel.x += acc.x;
	vel.y += acc.y;
	carX += vel.x;
	carY += vel.y;
	translate(carX, carY);
	// ellipse(0,0,10,10);


	//Crashing Car <<<<<<-------->>>>>>>

	if(carX + carWidth/2 < 5 || carX + carWidth/2 > width-5 || carY + carHeight/2 < 5 || carY + carHeight/2 > height-5){
		crashed = true;
	}
	if(carX - carWidth/2 < 5 || carX - carWidth/2 > width-5 || carY + carHeight/2 < 5 || carY + carHeight/2 > height-5){
		crashed = true;
	}
	if(carX + carWidth/2 < 5 || carX + carWidth/2 > width-5 || carY - carHeight/2 < 5 || carY - carHeight/2 > height-5){
		crashed = true;
	}
	if(carX - carWidth/2 < 5 || carX - carWidth/2 > width-5 || carY - carHeight/2 < 5 || carY - carHeight/2 > height-5){
		crashed = true;
	}
	if(crashed){
		StartReset();
	}

	// line(0, 0, goToPoint.x*100, goToPoint.y*100);
	// print(goToPoint.x);


	//Moving Car <<<<<<-------->>>>>>>
		rotate(angle);
	// velX = map((mouseX-carX), -50, 50, -1, 1);
	// velY = map((mouseY-carY), -50, 50, -1, 1);
	//Draw Car <<<<<------->>>>>
	fill(0);
	strokeWeight(1);
	stroke(0);
	ellipse(0 - carWidth/2, 0 - carHeight/5, carWidth/4, carHeight/4);
	ellipse(0 + carWidth/2, 0 - carHeight/5, carWidth/4, carHeight/4);
	ellipse(0 - carWidth/2, 0 + carHeight/3, carWidth/4, carHeight/4);
	ellipse(0 + carWidth/2, 0 + carHeight/3, carWidth/4, carHeight/4);
	fill(100, 0,0);
	rect(0, 0, carWidth, carHeight);

	if (keyIsDown(RIGHT_ARROW)) {
		angle += rotateRate;
		goToPoint = goToPoint.rotate(rotateRate);
	}
	if (keyIsDown(LEFT_ARROW)) {
		angle -= rotateRate;
		goToPoint = goToPoint.rotate(-rotateRate);
	}
	if (keyIsDown(DOWN_ARROW)) {
		acc.x += goToPoint.x;
		acc.y += goToPoint.y;
	}
	if (keyIsDown(UP_ARROW)) {
		acc.x -= goToPoint.x;
		acc.y -= goToPoint.y;
	}
}

function trafficCone(_x, _y){
	this.x = _x;
	this.y = _y;

	this.show = function(){
		strokeWeight(1);
		stroke(0);
		fill(200,100,0);
		ellipse(this.x, this.y, 30, 30);
		fill(250);
		ellipse(this.x, this.y, 20, 20);
		fill(200,100,0);
		ellipse(this.x, this.y, 10, 10);
	}

	this.hit = function(){
		if(dist(this.x, this.y, carX+carWidth/2, carY+carHeight/2) < 20){
			crashed = true;
		}
		if(dist(this.x, this.y, carX-carWidth/2, carY+carHeight/2) < 20){
			crashed = true;
		}
		if(dist(this.x, this.y, carX+carWidth/2, carY-carHeight/2) < 20){
			crashed = true;
		}
		if(dist(this.x, this.y, carX-carWidth/2, carY-carHeight/2) < 20){
			crashed = true;
		}
	}
}

function Coin(_x, _y){
	this.x = _x;
	this.y = _y;

	this.show = function(){
		strokeWeight(1);
		stroke(0);
		fill(200,200,0);
		ellipse(this.x, this.y, 30, 30);
	}

	this.hit = function(){
		var myNextSpot = createVector(random(15, width-15), random(15, height-15));
		var nextSpot = createVector(random(15, width-15), random(15, height-15));
		//////////////////------------------------
		if(dist(nextSpot.x, nextSpot.y, carX+carWidth/2, carY+carHeight/2) < 40){
			nextSpot.x -= 50;
		}
		if(dist(nextSpot.x, nextSpot.y, carX-carWidth/2, carY+carHeight/2) < 40){
			nextSpot.x -= 50;
		}
		if(dist(nextSpot.x, nextSpot.y, carX+carWidth/2, carY-carHeight/2) < 40){
			nextSpot.x -= 50;
		}
		if(dist(nextSpot.x, nextSpot.y, carX-carWidth/2, carY-carHeight/2) < 40){
			nextSpot.x -= 50;
		}
		//////////////////-------------------
		if(dist(this.x, this.y, carX+carWidth/2, carY+carHeight/2) < 20){
			cones.push(new trafficCone(nextSpot.x, nextSpot.y));
			this.x = myNextSpot.x;
			this.y = myNextSpot.y;
		}
		if(dist(this.x, this.y, carX-carWidth/2, carY+carHeight/2) < 20){
			cones.push(new trafficCone(nextSpot.x, nextSpot.y));
			this.x = myNextSpot.x;
			this.y = myNextSpot.y;
		}
		if(dist(this.x, this.y, carX+carWidth/2, carY-carHeight/2) < 20){
			cones.push(new trafficCone(nextSpot.x, nextSpot.y));
			this.x = myNextSpot.x;
			this.y = myNextSpot.y;
		}
		if(dist(this.x, this.y, carX-carWidth/2, carY-carHeight/2) < 20){
			cones.push(new trafficCone(nextSpot.x, nextSpot.y));
			this.x = myNextSpot.x;
			this.y = myNextSpot.y;
		}
	}
}

function StartReset(){
	cones.splice(cones.Length);
	crashed = false;
	carX = width/2;
	carY = height/2;
	vel = createVector(0,0);
	angle = 0;
	acc = createVector(0,0);
	goToPoint = createVector(0, 0.05);
	cones.push(new trafficCone(100, 200));
	cones.push(new Coin(200, 200));
}
