const primaryNav = document.getElementById('primary-navigation');
const navToggle = document.getElementById('hamburger-button');

// Add click event listener to the hamburger button
navToggle.addEventListener('click', () => {
    // Check the visibility of the navigation menu
    const isVisible = primaryNav.getAttribute('data-visible') === 'true';

    // Toggle the aria-expanded attribute for accessibility
    navToggle.setAttribute('aria-expanded', !isVisible);
    
    // Toggle the data-visible attribute to show/hide the menu
    primaryNav.setAttribute('data-visible', !isVisible);
});