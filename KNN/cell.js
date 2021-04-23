class Cell{
  constructor(x, y, size, label){
    this.position = createVector(x,y);
    this.size = size;
    this.label = label;
  }

  show(){
    noStroke();
    let color = Point.getLabelColor(this.label);
    //r,g,b,alpha
    fill(color[0], color[1], color[2], 100);
    rect(this.position.x * this.size,
            this.position.y * this.size,
            this.size,
            this.size);
  }
}
