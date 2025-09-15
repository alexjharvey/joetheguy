import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

// Initialize the datepicker
document.addEventListener("DOMContentLoaded", () => {
  const endDateInput = document.querySelector("#datepicker-end") as HTMLElement;
  const endPicker = flatpickr(endDateInput, {
    enableTime: false,
  // store ISO in the input for reliable parsing, show DD-MM-YYYY to the user
  dateFormat: "Y-m-d",
  altInput: true,
  altFormat: "d-m-Y",
    static: true
  });

  const startDateInput = document.querySelector("#datepicker-start") as HTMLElement;
  const startPicker = flatpickr(startDateInput, {
    enableTime: false,
  // store ISO in the input for reliable parsing, show DD-MM-YYYY to the user
  dateFormat: "Y-m-d",
  altInput: true,
  altFormat: "d-m-Y",
    static: true,
    minDate: "today", // ← prevents selecting past dates
    onChange: function (selectedDates: Date[]) {
      if (selectedDates.length > 0) {
        endPicker.set("minDate", selectedDates[0]);
      }
    },
  }) as flatpickr.Instance;
});

