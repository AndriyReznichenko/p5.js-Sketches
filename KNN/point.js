class Point{
  constructor(x, y, size, label){
    this.position = createVector(x,y);
    this.size = size;
    this.label = label;
  }

  show(){
    noStroke();
    let color = Point.getLabelColor(this.label);
    fill(color);
    ellipse(this.position.x,
            this.position.y,
            this.size, 
            this.size);
  }

  static getLabelColor(label){

    switch (label) {
      case -1: return [50,50,50];
      case 0: return [200,40,50];
      case 1: return [60,220,30];
      case 2: return [60,30,210];
    }
  }
}
