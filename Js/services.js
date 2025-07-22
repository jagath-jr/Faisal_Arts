/**
 * Adds a "visible" class to page sections when they scroll into view.
 * This triggers a CSS fade-in animation.
 */
document.addEventListener("DOMContentLoaded", function() {
    
    const sectionsToAnimate = document.querySelectorAll('.page-section');

    if (!sectionsToAnimate.length) {
        return;
    }

    const observerOptions = {
        root: null, // observes intersections relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // Triggers when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the element is intersecting (visible)
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing the element once it has become visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Attach the observer to each section
    sectionsToAnimate.forEach(section => {
        observer.observe(section);
    });

});


document.addEventListener("DOMContentLoaded", function() {
    
    // --- Existing code for fade-in sections ---
    const sectionsToAnimate = document.querySelectorAll('.page-section');
    if (sectionsToAnimate.length) {
        // ... your existing Intersection Observer code ...
    }


    // --- New code for Scroll to Top Button ---
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    // Show or hide the button based on scroll position
    window.addEventListener('scroll', () => {
        // Show button if user has scrolled down more than 300px
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    // Scroll to the top when the button is clicked
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // For a smooth scrolling animation
        });
    });

});