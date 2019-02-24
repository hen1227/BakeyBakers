function placeSector1()
{
	enemys.push(new Spikes(width+TheSize*4, height - TheSize));
	enemys.push(new Spikes(width+TheSize*3, height - TheSize));
  rects.push(new Platform(width+TheSize*2, height - TheSize*5));
	enemys.push(new Spikes(width+TheSize, height - TheSize));
	enemys.push(new Spikes(width, height - TheSize));
}


function placeSector2()
{
		rects.push(new Platform(width+TheSize*2, height - TheSize*1));
		rects.push(new Platform(width+TheSize*3, height - TheSize*2));
		rects.push(new Platform(width+TheSize*4, height - TheSize*3));
		rects.push(new Platform(width+TheSize*5, height - TheSize*4));
		rects.push(new Platform(width+TheSize*6, height - TheSize*5));
		rects.push(new Platform(width+TheSize*7, height - TheSize*6));
		rects.push(new Platform(width+TheSize*8, height - TheSize*7));
		rects.push(new Platform(width+TheSize*9, height - TheSize*8));
		rects.push(new Platform(width+TheSize*3, height - TheSize*1));
		rects.push(new Platform(width+TheSize*4, height - TheSize*2));
		rects.push(new Platform(width+TheSize*5, height - TheSize*3));
		rects.push(new Platform(width+TheSize*6, height - TheSize*4));
		rects.push(new Platform(width+TheSize*7, height - TheSize*5));
		rects.push(new Platform(width+TheSize*8, height - TheSize*6));
		rects.push(new Platform(width+TheSize*4, height - TheSize*1));
		rects.push(new Platform(width+TheSize*5, height - TheSize*2));
		rects.push(new Platform(width+TheSize*6, height - TheSize*3));
		rects.push(new Platform(width+TheSize*7, height - TheSize*4));
		rects.push(new Platform(width+TheSize*8, height - TheSize*5));
		rects.push(new Platform(width+TheSize*9, height - TheSize*6));
		rects.push(new Platform(width+TheSize*9, height - TheSize*7));
		rects.push(new Platform(width+TheSize*5, height - TheSize*1));
		rects.push(new Platform(width+TheSize*6, height - TheSize*2));
		rects.push(new Platform(width+TheSize*7, height - TheSize*3));
		rects.push(new Platform(width+TheSize*8, height - TheSize*4));
		rects.push(new Platform(width+TheSize*9, height - TheSize*5));
		rects.push(new Platform(width+TheSize*6, height - TheSize*1));
		rects.push(new Platform(width+TheSize*7, height - TheSize*2));
		rects.push(new Platform(width+TheSize*8, height - TheSize*3));
		rects.push(new Platform(width+TheSize*9, height - TheSize*4));
		rects.push(new Platform(width+TheSize*7, height - TheSize*1));
		rects.push(new Platform(width+TheSize*8, height - TheSize*2));
		rects.push(new Platform(width+TheSize*9, height - TheSize*3));
		rects.push(new Platform(width+TheSize*8, height - TheSize*1));
		rects.push(new Platform(width+TheSize*9, height - TheSize*2));
		rects.push(new Platform(width+TheSize*9, height - TheSize*1));
	  enemys.push(new Enemy(width+TheSize*8, height - TheSize*8, 1, 1));
		enemys.push(new Enemy(width+TheSize*6, height - TheSize*6, 1, 1));
		enemys.push(new Enemy(width+TheSize*4, height - TheSize*4, 1, 1));
		enemys.push(new Enemy(width+TheSize*2, height - TheSize*2, 1, 1));
}

function placeSector3()
{
		rects.push(new Platform(width+TheSize*2, height - TheSize*.5));
		rects.push(new Platform(width+TheSize*2, height - TheSize*1.5));
		rects.push(new Platform(width+TheSize*2, height - TheSize*2.5));
		rects.push(new Platform(width+TheSize*2, height - TheSize*3.5));
		rects.push(new Platform(width+TheSize*2, height - TheSize*4.5));
		rects.push(new Platform(width+TheSize*2, height - TheSize*5.5));
		rects.push(new Platform(width+TheSize*2, height -TheSize*6.5));
		rects.push(new Platform(width+TheSize*2, height -TheSize*7.5));;
	  enemys.push(new Enemy(width+TheSize*3.5, height - TheSize*8, 1, 1));
		enemys.push(new Enemy(width+TheSize*3.5, height - TheSize*4.5, 1, 1));
		enemys.push(new Enemy(width+TheSize*3.5, height - TheSize*1, 1, 1));
}

function placeSector4()
{
	enemys.push(new Enemy(width+TheSize*4, height - TheSize*2, 1, 1));
  rects.push(new Platform(width+TheSize*4, height - TheSize));
	enemys.push(new Spikes(width+TheSize*3, height - TheSize));
	rects.push(new Platform(width+TheSize, height - TheSize*6));
	rects.push(new Platform(width+TheSize*2, height - TheSize*6));
	rects.push(new Platform(width+TheSize*3, height - TheSize*6));
	rects.push(new Platform(width+TheSize*4, height - TheSize*6));
	enemys.push(new Spikes(width+TheSize, height - TheSize*7));
	enemys.push(new Spikes(width+TheSize*2, height - TheSize*7));
	enemys.push(new Spikes(width+TheSize*3, height - TheSize*7));
	enemys.push(new Spikes(width+TheSize*4, height - TheSize*7));
}

function placeSector5()
{
	enemys.push(new Enemy(width+TheSize*7, height - TheSize*5, 1, 1));
	rects.push(new Platform(width+TheSize*4, height - TheSize*2));
	rects.push(new Platform(width+TheSize*4, height - TheSize*3));
	rects.push(new Platform(width+TheSize*5, height - TheSize*2));
	rects.push(new Platform(width+TheSize*5, height - TheSize*3));
	rects.push(new Platform(width+TheSize*5, height - TheSize*1));
	rects.push(new Platform(width+TheSize*5, height - TheSize*4));
	rects.push(new Platform(width+TheSize*6, height - TheSize*2));
	rects.push(new Platform(width+TheSize*6, height - TheSize*3));
	rects.push(new Platform(width+TheSize*6, height - TheSize*1));
	rects.push(new Platform(width+TheSize*6, height - TheSize*4));
	rects.push(new Platform(width+TheSize*5, height - TheSize*5));
	rects.push(new Platform(width+TheSize*4, height - TheSize*4));
	rects.push(new Platform(width+TheSize*4, height - TheSize*6));
	rects.push(new Platform(width+TheSize*6, height - TheSize*5));
	enemys.push(new Spikes(width+TheSize, height - TheSize));
	enemys.push(new Spikes(width+TheSize*2, height - TheSize));
	rects.push(new Platform(width+TheSize*4, height - TheSize));
}

function placeSector6()
{
	enemys.push(new Enemy(width+(ceil(random(1, 10))*TheSize), height - (ceil(random(2, 5))*TheSize), 1, 1));
  rects.push(new Platform(width+(ceil(random(1, 10))*TheSize),height-(ceil(random(2, 5))*TheSize)));
	enemys.push(new Spikes(width+TheSize*3, height - TheSize));
	rects.push(new Platform(width+(ceil(random(1, 10))*TheSize), height-(ceil(random(2, 5))*TheSize)));
	rects.push(new Platform(width+(ceil(random(1, 10))*TheSize), height - (ceil(random(2, 5))*TheSize)));
	rects.push(new Platform(width+(ceil(random(1, 10))*TheSize), height - (ceil(random(2, 5))*TheSize)));
	rects.push(new Platform(width+(ceil(random(1, 10))*TheSize), height - (ceil(random(2, 5))*TheSize)));
	enemys.push(new Spikes(width+(ceil(random(1, 10))*TheSize), height - (ceil(random(2, 5))*TheSize)));
	enemys.push(new Spikes(width+(ceil(random(1, 10))*TheSize), height - (ceil(random(2, 5))*TheSize)));
	enemys.push(new Spikes(width+(ceil(random(1, 10))*TheSize), height - (ceil(random(2, 5))*TheSize)));
	enemys.push(new Spikes(width+(ceil(random(1, 10))*TheSize), height - (ceil(random(2, 5))*TheSize)));
}
