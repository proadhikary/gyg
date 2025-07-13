document.addEventListener('DOMContentLoaded', function () {
    // Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function () {
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            answer.classList.toggle('active');
        });
    });

    // Automatic Logo Carousel (Smooth Infinite Scroll, Faster, No Interaction)
    const logosContainer = document.getElementById('logos-container');

    if (logosContainer) {
        // Clone all logo items for seamless infinite scroll
        const logoItems = Array.from(logosContainer.querySelectorAll('.logo-item'));

        // Duplicate all items once for seamless looping
        logoItems.forEach(item => {
            const clone = item.cloneNode(true);
            logosContainer.appendChild(clone);
        });

        // Set container to not wrap and enable smooth scroll
        logosContainer.style.whiteSpace = 'nowrap';
        logosContainer.style.overflowX = 'auto';
        logosContainer.style.scrollBehavior = 'auto';

        let scrollPosition = 0;
        const scrollSpeed = 2.2; // Increased speed for faster scroll
        let animationFrameId;

        function autoScroll() {
            scrollPosition += scrollSpeed;

            // When scrolled past the original set, reset to start
            const resetPoint = logosContainer.scrollWidth / 2;
            if (scrollPosition >= resetPoint) {
                scrollPosition = 0;
            }

            logosContainer.scrollLeft = scrollPosition;
            animationFrameId = requestAnimationFrame(autoScroll);
        }

        // Start auto-scrolling immediately
        animationFrameId = requestAnimationFrame(autoScroll);

        // Adjust scroll position on resize to prevent glitches
        window.addEventListener('resize', () => {
            if (scrollPosition >= logosContainer.scrollWidth / 2) {
                scrollPosition = 0;
                logosContainer.scrollLeft = 0;
            }
        });
    }

    // Form Validation
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');

                    // Add error message if not exists
                    let errorMsg = field.nextElementSibling;
                    if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                        errorMsg = document.createElement('div');
                        errorMsg.classList.add('error-message');
                        errorMsg.textContent = 'This field is required';
                        field.parentNode.insertBefore(errorMsg, field.nextSibling);
                    }
                } else {
                    field.classList.remove('error');

                    // Remove error message if exists
                    const errorMsg = field.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.remove();
                    }

                    // Email validation
                    if (field.type === 'email' && !validateEmail(field.value)) {
                        isValid = false;
                        field.classList.add('error');

                        let errorMsg = field.nextElementSibling;
                        if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                            errorMsg = document.createElement('div');
                            errorMsg.classList.add('error-message');
                            errorMsg.textContent = 'Please enter a valid email address';
                            field.parentNode.insertBefore(errorMsg, field.nextSibling);
                        }
                    }
                }
            });

            if (isValid) {
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.classList.add('success-message');
                // successMsg.textContent = 'Form submitted successfully! We will get back to you soon.';
                form.appendChild(successMsg);

                // Reset form after successful submission
                setTimeout(() => {
                    form.reset();
                    successMsg.remove();
                }, 3000);
            }
        });
    });

    // Email validation helper function
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (mobileToggle) {
                        const icon = mobileToggle.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
    });
});
