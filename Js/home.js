document.addEventListener('DOMContentLoaded', () => {

        // --- Mobile Navigation Toggle ---
        const primaryNav = document.getElementById('primary-navigation');
        const navToggle = document.getElementById('hamburger-button');

        if (primaryNav && navToggle) {
            navToggle.addEventListener('click', () => {
                const isVisible = primaryNav.getAttribute('data-visible') === 'true';
                navToggle.setAttribute('aria-expanded', !isVisible);
                primaryNav.setAttribute('data-visible', !isVisible);
            });
        }

        // --- Particles.js Background Initialization ---
        if (document.getElementById('particles-js')) {
            particlesJS('particles-js', {
                "particles": {
                    "number": {
                        "value": 80,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#ffffff"
                    },
                    "shape": {
                        "type": "circle",
                    },
                    "opacity": {
                        "value": 0.5,
                        "random": false,
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#ffffff",
                        "opacity": 0.4,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 2,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "grab"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 140,
                            "line_linked": {
                                "opacity": 1
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 40,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            });
        }

        // --- Scroll-triggered Animations ---
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    entry.target.classList.remove('hidden');
                } else {
                    // Optional: To make elements re-animate every time they are scrolled to,
                    // you can un-comment the following lines.
                    // entry.target.classList.add('hidden');
                    // entry.target.classList.remove('visible');
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        const hiddenElements = document.querySelectorAll('.hidden');
        hiddenElements.forEach((el) => observer.observe(el));

    });

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


/*--------------------------------------------*/
/**footer animation
 * This script adds a fade-in and slide-up animation to the footer
 * when the user scrolls near the bottom of the page.
 */
document.addEventListener('DOMContentLoaded', function() {
    const footer = document.querySelector('.footer');

    // Options for the Intersection Observer
    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the item is visible
    };

    /**
     * Callback function to execute when the footer is intersecting with the viewport.
     * @param {IntersectionObserverEntry[]} entries - The entries that are intersecting.
     * @param {IntersectionObserver} observer - The observer instance.
     */
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // If the footer is intersecting (visible)
            if (entry.isIntersecting) {
                footer.classList.add('visible');
                // We can unobserve it once the animation is triggered
                observer.unobserve(entry.target);
            }
        });
    };

    // Create a new Intersection Observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Start observing the footer element
    if (footer) {
        observer.observe(footer);
    }
});



