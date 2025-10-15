// Расширенный скрипт для добавления интерактивности
document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка для всех ссылок
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Добавляем возможность выделения текста в лекциях
    const lectureContent = document.querySelector('.lecture-content');
    
    if (lectureContent) {
        lectureContent.addEventListener('mouseup', function() {
            const selection = window.getSelection();
            const selectedText = selection.toString().trim();
            
            if (selectedText.length > 0) {
                // Создаем стилизованный тултип для выделенного текста
                createSelectionTooltip(selectedText, selection);
            }
        });
    }
    
    // Функция создания тултипа для выделенного текста
    function createSelectionTooltip(text, selection) {
        // Удаляем предыдущий тултип, если есть
        const existingTooltip = document.querySelector('.selection-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }
        
        const tooltip = document.createElement('div');
        tooltip.className = 'selection-tooltip';
        tooltip.innerHTML = `
            <button class="tooltip-btn copy-btn">📋 Копировать</button>
            <button class="tooltip-btn highlight-btn">🎨 Выделить</button>
        `;
        
        // Стили для тултипа
        Object.assign(tooltip.style, {
            position: 'absolute',
            background: 'linear-gradient(135deg, #3d1829 0%, #2d1120 100%)',
            border: '1px solid #ff66a3',
            borderRadius: '12px',
            padding: '8px',
            boxShadow: '0 4px 15px rgba(255, 102, 163, 0.3)',
            zIndex: '10000',
            display: 'flex',
            gap: '8px',
            animation: 'fadeIn 0.3s ease-out'
        });
        
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        tooltip.style.top = `${rect.top + window.scrollY - 50}px`;
        tooltip.style.left = `${rect.left + window.scrollX + rect.width / 2 - 100}px`;
        
        document.body.appendChild(tooltip);
        
        // Обработчики для кнопок тултипа
        tooltip.querySelector('.copy-btn').addEventListener('click', () => {
            navigator.clipboard.writeText(text).then(() => {
                tooltip.innerHTML = '✓ Скопировано!';
                setTimeout(() => tooltip.remove(), 1500);
            }).catch(() => {
                // Fallback для старых браузеров
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                tooltip.innerHTML = '✓ Скопировано!';
                setTimeout(() => tooltip.remove(), 1500);
            });
        });
        
        tooltip.querySelector('.highlight-btn').addEventListener('click', () => {
            const span = document.createElement('span');
            span.style.background = 'linear-gradient(135deg, rgba(255, 102, 163, 0.3) 0%, rgba(255, 182, 213, 0.2) 100%)';
            span.style.padding = '2px 4px';
            span.style.borderRadius = '4px';
            span.textContent = text;
            
            range.deleteContents();
            range.insertNode(span);
            tooltip.remove();
        });
        
        // Удаляем тултип при клике вне его
        setTimeout(() => {
            document.addEventListener('click', function removeTooltip(e) {
                if (!tooltip.contains(e.target)) {
                    tooltip.remove();
                    document.removeEventListener('click', removeTooltip);
                }
            });
        }, 100);
    }
    
    // Добавляем подсветку текущего раздела при прокрутке
    const sections = document.querySelectorAll('.lecture-section, section');
    const navLinks = document.querySelectorAll('nav a');
    
    function highlightNavOnScroll() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight + 100) {
                currentSection = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavOnScroll);
    
    // Добавляем кнопку "Наверх" в стиле новой темы
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.classList.add('scroll-to-top');
    scrollToTopBtn.style.display = 'none';
    scrollToTopBtn.style.position = 'fixed';
    scrollToTopBtn.style.bottom = '30px';
    scrollToTopBtn.style.right = '30px';
    scrollToTopBtn.style.zIndex = '1000';
    scrollToTopBtn.style.background = 'linear-gradient(135deg, #ff66a3 0%, #ff8ebb 100%)';
    scrollToTopBtn.style.color = '#2a0f1a';
    scrollToTopBtn.style.border = 'none';
    scrollToTopBtn.style.borderRadius = '50%';
    scrollToTopBtn.style.width = '60px';
    scrollToTopBtn.style.height = '60px';
    scrollToTopBtn.style.fontSize = '24px';
    scrollToTopBtn.style.cursor = 'pointer';
    scrollToTopBtn.style.boxShadow = '0 6px 20px rgba(255, 102, 163, 0.4)';
    scrollToTopBtn.style.transition = 'all 0.3s ease';
    scrollToTopBtn.style.fontWeight = 'bold';
    scrollToTopBtn.style.opacity = '0';
    
    // Ховер-эффекты для кнопки
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.1)';
        this.style.boxShadow = '0 8px 25px rgba(255, 102, 163, 0.6)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 6px 20px rgba(255, 102, 163, 0.4)';
    });
    
    document.body.appendChild(scrollToTopBtn);
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.display = 'block';
            setTimeout(() => {
                scrollToTopBtn.style.opacity = '1';
            }, 10);
        } else {
            scrollToTopBtn.style.opacity = '0';
            setTimeout(() => {
                if (window.scrollY <= 500) {
                    scrollToTopBtn.style.display = 'none';
                }
            }, 300);
        }
    });
    
    // Добавляем функциональность для сворачивания/разворачивания разделов
    const sectionHeaders = document.querySelectorAll('.lecture-section h3, .question-item .question-text');
    
    sectionHeaders.forEach(header => {
        if (!header) return;
        
        // Добавляем индикатор сворачивания
        const indicator = document.createElement('span');
        indicator.innerHTML = '▼';
        indicator.style.marginLeft = '10px';
        indicator.style.transition = 'transform 0.3s ease';
        indicator.style.display = 'inline-block';
        indicator.style.color = '#ff8ebb';
        
        header.style.cursor = 'pointer';
        header.style.display = 'flex';
        header.style.alignItems = 'center';
        header.style.justifyContent = 'space-between';
        
        // Добавляем индикатор в заголовок
        header.appendChild(indicator);
        
        header.addEventListener('click', function() {
            let content;
            
            if (this.classList.contains('question-text')) {
                content = this.nextElementSibling;
            } else {
                content = this.parentNode;
                let nextElement = this.nextElementSibling;
                while (nextElement && !nextElement.classList.contains('lecture-section')) {
                    if (nextElement.tagName === 'P' || nextElement.tagName === 'UL' || nextElement.tagName === 'OL' || nextElement.tagName === 'TABLE') {
                        content = nextElement;
                        break;
                    }
                    nextElement = nextElement.nextElementSibling;
                }
            }
            
            if (content && (content.classList.contains('answer-text') ||
                           content.tagName === 'P' || 
                           content.tagName === 'UL' || 
                           content.tagName === 'OL' ||
                           content.tagName === 'TABLE' ||
                           content.classList.contains('lecture-section'))) {
                
                if (content.style.display === 'none') {
                    content.style.display = 'block';
                    indicator.style.transform = 'rotate(0deg)';
                    // Анимация появления
                    content.style.animation = 'fadeIn 0.4s ease-out';
                } else {
                    content.style.display = 'none';
                    indicator.style.transform = 'rotate(-90deg)';
                }
            }
        });
    });
    
    // Добавляем эффекты при наведении на карточки лекций
    const lectureCards = document.querySelectorAll('.lecture-card');
    
    lectureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Добавляем анимацию для навигационных ссылок
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Добавляем дополнительные стили
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .selection-tooltip {
            animation: fadeIn 0.3s ease-out !important;
        }
    `;
    document.head.appendChild(style);
});
