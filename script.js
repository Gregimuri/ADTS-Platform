// Конфигурация платформы с расширенными настройками
const PLATFORM_CONFIG = {
    currentDate: '11.02.2026',
    dateFormat: 'DD.MM.YYYY',
    
    roles: {
        customer: {
            name: 'Заказчик',
            color: '#4f46e5',
            icon: 'building'
        },
        platformManager: {
            name: 'Менеджер платформы',
            color: '#f59e0b',
            icon: 'cogs'
        },
        projectManager: {
            name: 'Менеджер проектов',
            color: '#0ea5e9',
            icon: 'tasks'
        },
        contractor: {
            name: 'Подрядчик',
            color: '#10b981',
            icon: 'tools'
        }
    },
    
    chains: {
        customer: ['platformManager'],
        platformManager: ['customer', 'projectManager'],
        projectManager: ['platformManager', 'contractor'],
        contractor: ['projectManager']
    },
    
    theme: {
        current: 'light',
        toggle: function() {
            this.current = this.current === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', this.current);
            localStorage.setItem('theme', this.current);
            return this.current;
        }
    }
};

// Глобальное состояние приложения
const APP_STATE = {
    currentRole: 'customer',
    previousRole: null,
    notifications: [],
    unreadMessages: 3,
    
    // Статистика для разных ролей
    stats: {
        customer: {
            activeProjects: 5,
            totalPoints: 89,
            completed: 64,
            problems: 7,
            efficiency: 71.9
        },
        platformManager: {
            newRequests: 4,
            activeProjects: 12,
            coordination: 6,
            contractors: 28,
            load: 84
        },
        projectManager: {
            activeTasks: 8,
            contractors: 5,
            completed: 24,
            problems: 3,
            efficiency: 82.5
        },
        contractor: {
            availableTasks: 7,
            inProgress: 3,
            completed: 42,
            income: 128500,
            rating: 4.8
        }
    },
    
    // Данные проектов
    projects: [],
    tasks: [],
    
    // Чат системы
    chatMessages: {
        customer_platform: [],
        platform_customer: [],
        platform_project: [],
        project_platform: [],
        project_contractor: []
    },
    
    // Документы
    documents: [],
    
    // Подрядчики
    contractors: [],
    
    // Финансы
    finances: {
        totalEarned: 128500,
        pending: 28500,
        thisMonth: 85000,
        transactions: []
    },
    
    // Аналитика
    analytics: {
        completionRate: 71.9,
        avgTaskTime: 2.4,
        costPerPoint: 8500,
        satisfactionScore: 4.7,
        monthlyTrend: [65, 68, 72, 71, 71.9]
    },
    
    // Точки клиентов
    customerPoints: {
        labels: ['Сен 2025', 'Окт 2025', 'Ноя 2025', 'Дек 2025', 'Янв 2026', 'Фев 2026'],
        data: [15, 22, 18, 25, 30, 17]
    },
    
    // Настройки пользователя
    userSettings: {
        notifications: true,
        darkMode: false,
        compactView: false,
        autoRefresh: true
    },
    
    // Сессия
    session: {
        startTime: new Date(),
        actions: [],
        roleChanges: 0
    }
};

// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    console.log('ADTS Platform инициализируется...');
    
    // Загрузка сохраненной темы
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        PLATFORM_CONFIG.theme.current = savedTheme;
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
    
    // Инициализация базовых модулей
    initPlatform();
    initDemoData();
    initCharts();
    initEventListeners();
    
    // Инициализация улучшенных модулей
    setTimeout(() => {
        initAnalyticsTab();
        initDocumentsTab();
        initContractorsTab();
        initFinanceTab();
        initActiveProjectsTab();
        initCoordinationTab();
        initReportSubmission();
        initThemeSystem();
        initQuickActions();
    }, 100);
    
    // Добавление динамических кнопок
    addDynamicButtons();
    
    // Показ онбординг тура
    setTimeout(() => {
        if (!localStorage.getItem('onboardingShown')) {
            document.getElementById('onboarding-tour').classList.add('active');
            localStorage.setItem('onboardingShown', 'true');
        }
    }, 500);
    
    // Стабилизация значений
    stabilizeNumericValues();
    
    // Запуск симуляции реального времени
    setTimeout(startRealTimeSimulation, 5000);
    
    console.log('ADTS Platform успешно инициализирована');
});

// Инициализация платформы
function initPlatform() {
    updateCurrentDate();
    initDemoData();
    initKanban();
    updateUserInterface();
}

// Обновление текущей даты и времени
function updateCurrentDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    PLATFORM_CONFIG.currentDate = `${day}.${month}.${year}`;
    
    const dateElements = document.querySelectorAll('.current-date');
    dateElements.forEach(el => {
        el.textContent = `${PLATFORM_CONFIG.currentDate}, ${hours}:${minutes}`;
    });
}

// Инициализация демо-данных
function initDemoData() {
    console.log('Загрузка демо-данных...');
    
    // Проекты
    APP_STATE.projects = [
        {
            id: 1,
            name: 'Установка медиа-панелей в "Магнит-Аптеках"',
            client: 'Магнит',
            points: 25,
            completed: 17,
            deadline: '28.02.2026',
            budget: '1.8M ₽',
            status: 'in-progress',
            priority: 'high',
            regions: ['Москва', 'СПб', 'Казань'],
            description: 'Установка медиа-панелей Samsung 55" в 25 аптеках сети "Магнит"',
            team: ['ИП', 'АС', 'ИС'],
            progress: 68,
            createdAt: '05.02.2026'
        },
        {
            id: 2,
            name: 'Обновление LED-экранов в гипермаркетах "Лента"',
            client: 'Лента',
            points: 30,
            completed: 30,
            deadline: '05.02.2026',
            budget: '2.4M ₽',
            status: 'completed',
            priority: 'medium',
            regions: ['Москва', 'МО', 'СПб'],
            description: 'Замена устаревших LED-экранов на новые модели',
            team: ['ИП', 'МС'],
            progress: 100,
            createdAt: '15.01.2026'
        },
        {
            id: 3,
            name: 'Монтаж интерактивных стоек в ТЦ "Авиапарк"',
            client: 'Авиапарк',
            points: 8,
            completed: 0,
            deadline: '25.02.2026',
            budget: '850K ₽',
            status: 'new',
            priority: 'low',
            regions: ['Москва'],
            description: 'Установка 8 интерактивных информационных стоек',
            team: [],
            progress: 0,
            createdAt: '10.02.2026'
        }
    ];
    
    // Задачи
    APP_STATE.tasks = [
        {
            id: 1,
            projectId: 1,
            title: 'Установка медиа-панели 65" в ТЦ',
            location: 'ТЦ "Европейский", Москва',
            price: '4,200 ₽',
            deadline: '15.02.2026',
            status: 'new',
            priority: 'high',
            views: 5,
            published: '15 мин назад',
            type: 'installation',
            duration: '2-3 часа'
        },
        {
            id: 2,
            projectId: 1,
            title: 'Замена LED-экрана в аптеке',
            location: '"Магнит-Аптека", ул. Ленина, 15',
            price: '3,500 ₽',
            deadline: '18.02.2026',
            status: 'published',
            priority: 'medium',
            views: 3,
            published: '1 час назад',
            type: 'replacement',
            duration: '1.5 часа'
        }
    ];
    
    // Документы
    APP_STATE.documents = [
        {
            id: 1,
            name: 'ТЗ Проект "Магнит-Аптеки"',
            type: 'pdf',
            size: '2.4 MB',
            date: '05.02.2026',
            uploadedBy: 'Иван Петров (ПМ)',
            category: 'ТЗ',
            downloads: 12
        },
        {
            id: 2,
            name: 'Договор на оказание услуг',
            type: 'doc',
            size: '1.8 MB',
            date: '03.02.2026',
            uploadedBy: 'Менеджер платформы',
            category: 'Договоры',
            downloads: 8
        },
        {
            id: 3,
            name: 'Смета по проекту',
            type: 'xlsx',
            size: '850 KB',
            date: '01.02.2026',
            uploadedBy: 'Анна Смирнова',
            category: 'Финансы',
            downloads: 15
        }
    ];
    
    // Подрядчики
    APP_STATE.contractors = [
        {
            id: 1,
            name: 'ИП Сидоров А.В.',
            rating: 4.8,
            completedTasks: 42,
            activeTasks: 3,
            specialization: 'Монтаж медиа-оборудования',
            location: 'Москва',
            experience: '5 лет',
            responseTime: '2 часа',
            priceLevel: 'средний'
        },
        {
            id: 2,
            name: 'ООО "МонтажСервис"',
            rating: 4.6,
            completedTasks: 28,
            activeTasks: 2,
            specialization: 'Установка LED-экранов',
            location: 'Москва',
            experience: '7 лет',
            responseTime: '1 час',
            priceLevel: 'высокий'
        }
    ];
    
    // Финансы
    APP_STATE.finances.transactions = [
        { id: 1, task: 'Установка дисплея', amount: 2800, date: '10.02.2026', type: 'income', status: 'pending' },
        { id: 2, task: 'Монтаж стойки', amount: 8500, date: '08.02.2026', type: 'income', status: 'completed' },
        { id: 3, task: 'Замена экрана', amount: 3500, date: '05.02.2026', type: 'income', status: 'completed' }
    ];
    
    // Инициализация чатов
    initChats();
    
    console.log('Демо-данные загружены');
}

// Инициализация чатов
function initChats() {
    APP_STATE.chatMessages = {
        customer_platform: [
            {
                id: 1,
                sender: 'platformManager',
                message: 'Добрый день! Получили вашу заявку по проекту "Магнит-Аптеки".',
                timestamp: '11.02.2026, 10:15',
                read: true,
                type: 'text'
            },
            {
                id: 2,
                sender: 'platformManager',
                message: 'Уточните, пожалуйста, по 5 точкам в Омске. По адресам есть расхождения с базой.',
                timestamp: '11.02.2026, 10:20',
                read: true,
                type: 'text'
            },
            {
                id: 3,
                sender: 'customer',
                message: 'Добрый день! Спасибо за оперативный ответ. Уточню с отделом логистики и отправлю точные адреса сегодня до 18:00.',
                timestamp: '11.02.2026, 10:25',
                read: true,
                type: 'text'
            }
        ]
    };
}

// Инициализация графиков
function initCharts() {
    const customerCtx = document.getElementById('customer-chart')?.getContext('2d');
    if (customerCtx) {
        new Chart(customerCtx, {
            type: 'doughnut',
            data: {
                labels: ['Выполнено', 'В работе', 'Проблемные', 'Ожидают'],
                datasets: [{
                    data: [64, 17, 7, 1],
                    backgroundColor: [
                        '#10b981',
                        '#f59e0b',
                        '#ef4444',
                        '#6b7280'
                    ],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                return `${label}: ${value} точек (${percentage}%)`;
                            }
                        }
                    }
                },
                cutout: '70%'
            }
        });
    }
}

// Инициализация обработчиков событий
function initEventListeners() {
    console.log('Инициализация обработчиков событий...');
    
    // Онбординг
    initOnboarding();
    
    // Переключение ролей
    initRoleSwitching();
    
    // Вкладки
    initTabs();
    
    // Модальные окна
    initModals();
    
    // Кнопки действий
    initActionButtons();
    
    // Drag and drop
    initDragAndDrop();
    
    // Чат события
    initChatEvents();
    
    // Фильтры аналитики
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('time-filter-btn')) {
            const buttons = e.target.parentElement.querySelectorAll('.time-filter-btn');
            buttons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            showNotification('Период изменен', 'Данные обновлены для выбранного периода', 'info');
        }
    });
    
    // Обновление данных
    document.getElementById('refresh-data')?.addEventListener('click', refreshData);
    document.getElementById('platform-refresh')?.addEventListener('click', refreshData);
    
    console.log('Обработчики событий инициализированы');
}

// Онбординг тур
function initOnboarding() {
    let currentTourStep = 1;
    const tourSteps = document.querySelectorAll('.tour-step');
    const tourProgressDots = document.querySelectorAll('.tour-progress-dot');
    
    document.getElementById('tour-next').addEventListener('click', function() {
        if (currentTourStep < tourSteps.length) {
            document.getElementById(`tour-step-${currentTourStep}`).classList.add('hidden');
            currentTourStep++;
            document.getElementById(`tour-step-${currentTourStep}`).classList.remove('hidden');
            updateTourProgress();
            
            if (currentTourStep === tourSteps.length) {
                document.getElementById('tour-next').classList.add('hidden');
                document.getElementById('tour-start').classList.remove('hidden');
            }
            document.getElementById('tour-prev').classList.remove('hidden');
        }
    });
    
    document.getElementById('tour-prev').addEventListener('click', function() {
        if (currentTourStep > 1) {
            document.getElementById(`tour-step-${currentTourStep}`).classList.add('hidden');
            currentTourStep--;
            document.getElementById(`tour-step-${currentTourStep}`).classList.remove('hidden');
            updateTourProgress();
            
            if (currentTourStep === 1) {
                document.getElementById('tour-prev').classList.add('hidden');
            }
            document.getElementById('tour-next').classList.remove('hidden');
            document.getElementById('tour-start').classList.add('hidden');
        }
    });
    
    document.getElementById('tour-start').addEventListener('click', function() {
        document.getElementById('onboarding-tour').classList.remove('active');
        showNotification('Демонстрация начата!', 'Переключайтесь между ролями, чтобы протестировать все функции платформы.', 'success');
    });
    
    function updateTourProgress() {
        tourProgressDots.forEach(dot => dot.classList.remove('active'));
        document.querySelector(`.tour-progress-dot[data-step="${currentTourStep}"]`).classList.add('active');
    }
}

// Переключение ролей
function initRoleSwitching() {
    document.querySelectorAll('.role-btn-compact').forEach(btn => {
        btn.addEventListener('click', function() {
            const role = this.dataset.role;
            
            // Сохраняем предыдущую роль
            APP_STATE.previousRole = APP_STATE.currentRole;
            APP_STATE.currentRole = role;
            APP_STATE.session.roleChanges++;
            
            // Обновляем активные кнопки
            document.querySelectorAll('.role-btn-compact').forEach(b => {
                b.classList.remove('active');
            });
            this.classList.add('active');
            
            // Плавное переключение секций
            document.querySelectorAll('.role-section').forEach(section => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.classList.remove('active');
                }, 200);
            });
            
            setTimeout(() => {
                const section = document.getElementById(`${role}-section`);
                if (section) {
                    section.classList.add('active');
                    setTimeout(() => {
                        section.style.opacity = '1';
                        section.style.transform = 'translateY(0)';
                    }, 10);
                    
                    // Обновление интерфейса для новой роли
                    updateUserInterface();
                    
                    // Показ уведомления
                    const roleName = PLATFORM_CONFIG.roles[role].name;
                    showNotification(
                        `Режим: ${roleName}`,
                        'Теперь вы можете тестировать функционал этой роли',
                        'info'
                    );
                    
                    // Стабилизация значений
                    setTimeout(stabilizeNumericValues, 100);
                    
                    // Логирование смены роли
                    logAction(`Смена роли: ${APP_STATE.previousRole} -> ${role}`);
                }
            }, 200);
        });
    });
}

// Обновление пользовательского интерфейса
function updateUserInterface() {
    const role = APP_STATE.currentRole;
    const roleConfig = PLATFORM_CONFIG.roles[role];
    
    // Обновление заголовка
    const titleIcon = document.querySelector('.dashboard-title-row h1 i');
    if (titleIcon) {
        titleIcon.className = `fas fa-${roleConfig.icon}`;
    }
    
    // Обновление статистики
    updateStatsForRole(role);
    
    // Обновление цвета темы
    updateThemeColors(roleConfig.color);
}

// Обновление статистики для роли
function updateStatsForRole(role) {
    const stats = APP_STATE.stats[role];
    if (!stats) return;
    
    // Обновляем значения статистики
    Object.keys(stats).forEach(key => {
        const element = document.getElementById(`${role}-${key}`);
        if (element) {
            if (typeof stats[key] === 'number') {
                element.textContent = stats[key].toLocaleString();
            } else {
                element.textContent = stats[key];
            }
        }
    });
}

// Обновление цветов темы
function updateThemeColors(color) {
    document.documentElement.style.setProperty('--primary-600', color);
}

// Вкладки
function initTabs() {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            const parentSection = this.closest('.role-section');
            
            // Обновление активной вкладки
            parentSection.querySelectorAll('.tab').forEach(t => {
                t.classList.remove('active');
            });
            this.classList.add('active');
            
            // Скрытие текущего контента
            parentSection.querySelectorAll('.tab-content').forEach(content => {
                content.style.opacity = '0';
                content.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    content.classList.remove('active');
                }, 200);
            });
            
            // Показ нового контента
            setTimeout(() => {
                const content = parentSection.querySelector(`#${tabId}-tab`);
                if (content) {
                    content.classList.add('active');
                    setTimeout(() => {
                        content.style.opacity = '1';
                        content.style.transform = 'translateY(0)';
                    }, 10);
                    
                    // Инициализация контента вкладки
                    initTabContent(tabId);
                }
            }, 200);
        });
    });
}

// Инициализация контента вкладки
function initTabContent(tabId) {
    console.log(`Инициализация вкладки: ${tabId}`);
    
    switch(tabId) {
        case 'analytics':
            setTimeout(initAnalyticsTab, 50);
            break;
        case 'documents':
            setTimeout(initDocumentsTab, 50);
            break;
        case 'active-projects':
            setTimeout(initActiveProjectsTab, 50);
            break;
        case 'coordination':
            setTimeout(initCoordinationTab, 50);
            break;
        case 'pm-contractors':
        case 'contractors-management':
            setTimeout(initContractorsTab, 50);
            break;
        case 'contractor-finance':
            setTimeout(initFinanceTab, 50);
            break;
        case 'reports':
            initReportsTab();
            break;
        case 'team':
            initTeamTab();
            break;
    }
}

// Модальные окна
function initModals() {
    // Открытие модальных окон
    document.getElementById('create-project-btn')?.addEventListener('click', () => {
        openModal('project-modal');
    });
    
    document.getElementById('quick-new-project')?.addEventListener('click', () => {
        openModal('project-modal');
    });
    
    document.getElementById('customer-chat-btn')?.addEventListener('click', () => {
        openModal('chat-modal-customer');
    });
    
    document.getElementById('context-chat')?.addEventListener('click', () => {
        const role = APP_STATE.currentRole;
        switch(role) {
            case 'customer':
                openModal('chat-modal-customer');
                break;
            case 'platform-manager':
                openModal('chat-modal-platform');
                break;
            case 'project-manager':
            case 'contractor':
                openModal('chat-modal-project');
                break;
        }
    });
    
    // Закрытие модальных окон
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Закрытие по клику на бэкдроп
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
        backdrop.addEventListener('click', function() {
            const modal = this.parentElement;
            closeModal(modal);
        });
    });
    
    // Отправка формы проекта
    document.getElementById('project-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Показ индикатора загрузки
        showLoading();
        
        setTimeout(() => {
            closeModal(document.getElementById('project-modal'));
            hideLoading();
            
            showNotification(
                'Заявка отправлена!',
                'Менеджер платформы свяжется с вами в ближайшее время для уточнения деталей.',
                'success'
            );
            
            this.reset();
            
            // Обновление счетчика заявок
            if (APP_STATE.currentRole === 'platform-manager') {
                APP_STATE.stats.platformManager.newRequests++;
                updateStatsForRole('platform-manager');
            }
        }, 1500);
    });
}

// Открытие модального окна
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Прокрутка чатов вниз
        setTimeout(() => {
            const messagesContainer = modal.querySelector('.chat-messages');
            if (messagesContainer) {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
        }, 100);
        
        logAction(`Открыто модальное окно: ${modalId}`);
    }
}

// Закрытие модального окна
function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    logAction('Закрыто модальное окно');
}

// Кнопки действий
function initActionButtons() {
    // Принятие задачи подрядчиком
    document.querySelectorAll('.accept-task-feed-btn, .accept-task-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const taskCard = this.closest('.task-feed-item, .task-card');
            const taskTitle = taskCard.querySelector('h4, h5').textContent;
            
            // Анимация загрузки
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Принимается...';
            this.disabled = true;
            
            setTimeout(() => {
                // Обновление состояния
                this.innerHTML = '<i class="fas fa-check"></i> Задача принята';
                this.classList.remove('btn-primary');
                this.classList.add('btn-secondary');
                this.disabled = true;
                
                // Обновление статуса
                const statusElement = taskCard.querySelector('.status-badge');
                if (statusElement) {
                    statusElement.innerHTML = '<i class="fas fa-clock"></i> Ожидает подтверждения';
                    statusElement.className = 'status-badge status-in-progress';
                }
                
                // Уведомления
                showNotification(
                    'Задача принята!',
                    `"${taskTitle}" теперь в ваших активных задачах`,
                    'success'
                );
                
                // Обновление счетчиков
                if (APP_STATE.currentRole === 'contractor') {
                    APP_STATE.stats.contractor.availableTasks--;
                    APP_STATE.stats.contractor.inProgress++;
                    updateStatsForRole('contractor');
                }
                
                logAction(`Принята задача: ${taskTitle}`);
            }, 1500);
        });
    });
}

// Drag and drop
function initDragAndDrop() {
    const tasks = document.querySelectorAll('.kanban-task');
    const columns = document.querySelectorAll('.kanban-column');
    
    tasks.forEach(task => {
        task.setAttribute('draggable', 'true');
        
        task.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', this.dataset.id);
            this.classList.add('dragging');
        });
        
        task.addEventListener('dragend', function() {
            this.classList.remove('dragging');
        });
    });
    
    columns.forEach(column => {
        column.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('drag-over');
        });
        
        column.addEventListener('dragleave', function() {
            this.classList.remove('drag-over');
        });
        
        column.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('drag-over');
            
            const taskId = e.dataTransfer.getData('text/plain');
            const task = document.querySelector(`.kanban-task[data-id="${taskId}"]`);
            
            if (task) {
                const tasksContainer = this.querySelector('.kanban-tasks');
                tasksContainer.appendChild(task);
                
                updateKanbanCounters();
                
                showNotification(
                    'Задача перемещена',
                    'Задача успешно перемещена в другую колонку',
                    'info'
                );
                
                logAction('Перемещена задача на канбан-доске');
            }
        });
    });
}

// Обновление счетчиков канбан-доски
function updateKanbanCounters() {
    document.querySelectorAll('.kanban-column').forEach(column => {
        const count = column.querySelectorAll('.kanban-task').length;
        const counter = column.querySelector('.kanban-count');
        if (counter) {
            counter.textContent = count;
        }
    });
}

// Инициализация канбан-доски
function initKanban() {
    updateKanbanCounters();
}

// Чат события
function initChatEvents() {
    const chatConfigs = [
        { 
            id: 'customer', 
            button: 'send-customer-message', 
            input: 'chat-customer-input', 
            messages: 'chat-customer-messages', 
            chain: 'customer_platform' 
        }
    ];
    
    chatConfigs.forEach(config => {
        const sendBtn = document.getElementById(config.button);
        const input = document.getElementById(config.input);
        const messagesContainer = document.getElementById(config.messages);
        
        if (sendBtn && input && messagesContainer) {
            sendBtn.addEventListener('click', () => sendChatMessage(config.chain, input, messagesContainer));
            
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendChatMessage(config.chain, input, messagesContainer);
                }
            });
            
            // Авторесайз textarea
            input.addEventListener('input', function() {
                this.style.height = 'auto';
                this.style.height = (this.scrollHeight) + 'px';
            });
        }
    });
}

// Отправка сообщения в чат
function sendChatMessage(chainId, inputElement, messagesContainer) {
    const message = inputElement.value.trim();
    if (!message) return;
    
    // Создание элемента сообщения
    const messageElement = createMessageElement('outgoing', 'Вы', message, PLATFORM_CONFIG.roles[APP_STATE.currentRole].name);
    messagesContainer.appendChild(messageElement);
    
    // Очистка поля ввода
    inputElement.value = '';
    inputElement.style.height = 'auto';
    
    // Прокрутка вниз
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Сохранение в состояние
    APP_STATE.chatMessages[chainId].push({
        id: Date.now(),
        sender: APP_STATE.currentRole,
        message: message,
        timestamp: getCurrentTime(),
        read: true,
        type: 'text'
    });
    
    // Симуляция ответа
    setTimeout(() => {
        const responses = getChatResponses(chainId);
        const response = responses[Math.floor(Math.random() * responses.length)];
        const responder = getChatResponder(chainId);
        
        const responseElement = createMessageElement('incoming', responder.name, response, responder.role);
        messagesContainer.appendChild(responseElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Сохранение ответа
        APP_STATE.chatMessages[chainId].push({
            id: Date.now(),
            sender: chainId.split('_')[1],
            message: response,
            timestamp: getCurrentTime(),
            read: false,
            type: 'text'
        });
        
        // Обновление счетчика непрочитанных
        APP_STATE.unreadMessages++;
        updateUnreadBadges();
    }, 2000);
}

// Создание элемента сообщения
function createMessageElement(type, sender, message, role) {
    const element = document.createElement('div');
    element.className = `message ${type}`;
    
    if (type === 'incoming') {
        const initials = sender.split(' ').map(n => n[0]).join('').toUpperCase();
        element.innerHTML = `
            <div class="message-avatar avatar-gradient">${initials}</div>
            <div class="message-content">
                <div class="message-header">
                    <strong>${sender}</strong>
                    <span>${role}</span>
                    <span>${getCurrentTime()}</span>
                </div>
                <p>${message}</p>
            </div>
        `;
    } else {
        element.innerHTML = `
            <div class="message-content">
                <div class="message-header">
                    <strong>${sender}</strong>
                    <span>${role}</span>
                    <span>${getCurrentTime()}</span>
                </div>
                <p>${message}</p>
            </div>
        `;
    }
    
    return element;
}

// Получение ответов для чата
function getChatResponses(chainId) {
    const responses = {
        customer_platform: [
            "Спасибо за информацию! Ожидаем уточненные документы.",
            "Понял. Уточню детали и вернусь с ответом.",
            "Отлично! Начнем обработку вашей заявки.",
            "Принял к сведению. Согласую с проектным отделом."
        ],
        platform_project: [
            "Принял к сведению. Займусь назначением подрядчиков.",
            "Уточнил у заказчика, жду ответа.",
            "Проект передан в работу, контролирую выполнение."
        ],
        project_contractor: [
            "Понял. Выполню сегодня до конца дня.",
            "Уточнил высоту, приступаю к работе.",
            "Отчет подготовлю и загружу в систему."
        ]
    };
    
    return responses[chainId] || ["Сообщение получено."];
}

// Получение информации об отвечающем
function getChatResponder(chainId) {
    const responders = {
        customer_platform: { name: 'Менеджер платформы', role: 'Платформа', initials: 'МП' },
        platform_project: { name: 'Иван Петров', role: 'ПМ Москва', initials: 'ИП' },
        project_contractor: { name: 'ИП Сидоров', role: 'Подрядчик', initials: 'ИС' }
    };
    
    return responders[chainId] || { name: 'Пользователь', role: 'Участник', initials: '??' };
}

// Инициализация вкладки Аналитика
function initAnalyticsTab() {
    const analyticsTab = document.getElementById('analytics-tab');
    if (!analyticsTab || analyticsTab.innerHTML.trim() !== '') return;
    
    analyticsTab.innerHTML = `
        <div class="analytics-dashboard">
            <div class="chart-large card-modern">
                <div class="card-header">
                    <h4>График выполненных работ по проектам</h4>
                    <div class="time-filter">
                        <button class="time-filter-btn active">6 месяцев</button>
                        <button class="time-filter-btn">Год</button>
                        <button class="time-filter-btn">Все время</button>
                    </div>
                </div>
                <div class="chart-container" style="height: 300px;">
                    <canvas id="customer-points-chart"></canvas>
                </div>
            </div>
            
            <div class="chart-medium card-modern">
                <h4>Эффективность команды</h4>
                <div class="chart-container" style="height: 200px;">
                    <canvas id="team-efficiency-chart"></canvas>
                </div>
            </div>
            
            <div class="insights-panel card-modern">
                <h4>Ключевые показатели</h4>
                <div class="metrics-list">
                    <div class="metric">
                        <div class="metric-label">
                            <i class="fas fa-bolt"></i>
                            <span>Среднее время выполнения</span>
                        </div>
                        <div class="metric-value">
                            ${APP_STATE.analytics.avgTaskTime} дня
                            <span class="metric-change positive">-0.3 дня</span>
                        </div>
                    </div>
                    <div class="metric">
                        <div class="metric-label">
                            <i class="fas fa-ruble-sign"></i>
                            <span>Стоимость точки</span>
                        </div>
                        <div class="metric-value">
                            ${APP_STATE.analytics.costPerPoint.toLocaleString()} ₽
                            <span class="metric-change negative">+5%</span>
                        </div>
                    </div>
                    <div class="metric">
                        <div class="metric-label">
                            <i class="fas fa-star"></i>
                            <span>Удовлетворенность</span>
                        </div>
                        <div class="metric-value">
                            ${APP_STATE.analytics.satisfactionScore}/5
                            <span class="metric-change positive">+0.2</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Инициализация графиков
    setTimeout(() => {
        initAnalyticsCharts();
        initTimeFilters();
    }, 100);
}

// Инициализация графиков аналитики
function initAnalyticsCharts() {
    // График точек
    const pointsCtx = document.getElementById('customer-points-chart')?.getContext('2d');
    if (pointsCtx) {
        new Chart(pointsCtx, {
            type: 'bar',
            data: {
                labels: APP_STATE.customerPoints.labels,
                datasets: [{
                    label: 'Выполнено точек',
                    data: APP_STATE.customerPoints.data,
                    backgroundColor: 'rgba(79, 70, 229, 0.8)',
                    borderColor: 'rgba(79, 70, 229, 1)',
                    borderWidth: 2,
                    borderRadius: 8,
                    hoverBackgroundColor: 'rgba(79, 70, 229, 1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `Выполнено: ${context.parsed.y} точек`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Количество точек'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Период'
                        }
                    }
                }
            }
        });
    }
    
    // График эффективности команды
    const efficiencyCtx = document.getElementById('team-efficiency-chart')?.getContext('2d');
    if (efficiencyCtx) {
        new Chart(efficiencyCtx, {
            type: 'line',
            data: {
                labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
                datasets: [{
                    label: 'Эффективность (%)',
                    data: [75, 82, 78, 85, 88, 90, 82],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 70,
                        max: 100
                    }
                }
            }
        });
    }
}

// Фильтры времени
function initTimeFilters() {
    document.querySelectorAll('.time-filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.time-filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const period = this.textContent;
            updateAnalyticsData(period);
            
            showNotification('Данные обновлены', `Показаны данные за период: ${period}`, 'info');
        });
    });
}

// Обновление данных аналитики
function updateAnalyticsData(period) {
    let newData = [...APP_STATE.customerPoints.data];
    let newLabels = [...APP_STATE.customerPoints.labels];
    
    if (period === 'Год') {
        newLabels = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
        newData = [10, 15, 12, 18, 22, 25, 20, 18, 22, 28, 30, 17];
    } else if (period === 'Все время') {
        newLabels = ['2024', '2025', '2026'];
        newData = [120, 180, 89];
    }
    
    // Обновление графика
    const chart = Chart.getChart('customer-points-chart');
    if (chart) {
        chart.data.labels = newLabels;
        chart.data.datasets[0].data = newData;
        chart.update();
    }
}

// Инициализация вкладки Документы
function initDocumentsTab() {
    const documentsTab = document.getElementById('documents-tab');
    if (!documentsTab || documentsTab.innerHTML.trim() !== '') return;
    
    documentsTab.innerHTML = `
        <div class="documents-header">
            <div class="search-box">
                <i class="fas fa-search"></i>
                <input type="text" placeholder="Поиск документов..." id="document-search">
            </div>
            <div class="action-buttons">
                <button class="btn btn-primary" id="upload-document-btn">
                    <i class="fas fa-upload"></i> Загрузить документ
                </button>
                <div class="dropdown">
                    <button class="btn btn-outline" id="filter-documents-btn">
                        <i class="fas fa-filter"></i> Фильтр
                    </button>
                </div>
            </div>
        </div>
        
        <div class="documents-grid">
            ${APP_STATE.documents.map(doc => `
                <div class="document-card hover-lift" data-id="${doc.id}">
                    <div class="document-icon">
                        <i class="fas fa-file-${doc.type === 'pdf' ? 'pdf' : doc.type === 'doc' ? 'word' : 'excel'}"></i>
                    </div>
                    <div class="document-badge">${doc.category}</div>
                    <h4 class="document-name">${doc.name}</h4>
                    <p class="document-meta">
                        <span><i class="fas fa-weight"></i> ${doc.size}</span>
                        <span><i class="fas fa-calendar"></i> ${doc.date}</span>
                        <span><i class="fas fa-download"></i> ${doc.downloads}</span>
                    </p>
                    <p class="document-author">
                        <i class="fas fa-user"></i> ${doc.uploadedBy}
                    </p>
                    <div class="document-actions">
                        <button class="btn btn-outline btn-sm" onclick="downloadDocument(${doc.id})">
                            <i class="fas fa-download"></i> Скачать
                        </button>
                        <button class="btn btn-outline btn-sm" onclick="shareDocument(${doc.id})">
                            <i class="fas fa-share"></i>
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="documents-empty hidden" id="no-documents">
            <div class="empty-state">
                <i class="fas fa-folder-open"></i>
                <h3>Нет документов</h3>
                <p>Загрузите первый документ или измените фильтры</p>
                <button class="btn btn-primary" id="upload-first-document">
                    <i class="fas fa-upload"></i> Загрузить документ
                </button>
            </div>
        </div>
    `;
    
    // Обработчики для документов
    document.getElementById('upload-document-btn')?.addEventListener('click', uploadDocument);
    document.getElementById('upload-first-document')?.addEventListener('click', uploadDocument);
    document.getElementById('document-search')?.addEventListener('input', searchDocuments);
    document.getElementById('filter-documents-btn')?.addEventListener('click', filterDocuments);
}

// Загрузка документа
function uploadDocument() {
    showNotification('Загрузка документа', 'Функция загрузки документа будет доступна в следующем обновлении', 'info');
}

// Поиск документов
function searchDocuments(e) {
    const query = e.target.value.toLowerCase();
    const documents = document.querySelectorAll('.document-card');
    let visibleCount = 0;
    
    documents.forEach(doc => {
        const name = doc.querySelector('.document-name').textContent.toLowerCase();
        const author = doc.querySelector('.document-author').textContent.toLowerCase();
        
        if (name.includes(query) || author.includes(query)) {
            doc.style.display = 'block';
            visibleCount++;
        } else {
            doc.style.display = 'none';
        }
    });
    
    // Показ/скрытие состояния "нет документов"
    const noDocuments = document.getElementById('no-documents');
    if (noDocuments) {
        noDocuments.classList.toggle('hidden', visibleCount > 0);
    }
}

// Фильтрация документов
function filterDocuments() {
    showNotification('Фильтр документов', 'Выберите категории для фильтрации документов', 'info');
}

// Инициализация вкладки Подрядчики
function initContractorsTab() {
    const contractorsTab = document.getElementById('pm-contractors-tab') || 
                          document.getElementById('contractors-management-tab');
    if (!contractorsTab || contractorsTab.innerHTML.trim() !== '') return;
    
    contractorsTab.innerHTML = `
        <div class="contractors-header">
            <div class="search-box">
                <i class="fas fa-search"></i>
                <input type="text" placeholder="Поиск подрядчиков..." id="contractor-search">
            </div>
            <div class="filters">
                <select class="form-control" id="contractor-filter">
                    <option value="all">Все подрядчики</option>
                    <option value="available">Доступные сейчас</option>
                    <option value="top">Топ подрядчики</option>
                    <option value="location">По местоположению</option>
                </select>
            </div>
        </div>
        
        <div class="contractors-grid">
            ${APP_STATE.contractors.map(contractor => `
                <div class="contractor-card hover-lift" data-id="${contractor.id}">
                    <div class="contractor-header">
                        <div class="contractor-avatar avatar-gradient">${contractor.name.charAt(0)}</div>
                        <div class="contractor-info">
                            <h4>${contractor.name}</h4>
                            <div class="contractor-tags">
                                <span class="contractor-tag location">
                                    <i class="fas fa-map-marker-alt"></i> ${contractor.location}
                                </span>
                                <span class="contractor-tag experience">
                                    <i class="fas fa-clock"></i> ${contractor.experience}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <p class="contractor-specialization">${contractor.specialization}</p>
                    
                    <div class="contractor-stats">
                        <div class="stat">
                            <span class="stat-number">${contractor.rating}</span>
                            <span class="stat-label">Рейтинг</span>
                            <div class="contractor-rating">
                                ${generateStarRating(contractor.rating)}
                            </div>
                        </div>
                        <div class="stat">
                            <span class="stat-number">${contractor.completedTasks}</span>
                            <span class="stat-label">Выполнено</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number">${contractor.activeTasks}</span>
                            <span class="stat-label">Активно</span>
                        </div>
                    </div>
                    
                    <div class="contractor-meta">
                        <span><i class="fas fa-bolt"></i> Отклик: ${contractor.responseTime}</span>
                        <span><i class="fas fa-money-bill"></i> ${contractor.priceLevel}</span>
                    </div>
                    
                    <div class="contractor-actions">
                        <button class="btn btn-outline btn-sm" onclick="contactContractor(${contractor.id})">
                            <i class="fas fa-comment"></i> Написать
                        </button>
                        <button class="btn btn-primary btn-sm" onclick="assignTaskToContractor(${contractor.id})">
                            <i class="fas fa-tasks"></i> Назначить
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="contractor-performance mt-5">
            <h4>Производительность подрядчиков</h4>
            <div class="performance-list">
                ${APP_STATE.contractors.map(contractor => `
                    <div class="performance-item">
                        <div class="performance-header">
                            <span>${contractor.name}</span>
                            <span class="badge ${contractor.rating >= 4.8 ? 'badge-success' : contractor.rating >= 4.5 ? 'badge-primary' : 'badge-warning'}">
                                Рейтинг: ${contractor.rating}
                            </span>
                        </div>
                        <div class="performance-bar">
                            <div class="performance-fill" style="width: ${(contractor.completedTasks / 50) * 100}%">
                                <span>${contractor.completedTasks} задач</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // Обработчики для подрядчиков
    document.getElementById('contractor-search')?.addEventListener('input', searchContractors);
    document.getElementById('contractor-filter')?.addEventListener('change', filterContractors);
}

// Генерация звезд рейтинга
function generateStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// Поиск подрядчиков
function searchContractors(e) {
    const query = e.target.value.toLowerCase();
    const contractors = document.querySelectorAll('.contractor-card');
    
    contractors.forEach(contractor => {
        const name = contractor.querySelector('h4').textContent.toLowerCase();
        const specialization = contractor.querySelector('.contractor-specialization').textContent.toLowerCase();
        
        if (name.includes(query) || specialization.includes(query)) {
            contractor.style.display = 'block';
        } else {
            contractor.style.display = 'none';
        }
    });
}

// Фильтрация подрядчиков
function filterContractors(e) {
    const filter = e.target.value;
    showNotification('Фильтр подрядчиков', `Применен фильтр: ${e.target.options[e.target.selectedIndex].text}`, 'info');
}

// Инициализация вкладки Финансы
function initFinanceTab() {
    const financeTab = document.getElementById('contractor-finance-tab');
    if (!financeTab || financeTab.innerHTML.trim() !== '') return;
    
    const { finances } = APP_STATE;
    
    financeTab.innerHTML = `
        <div class="finance-overview">
            <div class="finance-card">
                <div class="stat-icon">
                    <i class="fas fa-wallet"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-label">Общий доход</div>
                    <div class="stat-value">${finances.totalEarned.toLocaleString()} ₽</div>
                    <div class="stat-trend trend-up">
                        <i class="fas fa-arrow-up"></i> +22%
                    </div>
                </div>
            </div>
            
            <div class="finance-card">
                <div class="stat-icon">
                    <i class="fas fa-clock"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-label">Ожидает выплаты</div>
                    <div class="stat-value">${finances.pending.toLocaleString()} ₽</div>
                    <div class="stat-meta">3 задачи</div>
                </div>
            </div>
            
            <div class="finance-card">
                <div class="stat-icon">
                    <i class="fas fa-calendar-alt"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-label">За февраль</div>
                    <div class="stat-value">${finances.thisMonth.toLocaleString()} ₽</div>
                    <div class="stat-trend trend-up">
                        <i class="fas fa-arrow-up"></i> +15%
                    </div>
                </div>
            </div>
        </div>
        
        <div class="finance-chart card-modern mt-4">
            <h4>Динамика доходов</h4>
            <div class="chart-container" style="height: 200px;">
                <canvas id="income-chart"></canvas>
            </div>
        </div>
        
        <div class="transactions-section card-modern mt-4">
            <div class="card-header">
                <h4 class="card-title">
                    <i class="fas fa-exchange-alt"></i> История операций
                </h4>
                <button class="btn btn-outline btn-sm" id="export-transactions">
                    <i class="fas fa-download"></i> Экспорт
                </button>
            </div>
            
            <div class="card-content">
                <div class="transactions-list">
                    ${finances.transactions.map(transaction => `
                        <div class="transaction-item">
                            <div class="transaction-info">
                                <div class="transaction-icon ${transaction.type}">
                                    <i class="fas fa-${transaction.type === 'income' ? 'arrow-down' : 'arrow-up'}"></i>
                                </div>
                                <div>
                                    <strong>${transaction.task}</strong>
                                    <div class="transaction-date">${transaction.date}</div>
                                </div>
                            </div>
                            <div class="transaction-details">
                                <div class="transaction-amount ${transaction.type}">
                                    ${transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()} ₽
                                </div>
                                <div class="transaction-status ${transaction.status}">
                                    ${transaction.status === 'pending' ? 'Ожидает' : 'Выплачено'}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
        
        <div class="finance-actions mt-4">
            <button class="btn btn-primary" id="request-payment-btn">
                <i class="fas fa-money-bill-wave"></i> Запросить выплату
            </button>
            <button class="btn btn-outline" id="export-finance-btn">
                <i class="fas fa-download"></i> Выгрузить отчет
            </button>
        </div>
    `;
    
    // Инициализация графика доходов
    setTimeout(() => {
        const incomeCtx = document.getElementById('income-chart')?.getContext('2d');
        if (incomeCtx) {
            new Chart(incomeCtx, {
                type: 'line',
                data: {
                    labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
                    datasets: [{
                        label: 'Доход (тыс. ₽)',
                        data: [85, 92, 78, 95, 112, 128.5],
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        borderWidth: 3,
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return value + 'K';
                                }
                            }
                        }
                    }
                }
            });
        }
    }, 100);
    
    // Обработчики для финансов
    document.getElementById('request-payment-btn')?.addEventListener('click', requestPayment);
    document.getElementById('export-finance-btn')?.addEventListener('click', exportFinance);
    document.getElementById('export-transactions')?.addEventListener('click', exportTransactions);
}

// Запрос выплаты
function requestPayment() {
    showNotification(
        'Запрос на выплату отправлен',
        'Менеджер платформы получил ваш запрос. Выплата будет произведена в течение 3 рабочих дней.',
        'success'
    );
}

// Экспорт финансов
function exportFinance() {
    showNotification(
        'Отчет выгружен',
        'Финансовый отчет успешно сохранен в формате PDF',
        'success'
    );
}

// Экспорт транзакций
function exportTransactions() {
    showNotification(
        'Транзакции экспортированы',
        'История операций сохранена в формате CSV',
        'success'
    );
}

// Инициализация вкладки Активные проекты
function initActiveProjectsTab() {
    const activeTab = document.getElementById('active-projects-tab');
    if (!activeTab || activeTab.innerHTML.trim() !== '') return;
    
    activeTab.innerHTML = `
        <div class="active-projects-grid">
            ${APP_STATE.projects.filter(p => p.status === 'in-progress' || p.status === 'new').map(project => `
                <div class="active-project-card hover-lift">
                    <div class="project-header">
                        <h4>${project.name}</h4>
                        <span class="status-badge status-${project.status}">
                            <i class="fas fa-${getStatusIcon(project.status)}"></i>
                            ${getStatusText(project.status)}
                        </span>
                    </div>
                    
                    <p class="project-client">
                        <i class="fas fa-building"></i> ${project.client}
                    </p>
                    
                    <div class="project-progress-small">
                        <div class="progress-header">
                            <span>${project.progress}%</span>
                            <span>${project.completed}/${project.points} точек</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${project.progress}%"></div>
                        </div>
                    </div>
                    
                    <div class="project-meta">
                        <span><i class="fas fa-calendar"></i> ${project.deadline}</span>
                        <span><i class="fas fa-ruble-sign"></i> ${project.budget}</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${project.regions.length} регионов</span>
                    </div>
                    
                    <div class="project-team">
                        <span>Команда:</span>
                        <div class="team-avatars">
                            ${project.team.map(member => `
                                <div class="team-avatar">${member}</div>
                            `).join('')}
                            ${project.team.length === 0 ? '<span class="no-team">Не назначена</span>' : ''}
                        </div>
                    </div>
                    
                    <div class="project-actions">
                        <button class="btn btn-outline btn-sm project-details-btn">
                            <i class="fas fa-eye"></i> Подробнее
                        </button>
                        <button class="btn btn-primary btn-sm project-update-btn">
                            <i class="fas fa-sync-alt"></i> Обновить статус
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
        
        ${APP_STATE.projects.filter(p => p.status === 'in-progress' || p.status === 'new').length === 0 ? `
            <div class="empty-state">
                <i class="fas fa-tasks"></i>
                <h3>Нет активных проектов</h3>
                <p>Все проекты завершены или ожидают запуска</p>
            </div>
        ` : ''}
    `;
    
    // Обработчики для проектов
    document.querySelectorAll('.project-details-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            showNotification('Детали проекта', 'Открывается подробная информация о проекте', 'info');
        });
    });
    
    document.querySelectorAll('.project-update-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            showNotification('Обновление статуса', 'Статус проекта будет обновлен', 'info');
        });
    });
}

// Получение иконки статуса
function getStatusIcon(status) {
    const icons = {
        'new': 'clock',
        'in-progress': 'spinner',
        'completed': 'check-circle',
        'cancelled': 'times-circle'
    };
    return icons[status] || 'circle';
}

// Получение текста статуса
function getStatusText(status) {
    const texts = {
        'new': 'Новый',
        'in-progress': 'В работе',
        'completed': 'Завершен',
        'cancelled': 'Отменен'
    };
    return texts[status] || 'Неизвестно';
}

// Инициализация вкладки Согласование
function initCoordinationTab() {
    const coordinationTab = document.getElementById('coordination-tab');
    if (!coordinationTab || coordinationTab.innerHTML.trim() !== '') return;
    
    coordinationTab.innerHTML = `
        <div class="coordination-list">
            <div class="coordination-item card-modern">
                <div class="coordination-header">
                    <h4>Проект "Магнит-Аптеки"</h4>
                    <span class="badge badge-primary">Назначение ПМ</span>
                </div>
                
                <div class="coordination-details">
                    <p><i class="fas fa-user-tie"></i> Заказчик: Компания "Магнит"</p>
                    <p><i class="fas fa-map-marker-alt"></i> 25 точек, 3 региона</p>
                    <p><i class="fas fa-calendar"></i> Срок: до 28.02.2026</p>
                    <p><i class="fas fa-ruble-sign"></i> Бюджет: 1.8M ₽</p>
                </div>
                
                <div class="coordination-timeline">
                    <div class="timeline-item completed">
                        <strong>Заявка получена</strong>
                        <p>05.02.2026, 10:30</p>
                    </div>
                    <div class="timeline-item completed">
                        <strong>ТЗ согласовано</strong>
                        <p>07.02.2026, 14:20</p>
                    </div>
                    <div class="timeline-item current">
                        <strong>Назначение ПМ</strong>
                        <p>В процессе</p>
                    </div>
                    <div class="timeline-item">
                        <strong>Старт проекта</strong>
                        <p>Ожидает</p>
                    </div>
                </div>
                
                <div class="coordination-actions">
                    <button class="btn btn-primary" onclick="approveCoordination()">
                        <i class="fas fa-check"></i> Утвердить назначение
                    </button>
                    <button class="btn btn-outline">
                        <i class="fas fa-comment"></i> Обсудить с заказчиком
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Инициализация функционала "Сдать отчет"
function initReportSubmission() {
    const reportBtn = document.querySelector('.submit-report-btn');
    const uploadReportBtn = document.getElementById('upload-report-contractor');
    
    if (reportBtn) {
        reportBtn.addEventListener('click', showReportModal);
    }
    
    if (uploadReportBtn) {
        uploadReportBtn.addEventListener('click', showReportModal);
    }
}

// Показ модального окна отчета
function showReportModal() {
    const modal = document.getElementById('report-modal') || createReportModal();
    openModal('report-modal');
}

// Создание модального окна отчета
function createReportModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'report-modal';
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content-3d">
            <div class="modal-header">
                <h2 class="modal-title">
                    <i class="fas fa-clipboard-check"></i> Сдать отчет по задаче
                </h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <form id="report-form" class="report-form">
                    <div class="form-group">
                        <label class="form-label">
                            <i class="fas fa-tasks"></i> Задача
                        </label>
                        <select class="form-control input-modern" id="report-task-select">
                            <option value="1">Монтаж интерактивной стойки (ТЦ "Авиапарк")</option>
                            <option value="2">Установка дисплея покупателя ("Лента", пр. Мира)</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">
                            <i class="fas fa-comment"></i> Комментарий
                        </label>
                        <textarea class="form-control input-modern" rows="4" placeholder="Опишите выполненную работу..."></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">
                            <i class="fas fa-camera"></i> Фотографии работы
                        </label>
                        <div class="report-upload" id="report-upload-area">
                            <div class="report-upload-icon">
                                <i class="fas fa-cloud-upload-alt"></i>
                            </div>
                            <p>Перетащите фотографии или нажмите для загрузки</p>
                            <p>JPG, PNG до 10 МБ каждая</p>
                        </div>
                        <div class="photo-preview-grid" id="photo-preview-grid"></div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">
                            <i class="fas fa-file-signature"></i> Подпись
                        </label>
                        <input type="text" class="form-control input-modern" value="ИП Сидоров А.В." readonly>
                    </div>
                    
                    <div class="form-group text-center">
                        <button type="submit" class="btn btn-primary btn-lg btn-3d">
                            <i class="fas fa-paper-plane"></i> Сдать отчет
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Обработчики для модального окна отчета
    const form = modal.querySelector('#report-form');
    const uploadArea = modal.querySelector('#report-upload-area');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        showLoading();
        
        setTimeout(() => {
            closeModal(modal);
            hideLoading();
            
            showNotification(
                'Отчет успешно отправлен!',
                'Проектный менеджер проверит ваш отчет в течение 24 часов.',
                'success'
            );
            
            // Обновление статистики
            if (APP_STATE.currentRole === 'contractor') {
                APP_STATE.stats.contractor.inProgress--;
                APP_STATE.stats.contractor.completed++;
                updateStatsForRole('contractor');
            }
        }, 1500);
    });
    
    uploadArea.addEventListener('click', function() {
        showNotification('Загрузка фото', 'В демо-режиме загрузка фото не доступна', 'info');
    });
    
    return modal;
}

// Инициализация системы тем
function initThemeSystem() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
        updateThemeIcon();
    }
}

// Переключение темы
function toggleTheme() {
    const newTheme = PLATFORM_CONFIG.theme.toggle();
    updateThemeIcon();
    
    showNotification(
        'Тема изменена',
        `Переключено на ${newTheme === 'dark' ? 'темную' : 'светлую'} тему`,
        'info'
    );
    
    logAction(`Переключение темы: ${newTheme}`);
}

// Обновление иконки темы
function updateThemeIcon() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (PLATFORM_CONFIG.theme.current === 'dark') {
            icon.className = 'fas fa-sun';
            themeToggle.title = 'Переключить на светлую тему';
        } else {
            icon.className = 'fas fa-moon';
            themeToggle.title = 'Переключить на темную тему';
        }
    }
}

// Инициализация быстрых действий
function initQuickActions() {
    // Быстрый поиск
    document.getElementById('quick-search')?.addEventListener('click', function() {
        const searchInput = document.querySelector('.search-box input') || 
                           document.getElementById('document-search') ||
                           document.getElementById('contractor-search');
        
        if (searchInput) {
            searchInput.focus();
            searchInput.select();
        } else {
            showNotification('Поиск', 'Перейдите в раздел с поиском для использования этой функции', 'info');
        }
    });
    
    // Быстрые уведомления
    document.getElementById('quick-notifications')?.addEventListener('click', function() {
        showNotification('Уведомления', 'У вас 3 новых уведомления', 'info');
    });
    
    // Контекстные действия
    document.getElementById('context-main-action')?.addEventListener('click', function() {
        const role = APP_STATE.currentRole;
        switch(role) {
            case 'customer':
                openModal('project-modal');
                break;
            case 'platform-manager':
            case 'project-manager':
                showNotification('Быстрое действие', 'Создать новую задачу или проект', 'info');
                break;
            case 'contractor':
                showReportModal();
                break;
        }
    });
}

// Добавление динамических кнопок
function addDynamicButtons() {
    // Добавление кнопки чата для менеджера платформы
    const platformActions = document.querySelector('#platform-manager-section .header-actions');
    if (platformActions && !document.getElementById('platform-customer-chat-btn')) {
        const chatBtn = document.createElement('button');
        chatBtn.className = 'btn btn-outline';
        chatBtn.id = 'platform-customer-chat-btn';
        chatBtn.innerHTML = '<i class="fas fa-comments"></i> Чат с заказчиками';
        chatBtn.addEventListener('click', () => openModal('chat-modal-customer'));
        platformActions.appendChild(chatBtn);
    }
}

// Обновление бейджей непрочитанных
function updateUnreadBadges() {
    const badges = document.querySelectorAll('.chat-badge, .notification-count, .action-badge, .context-badge');
    badges.forEach(badge => {
        if (badge.classList.contains('notification-count') || badge.classList.contains('chat-badge')) {
            badge.textContent = APP_STATE.unreadMessages;
            badge.style.display = APP_STATE.unreadMessages > 0 ? 'flex' : 'none';
        }
    });
}

// Стабилизация числовых значений
function stabilizeNumericValues() {
    // Фиксированные значения счетчиков
    const counters = {
        'customer-active-projects': APP_STATE.stats.customer.activeProjects,
        'customer-total-points': APP_STATE.stats.customer.totalPoints,
        'customer-completed': APP_STATE.stats.customer.completed,
        'customer-problems': APP_STATE.stats.customer.problems,
        'platform-new-requests': APP_STATE.stats.platformManager.newRequests,
        'platform-active-projects': APP_STATE.stats.platformManager.activeProjects,
        'platform-coordination': APP_STATE.stats.platformManager.coordination,
        'platform-contractors': APP_STATE.stats.platformManager.contractors,
        'pm-active-tasks': APP_STATE.stats.projectManager.activeTasks,
        'pm-contractors': APP_STATE.stats.projectManager.contractors,
        'pm-completed': APP_STATE.stats.projectManager.completed,
        'pm-problems': APP_STATE.stats.projectManager.problems,
        'contractor-available-tasks': APP_STATE.stats.contractor.availableTasks,
        'contractor-in-progress': APP_STATE.stats.contractor.inProgress,
        'contractor-completed': APP_STATE.stats.contractor.completed,
        'contractor-income': APP_STATE.stats.contractor.income.toLocaleString() + ' ₽'
    };
    
    Object.entries(counters).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    });
    
    // Обновление бейджей вкладок
    const tabBadges = {
        'projects-overview': APP_STATE.projects.length,
        'documents': APP_STATE.documents.length,
        'incoming-requests': APP_STATE.stats.platformManager.newRequests,
        'active-projects': APP_STATE.stats.platformManager.activeProjects,
        'coordination': APP_STATE.stats.platformManager.coordination,
        'pm-tasks': APP_STATE.stats.projectManager.activeTasks,
        'available-tasks': APP_STATE.stats.contractor.availableTasks,
        'my-tasks': APP_STATE.stats.contractor.inProgress
    };
    
    Object.entries(tabBadges).forEach(([tabId, value]) => {
        const badge = document.querySelector(`[data-tab="${tabId}"] .tab-badge`);
        if (badge) {
            badge.textContent = value;
        }
    });
}

// Показ уведомления
function showNotification(title, message, type = 'info') {
    const notification = document.getElementById('notification');
    if (!notification) return;
    
    const titleElement = notification.querySelector('.notification-title');
    const messageElement = notification.querySelector('.notification-message');
    const icon = notification.querySelector('.notification-icon i');
    
    const colors = {
        info: 'var(--primary-600)',
        success: 'var(--success-600)',
        warning: 'var(--warning-600)',
        danger: 'var(--danger-600)'
    };
    
    const icons = {
        info: 'fas fa-info-circle',
        success: 'fas fa-check-circle',
        warning: 'fas fa-exclamation-triangle',
        danger: 'fas fa-times-circle'
    };
    
    notification.style.borderLeftColor = colors[type] || colors.info;
    icon.className = icons[type] || icons.info;
    
    titleElement.textContent = title;
    messageElement.textContent = message;
    
    notification.classList.remove('hiding');
    notification.classList.add('show');
    
    // Автоматическое скрытие
    setTimeout(() => {
        notification.classList.add('hiding');
        setTimeout(() => {
            notification.classList.remove('show');
            notification.classList.remove('hiding');
        }, 500);
    }, 4000);
}

// Получение текущего времени
function getCurrentTime() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    return `${day}.${month}.${year}, ${hours}:${minutes}`;
}

// Показать индикатор загрузки
function showLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.classList.add('active');
    }
}

// Скрыть индикатор загрузки
function hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
}

// Обновление данных
function refreshData() {
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        
        // Обновление даты
        updateCurrentDate();
        
        // Обновление статистики
        updateStatsForRole(APP_STATE.currentRole);
        
        showNotification('Данные обновлены', 'Информация успешно обновлена', 'success');
        
        logAction('Обновление данных');
    }, 1000);
}

// Логирование действий
function logAction(action) {
    APP_STATE.session.actions.push({
        timestamp: new Date().toISOString(),
        action: action,
        role: APP_STATE.currentRole
    });
    
    // Ограничение истории действий
    if (APP_STATE.session.actions.length > 50) {
        APP_STATE.session.actions.shift();
    }
}

// Инициализация вкладки Отчеты
function initReportsTab() {
    const reportsTab = document.getElementById('reports-tab');
    if (!reportsTab) return;
    
    reportsTab.innerHTML = `
        <div class="reports-dashboard">
            <div class="reports-filters card-modern">
                <h4>Фильтры отчетов</h4>
                <div class="filter-grid">
                    <div class="form-group">
                        <label>Период</label>
                        <select class="form-control input-modern">
                            <option>За последний месяц</option>
                            <option>За последний квартал</option>
                            <option>За год</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Тип отчета</label>
                        <select class="form-control input-modern">
                            <option>Все отчеты</option>
                            <option>Финансовые</option>
                            <option>Прогресс проектов</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="reports-list card-modern">
                <h4>Доступные отчеты</h4>
                <div class="reports-grid">
                    <div class="report-item">
                        <i class="fas fa-file-pdf"></i>
                        <h5>Ежемесячный отчет за январь 2026</h5>
                        <p>Финансовый отчет и статистика выполнения</p>
                        <button class="btn btn-outline btn-sm">
                            <i class="fas fa-download"></i> Скачать
                        </button>
                    </div>
                    <div class="report-item">
                        <i class="fas fa-chart-line"></i>
                        <h5>Аналитика эффективности подрядчиков</h5>
                        <p>Сравнительный анализ работы подрядчиков</p>
                        <button class="btn btn-outline btn-sm">
                            <i class="fas fa-eye"></i> Просмотреть
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Инициализация вкладки Команда
function initTeamTab() {
    const teamTab = document.getElementById('team-tab');
    if (!teamTab) return;
    
    teamTab.innerHTML = `
        <div class="team-dashboard">
            <div class="team-stats card-modern">
                <h4>Статистика команды</h4>
                <div class="stats-grid">
                    <div class="stat">
                        <div class="stat-number">12</div>
                        <div class="stat-label">Участников</div>
                    </div>
                    <div class="stat">
                        <div class="stat-number">85%</div>
                        <div class="stat-label">Занятость</div>
                    </div>
                    <div class="stat">
                        <div class="stat-number">4.7</div>
                        <div class="stat-label">Средний рейтинг</div>
                    </div>
                </div>
            </div>
            
            <div class="team-members card-modern">
                <h4>Участники команды</h4>
                <div class="members-list">
                    <div class="member-item">
                        <div class="member-avatar avatar-gradient">ИП</div>
                        <div class="member-info">
                            <h5>Иван Петров</h5>
                            <p>Проектный менеджер • Москва</p>
                        </div>
                        <div class="member-status online">В сети</div>
                    </div>
                    <div class="member-item">
                        <div class="member-avatar avatar-gradient">АС</div>
                        <div class="member-info">
                            <h5>Анна Смирнова</h5>
                            <p>Менеджер проектов • СПб</p>
                        </div>
                        <div class="member-status offline">Не в сети</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Симуляция реального времени
function startRealTimeSimulation() {
    // Обновление времени каждую минуту
    setInterval(updateCurrentDate, 60000);
    
    // Случайные обновления счетчиков
    setInterval(() => {
        if (Math.random() > 0.7) {
            simulateRealTimeUpdate();
        }
    }, 30000);
    
    // Случайные уведомления
    setInterval(() => {
        if (Math.random() > 0.8) {
            showRandomNotification();
        }
    }, 45000);
}

// Случайное обновление счетчиков
function simulateRealTimeUpdate() {
    const role = APP_STATE.currentRole;
    const stats = APP_STATE.stats[role];
    
    if (!stats) return;
    
    // Выбираем случайный счетчик для обновления
    const keys = Object.keys(stats);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    
    if (typeof stats[randomKey] === 'number') {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newValue = Math.max(0, stats[randomKey] + change);
        
        if (newValue !== stats[randomKey]) {
            stats[randomKey] = newValue;
            updateStatsForRole(role);
            
            // Визуальная обратная связь
            const element = document.getElementById(`${role}-${randomKey}`);
            if (element) {
                element.style.color = change > 0 ? 'var(--success-600)' : 'var(--danger-600)';
                setTimeout(() => {
                    element.style.color = '';
                }, 1000);
            }
        }
    }
}

// Случайные уведомления
function showRandomNotification() {
    const notifications = [
        { 
            title: 'Новая задача', 
            message: 'В вашем регионе появилась новая задача', 
            type: 'info' 
        },
        { 
            title: 'Сообщение в чате', 
            message: 'У вас новое непрочитанное сообщение', 
            type: 'info' 
        },
        { 
            title: 'Отчет проверен', 
            message: 'Ваш отчет был проверен и принят', 
            type: 'success' 
        },
        { 
            title: 'Обновление статуса', 
            message: 'Статус проекта был обновлен', 
            type: 'info' 
        }
    ];
    
    const notification = notifications[Math.floor(Math.random() * notifications.length)];
    showNotification(notification.title, notification.message, notification.type);
    
    // Увеличение счетчика непрочитанных
    APP_STATE.unreadMessages++;
    updateUnreadBadges();
}

// Глобальные функции для вызова из HTML
window.APP = {
    state: APP_STATE,
    config: PLATFORM_CONFIG,
    
    // Утилиты
    showNotification,
    openModal,
    closeModal,
    
    // Документы
    downloadDocument: function(id) {
        const doc = APP_STATE.documents.find(d => d.id === id);
        if (doc) {
            showNotification(
                'Скачивание документа',
                `Документ "${doc.name}" будет скачан`,
                'info'
            );
            doc.downloads++;
        }
    },
    
    shareDocument: function(id) {
        const doc = APP_STATE.documents.find(d => d.id === id);
        if (doc) {
            showNotification(
                'Поделиться документом',
                `Ссылка для доступа к документу "${doc.name}" скопирована в буфер обмена`,
                'success'
            );
        }
    },
    
    // Подрядчики
    contactContractor: function(id) {
        const contractor = APP_STATE.contractors.find(c => c.id === id);
        if (contractor) {
            showNotification(
                'Написать подрядчику',
                `Открывается чат с ${contractor.name}`,
                'info'
            );
            openModal('chat-modal-project');
        }
    },
    
    assignTaskToContractor: function(id) {
        const contractor = APP_STATE.contractors.find(c => c.id === id);
        if (contractor) {
            showNotification(
                'Назначение задачи',
                `Выберите задачу для назначения ${contractor.name}`,
                'info'
            );
        }
    },
    
    // Согласование
    approveCoordination: function() {
        showNotification(
            'Назначение утверждено',
            'Проектный менеджер получил уведомление о новом проекте',
            'success'
        );
    },
    
    // Обновление темы
    toggleTheme: function() {
        toggleTheme();
    },
    
    // Обновление данных
    refreshData: function() {
        refreshData();
    }
};

// Инициализация при загрузке
console.log('ADTS Platform v2.0 - Улучшенная версия');
