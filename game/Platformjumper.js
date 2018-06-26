var playerx;
var playery;
var jumpheight = 50;
var bottem;
var platforms = [];
var platformw = 30;
var platformh = 10;
var playersize = 10;
var jumptimeout = 30;
var jumpvel = -5;
var grav = 0.7;
var score = 0;

function setup() {
  rectMode(CENTER);
  createCanvas(800, 300);
  frameRate(15);
  bottem = height - jumpheight;
  playery = bottem - playersize / 2;
  playerx = width / 2;
  platforms.push(new Platform(0));
  platforms.push(new Platform(1));
  platforms.push(new Platform(2));
  platforms.push(new Platform(3));
  platforms.push(new Platform(4));
  platforms.push(new Platform(5));
}

function draw() {
  background(10);
  for (var i = 0; i < platforms.length; i++) {
    platforms[i].show();
  }
  playerx = mouseX;
  ellipse(playerx, playery, playersize, playersize);
  for (var j = 0; j < platforms.length; j++) {
    if (dist(playerx, 0, platforms[j].x, 0) < platformw) {
      if (dist(playery, 0, platforms[j].y, 0) < platformh) {
        jumped();
      }
    }
  }
  jumpvel += grav;
  playery += jumpvel;
	if(playery > height+playersize){
  	score = 0;
    playery = height/2;
    jumpvel = 0;
  }
  text(score, 10, 10);
}

function jumped() {
  jumpvel = -8.5;
  if (playery < bottem * jumpheight) {
    if((bottem - jumpheight)-playery>0){
    	for (var j = 0; j < platforms.length; j++) {
				platforms[j].y += (bottem - jumpheight)-playery;
        if(platforms[j].y > height+platformh){
        	platforms.splice(j, 1);
        }
    	}
	    playery += (bottem - jumpheight)-playery;
      platforms.push(new Platform(5));
      score++;
  	}
  }
}

function Platform(safe) {
  this.x = random(width - platformw / 2);
  if (safe == -1) {
    this.y = random(height);
  } else {
    this.y = bottem - (jumpheight * safe);
    if (safe == 0) {
      this.x = width / 2;
    }
  }
  this.show = function() {
    rect(this.x, this.y, platformw, platformh);
  }
}
