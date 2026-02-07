// =====================
// MOBILE MENU TOGGLE
// =====================

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

// Toggle menu on hamburger click
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// =====================
// SCROLL ANIMATIONS
// =====================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe fade-in-up elements
const fadeInUpElements = document.querySelectorAll('.fade-in-up');
fadeInUpElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    observer.observe(element);
});

// =====================
// SMOOTH SCROLL BEHAVIOR
// =====================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// =====================
// BUTTON HOVER EFFECTS
// =====================

const ctaButtons = document.querySelectorAll('.cta-button');
ctaButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// =====================
// CONTACT FORM HANDLING
// =====================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Check HTML5 validity first
        if (!this.checkValidity()) {
            this.reportValidity();
            return;
        }

        // Add visual feedback
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Message Sent! ✓';
        submitButton.style.backgroundColor = 'var(--accent-secondary)';

        // Reset form
        this.reset();

        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.backgroundColor = '';
        }, 3000);

        // Demo: log the submission (replace with backend integration)
        console.log('Form submitted (demo mode - no backend)');
    });
}

// =====================
// SCROLL PARALLAX EFFECT
// =====================

window.addEventListener('scroll', () => {
    const heroSection = document.querySelector('.hero');
    const scrollPosition = window.scrollY;

    if (scrollPosition < 600) {
        heroSection.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }
});

// =====================
// NAVBAR SCROLL SHADOW
// =====================

const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }
});

// =====================
// SOCIAL ICON ANIMATION ENHANCEMENT
// =====================

const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        // Trigger reflow to restart animation
        void this.offsetWidth;
        this.style.animation = 'socialIconRotate 0.6s ease-in-out';
    });
});

// =====================
// ADD RIPPLE EFFECT TO BUTTONS
// =====================

function createRipple(event) {
    const button = event.currentTarget;

    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    const ripples = button.querySelector('.ripples');
    if (ripples) {
        ripples.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }
}

// =====================
// PERFORMANCE OPTIMIZATION
// =====================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// =====================
// ACTIVE LINK HIGHLIGHTING
// =====================

const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', debounce(() => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
}, 100));

// Add active styles to CSS
const style = document.createElement('style');
style.textContent = `
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// =====================
// PAGE LOAD ANIMATIONS
// =====================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// =====================
// ACCESSIBILITY IMPROVEMENTS
// =====================

// Keyboard navigation for menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Focus management for menu
navLinks.forEach(link => {
    link.addEventListener('focus', () => {
        link.style.outline = '2px solid var(--accent-primary)';
        link.style.outlineOffset = '2px';
    });

    link.addEventListener('blur', () => {
        link.style.outline = 'none';
    });
});

// =====================
// CONSOLE LOG
// =====================

console.log('🌿 Welcome to Dr. Maya Reynolds\' therapy website!');
console.log('✨ All animations and interactions are ready to go.');

// =====================
// CONSULT MODAL (contact.html)
// =====================
const consultModal = document.getElementById('consultModal');
const openConsultBtn = document.getElementById('openConsult');
const closeConsultBtn = document.getElementById('closeConsult');
const consultForm = document.getElementById('consultForm');

function openConsult() {
    if (!consultModal) return;
    consultModal.style.display = 'block';
    consultModal.setAttribute('aria-hidden', 'false');
    // update any trigger's aria-expanded
    document.querySelectorAll('.open-consult-modal').forEach(el => el.setAttribute('aria-expanded', 'true'));
}

function closeConsult() {
    if (!consultModal) return;
    consultModal.style.display = 'none';
    consultModal.setAttribute('aria-hidden', 'true');
    // update any trigger's aria-expanded
    document.querySelectorAll('.open-consult-modal').forEach(el => el.setAttribute('aria-expanded', 'false'));
}

if (openConsultBtn) openConsultBtn.addEventListener('click', openConsult);
if (closeConsultBtn) closeConsultBtn.addEventListener('click', closeConsult);

// Close modal on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && consultModal && consultModal.style.display === 'block') {
        closeConsult();
    }
});

if (consultForm) {
    consultForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!this.checkValidity()) {
            this.reportValidity();
            return;
        }
        // Demo handling
        alert('Consult request sent. Thank you — we will follow up.');
        this.reset();
        closeConsult();
    });
}

// Attach handlers to any site-wide consult triggers (buttons/links)
document.querySelectorAll('.open-consult-modal').forEach(el => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        if (consultModal) {
            openConsult();
            // focus first input in modal for accessibility
            const firstInput = consultModal.querySelector('input, textarea, button');
            if (firstInput) firstInput.focus();
        } else {
            // fallback to contact page
            window.location.href = 'contact.html#contact';
        }
    });
});
