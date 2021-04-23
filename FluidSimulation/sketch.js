let particles = []
let winSize = 600
let physics
let gSlider

function setup() {
  createCanvas(winSize, winSize)

  for (var i = 0; i < 170; i++) {
    var x = Math.random() * winSize;
    var y = Math.random() * winSize;
    particles.push(new Particle(createVector(x, y)))
  }


  physics = new Physics();
  physics.setup()

  gSlider = createSlider(-0, 2, 0.0, 0.01);
}

function draw() {
  background(60)
  physics.gravityF = gSlider.value()

  physics.repulsion(particles)
  //physics.attract(particles)

  for (var particle of particles) {
    physics.gravity(particle)
    physics.bounce(particle)
    physics.upthrust(particle)
    physics.mouseForce(particle)
    physics.mouseAttract(particle)
    physics.drag(particle)
    particle.update()
    particle.show()

  }

//  noLoop()

}
