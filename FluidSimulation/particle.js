class Particle{

  constructor(pos){
    this.position = pos
    //this.velocity = p5.Vector.random2D().mult(2)
    this.velocity = createVector(0, 0)
    this.mass = Math.random() * 2 + 0.6
    //this.mass = 1
    this.acceleration = createVector(0, 0)
  }

  applyForce(force){
    //A = F / M
    this.acceleration.add(force.div(this.mass))
  }

  show(){
    fill(160, 200, 240)
    ellipse(this.position.x, this.position.y, 20)
    this.showDir()
  }

  showDir(){
    fill(255)
    //strokeWeight(2)
    var dir = this.velocity.copy()
    dir.mult(2)
    //console.log(this.position.x,
      //this.position.y,
      //this.position.x + dir.x,
      //this.position.y + dir.y)
    line(this.position.x,
      this.position.y,
      this.position.x + dir.x,
      this.position.y + dir.y)
  }

  update(){
    this.velocity.add(this.acceleration)
    //this.velocity = this.acceleration.copy()
    this.position.add(this.velocity)
    this.resetAcceleration()
  }

  resetAcceleration(){
    this.acceleration.x = 0
    this.acceleration.y = 0
  }
}
