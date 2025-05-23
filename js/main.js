document.addEventListener('DOMContentLoaded', () => {
    // ========== LOADING ANIMATION ==========
    const createLoadingScreen = () => {
        const loading = document.createElement('div');
        loading.className = 'loading';
        loading.innerHTML = '<div class="loading-spinner"></div>';
        document.body.appendChild(loading);
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                loading.classList.add('fade-out');
                setTimeout(() => loading.remove(), 500);
            }, 800);
        });
    };
    createLoadingScreen();

    // ========== SMOOTH SCROLL ==========
    const smoothScroll = (target) => {
        const element = document.querySelector(target);
        if (element) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            smoothScroll(this.getAttribute('href'));
        });
    });

    // ========== MOBILE MENU ==========
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');

    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', () => {
            nav.classList.toggle('open');
            mobileMenuToggle.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target) && nav.classList.contains('open')) {
                nav.classList.remove('open');
                mobileMenuToggle.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });

        // Close mobile menu when a link is clicked
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('open');
                mobileMenuToggle.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // ========== HEADER SCROLL EFFECT ==========
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.9)';
            header.style.backdropFilter = 'blur(10px)';
        }

        // Hide/show header on scroll
        if (currentScroll > lastScroll && currentScroll > 300) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // ========== SCROLL REVEAL ANIMATIONS ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Stagger animations for grid items
                if (entry.target.closest('.problem-grid, .service-grid')) {
                    const items = entry.target.parentElement.children;
                    Array.from(items).forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('in-view');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Add data-scroll attribute to elements
    const animateElements = [
        '.section-title',
        '.problem-item',
        '.service-item',
        '.price-card',
        '.faq-item',
        '.hero-content'
    ];

    animateElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.setAttribute('data-scroll', '');
            scrollObserver.observe(element);
        });
    });

    // ========== FAQ ACCORDION ==========
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');

        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherAnswer) {
                            otherAnswer.style.maxHeight = null;
                        }
                    }
                });

                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                    answer.style.maxHeight = null;
                } else {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        }
    });

    // ========== PARALLAX EFFECT ==========
    const parallaxElements = document.querySelectorAll('.hero::before');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ========== MOUSE MOVE EFFECT ==========
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent) {
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const xPos = (clientX / innerWidth - 0.5) * 20;
            const yPos = (clientY / innerHeight - 0.5) * 20;
            
            heroContent.style.transform = `translate(${xPos}px, ${yPos}px)`;
        });
    }

    // ========== TYPING EFFECT ==========
    const typeWriter = (element, text, speed = 50) => {
        let i = 0;
        element.innerHTML = '';
        
        const type = () => {
            if (i < text.length) {
                if (text.charAt(i) === '<') {
                    // Handle HTML tags
                    let tag = '';
                    while (text.charAt(i) !== '>' && i < text.length) {
                        tag += text.charAt(i);
                        i++;
                    }
                    tag += '>';
                    element.innerHTML += tag;
                    i++;
                } else {
                    element.innerHTML += text.charAt(i);
                    i++;
                }
                setTimeout(type, speed);
            }
        };
        
        type();
    };

    // Apply typing effect to hero title
    const heroTitle = document.querySelector('.hero h2[data-typing]');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        setTimeout(() => {
            typeWriter(heroTitle, text);
        }, 1000);
    }

    // ========== COUNTER ANIMATION ==========
    const animateCounter = (element, target, duration = 2000, isDecimal = false) => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                if (isDecimal) {
                    element.textContent = current.toFixed(1);
                } else {
                    element.textContent = Math.floor(current).toLocaleString();
                }
                requestAnimationFrame(updateCounter);
            } else {
                if (isDecimal) {
                    element.textContent = target.toFixed(1);
                } else {
                    element.textContent = target.toLocaleString();
                }
            }
        };
        
        updateCounter();
    };

    // Animate counters when they come into view
    const counters = document.querySelectorAll('[data-counter]');
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-counter'));
        const isDecimal = target % 1 !== 0;
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target, target, 2000, isDecimal);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counterObserver.observe(counter);
    });

    // ========== PARTICLE BACKGROUND ==========
    const createParticles = () => {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
        `;
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: rgba(0, 102, 255, ${Math.random() * 0.5 + 0.1});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 10 + 10}s linear infinite;
            `;
            particlesContainer.appendChild(particle);
        }
        
        document.body.appendChild(particlesContainer);
    };

    // Add floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            from {
                transform: translateY(100vh) translateX(0);
            }
            to {
                transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
            }
        }
        
        body.no-scroll {
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);

    // Initialize particles
    if (window.innerWidth > 768) {
        createParticles();
    }

    // ========== PERFORMANCE OPTIMIZATION ==========
    // Debounce function for scroll events
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    // Optimize scroll events
    const optimizedScroll = debounce(() => {
        // Scroll-based animations
    }, 10);

    window.addEventListener('scroll', optimizedScroll);

    // ========== PRELOAD IMAGES ==========
    const preloadImages = () => {
        const images = [
            '../images/ジナラシ.png',
            '../images/ジナラシ_ロゴ.png',
            '../images/first_view.png',
            '../images/提供フロー.png'
        ];

        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    };

    preloadImages();
});
