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
        this.setupAnimations();
    }

    loadSearchData() {
        this.searchData = [
            // OS Lectures
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
            
            // MDK Design
            {
                title: "МДК 05.01: Лекция 1 - Основные понятия",
                content: "Основные понятия и история развития технологии проектирования",
                url: "mdk-design/lecture-1.html",
                type: "mdk"
            },
            {
                title: "МДК 05.01: Лекция 2 - Разработка ТЗ",
                content: "Разработка ТЗ. Этапы создания. Разработка эскизного и технического проекта",
                url: "mdk-design/lecture-2.html",
                type: "mdk"
            },
            
            // Practical works
            {
                title: "УП.05 - Сбор исходных данных",
                content: "Сбор исходных данных для разработки проектной документации на информационную систему",
                url: "practicals/up05-data-collection.html",
                type: "practical"
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

    setupAnimations() {
        // Add hover effects to list items
        const listItems = document.querySelectorAll('.list-item');
        
        listItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-5px)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0)';
            });
        });
    }
}

// Функция для применения стилей ко всем страницам
function applyGlobalStyles() {
    // Добавляем кнопки "Назад" только если это не главная страница
    const isMainPage = window.location.pathname.endsWith('index.html') || 
                      window.location.pathname.endsWith('/') || 
                      window.location.pathname === '';
    
    if (!isMainPage && !document.querySelector('.back-link') && !document.querySelector('main').contains(document.querySelector('.back-link'))) {
        const main = document.querySelector('main');
        const isAnswersPage = window.location.pathname.includes('answers');
        const backLink = document.createElement('a');
        
        if (isAnswersPage) {
            // На странице ответов - ссылка на лекцию
            const lecturePage = window.location.pathname.replace('-answers', '');
            backLink.href = lecturePage;
            backLink.textContent = '← Назад к лекции';
        } else {
            // На странице лекции - ссылка на главную
            backLink.href = '../index.html';
            backLink.textContent = '← Назад к списку лекций';
        }
        
        backLink.className = 'back-link';
        main.insertBefore(backLink, main.firstChild);
    }
    
    // Добавляем карточки действий если их нет (нижняя кнопка)
    if (!document.querySelector('.card-actions') && document.querySelector('.lecture-content')) {
        const lectureContent = document.querySelector('.lecture-content');
        const isAnswersPage = window.location.pathname.includes('answers');
        
        const cardActions = document.createElement('div');
        cardActions.className = 'card-actions';
        
        if (isAnswersPage) {
            // На странице ответов - ссылка на лекцию
            const lecturePage = window.location.pathname.replace('-answers', '');
            cardActions.innerHTML = `
                <a href="${lecturePage}" class="btn btn-primary">← Назад к лекции</a>
                <a href="../index.html" class="btn btn-secondary">На главную</a>
            `;
        } else {
            // На странице лекции - ссылка на ответы
            const answersPage = window.location.pathname.replace('.html', '-answers.html');
            cardActions.innerHTML = `
                <a href="${answersPage}" class="btn btn-primary">Ответы на вопросы</a>
                <a href="../index.html" class="btn btn-secondary">На главную</a>
            `;
        }
        
        lectureContent.appendChild(cardActions);
    }
    
    // Применяем стили к таблицам
    document.querySelectorAll('table').forEach(table => {
        if (!table.hasAttribute('style')) {
            table.style.width = '100%';
            table.style.borderCollapse = 'collapse';
            table.style.margin = '1rem 0';
        }
    });
    
    // Применяем стили к заголовкам
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(header => {
        if (!header.className && !header.closest('.card')) {
            header.style.color = 'var(--text-light)';
        }
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SimpleSearch();
    applyGlobalStyles();
});
