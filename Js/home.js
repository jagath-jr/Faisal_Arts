document.addEventListener('DOMContentLoaded', function() {
    // --- 1. PARTICLE BACKGROUND ANIMATION ---
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const numParticles = window.innerWidth > 768 ? 100 : 30;

        // Set canvas dimensions
        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        };

        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Bounce off edges
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }
            draw() {
                ctx.fillStyle = 'rgba(0, 169, 255, 0.5)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Initialize particles
        const initParticles = () => {
            particles = [];
            for (let i = 0; i < numParticles; i++) {
                particles.push(new Particle());
            }
        };

        // Draw lines between nearby particles
        const connectParticles = () => {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        ctx.strokeStyle = `rgba(0, 169, 255, ${1 - distance / 120})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            connectParticles();
            requestAnimationFrame(animate);
        };

        // Setup and run
        setCanvasSize();
        initParticles();
        animate();

        // Recalculate on window resize
        window.addEventListener('resize', () => {
            setCanvasSize();
            initParticles();
        });
    }

    // --- 2. CARD PARALLAX EFFECT ---
    const heroSection = document.querySelector('.hero-section');
    const cards = document.querySelector('.hero-cards');

    if (heroSection && cards) {
        const applyParallax = (clientX, clientY) => {
            const { innerWidth, innerHeight } = window;
            
            // Different factors for desktop vs mobile
            const moveFactor = window.innerWidth > 768 ? 8 : 3;
            const rotateFactor = window.innerWidth > 768 ? 12 : 4;
            
            const moveX = (clientX - innerWidth / 2) / (innerWidth / 2) * -moveFactor;
            const moveY = (clientY - innerHeight / 2) / (innerHeight / 2) * -moveFactor;
            const rotateX = (clientY / innerHeight - 0.5) * rotateFactor;
            const rotateY = (clientX / innerWidth - 0.5) * -rotateFactor;

            cards.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(${moveX}px) translateY(${moveY}px)`;
        };

        // Mouse movement for desktop
        if (window.innerWidth > 768) {
            heroSection.addEventListener('mousemove', (e) => {
                applyParallax(e.clientX, e.clientY);
            });
        }
        // Touch movement for mobile/tablet
        else {
            heroSection.addEventListener('touchmove', (e) => {
    // Only apply parallax if touching the cards directly
    if (e.target.closest('.hero-cards')) {
        const touch = e.touches[0];
        applyParallax(touch.clientX, touch.clientY);
    }
}, { passive: true }); // Set passive to true for better scrolling performance
        }

        // Reset on mouse/touch leave
        const resetCards = () => {
            cards.style.transform = window.innerWidth > 768 ? 
                'rotateX(0deg) rotateY(0deg) translateX(0px) translateY(0px)' :
                'rotateX(0deg) rotateY(0deg)';
        };
        
        heroSection.addEventListener('mouseleave', resetCards);
        heroSection.addEventListener('touchend', resetCards);

        // Gyroscope for mobile tilt effects
        if (window.DeviceOrientationEvent && window.innerWidth <= 768) {
            window.addEventListener('deviceorientation', (e) => {
                const beta = e.beta ? Math.min(Math.max(e.beta, -30), 30) : 0;
                const gamma = e.gamma ? Math.min(Math.max(e.gamma, -30), 30) : 0;
                
                cards.style.transform = `
                    rotateX(${beta * 0.5}deg) 
                    rotateY(${-gamma * 0.5}deg)
                `;
            });
        }
    }

    // --- 3. DYNAMIC CONTENT ADJUSTMENT ---
    function adjustCardContent() {
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            if (window.innerWidth <= 768) {
                // Mobile-specific content adjustments
                const content = card.querySelector('.card-content');
                if (content) {
                    content.style.padding = '0 5px';
                }
                
                // Adjust line heights for mobile
                const paragraphs = card.querySelectorAll('p');
                paragraphs.forEach(p => {
                    p.style.lineHeight = '1.5';
                });
            } else {
                // Reset any mobile-specific adjustments
                const content = card.querySelector('.card-content');
                if (content) {
                    content.style.padding = '';
                }
                
                const paragraphs = card.querySelectorAll('p');
                paragraphs.forEach(p => {
                    p.style.lineHeight = '';
                });
            }
        });
    }

    // Run on load and resize
    adjustCardContent();
    window.addEventListener('resize', adjustCardContent);
});





/*------section2------*/


document.addEventListener('DOMContentLoaded', () => {
    const animatedSections = document.querySelectorAll('.why-choose-us, .service-card');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('why-choose-us')) {
                    entry.target.classList.add('visible');
                    
                    // Additional check for mobile devices
                    if (window.innerWidth < 768) {
                        const elements = entry.target.querySelectorAll('.fade-in-element');
                        elements.forEach(el => {
                            el.style.transitionDelay = '0.3s'; // Simpler animation on mobile
                        });
                    }
                } else if (entry.target.classList.contains('service-card')) {
                    entry.target.classList.add('is-visible');
                }
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    animatedSections.forEach(section => {
        observer.observe(section);
        
        // Initialize all animated elements as hidden
        const elements = section.querySelectorAll('.fade-in-element');
        elements.forEach(el => {
            el.style.opacity = '0';
        });
    });
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


