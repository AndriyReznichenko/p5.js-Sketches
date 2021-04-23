function updateGrid(points, grid, k){
  let cells = grid.flat();

  for(cell of cells){
    let distances = [];
    for (var i = 0; i < points.length; i++) {
      distances[i] = {
        label: points[i].label,
        distance: dist(
          cell.position.x * cell.size + cell.size / 2,
          cell.position.y * cell.size + cell.size / 2,
          points[i].position.x,
          points[i].position.y)
      };
    }

      distances = distances.sort((a,b)=> {
        if (a.distance < b.distance) {
          return -1;
        }
        if (a.distance > b.distance) {
          return 1;
        }
        return 0;
      });

      distances = distances.slice(0, k);
      distances = distances.map(el => el.label);

      cell.label = mode(distances)[0];
  }
}
