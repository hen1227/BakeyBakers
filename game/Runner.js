var TheSize = 30;
var groundY = 31;
var backGroundX = 0;
var characterX = 30;
var characterY = 100;
var characterVel = 0;
var characterAccelRate = 1;
var onGround = false;
var characterDied = false;
var movedBy = 0;
var amount_of_levels = 5;
var CanMoveLeft = false;
var CanMoveRight = false;
let rects = [];
let enemys = [];
let shots = [];
let BlockImage1;
let CannonImage;
let SpikesImage;
let BackgroundImage;
var movingSpeed = 4;
let whatLevelNext = [];
var myPowerUp = 2;
var myPowerUpWarring = false;
var myPowerUpTimeOut = 0;
var myPowerUpInUse = false;
var levelCountTimeOut = 0;
var avgDelay = 200;

var texturesAre = 1;

function setup() {
	createCanvas(windowWidth-50, windowHeight-100);
	rectMode(CENTER);
	// BackgroundImage = loadImage('https://bakeybakers.com/GamePictures/RBackground.jpg');
	CannonImage = loadImage('https://bakeybakers.com/GamePictures/Cannon.png');
	BlockImage1 = loadImage('https://bakeybakers.com/GamePictures/Block.png');
	SpikesImage = loadImage('https://bakeybakers.com/GamePictures/Spikes.png');

	for (var i = 1; i < amount_of_levels; i++) {
		whatLevelNext.push(i);
	}
	// print(whatLevelNext);
	whatLevelNext = shuffle(whatLevelNext);
	// print(whatLevelNext);
	ChooseLevel();
	// placeSector6();
}

function draw() {
	// if (texturesAre == 1) {
	// 	window.addEventListener("offline", function(e) {texturesAre = 0;});
	// } else if (texturesAre == 0) {
	// 	window.addEventListener("online", function(e) {texturesAre = 1;});
	// }
		// if(texturesAre == 1){
	// 	if(backGroundX < -width){
	// 		backGroundX = 0;
	// 	}
	// 	image(BackgroundImage, backGroundX, 0, width, height);
	// 	// rect(width+backGroundX, height/2, width, height);
	// 	image(BackgroundImage, width+backGroundX, 0, width, height);
	// }
	background(30);
	if(myPowerUp == 2 && !onGround){
		noStroke();
		myPowerUpInUse = false;
		if(myPowerUpTimeOut < 800)
		{
			fill(0,255,0, 100);
		}else{
			fill(0,100,30, 100);
		}
		rect(characterX, characterY - (characterVel) + 10, TheSize, TheSize);
	}
	stroke(0);
	fill(200);
	rect(characterX, characterY, TheSize, TheSize);
	fill(0);
	rect(width / 2, height - groundY / 4, width, groundY / 2);


	for (var j = enemys.length - 1; j > -1; j--) {
		if (!enemys[j].died) {
			enemys[j].show();
			enemys[j].hitting();
			if (enemys[j].shoter) {
				//enemys[j].shooting();
			}
			if (enemys[j].x < -10) {
				enemys.splice(j, 1);
			}
		}
	}

	for (var k = shots.length - 1; k > -1; k--) {
		shots[k].show();
		shots[k].hit();
		shots[k].move();
		if (shots[k].x < -10) {
			shots.splice(k, 1);
		}
	}

	CanMoveLeft = true;
	CanMoveRight = true;

	for (var i = rects.length - 1; i > -1; i--) {
		rects[i].show();
		rects[i].hit();
		if (rects[i].x < -10 || rects[i].died) {
			rects.splice(i, 1);
		}
	}

	onGround = false;
	for (var p = 0; p < rects.length; p++) {
		if (rects[p].touchingPlayer) {
			onGround = true;
			characterY = rects[p].y - rects[p].size + 1;
		}
	}

	if (keyIsDown(DOWN_ARROW)) {
		if(myPowerUp == 1){
			myPowerUpTimeOut = 0;
			myPowerUpInUse = true;
			myPowerUp = 0;
		}
	}

	if(myPowerUpInUse){
		CanMoveLeft = false;
		CanMoveRight = false;
		// print(myPowerUpTimeOut);
		myPowerUpTimeOut++;
			fill(255,0,255,100);
		if(myPowerUpTimeOut > 100){
			rect(characterX+width*5, characterY, width*10, 10);
			}else{
				ellipse(characterX, characterY, myPowerUpTimeOut, myPowerUpTimeOut);
		}
		if(myPowerUpTimeOut > 200){
			myPowerUpInUse = false;
		}

	}
	// if (keyIsDown(LEFT_ARROW)) {
	// 	if (CanMoveLeft) {
	// 		if (characterX < 20) {} else {
	// 			characterX -= movingSpeed;
	// 		}
	// 	}
	// }
		if (CanMoveRight) {
			if (characterX > 197) {
				Moving(movingSpeed);
			} else {
				characterX += movingSpeed;
		}
	}else{
		reset();
	}
	// characterX += movingSpeed;
	// print(levelCountTimeOut);
	if (levelCountTimeOut > width+10) {
		ChooseLevel();
		levelCountTimeOut = 0;
		// placeSector1();
	}

	if(!myPowerUpInUse){
		if (keyIsDown(UP_ARROW)) {
			if (characterY > height - groundY || onGround) {
				if(myPowerUp == 2){
					characterY -= 10;
					characterVel = -22;
					onGround = false;
				}else{
					characterY -= 10;
					characterVel = -19;
					onGround = false;
				}
			}
		}
	if (characterY < height - groundY) {
		if (onGround) {
			characterVel = 0;
		} else {
			characterY += characterVel;
			if (characterVel < 10) {
				characterVel += characterAccelRate;
			}
		}
	} else {
		characterY = height - groundY + 1;
	}
	if (characterY < groundY) {
			characterVel = 0;
			characterY = groundY+1;
		}
	}
	if(myPowerUp == 2){
		myPowerUpTimeOut++;
		if(myPowerUpTimeOut > 1000)
		{
			myPowerUp = 0;
		}
	}
	if (characterDied) {
		reset();
	}
}

//--------------------------------------------------------------------------//

function Moving(MoveBy) {
	var movingBy = MoveBy;
	movedBy += movingBy;
	backGroundX -= movingBy;
		levelCountTimeOut += movingBy;
	for (var i = 0; i < rects.length; i++) {
		rects[i].x -= movingBy;
	}
	for (var j = 0; j < enemys.length; j++) {
		enemys[j].x -= movingBy;
	}
	// for (var k = 0; k < shots.length; k++) {
	// 	shots[k].x -= movingBy;
	// }
	// for (var j = 0; j < enemys.length; j++) {
	// 	enemys[j].x -= movingBy;
	// }
}

function Platform(x_, y_) {
	this.x = x_;
	this.y = y_;
	this.size = TheSize;
	this.died = false;
	this.touchingPlayer = false;

	this.show = function() {
		if (texturesAre == 0) {
			fill(0);
			rect(this.x, this.y, this.size, this.size);
		} else if (texturesAre == 1) {
			fill(0);
			image(BlockImage1, this.x - TheSize / 2, this.y - TheSize / 2);
		}
	}

	this.hit = function() {
		// || dist(this.x, this.y, characterX, characterY) < this.size/2
		if (characterX < this.x + this.size && characterX > this.x - this.size && characterY + this.size / 2 < this.y + this.size / 2 && characterY + this.size / 2 > this.y - this.size / 2) {
			this.touchingPlayer = true;
			characterY = this.y - this.size + 1;
		} else if (characterX < this.x + this.size && characterX > this.x - this.size && characterY - this.size / 2 < this.y + this.size / 2 && characterY - this.size / 2 > this.y - this.size / 2) {
			CharacterDied = true;
			characterVel = 1;
		} else {
			this.touchingPlayer = false;
		}
		if (characterX > this.x && dist(this.x, this.y, characterX, characterY) < this.size - 1) {
			CanMoveLeft = false;
		}
		if (characterX < this.x && dist(this.x, this.y, characterX, characterY) < this.size - 1) {
			CanMoveRight = false;
		}
		if(myPowerUpInUse){
			// print(round(characterY/TheSize));myPowerUp == 1 &&
				// print(myPowerUpTimeOut);

			if(myPowerUpTimeOut > 99){
				// print("2");
				if(round(this.y/TheSize) == round((characterY/TheSize))){
					this.died = true;
				}
			}
		}
	}
}

//----------------------------------
function Enemy(x_, y_, S_, Delay_) {
	this.x = x_;
	this.y = y_;
	this.size = TheSize - TheSize / 4;
	this.died = false;
	this.shoter = false;
	this.Delay = Delay_;
	if (S_ == 1) {
		this.shoter = true;
	}

	this.show = function() {
		if (texturesAre == 0) {
			fill(0);
			ellipse(this.x, this.y, this.size / 2, this.size / 2);
		} else if (texturesAre == 1) {
			image(CannonImage, this.x - TheSize / 2, this.y - TheSize / 2);
		}
		if (frameCount % avgDelay == this.Delay) {
			shots.push(new ashot(this.x - TheSize / 2, this.y));
		}
	}

	this.hitting = function() {
		if (characterX < this.x + this.size && characterX > this.x - this.size && characterY + this.size / 2 < this.y + this.size / 2 && characterY + this.size / 2 > this.y - this.size / 2) {
			this.died = true;
		} else if (characterX < this.x + this.size && characterX > this.x - this.size && characterY - this.size / 2 < this.y + this.size / 2 && characterY - this.size / 2 > this.y - this.size / 2) {
			characterDied = true;
			characterVel = 1;
		}
		if(myPowerUpInUse){
			// && myPowerUpTimeOut > 101
			if(myPowerUp == 1 && myPowerUpTimeOut > 101){
				if(round(this.y/TheSize) == round(characterY/TheSize)){
					this.died = true;
				}
			}
		}
	}
}

function Spikes(x_, y_) {
	this.x = x_;
	this.y = y_;
	this.size = TheSize;
	this.died = false;

	this.show = function() {
		if (texturesAre == 0) {
			fill(140);
			rect(this.x, this.y, this.size, this.size);
		} else if (texturesAre == 1) {
			image(SpikesImage, this.x - TheSize / 2, this.y - TheSize / 2);
		}
	}

	this.hitting = function() {
		if (characterX < this.x + this.size && characterX > this.x - this.size && characterY + this.size / 2 < this.y + this.size / 2 && characterY + this.size / 2 > this.y - this.size / 2) {
			characterDied = true;
		} else if (characterX < this.x + this.size && characterX > this.x - this.size && characterY - this.size / 2 < this.y + this.size / 2 && characterY - this.size / 2 > this.y - this.size / 2) {
			characterVel = 1;
		}
		if (dist(this.x, this.y, characterX, characterY) < this.size / 2) {
			characterDied = true;
		}
	}
}


function ashot(_x, _y) {
	this.x = _x;
	this.y = _y;
	this.size = TheSize / 5;


	this.move = function() {
		this.x -= 5;

	}
	this.show = function() {
		fill(200);
		ellipse(this.x, this.y, this.size, this.size);

	}
	this.hit = function()

	{
		if (dist(characterX, characterY, this.x, this.y) < this.size + TheSize / 2) {
			characterDied = true;
		}
	}

}

function reset() {
	myPowerUp = 0;
	levelCountTimeOut = 0;
	myPowerUpInUse = false;
	myPowerUpTimeOut = 0;
	myPowerUpWarring = false;
	movedBy = 0;
	characterDied = false;
	characterX = 30;
	characterY = 100;
	//PlayedLevels.splice(PlayedLevels.length);
	enemys.splice(enemys.Length);
	rects.splice(rects.Length);
	shots.splice(shots.Length);
	whatLevelNext.splice(whatLevelNext.Length);
	for (var i = 0; i < amount_of_levels; i++) {
		whatLevelNext.push(i);
	}
	// print(whatLevelNext);
	whatLevelNext = shuffle(whatLevelNext);
	// print(whatLevelNext);
	ChooseLevel();
}


function ChooseLevel() {
	if (whatLevelNext[0] == 5) {
		placeSector5();
	} else if (whatLevelNext[0] == 1) {
		placeSector1();
	} else if (whatLevelNext[0] == 2) {
		placeSector2();
	} else if (whatLevelNext[0] == 3) {
		placeSector3();
	} else if (whatLevelNext[0] == 4) {
		placeSector4();
	}else if (whatLevelNext[0] == 6) {
		placeSector6();
	}
		// print(whatLevelNext);
	whatLevelNext.splice(0, 1);
		// print(whatLevelNext);
}

function shuffle(a) {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}
