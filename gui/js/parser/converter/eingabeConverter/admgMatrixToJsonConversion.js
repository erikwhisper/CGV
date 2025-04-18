/**
 * @description Macht aus ADMG-Matrix nen JSON-Objekt
 * @param {string} admgMatrix
 * @returns {JSON} jsonData
 */
function admgMatrixToJsonConversion(admgMatrix) {
  const knotenMap = new Map();
  const links = [];

  const knotenNamen = admgMatrix[0].slice(1);

  knotenNamen.forEach((name) => {
    knotenMap.set(name, uuid.v4());
  });

  for (let i = 1; i < admgMatrix.length; i++) {
    const quellKnotenName = admgMatrix[i][0];
    for (let j = i + 1; j < admgMatrix[i].length; j++) {
      const kantenTypFromTo = parseInt(admgMatrix[i][j]);
      const kantenTypToFrom = parseInt(admgMatrix[j][i]);
      const zielKnotenName = knotenNamen[j - 1];

      const newLinks = admgCreateJsonLinks(
        knotenMap.get(quellKnotenName),
        knotenMap.get(zielKnotenName),
        kantenTypFromTo,
        kantenTypToFrom,
        quellKnotenName,
        zielKnotenName
      );

      if (newLinks) {
        links.push(...newLinks); //einfacher als schleife, öfzer nutzen
      }
    }
  }

  const nodes = Array.from(knotenMap.entries()).map(([name, nodeId]) => ({
    nodeId,
    name,
    nodeColor: "whitesmoke",
    x: null,
    y: null,
    labelOffsetX: 0,
    labelOffsetY: 0,
  }));

  return { nodes, links };
}

function admgCreateJsonLinks(
  quellId,
  zielId,
  kantenTypFromTo,
  kantenTypToFrom,
  quellKnotenName,
  zielKnotenName
) {
  const admgEdgeMap = {
    "0_0": null,
    "2_3": [{ arrowhead: "normal", arrowtail: "tail", isDashed: false }],
    "3_2": [{ arrowhead: "tail", arrowtail: "normal", isDashed: false }],
    "2_2": [{ arrowhead: "normal", arrowtail: "normal", isDashed: true }],
    "5_4": [
      { arrowhead: "normal", arrowtail: "normal", isDashed: true },
      { arrowhead: "tail", arrowtail: "normal", isDashed: false },
    ],
    "4_5": [
      { arrowhead: "normal", arrowtail: "normal", isDashed: true },
      { arrowhead: "normal", arrowtail: "tail", isDashed: false },
    ],
  };

  const key = `${kantenTypFromTo}_${kantenTypToFrom}`;

  if (!admgEdgeMap[key]) return null;

  return admgEdgeMap[key].map((edgeProps) => ({
    linkId: uuid.v4(),
    linkColor: "black",
    source: {
      nodeId: quellId,
      name: quellKnotenName,
      nodeColor: "whitesmoke",
      x: null,
      y: null,
      labelOffsetX: 0,
      labelOffsetY: 0,
    },
    target: {
      nodeId: zielId,
      name: zielKnotenName,
      nodeColor: "whitesmoke",
      x: null,
      y: null,
      labelOffsetX: 0,
      labelOffsetY: 0,
    },
    arrowhead: edgeProps.arrowhead,
    arrowtail: edgeProps.arrowtail,
    linkControlX: 0,
    linkControlY: 0,
    isCurved: false,
    isDashed: edgeProps.isDashed,
  }));
}
