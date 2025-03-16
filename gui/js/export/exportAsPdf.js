//FRONTEND
document.getElementById("downloadPdfButton").addEventListener("click", () => {
    downloadSvgAsPdf();
  });
  
  function downloadSvgAsPdf() {

    const originalCanvas = document.querySelector("#graph-container svg");
  
    if (!originalCanvas) {
      alert("No visual graph found!");
      return;
    }

    const options = {
      margin: 10,
      filename: "CGV_Graph.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 10 },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
    };
  
    //svg to pdf with html2pdf
    html2pdf().from(originalCanvas).set(options).save();
  }
  //wenn zeit das selbe wie bei png