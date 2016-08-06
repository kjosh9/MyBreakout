var sketchProc=function(processingInstance){ with (processingInstance){
size(400, 400); 
frameRate(60);


/////////////////////////////////////////////////////////
//  Author: Joshua Knestaut
//  Date: 9/12/2015
//  Project 2


var iceOBJ = function(x, y){
 
    this.x = x;
    this.y = y;
    
    this.fall = true;
    
};

var barOBJ = function(x){
    
    this.x = x;   
    
};

var missileOBJ = function(x,y){
    
    this.x = x;
    this.y = y;
    this.fire = false;
};

var brickOBJ = function(x,y){
    
    this.y = y;
    this.x = x;
 
    this.IsHit = false;
};

var ballOBJ = function(x,y){
 
    this.y = y;
    this.x = x;
    
    this.xDir = round(random(1,2));
    this.yDir = round(random(1,2));
    
};

//////////////////////////
// Initiallizing everything

var score = 0;

var GameOver = false;

var bar = new barOBJ(160);

var ball = new ballOBJ(20, 80);

var keyArray = [];

var ice = [];

var currFrameCount = 0;

var missileIndex = 0;

var missile = [];

for (var i = 0; i < 5; i++){
    missile[i] = new missileOBJ();
}


////////////////
//initializing bricks
var brick = [];

var x = 0;
var y = 20;

for (var i = 0; i < 4; i++){
    for(var j = 0; j < 10; j++){
        
        brick.push (new brickOBJ (x,y));
        
        x+=40;
    }
    x = 0;
    y += 10;
}
///////////////////




barOBJ.prototype.draw = function(){

    fill (102, 102, 102);
    

    rect (this.x, 390, 80, 10);
    rect (this.x+35, 375, 10, 30);
    
    noStroke();
    rect (this.x+20, 391, 40, 9);
    stroke(0, 0, 0);
};

barOBJ.prototype.move = function(){
  
    if (keyArray[LEFT] === 1){
     
        if (this.x > -40){
            
            this.x-=2;   
        }
    }
    
    if (keyArray[RIGHT] === 1){
     
        if (this.x < 360){
            this.x+=2;
        }
        
    }
    
};

missileOBJ.prototype.draw = function() {
    
    fill (128, 128, 128);
    
    //noStroke();
    triangle(this.x, this.y, this.x + 5, this.y, this.x + 2.5, this.y - 5);
    rect(this.x, this.y, 5, 10);
    
    this.y -= 3;
    
    if (this.y < 0){
        this.fire = false;
    }
    
    for (var i = 0; i < ice.length; i++){
        if((this.x >= (ice[i].x)) && 
        (this.x <= (ice[i].x + 30)) &&
        (this.y >= (ice[i].y)) &&
        (this.y <= ice[i].y + 20) &&
        (ice[i].fall === true)){
            
            ice[i].fall = false;
        
            this.fire = false;
         
            score += 5;   
            
        }
    }
    
    //stroke(0, 0, 0);
    
};

var keyPressed = function(){
    
    keyArray[keyCode] = 1;   
    
};

var keyReleased = function(){
 
    keyArray[keyCode] = 0;   
    
};

brickOBJ.prototype.draw = function() {
    
    fill(130, 150, 237);
    
    rect(this.x, this.y, 40, 10);

    
};

ballOBJ.prototype.draw = function(){
    
    fill (235, 236, 250);
    
    rect (this.x, this.y, 10, 10);
    
    this.x += this.xDir;
    
    this.y += this.yDir;
    
    if (this.x < 0){
        this.xDir = round(2);   
    }
    else if (this.x > 390){
        this.xDir = -round(2);
    }
    
    if (this.y < 0) {
        this.yDir = round(2);
    }
    else if (this.y > 380){
        
        if (dist(this.x, 0, bar.x + 40, 0) <= 40){
            this.yDir = -round(2);
        }
        else {
            
            GameOver = true;
        
        }
    }
};

iceOBJ.prototype.draw = function(){
  
  
    fill(255, 255, 255);
  
    triangle(this.x, this.y, this.x + 10, this.y, this.x + 5, this.y + 20);
    triangle(this.x + 10, this.y, this.x + 20, this.y, this.x + 15, this.y + 20);
    triangle(this.x + 20, this.y, this.x + 30, this.y, this.x + 25, this.y + 20);
    
    this.y++;
    
    if(this.y > 400){
        this.fall = false;
    }
    
    if(this.y > 390){
        GameOver = true;
    }
    
};

var FireAway = function(){
    
    if (keyArray[32] === 1){
        
        if (currFrameCount < (frameCount - 10)){
            currFrameCount = frameCount;
            missile[missileIndex].fire = true;
            missile[missileIndex].x = bar.x + 40;
            missile[missileIndex].y = 390;
            missileIndex++;
            
            if (missileIndex > missile.length- 1 ){
                
                missileIndex = 0;
            }
        }
    }
};

ballOBJ.prototype.CollisionCheck = function() {
    
    var ball = this;
    
    var CollideCheckBrick = function(brick){
        
        var collision = false;
        
        if ((ball.x > brick.x) && (ball.x < (brick.x + 40)) && (ball.y > brick.y) && (ball.y < (brick.y+10))){
           collision = true;
        }
        
        if (((ball.x+10) > brick.x) && ((ball.x+10) < (brick.x + 40)) && (ball.y > brick.y) && (ball.y < (brick.y+10))){
            collision = true;
        }
        
        if ((ball.x > brick.x) && (ball.x < (brick.x + 10)) && ((ball.y+10) > brick.y) && ((ball.y+10) < (brick.y+10))){
            collision = true;
        }
           
        if (((ball.x+10) > brick.x) && ((ball.x+10) < (brick.x + 40)) && ((ball.y+10) > brick.y) && ((ball.y+10) < (brick.y+10))){
             collision = true;   
        }
            
        return (collision);
    };
    
	var brickHit = false;
	
	for(var i = 0; (i < brick.length) && (brickHit === false); i++) {

        if (brick[i].IsHit === false) {

            if (CollideCheckBrick(brick[i]) === true){
                    brick[i].IsHit = true;
		            brickHit = true;
                    this.yDir = -this.yDir;
                    score++;
                    
                   ice.push(new iceOBJ(brick[i].x+5, brick[i].y));
                
            }
        }
	}
};


var draw = function() {
    
    if(GameOver === false){
    
    
        background (32, 85, 217);
    
        for (var i = 0; i < brick.length; i++){
        
            if (brick[i].IsHit === false ){
                brick[i].draw();
            }
        }
    
        bar.draw();
        bar.move();
        ball.draw();
        ball.CollisionCheck();
        
        for (i = 0; i < ice.length; i++){
            
            if (ice[i].fall === true){
            ice[i].draw();
            }
        }
        
        
        FireAway();
        
        for( i = 0; i < missile.length; i++){
            
            if (missile[i].fire === true){
                
                missile[i].draw();
            }
        }
        
        fill (255, 255, 255);
        
        textSize (20);
        
        text (score, 360, 20);
    
    }
    
    else {
        
        fill (255, 255, 255);
        
        textSize (50);
        
        text("Game Over!", 70, 200);
        
        textSize (30);
        text("Final Score:", 100, 250); 
        text(score, 280, 250);
    }
};