document.getElementById("jsonFileInput").addEventListener("change", (event) => {
  handleJsonFileInputController();
});


//Schnittstelle mit dem Frontend
function handleJsonFileInputController() {
  const fileInput = document.getElementById("jsonFileInput").files[0];
  const isAdmg = document.getElementById("matrixTypeToggle").checked;

  if (!fileInput) {
    alert("Bitte wählen Sie eine Datei aus.");
    return;
  }
  jsonFileReader(fileInput, isAdmg);
}

//Backendfunktion die eine Datei verarbeitet
function jsonFileReader(jsonFileInput, isAdmg) {
  const reader = new FileReader();
  reader.onload = (event) => {
    const jsonString = event.target.result;
    handleJsonStringInput(jsonString, isAdmg);
  };
  reader.readAsText(jsonFileInput);
}

