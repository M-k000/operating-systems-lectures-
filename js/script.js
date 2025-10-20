// Упрощенный и эффективный JavaScript для поиска
class SearchManager {
    constructor() {
        this.searchData = [];
        this.init();
    }

    async init() {
        await this.loadSearchData();
        this.setupSearch();
        this.setupSmoothScroll();
    }

    // Загрузка данных для поиска
    async loadSearchData() {
        // Собираем данные со всех страниц
        this.searchData = [
            {
                title: "Лекция 2: Файловая система и ввод-вывод",
                content: "Организация хранения данных, механизмы ввода-вывода и архивация данных в операционных системах",
                url: "lectures/lecture-2.html",
                type: "lecture"
            },
            {
                title: "Лекция 3: Языки взаимодействия с ОС",
                content: "Программные интерфейсы, виды интерфейсов и методы взаимодействия пользователя с операционной системой",
                url: "lectures/lecture-3.html",
                type: "lecture"
            },
            {
                title: "Лекция 4: Структура операционных систем",
                content: "Виды ядер ОС, микроядерная архитектура и клиент-серверная модель. Сравнение монолитных систем",
                url: "lectures/lecture-4.html",
                type: "lecture"
            },
            {
                title: "Лекция 5: Операционное окружение",
                content: "Сервисные программы, базовая и расширенная машины, режимы работы процессора",
                url: "lectures/lecture-5.html",
                type: "lecture"
            },
            {
                title: "Лекция 6: Микроядерная архитектура",
                content: "Глубокое погружение в микроядерную архитектуру, преимущества и недостатки",
                url: "lectures/lecture-6.html",
                type: "lecture"
            },
            {
                title: "Лекция 10: Понятие прерывания",
                content: "Классы прерываний, последовательность обработки, рабочая область прерываний",
                url: "lectures/lecture-10.html",
                type: "lecture"
            },
            {
                title: "УП.05: Сбор исходных данных",
                content: "Методы сбора и анализа исходных данных для разработки проектной документации",
                url: "practicals/up05-data-collection.html",
                type: "practical"
            },
            // Ответы на вопросы
            {
                title: "Ответы: Файловая система и ввод-вывод",
                content: "Основные функции файловой системы, различия блоковых и потоковых устройств, DMA",
                url: "lectures/lecture-2-answers.html",
                type: "answers"
            },
            {
                title: "Ответы: Языки взаимодействия с ОС",
                content: "Отличия текстовых и графических интерфейсов, назначение API, виды интерфейсов",
                url: "lectures/lecture-3-answers.html",
                type: "answers"
            },
            {
                title: "Ответы: Структура операционных систем",
                content: "Основные компоненты ОС, отличия монолитного ядра от микроядра, преимущества микроядерной архитектуры",
                url: "lectures/lecture-4-answers.html",
                type: "answers"
            },
            {
                title: "Ответы: Операционное окружение",
                content: "Состав операционного окружения, типы сервисных программ, различия базовой и расширенной машины",
                url: "lectures/lecture-5-answers.html",
                type: "answers"
            },
            {
                title: "Ответы: Микроядерная архитектура",
                content: "Функции микроядра, клиент-серверная модель, механизмы взаимодействия, примеры ОС",
                url: "lectures/lecture-6-answers.html",
                type: "answers"
            },
            {
                title: "Ответы: Понятие прерывания",
                content: "Определение прерывания, последовательность обработки, классы прерываний, рабочая область",
                url: "lectures/lecture-10-answers.html",
                type: "answers"
            }
        ];
    }

    // Настройка поиска
    setupSearch() {
        const searchInput = document.querySelector('.search-input');
        const searchResults = document.querySelector('.search-results');
        
        if (!searchInput || !searchResults) return;

        let searchTimeout;

        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.handleSearch(e.target.value, searchResults);
            }, 200);
        });

        searchInput.addEventListener('focus', () => {
            if (searchInput.value.trim()) {
                this.handleSearch(searchInput.value, searchResults);
            }
        });

        // Закрытие результатов при клике вне области поиска
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                searchResults.style.display = 'none';
            }
        });

        // Обработка клавиш
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchResults.style.display = 'none';
                searchInput.blur();
            }
        });
    }

    // Обработка поискового запроса
    handleSearch(query, resultsContainer) {
        const trimmedQuery = query.trim().toLowerCase();
        
        if (!trimmedQuery) {
            resultsContainer.style.display = 'none';
            return;
        }

        const results = this.searchData.filter(item => 
            item.title.toLowerCase().includes(trimmedQuery) ||
            item.content.toLowerCase().includes(trimmedQuery)
        );

        this.displayResults(results, resultsContainer, trimmedQuery);
    }

    // Отображение результатов
    displayResults(results, container, query) {
        container.innerHTML = '';

        if (results.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.textContent = `Ничего не найдено для "${query}"`;
            container.appendChild(noResults);
        } else {
            results.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                
                // Подсветка совпадений
                const highlightedTitle = this.highlightText(result.title, query);
                const highlightedContent = this.highlightText(result.content, query);
                
                resultItem.innerHTML = `
                    <div class="search-result-title">${highlightedTitle}</div>
                    <div class="search-result-content">${highlightedContent}</div>
                `;
                
                resultItem.addEventListener('click', () => {
                    window.location.href = result.url;
                });
                
                container.appendChild(resultItem);
            });
        }
        
        container.style.display = 'block';
    }

    // Подсветка текста в результатах
    highlightText(text, query) {
        if (!query) return text;
        
        const regex = new RegExp(`(${this.escapeRegex(query)})`, 'gi');
        return text.replace(regex, '<mark style="background: var(--primary); color: var(--bg-dark); padding: 0.1rem 0.2rem; border-radius: 3px;">$1</mark>');
    }

    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // Плавная прокрутка
    setupSmoothScroll() {
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
                }
            });
        });
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new SearchManager();
    
    // Добавляем небольшую анимацию для карточек
    const cards = document.querySelectorAll('.lecture-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Утилита для debounce
function debounce(func, wait) {
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
