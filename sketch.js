var sword, fruit1, fruit2, fruit3, fruit4, monster1, monster2;
var fruitGroup, enemyGroup;
var swordImage, fruitImage1, fruitImage2, fruitImage3, fruitImage4, monsterImage1, monsterImage2, gameOverImage; 
var score = 0;

//game states
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload(){
 fruitImage1 = loadImage('fruit1.png');
 fruitImage2 = loadImage('fruit2.png');
 fruitImage3 = loadImage('fruit3.png');
 fruitImage4 = loadImage('fruit4.png');
 monsterImage = loadAnimation('alien1.png','alien2.png');
 swordImage = loadImage("sword.png");
 gameOverImage = loadImage("gameover.png");
}


function setup(){
  
  createCanvas(500,500);
  
  sword = createSprite(100,200,20,20);
  sword.addImage(swordImage);
  sword.scale = 0.7;
  fruitGroup = new Group();
  enemyGroup = new Group();
}


function draw(){
  background("gray");
  
    if(gameState === PLAY){
    
      Enemy();
      fruits();
    
      sword.y = World.mouseY;
      sword.x = World.mouseX;
      
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score = score + 2;
    }
    else if(enemyGroup.isTouching(sword)){
      gameState = END;
      fruitGroup.destroyEach();
      fruitGroup.setVelocityXEach(0);
      enemyGroup.setVelocityYEach(0);
      sword.scale = 1.5;
      sword.x = 300;
      sword.y = 300;
      sword.addImage(gameOverImage);
    }
  }
  drawSprites();
  
  
  fill('black')
  text("Score: " + score,400,50);
  
  
}

function fruits(){
  if(World.frameCount%80 === 0){
    fruit = createSprite(400,200,20,20);
    fruit.scale = 0.2;
    //fruit.debug = true;
    r = Math.round(random(1,4));
    if (r == 1){
      fruit.addImage(fruitImage1);
    }
    else if (r == 2){
      fruit.addImage(fruitImage2);
    }
    else if (r == 3){
      fruit.addImage(fruitImage3);
    }
    else if (r == 4){
      fruit.addImage(fruitImage4);
    }
    
    fruit.y = Math.round(random(50,340));
    
    fruit.velocityX = -7;
    fruit.setLifetime = 100;
    
    fruitGroup.add(fruit);
  }
}

function Enemy(){
  if (World.frameCount%200 === 0){
    monster = createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y = Math.round(random(100,300));
    monster.velocityX = -8;
    monster.setLifetime = 50;
    
    enemyGroup.add(monster);
  }
}