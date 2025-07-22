
/*------section2------*/


document.addEventListener('DOMContentLoaded', () => {

    // Select all the service cards to be animated
    const serviceCards = document.querySelectorAll('.service-card');

    // Configuration for the observer
    const observerOptions = {
        root: null, // observes intersections relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // trigger when 10% of the item is visible
    };

    /**
     * Callback function to execute when a card intersects with the viewport.
     * @param {IntersectionObserverEntry[]} entries - Array of observer entries.
     * @param {IntersectionObserver} observer - The observer instance.
     */
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // If the card is intersecting (visible on screen)
            if (entry.isIntersecting) {
                // Add the 'is-visible' class to trigger the CSS animation
                entry.target.classList.add('is-visible');
                // Stop observing the card once it has been animated
                observer.unobserve(entry.target);
            }
        });
    };

    // Create a new Intersection Observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe each service card
    serviceCards.forEach(card => {
        observer.observe(card);
    });

});


/*-------section3------------*/


// Wait for the DOM to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {

    /**
     * Infinite Logo Scroller
     * * This script finds the logo slider, clones its content,
     * and appends it to create a seamless infinite scroll effect.
     * The animation itself is handled purely by CSS.
     */
    const slider = document.querySelector(".client-logos-slider");

    // Check if the slider element exists to avoid errors
    if (slider) {
        // Get all the original logos
        const logos = slider.querySelectorAll("img");

        // Clone each logo and append it to the slider
        logos.forEach(logo => {
            const clone = logo.cloneNode(true);
            slider.appendChild(clone);
        });
    }
});


/*-------section4------------*/

// Animation on scroll using IntersectionObserver
document.addEventListener("DOMContentLoaded", function () {
  const animatedItems = document.querySelectorAll(".animate-on-scroll");

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target); // Animate once
      }
    });
  }, {
    threshold: 0.2
  });

  animatedItems.forEach(item => {
    observer.observe(item);
  });
});




