//FRONTEND
//Wenn Zeit die mit drawLabels verbinden und refactorn
function drawNewLabel(svg, node) {
  const labelLayer = svg.select("#label-layer");

  const newLabel = labelLayer
    .append("text")
    .datum(node)
    .attr("id", `label-${node.nodeId}`)
    .attr("class", "node-label")
    .attr("x", node.x + node.labelOffsetX)
    .attr("y", node.y + node.labelOffsetY)
    .attr("dy", 5)
    .attr("text-anchor", "middle")
    .text(node.name)
    .attr("fill", "black")
    .style("font-size", "15px")
    .style("pointer-events", "all")
    .style("user-select", "none");

  newLabel.on("contextmenu", function (event, d) {
    event.preventDefault();

    const menu = document.getElementById("label-context-menu");
    menu.style.display = "block";
    menu.style.left = `0px`;
    menu.style.top = `10%`;

    menu.setAttribute("data-label-id", d.nodeId);
  });
}
