
//section1-------------------------------------------

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

//section2-------------------------------------------

/**
 * Adds a scroll-in animation to elements using the Intersection Observer API.
 * This function is lightweight and performs well.
 */
document.addEventListener('DOMContentLoaded', () => {

    // 1. Select all the elements to be animated
    const animatedItems = document.querySelectorAll('.offer-item');

    // 2. If no items are found, exit the script
    if (animatedItems.length === 0) {
        return;
    }

    // 3. Create a new Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        // Loop over each observed entry
        entries.forEach(entry => {
            // If the element is in the viewport (is intersecting)
            if (entry.isIntersecting) {
                // Add the 'is-visible' class to trigger the CSS animation
                entry.target.classList.add('is-visible');
                
                // Stop observing the element after it has become visible
                // This is a performance optimization
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Configuration options for the observer
        threshold: 0.1 // Trigger the animation when 10% of the item is visible
    });

    // 4. Start observing each of the animated items
    animatedItems.forEach(item => {
        observer.observe(item);
    });

});



//section3-------------------------------------------


document.addEventListener('DOMContentLoaded', () => {

    /**
     * Animates a number counting up from a start value to an end value.
     * @param {HTMLElement} element - The HTML element whose text will be updated.
     * @param {number} start - The starting number.
     * @param {number} end - The final number.
     * @param {number} duration - The duration of the animation in milliseconds.
     * @param {string} finalText - The original text to display at the end (e.g., "40+", "98%").
     */
    const animateNumber = (element, start, end, duration, finalText) => {
        let startTime = null;

        // The function that runs on each animation frame
        const step = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const currentValue = Math.floor(progress * (end - start) + start);

            // Display the current value during animation
            element.innerText = currentValue;

            // If the animation is not complete, request the next frame
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                // Once complete, set the final text to include any original characters like '+' or '%'
                element.innerText = finalText;
            }
        };

        // Start the animation
        window.requestAnimationFrame(step);
    };

    // Select all the feature cards to be animated
    const featureCards = document.querySelectorAll('.feature-card-fa01');

    // Configuration for the Intersection Observer
    const observerOptions = {
        root: null, // observes intersections relative to the viewport
        rootMargin: '0px',
        threshold: 0.2 // trigger when 20% of the element is visible for better effect
    };

    // Callback function to execute when a card enters the viewport
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // If the element is intersecting (visible)
            if (entry.isIntersecting) {
                // Add the 'visible' class to trigger the CSS transition for the card
                entry.target.classList.add('visible-fa01');

                // --- Number Animation Logic ---
                const statElement = entry.target.querySelector('.feature-stat-fa01');
                if (statElement) {
                    const finalText = statElement.innerText;
                    // Extracts the integer from the text (e.g., 40 from "40+")
                    const targetNumber = parseInt(finalText, 10);

                    if (!isNaN(targetNumber)) {
                        // Start the number increment animation
                        animateNumber(statElement, 0, targetNumber, 2000, finalText);
                    }
                }
                
                // Stop observing the element after the animation has been triggered
                observer.unobserve(entry.target);
            }
        });
    };

    // Create a new Intersection Observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Tell the observer to watch each of the feature cards
    featureCards.forEach(card => {
        observer.observe(card);
    });

});


//section4-------------------------------------------






document.addEventListener('DOMContentLoaded', () => {

    // Select all necessary elements for the slider
    const slider = document.getElementById('testimonialSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // If slider elements don't exist, exit to avoid errors
    if (!slider || !prevBtn || !nextBtn) {
        console.warn("Testimonial slider elements not found. Slider not initialized.");
        return;
    }

    const slides = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    /**
     * Updates the slider's position based on the currentIndex.
     * This function is responsive and recalculates widths as needed.
     */
    function updateSliderPosition() {
        // Only apply transform if on a mobile view (where controls are visible)
        if (window.innerWidth <= 768) {
            const card = slides[0];
            // Calculate the total width of a slide (element width + margins)
            const cardMargin = parseFloat(getComputedStyle(card).marginLeft) + parseFloat(getComputedStyle(card).marginRight);
            const slideWidth = card.offsetWidth + cardMargin;
            
            // Calculate the offset to move the slider container
            const offset = -currentIndex * slideWidth;
            slider.style.transform = `translateX(${offset}px)`;
        } else {
            // On desktop, remove any transform to revert to the flexbox grid
            slider.style.transform = 'translateX(0)';
        }
    }

    // --- Event Handlers ---
    function showNextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSliderPosition();
    }

    function showPrevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSliderPosition();
    }
    
    // --- Touch swipe functionality for mobile ---
    function handleTouchStart(e) {
        touchStartX = e.changedTouches[0].screenX;
    }

    function handleTouchEnd(e) {
        touchEndX = e.changedTouches[0].screenX;
        // Check if the swipe was significant
        if (touchEndX < touchStartX - 50) {
            showNextSlide(); // Swiped left
        }
        if (touchEndX > touchStartX + 50) {
            showPrevSlide(); // Swiped right
        }
    }

    // --- Attach Event Listeners ---
    nextBtn.addEventListener('click', showNextSlide);
    prevBtn.addEventListener('click', showPrevSlide);
    
    // Add touch listeners to the slider itself
    slider.addEventListener('touchstart', handleTouchStart, false);
    slider.addEventListener('touchend', handleTouchEnd, false);

    // Recalculate slider position on window resize to ensure responsiveness
    window.addEventListener('resize', updateSliderPosition);

    // Initial setup call
    updateSliderPosition();
});







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




//scroll-to-top.button-------------------------------------------


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


//certificates--------------------------------


 function openCertificate(certId) {
            const popup = document.getElementById(certId);
            popup.style.display = "flex";
            document.body.style.overflow = "hidden";
            
            // Center the popup content vertically after image loads
            const img = popup.querySelector('img');
            if (img.complete) {
                centerPopupContent(popup);
            } else {
                img.onload = function() {
                    centerPopupContent(popup);
                };
            }
        }

        function centerPopupContent(popup) {
            const content = popup.querySelector('.popup-content');
            const windowHeight = window.innerHeight;
            const contentHeight = content.offsetHeight;
            
            if (contentHeight < windowHeight) {
                content.style.marginTop = ((windowHeight - contentHeight) / 2) + 'px';
                content.style.marginBottom = ((windowHeight - contentHeight) / 2) + 'px';
            } else {
                content.style.marginTop = '2rem';
                content.style.marginBottom = '2rem';
            }
        }

        function closeCertificate(certId) {
            document.getElementById(certId).style.display = "none";
            document.body.style.overflow = "auto";
        }

        // Close when clicking outside the popup content
        window.onclick = function(event) {
            document.querySelectorAll('.certificate-popup').forEach(popup => {
                if (event.target == popup) {
                    closeCertificate(popup.id);
                }
            });
        }

        // Close with ESC key
        document.onkeydown = function(evt) {
            evt = evt || window.event;
            if (evt.key === "Escape") {
                document.querySelectorAll('.certificate-popup').forEach(popup => {
                    if (popup.style.display === "flex") {
                        closeCertificate(popup.id);
                    }
                });
            }
        };

        // Handle window resize
        window.addEventListener('resize', function() {
            document.querySelectorAll('.certificate-popup').forEach(popup => {
                if (popup.style.display === "flex") {
                    centerPopupContent(popup);
                }
            });
        });