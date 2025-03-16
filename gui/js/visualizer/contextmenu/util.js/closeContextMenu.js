//Schliesst Kontextmenü bei Klick auf Canvas
function closeContextMenu(contextMenuType) {  
    document.addEventListener("click", (event) => {
      const menu = document.getElementById(contextMenuType);
      if (!menu.contains(event.target)) {
        menu.style.display = "none";
      }
    });
  }