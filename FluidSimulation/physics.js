class Physics{

  setup(){
      this.gravityF = 0.4;
      this.dragF = 0.95;
  }

  gravity(obj){
    // m1 * m2 / (d^2)
    //var d = height - obj.position.y
    //var force = createVector(0, 50000 * obj.mass / (d * d))
    //force.setMag(min(force.mag(), 20))
    //obj.applyForce(force)

    //this.gravityF += (Math.random() - 0.7) * 0.2;

    obj.applyForce(createVector(0, this.gravityF))
  }

  repulsion(objs){
    for (var i = 0; i < objs.length; i++) {
      var force = createVector(0, 0)
      for (var j = 0; j < objs.length; j++) {
        if(i != j){
          var f = p5.Vector.sub(objs[i].position, objs[j].position)
          if(f.mag() < 40){
            f.div(f.mag() * f.mag())
            //f.div(f.mag())
            force.add(f)
          }
        }
      }
      force.mult(20)

      force.setMag(min(force.mag(), 1))
      objs[i].applyForce(force)
    }
  }

  attract(objs){
    var attractorPos = createVector(width / 2, height / 2)
    for (var i = 0; i < objs.length; i++) {
      var force = p5.Vector.sub(attractorPos, objs[i].position)

      force.setMag(min(force.mag(), 0.1))
      objs[i].applyForce(force)
    }
  }

  mouseForce(obj){
    var mousePos = createVector(mouseX, mouseY);
    var force = p5.Vector.sub(obj.position, mousePos)
    if(force.mag() < 100){
      force.div(force.mag() * force.mag())

      force.mult(40)

      force.setMag(min(force.mag(), 10))
      obj.applyForce(force)
    }
  }


  mouseAttract(obj){
    var mousePos = createVector(mouseX, mouseY);
    var force = p5.Vector.sub(mousePos, obj.position) //<-- COOL
    if(force.mag() < 40){
      force.div(force.mag() * force.mag())
    }
    force.mult(10)

    force.setMag(min(force.mag(), 1))
    obj.applyForce(force)
  }

  bounce(obj){
    var bounceCoef = -0.7

    var f = createVector(0, 0)
    if (obj.position.y < 0) {
      obj.velocity.y *= bounceCoef
      obj.position.y = 0
    }

    if (obj.position.y > height) {
      obj.velocity.y *= bounceCoef
      obj.position.y = height

    }

    if (obj.position.x < 0) {
      obj.velocity.x *= bounceCoef
      obj.position.x = 0
    }

    if (obj.position.x > width) {
      obj.velocity.x *= bounceCoef
      obj.position.x = width
    }
  }

  upthrust(obj){
    var upthrustCoef = 0.5;

    var f = createVector(0, 0)



    if (obj.position.y < 100) {
      f.y = upthrustCoef;
      obj.applyForce(f)
    }

    if (obj.position.y > height - 40) {
      f.y = -upthrustCoef;
      obj.applyForce(f)
    }

    if (obj.position.x < 0) {
      f.x = upthrustCoef;
      obj.applyForce(f)
    }

    if (obj.position.x > width) {
      f.x = -upthrustCoef;
      obj.applyForce(f)
    }
  }

  drag(obj){
    obj.velocity.mult(this.dragF)
  }
}
