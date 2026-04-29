function loadPartial(id, path, callback) {
  const el = document.getElementById(id);
  if (!el) return;

  fetch(path)
    .then(r => r.text())
    .then(html => {
      el.innerHTML = html;
      if (typeof callback === "function") callback();
    });
}

function initBurger() {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".main-nav ul");
  const links = nav ? nav.querySelectorAll("a") : [];

  if (!burger || !nav) return;

  function closeMenu() {
    burger.setAttribute("aria-expanded", "false");
    burger.classList.remove("is-active");
    nav.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  burger.addEventListener("click", () => {
    const isOpen = burger.getAttribute("aria-expanded") === "true";

    burger.setAttribute("aria-expanded", String(!isOpen));
    burger.classList.toggle("is-active");
    nav.classList.toggle("is-open");

    document.documentElement.style.overflow = isOpen ? "" : "hidden";
  });

  links.forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
    }
  });
}


document.addEventListener("DOMContentLoaded", () => {
  loadPartial("site-header", "/partials/header.html", initBurger);
  loadPartial("site-footer", "/partials/footer.html");
});
