// Complete Updated JavaScript with Immediate Preloader
document.addEventListener('DOMContentLoaded', function() {
    // --- PRELOADER THAT SHOWS IMMEDIATELY ---
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    
    // Always hide main content initially
    if (mainContent) {
        mainContent.style.opacity = '0';
        mainContent.style.visibility = 'hidden';
    }

    // Check if we should skip preloader (internal navigation)
    const skipPreloader = sessionStorage.getItem('skipPreloader');
    
    if (preloader && !skipPreloader) {
        const video = preloader.querySelector('video');
        
        function showPreloader() {
            // Preloader is already visible (set in CSS)
            if (video) {
                video.currentTime = 0;
                video.play().catch(e => console.log('Video play error:', e));
                
                // Hide after video ends (2s) + 2s pause
                video.addEventListener('ended', function() {
                    setTimeout(hidePreloader, 2000);
                }, { once: true });
            } else {
                // Fallback: hide after total 4s if no video
                setTimeout(hidePreloader, 2000);
            }
            
            // Safety timeout in case video fails
            setTimeout(hidePreloader, 2000);
        }
        
        function hidePreloader() {
            preloader.classList.add('preloader-hidden');
            
            // Show main content with fade-in effect
            if (mainContent) {
                mainContent.style.opacity = '1';
                mainContent.style.visibility = 'visible';
                mainContent.classList.add('content-visible');
            }
            
            // Remove preloader from DOM after animation completes
            setTimeout(() => {
                preloader.style.display = 'none';
                initAnimations(); // Initialize animations after preloader
            }, 500);
        }
        
        showPreloader();
        
        // Clear the skip flag for future loads
        sessionStorage.removeItem('skipPreloader');
    } else {
        // If no preloader needed, just show content immediately
        if (preloader) preloader.style.display = 'none';
        if (mainContent) {
            mainContent.style.opacity = '1';
            mainContent.style.visibility = 'visible';
            mainContent.classList.add('content-visible');
        }
        initAnimations();
    }

    // --- ANIMATION FUNCTIONS ---
    function initAnimations() {
        // 1. PARTICLE BACKGROUND ANIMATION
        const initParticleBackground = () => {
            const canvas = document.getElementById('particle-canvas');
            if (!canvas) return;
            
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
        };

        // 2. SCROLL-REVEAL ANIMATIONS
        const animateSectionOnScroll = (sectionSelector, visibleClass = 'visible', hiddenClass = 'hidden') => {
            const sections = document.querySelectorAll(sectionSelector);
            if (!sections.length) return;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(visibleClass);
                        if (hiddenClass) entry.target.classList.remove(hiddenClass);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.2,
                rootMargin: '0px 0px -100px 0px'
            });
            
            sections.forEach(section => observer.observe(section));
        };

        // 3. FEATURE LIST ENHANCEMENTS
        const enhanceFeatureList = () => {
            const features = document.querySelectorAll('.features-list li');
            if (!features.length) return;
            
            features.forEach(item => {
                item.addEventListener('mouseenter', () => {
                    item.style.transform = 'translateX(5px)';
                    item.style.transition = 'transform 0.3s ease';
                });
                
                item.addEventListener('mouseleave', () => {
                    item.style.transform = 'translateX(0)';
                });
            });
        };

        // 4. SERVICE CARDS ANIMATION
        const animateServiceCards = () => {
            const serviceCards = document.querySelectorAll('.service-card');
            if (!serviceCards.length) return;
            
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('is-visible');
                            observer.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: 0.1,
                    rootMargin: '0px 0px -100px 0px'
                });
                
                serviceCards.forEach(card => observer.observe(card));
            } else {
                const handleScrollAnimations = () => {
                    serviceCards.forEach(card => {
                        const rect = card.getBoundingClientRect();
                        if (rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0) {
                            card.classList.add('is-visible');
                        }
                    });
                };
                
                handleScrollAnimations();
                window.addEventListener('scroll', () => {
                    window.requestAnimationFrame(handleScrollAnimations);
                }, { passive: true });
            }
        };

        // 5. CLIENT LOGO SLIDER
        const initClientSlider = () => {
            const slider = document.querySelector('.client-logos-slider');
            if (!slider) return;
            
            slider.addEventListener('mouseenter', function() {
                this.style.animationPlayState = 'paused';
            });
            
            slider.addEventListener('mouseleave', function() {
                this.style.animationPlayState = 'running';
            });
            
            const checkSliderItems = () => {
                const container = document.querySelector('.client-logos-container');
                if (!container) return;
                
                const sliderWidth = slider.scrollWidth / 2;
                if (container.offsetWidth >= sliderWidth && slider.children.length < 36) {
                    const items = Array.from(slider.children).slice(0, 18);
                    items.forEach(item => {
                        const clone = item.cloneNode(true);
                        slider.appendChild(clone);
                    });
                }
            };
            
            checkSliderItems();
            window.addEventListener('resize', checkSliderItems);
        };

        // 6. LOCATION SECTION ANIMATION
        const animateLocationSection = () => {
            const section = document.querySelector('.location-section-container');
            if (!section) return;
            
            const handleScroll = () => {
                const sectionTop = section.getBoundingClientRect().top;
                if (sectionTop < window.innerHeight * 0.85) {
                    section.classList.add('visible');
                    window.removeEventListener('scroll', handleScroll);
                }
            };
            
            window.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll();
        };

        // 7. REQUEST SECTION ANIMATION
        const animateRequestSection = () => {
            const animateElements = document.querySelectorAll('.request-content, .request-image');
            if (!animateElements.length) return;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            animateElements.forEach(el => observer.observe(el));
            
            const requestBtn = document.querySelector('.btn-request');
            if (requestBtn) {
                requestBtn.addEventListener('click', () => {
                    console.log('Request button clicked');
                });
            }
        };

        // INITIALIZE ALL ANIMATIONS
        initParticleBackground();
        animateSectionOnScroll('.why-choose-us');
        enhanceFeatureList();
        animateServiceCards();
        initClientSlider();
        animateLocationSection();
        animateRequestSection();
    }
});

// SCROLL TO TOP BUTTON
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// PREVENT PRELOADER ON INTERNAL NAVIGATION
document.addEventListener('click', function(e) {
    const target = e.target.closest('a');
    if (target) {
        const href = target.getAttribute('href');
        // Check if it's an internal link (not starting with http and not a hash link)
        if (href && !href.startsWith('http') && !href.startsWith('#')) {
            sessionStorage.setItem('skipPreloader', 'true');
        }
    }
});

// Ensure main content is visible if JavaScript fails
window.addEventListener('load', function() {
    const mainContent = document.getElementById('main-content');
    const preloader = document.getElementById('preloader');
    
    // Fallback in case preloader doesn't hide properly
    setTimeout(function() {
        if (mainContent) {
            mainContent.style.opacity = '1';
            mainContent.style.visibility = 'visible';
            mainContent.classList.add('content-visible');
        }
        if (preloader) {
            preloader.style.display = 'none';
        }
    }, 5000); // 5 second timeout as absolute fallback
});