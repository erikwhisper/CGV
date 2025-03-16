/***********************************************************/
/******************START: Grid Functions********************/
/***********************************************************/
//Eventlistener for grid clipping
document
  .getElementById("gridClippingToggle")
  .addEventListener("change", (event) => {
    const svg = d3.select("#graph-container").select("svg");

    const gridSpacing = 50; //ALERT: currently declared twice, once here in visualizer.js and once in grid.js to avoid a global variable

    if (!svg.empty()) {
      //checks if there already exists a gird
      if (svg.selectAll(".grid-line").empty()) {
        drawGrid(svg, gridSpacing);
      } else {
        svg.selectAll(".grid-line").remove();
      }
    }
  });

function drawGrid(svg, gridSpacing) {
  //clear grid, if present
  svg.selectAll(".grid-line").remove();

  const width = parseInt(svg.attr("width"), 10);
  const height = parseInt(svg.attr("height"), 10);

  const refinedSpacing = gridSpacing / 2;

  const gridGroup = svg.append("g").attr("class", "grid");

  //draw lines
  for (let x = 0; x < width; x += refinedSpacing) {
    gridGroup
      .append("line")
      .attr("class", "grid-line")
      .attr("x1", x)
      .attr("y1", 0)
      .attr("x2", x)
      .attr("y2", height)
      .attr("stroke", "#ccc")
      .attr("stroke-width", x % gridSpacing === 0 ? 1 : 0.5);
  }
  for (let y = 0; y < height; y += refinedSpacing) {
    gridGroup
      .append("line")
      .attr("class", "grid-line")
      .attr("x1", 0)
      .attr("y1", y)
      .attr("x2", width)
      .attr("y2", y)
      .attr("stroke", "#ccc")
      .attr("stroke-width", y % gridSpacing === 0 ? 1 : 0.5);
  }
  //at the bottom layer
  //refactor und mach grid auch zu einer "g"-layer wenn zeit
  gridGroup.lower();
}
/***********************************************************/
/*******************END: Grid Functions*********************/
/***********************************************************/
