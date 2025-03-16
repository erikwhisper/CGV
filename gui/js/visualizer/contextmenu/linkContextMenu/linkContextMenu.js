function linkContextMenu(svg) {
  //wenn ein kontextmenu geöffnet wird sollen die anderen beiden falls offen geschlossen werden.
  //impl wenn zeit
  setupContextMenu(
    svg,
    ".link",
    "link-context-menu",
    "data-link-id",
    (d) => d.linkId //unique linkId
  );
  setupLinkContextMenuInteractions();
  closeContextMenu("link-context-menu");
}

function setupLinkContextMenuInteractions() {
  document
    .getElementById("arrowhead-normal")
    .addEventListener("click", () => updateArrowhead("normal"));
  document
    .getElementById("arrowhead-odot")
    .addEventListener("click", () => updateArrowhead("odot"));
  document
    .getElementById("arrowhead-tail")
    .addEventListener("click", () => updateArrowhead("tail"));

  document
    .getElementById("arrowtail-normal")
    .addEventListener("click", () => updateArrowtail("normal"));
  document
    .getElementById("arrowtail-odot")
    .addEventListener("click", () => updateArrowtail("odot"));
  document
    .getElementById("arrowtail-tail")
    .addEventListener("click", () => updateArrowtail("tail"));

  document
    .getElementById("straighten-link")
    .addEventListener("click", resetLinkCurve);
  document
    .getElementById("toggle-dashed-link")
    .addEventListener("click", toggleDashed);
  document.getElementById("delete-link").addEventListener("click", deleteLink);
  setupLinkColorPalette();
}

//Controller: Backend und Frontend
function updateArrowhead(type) {
  const linkId = getSelectedLinkId();
  updateArrowheadJson(linkId, type);
  updateArrowheadVisualization(linkId);
  updatePagJsonDisplay();
}

//Backend: Aktualisiert Arrowhead im jsonData
function updateArrowheadJson(linkId, type) {
  const selectedLink = jsonData.links.find((link) => link.linkId === linkId);
  selectedLink.arrowhead = type;
}

//Frontend: Aktualisiert die Darstellung des Arrowheads
function updateArrowheadVisualization(linkId) {
  const selectedLink = jsonData.links.find((link) => link.linkId === linkId);
  const markerId = `marker-${selectedLink.linkId}-end`;
  setupArrowMarker(
    d3.select("svg"),
    markerId,
    selectedLink.arrowhead,
    selectedLink.linkColor,
    "auto"
  );
  d3.select(`#link-${selectedLink.linkId}`).attr(
    "marker-end",
    `url(#${markerId})`
  );
}

//Controller: Backend und Frontend
function updateArrowtail(type) {
  const linkId = getSelectedLinkId();
  updateArrowtailJson(linkId, type);
  updateArrowtailVisualization(linkId);
  updatePagJsonDisplay();
}

//Backend: Aktualisiert Arrowtail im jsonData
function updateArrowtailJson(linkId, type) {
  const selectedLink = jsonData.links.find((link) => link.linkId === linkId);
  selectedLink.arrowtail = type;
}

//Frontend: Aktualisiert die Darstellung des Arrowtails
function updateArrowtailVisualization(linkId) {
  const selectedLink = jsonData.links.find((link) => link.linkId === linkId);
  const markerId = `marker-${selectedLink.linkId}-start`;
  setupArrowMarker(
    d3.select("svg"),
    markerId,
    selectedLink.arrowtail,
    selectedLink.linkColor,
    "auto-start-reverse"
  );
  d3.select(`#link-${selectedLink.linkId}`).attr(
    "marker-start",
    `url(#${markerId})`
  );
}

//Controller: Backend und Frontend
function toggleDashed() {
  const linkId = getSelectedLinkId();
  toggleDashedJson(linkId);
  toggleDashedVisualization(linkId);
  updatePagJsonDisplay();
}

//Backend: negiert den aktuellen Wert von isDashed
function toggleDashedJson(linkId) {
  const selectedLink = jsonData.links.find((link) => link.linkId === linkId);
  selectedLink.isDashed = !selectedLink.isDashed;
}

//Frontend: abhängig von isDashed wird die Linie gestrichelte oder durchgezogen dargestellt.
function toggleDashedVisualization(linkId) {
  const selectedLink = jsonData.links.find((link) => link.linkId === linkId);
  d3.select(`#link-${selectedLink.linkId}`).attr(
    "stroke-dasharray",
    selectedLink.isDashed ? "4 2" : null
  );
}

//Controller: Backend und Frontend
function deleteLink() {
  const linkId = getSelectedLinkId();
  deleteLinkJson(linkId);
  deleteLinkVisualization(linkId);
  updatePagJsonDisplay();
}
//Backend: Loescht einen Link mit übereinstimmender Id
function deleteLinkJson(linkId) {
  jsonData.links = jsonData.links.filter((link) => link.linkId !== linkId);
}

//Frontend: Entfernt Link aus der visualisierung
function deleteLinkVisualization(linkId) {
  d3.select(`#link-${linkId}`).remove();
}

//Frontend: Holt die ID des aktuell ausgewählten Links
function getSelectedLinkId() {
  const linkMenu = document.getElementById("link-context-menu");
  return linkMenu ? linkMenu.getAttribute("data-link-id") : null;
}

//Backend und Frontend
function resetLinkCurve() {
  const linkId = getSelectedLinkId();
  resetLinkCurveJson(linkId);
  resetLinkCurveVisualization(linkId);
  updatePagJsonDisplay();
}

//Backend: Setzt die Krpmmung zurück
function resetLinkCurveJson(linkId) {
  const selectedLink = jsonData.links.find((link) => link.linkId === linkId);
  if (!selectedLink) return;

  selectedLink.linkControlX =
    (selectedLink.source.x + selectedLink.target.x) / 2;
  selectedLink.linkControlY =
    (selectedLink.source.y + selectedLink.target.y) / 2;
  selectedLink.isCurved = false;
}

function resetLinkCurveVisualization(linkId) {
  const selectedLink = jsonData.links.find((link) => link.linkId === linkId);
  if (!selectedLink) return;

  d3.select(`#link-${selectedLink.linkId}`).attr(
    "d",
    calculateLinkPath(selectedLink)
  );
}

//Frontend: Setzt die Farbpalette für Links
//refactor mit setupNodeColorPallate, zu setupColorPallate wenn Zeit
function setupLinkColorPalette() {
  const palette = document.getElementById("link-color-palette");
  palette.innerHTML = "";
  allowedColors.forEach((color) => {
    const swatch = document.createElement("div");
    swatch.className = "color-swatch";
    swatch.style.backgroundColor = color;
    swatch.addEventListener("click", () =>
      changeLinkColor(getSelectedLinkId(), color)
    );
    palette.appendChild(swatch);
  });
}

//Controller: Backend, Frontend
function changeLinkColor(linkId, color) {
  changeLinkColorJson(linkId, color);
  changeLinkColorVisualization(linkId);
  updatePagJsonDisplay();
}

//Backend: ändert die farbe eines Links
function changeLinkColorJson(linkId, color) {
  const selectedLink = jsonData.links.find((link) => link.linkId === linkId);
  selectedLink.linkColor = color;
}

//Frontend: ändert die Farbe eines Links
function changeLinkColorVisualization(linkId) {
  const selectedLink = jsonData.links.find((link) => link.linkId === linkId);
  d3.select(`#link-${selectedLink.linkId}`).attr(
    "stroke",
    selectedLink.linkColor
  );
  updateArrowheadVisualization(linkId);
  updateArrowtailVisualization(linkId);
}
