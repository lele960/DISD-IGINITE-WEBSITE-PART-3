// Ignite Revolution - Part 3 JavaScript enhancements

// Responsive navigation menu
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

// Interactive project category filter
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const filterStatus = document.getElementById("filterStatus");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.filter;

    filterButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });

    let visibleCount = 0;
    projectCards.forEach((card) => {
      const shouldShow = selectedCategory === "all" || card.dataset.category === selectedCategory;
      card.hidden = !shouldShow;
      if (shouldShow) visibleCount++;
    });

    const label = button.textContent.trim();
    filterStatus.textContent = `Showing ${visibleCount} ${label.toLowerCase()}.`;
  });
});

// Contact form validation (client-side demonstration only)
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

const fields = {
  fullName: { input: document.getElementById("fullName"), error: document.getElementById("nameError") },
  email: { input: document.getElementById("email"), error: document.getElementById("emailError") },
  reason: { input: document.getElementById("reason"), error: document.getElementById("reasonError") },
  message: { input: document.getElementById("message"), error: document.getElementById("messageError") }
};

function showError(field, message) {
  field.error.textContent = message;
  field.input.classList.toggle("invalid", Boolean(message));
  field.input.setAttribute("aria-invalid", String(Boolean(message)));
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let isValid = true;
  formStatus.textContent = "";
  formStatus.className = "form-status";

  const name = fields.fullName.input.value.trim();
  const email = fields.email.input.value.trim();
  const reason = fields.reason.input.value;
  const message = fields.message.input.value.trim();
  const consent = document.getElementById("consent");
  const consentError = document.getElementById("consentError");

  showError(fields.fullName, "");
  showError(fields.email, "");
  showError(fields.reason, "");
  showError(fields.message, "");
  consentError.textContent = "";

  if (name.length < 2) {
    showError(fields.fullName, "Please enter your full name (at least 2 characters).");
    isValid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showError(fields.email, "Please enter a valid email address.");
    isValid = false;
  }

  if (!reason) {
    showError(fields.reason, "Please choose an enquiry type.");
    isValid = false;
  }

  if (message.length < 10) {
    showError(fields.message, "Please enter a message of at least 10 characters.");
    isValid = false;
  }

  if (!consent.checked) {
    consentError.textContent = "Please confirm that your details are correct.";
    isValid = false;
  }

  if (!isValid) {
    formStatus.textContent = "Please correct the highlighted fields and try again.";
    formStatus.classList.add("failure");
    const firstInvalid = contactForm.querySelector(".invalid, #consent:not(:checked)");
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  // This project has no backend, so the form does not email or store information.
  formStatus.textContent = "Thank you! Your form passed validation. This demo does not send or save submissions yet.";
  formStatus.classList.add("success");
  contactForm.reset();
});

// Automatically update the copyright year
document.getElementById("currentYear").textContent = new Date().getFullYear();
