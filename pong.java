int speed = 5;
float ballx = 0;
float bally = 0;
float balldx = speed;
float balldy = speed + 1;
int pady = 0;
int padx = 800;
int score = 0;
String s = "";
int x = 340;
int y = 400;
int w = 140;
int h = 50;



void draw() {
 background(255);
 
 
 text(s, 380, 385, 440, 355);
 
 ellipse(ballx, bally, 100, 100);
 
 rect(padx, pady, 10, 150);
 
   if (collision()) {
    balldx = -Math.abs(balldx);
    score = score + 1;
    print(" you saved ");
    print(score);
    text("score", 410, 370);
  }
 
  if (bally + 50 > height) {
    balldy = -Math.abs(balldy);
  }
  if (bally < 50) {
    balldy = Math.abs(balldy);
  }
  if (ballx < 50) {
    balldx = Math.abs(balldx);
  }

  if (ballx > width) {
    ballx = 0;
    fill(random(255), random(255), random(255));
  }
  
   ballx = ballx + balldx;
   bally = bally + balldy;
}
  boolean collision()  {
  boolean returnValue = false;

if ((ballx + 50 >= padx) && (ballx <= padx + 10)) {
if ((bally >= pady) && (bally <= pady + 150)) 
{
returnValue = true;
}
}
return returnValue;
}

void keyPressed() {
  if (key == 's') {
    if(pady - 150 < height)
    pady = pady + 10;
    }

  if (key == 'w') {
    if(pady > 0) {
    pady = pady - 10;
    }
  }
  
  if(score == 5) {
    boolean returnValue = true;
    
  }
}

void setup() {
 size(820, 740); 
}
