//Controller
function addNewLink(svg, gridSpacing) {
  let firstNode = null;

  svg.selectAll(".node").on("click", null);

  svg.selectAll(".node").on("click", function (event, selectedNode) {
    if (!firstNode) {
      firstNode = selectedNode;

      highlightFirstNode(firstNode, "green");
    } else if (selectedNode.nodeId !== firstNode.nodeId) {
      const secondNode = selectedNode;

      const newLink = createNewLink(firstNode, secondNode);

      addNewLinkToJson(newLink);

      drawNewLink(svg, newLink);

      linkInteractiveDrag(svg, gridSpacing);

      resetFirstNodeColor(firstNode);
      firstNode = null;
    } else {
      resetFirstNodeColor(firstNode);
      firstNode = null;
    }
  });
}

//BACKEND
function createNewLink(firstNode, secondNode) {
  return {
    linkId: uuid.v4(),
    linkColor: "black",
    source: firstNode,
    target: secondNode,
    arrowhead: "normal",
    arrowtail: "tail",
    linkControlX: (firstNode.x + secondNode.x) / 2,
    linkControlY: (firstNode.y + secondNode.y) / 2,
    isCurved: false,
    isDashed: false,
  };
}

//BACKEND
function addNewLinkToJson(newLink) {
  jsonData.links.push(newLink);
  updatePagJsonDisplay();
}

//FRONTEND
function highlightFirstNode(firstNode, color) {
  d3.select(`#node-${firstNode.nodeId}`).attr("fill", color);
}

//FRONTEND
function resetFirstNodeColor(firstNode) {
  d3.select(`#node-${firstNode.nodeId}`).attr("fill", firstNode.nodeColor);
}
