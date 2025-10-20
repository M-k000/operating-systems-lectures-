// Современный JavaScript с улучшенной функциональностью
class ModernWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.createAnimatedBackground();
        this.initSmoothScrolling();
        this.initSearch();
        this.initScrollEffects();
        this.initThemeToggle();
        this.initAnimations();
        this.initStatistics();
        this.addLoadingAnimation();
    }

    // Создание анимированного фона с частицами
    createAnimatedBackground() {
        const bgContainer = document.createElement('div');
        bgContainer.className = 'animated-bg';
        
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'bg-particle';
            
            const size = Math.random() * 100 + 50;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const animationDelay = Math.random() * 20;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${left}%`;
            particle.style.top = `${top}%`;
            particle.style.animationDelay = `${animationDelay}s`;
            
            bgContainer.appendChild(particle);
        }
        
        document.body.appendChild(bgContainer);
    }

    // Плавная прокрутка
    initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Закрываем мобильное меню если открыто
                    this.closeMobileMenu();
                }
            });
        });
    }

    // Поиск по контенту
    initSearch() {
        const searchInput = document.querySelector('.search-input');
        const searchResults = document.querySelector('.search-results');
        
        if (!searchInput) return;
        
        let searchTimeout;
        
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.performSearch(e.target.value);
            }, 300);
        });
        
        searchInput.addEventListener('focus', () => {
            if (searchInput.value) {
                this.performSearch(searchInput.value);
            }
        });
        
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                searchResults.style.display = 'none';
            }
        });
    }

    performSearch(query) {
        const searchResults = document.querySelector('.search-results');
        if (!query.trim()) {
            searchResults.style.display = 'none';
            return;
        }
        
        const results = this.searchContent(query);
        this.displaySearchResults(results, searchResults);
    }

    searchContent(query) {
        const results = [];
        const contentElements = document.querySelectorAll('.lecture-card, .lecture-content, .section');
        const lowerQuery = query.toLowerCase();
        
        contentElements.forEach(element => {
            const text = element.textContent.toLowerCase();
            if (text.includes(lowerQuery)) {
                const title = element.querySelector('h2, h3, h4')?.textContent || 'Без названия';
                const content = element.textContent.substring(0, 150) + '...';
                const link = element.querySelector('a')?.href || '#';
                
                results.push({
                    title,
                    content,
                    link,
                    element
                });
            }
        });
        
        return results.slice(0, 10); // Ограничиваем 10 результатами
    }

    displaySearchResults(results, container) {
        container.innerHTML = '';
        
        if (results.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'search-result-item';
            noResults.textContent = 'Ничего не найдено';
            container.appendChild(noResults);
        } else {
            results.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.innerHTML = `
                    <strong>${result.title}</strong>
                    <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.5rem;">${result.content}</p>
                `;
                
                resultItem.addEventListener('click', () => {
                    window.location.href = result.link;
                });
                
                container.appendChild(resultItem);
            });
        }
        
        container.style.display = 'block';
    }

    // Эффекты при скролле
    initScrollEffects() {
        const header = document.querySelector('header');
        
        window.addEventListener('scroll', () => {
            // Эффект хедера
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Параллакс эффект для частиц
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.bg-particle');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                element.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
            });
            
            // Анимация появления элементов
            this.animateOnScroll();
        });
    }

    // Переключение темы
    initThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (!themeToggle) return;
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            themeToggle.innerHTML = isLight ? '🌙' : '☀️';
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
        
        // Восстанавливаем тему
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            themeToggle.innerHTML = '🌙';
        }
    }

    // Анимации
    initAnimations() {
        this.animateOnScroll();
        
        // Анимация карточек при наведении
        const cards = document.querySelectorAll('.lecture-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    animateOnScroll() {
        const elements = document.querySelectorAll('.section, .lecture-card, .stat-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Анимация статистики
    initStatistics() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        statNumbers.forEach(stat => observer.observe(stat));
    }

    animateCounter(element) {
        const target = parseInt(element.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }

    // Анимация загрузки
    addLoadingAnimation() {
        document.body.classList.add('loading');
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.classList.remove('loading');
                document.body.classList.add('loaded');
            }, 500);
        });
    }

    // Закрытие мобильного меню
    closeMobileMenu() {
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
        }
    }
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    new ModernWebsite();
});

// Дополнительные утилиты
class WebsiteUtils {
    static debounce(func, wait) {
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

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
}

// Service Worker для оффлайн-режима (опционально)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
