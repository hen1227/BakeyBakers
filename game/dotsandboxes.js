var mods = [];
var spacing = 30;
var player1 = false;
var changer = false;
var ready = false;

function setup(){
  createCanvas(600,600);
  rectMode(CENTER);
  for(var i = 18; i > 0; i--){
    for(var j = 18; j > 0; j--){
      mods.push(new Module(spacing + spacing*i, spacing + spacing*j));
    }
  }
}

function draw(){
  background(0);
  for(var i = 0; i < mods.length; i++){
    mods[i].show();
  }
  if(changer){
    if(ready){
      change();
      ready = false;
      changer = false;
    }
  }
  if(player1){
    fill(255,0,0);
    ellipse(15,15,25,25);
  }else{
    fill(0,0,255);
    ellipse(15,15,25,25);
  }
}

function Module(_x,_y) {
  this.x = _x;
  this.y = _y;
  this.size = spacing/2.5;
  this.destroyed = false;
  this.used1 = false;
  this.used2 = false;
  this.used3 = false;
  this.used4 = false;
  this.done = "none";
}

Module.prototype.use = function() {
  if(dist(mouseX,mouseY,this.x,this.y - spacing/2)<spacing/4){
    if(!this.used2){
      this.used2 = true;
      changer = true;
    }
  }
  if(dist(mouseX,mouseY,this.x - spacing/2,this.y)<spacing/4){
    if(!this.used1){
      this.used1 = true;
      changer = true;
    }
  }
  if(dist(mouseX,mouseY,this.x - spacing/2,this.y - spacing)<spacing/4){
    if(!this.used3){
      this.used3 = true;
      changer = true;
    }
  }
  if(dist(mouseX,mouseY,this.x - spacing,this.y - spacing/2)<spacing/4){
    if(!this.used4){
      this.used4 = true;
      changer = true;
    }
  }
}

Module.prototype.show = function() {
  if(!this.destroyed){
////    stroke(200, 0, 100);
  //  fill(200, 0, 100)
  //  ellipse(this.x, this.y, this.size, this.size);
    if(this.used1){
      strokeWeight(2);
      stroke(255,0,0);
      line(this.x,this.y,this.x-spacing,this.y);
    }else{
      strokeWeight(1);
      stroke(150);
      line(this.x,this.y,this.x-spacing,this.y);
    }
    if(this.used2){
      strokeWeight(2);
      stroke(255,0,0);
      line(this.x,this.y,this.x,this.y-spacing);
    }else{
      strokeWeight(1);
      stroke(150);
      line(this.x,this.y,this.x,this.y-spacing);
    }
    if(this.used3){
      strokeWeight(2);
      stroke(255,0,0);
      line(this.x,this.y-spacing,this.x-spacing,this.y-spacing);
    }else{
      strokeWeight(1);
      stroke(150);
      line(this.x,this.y-spacing,this.x-spacing,this.y-spacing);
    }
  if(this.used4){
    strokeWeight(2);
    stroke(255,0,0);
    line(this.x-spacing,this.y,this.x-spacing,this.y-spacing);
  }else{
    strokeWeight(1);
    stroke(150);
    line(this.x-spacing,this.y,this.x-spacing,this.y-spacing);
  }
  if(this.done == "none"){
    if(this.used1 && this.used2 && this.used3 && this.used4){
      changer = false;
      if(player1){
        this.done = "1";
      }else{
        this.done = "2";
      }
    }
  }
  if(this.done == "1"){
    fill(255,0,0);
    rect(this.x-spacing/2, this.y-spacing/2, spacing,spacing);
  }else if (this.done == "2") {
    fill(0,0,255);
    stroke(0,0,255);
    rect(this.x-spacing/2, this.y-spacing/2, spacing,spacing);
  }
  }
}

function mousePressed(){
  ready = true;
  for(var i = 0; i < mods.length; i++){
    mods[i].use();
  }
}

function change(){
  if(player1){
    player1 = false;
  }else{
    player1 = true;
  }
}
