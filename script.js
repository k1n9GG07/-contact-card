class ContactCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.isFavorite = false;
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    static get observedAttributes() {
        return ['name', 'email', 'phone', 'image', 'title', 'company', 'online', 'badges'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    addEventListeners() {
        setTimeout(() => {
            const favoriteBtn = this.shadowRoot.querySelector('.favorite-btn');
            if (favoriteBtn) {
                favoriteBtn.addEventListener('click', () => this.toggleFavorite());
            }
        }, 100);
    }

    toggleFavorite() {
        this.isFavorite = !this.isFavorite;
        const favoriteBtn = this.shadowRoot.querySelector('.favorite-btn');
        if (favoriteBtn) {
            if (this.isFavorite) {
                favoriteBtn.innerHTML = '<i class="fas fa-star"></i>';
                favoriteBtn.classList.add('active');
            } else {
                favoriteBtn.innerHTML = '<i class="far fa-star"></i>';
                favoriteBtn.classList.remove('active');
            }
        }
    }

    render() {
        const template = document.getElementById('contact-card');
        const content = template.content.cloneNode(true);

        // Получаем данные
        const name = this.getAttribute('name') || 'Не указано';
        const email = this.getAttribute('email') || 'Не указано';
        const phone = this.getAttribute('phone') || 'Не указано';
        const title = this.getAttribute('title') || 'Сотрудник';
        const company = this.getAttribute('company') || 'Не указано';
        const image = this.getAttribute('image') || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face';
        const isOnline = this.getAttribute('online') === 'true';
        const badges = this.getAttribute('badges') || '';

        // Заполняем данные
        content.querySelector('.contact-img').src = image;
        content.querySelector('.contact-img').alt = `Фото ${name}`;
        content.querySelector('.contact-name').textContent = name;
        content.querySelector('.contact-title').textContent = title;
        content.querySelector('.contact-email').textContent = email;
        content.querySelector('.contact-phone').textContent = phone;
        content.querySelector('.contact-company').textContent = company;

        // Статус онлайн
        const onlineStatus = content.querySelector('.online-status');
        onlineStatus.style.background = isOnline ? '#10b981' : '#6b7280';

        // Бейджи
        const badgesContainer = content.querySelector('.contact-badges');
        badgesContainer.innerHTML = '';
        if (badges) {
            badges.split(',').forEach(badge => {
                const badgeEl = document.createElement('span');
                badgeEl.className = `badge ${badge.trim()}`;
                badgeEl.textContent = badge.trim();
                badgesContainer.appendChild(badgeEl);
            });
        }

        // Добавляем стили
        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: block;
                margin: 10px;
            }
            
            .contact-card {
                background: #ffffff;
                border-radius: 20px;
                padding: 25px;
                box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                position: relative;
                overflow: hidden;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .contact-card:hover {
                transform: translateY(-8px) scale(1.02);
                box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.15);
            }
            
            .card-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 20px;
            }
            
            .contact-image {
                position: relative;
            }
            
            .contact-img {
                width: 80px;
                height: 80px;
                border-radius: 20px;
                object-fit: cover;
                border: 4px solid white;
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
                transition: all 0.3s ease;
            }
            
            .contact-card:hover .contact-img {
                transform: scale(1.1);
                border-color: #6366f1;
            }
            
            .online-status {
                position: absolute;
                bottom: 5px;
                right: 5px;
                width: 16px;
                height: 16px;
                border: 2px solid white;
                border-radius: 50%;
            }
            
            .contact-badges {
                display: flex;
                gap: 8px;
            }
            
            .badge {
                padding: 6px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 500;
            }
            
            .badge.primary {
                background: rgba(99, 102, 241, 0.1);
                color: #6366f1;
            }
            
            .badge.success {
                background: rgba(16, 185, 129, 0.1);
                color: #10b981;
            }
            
            .badge.warning {
                background: rgba(245, 158, 11, 0.1);
                color: #f59e0b;
            }
            
            .contact-info {
                margin-bottom: 25px;
            }
            
            .contact-name {
                font-size: 1.5rem;
                font-weight: 600;
                margin-bottom: 5px;
                color: #1f2937;
            }
            
            .contact-title {
                color: #6b7280;
                margin-bottom: 20px;
                font-weight: 500;
            }
            
            .contact-details {
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            
            .detail-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 10px;
                background: #f8fafc;
                border-radius: 10px;
                transition: all 0.3s ease;
            }
            
            .detail-item:hover {
                background: #f1f5f9;
                transform: translateX(5px);
            }
            
            .detail-item i {
                color: #6366f1;
                width: 20px;
            }
            
            .contact-actions {
                display: flex;
                justify-content: center;
                gap: 12px;
                margin-top: 20px;
            }
            
            .action-btn {
                width: 45px;
                height: 45px;
                border: none;
                border-radius: 12px;
                background: #f8fafc;
                color: #6b7280;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
            }
            
            .action-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            }
            
            .message-btn:hover {
                background: #6366f1;
                color: white;
            }
            
            .call-btn:hover {
                background: #10b981;
                color: white;
            }
            
            .favorite-btn:hover,
            .favorite-btn.active {
                background: #f59e0b;
                color: white;
            }
            
            .card-wave {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 4px;
                background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
                border-radius: 0 0 20px 20px;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .contact-card:hover .card-wave {
                opacity: 1;
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .contact-card {
                animation: fadeInUp 0.6s ease forwards;
            }
        `;

        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(content);
    }
}

// Регистрируем кастомный элемент
customElements.define('contact-card', ContactCard);

// Функция для создания карточек контактов
function createContactCards() {
    const contacts = [
        {
            name: "Иван Иванов",
            email: "ivan@example.com",
            phone: "+7 (999) 123-45-67",
            title: "Senior Developer",
            company: "TechCorp Inc.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
            online: true,
            badges: "primary, success"
        },
        {
            name: "Мария Петрова",
            email: "maria@example.com",
            phone: "+7 (999) 234-56-78",
            title: "UX/UI Designer",
            company: "DesignStudio",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
            online: true,
            badges: "warning"
        },
        {
            name: "Алексей Смирнов",
            email: "alex@example.com",
            phone: "+7 (999) 345-67-89",
            title: "Project Manager",
            company: "InnovateSoft",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
            online: false,
            badges: "primary"
        },
        {
            name: "Екатерина Волкова",
            email: "ekaterina@example.com",
            phone: "+7 (999) 456-78-90",
            title: "Marketing Director",
            company: "BrandGrowth",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
            online: true,
            badges: "success, warning"
        },
        {
            name: "Дмитрий Козлов",
            email: "dmitry@example.com",
            phone: "+7 (999) 567-89-01",
            title: "Data Scientist",
            company: "AI Solutions",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
            online: true,
            badges: "primary"
        },
        {
            name: "Ольга Новикова",
            email: "olga@example.com",
            phone: "+7 (999) 678-90-12",
            title: "HR Manager",
            company: "PeopleFirst",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
            online: false,
            badges: "success"
        }
    ];

    const container = document.getElementById('contacts-container');
    container.innerHTML = '';

    contacts.forEach((contact, index) => {
        const card = document.createElement('contact-card');
        card.setAttribute('name', contact.name);
        card.setAttribute('email', contact.email);
        card.setAttribute('phone', contact.phone);
        card.setAttribute('title', contact.title);
        card.setAttribute('company', contact.company);
        card.setAttribute('image', contact.image);
        card.setAttribute('online', contact.online.toString());
        card.setAttribute('badges', contact.badges);
        card.style.animationDelay = `${index * 0.1}s`;
        
        container.appendChild(card);
    });
}

// Поиск и фильтрация
function setupSearchAndFilter() {
    const searchInput = document.getElementById('search-input');
    const filterButtons = document.querySelectorAll('.filter-btn');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filterContacts(searchTerm);
    });

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterContacts(searchInput.value.toLowerCase(), btn.textContent);
        });
    });
}

function filterContacts(searchTerm = '', filter = 'Все') {
    const cards = document.querySelectorAll('contact-card');
    
    cards.forEach(card => {
        const name = card.getAttribute('name').toLowerCase();
        const email = card.getAttribute('email').toLowerCase();
        const isOnline = card.getAttribute('online') === 'true';
        const matchesSearch = name.includes(searchTerm) || email.includes(searchTerm);
        
        let matchesFilter = true;
        if (filter === 'Онлайн') matchesFilter = isOnline;
        if (filter === 'Избранное') matchesFilter = card.isFavorite;
        
        card.style.display = (matchesSearch && matchesFilter) ? 'block' : 'none';
    });
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    createContactCards();
    setupSearchAndFilter();
    
    // Добавляем обработчики для кнопок действий
    setTimeout(() => {
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
    }, 1000);
});