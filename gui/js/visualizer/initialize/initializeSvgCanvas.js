function initializeSvgCanvas() {
  const containerId = "#graph-container";

  d3.select(containerId).selectAll("*").remove();

  const width = d3.select(containerId).node().offsetWidth;
  const height = d3.select(containerId).node().offsetHeight;

  const svg = d3
    .select(containerId)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .on("contextmenu", (event) => {
      event.preventDefault(); //stelle standart contextmenu vom browser aus
    });

  svg.append("g").attr("id", "link-layer"); //Kanten-Ebene
  svg.append("g").attr("id", "node-layer"); //Knoten-Ebene
  svg.append("g").attr("id", "label-layer"); //Knotennamen-Ebene

  return svg;
}
