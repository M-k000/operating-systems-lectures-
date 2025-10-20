// Simple and reliable search functionality
class SimpleSearch {
    constructor() {
        this.searchData = [];
        this.init();
    }

    init() {
        this.loadSearchData();
        this.setupSearch();
        this.setupNavigation();
    }

    loadSearchData() {
        this.searchData = [
            // Lectures
            {
                title: "Лекция 2: Файловая система и ввод-вывод",
                content: "Файловая система и ввод-вывод информации. Организация хранения данных. Архивация данных.",
                url: "lectures/lecture-2.html",
                type: "lecture"
            },
            {
                title: "Лекция 3: Языки взаимодействия с ОС",
                content: "Языки взаимодействия пользователя с операционной системой. Понятие программного интерфейса.",
                url: "lectures/lecture-3.html",
                type: "lecture"
            },
            {
                title: "Лекция 4: Структура операционных систем",
                content: "Структура операционных систем. Виды ядра операционных систем. Микроядерная архитектура.",
                url: "lectures/lecture-4.html",
                type: "lecture"
            },
            {
                title: "Лекция 5: Операционное окружение",
                content: "Операционное окружение, сервисные программы, базовая и расширенная машины, режимы работы.",
                url: "lectures/lecture-5.html",
                type: "lecture"
            },
            {
                title: "Лекция 6: Микроядерная архитектура",
                content: "Микроядерная архитектура (модел клиент-сервер).",
                url: "lectures/lecture-6.html",
                type: "lecture"
            },
            {
                title: "Лекция 10: Понятие прерывания",
                content: "Понятие прерывания. Последовательность действий при обработке прерываний. Классы прерываний.",
                url: "lectures/lecture-10.html",
                type: "lecture"
            },
            // Practical works
            {
                title: "УП.05: Сбор исходных данных",
                content: "Сбор исходных данных для разработки проектной документации на информационную систему.",
                url: "practicals/up05-data-collection.html",
                type: "practical"
            }
        ];
    }

    setupSearch() {
        const searchInput = document.querySelector('.search-input');
        const searchResults = document.querySelector('.search-results');

        if (!searchInput || !searchResults) return;

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            
            if (query.length < 2) {
                searchResults.style.display = 'none';
                return;
            }

            const results = this.searchData.filter(item => 
                item.title.toLowerCase().includes(query) || 
                item.content.toLowerCase().includes(query)
            );

            this.displayResults(results, searchResults);
        });

        // Hide results when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    }

    displayResults(results, container) {
        if (results.length === 0) {
            container.innerHTML = '<div class="search-result-item">Ничего не найдено</div>';
            container.style.display = 'block';
            return;
        }

        container.innerHTML = results.map(item => `
            <div class="search-result-item" data-url="${item.url}">
                <div class="result-title">${item.title}</div>
                <div class="result-content">${item.content.substring(0, 100)}...</div>
                <div class="result-type">${item.type === 'lecture' ? 'Лекция' : 'Практика'}</div>
            </div>
        `).join('');

        container.style.display = 'block';

        // Add click handlers
        container.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                window.location.href = item.dataset.url;
            });
        });
    }

    setupNavigation() {
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

        // Add animation to list items on scroll
        this.setupScrollAnimations();
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            });
        }, observerOptions);

        // Observe list items
        document.querySelectorAll('.list-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(item);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SimpleSearch();
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.list-item, .card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Add loading animation
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.style.opacity = '0';
        mainContent.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            mainContent.style.opacity = '1';
        }, 100);
    }
});
