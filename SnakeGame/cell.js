class Cell{
  constructor(x, y, size, label){
    //row,column
    this.position = createVector(x,y);
    this.size = size;
    this.label = label;
  }

  show(){
    //noStroke();
    strokeWeight(1);
    let color = GameColorManager.getColor(this.label);

    //r,g,b,alpha
    fill(color);
    rect(this.position.x * this.size,
            this.position.y * this.size,
            this.size,
            this.size);
  }
}
