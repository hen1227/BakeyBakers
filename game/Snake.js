var unit = 15;
var count;
var mods = [];
var x = 330,y = 330;
var dir = "Left";
var count = 0;
var pickupx = 300,pickupy = 300;
var red = false;
var pickupred = true;
var stopLoop;

function setup() {
  frameRate(8);
  createCanvas(600, 600);
  noStroke();
  rectMode(CENTER);
  mods.push(new Module(-50,-50,mods.length));


}

function draw() {
  count++;
  if(x/15 > y/15){
    red = true;
  }else{
    red = false;
  }
  if(pickupx/15 > pickupy/15){
    pickupred = true;
  }else{
    pickupred = false;
  }
  background(0);
  if(dist(x,y,pickupx,pickupy)<15){
    print(mods.length);
    mods.push(new Module(-50,-50,mods.length));
    pickupx = round(random((width/15)-1,1))*15;
    pickupy = round(random((height/15)-1,1))*15;
  }
  // for (var i = width/15; i > -1; i--) {
  //   for(var j = height/15; i > -1; i--){
  //     stroke(50);
  //     line(j*15, 0, j*15,height);
  //     line(0, i*15, width, i*15);
  //   }
  // }
  for (var i = width/15; i > -1; i--) {
    for(var j = height/15; i > -1; i--){
      stroke(255,0,0);
      line(i*15,j*15,0,0);
    }

  }
  for(var i = height/15; i > -1; i--){
      stroke(0,0,255);
      line(0, 0, width, i*15);
      stroke(0);
    }
    fill(0,0,255);
    if(pickupred){
      fill(255,0,0)
    }
  rect(pickupx,pickupy,15,15);
  for (var i = mods.length-1; i > -1; i--) {
      mods[i].update();
      mods[i].draw();
      mods[i].check();
      if(i > 1){
        mods[i].hit();
      }
    }
    if(stopLoop){
      x = 330;
      y = 330;
      stopLoop = false;
      for (var i = mods.length-1; i > 0; i--) {
        mods.splice(i, 1);
      }
    }

  if(dir === "Up"){
    y -= 15;
  }
  if(dir === "Down"){
    y += 15 ;
  }
  if(dir === "Right"){
    x += 15 ;
  }
  if(dir === "Left"){
    x -= 15 ;
  }
  if(y < 0){
    y = height;
  }
  if(x < 0){
    x = width-15;
  }
  if(y > height){
    y = 15;
  }
  if(x > width){
    x = 15;
  }
  fill(255,0,0);
  textSize(30);
  text("Score: " + mods.length, 560, 10);
  fill(0,0,255);
  if(red){
    fill(255,0,0)
  }
  ellipse(x, y, 10, 10);
}


function Module(_x,_y,myval) {
  this.x = _x;
  this.y = _y;
  this.val = myval;
  this.myred = true;
  this.size = 10;
  this.destroyed = false;
}

// Custom method for updating the variables
Module.prototype.update = function() {
  if(this.val > 0){
    if(dir === "Up"){
      this.y = mods[this.val-1].y;
      this.x = mods[this.val-1].x;
    }
    if(dir === "Down"){
      this.y = mods[this.val-1].y;
      this.x = mods[this.val-1].x;
    }
    if(dir === "Right"){
      this.x = mods[this.val-1].x;
      this.y = mods[this.val-1].y;
    }
    if(dir === "Left"){
      this.x = mods[this.val-1].x;
      this.y = mods[this.val-1].y;
    }
    //this.y = mods[this.val-1].y;
}else{
  this.x = x;
  this.y = y;
}
}
Module.prototype.check = function() {
  if(this.x/15 > this.y/15){
    this.myred = true;
  }else{
    this.myred = false;
  }
}

Module.prototype.hit = function() {
  if(dist(x, y, this.x, this.y) < 1){
    for(var i = mods.length-1; i > -1; i--){
      stopLoop = true;
    }
  }
}

// Custom method for drawing the object
Module.prototype.draw = function() {
  fill(0,0,255);
  if(this.myred){
    fill(255,0,0)
  }
  ellipse(this.x, this.y, this.size, this.size);
}

function keyPressed(){
  if (keyCode === UP_ARROW) {
    if(dir !== "Down"){
      dir = "Up";
    }
  } else if (keyCode === DOWN_ARROW) {
    if(dir !== "Up"){
   dir = "Down";
  }
}
  if (keyCode === LEFT_ARROW) {
    if(dir !== "Right"){
  dir = "Left";
}
  } else if (keyCode === RIGHT_ARROW) {
    if(dir !== "Left"){
    dir = "Right";
  }
}
}

// function mousePressed(){
//   mods.push(new Module(-50,-50,mods.length));
// }
