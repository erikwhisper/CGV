//FRONTEND
document.getElementById("downloadPngButton").addEventListener("click", () => {
  downloadSvgAsPng();
});

function downloadSvgAsPng() {
  const originalCanvas = document.querySelector("#graph-container svg");

  if (!originalCanvas) {
    alert("No visual graph found!");
    return;
  }

  const canvasString = new XMLSerializer().serializeToString(originalCanvas);

  const newCanvas = document.createElement("canvas");

  const newCanvasContext = newCanvas.getContext("2d");

  const scaleFactor = 10;

  const originalCanvasWidth = parseInt(originalCanvas.getAttribute("width"));
  const originalCanvasHeight = parseInt(originalCanvas.getAttribute("height"));

  newCanvas.width = originalCanvasWidth * scaleFactor;
  newCanvas.height = originalCanvasHeight * scaleFactor;

  newCanvasContext.scale(scaleFactor, scaleFactor); //skalierung anwenden

  const image = new Image();

  const canvasBlob = new Blob([canvasString], {
    type: "image/svg+xml;charset=utf-8",
  });

  const url = URL.createObjectURL(canvasBlob);

  image.onload = function () {
    newCanvasContext.fillStyle = "#ffffff";
    newCanvasContext.fillRect(0, 0, newCanvas.width, newCanvas.height);
    newCanvasContext.drawImage(
      image,
      0,
      0,
      originalCanvasWidth,
      originalCanvasHeight
    );

    const link = document.createElement("a");
    link.download = "graph.png";
    link.href = newCanvas.toDataURL("image/png");
    link.click();

    URL.revokeObjectURL(url);
  };

  image.src = url;
}
//wenn zeit auswahl auf nur graphenelemente per layers beschränken
//voll ist overkill