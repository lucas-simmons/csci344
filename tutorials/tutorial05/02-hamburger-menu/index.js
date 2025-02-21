// Your code here.

function toggleMenu() {
  const menu = document.querySelector("button");
  menu.classList.toggle("active");
  const content = document.querySelector("ul");
  content.classList.toggle("active");
}
