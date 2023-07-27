const activeMenu = document.querySelector(".menu-icon");
const closeMenu = document.querySelector(".close-menu-icon");

activeMenu.addEventListener("click", () => {
  toggleMenu();
});

closeMenu.addEventListener("click", () => {
  toggleMenu();
});

function toggleMenu() {
  const menuContainer = document.querySelector(".menu-container");
  const overlay = document.querySelector(".overlay");
  menuContainer.classList.toggle("menu-open");
  overlay.style.display = menuContainer.classList.contains("menu-open")
    ? "block"
    : "none";
}
