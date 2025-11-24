import { getTokenizationNounce,getLastPaymentDetails } from "./paymentCard";
import { importElement,fillText,calculateBookingPeriod,calculateCost,getInputValue } from "./utility";

import amex from "../icons/payment_cards/amex.svg?url";
import visa from "../icons/payment_cards/visa.svg?url";
import empty from "../icons/payment_cards/empty.svg?url";
import mastercard from "../icons/payment_cards/mastercard.svg?url";
import discover from "../icons/payment_cards/discover.svg?url";
import diners from "../icons/payment_cards/diner.svg?url";
import jcb from "../icons/payment_cards/jcb.svg?url";

const icons: Record<string, string> = {
  amex: amex,
  visa: visa,
  mastercard: mastercard,
  discover: discover,
  diners: diners,
  jcb: jcb,
  empty: empty,
};

const startInput             = importElement<HTMLInputElement>("datepicker-start");
const endInput               = importElement<HTMLInputElement>("datepicker-end");

const firstNameInput         = importElement<HTMLInputElement>("first-name");
const lastNameInput          = importElement<HTMLInputElement>("last-name");
const emailInput             = importElement<HTMLInputElement>("email");
const addressInput           = importElement<HTMLInputElement>("address");
const stateSelect            = importElement<HTMLSelectElement>("state");
const cityInput              = importElement<HTMLInputElement>("city");
const zipInput               = importElement<HTMLInputElement>("zip");

const confirmationPeriod     = importElement<HTMLElement>("confirmation-period");
const confirmationDatesEl    = importElement<HTMLElement>("confirmation-dates");
const confirmationCostEl     = importElement<HTMLElement>("confirmation-cost");
const confirmationLocation   = importElement<HTMLElement>("confirmation-location");
const confirmationName       = importElement<HTMLElement>("confirmation-name");
const confirmationEmail      = importElement<HTMLElement>("confirmation-email");
const confirmationCardNumber = importElement<HTMLElement>("confirmation-card-number");
const confirmationIcon       = importElement<HTMLImageElement>("confirmation-card-icon");
const confirmationCardExp    = importElement<HTMLElement>("confirmation-card-exp");
const confirmationCardCvv    = importElement<HTMLElement>("confirmation-card-cvv");

export function fillConfirmationInfo() {
  const lastPaymentInfo = getLastPaymentDetails();
  if (!lastPaymentInfo || !lastPaymentInfo.result) return;

  const startVal         = getInputValue(startInput);
  const endVal           = getInputValue(endInput);

  const first            = getInputValue(firstNameInput);
  const last             = getInputValue(lastNameInput);
  const email            = getInputValue(emailInput);
  const address          = getInputValue(addressInput);
  const state            = getInputValue(stateSelect);
  const city             = getInputValue(cityInput);
  const zip              = getInputValue(zipInput);

  const maskedCardNumber = lastPaymentInfo.result.maskedCard;
  const expiryMonth      = lastPaymentInfo.result.expiryMonth;
  const expiryYear       = lastPaymentInfo.result.expiryYear;
  const maskedCvv        = lastPaymentInfo.result.maskedCvv2;
  const cardType         = lastPaymentInfo.result.cardType.toLowerCase();

  // compute duration and cost using the exact logic from dumpsters.astro
  let durationLabel = calculateBookingPeriod(startVal, endVal);
  let costText = `$${calculateCost(startVal, endVal)}`;

  fillText(confirmationName, `${first} ${last}`.trim());

  fillText(confirmationEmail, email);

  fillText(confirmationLocation, [address, city, state, zip].filter(Boolean).join(", "));

  fillText(confirmationDatesEl, `${startVal} -- ${endVal}`);

  fillText(confirmationPeriod, durationLabel);

  fillText(confirmationCostEl, costText);

  fillText(confirmationCardNumber, maskedCardNumber);

  if (confirmationIcon) {
    const card = cardType in icons ? cardType : "empty";
    confirmationIcon.src = icons[card];
  }

  fillText(confirmationCardExp, `Exp: ${expiryMonth} / ${expiryYear}`);

  fillText(confirmationCardCvv, `CVV: ${maskedCvv}`);
}

// Function is neglected for now because i didnt do card testing yet
export async function confirmBooking() {

  try {
    const nonce = await getTokenizationNounce();

    const startInput = document.getElementById(
      "datepicker-start"
    ) as HTMLInputElement | null;
    const endInput = document.getElementById(
      "datepicker-end"
    ) as HTMLInputElement | null;
    const startVal = startInput?.value || "";
    const endVal = endInput?.value || "";


    const requestBody = {
      source: nonce,
      booking_start_date: startVal,
      booking_end_date: endVal,
    };

    console.log(
      "Here??????????/:",
      requestBody.booking_start_date,
      requestBody.booking_end_date
    );


    const response = await fetch(
      "http://localhost:8080/api/payment/charge",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (response.ok) {
      const resultText = await response.text();
      console.log("Verification successful:", resultText);
      return true;
    } else {
      const errorText = await response.text();
      console.error("Verification failed:", errorText);
      return false;
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return false;
  }
}