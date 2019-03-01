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
let translations = [];
var crashed = false;
let cones = [];
var score = 0;
var settingOpen = false;
var time = 0;
//
function setup(){
	createCanvas(windowWidth-50, windowHeight-100);
	carX = width/2;
	carY = height/2;
	rectMode(CENTER);
	goToPoint = createVector(0, 0.05);
	acc = createVector(0, 0);
	vel = createVector(0, 0);
	rotateRate = PI/80;
	// time = random(10, 200);
	time = 125;
	// cones.push(new trafficCone(100, 100));
	cones.push(new Coin(200, 100));
}
//
function draw(){
	if(settingOpen){
		background(time);
		fill(100);
		ellipse(10,10,10,10);
		strokeWeight(3);
		stroke(100);
		line(0,10,20,10);
		line(10,20,10,0);
		line(0,0,20,20);
		line(0,20,20,0);
		fill(0);
		stroke(255);
		textSize(40);
		text("Settings", width/2 - 65, 100);
		ellipse(width/2,400, 200, 200);
		text("Black Out", width/2 - 100, 400);
	}else{
		background(time);
		fill(200);
		ellipse(10,10,10,10);
		strokeWeight(3);
		stroke(100);
		line(0,10,20,10);
		line(10,20,10,0);
		line(0,0,20,20);
		line(0,20,20,0);
		//Walls <<<<<<<<<<------------->>>>>>>>>>
		fill(0);
		line(0, 0, 0, height);
		line(0, height, width, height);
		line(0, 0, width, 0);
		line(width, 0, width, height);
		//Cones <<<<<<<<<<------------->>>>>>>>>>
		for(var i = cones.length-1; i > -1; i--)
		{
			// print(cones);
				cones[i].show();
				cones[i].hit();
				if(cones[i].destroyed)
				{
					// print(cones);
					cones.splice(i, 1);
					// print(cones);
				}
		}
		fill(250);
		text(score, width-40, 40);


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

		// ellipse(0, 0, 100, 100);
		// background(0,x 220);
		if(time < 120){
			fill(255, 100);
			strokeWeight(0);
			triangle(carWidth/2, -carHeight/2, carWidth*1.5, -carHeight*2, -carWidth/2 ,-carHeight*2);
			triangle(-carWidth/2, -carHeight/2, -carWidth*1.5, -carHeight*2, carWidth/2 ,-carHeight*2);
		}
		// ellipse(carWidth/2, carHeight/2, 30, 30);
		// ellipse(-carWidth/2, carHeight/2, 30, 30);
		// ellipse(carWidth/2, -carHeight/2, 10, 30);
		// ellipse(-carWidth/2, -carHeight/2, 30, 30);


		fill(0);
		strokeWeight(1);
		stroke(200);
		ellipse(0 - carWidth/2, 0 - carHeight/5, carWidth/4, carHeight/4);
		ellipse(0 + carWidth/2, 0 - carHeight/5, carWidth/4, carHeight/4);
		ellipse(0 - carWidth/2, 0 + carHeight/3, carWidth/4, carHeight/4);
		ellipse(0 + carWidth/2, 0 + carHeight/3, carWidth/4, carHeight/4);
		fill(100, 0,0);
		stroke(0);
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
			acc.x += goToPoint.x/2;
			acc.y += goToPoint.y/2;
		}
		if (keyIsDown(UP_ARROW)) {
			acc.x -= goToPoint.x;
			acc.y -= goToPoint.y;
		}
	}
}

function trafficCone(_x, _y){
	this.x = _x;
	this.y = _y;
	this.canShow = false;
	this.destroyed = false;

	this.show = function(){
		if(time > 5 || this.canShow)
		{
			strokeWeight(1);
			stroke(0);
			fill(200,100,0);
			ellipse(this.x, this.y, 30, 30);
			fill(250);
			ellipse(this.x, this.y, 20, 20);
			fill(200,100,0);
			ellipse(this.x, this.y, 10, 10);
		}else{
			strokeWeight(0);
			fill(0);
			ellipse(this.x, this.y, 35, 35);
		}
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
var xDir = -500*goToPoint.x;
var yDir = -500*goToPoint.y;
// ellipse(carX + xDir, carY + yDir,10,10);

// translations.push(translate(carX, carY));
// translations.push(rotate(angle));
		if(dist(this.x, this.y, carX + xDir, carY + yDir) < 50 || dist(this.x, this.y, carX + xDir*2, carY + yDir*2) < 50 || dist(this.x, this.y, carX + xDir*3, carY + yDir*3) < 50){
			this.canShow = true;
		}else{
			this.canShow = false;
		}

		// translations.pop();
		// translations.pop();
	}
}

function Coin(_x, _y){
	this.x = _x;
	this.y = _y;
  this.destroyed = false;

	this.show = function(){
		strokeWeight(1);
		stroke(0);
		fill(200,200,0);
		ellipse(this.x, this.y, 30, 30);
	}

	this.hit = function(){
		var goingToSpawn = false;
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
			goingToSpawn = true;
			this.destroyed = true;
			score++;
		}else
		if(dist(this.x, this.y, carX-carWidth/2, carY+carHeight/2) < 20){
			cones.push(new trafficCone(nextSpot.x, nextSpot.y));
			goingToSpawn = true;
			this.destroyed = true;
			score++;
		}else
		if(dist(this.x, this.y, carX+carWidth/2, carY-carHeight/2) < 20){
			cones.push(new trafficCone(nextSpot.x, nextSpot.y));
			goingToSpawn = true;
			this.destroyed = true;
			score++;
		}else
		if(dist(this.x, this.y, carX-carWidth/2, carY-carHeight/2) < 20){
			cones.push(new trafficCone(nextSpot.x, nextSpot.y));
			goingToSpawn = true;
			this.destroyed = true;
			score++;
		}
		if(goingToSpawn){
			while (!spawnCoin(this.x, this.y)) {
			}
			goingToSpawn = false;
		}
	}
}

function mousePressed(){
	if(mouseX < 20 && mouseY < 20){
		settingOpen = !settingOpen;
	}else if(settingOpen && time > 5){
		time = 0;
	}else if(settingOpen){
		time = random(10, 250);
	}
}

function spawnCoin(){
	var toReturn = true;
	var myNextSpot = createVector(random(15, width-15), random(15, height-15));
	for(var i = 0; i < cones.length; i++){
		if(dist(myNextSpot.x, myNextSpot.y, cones[i].x, cones[i].y) < 30){
			toReturn = false;
			// cones.push(new trafficCone(myNextSpot.x, myNextSpot.y));
		}
	}
	if(toReturn){
		cones.push(new Coin(myNextSpot.x, myNextSpot.y));
	}
	return toReturn;
}

function StartReset(){
	time = time;
	// time = random(10, 200);
	cones.splice(cones.Length);
	score = 0;
	crashed = false;
	carX = width/2;
	carY = height/2;
	vel = createVector(0,0);
	angle = 0;
	acc = createVector(0,0);
	goToPoint = createVector(0, 0.05);
	// cones.push(new trafficCone(100, 200));
	cones.push(new Coin(200, 200));
}
