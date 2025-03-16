document.getElementById("matrixFileInput").addEventListener("change", (event) => {
  handleMatrixFileInputController();
});


//Schnittstelle mit dem Frontend
function handleMatrixFileInputController() {
  const fileInput = document.getElementById("matrixFileInput").files[0];
  const isAdmg = document.getElementById("matrixTypeToggle").checked;

  if (!fileInput) {
    alert("Bitte wählen Sie eine Datei aus.");
    return;
  }
  matrixFileReader(fileInput, isAdmg);
}

//Backendfunktion die eine Datei verarbeitet
function matrixFileReader(matrixFileInput, isAdmg) {
  const reader = new FileReader();
  reader.onload = function (event) {
    const matrixString = event.target.result;
    handleMatrixStringInput(matrixString, isAdmg);
  };
  reader.readAsText(matrixFileInput);
}
