import { fillText, toggleClass } from "./utility";

const paymentErrorContainer = document.getElementById("accept-blue-error-container");
const paymentErrorSpan = document.getElementById("accept-blue-error-span");

const ERROR_COLOR = "#EF4444";
const tokenizationSourceKey = "pk_UGsCuaeSuqki08AgUQGIvAqFM6cux";
const iframe_styles: CardFormStyles = {
  container:
    "width: 100%; display: flex; flex-direction: column; gap: 16px; font-size: 14px;",
  card: "width: 100%; height: 34px; box-sizing: border-box; padding: 0px 12px; border-radius: 8px; border: 1px solid #d1d5db; color: #000000;",
  expiryContainer:
    "width: 80%; display: flex; gap: 8px; box-sizing: content-box; overflow: hidden;",
  labels:
    "font-size: 14px; font-weight: 500; color: #374151; margin-bottom: 8px;",
  expiryMonth:
    "display: flex; width: 100%; margin:0; height: 34px; box-sizing: border-box; padding: 0px 12px; border-radius: 8px; border: 1px solid #d1d5db; color: #000000;",
  expirySeparator: "display: none;",
  expiryYear:
    "display: flex; width: 100%; height: 34px; box-sizing: border-box; padding: 0px 12px; border-radius: 8px; border: 1px solid #d1d5db; color: #000000;",
  cvv2: "width: 50%; height: 34px; box-sizing: border-box; padding: 0px 12px; border-radius: 8px; border: 1px solid #d1d5db; color: #000000;",
  avsZip:
    "height: 34px; padding: 0px 12px; border: 1px solid #d1d5db; border-radius: 8px;",
  floatingLabelsPlaceholder: "color: #9ca3af;",
  labelType: "static-top",
};
const options = {
  target: "#accept-blue-iframe",
  styles: iframe_styles,
};

declare global {
  interface Window {
    HostedTokenization?: any;
  }
}

let hostedTokenization: any;
let lastPaymentInfo: any = null;

// Mock document.currentScript to fix SDK error
if (!document.currentScript) {
  Object.defineProperty(document, "currentScript", {
    value: {
      src: "https://tokenization.sandbox.accept.blue/tokenization/v0.3",
    },
    writable: false,
  });
}

window.addEventListener("load", () => {
  // Check if HostedTokenization is defined
  if (!window.HostedTokenization) {
    console.error("HostedTokenization undefined - SDK load failed");
    return;
  }

  // Initialize HostedTokenization
  try {
    hostedTokenization = new window.HostedTokenization(
      tokenizationSourceKey,
      options
    );
  } catch (error) {
    console.error("iFrame initialization failed:", error);
    return;
  }

  //console.log("HostedTokenization initialized:", hostedTokenization);

  hostedTokenization.on("input", (event: any) => {
    //console.log("input trigger", event);
    
    // reset styles to default on any input event
    hostedTokenization.setStyles({ ...iframe_styles });

    // remove any existing error message
    toggleClass(paymentErrorContainer, "flex", "hidden");

    const cardType = event.result.cardType;

    // Show/hide card icons based on detected card type
    syncCardIconsWithCardNumber(cardType);
  });

  hostedTokenization.on("change", (event: any) => {
    //console.log("change trigger", event);

    // Store the latest payment info
    lastPaymentInfo = event;

    if (!event.error) {
      // hide error UI
      hideErrorUI();
      // if no error, do nothing
      return;
    }

    // prepare card fields for potential highlighting
    let modifiedStyle: CardFormStyles = { ...iframe_styles };

    const errorMessage = event.error.message;
    const validations = getValidationMapperFromCurrentEvent(event, errorMessage);

    // highlight fields with errors in red if error is not "empty"
    for (const { field, result } of validations) {
      if (result.error && result.message !== "empty") {
        modifiedStyle[field as keyof CardFormStyles] = highlightInputRed(
          iframe_styles[field as keyof CardFormStyles]
        );
      }
    }

    // apply modified styles
    hostedTokenization.setStyles(modifiedStyle);

    // show the first relevant error message
    showErrorUI(errorMessage);
  });
});

function getValidationMapperFromCurrentEvent(event: any,errorMessage: string) {
  const starredCardNumber = event.result.maskedCard;
  const cardType = event.result.cardType;
  const starredCvv2 = event.result.maskedCvv2;
  const expiryMonth = event.result.expiryMonth;
  const expiryYear = event.result.expiryYear;

  // map each field to its validation function and result
  const validations = [
    { field: "card", result: validateCardNumber(starredCardNumber, errorMessage) },
    { field: "cvv2", result: validateCVV2(starredCvv2,cardType) },
    { field: "expiryMonth", result: validateExpiryMonth(expiryMonth, expiryYear) },
    { field: "expiryYear", result: validateExpiryYear(expiryYear) },
  ];
  return validations;
}

function syncCardIconsWithCardNumber(cardType: string) {
  const icons = document.querySelectorAll<HTMLElement>(
    "#card-icons-container [data-card]"
  );

  icons.forEach((icon) => {
    if (
      icon.dataset.card === cardType.toLowerCase() ||
      cardType == "Unknown card type"
    ) {
      icon.style.display = "";
    } else {
      icon.style.display = "none";
    }
  });
}

function showErrorUI(message: string) {
  toggleClass(paymentErrorContainer, "hidden", "flex");
  fillText(paymentErrorSpan, message);
}

function hideErrorUI() {
  toggleClass(paymentErrorContainer, "flex", "hidden");
  fillText(paymentErrorSpan, "");
}

function highlightInputRed(style: string) {
  return style
    .replace(
      /border:\s*1px solid [^;]+;/,
      `border: 1px solid ${ERROR_COLOR};`
    )
    .replace(/color:\s*[^;]+;/, `color: ${ERROR_COLOR};`);
}

// Validation for card number using the accept blue error messages
// to avoid implementing credit card validation logic
function validateCardNumber(starredCardNumber: string, errorMessage: string): PaymentFormInputResult {
  let result: PaymentFormInputResult = {};

  if (starredCardNumber.length === 0) {
    result.error = "empty";
    result.message = "Card number cannot be empty";
    return result;
  }

  const patterns = ["Card Number", "Card Length"];
  const nativeError = (patterns.some((p) => errorMessage.includes(p)));

  if (nativeError) {
    result.error = "invalid";
    result.message = errorMessage;
    return result;
  }

  return result;
}

function validateCVV2(starredCvv2: string, cardType: string): PaymentFormInputResult {
  let result: PaymentFormInputResult = {};

  if (starredCvv2.length === 0) {
    result.error = "empty";
    result.message = "CVV cannot be empty";
    return result;
  }

  if ((starredCvv2.length === 4 && cardType === "Amex") || (starredCvv2.length === 3 && cardType !== "Amex")){
    return result;
  }

  result.error = "invalid";
  result.message = "CVV is invalid";
  return result;
}

function validateExpiryMonth(month: number, year: number): PaymentFormInputResult {
  let result: PaymentFormInputResult = {};

  if (month === 0) {
    result.error = "empty";
    result.message = "Expiration month cannot be empty";
    return result;
  }
  
  if (month < 1 || month > 12) {
    result.error = "invalid";
    result.message = "Expiration month must be between 1 and 12";
    return result;
  }

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  if (year === currentYear && month < currentMonth) {
      result.error = "invalid";
      result.message = "Expiration date cannot be in the past";
      return result;
  }

  return result;
}

function validateExpiryYear(year: number): PaymentFormInputResult {
  let result: PaymentFormInputResult = {};

  if (year === 2000) {
    result.error = "empty";
    result.message = "Expiration year cannot be empty";
    return result;
  }

  const now = new Date();
  const currentYear = now.getFullYear();

  if (year < currentYear) {
    result.error = "invalid";
    result.message = "Expiration year cannot be in the past";
    return result;
  } 

  return result;
}

function doBasicLocalCardValidation(): boolean {

  let fullyValid = true;

  // prepare card fields for potential highlighting
  let modifiedStyle: CardFormStyles = { ...iframe_styles };

  let errorMessage = "Card information is incomplete";

  if (!lastPaymentInfo) {
    fullyValid = false;
    for (const key in modifiedStyle) {
      modifiedStyle[key as keyof CardFormStyles] = highlightInputRed(
        iframe_styles[key as keyof CardFormStyles]
      );
    }

  }else{
    if (lastPaymentInfo.error) errorMessage = lastPaymentInfo.error.message;

    const validations = getValidationMapperFromCurrentEvent(lastPaymentInfo,errorMessage);

    // highlight fields with errors in red if error is not "empty"
    for (const { field, result } of validations) {
      if (result.error) {
        fullyValid = false;
        modifiedStyle[field as keyof CardFormStyles] = highlightInputRed(
          iframe_styles[field as keyof CardFormStyles]
        );
      }
    }
  }

  // apply modified styles
  hostedTokenization.setStyles(modifiedStyle);

  if (fullyValid) {
    hideErrorUI();
    return true;
  }

  // show the first relevant error message
  showErrorUI(errorMessage);
  return false;
}

// ignored for now because the future of card validation is uncertain
async function doAdvancedOnlineCardValidation(): Promise<boolean> {
  return true;
  try {
    const paymentResult = await hostedTokenization.getNonceToken();
    const nonce = paymentResult.nonce;

    const requestBody = {
      source: nonce,
      expiry_month: paymentResult.expiryMonth,
      expiry_year: paymentResult.expiryYear,
    };

    const response = await fetch(
      "http://localhost:8080/api/payment/verify",
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

export async function checkPaymentCard(): Promise<boolean> {
  let fullyValid = doBasicLocalCardValidation();

  if (fullyValid){
    fullyValid = await doAdvancedOnlineCardValidation();
  }

  return fullyValid;
}

export function getLastPaymentDetails(): any {
  return lastPaymentInfo;
}

export async function getTokenizationNounce(): Promise<string | null> {
  return await hostedTokenization.getNonceToken();
}