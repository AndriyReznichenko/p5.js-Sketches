class GameColorManager {
    static getColor(label){
      switch (label) {
        case 0: //ground
          return [80,100,80]
          break;
        case 1: // snake
          return [100,150,200]
          break;
        case 2: // food
          return [40,200,70]
          break;
        default: [255,80, 0]
      }
    }
}
