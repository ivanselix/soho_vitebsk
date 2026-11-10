// ===== ШАПКА ПРИ СКРОЛЛЕ =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== МОБИЛЬНОЕ МЕНЮ =====
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('open');
});

document.querySelectorAll('.nav__link, .nav .btn--header').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        nav.classList.remove('open');
    });
});

// ===== ФОРМА БРОНИРОВАНИЯ (Открывает WhatsApp) =====
const bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const guests = document.getElementById('guests').value;
        const zone = document.getElementById('zone').value;

        const text = `Здравствуйте! Хочу забронировать столик в SOHO.%0A%0AИмя: ${name}%0AТелефон: ${phone}%0AДата: ${date}%0AВремя: ${time}%0AГостей: ${guests}%0AЗона: ${zone}%0A%0AЖду подтверждения!`;
        const phoneNumber = '375445212212'; 

        window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
        bookingForm.reset();
        alert('Спасибо! Сейчас откроется WhatsApp для отправки заявки.');
    });
}

// ===== КНОПКА НАВЕРХ =====
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== ВКЛАДКИ МЕНЮ =====
const menuTabs = document.querySelectorAll('.menu-tab');
const menuPanes = document.querySelectorAll('.menu-pane');

menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        menuTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        menuPanes.forEach(pane => pane.classList.remove('active'));
        const targetId = tab.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});

// ===== ГОД В ПОДВАЛЕ =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== АНИМАЦИЯ ПОЯВЛЕНИЯ =====
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.dish, .about__text, .about__image, .contact-item, .zone-card, .kitchen__item, .feature-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    observer.observe(el);
});