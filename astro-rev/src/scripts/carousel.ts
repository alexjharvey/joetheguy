// Lazy-loads on demand. First image is loaded with DOM content. Subsequent images are loaded when the next buttion is pushed.

document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById("carousel-track") as unknown as HTMLDivElement;
  const slides = Array.from(track.children) as HTMLDivElement[];
  const prevButton = document.getElementById("prev") as HTMLButtonElement;
  const nextButton = document.getElementById("next") as HTMLButtonElement;

  let currentIndex: number = 0;

  function updateCarousel(): void {
    console.log("Updating carousel to slide", currentIndex+1);
    
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

  function goToNext(): void {
    console.log("Next button clicked ", currentIndex+1);

    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  }

  function goToPrev(): void {
    console.log("Previous button clicked ", currentIndex+1);

    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  }

  nextButton.addEventListener("click", goToNext);
  prevButton.addEventListener("click", goToPrev);

  // Preload the second image on initial load
  updateCarousel();

  // Auto-slide every 7 seconds
  setInterval(() => {
    goToNext();
  }, 7000);
});
