class Food{

    constructor(){

        this.foodStock = foodS;
        this.lastFed = 0;
        this.image = loadImage("food.png");

        //database
        dataBase = firebase.database();

    }

    display(){

     var x = -30
     var y = 20
     
     if(foodS !== 0){

        for(var i = 0; i < foodS; i++){

            if(i % 10 === 0){

                x = x + 60;
                y = 5

            }

            image(this.image, x, y, 60, 40);
            y = y + 60;

        }

     }else{

        state = "normal";

        fill(245, 245, 220)
        textSize(25);
        textAlign(CENTER);
        text("The food supply has run out!", width/4, height/2);

     }

     if(state === "normal"){

        dog.addImage(dogImg1);

     }else{

        dog.addImage(dogImg2);

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

   }

    //updating value of food in database and foodstock with food parameter
    updateFoodStock(){
        
        dataBase.ref("foodStock").update({stock: this.foodStock});

    }

     //updating value of lastfed in database and lastfed with time parameter
     updateLastFed(){
        
        this.lastFed = hour();
        dataBase.ref("lastFed").update({time: this.lastFed});

    }

    getFoodStock(){
        
        var foodStockRef = dataBase.ref("foodStock/stock");
        foodStockRef.on("value", function(data){

            this.foodStock = data.val();

        });

    }


}