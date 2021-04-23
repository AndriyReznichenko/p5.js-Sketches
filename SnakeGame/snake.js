class Snake{
  constructor(headX, headY, scale){
    this.bodyParts = [];
    this.scale = scale;
    let head = new Cell(headX, headY, this.scale, 1);

    this.head = head;
    this.velocity = createVector(1, 0);
    this.tailJustAdded = false;
  }

  show(){
    this.head.show();

    //Show body
    for (let bodyPart of this.bodyParts) {
      rect(bodyPart.position.x * this.scale,
           bodyPart.position.y * this.scale,
           this.scale);
    }
  }

  move(){
    let nextBodyPosition = this.head.position.copy();

    this.head.position.add(this.velocity);

    for (let bodyPart of this.bodyParts) {
      if (this.tailJustAdded && bodyPart == this.tail) {
        this.tailJustAdded = false;
      } else {
        let prevBodyPosition = bodyPart.position;
        bodyPart.position = nextBodyPosition;
        nextBodyPosition = prevBodyPosition;
      }
    }
  }

  setVelocity(x, y){
    this.velocity.x = x;
    this.velocity.y = y;
  }

  intersects(x, y){
    let cond = false;
    if(this.head.position.x == x && this.head.position.y == y){
      cond = true;
    }
    for (let bodyPart of this.bodyParts) {
      if(bodyPart.position.x == x && bodyPart.position.y == y){
        cond = true;
        break;
      }
    }

    return cond;
  }

  grow(){
    let tailX = 0;
    let tailY = 0;
    let length = this.bodyParts.length;

    if (length > 0) {
      tailX = this.bodyParts[length - 1].position.x;
      tailY = this.bodyParts[length - 1].position.y;
    } else {
      tailX = this.head.position.x;
      tailY = this.head.position.y;
    }

    let newBodyPart = new Cell(tailX, tailY, this.scale, 1);
    this.bodyParts.push(newBodyPart);

    this.tail = newBodyPart;
    this.tailJustAdded = true;
  }

  intersectsItself(){
    let cond = false;

    let x = this.head.position.x;
    let y = this.head.position.y;

    for (let bodyPart of this.bodyParts) {
      if (!(this.tailJustAdded && bodyPart == this.tail)){
        if(bodyPart.position.x == x && bodyPart.position.y == y){
          cond = true;
          break;
        }
      }
    }

    return cond;
  }

  intersectsEdges(edgeLimit){
    let cond = false;

    if (this.head.position.x < 0
      || this.head.position.x >= edgeLimit
      || this.head.position.y < 0
      || this.head.position.y >= edgeLimit) {
        cond = true;
    }
    return cond;
  }
}
