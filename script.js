// Countdown Timer to 300th Anniversary (2027)
function updateCountdown() {
    const targetDate = new Date('2027-01-01T00:00:00').getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(3, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    
    // Update seconds if element exists
    const secondsElement = document.getElementById('seconds');
    if (secondsElement) {
        secondsElement.textContent = String(seconds).padStart(2, '0');
    }
}

// Update countdown every second for real-time updates
updateCountdown();
setInterval(updateCountdown, 1000);

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        mobileMenuBtn.classList.toggle('active');
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const bannerHeight = document.querySelector('.top-banner').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - bannerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Send form to Web3Forms
            // Get your free access key at: https://web3forms.com/
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: '5968b701-72cd-4d10-a45a-ce8b8536b54d',
                    subject: '🏏 New Sponsorship Inquiry - Dartford CC 300th Anniversary',
                    from_name: 'Dartford CC Sponsorship Portal',
                    replyto: data.email,
                    name: data.name,
                    email: data.email,
                    company: data.company || 'Not provided',
                    phone: data.phone || 'Not provided',
                    package: data.package || 'Not specified',
                    message: data.message
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Show success message
                formStatus.textContent = 'Thank you! We\'ll be in touch soon.';
                formStatus.className = 'form-status success';
                contactForm.reset();
            } else {
                throw new Error('Form submission failed');
            }
            
        } catch (error) {
            formStatus.textContent = 'Oops! Something went wrong. Please try again.';
            formStatus.className = 'form-status error';
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Hide status message after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }
    });
}

// Load sponsorship package images
function loadPackageImages() {
    const packagesContainer = document.getElementById('packagesContainer');
    
    // Package images from the PDF screenshots
    const packages = [
        { img: 'images/1.png', title: 'Page 1' },
        { img: 'images/2.png', title: 'Page 2' },
        { img: 'images/3.png', title: 'Page 3' },
        { img: 'images/4.png', title: 'Page 4' },
        { img: 'images/5.png', title: 'Page 5' },
        { img: 'images/6.png', title: 'Page 6' },
        { img: 'images/7.png', title: 'Page 7' },
        { img: 'images/8.png', title: 'Page 8' },
        { img: 'images/9.png', title: 'Page 9' },
        { img: 'images/10.png', title: 'Page 10' },
        { img: 'images/11.png', title: 'Page 11' }
    ];
    
    packages.forEach((pkg, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'package-slide';
        slideDiv.innerHTML = `
            <img src="${pkg.img}" alt="${pkg.title}" loading="lazy" onerror="this.style.display='none'">
            <div class="package-info">
                <h3>${pkg.title}</h3>
            </div>
        `;
        packagesContainer.appendChild(slideDiv);
    });
}

// Load images when DOM is ready
document.addEventListener('DOMContentLoaded', loadPackageImages);

// Donation Form Handling
const donationForm = document.getElementById('donationForm');
const customAmountInput = document.getElementById('customAmount');
const amountButtons = document.querySelectorAll('.amount-btn');
const donationStatus = document.getElementById('donationStatus');

// Stripe Payment Link
const STRIPE_PAYMENT_LINK = 'https://donate.stripe.com/bJe5kC8np8qm06Efc5frW00';

// Handle suggested amount button clicks
if (amountButtons.length > 0) {
    amountButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            amountButtons.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Set the custom amount input value
            const amount = this.getAttribute('data-amount');
            customAmountInput.value = amount;
        });
    });
}

// Clear button selection when user types custom amount
if (customAmountInput) {
    customAmountInput.addEventListener('input', function() {
        amountButtons.forEach(btn => btn.classList.remove('active'));
    });
}

// Handle donation form submission
if (donationForm) {
    // Real-time validation for amount input
    customAmountInput.addEventListener('input', function() {
        const amount = parseFloat(this.value);
        const amountWrapper = this.closest('.amount-input-wrapper');
        
        // Remove any existing error state
        amountWrapper.classList.remove('input-error');
        
        // Clear any error message
        const existingError = amountWrapper.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Validate if there's a value
        if (this.value !== '') {
            if (isNaN(amount) || amount < 1) {
                amountWrapper.classList.add('input-error');
                
                // Add error message
                const errorMsg = document.createElement('span');
                errorMsg.className = 'error-message';
                errorMsg.textContent = 'Please enter a valid amount (minimum £1)';
                amountWrapper.parentElement.appendChild(errorMsg);
            }
        }
    });
    
    donationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const amount = parseFloat(customAmountInput.value);
        
        // Validate amount
        if (!amount || isNaN(amount) || amount < 1) {
            const amountWrapper = customAmountInput.closest('.amount-input-wrapper');
            amountWrapper.classList.add('input-error');
            
            // Add error message if not already present
            if (!amountWrapper.parentElement.querySelector('.error-message')) {
                const errorMsg = document.createElement('span');
                errorMsg.className = 'error-message';
                errorMsg.textContent = 'Please enter a valid amount (minimum £1)';
                amountWrapper.parentElement.appendChild(errorMsg);
            }
            
            showDonationStatus('Please enter a valid amount (minimum £1)', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = donationForm.querySelector('button[type="submit"]');
        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="btn-icon">⏳</span> Redirecting to payment...';
        submitBtn.disabled = true;
        
        // Redirect to Stripe Payment Link with prefilled amount
        // Note: Stripe Payment Links allow custom amounts, user can adjust on Stripe page
        window.location.href = STRIPE_PAYMENT_LINK;
    });
}

function showDonationStatus(message, type) {
    if (donationStatus) {
        donationStatus.textContent = message;
        donationStatus.className = `form-status ${type}`;
        donationStatus.style.display = 'block';
        
        // Hide after 5 seconds
        setTimeout(() => {
            donationStatus.style.display = 'none';
        }, 5000);
    }
}

// Check for donation success on page load
window.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('donation') === 'success') {
        // Scroll to donation section
        document.getElementById('donate').scrollIntoView({ behavior: 'smooth' });
        
        // Show success message
        setTimeout(() => {
            if (donationStatus) {
                donationStatus.textContent = '✅ Thank you for your generous donation! You will receive a receipt via email.';
                donationStatus.className = 'form-status success';
                donationStatus.style.display = 'block';
            }
        }, 500);
        
        // Clear the URL parameter
        window.history.replaceState({}, document.title, window.location.pathname);
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.about-card, .benefit-card, .package-slide');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
