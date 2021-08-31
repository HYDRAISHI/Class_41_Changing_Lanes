class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);

      //index of the array
      var index =0;

      //x and y position of the cars
      var x =200;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;
        x = 200 + (index*200) + allPlayers[plr].xPos;        
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        textSize(15);
        fill("white");
        textMode(CENTER);
        text(allPlayers[plr].name, cars[index - 1].x , cars[index - 1].y - 100)
      }

    }

    
    if(player.distance < 2150){
      if(keyCode === 38 && player.index !== null){
        yVel += 0.8;
        if(keyCode === 37){
          xVel -= 0.2;
        }
        if(keyCode === 39){
          xVel += 0.2;
        }
      }

      else if(keyCode === 38 && yVel > 0 && player.index !== null){
        yVel -= 0.1;
        xVel *= 0.9;
      }

      else{
        yVel *= 0.985;
        xVel *= 0.985;
      }
    }
    

    player.xPos += xVel;
    xVel *= 0.985;
    player.distance += yVel;
    yVel *= 0.98;
    
    
    if(player.distance > 3860){
      gameState = 2;
    }
   
  player.update();
    drawSprites();
  }

  end(){
    console.log("Game Ended");
  }
}
