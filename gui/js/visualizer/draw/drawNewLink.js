//FRONTEND
//Wenn Zeit die mit drawLinks verbinden und refactorn
function drawNewLink(svg, link) {
  const linkLayer = svg.select("#link-layer");

  const linkSelection = linkLayer
    .append("path")
    .datum(link)
    .attr("class", "link")
    .attr("id", `link-${link.linkId}`)
    .attr("stroke", (d) => d.linkColor)
    .attr("stroke-width", 2)
    .attr("fill", "none")
    .each(function (d) {
      if (d.isDashed) {
        d3.select(this).attr("stroke-dasharray", "4 2");
      }
    })
    .attr("marker-end", (d) => {
      if (d.arrowhead) {
        const markerId = `marker-${d.linkId}-end`;
        setupArrowMarker(svg, markerId, d.arrowhead, d.linkColor, "auto");
        return `url(#${markerId})`;
      }
      return null;
    })
    .attr("marker-start", (d) => {
      if (d.arrowtail) {
        const markerId = `marker-${d.linkId}-start`;
        setupArrowMarker(
          svg,
          markerId,
          d.arrowtail,
          d.linkColor,
          "auto-start-reverse"
        );
        return `url(#${markerId})`;
      }
      return null;
    })
    .attr("d", calculateLinkPath(link));

  linkSelection.on("contextmenu", function (event, d) {
    event.preventDefault();

    const menu = document.getElementById("link-context-menu");
    menu.style.display = "block";
    menu.style.left = `0px`;
    menu.style.top = `10%`;

    menu.setAttribute("data-link-id", d.linkId);
  });
}
