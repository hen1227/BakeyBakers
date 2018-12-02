var mods = [];
var spacing = 25;
var rows;
var cols;
var bx = 300;
var by = 300;
var bsize = spacing/2;
var dropped = false;
var vel = 0;
var xvel;
var acel = 0.4;

function setup() {
  createCanvas(600,600)
  rows = (height-(spacing*2))/spacing+1;
  cols = width/spacing - 2;
  for(var i = 0; i < rows; i++){
    for(var j = 4; j < cols; j++){
      var x = 10;
      if(j %  2 == 1){
         x = i *spacing + spacing;
      }else{
        x = i *spacing + spacing*1.5;
      }
      mods.push(new Module(x, j*spacing));
    }
  }
}

function draw() {
  background(0);
  if(!dropped){
    bx = mouseX;
    by = spacing*2;
    vel = 0;
    xvel = random(-0.3, 0.3);
      for(var i = 0; i < mods.length; i++){
        mods[i].destroyed = false;
      }
    if(bx > width-(spacing*2)){
      bx = width-(spacing*2);
    }
    if(bx < spacing*2){
      bx = spacing*2;
    }
  }else{
    by += vel;
    vel += acel;
    bx += xvel;
    if(bx > width-(spacing*1.5)){
      xvel = -abs(xvel);
    }
    if(bx < spacing*1.5){
      xvel = abs(xvel);
    }
    if(by > height - spacing/2){
      dropped = false;
      if(bx < width/5)
         {
         place = "One"
         }else if(bx < width/5*2)
         {
         place = "Two"
         }else if(bx < width/5*3)
         {
         place = "Three"
         }else if(bx < width/5*4)
         {
         place = "Four"
         }else if(bx < width)
         {
         place = "Five"
         }
      
      
      
    }
  }
  for(var i = 0; i < mods.length; i++){
    mods[i].draw();
    mods[i].hit();
  }
  fill(0,255,0);
  ellipse(bx,by,bsize,bsize);
}

function Module(_x,_y) {
  this.x = _x;
  this.y = _y;
  this.size = spacing/2.5;
  this.destroyed = false;
}

Module.prototype.draw = function() {
  if(!this.destroyed){
    fill(200, 0, 100)
    ellipse(this.x, this.y, this.size, this.size);
  }
}

Module.prototype.hit = function() {
  if(!this.destroyed){
    if(dist(bx, by, this.x,this.y) < spacing/2){
      xvel = (bx - this.x)/5;
      this.destroyed = true;
      vel = -abs(vel) + acel*4;
    }
  }
}

function mouseReleased(){
  dropped = true;
}
