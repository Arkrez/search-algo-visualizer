//Getting reference to html elements
const boardContainer = document.querySelector(".board-container");
const search = document.querySelector(".search-btn")
//initializing graph and creating a variable for cell divs for later
let graph = [...Array(6)].map(e => Array(6));
let changed;
//intializing board and cells
function initBoard(height, width){
  //creating a large container for all of the cells
  const graphContainer = document.createElement("div");
  graphContainer.classList.add("graph-container")
  //making a 2d graph to map nodes to later
  graph = [...Array(height)].map(e => Array(width));
  //looping over the rows
  for(let row = 0; row < height; row++)
  {
    //each row has a div container to hold all columns of that row
    const divRow = document.createElement("div");
    divRow.classList.add("row");
    //looping over all columns of a row
    for(let col = 0; col < width; col++)
    {
      //creating a cell
      const divCol = document.createElement("div");
      divCol.classList.add("cell");
      //updating our graph to have an initial Node that has the appropriate cell mapped to it
      graph[row][col] = new Node(null,null,null,null,divCol);
      //adding event listners to every cell
      divCol.addEventListener('click', function(){
        if(changed != undefined)
        {
          changed.classList.remove("start");
          changed.textContent = "";
        }
        
        changed = divCol;
        changed.classList.add("start");
        divCol.textContent = "Start";
      });
      //adding the div columns to the row holder
      divRow.appendChild(divCol);
    }
    //adding the rwo to the graph container
    graphContainer.appendChild(divRow);
  
    
  }
  //updating the Nodes in the graph to point to neighbors
  UpdateGraphNodes(height, width);
  //adding the graph to the appropriate div in the dom
  boardContainer.appendChild(graphContainer);
} 

function UpdateGraphNodes(height, width)
{
  //TODO: Make this prettier
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
initBoard(20, 20);
