import { importElement, getInputValue, fillText, calculateCost,calculateBookingPeriod, toggleClass } from "./utility";

const scrollToRentalBtn = importElement<HTMLButtonElement>("scrollToRentalBtn");

const dumpsterForm = importElement<HTMLElement>("dumpster-form");

const bookStartInput = importElement<HTMLInputElement>("datepicker-start");
const bookEndInput = importElement<HTMLInputElement>("datepicker-end");
const costEstimateContainer = importElement<HTMLElement>("cost-estimate-container");
const estimatedCostSpan = importElement<HTMLElement>("estimated-cost-span");
const bookingDateErrorContainer = importElement<HTMLElement>("booking-date-error-container");
const bookingDateErrorSpan = importElement<HTMLElement>("booking-date-error-span");
const openOverlayBtn = importElement<HTMLButtonElement>("openOverlayBtn");

const BookingFormOverlay = importElement<HTMLElement>("bookingOverlay");

const SCROLL_OFFSET = 60;


scrollToRentalBtn?.addEventListener("click", scrollToRental);

[bookStartInput, bookEndInput].forEach((input) => {
    input?.addEventListener("input", () => {
        clearErrors();
    });
    input?.addEventListener("change", () => {
        handleInputChange();
    });
});

openOverlayBtn?.addEventListener("click", openBookingForm);


// Hero Section CTA - Scroll to Rental Section
function scrollToRental() {
    if (!dumpsterForm) return;

    const elementPosition = dumpsterForm.offsetTop - SCROLL_OFFSET;
    window.scrollTo({ top: elementPosition, behavior: "smooth" });
}

function clearErrors() {
    // Remove red error highlight from inputs
    [bookStartInput, bookEndInput].forEach((input) => {
        setInputError(input, false);
    });

    // Hide error message container
    toggleClass(bookingDateErrorContainer, "flex", "hidden");
}

function setInputError (input: HTMLInputElement | null, hasError: boolean) {
    if (!input) return;

    // workaround: the visible input is a sibling of the actual input used for styling
    // because of the way flatdatepicker works FML
    const actualInput = input.nextElementSibling as HTMLInputElement | null;
    if (!actualInput) return;

    const classToRemove = hasError ? "border-gray-300" : "border-red-500";
    const classToAdd = hasError ? "border-red-500" : "border-gray-300";

    toggleClass(actualInput, classToRemove, classToAdd);
};



function isValidDateStr(s: string) {
    if (!s) return false;
    const t = Date.parse(s);
    return !isNaN(t);
}

function handleInputChange() {
    const startDateStr = getInputValue(bookStartInput);
    const endDateStr = getInputValue(bookEndInput);

    if (!isValidDateStr(startDateStr) || !isValidDateStr(endDateStr)) {
        fillText(estimatedCostSpan, "");
        toggleClass(costEstimateContainer, "flex", "hidden");
        return;
    }

    const estimatedCost = calculateCost(startDateStr, endDateStr);
    const durationLabel = calculateBookingPeriod(startDateStr, endDateStr);

    fillText(estimatedCostSpan, `Total Cost For ${durationLabel}: $${estimatedCost}`);

    toggleClass(costEstimateContainer, "hidden", "flex");
}

function showError (startDate: string, endDate: string) {
    toggleClass(bookingDateErrorContainer, "hidden", "flex");

    const startDateValid = isValidDateStr(startDate);
    const endDateValid = isValidDateStr(endDate);

    fillText(bookingDateErrorSpan, `${!startDate ? "Delivery" : "Pickup"} Date is invalid`);

    setInputError(bookStartInput, !startDateValid);
    setInputError(bookEndInput, !endDateValid);
};

function openBookingForm() {
    if (!bookStartInput || !bookEndInput) return;

    const startDate = getInputValue(bookStartInput);
    const endDate = getInputValue(bookEndInput);

    // Only open overlay when both dates are present and valid
    if (isValidDateStr(startDate) && isValidDateStr(endDate)) {
        toggleClass(BookingFormOverlay, "hidden", "flex");
        document.body.style.overflow = "hidden";
        return;
    }

    showError(startDate, endDate);
}