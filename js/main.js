"use strict";

const menuButton = document.getElementById("menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const menuOpenIcon = document.getElementById("menu-open-icon");
const menuCloseIcon = document.getElementById("menu-close-icon");
const mobileLinks = document.querySelectorAll(".mobile-link");
const currentYearElements = document.querySelectorAll(".current-year");
const scrollTopButton = document.getElementById("scroll-top-button");
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

function setMobileMenuState(isOpen) {
  if (
    !menuButton ||
    !mobileMenu ||
    !menuOpenIcon ||
    !menuCloseIcon
  ) {
    return;
  }

  mobileMenu.classList.toggle("hidden", !isOpen);
  menuOpenIcon.classList.toggle("hidden", isOpen);
  menuCloseIcon.classList.toggle("hidden", !isOpen);

  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Cerrar menú" : "Abrir menú"
  );
}

function toggleMobileMenu() {
  if (!menuButton) {
    return;
  }

  const isOpen =
    menuButton.getAttribute("aria-expanded") === "true";

  setMobileMenuState(!isOpen);
}

function handleScrollTopVisibility() {
  if (!scrollTopButton) {
    return;
  }

  const shouldShowButton = window.scrollY > 500;

  scrollTopButton.classList.toggle("hidden", !shouldShowButton);
  scrollTopButton.classList.toggle("flex", shouldShowButton);
}

function initializeMenu() {
  if (!menuButton) {
    return;
  }

  menuButton.addEventListener("click", toggleMobileMenu);

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setMobileMenuState(false);
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) {
      setMobileMenuState(false);
    }
  });
}

function initializeScrollButton() {
  if (!scrollTopButton) {
    return;
  }

  window.addEventListener("scroll", handleScrollTopVisibility);

  scrollTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  handleScrollTopVisibility();
}

function initializeContactForm() {
  if (!contactForm || !formMessage) {
    return;
  }

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();

    formMessage.textContent =
      `Gracias, ${name}. Tu consulta fue registrada correctamente.`;

    formMessage.classList.remove("hidden");
    contactForm.reset();
  });
}

function initializeYear() {
  const currentYear = new Date().getFullYear();

  currentYearElements.forEach((element) => {
    element.textContent = String(currentYear);
  });
}

initializeMenu();
initializeScrollButton();
initializeContactForm();
initializeYear();
