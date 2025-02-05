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

  nextButton.addEventListener("click", function (): void {
    console.log("Next button clicked ", currentIndex+1);
    
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  });

  prevButton.addEventListener("click", function (): void {
    console.log("Previous button clicked ", currentIndex+1);
    
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  // Auto-slide every 5 seconds
  setInterval(() => {
    nextButton.click();
  }, 7000);
});
