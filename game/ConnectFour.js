var peices = [];
var turn = 1;
var theSize = 60;
var rows = 6;
var cols = 7;


//TRADITIONAL RED AND YELLOW
var playerOneColor = new VectorW3(255, 0, 0);
var playerTwoColor = new VectorW3(200, 200, 0);


//RED AND BLACK
// var playerOneColor = new VectorW3(255, 60, 10);
// var playerTwoColor = new VectorW3(40, 40, 40);

// GREEN AND PURPLE
// var playerOneColor = new VectorW3(10, 250, 20);
// var playerTwoColor = new VectorW3(200, 10, 200);



function setup(){
  createCanvas(windowHeight-50, windowHeight-50);
  theSize = (width/(cols));
  rectMode(CENTER);
  // peices.push(placePeice(mouseX, mouseY, turn));
  var GiveIndex = 0;
  for(var j = 0; j < rows; j++){
    for(var i = 0; i < cols; i++){
      GiveIndex++;
      peices.push(new placePeice(i*theSize+theSize/2, j*theSize+theSize*1.5, GiveIndex));
    }
  }

}

function draw(){
  background(0,0,200);
  fill(70, 0, 255);
  // rect(width/2, height/2 + height/16, width/8 * 7.2, height/8 * 6.2);
  if(turn == 1){
    fill(playerOneColor.a, playerOneColor.b, playerOneColor.c);
  }else{
    fill(playerTwoColor.a, playerTwoColor.b, playerTwoColor.c);
  }
  newPeiceX = mouseX;
  if(newPeiceX < theSize){
    newPeiceX = theSize;
  }
  if(newPeiceX > width - theSize){
    newPeiceX = width - theSize;
  }
    ellipse(newPeiceX, theSize, theSize);
  // print(peices);
  for(var i = peices.length-1; i > -1; i--){
    peices[i].show();
  }
}

function mousePressed(){
  for(var i = 0; i < peices.length; i++){
    peices[i].place(mouseX);
  }
}

function placePeice(_x, _y, _index){
  this.x = _x;
  this.y = _y;
  this.hasPiece = false;
  this.index = _index;

  this.show = function() {
    // text(this.index, this.x, this.y);
    fill(250);
    if(this.hasPiece){
      if(this.color == 1){
        fill(playerOneColor.a, playerOneColor.b, playerOneColor.c);
      }else{
        fill(playerTwoColor.a, playerTwoColor.b, playerTwoColor.c);
      }
      if(frameCount % 5 == 1){
        if(this.index < cols*(rows-1)+1){
          if(!peices[this.index+rows].hasPiece){
            // this.index;
            peices[this.index+rows].hasPiece = true;
            peices[this.index+rows].color = this.color;
            this.color = 0;
            this.hasPiece = false;
          }
        }
      }
    }
      ellipse(this.x, this.y, theSize);
  }
  this.place = function(_XX){
    if(!this.hasPiece){
      if(dist(this.x, this.y, _XX, theSize*2) < theSize/2){
        this.hasPiece = true;
        this.color = turn;
        if(turn == 1){
          turn = 2;
        }else{
          turn = 1;
        }
      }
    }
  }
}


function VectorW3(_a, _b, _c){
  this.a = _a;
  this.b = _b;
  this.c = _c;
}
