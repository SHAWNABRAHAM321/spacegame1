var gameState = "start", asteroidImg, infoImg, moonImg, playImg, rocketImg, rstarryImg;
var asteroid, stateChange, background1, rocket, edges, asteroidGroups;

//reward and life
var reward, rewardImg, star = 0, life = 1;

function preload(){
 asteroidImg = loadImage("spaceimgs/astroid.png");
 moonImg = loadImage("spaceimgs/Moon.png");
 infoImg = loadImage("spaceimgs/Info.png");
 playImg = loadImage("spaceimgs/play.png");
 rocketImg = loadImage("spaceimgs/rocket1.png");
 rstarryImg = loadImage("spaceimgs/Rstarry.jpg");
 rewardImg= loadImage("spaceimgs/star.png")
}

function setup() {
 createCanvas(windowWidth, windowHeight);
 stateChange = new StateChange();

 //background
 background1 = createSprite(windowWidth/2, windowHeight/2);
 background1.addImage(rstarryImg);
 background1.scale = 2.4;

 //rocket[PC]
 rocket = createSprite(200, windowHeight/2);
 rocket.addImage(rocketImg);
 rocket.scale=0.3;
 rocket.rotation=90;
 rocket.visible = false;
 rocket.debug = true;
 rocket.setCollider("rectangle", 0, 0, 200, 400)

 //boundary
 edges = createEdgeSprites();

 //groups
 asteroidGroups = new Group();
 starsGroups = new Group();
}

function draw() {
   background(0);
   drawSprites();
   //infinite background
   background1.velocityX=-3;
   if (background1.x <0){
   background1.x = windowHeight/2; 
   }
   
   //----------------------------------START-------------------------------
   if (gameState === "start"){
      stateChange.display()
   }
   //----------------------------------PLAY--------------------------------
   if (gameState === "play"){
      rocket.visible = true;

      //Life and score
      textSize(30);
      fill("white")
      text("Life: " + life, windowWidth-300 , 50);
      text("Stars Collected: "+star, windowWidth-300 , 150 );
      
      //movement of the rocket
      if(keyDown(UP_ARROW)){
         rocket.y = rocket.y - 10;
      }  

      if(keyDown(DOWN_ARROW)){
         rocket.y = rocket.y + 10;
      }

      if(keyDown(LEFT_ARROW)){
         rocket.x = rocket.x - 10;
      }

      if(keyDown(RIGHT_ARROW)){
         rocket.x = rocket.x + 10;
      }

      //reward
      reward101()

      //NPC
      nonPlayingCharacter1();

      if(rocket.isTouching(asteroidGroups)){
        life=life-1;
        asteroidGroups[0].destroy();
      }

      if(rocket.isTouching(starsGroups)){
         star=star+1;
         starsGroups[0].destroy();
      }

      //end condition
      if(life<=0){
         gameState="end";
         asteroidGroups.destroyEach();
         starsGroups.destroyEach();
      }

      //win condition
      if(star === 5){
         gameState="win";
         asteroidGroups.destroyEach();
         starsGroups.destroyEach();
      }
   }

   //--------------------------END---------------------------------
   if(gameState==="end"){
      gameOver()
   }

   //--------------------------WIN---------------------------------
   if(gameState==="win"){
      gameWon()
   }
}

function gameWon(){
   swal(
      {
         title:"YOU WIN",
         text:`Score: ${star}`,
         imageUrl:"https://www.mzuri.co.uk/news/wp-content/uploads/2019/07/mzuri-moon-landing-sm.gif",
         imageSize:"300x300",
         confirmButtonText:"PLAY AGAIN"
      },
      function (isConfirm){
        if(isConfirm){
            window.location.reload()
        }
      }
   )  
}

function gameOver(){
   swal(
      {
         title:"YOU LOSE",
         text:`Score: ${star}`,
         imageUrl:"https://media.tenor.com/S7RM7OumKSoAAAAC/rocket-space.gif",
         imageSize:"300x300",
         confirmButtonText:"PLAY AGAIN"
      },
      function (isConfirm){
        if(isConfirm){
            window.location.reload()
        }
      }
   )
}

function reward101(){
  //reward
  if(frameCount % 200 == 0){
   reward = createSprite(random(300, windowWidth-200), 30);
   reward.addImage(rewardImg);
   reward.velocityY = 10;
   reward. scale = 0.05;
   starsGroups.add(reward);
  }

}

function nonPlayingCharacter1(){
  if(frameCount % 70 === 0){
   var asteroid = createSprite(windowWidth, random(30, windowHeight-100))
   asteroid.addImage(asteroidImg);
   asteroid.velocityX = -10;
   asteroid.scale = 0.2;
   asteroid.lifetime = windowWidth/10;
   asteroid.debug = true;
   asteroidGroups.add(asteroid)
  }
}