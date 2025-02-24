document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".folder").forEach(folder => {
        folder.addEventListener("click", function (event) {
            // Prevent toggling if a link is clicked
            if (event.target.tagName === "A") return;

            let childList = this.querySelector("ul");
            if (childList) {
                childList.style.display = (childList.style.display === "block") ? "none" : "block";
            }

            event.stopPropagation(); // Prevent parent folders from also toggling
        });

        // Start all subfolders hidden
        let childList = folder.querySelector("ul");
        if (childList) {
            childList.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    setupCarousel("carousel1");
    setupCarousel("carousel2");
});

function setupCarousel(carouselId) {
    const carousel = document.getElementById(carouselId);
    const images = carousel.querySelectorAll("img");
    let index = 0;

    function moveSlide(direction) {
        index += direction;

        // Loop back when reaching the end or beginning
        if (index >= images.length) index = 0;
        if (index < 0) index = images.length - 1;

        let offset = -index * images[0].clientWidth;
        carousel.style.transform = `translateX(${offset}px)`;
    }

    // Auto-slide every 3 seconds
    let interval = setInterval(() => moveSlide(1), 3000);

    // Add event listeners for manual navigation
    document.querySelector(`[data-carousel="${carouselId}"] .prev`).addEventListener("click", () => {
        clearInterval(interval); // Reset auto-slide on manual use
        moveSlide(-1);
        interval = setInterval(() => moveSlide(1), 3000);
    });

    document.querySelector(`[data-carousel="${carouselId}"] .next`).addEventListener("click", () => {
        clearInterval(interval);
        moveSlide(1);
        interval = setInterval(() => moveSlide(1), 3000);
    });
}

