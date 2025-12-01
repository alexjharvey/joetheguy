import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

// Initialize the datepicker
document.addEventListener("DOMContentLoaded", () => {
  // Function to initialize date pickers for a specific dumpster size
  const initializeDatePickers = (sizeId: string) => {
    const startSelector = `#datepicker-start-${sizeId}`;
    const endSelector = `#datepicker-end-${sizeId}`;

    const startElement = document.querySelector(startSelector);
    const endElement = document.querySelector(endSelector);

    // Only initialize if both elements exist
    if (!startElement || !endElement) return;

    const endPicker = flatpickr(endSelector, {
      enableTime: false,
      dateFormat: "m/d/Y",
      minDate: "today",
    }) as flatpickr.Instance;

    flatpickr(startSelector, {
      enableTime: false,
      dateFormat: "m/d/Y",
      minDate: "today",
      onChange: function (selectedDates: Date[]) {
        if (selectedDates.length > 0) {
          // Set minimum pickup date to be at least the delivery date
          endPicker.set("minDate", selectedDates[0]);

          // Automatically set pickup date to 7 days after delivery
          const deliveryDate = selectedDates[0];
          const defaultPickupDate = new Date(deliveryDate);
          defaultPickupDate.setDate(defaultPickupDate.getDate() + 7);
          endPicker.setDate(defaultPickupDate);
        }
      },
    }) as flatpickr.Instance;
  };

  // Initialize date pickers for all three dumpster sizes
  initializeDatePickers("15");
  initializeDatePickers("20");
  initializeDatePickers("30");

  // Also initialize generic datepickers if they exist (for other pages)
  const genericStart = document.querySelector("#datepicker-start");
  const genericEnd = document.querySelector("#datepicker-end");

  if (genericStart && genericEnd) {
    const endPicker = flatpickr("#datepicker-end", {
      enableTime: false,
      dateFormat: "m/d/Y",
      minDate: "today",
    }) as flatpickr.Instance;

    flatpickr("#datepicker-start", {
      enableTime: false,
      dateFormat: "m/d/Y",
      minDate: "today",
      onChange: function (selectedDates: Date[]) {
        if (selectedDates.length > 0) {
          endPicker.set("minDate", selectedDates[0]);
        }
      },
    });
  }
});
