var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var nube
var nube1
var o1
var o2
var o3
var o4
var o5
var o6
var puntuacion=0
var grupoCaptus
var grupoNubes
var play=1;
var end=0;
var gameState=play;
var gameover,gameover_i
var restart,restart_i
var jump
var die
var check
var mensaje="Fawn Tizer"                                                





function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadAnimation("trex_collided.png");
  o1=loadImage("obstacle1.png");
  o2=loadImage("obstacle2.png");
  o3=loadImage("obstacle3.png");
  o4=loadImage("obstacle4.png");
  o5=loadImage("obstacle5.png");
  o6=loadImage("obstacle6.png");
  groundImage = loadImage("ground2.png");
  nube1=loadImage("cloud.png");
 gameover_i=loadImage("gameOver.png");
  restart_i=loadImage("restart.png");
  jump=loadSound("jump.mp3")
  die=loadSound("die.mp3")
  check=loadSound("checkpoint.mp3")


}

function setup() {

  createCanvas(600,200)//windowWidth, windowHeight 
  grupoNubes=new Group();
  grupoCaptus=new Group();
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;

  console.log(mensaje              )
  //crear sprite de suelo
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  //crear sprite de suelo invisible
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = true;
  
  //generar números aleatorios
  var rand =  Math.round(random(20,60))
  //console.log(rand)

  gameover=createSprite(300,100);
  gameover.addImage(gameover_i);
  gameover.scale= 0.5

  restart=createSprite(300,140);
  restart.addImage(restart_i);
  restart.scale= 0.5
}

function draw() {
  //establecer color de fondo
  background(180);
  text("puntos "+puntuacion,500,50);
  trex.setCollider("rectangle",30,30,10,10);
  //esta instruccion esd para que se vea o no el radio
  trex.debug=false
  console.log(mensaje)
  //console.log(trex.y)
  if (gameState===play){
    gameover.visible=false;
restart.visible=false;
ground.velocityX=-(4+3*puntuacion/100)
if (puntuacion>0&& puntuacion%100===0){check.play();
}
    if(keyDown("space")&& trex.y >= 100) {
      trex.velocityY = -10;
jump.play();
    }
    trex.velocityY = trex.velocityY + 0.8
    //piso infinito
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  //evitar que el trex caiga
  trex.collide(ground);
  //aparecer nubes
  nubesAleatorias();
  cactus();
  puntuacion=puntuacion+Math.round(frameCount/60)
  if (grupoCaptus.isTouching(trex)){
    gameState=end;
    die.play();
  }
}//este corchete cierra el play.
  
  else if (gameState===end){
ground.velocityX=0;
trex.changeAnimation("collided",trex_collided);
  trex.velocityY=0;
  grupoCaptus.setLifetimeEach(-1);
  grupoNubes.setLifetimeEach(-1)
grupoCaptus.setVelocityXEach(0);
grupoNubes.setVelocityXEach(0);
gameover.visible=true;
restart.visible=true;
}
  
  
  
  
  
  
  
  if (mousePressedOver(restart)){
    reset();
  }
  
  
  
  console.log(cactus.x);
  drawSprites();
 // console.log(frameCount)
}
//función para aparecer las nubes
function nubesAleatorias(){
  if(frameCount%80===0){
  nube=createSprite(600,100,40,10);
  nube.velocityX=-3
  grupoNubes.add(nube);
  nube.addImage(nube1)
  nube.scale=0.8
   nube.x=Math.round(random(400,600))
   //console.log(nube.depth)
   nube.depth=trex.depth;
   trex.depth=trex.depth+1
   nube.lifetime=200
 //escribir aquí el código 
  }
}


function cactus(){
if (frameCount%60===0){
  var cactus=createSprite(400,165,10,40);
  cactus.velocityX=-(6+puntuacion/100);
  grupoCaptus.add(cactus);
  cactus.lifetime=200

  var rand=Math.round(random(1,6));
  switch(rand){
    case 1:cactus.addImage(o1);
    break;
    case 2:cactus.addImage(o2);
    break;
    case 3:cactus.addImage(o3);
    break;
    case 4:cactus.addImage(o4);
    break;
    case 5:cactus.addImage(o5);
    break;
    case 6:cactus.addImage(o6);
    break;
    default:break;
  }
cactus.scale=0.5
}
}







function reset(){
gameState=play;
trex.changeAnimation("running",trex_running)
grupoCaptus.destroyEach();
grupoNubes.destroyEach();
puntuacion=0
}