// ==================================================
// MOBILE NAVIGATION TOGGLE
// ==================================================
// querySelector finds the first element matching a CSS selector
// and gives us a reference to it, so we can read or change it.
const navToggle = document.querySelector(".nav-toggle");
const mobileNav = document.querySelector(".mobile-nav");

// addEventListener attaches a function that runs when a specific
// event happens on that element — here, a "click".
navToggle.addEventListener("click", () => {
  // classList.toggle adds a class if it's missing, or removes it
  // if it's already there. It returns true/false for the new state,
  // which is exactly what the mobile-nav.is-open CSS rule needs.
  const isOpen = mobileNav.classList.toggle("is-open");

  // aria-expanded tells screen reader users whether the menu this
  // button controls is currently open. We keep it in sync by hand
  // because toggling a CSS class doesn't update ARIA attributes.
  navToggle.setAttribute("aria-expanded", isOpen);
});

// Keyboard users expect Escape to close an open menu — this wasn't
// covered by the click handler above, since Escape doesn't fire a
// "click" event. We only act if the menu is actually open, so
// Escape doesn't do anything unexpected elsewhere on the page.
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mobileNav.classList.contains("is-open")) {
    mobileNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.focus();
  }
});

// ==================================================
// CONTACT FORM VALIDATION
// ==================================================
// This code only runs on contact.html, but script.js is shared by
// every page. Guarding with "if (form)" means the other pages just
// skip this block instead of throwing an error looking for an
// element that isn't there.
const form = document.querySelector("#inquiry-form");

if (form) {
  const status = document.querySelector("#form-status");

  // The "submit" event fires when the button is pressed (or Enter
  // is hit inside a field). event.preventDefault() stops the
  // browser's default behaviour — reloading the page and sending
  // the data to a server — which matters here because we want to
  // send it with fetch() ourselves instead (see below) rather than
  // letting the browser do a full-page redirect to Formspree.
  //
  // The handler is declared "async" because it needs to use "await"
  // inside it — see the fetch() call further down for what that means.
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // required fields to check, matched to their .form-group wrapper
    const fields = form.querySelectorAll("[required]");
    let firstInvalid = null;

    fields.forEach((field) => {
      const group = field.closest(".form-group");

      // checkValidity() uses the browser's own rules for the field —
      // "required" means non-empty, and type="email" also checks
      // for a roughly email-shaped value, so we don't have to write
      // that pattern ourselves.
      const isValid = field.checkValidity();
      group.classList.toggle("has-error", !isValid);

      if (!isValid && !firstInvalid) {
        firstInvalid = field;
      }
    });

    if (firstInvalid) {
      firstInvalid.focus();
      status.textContent = "Please fix the highlighted fields.";
      status.classList.remove("is-success");
      return;
    }

    status.textContent = "Sending…";
    status.classList.remove("is-success");

    // FormData reads every named field in the form (name, email,
    // project-type, message) into one object, in the shape a file
    // upload or a POST request expects — we don't have to list each
    // field by hand.
    const data = new FormData(form);

    try {
      // fetch() sends the actual network request. It immediately
      // returns a "promise" — a placeholder for a response that
      // hasn't arrived yet. "await" pauses this function (without
      // freezing the rest of the page) until that response comes
      // back, so the next line only runs once we actually know
      // whether the email was sent.
      const response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        status.textContent = "Thank you — we'll be in touch within two business days.";
        status.classList.add("is-success");
        form.reset();
      } else {
        status.textContent = "Something went wrong sending that — please email us directly instead.";
      }
    } catch (error) {
      // fetch() only lands here for network-level failures (offline,
      // DNS, CORS) — not for the server saying "no". That's why the
      // "else" above and this "catch" are two separate messages.
      status.textContent = "Something went wrong sending that — please email us directly instead.";
    }
  });

  // Clears a field's error state as soon as the person starts fixing
  // it, instead of leaving the red border up until the next submit.
  form.querySelectorAll("[required]").forEach((field) => {
    field.addEventListener("input", () => {
      field.closest(".form-group").classList.remove("has-error");
    });
  });
}
