const WEEKLY_RATE = 525;
const ONE_DAY = 24 * 60 * 60 * 1000;

// --- Helper Functions ---
// Generic helper to fetch an element and cast it to a specific HTMLElement subtype.
export function importElement<T extends HTMLElement = HTMLElement>(id: string): T {
  return document.getElementById(id) as T;
}

export function getInputValue(input: HTMLInputElement | HTMLSelectElement | null) {
  return input?.value.trim() || "";
}

export function fillText(el: HTMLElement | null, text: string) {
  if (el) el.textContent = text;
};

function parseDate(dateString: string): Date | null {
  if (!dateString) return null;
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
}

function translateDatesToDays(startDate: Date, endDate: Date): number {
  const diffDays = Math.floor((endDate.getTime() - startDate.getTime()) / ONE_DAY) + 1;
  return diffDays;
}

function translateDaysToMinimalPeriods(diffDays: number): string {
  // human readable duration using largest meaningful unit (months > weeks > days)
  const pluralize = (n: number, unit: string) =>
  `${n} ${unit}${n === 1 ? "" : "s"}`;

  if (diffDays >= 30) {
    const months = Math.floor(diffDays / 30);
    const days = diffDays % 30;

    if (days) {
      return `${pluralize(months, "month")} ${pluralize(days, "day")}`;
    }

    return pluralize(months, "month");
  }

  if (diffDays >= 7) {
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;
    
    if (days) {
      return `${pluralize(weeks, "week")} ${pluralize(days, "day")}`;
    }

    return pluralize(weeks, "week");
  }

  return pluralize(diffDays, "day");
}

export function calculateBookingPeriod(start: string, end: string): string {
  const startDate = parseDate(start);
  const endDate = parseDate(end);

  if (!startDate || !endDate) return "";

  const diffDays = translateDatesToDays(startDate, endDate);

  const periodStringInMinimalPeriods = translateDaysToMinimalPeriods(diffDays);

  return periodStringInMinimalPeriods;
}

export function calculateCost(start: string, end: string): number {

  const startDate = parseDate(start);
  const endDate = parseDate(end);

  if (!startDate || !endDate) return 0;

  const diffDays = translateDatesToDays(startDate, endDate);

  const totalCost = Math.ceil(diffDays / 7) * WEEKLY_RATE;

  return totalCost;
}

export function toggleClass(element: Element | null, remove: string, add: string) {
    element?.classList.remove(remove);
    element?.classList.add(add);
};