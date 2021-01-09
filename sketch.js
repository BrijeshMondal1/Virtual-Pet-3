var dog, dogImg1, dogImg2, dogSound1, dogSound2, dogSound3;
var canvas;
var food;
var foodS = 20;
var state = "normal";

function preload(){

  dogImg1 = loadImage("images/dogImg.png");
  dogImg2 = loadImage("images/dogImg1.png");
  dogSound1 = loadSound("barking dog.mp3");
  dogSound2 = loadSound("barking dog 2.mp3");
  dogSound3 = loadSound("whining dog.mp3");

}

function setup() {

  dataBase = firebase.database();
  canvas = createCanvas(windowWidth - 40, windowHeight - 60);

  food = new Food();
  dataBase.ref("lastFed").update({time: 0});

  dog = createSprite(width/2, height/2);
  dog.scale = 0.5;
  dog.addImage(dogImg1);

  dataBase.ref("foodStock").update({stock: 20});

  addFoodButton = createButton("ADD FOOD");
  addFoodButton.position(width/2 - 80, height - 50);
  addFoodButton.mousePressed(addFood);
  feedPetButton = createButton("FEED DOG");
  feedPetButton.position(width/2 + 20, height - 50);
  feedPetButton.mousePressed(deductFood);

}


function draw() {  

  background(46, 139, 87);

  food.display();

  drawSprites();

  fill("red");
  text("Food remaining : " + foodS, width/2, 50);

}

function deductFood(){

  if(foodS !== 0){

    foodS--;
    state = "happy";
    food.updateFoodStock(foodS);
    food.updateLastFed();
    console.log("deducting food");

      var chooseSound = Math.round(random(1,2));
      
      if(chooseSound === 1)  
      
        dogSound1.play();

      else{
        
        dogSound2.play();

      }

    }else{

      dogSound3.play();

      setTimeout(()=>{

        dogSound3.stop();

      }, 1500);

    }

}

function addFood(){
 
  if(foodS < 20){

    foodS++;
    food.updateFoodStock(foodS);
    console.log("adding food");

  }

}

