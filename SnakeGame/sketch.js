
let grid = [];
let gridColRows = 10;
let snake;
let food;

function setup(){
  createCanvas(400,400);
  frameRate(3);

  for (var i = 0; i < gridColRows; i++) {
    grid[i] = []
    for (var j = 0; j < gridColRows; j++) {
      grid[i][j] = new Cell(i, j, width / gridColRows, 0)
    }
  }

  let x = Math.floor(Math.random() * gridColRows);
  let y = Math.floor(Math.random() * gridColRows);
  snake = new Snake(x, y, width / gridColRows);

  generateFood();
}

function draw(){
  background(40);

  for (var i = 0; i < gridColRows; i++) {
    for (var j = 0; j < gridColRows; j++) {
      grid[i][j].show()
    }
  }
  snake.move();
  snake.show();

  food.show();

  let x = food.position.x;
  let y = food.position.y;
  if (snake.intersects(x, y)) {
    snake.grow();
    generateFood();
  }

  if (snake.intersectsItself() || snake.intersectsEdges(gridColRows)) {
    let x = Math.floor(Math.random() * gridColRows);
    let y = Math.floor(Math.random() * gridColRows);
    snake = new Snake(x, y, width / gridColRows);

    generateFood();
  }
}

function keyPressed(){
  if (keyCode === UP_ARROW) {
    snake.setVelocity(0, -1);
  } else
  if (keyCode === DOWN_ARROW) {
    snake.setVelocity(0, 1);
  } else
  if (keyCode === LEFT_ARROW) {
    snake.setVelocity(-1, 0);
  } else
  if (keyCode === RIGHT_ARROW) {
    snake.setVelocity(1, 0);
  }

  return false;
}


function generateFood(){
  let finished = false;

  while (!finished) {
    x = Math.floor(Math.random() * gridColRows);
    y = Math.floor(Math.random() * gridColRows);

    if (!snake.intersects(x, y)) {
      food = new Cell(x, y, width / gridColRows, 2)
      finished = true;
    }
  }
}
