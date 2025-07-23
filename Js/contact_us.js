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


/**
 * Wait for the DOM to be fully loaded before handling the form.
 */
document.addEventListener('DOMContentLoaded', () => {

    // Select the form using its unique ID
    const contactForm = document.getElementById('contactForm-fa01');

    // Check if the form exists on the page
    if (contactForm) {
        
        // Add a 'submit' event listener to the form.
        contactForm.addEventListener('submit', (event) => {
            
            // Prevent the default form submission behavior (page reload)
            event.preventDefault();

            // Create a FormData object to easily access form data
            const formData = new FormData(contactForm);

            // Create an object to hold the form values
            const formSubmission = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                services: formData.get('services'),
                message: formData.get('message'),
            };

            // Log the submitted data to the console
            console.log('Form Submitted!', formSubmission);

            // Provide user feedback
            alert('Thank you for your message! We will get back to you soon.');

            // Clear the form fields
            contactForm.reset();
        });
    }
});