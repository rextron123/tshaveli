document.addEventListener('DOMContentLoaded', () => {
    // Hero Image Gallery
    const heroImages = document.querySelectorAll('.hero-image');
    let currentImageIndex = 0;

    function changeHeroImage() {
        // Remove active class from current image
        heroImages[currentImageIndex].classList.remove('active');

        // Move to next image, loop back to start if at end
        currentImageIndex = (currentImageIndex + 1) % 6;

        // Add active class to next image
        heroImages[currentImageIndex].classList.add('active');
    }

    // Change image every 3 seconds
    setInterval(changeHeroImage, 3000);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Contact Form Submission with Enhanced Validation
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Advanced form validation
        const name = this.querySelector('input[type="text"]');
        const email = this.querySelector('input[type="email"]');
        const phone = this.querySelector('input[type="tel"]');
        const message = this.querySelector('textarea');

        // Validation functions
        const validateName = (name) => name.value.trim().length >= 2;
        const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
        const validatePhone = (phone) => /^[+]?[\d\s-]{10,}$/.test(phone.value);
        const validateMessage = (message) => message.value.trim().length >= 10;

        // Reset previous error states
        [name, email, phone, message].forEach(field => {
            field.classList.remove('error');
        });

        // Perform validation
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

        // If form is valid, simulate form submission
        if (isValid) {
            const submitButton = this.querySelector('button');
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Simulated async submission
            setTimeout(() => {
                alert('Thank you for your inquiry! Our team will contact you soon.');
                this.reset();
                submitButton.textContent = 'Send Inquiry';
                submitButton.disabled = false;
            }, 1500);
        }
    });

    // Package Booking Interaction with Modal
    const bookNowButtons = document.querySelectorAll('.book-now');
    bookNowButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const packageName = this.closest('.package-card-content').querySelector('h3').textContent;
            
            // Create a modal dynamically
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

            // Close modal functionality
            const closeModal = modal.querySelector('.close-modal');
            closeModal.addEventListener('click', () => {
                document.body.removeChild(modal);
            });

            // Booking form submission
            const bookingForm = modal.querySelector('.booking-form');
            bookingForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert(`Booking request for ${packageName} received. We'll contact you shortly!`);
                document.body.removeChild(modal);
            });
        });
    });

    // Responsive Navigation Toggle
    const navToggle = document.createElement('div');
    navToggle.classList.add('nav-toggle');
    navToggle.innerHTML = '☰';
    navToggle.style.display = 'none';
    document.querySelector('nav').prepend(navToggle);

    // Responsive menu toggle
    if (window.innerWidth <= 768) {
        const navMenu = document.querySelector('nav ul');
        navToggle.style.display = 'block';
        
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    });
});
