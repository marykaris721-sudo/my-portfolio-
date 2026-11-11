// ============================================
// PORTFOLIO — script.js
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. SMOOTH SCROLL (with sticky header offset)
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const id = link.getAttribute('href');
            if (id === '#') return;

            const target = document.querySelector(id);
            if (!target) return;

            e.preventDefault();
            const headerH = document.querySelector('.header').offsetHeight;
            const top = target.getBoundingClientRect().top + window.pageYOffset - headerH;

            window.scrollTo({ top, behavior: 'smooth' });
        });
    });


    // ==========================================
    // 2. ACTIVE NAV LINK ON SCROLL
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function setActiveLink() {
        const scrollY = window.pageYOffset;
        const headerH = document.querySelector('.header').offsetHeight;

        let current = '';
        sections.forEach(sec => {
            if (scrollY >= sec.offsetTop - headerH - 120) {
                current = sec.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    }

    window.addEventListener('scroll', setActiveLink);
    setActiveLink();


    // ==========================================
    // 3. SCROLL REVEAL ANIMATION
    // ==========================================
    const revealEls = document.querySelectorAll(
        '.skill, .project-card, .service-card, .timeline-item, .about-details'
    );

    revealEls.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealEls.forEach(el => observer.observe(el));


    // ==========================================
    // 4. STAGGERED DELAY FOR GRIDS
    // ==========================================
    [
        { sel: '.skills-grid',   item: '.skill' },
        { sel: '.projects-grid', item: '.project-card' },
        { sel: '.services-grid', item: '.service-card' }
    ].forEach(group => {
        const grid = document.querySelector(group.sel);
        if (!grid) return;

        grid.querySelectorAll(group.item).forEach((el, i) => {
            el.style.transitionDelay = `${i * 0.08}s`;
        });
    });


    // ==========================================
    // 5. HEADER SHADOW ON SCROLL
    // ==========================================
    const header = document.querySelector('.header');

    function toggleHeaderShadow() {
        header.classList.toggle('scrolled', window.scrollY > 40);
    }

    window.addEventListener('scroll', toggleHeaderShadow);
    toggleHeaderShadow();


    // ==========================================
    // 6. CONTACT FORM VALIDATION
    // ==========================================
    const form = document.querySelector('.contact-form form');

    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();

            const name    = form.querySelector('input[name="name"]').value.trim();
            const email   = form.querySelector('input[name="email"]').value.trim();
            const message = form.querySelector('textarea[name="message"]').value.trim();

            if (!name || !email || !message) {
                showFormMsg('Please fill in all fields.', 'error');
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showFormMsg('Please enter a valid email address.', 'error');
                return;
            }

            showFormMsg(`Thanks, ${name}! Your message has been sent.`, 'success');
            form.reset();
        });
    }

    function showFormMsg(text, type) {
        document.querySelector('.form-message')?.remove();

        const msg = document.createElement('div');
        msg.className = `form-message form-message--${type}`;
        msg.textContent = text;

        form.parentNode.insertBefore(msg, form.nextSibling);

        setTimeout(() => {
            msg.style.opacity = '0';
            setTimeout(() => msg.remove(), 300);
        }, 4500);
    }


    // ==========================================
    // 7. TYPING EFFECT ON HOME SUBTITLE
    // ==========================================
    const subtitle = document.querySelector('.home-subtitle');

    if (subtitle) {
        const roles = [
            'Aspiring Software Developer',
            'Web Developer',
            'IT Student',
            'Problem Solver'
        ];

        subtitle.textContent = '';
        subtitle.classList.add('typing');

        let roleIdx = 0;
        let charIdx = 0;
        let deleting = false;

        function type() {
            const word = roles[roleIdx];
            subtitle.textContent = word.substring(0, charIdx);

            let delay = deleting ? 45 : 95;

            if (!deleting && charIdx === word.length) {
                delay = 1600;
                deleting = true;
            } else if (deleting && charIdx === 0) {
                deleting = false;
                roleIdx = (roleIdx + 1) % roles.length;
                delay = 400;
            } else {
                charIdx += deleting ? -1 : 1;
            }

            setTimeout(type, delay);
        }

        setTimeout(type, 900);
    }


    // ==========================================
    // 8. BACK TO TOP BUTTON
    // ==========================================
    const topBtn = document.createElement('button');
    topBtn.className = 'back-to-top';
    topBtn.setAttribute('aria-label', 'Back to top');
    topBtn.innerHTML = '↑';
    document.body.appendChild(topBtn);

    topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        topBtn.classList.toggle('show', window.scrollY > 400);
    });


    // ==========================================
    // 9. DYNAMIC YEAR IN FOOTER
    // ==========================================
    const footerText = document.querySelector('.footer p');
    if (footerText) {
        footerText.textContent = `© ${new Date().getFullYear()} Mary Wanjiru. All Rights Reserved.`;
    }

});