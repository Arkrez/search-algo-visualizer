const body = document.querySelector("body");

function initBoard(const height, const width){
  for(let row = 0; row < height; row++)
  {
    const divRow = document.createElement("div");
    divRow.classList.add("row");
    for(let col = 0; col < width; col++)
    {
      const divCol = document.createElement("div");
      divCol.classList.add("cell");
      myGraph.Add(divCol);
      divRow.appendChild(divCol);
    }
    body.append(divRow);
  }
} 

let Node = {
  Node Up = null;
  Node Down = null;
  Node Left = null;
  Node Right = null; 
  
  let Start = false;
  let Destination = false;
  let isExplored = false;
  
  function Node(let up, let down, let left, let right)
  {
    Up = up;
    Down = down;
    Left = left;
    Right = right;
  }

}
