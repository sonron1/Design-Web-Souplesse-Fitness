// Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
        }
    });
}, observerOptions);

// Observe all sections and cards
document.addEventListener('DOMContentLoaded', () => {
    const elementsToObserve = document.querySelectorAll('.service-card, .trainer-card, .gallery-item, .contact-item, .stat-item, .pricing-card');
    elementsToObserve.forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });
});

// Contact form submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const message = this.querySelector('textarea').value;

    // Simple validation
    if (!name || !email || !message) {
        alert('Veuillez remplir tous les champs obligatoires.');
        return;
    }

    // Simulate form submission
    const button = this.querySelector('button');
    const originalText = button.textContent;
    button.textContent = 'Envoi en cours...';
    button.disabled = true;

    setTimeout(() => {
        alert('Merci pour votre message ! Nous vous recontacterons bientôt.');
        this.reset();
        button.textContent = originalText;
        button.disabled = false;
    }, 2000);
});

// Gallery lightbox effect
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.innerHTML = `
            <div class="lightbox-content">
                <img src="${img.src}" alt="${img.alt}">
                <span class="close-lightbox">&times;</span>
            </div>
        `;

        document.body.appendChild(overlay);

        // Close lightbox
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay || e.target.classList.contains('close-lightbox')) {
                document.body.removeChild(overlay);
            }
        });
    });
});

// Add lightbox styles dynamically
const lightboxStyles = `
    .lightbox-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        animation: fadeIn 0.3s ease;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .lightbox-content img {
        width: 100%;
        height: auto;
        border-radius: 10px;
    }
    
    .close-lightbox {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 30px;
        cursor: pointer;
        background: var(--primary-color);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--secondary-color);
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = lightboxStyles;
document.head.appendChild(styleSheet);

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Animate counters when in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statItems = entry.target.querySelectorAll('.stat-item h3');
            statItems.forEach(item => {
                const target = parseInt(item.textContent);
                animateCounter(item, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            if (text.charAt(i) === '<') {
                let tagEnd = text.indexOf('>', i);
                element.innerHTML += text.substring(i, tagEnd + 1);
                i = tagEnd + 1;
            } else {
                element.innerHTML += text.charAt(i);
                i++;
            }
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize typing effect
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
});

// Leaflet Map initialization
function initMap() {
    // Coordonnées de Paris (exemple)
    const lat = 48.8566;
    const lng = 2.3522;

    // Créer la carte
    const map = L.map('map').setView([lat, lng], 15);

    // Ajouter les tuiles OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Créer une icône personnalisée
    const customIcon = L.divIcon({
        html: `
            <div style="
                background: #FFD700;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                border: 2px solid #000;
            ">💪</div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -15]
    });

    // Ajouter un marqueur
    const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

    // Ajouter une popup
    marker.bindPopup(`
        <div style="font-family: 'DM Sans', sans-serif; text-align: center; min-width: 200px;">
            <h3 style="color: #000; margin: 0 0 10px 0; font-size: 16px;">🏋️ Souplesse Fitness</h3>
            <p style="margin: 5px 0; color: #666; font-size: 14px;">📍 123 Rue de la Forme</p>
            <p style="margin: 5px 0; color: #666; font-size: 14px;">75000 Paris, France</p>
            <p style="margin: 5px 0; color: #666; font-size: 14px;">📞 +33 1 23 45 67 89</p>
            <p style="margin: 10px 0 5px 0; color: #666; font-size: 12px;">🕐 Lun-Ven: 6h-22h | Sam-Dim: 8h-20h</p>
        </div>
    `).openPopup();
}

// Fallback si Leaflet n'est pas chargé
function createFallbackMap() {
    const mapElement = document.getElementById('map');
    if (mapElement) {
        mapElement.innerHTML = `
            <div style="
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100%;
                background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
                color: #000;
                font-family: 'DM Sans', sans-serif;
                text-align: center;
                padding: 2rem;
                position: relative;
            ">
                <div style="
                    background: rgba(255, 255, 255, 0.9);
                    padding: 2rem;
                    border-radius: 20px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                    max-width: 300px;
                ">
                    <i class="fas fa-map-marked-alt" style="font-size: 3rem; color: #FFD700; margin-bottom: 1rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);"></i>
                    <h3 style="margin: 0 0 1rem 0; color: #000; font-size: 1.5rem;">📍 Notre Localisation</h3>
                    <p style="margin: 0.5rem 0; color: #333; font-weight: 600;">🏋️ Souplesse Fitness</p>
                    <p style="margin: 0.5rem 0; color: #666;">123 Rue de la Forme<br>75000 Paris, France</p>
                    <p style="margin: 1rem 0; color: #666; font-size: 0.9rem;">📞 +33 1 23 45 67 89</p>
                    <div style="margin-top: 1.5rem;">
                        <a href="https://www.google.com/maps/search/123+Rue+de+la+Forme+75000+Paris+France" 
                           target="_blank" 
                           style="
                               display: inline-flex;
                               align-items: center;
                               gap: 8px;
                               background: #000;
                               color: #FFD700;
                               padding: 10px 20px;
                               border-radius: 25px;
                               text-decoration: none;
                               font-weight: 600;
                               font-size: 0.9rem;
                               transition: all 0.3s ease;
                           "
                           onmouseover="this.style.background='#333'; this.style.transform='translateY(-2px)'"
                           onmouseout="this.style.background='#000'; this.style.transform='translateY(0)'"
                        >
                            <i class="fas fa-external-link-alt"></i>
                            Ouvrir dans Google Maps
                        </a>
                    </div>
                </div>
                
                <!-- Éléments décoratifs -->
                <div style="
                    position: absolute;
                    top: 20px;
                    left: 20px;
                    font-size: 2rem;
                    opacity: 0.3;
                    animation: bounce 2s infinite;
                ">🏃‍♂️</div>
                <div style="
                    position: absolute;
                    bottom: 20px;
                    right: 20px;
                    font-size: 2rem;
                    opacity: 0.3;
                    animation: bounce 2s infinite 1s;
                ">🚴‍♀️</div>
                <div style="
                    position: absolute;
                    top: 50%;
                    left: 20px;
                    font-size: 1.5rem;
                    opacity: 0.2;
                    animation: bounce 2s infinite 0.5s;
                ">🏋️‍♂️</div>
                <div style="
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    font-size: 1.5rem;
                    opacity: 0.2;
                    animation: bounce 2s infinite 1.5s;
                ">🤸‍♀️</div>
            </div>
            
            <style>
                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% {
                        transform: translateY(0);
                    }
                    40% {
                        transform: translateY(-10px);
                    }
                    60% {
                        transform: translateY(-5px);
                    }
                }
            </style>
        `;
    }
}

// Initialiser la carte
document.addEventListener('DOMContentLoaded', () => {
    // Attendre un peu pour que Leaflet soit chargé
    setTimeout(() => {
        if (typeof L !== 'undefined') {
            initMap();
        } else {
            createFallbackMap();
        }
    }, 500);
});

// Pricing cards animation
const pricingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.pricing-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.animation = 'fadeInUp 0.6s ease-out forwards';
                }, index * 200);
            });
        }
    });
}, { threshold: 0.2 });

document.addEventListener('DOMContentLoaded', () => {
    const pricingSection = document.querySelector('.pricing-grid');
    if (pricingSection) {
        pricingObserver.observe(pricingSection);
    }
});