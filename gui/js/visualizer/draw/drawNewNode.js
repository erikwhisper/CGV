//FRONTEND
//Wenn Zeit die mit drawNodes verbinden und refactorn
function drawNewNode(svg, node) {
  const nodeLayer = svg.select("#node-layer");

  const newNode = nodeLayer
    .append("circle")
    .datum(node)
    .attr("id", `node-${node.nodeId}`)
    .attr("class", "node")
    .attr("r", 15)
    .attr("fill", node.nodeColor)
    .attr("stroke", "black")
    .attr("stroke-width", 1.5)
    .attr("cx", node.x)
    .attr("cy", node.y);

  newNode.on("contextmenu", function (event, d) {
    event.preventDefault();

    const menu = document.getElementById("node-context-menu");
    menu.style.display = "block";
    menu.style.left = `0px`;
    menu.style.top = `10%`;

    menu.setAttribute("data-node-id", d.nodeId);
  });
}
