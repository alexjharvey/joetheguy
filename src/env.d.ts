/// <reference path="../.astro/types.d.ts" />

type PaymentFormInputResult = {
  error?: string;
  message?: string;
};

type CardFormStyles = {
    container: string;
    card: string;
    expiryContainer: string;
    labels: string;
    expiryMonth: string;
    expirySeparator: string;
    expiryYear: string;
    cvv2: string;
    avsZip: string;
    floatingLabelsPlaceholder: string;
    labelType: string;
};

type StyleKey = keyof CardFormStyles;

type HostedTokenizationEvent = {
    result: any;
    error: { message: string };
};

type PaymentFormInputs = {
    cardType: string;
    expiryMonth: number;
    expiryYear: number;
    maskedCvv2: string;
};


declare module "*.svg?url" {
  const src: string;
  export default src;
}