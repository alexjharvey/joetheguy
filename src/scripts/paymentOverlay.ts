import { checkPaymentInformation } from "./paymentInformation.ts";
import { checkPaymentCard } from "./paymentCard.ts";
import {
  confirmBooking,
  fillConfirmationInfo,
} from "./paymentConfirmation.ts";

const BookingFormOverlay = document.getElementById("bookingOverlay");
const closeBookingFormBtn = document.getElementById("closeOverlayBtn");

const step0 = document.getElementById("step-0");
const step1 = document.getElementById("step-1");
const step2 = document.getElementById("step-2");

const prevStepBtn = document.getElementById("prevStepBtn") as HTMLButtonElement;
const nextStepBtn = document.getElementById("nextStepBtn") as HTMLButtonElement;
const trackerDots = document.querySelectorAll(
  "#processTracker [data-step]"
);

const titles = ["Information", "Payment", "Confirmation"];


closeBookingFormBtn?.addEventListener("click", closeBookingForm);

let currentStep = 0; // 0: Information, 1: Payment, 2: Confirmation

nextStepBtn?.addEventListener("click", () => goForward());
prevStepBtn?.addEventListener("click", () => goBackward());

// Close Booking Form Overlay
function closeBookingForm() {
  BookingFormOverlay?.classList.remove("flex");
  BookingFormOverlay?.classList.add("hidden");
  document.body.style.overflow = "auto";
}

async function goBackward(){
    // Disable buttons to prevent multiple clicks
    toggleEnableStepButtons();

    // Move to previous step
    moveToPreviousStep();

    // Re-enable buttons
    toggleEnableStepButtons();
}

async function goForward(){
    // Disable buttons to prevent multiple clicks
    toggleEnableStepButtons();

    //check if fields of current step are valid
    const areFieldsValid = await checkCurrentStep(currentStep);

    // If fields are not valid, dont move forward, re-enable button and exit
    if (!areFieldsValid) {
      toggleEnableStepButtons();
      return;
    }

    // If on confirmation step, attempt to confirm booking
    if (currentStep === 2) {
      const result = await confirmBooking();

      if (result) {
        closeBookingForm();
      }else{
        // TODO: show error message
      }
      return;
    }

    // Move to next step
    moveToNextStep();

    // Re-enable next button
    toggleEnableStepButtons();
}

async function checkCurrentStep(step: number): Promise<boolean> {
  switch (step) {
    //check information step
    case 0:
      return checkPaymentInformation();
    //check payment step
    case 1:
      return await checkPaymentCard();
    default:
      return true;
  }
}

function toggleEnableStepButtons(){
  if (!nextStepBtn || !prevStepBtn) return;

  if(nextStepBtn.disabled && prevStepBtn.disabled){
    nextStepBtn.disabled = false;
    prevStepBtn.disabled = false;
  }else{
    nextStepBtn.disabled = true;
    prevStepBtn.disabled = true;
  }
}

function moveToPreviousStep(){
  // update currentstep counter
  currentStep = Math.max(0, Math.min(2, currentStep - 1));

  // Update UI to reflect new step
  updateUI();
}

function moveToNextStep(){
  // update currentstep counter
  currentStep = Math.max(0, Math.min(2, currentStep + 1));

  // if next step is the confirmation step (was on payment page), refresh its info
  if (currentStep === 2) fillConfirmationInfo();

  // Update UI to reflect new step
  updateUI();
}

function updateUI(){
  if (!prevStepBtn || !nextStepBtn) return;

  // Show/Hide Correct Step Form
  step0?.classList.toggle("hidden", currentStep !== 0);
  step1?.classList.toggle("hidden", currentStep !== 1);
  step2?.classList.toggle("hidden", currentStep !== 2);

  // Update tracker dots (completed, current, upcoming)
  trackerDots.forEach((dotEl) => {
    const stepIndex = parseInt(dotEl.getAttribute("data-step") || "0", 10);
    dotEl.classList.remove("bg-primary", "bg-primary/50", "bg-gray-300");
    if (stepIndex < currentStep) {
      dotEl.classList.add("bg-primary/50");
    } else if (stepIndex === currentStep) {
      dotEl.classList.add("bg-primary");
    } else {
      dotEl.classList.add("bg-gray-300");
    }
  });

  const hasPrev = currentStep > 0;

  // Show/hide previous button and update its label
  prevStepBtn.classList.toggle("invisible", !hasPrev);
  if (hasPrev) prevStepBtn.textContent = `← ${titles[currentStep - 1]}`;

  // update next button label
  nextStepBtn.textContent = currentStep === 2 ? "Confirm" : "Next →";
}