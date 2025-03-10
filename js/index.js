// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const languageToggle = document.getElementById('language-toggle');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navMenu = document.getElementById('nav-menu');
const dropdowns = document.querySelectorAll('.dropdown');
const logoImg = document.getElementById('logo-img');
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

// ===== Theme Toggle Functionality =====
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    
    // Update theme icon
    const themeIcon = themeToggle.querySelector('.theme-icon');
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    themeIcon.textContent = isDarkMode ? '🌙' : '☀️';
    
    // Save preference
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

// ===== Language Toggle Functionality =====
function changeLanguage(lang) {
    const langText = languageToggle.querySelector('.lang-text');
    langText.textContent = lang.toUpperCase();
    
    // Update all elements with data-en and data-es attributes
    document.querySelectorAll('[data-en][data-es]').forEach(element => {
        element.textContent = element.getAttribute(`data-${lang}`);
    });
    
    // Save preference
    localStorage.setItem('language', lang);
}

// ===== Mobile Menu Functionality =====
function toggleMobileMenu() {
    mobileMenuToggle.classList.toggle('menu-open');
    navMenu.classList.toggle('active');
}

function toggleDropdown(dropdown, event) {
    // Only for mobile view
    if (window.innerWidth <= 768) {
        event.preventDefault();
        event.stopPropagation();
        
        // Close other dropdowns
        dropdowns.forEach(d => {
            if (d !== dropdown) d.classList.remove('active');
        });
        
        dropdown.classList.toggle('active');
    }
}

function closeMobileMenu() {
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('menu-open');
        dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
    }
}

// ===== Custom Cursor Functionality =====
function updateCursor(e) {
    if (!cursorDot || !cursorOutline) return;
    
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, {duration: 500, fill: "forwards"});
}

function handleCursorForInteractiveElements() {
    const interactiveElements = document.querySelectorAll('a, button, .dropdown-toggle, .project-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (cursorOutline && cursorDot) {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.borderColor = 'var(--color-secondary)';
                cursorDot.style.backgroundColor = 'var(--color-secondary)';
            }
        });
        
        element.addEventListener('mouseleave', () => {
            if (cursorOutline && cursorDot) {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.borderColor = 'white';
                cursorDot.style.backgroundColor = 'white';
            }
        });
    });
}

// ===== Event Listeners =====
document.addEventListener('DOMContentLoaded', () => {
    // Apply saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.querySelector('.theme-icon').textContent = '🌙';
    }
    
    // Apply saved language
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'es') {
        changeLanguage('es');
    }
    
    // Check if device supports hover
    const supportsHover = window.matchMedia('(hover: hover)').matches;
    if (!supportsHover && cursorDot && cursorOutline) {
        document.body.style.cursor = 'auto';
        cursorDot.style.display = 'none';
        cursorOutline.style.display = 'none';
    } else {
        handleCursorForInteractiveElements();
    }
});

// Theme toggle
themeToggle.addEventListener('click', toggleTheme);

// Language toggle
languageToggle.addEventListener('click', () => {
    const currentLang = languageToggle.querySelector('.lang-text').textContent;
    changeLanguage(currentLang === 'EN' ? 'es' : 'en');
});

// Mobile menu toggle
mobileMenuToggle.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMobileMenu();
});

// Dropdown toggles
dropdowns.forEach(dropdown => {
    const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
    dropdownToggle.addEventListener('click', (e) => toggleDropdown(dropdown, e));
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        const isNavMenuClick = navMenu.contains(e.target);
        const isMobileMenuToggleClick = mobileMenuToggle.contains(e.target);
        
        if (!isNavMenuClick && !isMobileMenuToggleClick) {
            closeMobileMenu();
        }
    }
});

// Close mobile menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Custom cursor
window.addEventListener('mousemove', updateCursor);

// Show/hide cursor on mouse enter/leave
document.addEventListener('mouseenter', () => {
    if (cursorDot && cursorOutline) {
        cursorDot.style.display = 'block';
        cursorOutline.style.display = 'block';
    }
});

document.addEventListener('mouseleave', () => {
    if (cursorDot && cursorOutline) {
        cursorDot.style.display = 'none';
        cursorOutline.style.display = 'none';
    }
});