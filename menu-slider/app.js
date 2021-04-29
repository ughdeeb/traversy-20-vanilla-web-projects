const toggle = document.getElementById("toggle");
const close = document.getElementById("close");
const open = document.getElementById("open");
const modal = document.getElementById("modal");

//TOGGLER
toggle.addEventListener("click", () => {
  document.body.classList.toggle("show-nav");
});

//SHOW MODAL
open.addEventListener("click", () => modal.classList.add("show-modal"));

//HIDE MODAL
close.addEventListener("click", () => modal.classList.remove("show-modal"));

//HIDE MODAL ON OUTSIDE CLICK
window.addEventListener("click", (e) =>
  e.target == modal ? modal.classList.remove("show-modal") : false
);
