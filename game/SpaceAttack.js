var pause = true;
var stars  = [];
var powerups = 0;
var starmove =  false;
//1 == sheild
//2 == fastfiring
//3 == spreadshot
//4 == health
var C = [];
var AD = 0;
var PU = [];
var shots = [];
var F = [];
var shipx;
var shipy;
var shottimeout = 0;
var shot_delay = 30;
var A = [];
var shipmaxhealth = 108;
var shiphealth = shipmaxhealth;
var backgroundcolor = 10;
var score = 0;
var points = 0;

function setup() {
  frameRate(30);
  rectMode(CENTER);
  createCanvas(600, 600);
  shipx = width / 2;
  shipy = height - 40;
	for(var i = 0; i < round(random(10, 25)); i++){
  	stars.push(new star());
  }
}

function draw() {
  if (powerups == 2) {
    shotdelay = 10;
  } else {
    shotdelay = 30;
  }
  if (pause) {
    background(backgroundcolor);
    fill(255);
    textSize(15);
    text("Score: " + points, width - 100, 20);
    textSize(30);
    text("Use arrow keys to move", 20, height / 2-25);
    textSize(25);
    text("Down arrow to heal with heal points", 5, height / 2);
    textSize(30);
    text("Up arrow to space to shot", 20, height / 2+25);
    text("Paused", width / 2 - 60, height - height / 4);
    textSize(25);
    text("Press Esc to Pause or Unpause", 20, height - height / 3);
  } else {
    textSize(12);
    background(backgroundcolor);
    for (var s = stars.length - 1; s > -1; s--) {
      stars[s].show();
      stars[s].move();
    }
    fill(255);
    text(score, 10, 10);
    text(round(map(shiphealth, 0, shipmaxhealth, 0, 100)) + " %", 10, 40);
    ellipse(shipx, shipy, 20, 30);
    textSize(15);
    text("Score: " + points, width - 100, 20);
    noStroke();
    if (powerups != 2) {
      fill(backgroundcolor);
    }
    if(powerups == 3){
      triangle(shipx-8, shipy-20, shipx+8, shipy-20,shipx, shipy+3);
    }else{
    	rect(shipx, shipy - 10, 5, 20);
    }
    if (powerups == 1) {
      noFill();
      stroke(255);
      ellipse(shipx, shipy, 35, 35);
    }
    fill(255, 0, 0)
    stroke(0);
    rectMode(CORNER);
    rect(5, 15, map(shiphealth, 0, shipmaxhealth, 0, width / 8), 10);
    noFill();
    stroke(255);
    rect(5, 15, width / 8, 10);
    rectMode(CENTER);
    fill(255);
    stroke(0);
    for (var d = PU.length - 1; d > -1; d--) {
      PU[d].show();
      PU[d].move();
      PU[d].hit(d);
    }
    for (var i = A.length - 1; i > -1; i--) {
      for (var j = shots.length - 1; j > -1; j--) {
        if (dist(A[i].x, A[i].y, shots[j].x, shots[j].y) < 12) {
          if (A[i].Ma) {
            if (shots[j].a == 0) {
              if (A[i].mutated) {
                A[i] = new explode(A[i].x, A[i].y, i, 250);
                C.push(new coin(A[i].x, A[i].y, 250));
                shots.splice(j, 1);
                if (random(1) < 0.35) {
                  PU.push(new powerup(A[i].x, A[i].y));
                }
              } else {
                A[i] = new explode(A[i].x, A[i].y, i, 100);
                C.push(new coin(A[i].x, A[i].y, 100));
                shots.splice(j, 1);
                if (random(1) < 0.10) {
                  PU.push(new powerup(A[i].x, A[i].y));
                }
              }
            }
          }
        }
      }
      A[i].show();
      A[i].hit(i);
      A[i].move(i);
    }
    for (var f = shots.length - 1; f > -1; f--) {
      if (dist(shipx, shipy, shots[f].x, shots[f].y) < 18) {
        if (shots[f].a == 1) {
          if (powerups == 1) {
            shiphealth -= 10;
          } else {
            shiphealth -= 25;
          }
          shots.splice(f, 1);
        }
      }
    }
    for (var h = 0; h < A.length; h++) {
      if (A[h].y > height - 15) {
        A.splice(h, 1);
        shiphealth -= 10;
      }
    }
    for (var k = 0; k < shots.length; k++) {
      if (shots[k].y < 5) {
        shots.splice(k, 1);
      }
    }
    if (AD % 90 == 1) {
      A.push(new Alien());
    }
    for (var l = 0; l < shots.length; l++) {
      shots[l].show();
      shots[l].move();
    }
		for (var a = 0; a < C.length; a++) {
      C[a].show();
    }
    for (var g = 0; g < F.length; g++) {
      A.splice(F[g], 1);
      F.splice(g, 1);
    }

    if (shiphealth <= 0) {
      reset();
    }
    shottimeout++;
    AD++;
  }
}

function Shot(o, _x, _y, _xv) {
  this.x = _x;
  this.xvel = _xv;
  this.y = _y;
  this.a = o;

  this.show = function() {
    if (this.a == 0) {
      fill(255, 0, 0, 150);
    } else {
      fill(0, 255, 40, 150);
    }
    noStroke();
    ellipse(this.x, this.y, 5, 10);
    fill(255);
    stroke(0);
  }
  this.move = function() {
    this.x += this.xvel;
    if (this.a == 1) {
      this.y += 7;
    } else {
      this.y -= 10;
    }
  }

}

function powerup(_x, _y) {
  this.x = _x;
  this.y = _y;
  this.type = 0;
  this.amount = 3;
  this.fallspeed = 3;
  this.r = random(1);

  if (this.r < 0.33) {
    this.type = 1;
  } else if (this.r > 0.25 && this.r < 0.50) {
    this.type = 2;
  } else if (this.r > 0.50 && this.r < 0.75) {
    this.type = 3;
  }else{
  	this.type = 4;
  }

  this.show = function() {
    rectMode(CENTER);
    rect(this.x, this.y, 15, 15);
    if (this.type == 1) {
      ellipse(this.x, this.y, 13, 13);
    } else if (this.type == 2) {
      stroke(0);
      triangle(this.x - 7, this.y + 7, this.x + 7, this.y + 7, this.x, this.y - 7);
    } else if (this.type == 3) {
      stroke(35);
      strokeWeight(2);
      line(this.x, this.y + 5, this.x - 6, this.y - 7);
      line(this.x, this.y + 5, this.x + 6, this.y - 7);
      line(this.x, this.y + 5, this.x, this.y - 7);
      strokeWeight(1);
    }else{
      rectMode(CENTER);
    	rect(this.x, this.y, 5, 14);
      rect(this.x, this.y, 14, 5);
    }
  }
  this.move = function() {
    this.y += this.fallspeed;
  }
  this.hit = function(_me) {
    if(this.type != 4){
    	if (dist(this.x, this.y, shipx, shipy) < 15) {
     	 powerups = this.type;
      	PU.splice(_me, 1);
    	}
  	}else{
    	if (dist(this.x, this.y, shipx, shipy) < 15) {
     		powerups = 0;
        
      		shiphealth += shipmaxhealth/2;
        if(shiphealth > shipmaxhealth){
          shiphealth = shipmaxhealth;
        }
      	PU.splice(_me, 1);
    	}
    }
  }
}


function Alien() {
  this.x = round(random(width));
  this.y = 0;
  this.Ma = true;
  this.mutated = false;
  if (random(1) < 0.35) {
    this.mutated = true;
  }
  this.fallspeed = 3;
  this.xvel = (round(random(width)) - this.x) / ((height / 4) * this.fallspeed);
  this.switched = true;
  this.switchH = height / 4;
	this.width = 17;
  this.height = this.width;
  this.maxwidth = this.width;
  this.maxheight = this.height;
  this.widthflux = random(5, 10);
  this.heightflux = random(5, 10);
  
  
  
  
  this.show = function() {
    if (this.mutated) {
      fill(186, 85, 211);
      rect(this.x, this.y+5, 5, 20);
      if (random(1) < 0.02) {
        shots.push(new Shot(1, this.x, this.y, 0));
      }
    }
    
    this.width = this.maxwidth + 8 * abs(sin(AD/this.widthflux));
    this.height = this.maxheight + 8 * abs(cos(AD/this.heightflux));
    
    
    fill(186, 85, 211);
    ellipse(this.x, this.y, this.width, this.height);
  }
  this.move = function(_me) {
    if (this.y > this.swicthH) {
      if (this.switched) {
        this.xvel = (round(random(width)) - this.x) / ((height - height / 4) * this.fallspeed);
        this.switched = false;
      }
    }
    this.y += this.fallspeed;
    this.x += this.xvel;
  }

  this.hit = function(_my) {
    if (dist(shipx, shipy, this.x, this.y) < 22) {
      if (powerups == 1) {
        shiphealth -= 20;
      } else {
        shiphealth -= 40;
      }
      A[_my] = new explode(this.x, this.y, _my, -100);
    }
  }
}

function keyPressed() {
  if (keyCode == 32 || keyCode == 38) {
    if (powerups == 3) {
      if (shottimeout > shotdelay) {
        shots.push(new Shot(0, shipx, shipy, -2));
        shots.push(new Shot(0, shipx, shipy, 0));
        shots.push(new Shot(0, shipx, shipy, 2));
        shottimeout = 0;
      }
    } else {
      if (shottimeout > shotdelay) {
        shots.push(new Shot(0, shipx, shipy, 0));
        shottimeout = 0;
      }
    }
  }
  if (keyCode == 37) {
    if (shipx < 15) {} else {
      shipx -= 15;
    }
  }
  if(keyCode == 40){
  	if(score > 1000){
    	if(shiphealth < shipmaxhealth-20){
      	score -= 1000;
        shiphealth += 20;
      }
    }
  }
  if (keyCode == 39) {
    if (shipx > width - 15) {} else {
      shipx += 15;
    }
  }
  if (keyCode == 27) {
    if (pause) {
      pause = false;
    } else {
      pause = true;
    }
  }
}

function explode(_x, _y, _me, _G) {
  this.duriation = 24;
  this.Ma = false;
  this.size = 0;
  this.x = _x;
  this.y = _y;

  this.move = function(_me) {
    if(starmove){
    	this.y += 3;
    }
    if (this.size < this.duriation * 2) {
      this.size += 2;
    } else {
      A.splice(_me, 1);
    }
  }

  this.show = function() {
    fill(255, 50, 0, map(this.size, 0, this.duriation, 255, 150));
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
    fill(255);
    stroke(0);
  }
  this.hit = function() {
    if (dist(shipx, shipy, this.x, this.y) <= this.size / 2 + 12) {
      if (powerups != 1) {
        shiphealth -= 1;
      }
    }
  }
}

function star(){
	this.x = random(width);
  this.y = random(height);
  this.size = random(4, 10);
  
  this.move = function(){
    if(starmove){
  		this.y += 3;
    	if(this.y > height){
    		this.x = random(width);
  			this.y = 0;
	  		this.size = random(4, 10);
    	}
 		}
  }
  
  this.show = function(){
    fill(255, 245, 150);
    
  	ellipse(this.x, this.y, this.size, this.size);
  }
  
}

function coin(_x, _y, _W){
  this.x = _x;
  this.y = _y;
	this.W = _W;
  this.width = 17;
  this.height = this.width;
  this.maxwidth = this.width;
  this.maxheight = this.height;
  this.widthflux = 10;
  
  this.show = function(_me){
    
    this.y += 3.5;
	  this.width = this.maxwidth * abs(sin(AD/this.widthflux));
    fill(255, 245, 0);
  	ellipse(this.x, this.y, this.width, this.height);
    if(dist(this.x, this.y, shipx, shipy) < 25){
      if(shiphealth < shipmaxhealth-1){
    		shiphealth += 2;
      }
      score += this.W;
      points += this.W;
      C.splice(_me, 1);
    }
  }
  
}


function reset() {
  shiphealth = shipmaxhealth;
  shipx = width / 2;
  score = 0;
  points = 0;
  A.splice(0);
  C.splice(0);
  shots.splice(0);
  PU.splice(0);
  powerups = 0;
}
