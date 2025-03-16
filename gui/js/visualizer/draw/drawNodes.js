//FRONTEND
function drawNodes(svg) {
  const nodeGroup = svg.select("#node-layer");

  const newNode = nodeGroup
    .selectAll(".node")
    .data(jsonData.nodes)
    .enter()
    .append("circle")
    .attr("id", (d) => `node-${d.nodeId}`)
    .attr("class", "node")
    .attr("r", 15)
    .attr("fill", (d) => d.nodeColor)
    .attr("stroke", "black")
    .attr("stroke-width", 1.5)
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y);

  newNode.on("contextmenu", function (event, d) {
    event.preventDefault();

    const menu = document.getElementById("node-context-menu");
    menu.style.display = "block";
    menu.style.left = `0px`;
    menu.style.top = `10%`;

    menu.setAttribute("data-node-id", d.nodeId);
  });
}
