// Main application initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    setupEventListeners();
    checkFadeIn(); // Initial check for fade-in elements
});

// Particle.js configuration for background animation
function initializeParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#D4AF37" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#D4AF37",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
}

// Setup all event listeners
function setupEventListeners() {
    // Login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Logout functionality
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Email input for username extraction
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', updateUserNameFromEmail);
    }
    
    // Scroll event for fade-in animations
    window.addEventListener('scroll', checkFadeIn);
}

// Handle login form submission
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simple validation - in a real app, this would connect to a backend
    if (email && password) {
        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Entering Academy...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            switchToDashboard();
            
            // Reset form button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    } else {
        alert('Please enter both email and password');
    }
}

// Switch from login page to dashboard
function switchToDashboard() {
    const loginPage = document.getElementById('login-page');
    const dashboard = document.getElementById('dashboard');
    
    if (loginPage && dashboard) {
        loginPage.classList.add('hidden');
        dashboard.style.display = 'flex';
        
        // Animate progress bars
        animateProgressBars();
        
        // Trigger fade-in animations for dashboard elements
        setTimeout(checkFadeIn, 100);
    }
}

// Handle logout
function handleLogout(e) {
    e.preventDefault();
    
    const loginPage = document.getElementById('login-page');
    const dashboard = document.getElementById('dashboard');
    const loginForm = document.getElementById('login-form');
    
    if (loginPage && dashboard && loginForm) {
        // Switch back to login page
        dashboard.style.display = 'none';
        loginPage.classList.remove('hidden');
        
        // Reset form
        loginForm.reset();
    }
}

// Update username based on email input
function updateUserNameFromEmail() {
    const email = this.value;
    const userNameElement = document.getElementById('user-name');
    
    if (email && userNameElement) {
        const name = email.split('@')[0];
        userNameElement.textContent = name.charAt(0).toUpperCase() + name.slice(1);
    }
}

// Animate progress bars in dashboard
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width + '%';
        }, 500);
    });
}

// Check and trigger fade-in animations for elements in viewport
function checkFadeIn() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Additional utility functions
function simulateApiCall(duration = 1000) {
    return new Promise(resolve => {
        setTimeout(resolve, duration);
    });
}

// Export functions for potential module use (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeParticles,
        handleLogin,
        handleLogout,
        animateProgressBars,
        checkFadeIn
    };
}