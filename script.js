// ===== Language Toggle =====
let currentLang = 'en';

function toggleLang() {
    currentLang = currentLang === 'en' ? 'fa' : 'en';
    const html = document.documentElement;

    if (currentLang === 'fa') {
        html.setAttribute('lang', 'fa');
        html.setAttribute('dir', 'rtl');
        document.getElementById('langBtn').textContent = 'English / EN';
        document.title = 'نوید شهبازی — رزومه';
    } else {
        html.setAttribute('lang', 'en');
        html.setAttribute('dir', 'ltr');
        document.getElementById('langBtn').textContent = 'فارسی / FA';
        document.title = 'Navid Shahbazi — Resume';
    }

    // Update all translatable elements
    document.querySelectorAll('[data-en]').forEach(el => {
        const text = el.getAttribute(`data-${currentLang}`);
        if (text) {
            if (el.children.length && text.includes('<')) {
                el.innerHTML = text;
            } else if (el.hasAttribute('data-en') && el.innerHTML.includes('<span')) {
                el.innerHTML = text;
            } else {
                el.textContent = text;
            }
        }
    });

    // Re-trigger skill bar animation
    animateSkillBars();
}

// ===== Mobile Sidebar Toggle =====
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    const hamburger = document.querySelector('.hamburger');

    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
    hamburger.classList.toggle('active');
}

// ===== Skill Bar Animation =====
function animateSkillBars() {
    const bars = document.querySelectorAll('.skill-bar-fill');
    bars.forEach(bar => {
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = bar.getAttribute('data-width') + '%';
        }, 100);
    });
}

// ===== Intersection Observer for Skill Bars =====
const skillSection = document.querySelectorAll('.skill-bar-fill');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.getAttribute('data-width') + '%';
        }
    });
}, { threshold: 0.3 });

skillSection.forEach(bar => observer.observe(bar));

// ===== Initial animation on load =====
window.addEventListener('load', () => {
    setTimeout(animateSkillBars, 600);
});

// ===== Close sidebar on ESC =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const sidebar = document.getElementById('sidebar');
        if (sidebar.classList.contains('open')) {
            toggleSidebar();
        }
    }
});