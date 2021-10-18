var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running, monkey_dead
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score, survivalTime;
var floor;
var jungleImage;
var camera;

function preload(){
  
  monkey_dead = loadAnimation("monkeydead.png");
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jungleImage = loadImage("jungle.jpg");
}



function setup() {
   score = 0;
  monkey = createSprite(30,300,10,10);
  monkey.addAnimation("running",monkey_running); 
  monkey.addAnimation("dead", monkey_dead);
  monkey.velocityX = 2;
  monkey.scale = 0.1;

  floor = createSprite(0,350,1000000000000000,10);
  floor.visible = false;  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
}


function draw() {
  //set background
  background(jungleImage);
  //show score
  fill("cyan");
  textSize(20);
  text("Score: " + score,monkey.x + 120,20);
  
  if(gameState === PLAY) {
    monkey.changeAnimation("running",monkey_running);
    camera.position.x = monkey.position.x;
    monkey.velocityX = 2;
  if(floor.x < 0) {
    floor.x = 0;
  }
    
    if(keyDown("space")) {
    monkey.velocityY = -12;
  }
     Food();
  Obstacle();
  if(FoodGroup.isTouching(monkey)) {
    score += 1;
    FoodGroup.destroyEach();
  }
  
  if(obstacleGroup.isTouching(monkey)) {
    if(monkey.scale == 0.1) {
      gameState = END;
    } else {
      monkey.scale = 0.1;
    }
  }
  
  
    switch(score) {
    case 10: monkey.scale = 0.12;
            break;
    case 20: monkey.scale = 0.14;
            break;
    case 30: monkey.scale = 0.16;
            break;  
    case 40: monkey.scale = 0.18;
            break;        
  }
  }
  
  else if(gameState === END) {
    monkey.velocityX = 0; 
    if(keyWentDown("r")) {
      Restart();
    }
    monkey.changeAnimation("dead",monkey_dead);
    FoodGroup.destroyEach();
    textSize(20);
    fill("red");
    text("You died! Press R to restart.",monkey.x - 70,150)
  }
   monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(floor);
  drawSprites();
}

function Food() {
  if(World.frameCount % 80 == 0) {
     banana = createSprite(monkey.x + 20,Math.round(random(120,200)));
     banana.addAnimation("banana",bananaImage);
     banana.scale = 0.1;
     banana.lifetime = 100;
     FoodGroup.add(banana);
  }
}

function Obstacle() {
  if(World.frameCount % 300 == 0) {
    obstacle = createSprite(monkey.x + 100,330);
     obstacle.addAnimation("obstacle",obstacleImage);
     obstacle.scale = 0.1;
     obstacleGroup.add(obstacle);
  }
}

function Restart() {
  gameState = PLAY;
  score = 0;
  monkey.changeAnimation("running",monkey_running);
}




