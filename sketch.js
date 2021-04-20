var eren, erenImg;
var erenJump;
var shiganshina;
var backgroundImg;
var ground;
var titan;
var titan1, titan2, titan3;
var titan_weakpoint;
var jumpButton, jumpButtonImg;
var killButton, killButtonImg;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restartButton, restartButtonImg;
var gameOver, gameOverImg;
var   kills;

function preload(){
    erenImg = loadAnimation("Eren_Sprite-1.png", "Eren_Sprite-2.png", "Eren_Sprite-3.png", "Eren_Sprite-4.png", "Eren_Sprite-5.png", "Eren_Sprite-6.png", "Eren_Sprite-7.png", "Eren_Sprite-8.png", "Eren_Sprite-9.png", "Eren_Sprite-10.png");
    erenJump = loadImage("Eren_Jump.png");
    backgroundImg = loadImage("Shiganshina.png");
    titan1 = loadImage("Armour.png");
    titan2 = loadImage("Beast.png");
    titan3 = loadImage("titan image.png");
    jumpButtonImg = loadImage("JumpButton.png") ;
    killButtonImg = loadImage("Kill_Button.png");
    restartButtonImg = loadImage("Restart.png");
    gameOverImg = loadImage("Game_Over.png");
}

function setup(){
    createCanvas(1500,700);
    eren = createSprite(400,630,70,50);
    eren.addAnimation("running", erenImg);
    eren.scale =1.5;
    eren.setCollider("rectangle",0,0,70,50)

    shiganshina = createSprite(750,250,10,10);
    shiganshina.addAnimation("bg",backgroundImg);
    shiganshina.scale = 2;

    ground = createSprite(750,690,1500,30);
    ground.shapeColor=("black");

    jumpButton = createSprite(200,620,300,300);
    jumpButton.addAnimation("jump", jumpButtonImg);
    jumpButton.scale = 0.2;

    killButton = createSprite(1300,620,100,100);
    killButton.addAnimation("kill", killButtonImg);
    killButton.scale = 0.3;

    titan_weakpoint = createSprite();
    titan_weakpoint.visible = false;

    restartButton = createSprite(750,350,20,20);
    restartButton.addAnimation("re", restartButtonImg);

    gameOver = createSprite(750,100,20,20);
    gameOver.addAnimation("over", gameOverImg);

    eren.depth = shiganshina.depth +1;
    kills = 0;

    titanGroup = new Group();
}
function draw(){
    background(0);
    if(gameState===PLAY){
        spawnTitans();
        if(mousePressedOver(jumpButton)||keyDown("space") && eren.y >= 100){
            eren.velocityY = -12;
                eren.changeAnimation("jumping", erenJump)
            
        }
        eren.velocityY = eren.velocityY + 0.8;
        restartButton.visible = false;
        gameOver.visible = false;
        if(mousePressedOver(killButton) && eren.x + eren.width/2 >= titan.x - titan.width/2 && 
           eren.x - eren.width/2 <= titan.x + titan.width/2 && eren.y - eren.height/2 <= titan.y + titan.height/2 &&
           eren.y + eren.height/2 >= titan.y - titan.height/2){
            titanGroup.destroyEach();
            kills = kills +1;
        }
        if(eren.isTouching(titanGroup)){
            gameState = END;
        }
    }else if(gameState === END){
        eren.visible = false;
        titanGroup.setVelocityXEach(0);
        titanGroup.setLifetimeEach(-1);
        restartButton.visible = true;
        gameOver.visible = true;
        if(mousePressedOver(restartButton)){
            reset();
        }
    }
    eren.collide(ground);
    drawSprites();
    fill("Black")
    textSize(20);
    text  ("kills = "+kills,1300,100);
}

function spawnTitans(){
    if(frameCount%200===0){
        titan = createSprite(1500,450,30,400);
        titanGroup.add(titan);
        var x = Math.round(random(2,2))
        if(x===1){
            titan_weakpoint.x = 1430;
            titan_weakpoint.y = 320;
            titan_weakpoint.width = 180;
            titan_weakpoint.length = 120;
            titan.addAnimation("kyonji", titan1);
            titan.scale = 2
            titan.y = 470;
            titan.setCollider("rectangle", 0,20,100,150);
            titan.depth = titan_weakpoint.depth+1 ;
        }
        if(x===2){
            titan_weakpoint.x = 1450;
            titan_weakpoint.y = 250;
            titan_weakpoint.width = 220;
            titan_weakpoint.length = 120;
            //titan_weakpoint.debug = true;
            titan.addAnimation("kyonji",titan2);
            titan.scale = 3;
            titan.debug = false;
            titan.setCollider("rectangle",0,30,100,130);
            titan.depth = titan_weakpoint.depth+1 ;
        }
        if(x===3){
            titan_weakpoint.x = 1420;
            titan_weakpoint.y = 550;
            titan_weakpoint.width = 140;
            titan_weakpoint.length = 120;
            titan.addAnimation("kyonji",titan3);
            titan.scale = 0.6
            titan.y = 580
            titan.setCollider("rectangle",0,100,440,200);
            titan.depth = titan_weakpoint.depth+1 ;
        }
        titan.velocityX = -(7 + 2*kills/100)
        titan.lifetime = 250;
        titan_weakpoint.velocityX = titan.velocityX;
    }
}
function reset(){
    gameState = PLAY;
    kills = 0;
    titanGroup.destroyEach();
    eren.visible = true;
}