var score = 0;;
var StackX = 0;
var xSize = 75;
var fallingflops = [];
var nextStackHeight = 0;
var Strikes = 0;
var xOffset = 0;

function setup(){
  createCanvas(600, 600);
  nextStackHeight = height/8 * 7;
  fallingflops.push(new flop());
  fallingflops.push(new flop());

  fallingflops[0].hasStacked = true;
  fallingflops[0].y = nextStackHeight;
}

function draw(){
  background(map(score, 0, 150, 230, 0), map(score, 0, 150, 230, 0), map(score, 0, 150, 500, 0));
  rectMode(CENTER);
  text("Score: "+ score, 10, 20);
  fill(255,0,0);
  if(Strikes > 0){
    text("X", width - 30, 20);
  }
  if(Strikes > 1){
    text("X", width - 60, 20);
  }
  if(Strikes > 2){
    text("X", width - 90, 20);
  }
  text("Score: "+ score, 10, 20);

  StackX = mouseX;
  if(StackX < xSize/2)StackX = (xSize/2);
  if(StackX > width - (xSize/2))StackX = width - (xSize/2);

  for(var i = 0; i < fallingflops.length; i++){
    fallingflops[i].show();
  }
}

function flop(){
  this.x = random(xSize/2, width-(xSize/2));
  this.y = 0;
  this.colorR = random(0, 255);
  this.colorG = random(0, 255);
  this.colorB = random(0, 255);
  this.hasStacked = false;
  this.xOffset = 0;

  this.show = function(){
    if(!this.hasStacked){
      this.y += 3 + score/10;
      if(this.y > height - xSize/4){
        Strikes++;
        fallingflops.splice(fallingflops.length-1, 1);
        fallingflops.push(new flop());
        if(Strikes > 3){
          Strikes = 0;
          score = 0;
          xOffset = 0;
          nextStackHeight = height/8 * 7;
          fallingflops = [];
          fallingflops.push(new flop());
          fallingflops.push(new flop());
          fallingflops[0].hasStacked = true;
          fallingflops[0].y = nextStackHeight;
        }
      }
      if(dist(this.x, 0, StackX + xOffset, 0) < xSize && dist(0, this.y, 0, nextStackHeight) < xSize/4 && dist(0, 0, xOffset + (this.x-StackX), 0) < xSize*1.5){
        if(score < 10){
          this.y = nextStackHeight - xSize/4;
          nextStackHeight -= xSize/4;
        }else{
          for(var i = fallingflops.length-1; i > -1; i--){
            fallingflops[i].y += xSize/4;
          }
        }
        score++;
        this.xOffset = this.x-StackX;
        xOffset = this.xOffset;
        this.hasStacked = true;
        this.y = nextStackHeight;
        fallingflops.push(new flop());
      }
    }else{
      this.x = StackX+this.xOffset;
    }
    fill(this.colorR, this.colorG, this.colorB);
    noStroke();
    ellipse(this.x+xSize/2.5, this.y, xSize/4, xSize/4);
    ellipse(this.x-xSize/2.5, this.y, xSize/4, xSize/4);
    rect(this.x, this.y, xSize/4 * 3, xSize/4)
  }
}
