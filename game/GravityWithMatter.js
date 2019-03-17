var Engine = Matter.Engine,
  // Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies;

var engine;
var world;
var boxes = [];

var useCircle = false;

var Statics = [];

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  //Engine.run(engine);
  var options = {
    isStatic: true
  }
  //Ground
  Statics.push(Bodies.rectangle(width/2, height, width, 10, options));
  //Left wall
  Statics.push(Bodies.rectangle(0, height/2, 10, height, options));
  //Right wall
  Statics.push(Bodies.rectangle(width, height/2, 10, height, options));
  //Top
  Statics.push(Bodies.rectangle(width/2, 0, width, 10, options));
  for(var i = 0; i < Statics.length; i++){
    World.add(world, Statics[i]);
  }
  // for (var i = 0; i < 100; i++) {
  // }
}

function keyPressed() {
  if (keyCode == '32') {
    useCircle = !useCircle;
  }
}

function mouseReleased() {
  // print(boxes);
  if(useCircle){
    boxes.push(new Circle(mouseX, mouseY, 10, 10));
  }else
  {
    boxes.push(new Box(mouseX, mouseY, 20, 20));
  }
}

function draw() {
  background(151);
  Engine.update(engine);
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].show();
  }
  noStroke(255);
  fill(255);
  rectMode(CENTER);
  // print(Statics);
  for(var i = 0; i < Statics.length; i++){
    rect(Statics[i].position.x, Statics[i].position.y, Statics[i].vertices[0].x-Statics[i].vertices[3].x,  Statics[i].vertices[0].y - Statics[i].vertices[3].y);
  }

  if (keyIsDown(16)) {
    if(frameCount % 30 == 1){
      if(useCircle){
        boxes.push(new Circle(mouseX, mouseY, 20, 20));
      }else
      {
        boxes.push(new Box(mouseX, mouseY, 40, 40));
      }
    }
  }

}
function Box(x, y, w, h) {
  var options = {
    friction: 0.3,
    restitution: 0.6
  }
  this.body = Bodies.rectangle(x, y, w, h, options);
  this.w = w;
  this.h = h;
  World.add(world, this.body);

  this.show = function() {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    strokeWeight(1);
    stroke(140);
    fill(10);
    rect(0, 0, this.w, this.h);
    pop();
  }

}

function Circle(x, y, w, h) {
  var options = {
    friction: 0.3,
    restitution: 0.6
  }
  this.body = Bodies.circle(x, y, w, options);
  this.w = w;
  this.h = h;
  World.add(world, this.body);

  this.show = function() {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    strokeWeight(1);
    stroke(140);
    fill(10);
    ellipse(0, 0, this.w*2, this.h*2);
    pop();
  }

}
