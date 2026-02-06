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
                    subject: 'New Sponsorship Inquiry - Dartford CC',
                    from_name: data.name,
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
        { img: 'images/1.png', title: 'Cover - Sponsorship Packages 2026' },
        { img: 'images/2.png', title: 'About Dartford Cricket Club' },
        { img: 'images/3.png', title: 'Sponsorship Overview' },
        { img: 'images/4.png', title: 'Platinum Package' },
        { img: 'images/5.png', title: 'Gold Package' },
        { img: 'images/6.png', title: 'Silver Package' },
        { img: 'images/7.png', title: 'Bronze Package' },
        { img: 'images/8.png', title: 'Additional Opportunities' },
        { img: 'images/9.png', title: 'Benefits Summary' },
        { img: 'images/10.png', title: 'Partnership Details' },
        { img: 'images/11.png', title: 'Contact Information' }
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
