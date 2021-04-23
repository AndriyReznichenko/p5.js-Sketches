let points = []
let labelP;
let gridSize = 100;
let cells = [[]]
let k = 3;

function setup() {
  labelP = createP();
  labelP.value(0);
  labelP.html('Current label: 0 (RED)');
  labelP.style('font-size', '20pt');
  createCanvas(600, 600);
  background(220);


  for (var i = 0; i < gridSize; i++) {
    cells[i] = [];
    for (var j = 0; j < gridSize; j++) {
      let cell = new Cell(i, j, width / gridSize, -1);
      cells[i][j] = cell;
    }
  }

}

function draw() {
  background(220);

    for (var i = 0; i < gridSize; i++) {
      for (var j = 0; j < gridSize; j++) {
        cells[i][j].show();
      }
    }

  for(p of points){
    p.show();
  }

  if(points.length > k) {
    updateGrid(points, cells, k);
  }
}

function keyPressed(){

  if(keyCode == 65){ //a
    labelP.value(0);
    labelP.html('Current label: 0 (RED)');
  }
  if(keyCode == 83){ //s
    labelP.value(1);
    labelP.html('Current label: 1 (GREEN)');
  }
  if(keyCode == 68){ //d
    labelP.value(2);
    labelP.html('Current label: 2 (BLUE)');
  }

  return true;
}

function mousePressed(){
  points.push(new Point(mouseX, mouseY, 10, labelP.value()))
  return true;
}
