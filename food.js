class Food{

    constructor(){

        this.lastFed = 0;
        this.image = loadImage("images/food.png");

        //database
        dataBase = firebase.database();

    }

    display(){

     if(gameState === "play"){

        background(garden, 550, 500);

     }else if(gameState === "hungry"){

        background(46, 139, 87);

     }else if(gameState === "sleep"){

        background(bedRoom, 550, 500);

     }else if(gameState === "bath"){

        background(washRoom, 550, 500);

     }else{

        background(livingRoom, 550, 500);

     }

     var x = -30
     var y = 20
     
     if(foodS !== 0 && gameState === "hungry"){

        for(var i = 0; i < foodS; i++){

            if(i % 10 === 0){

                x = x + 60;
                y = 5

            }

            image(this.image, x, y, 75, 55);
            y = y + 60;

        }

     }else{

        state = "normal";

     if(gameState === "hungry"){

        fill(245, 245, 220)
        textSize(25);
        textAlign(CENTER);
        text("The food supply has run out!", width/4, height/2);

       }

     }

     fill("black");
     textSize(20);
     textAlign(CENTER);
     textFont("comic sans ms");

     if(this.lastFed >= 12){
   
         text("Last Fed : " + this.lastFed % 12 + "PM", width/2, 20);
   
     }else if(this.lastFed === 0){
   
         text("Last Fed : Not Yet", width/2, 20);
   
     }else{
   
         text("Last Fed : " + this.lastFed + "AM", width/2, 20);
   
     }

     if(state === "normal" && gameState === "hungry"){

        dog.addImage(dogImg1);

     }else{

        dog.addImage(dogImg2);

     }

        if(currentTime === (this.lastFed + 1)){

            this.updateGameState("play");
        
         }else if(currentTime === (this.lastFed + 2)){
        
            this.updateGameState("sleep");
        
         }else if(currentTime > (this.lastFed + 2) && currentTime <= (this.lastFed + 4)){
        
            this.updateGameState("bath");
        
         }else if(currentTime > (this.lastFed + 4) && currentTime <= (this.lastFed + 6)){
        
            this.updateGameState("room");
        
         }else{

            this.updateGameState("hungry");
        
         }

   }

    //updating value of food in database and foodstock with food parameter
    updateFoodStock(){
        
        dataBase.ref("foodStock").update({stock: foodS});

    }

     //updating value of lastfed in database and lastfed with time parameter
     updateLastFed(){
        
        this.lastFed = hour();
        dataBase.ref("lastFed").update({time: this.lastFed});

    }

    getFoodStock(){
        
        var foodStockRef = dataBase.ref("foodStock/stock");
        foodStockRef.on("value", function(data){

            foodS = data.val();

        });

    }

    getGameState(){

        var gameStateRef = dataBase.ref("gameState/state");
        gameStateRef.on("value", function(data){

            gameState = data.val();

        })

    }

    updateGameState(state1){

        gameState = state1;
        dataBase.ref("gameState").update({state: gameState})

    }


}