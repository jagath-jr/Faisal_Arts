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


/*common header animation----------------------*/


const hamburger = document.getElementById("fa-mobile-menu");
const navMenu = document.getElementById("fa-nav-list");
const header = document.getElementById("fa-main-header");
let lastScrollTop = 0;

// 1. Logic to toggle the mobile menu
hamburger.addEventListener("click", (event) => {
    // Stop the click from bubbling up to the document
    event.stopPropagation(); 
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// 2. Logic to close the menu when a nav link is clicked
document.querySelectorAll(".fa-nav-link").forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    });
});

// 3. NEW: Logic to close the menu when clicking outside of it
document.addEventListener("click", (event) => {
    const isClickInsideMenu = navMenu.contains(event.target);
    
    if (navMenu.classList.contains("active") && !isClickInsideMenu) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }
});

// 4. NEW: Logic to hide header on scroll
window.addEventListener("scroll", () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Make sure the menu is closed before hiding header
    if (navMenu.classList.contains("active")) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }

    if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
        // Scrolling Down
        header.classList.add("fa-header--hidden");
    } else {
        // Scrolling Up
        header.classList.remove("fa-header--hidden");
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
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
