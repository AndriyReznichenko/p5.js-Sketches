var _inputs = []
var _outputs = []

var _lossP;

var _scaleCoef = 0;
var _model;

var _temp;

var _isTraining = false;
var _current = 0;

var _modelCreated = false;

function setup(){
  createCanvas(600, 400);
  generateData()
  _lossP = createP()

  _model = _createModel()
}

function draw(){
  if (!_modelCreated) {
    console.log('called')

    _modelCreated = true;
  }

  background(70)
  frameRate(30)

  //DRAW POINTS
  stroke(255)
  strokeWeight(10)
  for (var i = 0; i < _inputs.length; i++) {
    point(_inputs[i], _outputs[i])
  }

  drawLine()
  train()
}

function drawLine(){
    strokeWeight(3)
    prev_x = 0;
    prev_y = 0;

    if (!_isTraining) {
        _lossP.html('Not Training')
      }

    var c_x = []
    var c_y = []

    for (var i = 0; i < width; i+=4) {
      var x = i;


      var ys = tf.tidy(() => {

        var xs = tf.tensor1d([x]);
        var preds = _model.predict(xs);

        return preds.dataSync();
      });


      line(
        prev_x,
        prev_y,
        x ,
        ys[0])


      prev_x = x
      prev_y = ys[0]
    }

    if(false){
    console.log('c_x')
    console.log(c_x)
    console.log('c_y')
    console.log(c_y)
  }

}

function mousePressed(){
  _inputs.push(mouseX)
  _outputs.push(mouseY)
}

async function train(){
  if (_inputs.length > 2) {
  if (!_isTraining) {
      var data = convertToTensor({x: _inputs, y: _outputs})
      _temp = data
      _lossP.html('Training')

      console.log('Training')
    }
  }
}

function keyPressed(){
    trainModel(_model, data.inputs, data.labels)
    console.log('Training')
}



function _createModel() {
  // Create a sequential model
  var model = tf.sequential();

  var minw = -0.3
  var maxw = 0.3

  model.add(tf.layers.dense({inputShape: [1], units: 50, useBias: true,
    activation: 'linear'}));

  model.add(tf.layers.leakyReLU({alpha:  0.2}))

  model.add(tf.layers.dense({units: 50, useBias: true,
    activation: 'linear'}));

  model.add(tf.layers.leakyReLU({alpha: 0.3}))

  model.add(tf.layers.dense({units: 50, useBias: true,
      activation: 'linear'}));

  model.add(tf.layers.leakyReLU({alpha: 0.3}))

  model.add(tf.layers.dense({units: 1, useBias: true, activation: 'linear'}));

  var myOptimizer = tf.train.adam()
  model.compile({optimizer: myOptimizer, loss: tf.losses.meanSquaredError});

  return model;
}

function convertToTensor(data) {
  // Wrapping these calculations in a tidy will dispose any
  // intermediate tensors.

  return tf.tidy(() => {
    // Step 1. Shuffle the data
    //tf.util.shuffle(data);

    // Step 2. Convert data to Tensor
    var inputs = data.x;
    var labels = data.y;

    var inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
    var labelTensor = tf.tensor2d(labels, [labels.length, 1]);

    return {
      inputs: inputTensor,
      labels: labelTensor,
    }
  });
}

async function trainModel(model, inputs, labels) {
  // Prepare the model for training.
  if(!_isTraining){
    _isTraining = true;

    return await model.fit(inputs, labels, {
          epochs: 20,
          shuffle: true,
          callbacks: {onTrainEnd} })
        .then(() => {
        _isTraining = false;})
      }

}

function onTrainEnd(batch) {
  _isTraining = false;
}

function plot(){
  console.log('PLOT')
}


function generateData(){

  for (var x = 0; x < width; x += 10) {
    _inputs.push(x)
    _outputs.push(calcY(x))
  }
}

function calcY(x){
  return 0.001 * x * x - 100
}
