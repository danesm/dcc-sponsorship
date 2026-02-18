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
        { img: 'images/1.png', title: 'Sponsorship Package Overview - Dartford Cricket Club 300th Anniversary' },
        { img: 'images/2.png', title: 'Platinum Sponsorship Package - Premium Partnership Opportunities' },
        { img: 'images/3.png', title: 'Gold Sponsorship Package - Enhanced Brand Visibility' },
        { img: 'images/4.png', title: 'Silver Sponsorship Package - Community Partnership' },
        { img: 'images/5.png', title: 'Bronze Sponsorship Package - Supporting Local Cricket' },
        { img: 'images/6.png', title: 'Match Day Sponsorship - Event Partnership Options' },
        { img: 'images/7.png', title: 'Youth Development Sponsorship - Supporting Future Cricketers' },
        { img: 'images/8.png', title: 'Facility Sponsorship - Ground and Equipment Support' },
        { img: 'images/9.png', title: 'Digital Sponsorship - Online Brand Presence' },
        { img: 'images/10.png', title: 'Anniversary Event Sponsorship - 300th Celebration Partnership' },
        { img: 'images/11.png', title: 'Contact Information - Get in Touch About Sponsorship' }
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

// Load and display donation progress - DISABLED FOR NOW
// async function loadDonationProgress() {
//     try {
//         const response = await fetch('donation-progress.json');
//         const data = await response.json();
//         
//         // Update amounts
//         document.getElementById('currentAmount').textContent = data.current.toLocaleString();
//         document.getElementById('targetAmount').textContent = data.target.toLocaleString();
//         document.getElementById('donorCount').textContent = data.donorCount;
//         document.getElementById('lastUpdated').textContent = data.lastUpdated;
//         
//         // Calculate percentage
//         const percentage = Math.min((data.current / data.target) * 100, 100);
//         const progressBar = document.getElementById('progressBar');
//         const progressPercentage = document.getElementById('progressPercentage');
//         
//         // Animate progress bar
//         setTimeout(() => {
//             progressBar.style.width = percentage + '%';
//             progressPercentage.textContent = Math.round(percentage) + '%';
//         }, 100);
//         
//         // Check for milestone messages
//         const milestoneMessage = document.getElementById('milestoneMessage');
//         const reachedMilestone = data.milestones.find(m => 
//             data.current >= m.amount && data.current < m.amount + 500
//         );
//         
//         if (reachedMilestone) {
//             milestoneMessage.textContent = reachedMilestone.message;
//             milestoneMessage.style.display = 'block';
//         }
//         
//     } catch (error) {
//         console.error('Error loading donation progress:', error);
//         // Set default values if file not found
//         document.getElementById('currentAmount').textContent = '0';
//         document.getElementById('targetAmount').textContent = '10,000';
//         document.getElementById('donorCount').textContent = '0';
//         document.getElementById('lastUpdated').textContent = 'Today';
//     }
// }

// Check for donation success on page load
window.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('donation') === 'success') {
        // Redirect to thank you page
        window.location.href = 'thank-you.html';
    }
    
    // Load donation progress - DISABLED FOR NOW
    // loadDonationProgress();
    
    // Gift Aid Form Toggle
    const giftAidCheckbox = document.getElementById('giftAidOptIn');
    const giftAidDetails = document.getElementById('giftAidDetails');
    const donateButton = document.getElementById('donateButton');

    if (giftAidCheckbox) {
        giftAidCheckbox.addEventListener('change', function() {
            if (this.checked) {
                giftAidDetails.style.display = 'block';
            } else {
                giftAidDetails.style.display = 'none';
            }
        });
    }

    // Handle donation button click with Gift Aid
    if (donateButton) {
        donateButton.addEventListener('click', async function(e) {
            // Check if Gift Aid is opted in
            if (giftAidCheckbox && giftAidCheckbox.checked) {
                // Validate Gift Aid form
                const name = document.getElementById('giftAidName').value.trim();
                const email = document.getElementById('giftAidEmail').value.trim();
                const address = document.getElementById('giftAidAddress').value.trim();
                const postcode = document.getElementById('giftAidPostcode').value.trim();
                
                if (!name || !email || !address || !postcode) {
                    e.preventDefault();
                    alert('Please complete all Gift Aid fields before proceeding to donate.');
                    return;
                }
                
                // Send Gift Aid details to club email
                try {
                    await fetch('https://api.web3forms.com/submit', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            access_key: '5968b701-72cd-4d10-a45a-ce8b8536b54d',
                            subject: '🎁 Gift Aid Declaration - Dartford CC Donation (Pending Verification)',
                            from_name: 'DCC Gift Aid System',
                            replyto: email,
                            name: name,
                            email: email,
                            address: address,
                            postcode: postcode,
                            message: `GIFT AID DECLARATION RECEIVED

⚠️ IMPORTANT: This donor has opted for Gift Aid and is now being redirected to complete their donation via Stripe.

ACTION REQUIRED:
1. Check your Stripe dashboard to verify if a payment was successfully received from this donor
2. Match the donor's email (${email}) with the Stripe payment record
3. Only process Gift Aid claim if payment is confirmed

DONOR DETAILS:
Name: ${name}
Email: ${email}
Address: ${address}
Postcode: ${postcode}

GIFT AID DECLARATION:
The donor confirms they are a UK taxpayer and understand that if they pay less Income Tax and/or Capital Gains Tax than the amount of Gift Aid claimed on all their donations in that tax year, it is their responsibility to pay any difference.

---
This declaration was submitted on: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}

Next Steps:
- Wait for Stripe payment confirmation
- Verify payment amount and donor email match
- If payment confirmed, file this Gift Aid declaration
- Claim additional 25% from HMRC`
                        })
                    });
                    
                    // Store in localStorage to show on thank you page
                    localStorage.setItem('giftAidOptIn', 'true');
                    localStorage.setItem('giftAidName', name);
                } catch (error) {
                    console.error('Error sending Gift Aid details:', error);
                    // Still allow donation to proceed
                }
            }
            
            // Allow navigation to Stripe
            // The link will work normally
        });
    }
});// Intersection Observer for fade-in animations
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
