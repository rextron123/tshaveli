document.addEventListener('DOMContentLoaded', () => {
    // Responsive Design Utilities
    const responsiveUtils = {
        isMobile: () => window.innerWidth <= 768,
        isTablet: () => window.innerWidth > 768 && window.innerWidth <= 1024,
        isDesktop: () => window.innerWidth > 1024,

        // Adaptive Navigation
        setupNavigation() {
            const navToggle = document.createElement('div');
            navToggle.classList.add('nav-toggle');
            navToggle.innerHTML = '☰';
            
            const nav = document.querySelector('nav');
            const navMenu = nav.querySelector('ul');
            nav.insertBefore(navToggle, navMenu);

            // Toggle mobile menu
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });

            // Close mobile menu when a link is clicked
            navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                });
            });

            // Adaptive menu display
            window.addEventListener('resize', () => {
                if (!this.isMobile()) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            });
        },

        // Adaptive Hero Section
        setupHeroSection() {
            const heroImages = document.querySelectorAll('.hero-image');
            let currentImageIndex = 0;

            function changeHeroImage() {
                heroImages[currentImageIndex].classList.remove('active');
                currentImageIndex = (currentImageIndex + 1) % heroImages.length;
                heroImages[currentImageIndex].classList.add('active');
            }

            // Adjust image change interval based on device
            const interval = this.isMobile() ? 2000 : 3000;
            setInterval(changeHeroImage, interval);
        },

        // Responsive Grid Layouts
        setupResponsiveGrids() {
            const grids = document.querySelectorAll('.grid, .package-grid, .services-grid');
            grids.forEach(grid => {
                if (this.isMobile()) {
                    grid.style.gridTemplateColumns = '1fr';
                } else if (this.isTablet()) {
                    grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
                } else {
                    grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
                }
            });
        },

        // Touch Interaction Enhancements
        setupTouchInteractions() {
            const touchElements = document.querySelectorAll('.book-now, .cta-button, .service-card, .package-card');
            touchElements.forEach(el => {
                el.addEventListener('touchstart', function() {
                    this.classList.add('touch-active');
                });
                el.addEventListener('touchend', function() {
                    this.classList.remove('touch-active');
                });
            });
        },

        // Initialize Responsive Features
        init() {
            this.setupNavigation();
            this.setupHeroSection();
            this.setupResponsiveGrids();
            this.setupTouchInteractions();

            // Recheck layout on window resize
            window.addEventListener('resize', () => {
                this.setupResponsiveGrids();
            });
        }
    };

    // Run responsive utilities
    responsiveUtils.init();

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form Validation and Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[type="text"]');
            const email = this.querySelector('input[type="email"]');
            const phone = this.querySelector('input[type="tel"]');
            const message = this.querySelector('textarea');

            const validateName = (name) => name.value.trim().length >= 2;
            const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
            const validatePhone = (phone) => /^[+]?[\d\s-]{10,}$/.test(phone.value);
            const validateMessage = (message) => message.value.trim().length >= 10;

            [name, email, phone, message].forEach(field => {
                field.classList.remove('error');
            });

            let isValid = true;
            
            if (!validateName(name)) {
                name.classList.add('error');
                isValid = false;
            }
            
            if (!validateEmail(email)) {
                email.classList.add('error');
                isValid = false;
            }
            
            if (phone.value && !validatePhone(phone)) {
                phone.classList.add('error');
                isValid = false;
            }
            
            if (!validateMessage(message)) {
                message.classList.add('error');
                isValid = false;
            }

            if (isValid) {
                const submitButton = this.querySelector('button');
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;

                setTimeout(() => {
                    alert('Thank you for your inquiry! Our team will contact you soon.');
                    this.reset();
                    submitButton.textContent = 'Send Inquiry';
                    submitButton.disabled = false;
                }, 1500);
            }
        });
    }

    // WhatsApp Inquiry Functionality
    const inquiryForm = document.getElementById('inquiry-form');
    const whatsappDirectBtn = document.getElementById('whatsapp-direct');
    const whatsappInquiryBtn = document.getElementById('whatsapp-inquiry');

    // Hotel's WhatsApp number (replace with actual number)
    const hotelWhatsAppNumber = '+919876543210';

    // WhatsApp Direct Chat
    whatsappDirectBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const whatsappUrl = `https://wa.me/${hotelWhatsAppNumber.replace(/\+|\s/g, '')}`;
        window.open(whatsappUrl, '_blank');
    });

    // WhatsApp Inquiry Submission
    whatsappInquiryBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Validate form
        const name = inquiryForm.querySelector('input[name="name"]').value.trim();
        const email = inquiryForm.querySelector('input[name="email"]').value.trim();
        const phone = inquiryForm.querySelector('input[name="phone"]').value.trim();
        const message = inquiryForm.querySelector('textarea[name="message"]').value.trim();

        if (!name || !email || !message) {
            alert('Please fill in Name, Email, and Message fields.');
            return;
        }

        // Construct WhatsApp message
        const whatsappMessage = encodeURIComponent(`
Inquiry from T. S. Haveli Website:

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not Provided'}

Message:
${message}
        `);

        // Open WhatsApp with pre-filled message
        const whatsappUrl = `https://wa.me/${hotelWhatsAppNumber.replace(/\+|\s/g, '')}?text=${whatsappMessage}`;
        window.open(whatsappUrl, '_blank');
    });

    // Form submission handler (optional)
    inquiryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // You can add additional form submission logic here
        // For now, we'll just show an alert
        alert('Thank you for your inquiry! We will get back to you soon.');
    });

    // Performance and Accessibility
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Hero Image Gallery
    const heroImages = document.querySelectorAll('.hero-image');
    let currentImageIndex = 0;

    function changeHeroImage() {
        heroImages[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;
        heroImages[currentImageIndex].classList.add('active');
    }

    setInterval(changeHeroImage, 3000);

    // Responsive design adjustments
    function adjustLayoutForMobile() {
        const isMobile = window.innerWidth <= 768;
        
        const hero = document.querySelector('.hero');
        if (isMobile) {
            hero.style.height = `${window.innerHeight * 0.6}px`;
        } else {
            hero.style.height = '600px';
        }

        const heroTitle = document.querySelector('.hero h1');
        const heroSubtitle = document.querySelector('.hero h2');
        if (isMobile) {
            heroTitle.style.fontSize = '1.8rem';
            heroSubtitle.style.fontSize = '1.2rem';
        } else {
            heroTitle.style.fontSize = '2.5rem';
            heroSubtitle.style.fontSize = '1.6rem';
        }
    }

    adjustLayoutForMobile();

    window.addEventListener('resize', adjustLayoutForMobile);

    // Package Booking Interaction with Modal
    const bookNowButtons = document.querySelectorAll('.book-now');
    bookNowButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const packageName = this.closest('.package-card-content').querySelector('h3').textContent;
            
            const modal = document.createElement('div');
            modal.classList.add('booking-modal');
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h2>Book ${packageName}</h2>
                    <form class="booking-form">
                        <input type="text" placeholder="Your Name" required>
                        <input type="email" placeholder="Your Email" required>
                        <input type="tel" placeholder="Your Phone Number" required>
                        <input type="date" placeholder="Preferred Date" required>
                        <textarea placeholder="Additional Requirements"></textarea>
                        <button type="submit">Confirm Booking</button>
                    </form>
                </div>
            `;

            document.body.appendChild(modal);

            const closeModal = modal.querySelector('.close-modal');
            closeModal.addEventListener('click', () => {
                document.body.removeChild(modal);
            });

            const bookingForm = modal.querySelector('.booking-form');
            bookingForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert(`Booking request for ${packageName} received. We'll contact you shortly!`);
                document.body.removeChild(modal);
            });
        });
    });

    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    });
});
