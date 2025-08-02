// This script adds a simple fade-in animation to elements as the page loads.

document.addEventListener('DOMContentLoaded', function() {

    // Select all elements you want to animate
    const animatedElements = document.querySelectorAll('.contact-info-card, .team-contact-strip');

    // Function to apply the animation styles
    const animateOnLoad = (elements) => {
        let delay = 0;
        elements.forEach(element => {
            // Apply a staggered delay for a nicer effect
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            }, delay);
            delay += 200; // 200ms delay between each element
        });
    };

    // Trigger the animation
    animateOnLoad(animatedElements);

});

//section2 --------------------------------


