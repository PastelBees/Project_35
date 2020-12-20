//Create variables here
var dogImg1, dogImg2
var dog, happyDog, database, foodS, foodStock
function preload()
{
  //load images here
  dogImg1 = loadImage("images/dogImg.png")
  dogImg2 = loadImage("images/dogImg1.png")
}

function setup() {
  database = firebase.database();

	createCanvas(500, 500);
  
  dog = createSprite(250, 325)
  dog.addImage(dogImg1)
  dog.scale = .17

  foodStock = database.ref('Food')
  foodStock.on("value", readStock)
}


function draw() {  
background(46, 139, 87)

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(dogImg2)
}
  drawSprites();
  textSize(14)
  fill(255)
  stroke(2)
  text("Note: Press UP_ARROW Key To Feed Drago Milk!", 100, 40)

  textSize(20)
  fill(255)
  stroke(2)
  text("Food Remaining: " + foodS, 160, 210 )
  //add styles here

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x=0
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}