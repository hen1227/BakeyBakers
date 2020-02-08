var peices = [];
var turn = 2;
var theSize = 60;
var rows = 6;
var cols = 7;
var myTurn = 0;
var newPeiceX = 0;

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


  socket = io.connect('http://localhost:0004');
  socket.on("newPlacePeice", placedPeice);
  socket.on("newMessage", receivedMessage);
  socket.on("newPlacing", newPlacing);

  socket.on("newConnect", newConnect);


  theSize = (width/(cols));
  rectMode(CENTER);
  // peices.push(placePeice(mouseX, mouseY, turn));
  var GiveIndex = 0;
  for(var j = 0; j < rows; j++){
    for(var i = 0; i < cols; i++){
      GiveIndex++;
      peices.push(new placePeice(i*theSize+theSize/2, j*theSize+(theSize*1.5), GiveIndex));
    }
  }

}

var socket;
// var fs = require('fs');

function preload(){

  // myData = loadJSON("learnedData.json");
}


function sendMessage(){
  // sendingData = getElementById('text');
  socket.emit('newMessage', sendingData);
}

function placedPeice(data){
  if(myTurn != turn){
    for(var i = 0; i < peices.length; i++){
      peices[i].place(data);
    }
  }
}

function newConnect(data){
  console.log("Connected as player " + data);

  document.getElementById('PlayerTag').innerHTML = "You are player "+data;
  myTurn = data;
}


function receivedMessage(data){
  getElementById('OutPut').innerHTML = getElementById('OutPut').innerHTML <br> + data;
  console.log('I have received A message');
}

function newPlacing(data){
  // console.log(data);
  if(myTurn != turn){
    newPeiceX = data;
  }
}


function draw(){
  background(0,0,200);
  fill(70, 0, 255);

  if(myTurn == 1){
    fill(playerOneColor.a, playerOneColor.b, playerOneColor.c);
  }else if(myTurn == 2){
    fill(playerTwoColor.a, playerTwoColor.b, playerTwoColor.c);
  }else{
    noFill();
  }
  ellipse(10, 10, 15, 15);
  // rect(width/2, height/2 + height/16, width/8 * 7.2, height/8 * 6.2);
  if(myTurn == turn){
    newPeiceX = mouseX;
  }
  if(turn == 1){
    fill(playerOneColor.a, playerOneColor.b, playerOneColor.c);
  }else{
    fill(playerTwoColor.a, playerTwoColor.b, playerTwoColor.c);
  }
  if(newPeiceX < theSize){
    newPeiceX = theSize;
  }
  if(newPeiceX > width - theSize){
    newPeiceX = width - theSize;
  }
    ellipse(newPeiceX, theSize, theSize);


  // console.log(peices);
  for(var i = peices.length-1; i > -1; i--){
    peices[i].show();
  }

  if(frameCount % 2 == 1){
    socket.emit('newPlacing', mouseX);
  }
}

function mousePressed(){
  // console.log(myTurn);
  if(myTurn == turn){
    for(var i = 0; i < peices.length; i++){
      socket.emit('placedPeice', mouseX);
      peices[i].place(mouseX);
    }
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
      if(dist(this.x, this.y, _XX, theSize*1.5) < theSize/2){
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
