document.getElementById("dotFileInput").addEventListener("change", (event) => {
  handleDotFileInputController();
});


//Schnittstelle mit dem Frontend
function handleDotFileInputController() {
  const isAdmg = document.getElementById("matrixTypeToggle").checked;
  const fileInput = document.getElementById("dotFileInput").files[0];
  if (!fileInput) {
    alert("Bitte wählen Sie eine Datei aus.");
    return;
  }
  dotFileReader(isAdmg, fileInput);
}

//Backendfunktion die eine Datei verarbeitet
function dotFileReader(isAdmg, dotFileInput) {
  const reader = new FileReader();
  reader.onload = function (event) {
    const dotString = event.target.result;
    handleDotStringInput(isAdmg, dotString);
  };
  reader.readAsText(dotFileInput);
}
