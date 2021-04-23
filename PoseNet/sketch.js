let img;

function setup() {
  createCanvas(400, 400);

  img = loadImage('./img.jpg');
  console.log('ml5 version:', ml5.version);
}

function draw() {
  image(img, 0, 0)
  background(200);
}
