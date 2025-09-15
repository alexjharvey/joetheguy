import { statesCities } from "../data/states_cities";
import { toggleClass,fillText,importElement } from "./utility";

const firstNameInput = importElement<HTMLInputElement>("first-name");
const lastNameInput = importElement<HTMLInputElement>("last-name");
const emailInput = importElement<HTMLInputElement>("email");
const addressInput = importElement<HTMLInputElement>("address");
const zipInput = importElement<HTMLInputElement>("zip");
const stateSelect = importElement<HTMLSelectElement>("state");
const cityInput = importElement<HTMLInputElement>("city");
const cityList = importElement<HTMLElement>("city-list");
const clickBackground = importElement<HTMLElement>("click-background");

// Map of input/select elements to their validation functions
const validators = new Map<HTMLElement | HTMLInputElement | HTMLSelectElement, (input: HTMLInputElement | HTMLSelectElement) => PaymentFormInputResult>([
  [firstNameInput, validateName],
  [lastNameInput, validateName],
  [emailInput, validateEmail],
  [addressInput, validateAddress],
  [zipInput, validateZip],
  [stateSelect, validateState],
  [cityInput, validateCity],
]);


// Add change and focus event listeners to each input/select for real-time validation
[
  firstNameInput,
  lastNameInput,
  emailInput,
  addressInput,
  zipInput,
  stateSelect,
  cityInput,
].forEach((item) => {
  item?.addEventListener("change", () => {
    const validator = validators.get(item);
    if (!validator) return;
    const result = validator(item);

    if (result.error && result.error === "invalid") {
      highlightInputRed(item , result.message || "");
    }
  });

  item?.addEventListener("focus", () => {
    removeHighlightInputRed(item as HTMLElement);
  });
});

// Populate state dropdown
Object.keys(statesCities).forEach((state) => {
  const option = document.createElement("option");
  option.value = state;
  option.textContent = state;
  stateSelect?.appendChild(option);
});

let currentCities: string[] = [];

// Listen for state selection changes to update city suggestions
stateSelect?.addEventListener("change", () => {
  currentCities = statesCities[stateSelect.value] || [];
  if (cityInput) cityInput.value = "";
  if (cityList) cityList.innerHTML = "";
  cityList?.classList.add("hidden");
});

// Listen for city input changes to show suggestions
cityInput.addEventListener("input", () => {
  const query = cityInput.value.toLowerCase();
  const matches = currentCities.filter((city) =>
    city.toLowerCase().includes(query)
  );

  if (matches.length > 0) {
    if (cityList)
      cityList.innerHTML = matches
        .map(
          (city) =>
            `<li class="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer">${city}</li>`
        )
        .join("");
    cityList?.classList.remove("hidden");
  } else {
    cityList?.classList.add("hidden");
  }
});

// Handle city selection from suggestions
cityList?.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (target.tagName === "LI") {
    cityInput.value = target.textContent;
    cityList.classList.add("hidden");
  }
});

// Hide city suggestions when clicking outside
clickBackground?.addEventListener("click", () => {
  cityList?.classList.add("hidden");
});

export function checkPaymentInformation(): boolean {
  let allValid = true;

  [
  firstNameInput,
  lastNameInput,
  emailInput,
  addressInput,
  zipInput,
  stateSelect,
  cityInput,
].forEach((item) => {
  const validator = validators.get(item);
  if (!validator) return;
  const result = validator(item);

  if (result.error) {
    allValid = false;
    highlightInputRed(item , result.message || "");
  }else{
    removeHighlightInputRed(item);
  }
});
  return allValid;
}

function validateName(input: HTMLInputElement | HTMLSelectElement): PaymentFormInputResult {
  const item = input as HTMLInputElement;
  const name = item.value;
  const nameType = item === firstNameInput ? "First " : "Last ";

  let result: PaymentFormInputResult = {};

  if (name.length === 0) {
    result.error = "empty";
    result.message = nameType + "name cannot be empty";
  } else if (name.length < 3) {
    result.error = "invalid";
    result.message = nameType + "name must be 3 characters or more";
  }
  return result;
}
function validateEmail(input: HTMLInputElement | HTMLSelectElement): PaymentFormInputResult {
  const item = input as HTMLInputElement;
  const email = item.value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let result: PaymentFormInputResult = {};

  if (email.length === 0) {
    result.error = "empty";
    result.message = "Email cannot be empty";
  } else if (!emailPattern.test(email)) {
    result.error = "invalid";
    result.message = "Please enter a valid email address";
  }
  return result;
}
function validateAddress(input: HTMLInputElement | HTMLSelectElement): PaymentFormInputResult {
  const item = input as HTMLInputElement;
  const address = item.value;

  let result: PaymentFormInputResult = {};

  if (address.length === 0) {
    result.error = "empty";
    result.message = "Address cannot be empty";
  }
  return result;
}
function validateZip(input: HTMLInputElement | HTMLSelectElement): PaymentFormInputResult {
  const item = input as HTMLInputElement;
  const zip = item.value;
  const zipPattern = /^\d{5}(-\d{4})?$/;

  let result: PaymentFormInputResult = {};

  if (zip.length === 0) {
    result.error = "empty";
    result.message = "Zip cannot be empty";
  } else if (zip && !zipPattern.test(zip)) {
    result.error = "invalid";
    result.message = "Please enter a valid ZIP code";
  }
  return result;
}
function validateState(input: HTMLInputElement | HTMLSelectElement): PaymentFormInputResult {
  const item = input as HTMLSelectElement;
  const value = item.value;

  let result: PaymentFormInputResult = {};

  if (!value) {
    result.error = "empty";
    result.message = "State cannot be empty";
  }
  return result;
}
function validateCity(input: HTMLInputElement | HTMLSelectElement): PaymentFormInputResult {
  const item = input as HTMLInputElement;
  const city = item.value;

  let result: PaymentFormInputResult = {};

  if (city.length === 0) {
    result.error = "empty";
    result.message = "City cannot be empty";
  }
  return result;
}

function removeHighlightInputRed(input: HTMLElement) {
  const parent = input.parentElement as HTMLElement;
  const errorDiv = parent.querySelector<HTMLDivElement>(".payment-info-input-individual-error-container");
  const errorSpan = parent?.querySelector<HTMLSpanElement>(".payment-info-input-individual-error-span");

  if (!errorDiv || !errorSpan) return;

  toggleClass(errorDiv, "flex", "hidden");

  toggleClass(input, "border-red-500", "border-gray-300");
  toggleClass(input, "text-red-500", "text-gray-900");
}

function highlightInputRed(input: HTMLElement, message: string) {
  const parent = input.parentElement as HTMLElement;
  const errorDiv = parent.querySelector<HTMLDivElement>(".payment-info-input-individual-error-container");
  const errorSpan = parent?.querySelector<HTMLSpanElement>(".payment-info-input-individual-error-span");

  if (!errorDiv || !errorSpan) return;

  toggleClass(errorDiv, "hidden", "flex");

  fillText(errorSpan, message);

  toggleClass(input, "border-gray-300", "border-red-500");
  toggleClass(input, "text-gray-900", "text-red-500");
}