var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play" 

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  doorsGroup = new Group;
  climbersGroup = new Group;
  invisibleBlockGroup = new Group;
  spookySound.loop();
}

function draw() {
  background(0);
  if(gameState==="play"){
    spookySound.play();
    spookySound.volume=0.1;
    if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown("a")){
      ghost.x = ghost.x-5;
    }
    if(keyDown("d")){
      ghost.x = ghost.x+5;
    }
    if(keyDown("space")){
      ghost.velocityY=-10;
    }
    ghost.velocityY=ghost.velocityY+0.8;

    spawndoors();

    if(climbersGroup.isTouching(ghost)){
        ghost.velocityY=0;
    }

    if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
     ghost.destroy();
     gameState="end";
    }

    drawSprites();
}
if(gameState==="end"){
  fill("white");
  textSize(30);
  text("Game Over",230,250);
}
}

function spawndoors(){
  if(frameCount%240===0){
    door = createSprite (200,-50);
    climber = createSprite (200,10); 
    invisibleBlock = createSprite (200,15)
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;


    door.x=Math.round(random(120,400));
    climber.x=door.x;
    invisibleBlock.x=door.x;

    door.addImage(doorImg);
    climber.addImage(climberImg);

    door.velocityY=1;
    climber.velocityY=1;
    invisibleBlock.velocityY=1;

    ghost.depth=door.depth;
    ghost.depth+=1;

    door.lifetime=800;
    climber.lifetime=800;
    invisibleBlock.lifetime=800;

    invisibleBlock.debug=false;

    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}