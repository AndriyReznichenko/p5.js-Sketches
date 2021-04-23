var inputs = []
var outputs = []

var m;
var b;
var lr = 0.0000002;

var lossP;

function setup(){
  createCanvas(400,400);

  m = Math.random()
  b = Math.random()

  lossP = createP()
}

function draw(){
  background(70);

  //DRAW POINTS
  stroke(255)
  strokeWeight(10)
  for (var i = 0; i < inputs.length; i++) {
    point(inputs[i], outputs[i])
  }

  //DRAW LINE
  strokeWeight(4)
  line(0, predict(0), width, predict(width))

  var cost = loss()

  lossP.html(cost)

  //noLoop()
  train();

}

function mousePressed(){
  inputs.push(mouseX)
  outputs.push(mouseY)
}

function train(){
  var dm = 0;
  var db = 0;

  for (var i = 0; i < inputs.length; i++) {
    dm += inputs[i] * 2 * (outputs[i] - predict(inputs[i]))
    db += 2 * (outputs[i] - predict(inputs[i]))
  }

  m += dm * lr
  b += db * 0.02

}

function loss(){
  var cost = 0

  for (var i = 0; i < inputs.length; i++) {
    var predicted = predict(inputs[i])
    var error = Math.pow(predicted - outputs[i], 2)
    cost = cost + error
  }

  return cost
}

function predict(x){
  return m * x + b
}
