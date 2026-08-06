"use strict";

function initializeMobileMenu() {
  const menuButton = document.getElementById("menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const openIcon = document.getElementById("menu-open-icon");
  const closeIcon = document.getElementById("menu-close-icon");

  if (!menuButton || !mobileMenu || !openIcon || !closeIcon) {
    return;
  }

  function setMenuState(isOpen) {
    mobileMenu.classList.toggle("hidden", !isOpen);
    openIcon.classList.toggle("hidden", isOpen);
    closeIcon.classList.toggle("hidden", !isOpen);

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Cerrar menú" : "Abrir menú"
    );
  }

  menuButton.addEventListener("click", () => {
    const isOpen =
      menuButton.getAttribute("aria-expanded") === "true";

    setMenuState(!isOpen);
  });

  document.querySelectorAll(".mobile-link").forEach((link) => {
    link.addEventListener("click", () => {
      setMenuState(false);
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) {
      setMenuState(false);
    }
  });
}

function initializeCurrentYear() {
  const year = String(new Date().getFullYear());

  document.querySelectorAll(".current-year").forEach((element) => {
    element.textContent = year;
  });
}

function initializeScrollTopButton() {
  const button = document.getElementById("scroll-top-button");

  if (!button) {
    return;
  }

  function updateButton() {
    const visible = window.scrollY > 500;

    button.classList.toggle("hidden", !visible);
    button.classList.toggle("flex", visible);
  }

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  window.addEventListener("scroll", updateButton);
  updateButton();
}

function initializeContactForm() {
  const form = document.getElementById("contact-form");
  const message = document.getElementById("form-message");

  if (!form || !message) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();

    message.textContent =
      `Gracias, ${name}. Tu consulta fue registrada correctamente.`;

    message.classList.remove("hidden");
    form.reset();
  });
}

initializeMobileMenu();
initializeCurrentYear();
initializeScrollTopButton();
initializeContactForm();
