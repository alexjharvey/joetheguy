import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

// Initialize the datepicker
document.addEventListener("DOMContentLoaded", () => {
  const endPicker = flatpickr("#datepicker-end", {
    enableTime: false,
    dateFormat: "d-m-Y",
  }) as flatpickr.Instance;

  const startPicker = flatpickr("#datepicker-start", {
    enableTime: false,
    dateFormat: "d-m-Y",
    onChange: function (selectedDates: Date[]){
      if (selectedDates.length > 0) {
        endPicker.set("minDate", selectedDates[0]);
      }
    },
  }) as flatpickr.Instance;



});
