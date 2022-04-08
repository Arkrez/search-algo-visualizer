const body = document.querySelector("body");
const graphContainer = document.createElement("div");

let graph = [...Array(6)].map(e => Array(6));


function initBoard(height, width){
  graphContainer.classList.add("graph-container")
  graph = [...Array(height)].map(e => Array(width));
  
  for(let row = 0; row < height; row++)
  {
    const divRow = document.createElement("div");
    divRow.classList.add("row");
    for(let col = 0; col < width; col++)
    {
      
      const divCol = document.createElement("div");
      divCol.classList.add("cell");
      graph[row][col] = new Node(null,null,null,null,divCol);
      divRow.appendChild(divCol);
    }
    graphContainer.appendChild(divRow);
  }
  for(let row = 0; row < height; row++)
  {
    for(let col = 0; col < width; col++)
    {
      if(row > 0)
        graph[row][col].up = graph[row - 1][col];
      else
        graph[row][col].up = null;

      if(row +1 < height)
        graph[row][col].down = graph[row + 1][col];
      else
        graph[row][col].down = null;

      if(col > 0)
        graph[row][col].left = graph[row][col -1];
      else
        graph[row][col].left = null;

      if(col + 1 < width)
        graph[row][col].right = graph[row][col +1];
      else
        graph[row][col].right = null;
      
    }
  }

  body.appendChild(graphContainer);
} 

class Node {
  
  constructor(up, down, left, right, cell)
  {
    this.cell = cell;
    this.up = up;
    this.down = down;
    this.left = left;
    this.right = right;
  }

}
initBoard(2, 2);
