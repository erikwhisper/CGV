function initializeNodeCoordinates(gridSpacing) {
  const amoutOfColumns = Math.ceil(Math.sqrt(jsonData.nodes.length));

  if (jsonData.nodes.length > 35) {
    gridSpacing = gridSpacing / 2;
  }

  jsonData.nodes.forEach((node, index) => {
    if (node.x === null || node.y === null) {
      node.x = (index % amoutOfColumns) * gridSpacing + gridSpacing;
      node.y = Math.floor(index / amoutOfColumns) * gridSpacing + gridSpacing;
    }
  });

  jsonData.links.forEach((link) => {
    link.source = jsonData.nodes.find(
      (node) => node.nodeId === link.source.nodeId
    );
    link.target = jsonData.nodes.find(
      (node) => node.nodeId === link.target.nodeId
    );
  });

  initializeLinkOffsets();
}

function initializeLinkOffsets() {
  //geht alle links durch
  for (let i = 0; i < jsonData.links.length; i++) {
    const link = jsonData.links[i];

    let zweiterLink = false;

    //prüfe ob es einen anderen link zwischen den knoten schnot gibt
    for (let j = 0; j < i; j++) {
      const vorherigeLinks = jsonData.links[j];

      if (
        (vorherigeLinks.source.nodeId === link.source.nodeId &&
          vorherigeLinks.target.nodeId === link.target.nodeId) ||
        (vorherigeLinks.source.nodeId === link.target.nodeId &&
          vorherigeLinks.target.nodeId === link.source.nodeId)
      ) {
        zweiterLink = true;
      }
    }

    const midX = (link.source.x + link.target.x) / 2;
    const midY = (link.source.y + link.target.y) / 2;

    //offset für zweiten link erstellen
    if (zweiterLink) {
      const dx = link.target.x - link.source.x;
      const dy = link.target.y - link.source.y;
      const length = Math.sqrt(dx * dx + dy * dy);
      const x = -dy / length;
      const y = dx / length;
      const offset = 100;
      link.isCurved = true;
      link.linkControlX = midX + x * offset;
      link.linkControlY = midY + y * offset;
      //normal erstellen
    } else {
      link.isCurved = false;
      link.linkControlX = midX;
      link.linkControlY = midY;
    }
  }
}
