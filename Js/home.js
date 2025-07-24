/**
 * Interactive 3D Tilt Effect for Feature Cards
 * This script adds a subtle mouse-move effect to the cards on desktop.
 */
document.addEventListener('DOMContentLoaded', () => {

    // Select all the cards to apply the effect to
    const cards = document.querySelectorAll('.feature-card-fa');
    
    // Check if the screen is mobile. If so, disable the effect for better performance.
    const isMobile = window.matchMedia("(max-width: 992px)").matches;

    if (!isMobile) {
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                
                // Calculate mouse position relative to the card's center
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                // Define the intensity of the rotation
                const rotateX = (y / rect.height) * -15; // -15deg max rotation
                const rotateY = (x / rect.width) * 15;   // 15deg max rotation
                
                // Apply the 3D rotation transform
                // Keep the original rotation by getting it from the class name
                let originalRotateZ = 0;
                if (card.classList.contains('card-1')) originalRotateZ = -15;
                if (card.classList.contains('card-2')) originalRotateZ = 5;
                if (card.classList.contains('card-3')) originalRotateZ = -10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${originalRotateZ}deg) scale(1.05)`;
                card.style.zIndex = '10'; // Bring the hovered card to the front
            });

            card.addEventListener('mouseleave', () => {
                // Reset the transform to its original state on mouse leave
                let originalTransform = '';
                 if (card.classList.contains('card-1')) originalTransform = 'rotate(-15deg)';
                if (card.classList.contains('card-2')) originalTransform = 'translate(-50%, -50%) rotate(5deg)';
                if (card.classList.contains('card-3')) originalTransform = 'rotate(-10deg)';

                card.style.transform = originalTransform;
                
                // Reset z-index, except for the middle card which is on top by default
                card.style.zIndex = card.classList.contains('card-2') ? '2' : '1';
            });
        });
    }

});