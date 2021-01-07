var dog, dogImg1, dogImg2, dogSound1, dogSound2, dogSound3;
var canvas;
var food;
var foodS = 20;
var state = "happy";

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

  food = dataBase.ref('foodStock/stock');
  food.on("value", readStock);

  dog = createSprite(width/2, height/2);
  dog.scale = 0.5;
  dog.addImage(dogImg1);

  dataBase.ref("foodStock").update({stock: 20});

}


function draw() {  

  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    
    eatFood(foodS);
    
    if(foodS > 0){
    
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

    if(state === "happy"){
      
      dog.addImage(dogImg2);

    }
  
  }else if(keyCode === 32){

    addFood(food);

  }

  drawSprites();
  
  textDisplay();

  textAlign(CENTER);
  textSize(15);
  textFont("comic sans ms");
  fill("white");
  text("Note: Press 'UP ARROW' key to feed Brin! & Press 'SPACE' to add food", width/2, height - 50);

}
  
function textDisplay(){
  
  if(foodS === 0){
    
    fill(245, 245, 220)
    textSize(25);
    textAlign(CENTER);
    text("The food supply has run out!", width/4, height/2);
    state = "normal";
    dog.addImage(dogImg1);

  }else if(foodS !== 0){

   state = "happy";

  }

}

async function readStock(data){
  
  foodS = data.val();

}

function eatFood(y){
  
    if(y <= 0){
      
      y = 0;

    }else{
     
      y--;

    }
    
    dataBase.ref("foodStock").update({
      
      stock: y

    });

}

function addFood(x){
  
  if(x < 20){
      
    x += 1;

  }else{
   
    x = 20;

  }

  dataBase.ref("foodStock").update({
    
    stock: x

  });


}