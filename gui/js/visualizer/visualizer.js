/***********************************************************/
/***********START: jsonData Visulization for PAG************/
/***********************************************************/

//Eventlistener for basic visualization
let jsonData = JSON.parse('{"nodes": [],"links": []}');
let contextMenusInitialized = false;

document
  .getElementById("pagVisualizeJsonWithD3")
  .addEventListener("click", () => {
    resetCheckBoxes();
    visualizeJsonWithD3();
  });

//Setzt bei jeder neuen Visualisierung die Checkboxes zurück und grid
function resetCheckBoxes() {
  //reset grid clipping
  document.getElementById("gridClippingToggle").checked = false;
  const svg = d3.select("svg");
  svg.selectAll(".grid-line").remove();

  //more checkboxes to be cleared...
}

//Main-Methode
function visualizeJsonWithD3() {

  const svg = initializeSvgCanvas();

  const gridSpacing = 50; //ALERT: currently declared twice, once here in visualizer.js and once in grid.js to avoid a global variable

  initializeNodeCoordinates(gridSpacing * 4); //initiales clipping nutz doppelt so breites gridSpacing

  drawEverything(svg);

  if (!contextMenusInitialized) {
    handleAllContextMenus(svg);
    contextMenusInitialized = true; //setze den Flag auf true, um die erneute Kontextmenü-Erstellung zu verhindern
  }

  handleAllInteractiveDrags(svg, gridSpacing);

  addNewLink(svg, gridSpacing);

  addNewNode(svg, gridSpacing);

  updatePagJsonDisplay();
}



//----------START: SETUP SUPERIOR DRAWING FUNCTIONS, CONTEXTMENUS, LEFT-CLICKS --------------//

//Alles Utility Functions die ich nirgendwo gut untergebracht bekommen hab,
//refactor wenn zeit

//UTIL calls the functions that draw the three objects
function drawEverything(svg) {
  drawLinks(svg);
  drawNodes(svg);
  drawLabels(svg);
}

//UTIL: calls teh functions that create the contextmenus
function handleAllContextMenus(svg) {
  linkContextMenu(svg);
  console.log("Link context menu initialized.");

  nodeContextMenu(svg);
  console.log("Node context menu initialized.");

  labelContextMenu(svg);
  console.log("Label context menu initialized.");
}

//UTIL: calls the functions that implement the leftclick for the three objects
function handleAllInteractiveDrags(svg, gridSpacing) {
  svg.selectAll(".link").on(".drag", null); //das geht doch eh nicht? aber ist auch egal oder? fix wenn zeit
  svg.selectAll(".node").on(".drag", null); //das geht doch eh nicht? aber ist auch egal oder? fix wenn zeit
  linkInteractiveDrag(svg, gridSpacing);
  nodeInteractiveDrag(svg, gridSpacing);
  //labelInteractiveClick(svg, jsonData, gridSpacing); //man könnte lowkey nen drag&drop für labelOffsexX/Y einfügen
}

//UTIL: Wird in mehreren Funktionen zur berechnung der Kante genutzt
function calculateLinkPath(selectedLink) {
  const { x: x1, y: y1 } = selectedLink.source;
  const { x: x2, y: y2 } = selectedLink.target;

  if (!selectedLink.isCurved) {
    selectedLink.linkControlX = (x1 + x2) / 2;
    selectedLink.linkControlY = (y1 + y2) / 2;
  }

  return `M ${x1},${y1} Q ${selectedLink.linkControlX},${selectedLink.linkControlY} ${x2},${y2}`;
}

//----------END: SETUP SUPERIOR DRAWING FUNCTIONS, CONTEXTMENUS, LEFT-CLICKS --------------//

//----------START: UPDATE JSONDATA TEXTAREA--------------//

function updatePagJsonDisplay() {
  //maybe add instant conversion to dot and matrix!!
  const jsonDisplay = document.getElementById("jsonDisplay");

  jsonDisplay.value = JSON.stringify(jsonData, null, 2);
}

//----------END: UPDATE JSONDATA TEXTAREA--------------//
