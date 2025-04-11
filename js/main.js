document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    const header = document.querySelector('.header'); // Select the header

    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');

            // Optional: Add a class to the body to prevent scrolling when menu is open
            document.body.classList.toggle('no-scroll');
        });
    }

    // Add styles for the active mobile menu in CSS
    // We need to add corresponding CSS rules for .nav.active, .mobile-menu-toggle.active, and body.no-scroll

    // Optional: Close mobile menu when a link is clicked
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    // Optional: Hide header on scroll down, show on scroll up
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
            // Scroll Down
            header.style.top = `-${header.offsetHeight}px`;
        } else {
            // Scroll Up
            header.style.top = '0';
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    }, false);

    // Add FAQ toggle functionality later
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');

        if (question && answer && toggle) {
            question.addEventListener('click', () => {
                const isActive = item.classList.toggle('active');
                answer.style.maxHeight = isActive ? answer.scrollHeight + "px" : null;
                toggle.textContent = isActive ? '-' : '+';
            });
        }
    });

});
