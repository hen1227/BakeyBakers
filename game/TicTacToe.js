var Text1_1 = " ";
var Text1_2 = " ";
var Text1_3 = " ";
var Text2_1 = " ";
var Text2_2 = " ";
var Text2_3 = " ";
var Text3_1 = " ";
var Text3_2 = " ";
var Text3_3 = " ";
// . Row  Col

var TurnX = true;
var placed = 0;

//Win Stats
var XWins = 0;
var OWins = 0;
var Winner = " "


function setup() {
  createCanvas(400, 400);
  var Xwins = 0;
  var OWins = 0;

}

function draw() {
  if (Winner == "X" || Winner == "O") {
    alert("X has won! X: " + XWins + "  O: " + OWins);
    reset();
  }

  background(255);
  
  stroke(0);
  fill(0);
  textSize(10);
  strokeWeight(1);
  ellipse(width-15, height-15, 15, 15);
  fill(255);
  if(TurnX){text("X", width-18, height-12);}else{text("O", width-18, height-12);}
  fill(0);
  strokeWeight(10);
  line(width / 3, 0, width / 3, height);
  line(width / 3 * 2, 0, width / 3 * 2, height);
  line(0, height / 3, width, height / 3);
  line(0, height / 3 * 2, width, height / 3 * 2);
  textSize(100);
  text(Text3_3, width / 6 * 5 - 30, height / 6 * 5 + 40);
  text(Text3_2, width / 6 * 5 - 30, height / 6 * 3 + 40);
  text(Text3_1, width / 6 * 5 - 30, height / 6 * 1 + 40);
  //----
  text(Text2_3, width / 6 * 3 - 30, height / 6 * 5 + 40);
  text(Text2_2, width / 6 * 3 - 30, height / 6 * 3 + 40);
  text(Text2_1, width / 6 * 3 - 30, height / 6 * 1 + 40);
  //----
  text(Text1_3, width / 6 - 30, height / 6 * 5 + 40);
  text(Text1_2, width / 6 - 30, height / 6 * 3 + 40);
  text(Text1_1, width / 6 - 30, height / 6 * 1 + 40);

   if (placed == 9) {
    alert("You have drawed");
    reset();
  }

  //Wins-------------X
  if (Text1_1 == "X" && Text1_2 == "X" && Text1_3 == "X") {
    stroke(255, 0, 0);
    strokeWeight(20);
    line(width / 6, 0, width / 6, height);

    XWins++;
    Winner = "X";
  } else if (Text2_1 == "X" && Text2_2 == "X" && Text2_3 == "X") {
    stroke(255, 0, 0);
    strokeWeight(20);
    line(width / 6 * 3, 0, width / 6 * 3, height);

    XWins++;
    Winner = "X";
  } else if (Text3_1 == "X" && Text3_2 == "X" && Text3_3 == "X") {
    stroke(255, 0, 0);
    strokeWeight(20);
    line(width / 6 * 5, 0, width / 6 * 5, height);

    XWins++;
    Winner = "X";
  } else if (Text1_1 == "X" && Text2_1 == "X" && Text3_1 == "X") {
    stroke(255, 0, 0);
    strokeWeight(20);
    line(0, height / 6, width, height / 6);

    XWins++;
    Winner = "X";
  } else if (Text1_2 == "X" && Text2_2 == "X" && Text3_2 == "X") {
    stroke(255, 0, 0);
    strokeWeight(20);
    line(0, height / 6 * 3, width, height / 6 * 3);

    XWins++;
    Winner = "X";
  } else if (Text1_3 == "X" && Text2_3 == "X" && Text3_3 == "X") {
    stroke(255, 0, 0);
    strokeWeight(20);
    line(0, height / 6 * 5, width, height / 6 * 5);

    XWins++;
    Winner = "X";
  } else if (Text1_1 == "X" && Text2_2 == "X" && Text3_3 == "X") {
    stroke(255, 0, 0);
    strokeWeight(20);
    line(0, 0, width, height);

    XWins++;
    Winner = "X";
  } else if (Text1_3 == "X" && Text2_2 == "X" && Text3_1 == "X") {
    stroke(255, 0, 0);
    strokeWeight(20);
    line(width, 0, 0, height);

    XWins++;
    Winner = "X";
  }

  //Wins-------------O

  if (Text1_1 == "O" && Text1_2 == "O" && Text1_3 == "O") {
    stroke(255, 0, 0);
    strokeWeight(20);
    line(width / 6, 0, width / 6, height);

    OWins++;
    Winner = "O";
  } else if (Text2_1 == "O" && Text2_2 == "O" && Text2_3 == "O") {
    stroke(255, 0, 0);
    strokeWeight(20);
    line(width / 6 * 3, 0, width / 6 * 3, height);

    OWins++;
    Winner = "O";
  } else if (Text3_1 == "O" && Text3_2 == "O" && Text3_3 == "O") {
    stroke(255, 0, 0);
    strokeWeight(20);
    line(width / 6 * 5, 0, width / 6 * 5, height);

    OWins++;
    Winner = "O";
  } else if (Text1_1 == "O" && Text2_1 == "O" && Text3_1 == "O") {
    stroke(255, 0, 0);
    strokeWeight(20);
    line(0, height / 6, width, height / 6);

    OWins++;
    Winner = "O";
  } else if (Text1_2 == "O" && Text2_2 == "O" && Text3_2 == "O") {
    stroke(255, 0, 0);
    strokeWeight(20);
    line(0, height / 6 * 3, width, height / 6 * 3);

    OWins++;
    Winner = "O";
  } else if (Text1_3 == "O" && Text2_3 == "O" && Text3_3 == "O") {
    stroke(255, 0, 0);
    strokeWeight(20);
    line(0, height / 6 * 5, width, height / 6 * 5);

    OWins++;
    Winner = "O";
  } else if (Text1_1 == "O" && Text2_2 == "O" && Text3_3 == "O") {
    stroke(255, 0, 0);
    strokeWeight(20);
    line(0, 0, width, height);

    OWins++;
    Winner = "O";
  } else if (Text1_3 == "O" && Text2_2 == "O" && Text3_1 == "O") {
    stroke(255, 0, 0);
    strokeWeight(20);
    line(width, 0, 0, height);

    OWins++;
    Winner = "O";
  }

}


function doubleClicked() {
  var reseting = confirm("Do you want to reset?");
  if (reseting) {
    XWins = 0;
    OWins = 0;
    reset();
  }
}


function mousePressed() {
  placed++;
  if (dist(mouseX, mouseY, width / 6, height / 6) < 40) {
    if (Text1_1 == " ") {
      if (TurnX) {
        Text1_1 = "X";
      } else {
        Text1_1 = "O";
      }
      TurnX = !TurnX;
    }

  } else if (dist(mouseX, mouseY, width / 6 * 3, height / 6) < 40) {
    if (Text2_1 == " ") {
      if (TurnX) {
        Text2_1 = "X";
      } else {
        Text2_1 = "O";
      }
      TurnX = !TurnX;
    }
  } else if (dist(mouseX, mouseY, width / 6 * 5, height / 6) < 40) {
    if (Text3_1 == " ") {
      if (TurnX) {
        Text3_1 = "X";
      } else {
        Text3_1 = "O";
      }
      TurnX = !TurnX;
    }
  } else if (dist(mouseX, mouseY, width / 6, height / 6 * 3) < 40) {
    if (Text1_2 == " ") {
      if (TurnX) {
        Text1_2 = "X";
      } else {
        Text1_2 = "O";
      }
      TurnX = !TurnX;
    }
  } else if (dist(mouseX, mouseY, width / 6 * 3, height / 6 * 3) < 40) {
    if (Text2_2 == " ") {
      if (TurnX) {
        Text2_2 = "X";
      } else {
        Text2_2 = "O";
      }
      TurnX = !TurnX;
    }
  } else if (dist(mouseX, mouseY, width / 6 * 5, height / 6 * 3) < 40) {
    if (Text3_2 == " ") {
      if (TurnX) {
        Text3_2 = "X";
      } else {
        Text3_2 = "O";
      }
      TurnX = !TurnX;
    }
  } else if (dist(mouseX, mouseY, width / 6, height / 6 * 5) < 40) {
    if (Text1_3 == " ") {
      if (TurnX) {
        Text1_3 = "X";
      } else {
        Text1_3 = "O";
      }
      TurnX = !TurnX;
    }
  } else if (dist(mouseX, mouseY, width / 6 * 3, height / 6 * 5) < 40) {
    if (Text2_3 == " ") {
      if (TurnX) {
        Text2_3 = "X";
      } else {
        Text2_3 = "O";
      }
      TurnX = !TurnX;
    }
  } else if (dist(mouseX, mouseY, width / 6 * 5, height / 6 * 5) < 40) {
    if (Text3_3 == " ") {
      if (TurnX) {
        Text3_3 = "X";
      } else {
        Text3_3 = "O";
      }
      TurnX = !TurnX;
    }
  } else {
    placed--
  }
}

function reset() {
  placed = 0;
  TurnX = true;
  Winner = " ";
  Text1_1 = " ";
  Text1_2 = " ";
  Text1_3 = " ";
  Text2_1 = " ";
  Text2_2 = " ";
  Text2_3 = " ";
  Text3_1 = " ";
  Text3_2 = " ";
  Text3_3 = " ";
}
