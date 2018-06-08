var mods = [];
var opp = [];
var you = [];
var rows = 8;
var cols = 9;
var spacing;
var turn1 = true;
var aselected = false;

function setup() {
  createCanvas(500,500)
  spacing = height/rows;
  for(var i = 0; i < rows; i++){
    for(var j = 0; j < cols; j++){
			var me = 0;
			if(i % 2 == 1){
				if(j % 2 == 0){
					me = 1;
				}
			}else{
				if(j % 2 == 1){
					me = 1;
				}
			}
        var x1 = i *spacing + spacing - spacing;
      mods.push(new Module(x1, j*spacing - spacing, me));
    }
	}
	
  for(var k = 0; k < 12; k++){
		var y2 = spacing/2;
		var x2 = k*(spacing*2) + spacing/2;
    if(k < 4){
       	y2 = spacing/2;
      x2 = k*(spacing*2) + spacing/2;
       }else if(k<8){
							y2 = spacing + spacing/2;        
         x2 = (k-4)*(spacing*2) + spacing/2 + spacing;
                }else{
                	y2 = spacing*2 + spacing/2;
                  x2 = (k-8)*(spacing*2) + spacing/2;
                }
    var y3 = spacing/2;
		var x3 = k*(spacing*2) + spacing/2 + spacing;
    if(k < 4){
       	y3 = spacing/2;
      x3 = k*(spacing*2) + spacing/2 + spacing;
       }else if(k<8){
							y3 = spacing + spacing/2;        
         x3 = (k-4)*(spacing*2) + spacing/2;
                }else{
                	y3 = spacing*2 + spacing/2;
                  x3 = (k-8)*(spacing*2) + spacing/2 + spacing;
                }
    y3 = y3 + (spacing*5);
    you.push(new checker(x2, y2, 0, k));	
   opp.push(new checker(x3, y3, 1, k));
	}
}

function draw() {
  background(0);
	for(var i = 0; i < mods.length; i ++){
		mods[i].draw();
	}
  for(var j = 0; j < 12; j++){
  	you[j].draw();
    opp[j].draw();
  }
}

function Module(_x,_y, _me) {
  this.x = _x;
  this.y = _y;
  this.size = spacing/2.5;
  this.destroyed = false;
	this.me = _me;
}

Module.prototype.draw = function() {
  if(!this.destroyed){
		if(this.me == 0){
    	fill(0);
		}else{
			fill(235,255,230);
		}
    stroke(0);
    strokeWeight(1);
    rect(this.x, this.y, spacing, spacing);
  }
}

function checker(_x, _y, _me, _mes) {
	this.x = _x;
	this.y = _y;
	this.me = _me;
  this.mes = _mes;
  this.jumped = false;
  this.selected = false;
  this.king = false;
  
	this.draw = function(){
    if(this.jumped){
     	this.x = -100;
    }
    if(!this.jumped){
		if(this.me == 1){
      if(this.selected){
      	strokeWeight(3);
        stroke(0,0,255);
      }else{
      	stroke(255);
      }			
      fill(0);
      
			ellipse(this.x,this.y, spacing/3, spacing/3);
      strokeWeight(1);
      if(this.king){
        rectMode(CENTER);
        rect(this.x, this.y, spacing/5, spacing/5);
        rectMode(CORNER);
      }
		}else{
      if(this.selected){
      	strokeWeight(3);
        stroke(0,0,255);
      }else{
      	stroke(0);
      }

      fill(255);
			ellipse(this.x,this.y, spacing/3, spacing/3);
      strokeWeight(1);
      
      if(this.king){
        rectMode(CENTER);
        rect(this.x, this.y, spacing/5, spacing/5);
        rectMode(CORNER);
      }
  		}
		} 
  }
	this.move = function(){
  if(!this.jumped){
    if(this.selected){
    	if(dist(mouseX, mouseY, this.x, this.y)<spacing/4){
        this.selected = false;
        aselected = false;
        
      }
    }
   if(this.selected){
  	 if(this.me == 1){
   	   if(dist(mouseX, mouseY, this.x + spacing, this.y - spacing)<spacing/2){
   	 			 jumps(1, -1, 1, this.mes);
  		    }
	 	     if(dist(mouseX, mouseY, this.x - spacing, this.y - spacing)<spacing/2){
           jumps(-1, -1, 1, this.mes);
      		}
       if(this.king){
         if(dist(mouseX, mouseY, this.x - spacing, this.y + spacing)<spacing/2){
           jumps(-1, 1, 1, this.mes);
      		}
         if(dist(mouseX, mouseY, this.x + spacing, this.y + spacing)<spacing/2){
   	 			 jumps(1, 1, 1, this.mes);
  		    }
       }
       //switch to white
    		}else{
         if(dist(mouseX, mouseY, this.x + spacing, this.y + spacing)<spacing/2){
            jumps(1, 1, 0, this.mes); 
         }
	 	     if(dist(mouseX, mouseY, this.x - spacing, this.y + spacing)<spacing/2){           
           jumps(-1, 1, 0, this.mes);
         }
          if(this.king){
         if(dist(mouseX, mouseY, this.x - spacing, this.y - spacing)<spacing/2){
           jumps(-1,-1, 0, this.mes);
      		}
         if(dist(mouseX, mouseY, this.x + spacing, this.y - spacing)<spacing/2){
   	 			 jumps(1, -1, 0, this.mes);
  		    }
      }
     }
   }
    if(this.me == 1){
   if(this.y < spacing){
     this.king = true;
   }
   }else{
   if(this.y > height - spacing){
     this.king = true;
   }
   }
  }
}
  	this.select = function(){
		if(!this.selected){
    	if(dist(mouseX, mouseY, this.x, this.y)<spacing/4){
        this.selected = true;
        aselected = true;
        
      }
    }
	}
}

function mousePressed(){
  if(!aselected){
		for(var i = 0; i < 12; i++){
      if(turn1){
				you[i].select();
			}else{
      	opp[i].select();
      }
    }
  }else{
  	for(var i = 0; i < 12; i++){
			if(turn1){
				you[i].move();
			}else{
      	opp[i].move();
      }
    }
  }
}



  
  function jumps(s, d, _me, _mes) {
    this.ch = s;
    this.chy = d;
    this.me = _me;
    this.mese = _mes;
      this.tojump = false;
      this.jump = 1;
    
    
  		  if(this.me == 1){
          this.testforjumpx = opp[this.mese].x+(spacing*this.ch*2);
 		    	this.testforjumpy = opp[this.mese].y+(spacing*this.chy*2);
      		this.testforx = opp[this.mese].x+(spacing*this.ch);
 		    	this.testfory = opp[this.mese].y+(spacing*this.chy);
          this.dontmove = false;
          	for(var k = 0; k < 12; k++){
        			if(this.testforx == opp[k].x && this.testfory == opp[k].y){
               	this.dontmove = true;
           		}else{
                this.tomove = true;
              }
          	}
          for(var i = 0; i < 12; i++){
    		  	if(this.testfory == you[i].y && this.testforx == you[i].x){	
          		this.tomove = false;
              this.jump = i;
              this.tojump = true;
          	 	  	 for(var j = 0; j < 12; j++){
        	   		   	if(this.testforjumpx == opp[j].x && this.testforjumpy == opp[j].y || this.testforjumpy == you[j].y && this.testforjumpx == you[j].x){	
                      this.tojump = false;
                    }
                 	}
              }
          }
          if(this.testforx < width-spacing/4){
            if(this.testforx > spacing/4){
            	if(this.testfory > spacing/4){
 								if(this.testfory < height-spacing/4){  
           if(this.tomove){
             if(!this.dontmove){
              opp[this.mese].x = this.testforx;
              opp[this.mese].y = this.testfory;
               aselected = false;
               you[this.mese].selected = false;
							opp[this.mese].selected = false;
               if(turn1){					
						 turn1 = false;
						}else{
              turn1 = true;
    		  	}
           	}
           }
              }
            }
          }
          if(this.testforjumpx < width-spacing/4){
            if(this.testforjumpx > spacing/4){
            	if(this.testforjumpy > spacing/4){
                if(this.testforjumpy < height-spacing/4){
           if(this.tojump){
              opp[this.mese].x = this.testforjumpx;
              opp[this.mese].y = this.testforjumpy;
              you[this.jump].jumped = true;
             aselected = false;
             you[this.mese].selected = false;
						opp[this.mese].selected = false;
           if(turn1){					
						 turn1 = false;
						}else{
              turn1 = true;
    		  		} 
           	}
            }
        }
          }
        }
      }
    }else{
          this.testforjumpx = you[this.mese].x+(spacing*this.ch*2);
 		    	this.testforjumpy = you[this.mese].y+(spacing*this.chy*2);
      		this.testforx = you[this.mese].x+(spacing*this.ch);
 		    	this.testfory = you[this.mese].y+(spacing*this.chy);
          this.dontmove = false;
          	for(var k = 0; k < 12; k++){
        			if(this.testforx == you[k].x && this.testfory == you[k].y){
               	this.dontmove = true;
           		}else{
                this.tomove = true;
              }
          	}
          for(var i = 0; i < 12; i++){
    		  	if(this.testfory == opp[i].y && this.testforx == opp[i].x){	
          		this.tomove = false;
              this.jump = i;
              this.tojump = true;
          	 	  	 for(var j = 0; j < 12; j++){
        	   		   	if(this.testforjumpx == you[j].x && this.testforjumpy == you[j].y || this.testforjumpy == opp[j].y && this.testforjumpx == opp[j].x){	
                      this.tojump = false;
                    }
                 	}
              }
          }

          if(this.testforx < width-spacing/4){
            if(this.testforx > spacing/4){
            	if(this.testfory > spacing/4){
 								if(this.testfory < height-spacing/4){  
           if(this.tomove){
             if(!this.dontmove){
              you[this.mese].x = this.testforx;
              you[this.mese].y = this.testfory;
               aselected = false;
               you[this.mese].selected = false;
							opp[this.mese].selected = false;
               turn1 = false;
           	}
           }
              }
            }
          }
          if(this.testforjumpx < width-spacing/4){
            if(this.testforjumpx > spacing/4){
            	if(this.testforjumpy > spacing/4){
                if(this.testforjumpy < height-spacing/4){
           if(this.tojump){
              you[this.mese].x = this.testforjumpx;
              you[this.mese].y = this.testforjumpy;
              opp[this.jump].jumped = true;
             aselected = false;
             you[this.mese].selected = false;
						opp[this.mese].selected = false;
              turn1 = false;
             print("Jumped");
           }
          }
    		}
  		}
          }
  }
    }
  }
  
