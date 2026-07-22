import "./styles.css";

const form = document.querySelector("#form");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const countrySelect = document.querySelector("#country");
const postalCode = document.querySelector("#postal-code");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");
const emailError = document.querySelector("#email + span.error");
const nameError = document.querySelector("#name + span.error");
const passwordError = document.querySelector(".pass-error");
const confirmPasswordError = document.querySelector(".con-pass-error");
const postalError = document.querySelector(".postal-error");

// name
name.addEventListener("input", (event) => {
  if (name.validity.valid) {
    nameError.textContent = ""; // Remove the message content
    nameError.className = "error"; // Removes the `active` class
  } else {
    // If there is still an error, show the correct error
    showErrorName();
  }
});

function showErrorName() {
  if (name.validity.valueMissing) {
    // If empty
    nameError.textContent = "Please enter your name.";
  } else if (name.validity.tooShort) {
    // If the value is too short,
    nameError.textContent = `Name should be at least ${name.minLength} characters; you entered ${name.value.length}.`;
  }
  // Add the `active` class
  nameError.className = "error active";
}

// email
email.addEventListener("input", (event) => {
  if (email.validity.valid) {
    emailError.textContent = ""; // Remove the message content
    emailError.className = "error"; // Removes the `active` class
  } else {
    // If there is still an error, show the correct error
    showErrorEmail();
  }
});

function showErrorEmail() {
  if (email.validity.valueMissing) {
    // If empty
    emailError.textContent = "Please enter an email address.";
  } else if (email.validity.typeMismatch) {
    // If it's not an email address,
    emailError.textContent = "Entered value needs to be an email address.";
  } else if (email.validity.tooShort) {
    // If the value is too short,
    emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
  }
  // Add the `active` class
  emailError.className = "error active";
}

// password
password.addEventListener("input", (event) => {
  if (password.validity.valid) {
    passwordError.textContent = ""; // Remove the message content
    passwordError.className = "pass-error"; // Removes the `active` class
  } else {
    // If there is still an error, show the correct error
    showErrorPassword();
  }
});

function showErrorPassword() {
  if (password.validity.valueMissing) {
    // If empty
    passwordError.textContent = "Please enter a valid password.";
  } else if (password.validity.patternMismatch) {
    // If it's not an password,
    passwordError.textContent =
      "Must be at least 8 characters long, contain 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.";
  } else if (password.validity.tooShort) {
    // If the value is too short,
    passwordError.textContent = `password should be at least ${password.minLength} characters; you entered ${password.value.length}.`;
  }
  // Add the `active` class
  passwordError.className = "pass-error active";
}

// Confirm password
confirmPassword.addEventListener("input", (event) => {
  if (confirmPassword.validity.valid) {
    confirmPasswordError.textContent = ""; // Remove the message content
    confirmPasswordError.className = "con-pass-error"; // Removes the `active` class
  } else {
    // If there is still an error, show the correct error
    showErrorConfirmPassword();
  }
});

function showErrorConfirmPassword() {
  if (confirmPassword.validity.valueMissing) {
    // If empty
    confirmPasswordError.textContent = "Password must match previous password.";
  } else if (password.value !== confirmPassword.value) {
    // If not matched
    confirmPasswordError.textContent = "Password must match previous password.";
  } else if (confirmPassword.validity.patternMismatch) {
    // If it's not an confirmPassword,
    confirmPasswordError.textContent =
      "Must be at least 8 characters long, contain 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.";
  } else if (confirmPassword.validity.tooShort) {
    // If the value is too short,
    confirmPasswordError.textContent = `password should be at least ${confirmPassword.minLength} characters; you entered ${confirmPassword.value.length}.`;
  }
  // Add the `active` class
  confirmPasswordError.className = "con-pass-error active";
}

// For each country, defines the pattern that the postal code has to follow
const constraints = {
  ch: [
    "^(CH-)?\\d{4}$",
    "Swiss postal codes must have exactly 4 digits: e.g. CH-1950 or 1950",
  ],
  fr: [
    "^(F-)?\\d{5}$",
    "French postal codes must have exactly 5 digits: e.g. F-75012 or 75012",
  ],
  de: [
    "^(D-)?\\d{5}$",
    "German postal codes must have exactly 5 digits: e.g. D-12345 or 12345",
  ],
  nl: [
    "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
    "Dutch postal codes must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
  ],
};

function checkPostalCode() {
  // 1. Read the country inside the function so it updates when changed
  const country = countrySelect.value;
  
  // 2. Safely grab the regex string and error message
  const [patternString, errorMessage] = constraints[country] || ["", ""];
  const constraint = new RegExp(patternString);

  // 3. Reset validity at the start of the check
  postalCode.setCustomValidity("");

  // 4. Run the validation checks
  if (postalCode.validity.valueMissing) {
    // Built-in check: If field is required but empty
    postalError.textContent = "Postal code is required.";
    postalError.className = "postal-error active";
    
  } else if (!constraint.test(postalCode.value)) {
    // Custom check: If it fails your country regex
    postalCode.setCustomValidity(errorMessage); // This blocks form submission!
    postalError.textContent = errorMessage;
    postalError.className = "postal-error active";
    
  } else {
    // Success: Clear out the errors completely
    postalError.textContent = "";
    postalError.className = "postal-error";
  }
}

// 5. Fire the check immediately whenever either element changes
countrySelect.addEventListener("change", checkPostalCode);
postalCode.addEventListener("input", checkPostalCode);


form.addEventListener("submit", (event) => {
  // if the email field is invalid
  if (!email.validity.valid) {
    // display an appropriate error message
    showErrorEmail();
    // prevent form submission
    event.preventDefault();
  }

  // if the name field is invalid
  if (!name.validity.valid) {
    // display an appropriate error message
    showErrorName();
    // prevent form submission
    event.preventDefault();
  }

  // if the password field is invalid
  if (!password.validity.valid) {
    // display an appropriate error message
    showErrorPassword();
    // prevent form submission
    event.preventDefault();
  }

  // if the Confirm password field is invalid
  if (!confirmPassword.validity.valid) {
    // display an appropriate error message
    showErrorConfirmPassword();
    // prevent form submission
    event.preventDefault();
  }

  if (!postalCode.validity.valid) {
    // Note: checkPostalCode() already handles displaying the error message text,
    // so we just need to prevent the form from submitting here.
    event.preventDefault();
  }

});

// eye toggle
const togglePassword = document.querySelector("#togglePassword");
const togglePassword1 = document.querySelector("#togglePassword-1");

togglePassword.addEventListener("click", function () {
  // Toggle the type attribute
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);

  // Toggle the icon (e.g., eye vs eye-slash)
  if (password.getAttribute("type") === "password") {
    this.className = "fa-solid fa-eye";
  } else {
    this.className = "fa-solid fa-eye-slash";
  }

});

togglePassword1.addEventListener("click", function () {
  // Toggle the type attribute
  const type =
    confirmPassword.getAttribute("type") === "password" ? "text" : "password";
  confirmPassword.setAttribute("type", type);

  // Toggle the icon (e.g., eye vs eye-slash)
  if (confirmPassword.getAttribute("type") === "password") {
    this.className = "fa-solid fa-eye";
  } else {
    this.className = "fa-solid fa-eye-slash";
  }
});
