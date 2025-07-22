

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
