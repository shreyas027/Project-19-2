var girlImg, girl, girlHit
var trackImg, track, invisibleGround
var bomb, bombGroup, bombImg
var gameOver, gameOverImg, restartI, restartImg
var score = 0

function preload(){
    girlImg = loadAnimation("running1.png","running2.png", "running3.png", "running4.png")
    trackImg = loadImage("Track.png")
    bombImg = loadImage("bomb.png")
    girlHit = loadAnimation("running2.png")
    gameOverImg = loadImage("gameOver.png")
    restartImg = loadImage("restart.png")


}

function setup() {
    createCanvas(700,500)
    track = createSprite(250,250,209,500)
    track.addImage(trackImg)
    track.velocityX = -3
    track.scale = 3.5

    girl = createSprite(100,370,20,20)
    girl.addAnimation("girlRunning",girlImg)
    girl.addAnimation("hit",girlHit)
    girl.scale = 1.8

    invisibleGround = createSprite(width/2,height,width,10)
    invisibleGround.visible = false

    gameOver = createSprite(350,220,209,500)
    gameOver.addImage(gameOverImg)
    gameOver.scale = 0.4
    gameOver.visible = false

    restartI = createSprite(350,340,209,500)
    restartI.addImage(restartImg)
    restartI.scale = 0.4
    restartI.visible = false
    

    bombGroup = createGroup()

    girl.setCollider("rectangle",0,0,girl.width - 80,girl.height - 30);
  girl.debug = false

    score = 0;
    
 
}

function draw() {
    background(200);
    
    if(track.x < 0){
        track.x = track.width/2;
    }

    // scoring

    
    if(keyDown("Space")){
        girl.velocityY = -15
        //score = score + 1
        
    }

    girl.velocityY = girl.velocityY + 0.8
    girl.collide(invisibleGround);

    spawnBomb()

    if (girl.isTouching(bombGroup)){
        end()
        
    }

    if(mousePressedOver(restartI)){
        reset()
      }

      score = score + Math.round(getFrameRate()/10);

      


    drawSprites()
    textSize(20)
    stroke("white")
    strokeWeight(4)
    fill("black")
    text("Score: "+ score, width - 120,50);
 
}
function end(){
    track.velocityX = 0
    girl.velocityY = 0
    girl.changeAnimation("hit", girlHit);
     gameOver.visible = true
     restartI.visible = true
     bombGroup.setVelocityXEach(0);
     bombGroup.setLifetimeEach(-1);
     bombGroup.visible = false
     score = "DONE"

    
}

function reset(){
    bombGroup.destroyEach()
    girl.changeAnimation("girlRunning", girlImg);
    track.velocityX = -3
    gameOver.visible = false
    restartI.visible = false
    if(keyDown("Space")){
        girl.velocityY = -18
    }    
    score = 0 

}

function spawnBomb(){
    if (frameCount % 80 === 0){
        var bombS = createSprite(700,435,20,20)
        bombS.addImage(bombImg)
        bombS.velocityX = -8
        bombS.scale = 0.1
        
        bombGroup.add(bombS)
    
        
    }

    
    
}


