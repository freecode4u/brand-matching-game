const logos = document.querySelectorAll(".logo");
const dropZones = document.querySelectorAll(".drop-zone");

logos.forEach((logo) => {
  logo.addEventListener("dragstart", handleDragStart);
});

dropZones.forEach((zone) => {
  zone.addEventListener("dragover", (e) => e.preventDefault());
  zone.addEventListener("drop", handleDrop);
});

function handleDragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
}

function handleDrop(e) {
  e.preventDefault();
  const zone = e.target;

  if (!zone.classList.contains("drop-zone")) {
    zone = zone.closest(".drop-zone");
  }

  const logoId = e.dataTransfer.getData("text/plain");
  const draggedLogo = document.getElementById(logoId);

  if (draggedLogo) {
    zone.appendChild(draggedLogo);
  }
}

function restart() {
  window.location.reload();
}

function result() {
  let score = 0;

  dropZones.forEach((zone) => {
    const logo = zone.querySelector(".logo");
    if (logo && logo.id === zone.getAttribute("data-brand")) {
      score++;
    }
  });

  const dialog = document.getElementById("dialog");

  const dialogBody = document.querySelector(".dialog-body");
  dialogBody.innerHTML = `<h2>${score}/${dropZones.length}</h2>`;

  dialog.showModal();

  dialog.addEventListener("close", restart);
}
