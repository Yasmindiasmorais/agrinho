let player;
let fruits = [];
let hasFruit = false;
let truck;
let delivered = 0;
let gameWon = false;

let imgPlayer, imgFruit, imgTruck;

function preload() {
  imgPlayer = loadImage("2ffc718b-5433-43e2-a0b2-bb29c5c19f10.png");
  imgFruit = loadImage("morango.png");
  imgTruck = loadImage("boneco.png");
}

function setup() {
  createCanvas(600, 400);
  player = createVector(1000, 1000);
  truck = createVector(500, 300);
}

function draw() {
  background(135, 206, 235); // céu
  drawField();
  drawTruck();
  drawPlayer();
  drawFruits();
  checkPickup();
  checkDelivery();
  drawStatus();

  if (gameWon) {
    fill(0);
    textSize(30);
    textAlign(CENTER);
    text("Você entregou todas as frutas!", width / 2, height / 2);
    noLoop();
  }
}

function drawField() {
  fill(100, 200, 100);
  rect(0, height/2, width, height/2); // grama
}

function drawTruck() {
  image(imgTruck, truck.x, truck.y - 100, 100, 100);
}

function drawPlayer() {
  image(imgPlayer, player.x - 100, player.y - 100, 100, 130);

  if (keyIsDown(87)) player.y -= 3; // W
  if (keyIsDown(83)) player.y += 3; // S
  if (keyIsDown(65)) player.x -= 3; // A
  if (keyIsDown(68)) player.x += 3; // D

  player.x = constrain(player.x, 15, width - 15);
  player.y = constrain(player.y, height / 2 + 15, height - 15);
}

function drawFruits() {
  if (random() < 0.01 && fruits.length < 5) {
    fruits.push(createVector(random(20, width - 20), random(height/2 + 20, height - 20)));
  }
  for (let f of fruits) {
    image(imgFruit, f.x - 50, f.y - 50, 50, 50);
  }
}

function checkPickup() {
  if (hasFruit) return;
  for (let i = fruits.length - 1; i >= 0; i--) {
    let d = dist(player.x, player.y, fruits[i].x, fruits[i].y);
    if (d < 25) {
      fruits.splice(i, 1);
      hasFruit = true;
      break;
    }
  }
}

function checkDelivery() {
  let d = dist(player.x, player.y, truck.x + 30, truck.y);
  if (hasFruit && d < 40) {
    hasFruit = false;
    delivered++;
    if (delivered >= 5) gameWon = true;
  }
}

function drawStatus() {
  fill(0);
  textSize(16);
  text(`Frutas entregues: ${delivered}`, 10, 20);
  if (hasFruit) {
    text("Carregando fruta 🍎", 10, 40);
  }
}
