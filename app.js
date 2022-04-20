//Getting reference to html elements
const boardContainer = document.querySelector(".board-container");
const search = document.querySelector(".search-btn")
const endPoints = document.querySelector("#end-points");
const clear = document.querySelector(".clear-btn");
const speed = document.getElementById("speed");
const rainbowEle = document.querySelector(".rainbow-mode");
const drawWalls = document.querySelector(".draw-walls-btn");
document.body.onmouseup = ()=>{
  canDraw = false;
}
//initializing graph and creating a variable for cell divs for later
let graph = [...Array(6)].map(e => Array(6));
let startPointNode;
let endPointNode;
let start = graph[3][3];
let end = graph[5][5];
let isGraphMade = false;
let isRainbow = false;
let wallOn = false;
let canDraw = false;
//intializing board and cells
function initBoard(height, width){
  //creating a large container for all of the cells
  if(isGraphMade)
  {
    const toRemove = document.getElementsByClassName("graph-container");
    boardContainer.removeChild(toRemove[0]);
  }
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
     
      divCol.addEventListener('mousedown', function(){
          canDraw = true;
          makeWall(graph[row][col]);
        });
      

      
      divCol.addEventListener('mouseover', function(){
        
        makeWall(graph[row][col]);
      });
      
      
      divCol.addEventListener('click', function(){
        if(endPoints.selectedIndex == 0 && !wallOn)
        {
          
            if(startPointNode != undefined)
            {
              startPointNode.cell.classList.remove("start");
              startPointNode.cell.textContent = "";
            }
            
            startPointNode = graph[row][col];
            start = startPointNode;
            startPointNode.cell.classList.add("start");
            startPointNode.cell.textContent = "O";
          
          
        }
        else if(endPoints.selectedIndex == 1 && !wallOn)
        {
          
            if(endPointNode != undefined)
            {
              endPointNode.cell.classList.remove("end");
              endPointNode.cell.textContent = "";
            }
            
            endPointNode = graph[row][col];
            end= endPointNode;
            endPointNode.cell.classList.add("end");
            endPointNode.cell.textContent = "X";
          
          
        }
        
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
  isGraphMade = true;
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
    
    this.up = up;
    this.down = down;
    this.left = left;
    this.right = right;
    this.cell = cell;
    this.distance = Infinity;
    this.isWall = false;
  }

}
class Queue
{
    // Array is used to implement a Queue
    constructor()
    {
        this.items = [];
    }
                  
    // Functions to be implemented
    
    // enqueue function
    enqueue(element)
    {    
        // adding element to the queue
        this.items.push(element);
    }
   // dequeue function
    dequeue()
    {
      // removing element from the queue
      // returns underflow when called
      // on empty queue
      if(this.isEmpty())
        return "Underflow";
      return this.items.shift();
    }

    // front function
    front()
    {
      // returns the Front element of
      // the queue without removing it.
      if(this.isEmpty())
        return "No elements in Queue";
      return this.items[0];
    }

    
    // isEmpty function
    isEmpty()
    {
        // return true if the queue is empty.
        return this.items.length == 0;
    }
    // printQueue function
    printQueue()
    {
      var str = "";
      for(var i = 0; i < this.items.length; i++)
        str += this.items[i] +" ";
      return str;
    }

}

initBoard(50, 50);

function DjkstrasSearch(start = graph[0][0], end = graph[15][15])
{
  let r, g, b;
  //creating a shortest-path-tree set
  const seen = new Set();
  const sptSet = new Set();
  const queueToSearch = new Queue();
  graph.forEach(node => {
    node.distance = Infinity;
  });
  start.distance = 0;
  queueToSearch.enqueue(start);
  console.log(queueToSearch)
  let i = 0;
  let delay = 0;
  while(!sptSet.has(end))
  {
    console.log("running");
    let searchingNode = queueToSearch.dequeue();
    
    //searchingNode.cell.style.backgroundColor = "pink";
    seen.add(searchingNode);
    sptSet.add(searchingNode);
    searchingNode.cell.classList.add("cell-filled");
    delay = i;
    searchingNode.cell.style.transitionDelay = (1 * i)/(speed.value != "" ? speed.value : 50) + 's';
    if (isRainbow)
    {
      r = Math.round(Math.random() * 255);
      g = Math.round(Math.random() * 255);
      b = Math.round(Math.random() * 255);
    }
    else
    {
      r = 0;
      g = 212;
      b = 255;
    }
   
    searchingNode.cell.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    //Add each direction of a node into the quueu as long as the direction does not exist in our set of explored nodes
    if(searchingNode.up != null && !sptSet.has(searchingNode.up) && !seen.has(searchingNode.up))
    {
      seen.add(searchingNode.up);
      if(!searchingNode.up.isWall)
      {
        queueToSearch.enqueue(searchingNode.up);
        searchingNode.up.distance = searchingNode.distance+ 1;
      }
        
    }
   
    if(searchingNode.down != null && !sptSet.has(searchingNode.down)&& !seen.has(searchingNode.down))
    {
      seen.add(searchingNode.down);
      if(!searchingNode.down.isWall)
      {
        queueToSearch.enqueue(searchingNode.down);
        searchingNode.down.distance = searchingNode.distance+1;
      }
    }
    
    if(searchingNode.left != null && !sptSet.has(searchingNode.left)&& !seen.has(searchingNode.left))
    {
      seen.add(searchingNode.left);
      if(!searchingNode.left.isWall)
        {
          queueToSearch.enqueue(searchingNode.left);
          searchingNode.left.distance = searchingNode.distance+1;
        }
    }
    if(searchingNode.right != null && !sptSet.has(searchingNode.right) && !seen.has(searchingNode.right))
    {
      seen.add(searchingNode.right);
      if(!searchingNode.right.isWall)
      {
        queueToSearch.enqueue(searchingNode.right);
        searchingNode.right.distance = searchingNode.distance+1;
      }
    }
    
    i++;
    
  }
  //change the color of end node to green if found
  if(sptSet.has(end))
  {
    end.cell.style.backgroundColor = "lightgreen";
  }
  let curr = end;
  for(let index = 0; index < end.distance +1; index++)
  {
    curr.cell.style.backgroundColor = '';
    curr.cell.classList.add("shortest-path")
    
    if(curr.up != null && curr.up.distance == curr.distance - 1)
    {
      curr = curr.up;
      continue;
    }
    if(curr.down != null && curr.down.distance == curr.distance - 1)
    {
      curr = curr.down;
      continue;
    }
    if(curr.left != null && curr.left.distance == curr.distance - 1)
    {
      curr = curr.left;
      continue;
    }
    if(curr.right != null && curr.right.distance == curr.distance - 1)
    {
      curr = curr.right;
      continue;
    }
  }

}
//Have to nest event listeners here or the search will trigger as soon as the page loads due to bubbling
search.addEventListener('click', e=>{e.stopPropagation()
  search.addEventListener('click', DjkstrasSearch(start, end));
});
clear.addEventListener('click', e=>{e.stopPropagation()
  clear.addEventListener('click', initBoard(30, 30));
});
drawWalls.addEventListener('click', e=>{e.stopPropagation()
  drawWalls.addEventListener('click', toggleDrawWalls());
});

rainbowEle.addEventListener('click', function(){
  isRainbow = !isRainbow;
  if(isRainbow)
  {
    rainbowEle.classList.add("rainbow-on");
  }
  else
  {
    rainbowEle.classList.remove("rainbow-on");
  }
  console.log(isRainbow);
});
function toggleDrawWalls(){
  wallOn = !wallOn;
  if(wallOn)
  {
    drawWalls.classList.add("wall-on");
  }
  else
  {
    drawWalls.classList.remove("wall-on");
  }
}
function makeWall(node){
  if(wallOn && canDraw)
  {
    node.cell.classList.add("wall-active");
    node.isWall = true;
  }
    
}



