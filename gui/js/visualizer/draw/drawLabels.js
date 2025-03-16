//FRONTEND
function drawLabels(svg) {
  const labelGroup = svg.select("#label-layer");

  const newLabel = labelGroup
    .selectAll(".node-label")
    .data(jsonData.nodes)
    .enter()
    .append("text")
    .attr("id", (d) => `label-${d.nodeId}`) //ist erreichbar über label + die nodeId
    .attr("class", "node-label")
    .attr("x", (d) => d.x + d.labelOffsetX)
    .attr("y", (d) => d.y + d.labelOffsetY)
    .attr("dy", 5)
    .attr("text-anchor", "middle")
    .text((d) => d.name) //nutzt d.name als anzeige name
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
