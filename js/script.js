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
                content: "Микроядерная архитектура (модель клиент-сервер).",
                url: "lectures/lecture-6.html",
                type: "lecture"
            },
            {
                title: "Лекция 10: Понятие прерывания",
                content: "Понятие прерывания. Последовательность действий при обработке прерываний. Классы прерываний.",
                url: "lectures/lecture-10.html",
                type: "lecture"
            },
            
            // Answers
            {
                title: "Ответы: Лекция 2",
                content: "Ответы на вопросы по файловой системе и вводу-выводу",
                url: "lectures/lecture-2-answers.html",
                type: "answers"
            },
            {
                title: "Ответы: Лекция 3",
                content: "Ответы на вопросы по языкам взаимодействия с ОС",
                url: "lectures/lecture-3-answers.html",
                type: "answers"
            },
            {
                title: "Ответы: Лекция 4",
                content: "Ответы на вопросы по структуре операционных систем",
                url: "lectures/lecture-4-answers.html",
                type: "answers"
            },
            {
                title: "Ответы: Лекция 5",
                content: "Ответы на вопросы по операционному окружению",
                url: "lectures/lecture-5-answers.html",
                type: "answers"
            },
            {
                title: "Ответы: Лекция 6",
                content: "Ответы на вопросы по микроядерной архитектуре",
                url: "lectures/lecture-6-answers.html",
                type: "answers"
            },
            {
                title: "Ответы: Лекция 10",
                content: "Ответы на вопросы по прерываниям",
                url: "lectures/lecture-10-answers.html",
                type: "answers"
            },
            
            // Practical works
            {
                title: "УП.05 - Сбор исходных данных",
                content: "Сбор исходных данных для разработки проектной документации на информационную систему",
                url: "practicals/up05-data-collection.html",
                type: "practical"
            },
            {
                title: "Практическая работа 1",
                content: "Формирование требований пользователя к информационной системе",
                url: "practicals/practical-1.html",
                type: "practical"
            },
            {
                title: "Ответы: Практическая работа 1",
                content: "Ответы на контрольные вопросы по практической работе 1",
                url: "practicals/practical-1-answers.html",
                type: "answers"
            }
        ];
    }

    setupSearch() {
        const searchInput = document.querySelector('.search-input');
        const searchResults = document.querySelector('.search-results');
        
        if (!searchInput || !searchResults) return;

        let timeout;

        searchInput.addEventListener('input', (e) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                this.performSearch(e.target.value, searchResults);
            }, 300);
        });

        searchInput.addEventListener('focus', () => {
            if (searchInput.value.trim()) {
                this.performSearch(searchInput.value, searchResults);
            }
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                searchResults.style.display = 'none';
            }
        });
    }

    performSearch(query, container) {
        const trimmed = query.trim().toLowerCase();
        
        if (!trimmed) {
            container.style.display = 'none';
            return;
        }

        const results = this.searchData.filter(item =>
            item.title.toLowerCase().includes(trimmed) ||
            item.content.toLowerCase().includes(trimmed)
        );

        this.showResults(results, container);
    }

    showResults(results, container) {
        container.innerHTML = '';

        if (results.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'search-result-item';
            noResults.textContent = 'Ничего не найдено';
            container.appendChild(noResults);
        } else {
            results.forEach(result => {
                const item = document.createElement('div');
                item.className = 'search-result-item';
                item.innerHTML = `
                    <div style="font-weight: 600; margin-bottom: 0.5rem;">${result.title}</div>
                    <div style="font-size: 0.9rem; color: var(--text-muted);">${result.content}</div>
                `;
                
                item.addEventListener('click', () => {
                    window.location.href = result.url;
                });
                
                container.appendChild(item);
            });
        }
        
        container.style.display = 'block';
    }

    setupNavigation() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SimpleSearch();
    
    // Add fade-in animation for cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});
