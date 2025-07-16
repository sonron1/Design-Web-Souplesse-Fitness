// Initialize particles
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#FFD700'
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000000'
            }
        },
        opacity: {
            value: 0.1,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.05,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#FFD700',
            opacity: 0.1,
            width: 1
        },
        move: {
            enable: true,
            speed: 1,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 0.2
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Check URL hash on page load
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.hash === '#register') {
        switchToRegister();
    } else {
        switchToLogin();
    }
});

// Form switching animations
function switchToRegister() {
    const loginCard = document.querySelector('.login-card');
    const registerCard = document.querySelector('.register-card');

    loginCard.classList.add('slide-out-left');
    window.location.hash = 'register';

    setTimeout(() => {
        loginCard.classList.remove('active', 'slide-out-left');
        registerCard.classList.add('slide-in-right');

        setTimeout(() => {
            registerCard.classList.remove('slide-in-right');
            registerCard.classList.add('active');

            // Add entrance animation for form elements
            animateFormElements(registerCard);
        }, 50);
    }, 300);
}

function switchToLogin() {
    const loginCard = document.querySelector('.login-card');
    const registerCard = document.querySelector('.register-card');

    registerCard.classList.add('slide-out-right');
    window.location.hash = '';

    setTimeout(() => {
        registerCard.classList.remove('active', 'slide-out-right');
        loginCard.classList.add('slide-in-left');

        setTimeout(() => {
            loginCard.classList.remove('slide-in-left');
            loginCard.classList.add('active');

            // Add entrance animation for form elements
            animateFormElements(loginCard);
        }, 50);
    }, 300);
}

// Animate form elements
function animateFormElements(card) {
    const elements = card.querySelectorAll('.form-group, .auth-header, .social-login, .auth-switch');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.4s ease';

        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Password toggle
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.parentElement.querySelector('.toggle-password');
    const icon = button.querySelector('i');

    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }

    // Add animation
    button.style.transform = 'scale(0.8)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
}

// Password strength checker
function checkPasswordStrength(password) {
    let strength = 0;
    let feedback = '';

    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;

    switch (strength) {
        case 0:
        case 1:
            feedback = 'Très faible';
            break;
        case 2:
            feedback = 'Faible';
            break;
        case 3:
            feedback = 'Moyen';
            break;
        case 4:
            feedback = 'Fort';
            break;
        case 5:
            feedback = 'Très fort';
            break;
    }

    return { strength, feedback };
}

// Initialize password strength checker
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('registerPassword');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strengthIndicator = document.querySelector('.password-strength');
            const strengthFill = document.querySelector('.strength-fill');
            const strengthText = document.querySelector('.strength-text');

            if (password.length > 0) {
                strengthIndicator.classList.add('show');
                const result = checkPasswordStrength(password);

                strengthFill.className = 'strength-fill';
                strengthText.className = 'strength-text';

                if (result.strength <= 2) {
                    strengthFill.classList.add('weak');
                    strengthText.classList.add('weak');
                } else if (result.strength <= 3) {
                    strengthFill.classList.add('medium');
                    strengthText.classList.add('medium');
                } else {
                    strengthFill.classList.add('strong');
                    strengthText.classList.add('strong');
                }

                strengthText.textContent = result.feedback;
            } else {
                strengthIndicator.classList.remove('show');
            }
        });
    }
});

// Form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 8;
}

function validatePasswordMatch(password, confirmPassword) {
    return password === confirmPassword;
}

// Input animation states
function setInputState(inputElement, state) {
    const wrapper = inputElement.closest('.input-wrapper');
    wrapper.classList.remove('loading', 'success', 'error');

    if (state) {
        wrapper.classList.add(state);
    }
}

// Real-time validation
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[type="email"], input[type="password"]');

    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            const value = this.value.trim();

            if (this.type === 'email' && value) {
                if (validateEmail(value)) {
                    setInputState(this, 'success');
                } else {
                    setInputState(this, 'error');
                }
            } else if (this.type === 'password' && value) {
                if (validatePassword(value)) {
                    setInputState(this, 'success');
                } else {
                    setInputState(this, 'error');
                }
            }
        });

        input.addEventListener('focus', function() {
            setInputState(this, 'loading');
        });
    });

    // Confirm password validation
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const passwordInput = document.getElementById('registerPassword');

    if (confirmPasswordInput && passwordInput) {
        confirmPasswordInput.addEventListener('blur', function() {
            const password = passwordInput.value;
            const confirmPassword = this.value;

            if (confirmPassword && password) {
                if (validatePasswordMatch(password, confirmPassword)) {
                    setInputState(this, 'success');
                } else {
                    setInputState(this, 'error');
                }
            }
        });
    }
});

// Loading button animation
function setButtonLoading(button, isLoading) {
    if (isLoading) {
        button.classList.add('loading');
        button.disabled = true;
    } else {
        button.classList.remove('loading');
        button.disabled = false;
    }
}

// Success animation
function showSuccessAnimation() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-animation';
    successDiv.innerHTML = '<div class="success-check"></div>';
    document.body.appendChild(successDiv);

    setTimeout(() => {
        document.body.removeChild(successDiv);
    }, 1500);
}

// Modal functions
function showModal() {
    document.getElementById('successModal').classList.add('show');
}

function closeModal() {
    document.getElementById('successModal').classList.remove('show');
}

// Form submissions
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const button = this.querySelector('button[type="submit"]');
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Validation
    if (!validateEmail(email)) {
        setInputState(document.getElementById('loginEmail'), 'error');
        return;
    }

    if (!validatePassword(password)) {
        setInputState(document.getElementById('loginPassword'), 'error');
        return;
    }

    // Simulate login
    setButtonLoading(button, true);

    setTimeout(() => {
        setButtonLoading(button, false);
        showSuccessAnimation();

        setTimeout(() => {
            alert('Connexion réussie ! Redirection vers le tableau de bord...');
            // window.location.href = 'dashboard.html';
        }, 1000);
    }, 2000);
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const button = this.querySelector('button[type="submit"]');
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const termsAccepted = document.getElementById('termsAccepted').checked;

    // Validation
    if (!firstName || !lastName) {
        alert('Veuillez remplir tous les champs obligatoires.');
        return;
    }

    if (!validateEmail(email)) {
        setInputState(document.getElementById('registerEmail'), 'error');
        return;
    }

    if (!validatePassword(password)) {
        setInputState(document.getElementById('registerPassword'), 'error');
        return;
    }

    if (!validatePasswordMatch(password, confirmPassword)) {
        setInputState(document.getElementById('confirmPassword'), 'error');
        return;
    }

    if (!termsAccepted) {
        alert('Veuillez accepter les conditions d\'utilisation.');
        return;
    }

    // Simulate registration
    setButtonLoading(button, true);

    setTimeout(() => {
        setButtonLoading(button, false);
        showSuccessAnimation();

        setTimeout(() => {
            showModal();
        }, 1000);
    }, 2500);
});

// Social login buttons
document.querySelectorAll('.social-btn').forEach(button => {
    button.addEventListener('click', function() {
        const provider = this.classList.contains('google-btn') ? 'Google' : 'Facebook';

        // Add loading state
        const originalContent = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connexion...';
        this.disabled = true;

        setTimeout(() => {
            this.innerHTML = originalContent;
            this.disabled = false;
            alert(`Connexion avec ${provider} simulée !`);
        }, 2000);
    });
});

// Smooth scrolling for mobile
document.addEventListener('DOMContentLoaded', function() {
    // Prevent zoom on double tap
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // Auto-focus first input
    setTimeout(() => {
        const firstInput = document.querySelector('.auth-card.active input');
        if (firstInput) {
            firstInput.focus();
        }
    }, 500);
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const activeCard = document.querySelector('.auth-card.active');
        if (activeCard) {
            const submitButton = activeCard.querySelector('button[type="submit"]');
            if (submitButton && !submitButton.disabled) {
                submitButton.click();
            }
        }
    }
});

// Add floating animation to elements
function addFloatingAnimation() {
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach(element => {
        element.style.animationDelay = Math.random() * 2 + 's';
        element.style.animationDuration = (Math.random() * 3 + 5) + 's';
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    addFloatingAnimation();

    // Animate initial form elements
    setTimeout(() => {
        const activeCard = document.querySelector('.auth-card.active');
        if (activeCard) {
            animateFormElements(activeCard);
        }
    }, 100);
});

// Performance optimizations
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

// Optimized scroll handler
const handleScroll = debounce(() => {
    const scrollTop = window.pageYOffset;
    const navbar = document.querySelector('.navbar');

    if (scrollTop > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
    }
}, 10);

window.addEventListener('scroll', handleScroll);

// Preload images
function preloadImages() {
    const images = ['images/logo.jpg'];
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

preloadImages();

// Error handling
window.addEventListener('error', function(e) {
    console.error('Une erreur s\'est produite:', e.error);
});

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
    // Clear any timeouts
    const timeouts = window.setTimeout(() => {}, 0);
    for (let i = 0; i < timeouts; i++) {
        window.clearTimeout(i);
    }
});