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
