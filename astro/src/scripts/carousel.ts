document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById("carousel-track") as HTMLDivElement;
  const slides = Array.from(track.children) as HTMLDivElement[];
  const prevButton = document.getElementById("prev") as HTMLButtonElement;
  const nextButton = document.getElementById("next") as HTMLButtonElement;

  let currentIndex: number = 0;

  function updateCarousel(): void {
    const offset: string = `-${currentIndex * 100}%`;
    track.style.transform = `translateX(${offset})`;
    loadImage(currentIndex + 1); // Preload the next image
  }

  function loadImage(index: number): void {
    if (index < slides.length) {
      const img = slides[index].querySelector("img") as HTMLImageElement;
      if (img?.hasAttribute("data-src")) {
        img.src = img.getAttribute("data-src")!;
        img.removeAttribute("data-src");
        img.classList.remove("opacity-0");
        img.classList.add("opacity-100");
      }
    }
  }

  nextButton.addEventListener("click", function (): void {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  });

  prevButton.addEventListener("click", function (): void {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  // Auto-slide every 5 seconds
  setInterval(() => {
    nextButton.click();
  }, 5000);
});
