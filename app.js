const body = document.querySelector("body");
const graphContainer = document.createElement("div");
function initBoard(height, width){
  graphContainer.classList.add("graph-container")
  for(let row = 0; row < height; row++)
  {
    const divRow = document.createElement("div");
    divRow.classList.add("row");
    for(let col = 0; col < width; col++)
    {
      const divCol = document.createElement("div");
      divCol.classList.add("cell");
     
      divRow.appendChild(divCol);
    }
    graphContainer.appendChild(divRow);
  }

  body.appendChild(graphContainer);
} 
initBoard(20, 20);
class Node {
  
  constructor(up, down, left, right)
  {
    this.up = up;
    this.down = down;
    this.left = left;
    this.right = right;
  }

}
