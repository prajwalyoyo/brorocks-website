// === NAVBAR SCROLL ===
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// === HAMBURGER MENU ===
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// === SCROLL REVEAL ===
const revealElements = document.querySelectorAll('.app-card, .app-featured, .pillar, .value-item, .open-role, .contact-card, .studio-inner, .careers-inner');

revealElements.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, 80);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => observer.observe(el));

// === COUNTER ANIMATION ===
function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1200;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

const counters = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

// === SMOOTH ACTIVE NAV HIGHLIGHT ===
const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        const top = sec.offsetTop - 120;
        if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    links.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--text)';
        }
    });
});

// === PHONE MOCKUP ANIMATION ===
const topOption = document.querySelector('.top-option');
const botOption = document.querySelector('.bot-option');
const topPct = document.querySelector('.top-option .pct');
const botPct = document.querySelector('.bot-option .pct');

if (topOption && botOption) {
    const debates = [
        { a: 'Coffee ☕', aPct: '63%', b: '🍵 Tea', bPct: '37%' },
        { a: 'Nike 👟', aPct: '71%', b: '🏃 Adidas', bPct: '29%' },
        { a: 'Pizza 🍕', aPct: '55%', b: '🍔 Burger', bPct: '45%' },
        { a: 'Movies 🎬', aPct: '48%', b: '🎮 Gaming', bPct: '52%' },
    ];
    let idx = 0;

    function cycleDebate() {
        idx = (idx + 1) % debates.length;
        const d = debates[idx];
        topOption.querySelector('span:first-child').textContent = d.a;
        topPct.textContent = d.aPct;
        botOption.querySelector('span:first-child').textContent = d.b;
        botPct.textContent = d.bPct;
    }
    setInterval(cycleDebate, 2500);
}
