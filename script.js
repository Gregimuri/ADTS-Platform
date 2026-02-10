// Конфигурация платформы
const PLATFORM_CONFIG = {
    currentDate: '11.02.2026',
    dateFormat: 'DD.MM.YYYY',
    roles: {
        customer: 'Заказчик',
        platformManager: 'Менеджер платформы',
        projectManager: 'Менеджер проектов',
        contractor: 'Подрядчик'
    },
    chains: {
        customer: ['platformManager'],
        platformManager: ['customer', 'projectManager'],
        projectManager: ['platformManager', 'contractor'],
        contractor: ['projectManager']
    }
};

// Глобальное состояние
const APP_STATE = {
    currentRole: 'customer',
    notifications: [],
    chatMessages: {
        customer_platform: [],
        platform_customer: [],
        platform_project: [],
        project_platform: [],
        project_contractor: []
    },
    projects: [],
    tasks: [],
    documents: [
        {
            id: 1,
            name: 'ТЗ Проект "Магнит-Аптеки"',
            type: 'pdf',
            size: '2.4 MB',
            date: '05.02.2026',
            uploadedBy: 'Иван Петров (ПМ)'
        },
        {
            id: 2,
            name: 'Договор на оказание услуг',
            type: 'doc',
            size: '1.8 MB',
            date: '03.02.2026',
            uploadedBy: 'Менеджер платформы'
        },
        {
            id: 3,
            name: 'Смета по проекту',
            type: 'xlsx',
            size: '850 KB',
            date: '01.02.2026',
            uploadedBy: 'Анна Смирнова'
        },
        {
            id: 4,
            name: 'Акт выполненных работ #1-15',
            type: 'pdf',
            size: '3.2 MB',
            date: '10.02.2026',
            uploadedBy: 'ИП Сидоров А.В.'
        }
    ],
    contractors: [
        {
            id: 1,
            name: 'ИП Сидоров А.В.',
            rating: 4.8,
            completedTasks: 42,
            activeTasks: 3,
            specialization: 'Монтаж медиа-оборудования',
            location: 'Москва'
        },
        {
            id: 2,
            name: 'ООО "МонтажСервис"',
            rating: 4.6,
            completedTasks: 28,
            activeTasks: 2,
            specialization: 'Установка LED-экранов',
            location: 'Москва'
        },
        {
            id: 3,
            name: 'ИП Ковалев И.С.',
            rating: 4.9,
            completedTasks: 15,
            activeTasks: 1,
            specialization: 'Настройка медиасистем',
            location: 'СПб'
        }
    ],
    finances: {
        totalEarned: 128500,
        pending: 28500,
        thisMonth: 85000,
        transactions: [
            { id: 1, task: 'Установка дисплея', amount: 2800, date: '10.02.2026', type: 'income', status: 'pending' },
            { id: 2, task: 'Монтаж стойки', amount: 8500, date: '08.02.2026', type: 'income', status: 'completed' },
            { id: 3, task: 'Замена экрана', amount: 3500, date: '05.02.2026', type: 'income', status: 'completed' },
            { id: 4, task: 'Покупка инструмента', amount: 4500, date: '01.02.2026', type: 'expense', status: 'completed' }
        ]
    },
    analytics: {
        completionRate: 71.9,
        avgTaskTime: 2.4,
        costPerPoint: 8500,
        satisfactionScore: 4.7,
        monthlyTrend: [65, 68, 72, 71, 71.9]
    },
    customerPoints: {
        labels: ['Сен 2025', 'Окт 2025', 'Ноя 2025', 'Дек 2025', 'Янв 2026', 'Фев 2026'],
        data: [15, 22, 18, 25, 30, 17]
    }
};

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    initPlatform();
    initChats();
    initCharts();
    initEventListeners();
    
    // Инициализация новых функционалов
    setTimeout(() => {
        initAnalyticsTab();
        initDocumentsTab();
        initContractorsTab();
        initFinanceTab();
        initActiveProjectsTab();
        initCoordinationTab();
        initReportSubmission();
    }, 100);
    
    // Добавляем кнопки для соответствующих ролей
    addCustomerChatButton();
    addPlatformChatButton();
    
    // Показать онбординг
    setTimeout(() => {
        document.getElementById('onboarding-tour').classList.add('active');
    }, 500);
    
    // Стабилизация числовых значений
    stabilizeNumericValues();
});

// Обновляем функцию инициализации платформы для замедления прогресса
function initPlatform() {
    updateCurrentDate();
    initDemoData();
    initKanban();
    
    // Замедленная инициализация анимаций прогресса
    setTimeout(() => {
        initSlowProgressAnimations();
    }, 1000);
}

// Инициализация замедленных анимаций прогресса
function initSlowProgressAnimations() {
    // Замедляем анимацию прогресса выполнения проектов
    const progressFills = document.querySelectorAll('.progress-fill');
    progressFills.forEach(fill => {
        // Добавляем CSS класс для замедленной анимации
        fill.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Перезапускаем анимацию с задержкой
        const currentWidth = fill.style.width;
        fill.style.width = '0%';
        
        setTimeout(() => {
            fill.style.width = currentWidth;
        }, 100);
    });
    
    // Замедляем анимацию иконок в карточках проектов
    const projectIcons = document.querySelectorAll('.project-item .status-badge i');
    projectIcons.forEach(icon => {
        if (icon.classList.contains('fa-spinner')) {
            icon.style.animation = 'spin 1.5s linear infinite';
        }
    });
    
    // Замедляем анимацию иконки в заголовке
    const titleIcon = document.querySelector('.dashboard-title-icon i');
    if (titleIcon) {
        titleIcon.style.animation = 'slowPulse 4s infinite';
    }
}

// Обновление текущей даты
function updateCurrentDate() {
    const dateElements = document.querySelectorAll('.dashboard-subtitle, .current-date');
    dateElements.forEach(el => {
        if (el.classList.contains('current-date')) {
            el.textContent = PLATFORM_CONFIG.currentDate;
        } else if (el.textContent.includes('•')) {
            const parts = el.textContent.split('•');
            parts[parts.length - 1] = PLATFORM_CONFIG.currentDate;
            el.textContent = parts.join(' • ');
        }
    });
}

// Инициализация демо-данных
function initDemoData() {
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
            regions: ['Москва', 'СПб', 'Казань'],
            description: 'Установка медиа-панелей Samsung 55" в 25 аптеках сети "Магнит"'
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
            regions: ['Москва', 'МО', 'СПб'],
            description: 'Замена устаревших LED-экранов на новые модели'
        }
    ];

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
            published: '15 мин назад'
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
            published: '1 час назад'
        }
    ];
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
                read: true
            },
            {
                id: 2,
                sender: 'platformManager',
                message: 'Уточните, пожалуйста, по 5 точкам в Омске. По адресам есть расхождения с базой.',
                timestamp: '11.02.2026, 10:20',
                read: true
            },
            {
                id: 3,
                sender: 'customer',
                message: 'Добрый день! Спасибо за оперативный ответ. Уточню с отделом логистики и отправлю точные адреса сегодня до 18:00.',
                timestamp: '11.02.2026, 10:25',
                read: true
            }
        ],
        platform_customer: [
            {
                id: 1,
                sender: 'customer',
                message: 'По проекту "Пятерочка" нужно срочно добавить еще 10 точек.',
                timestamp: '11.02.2026, 09:30',
                read: true
            },
            {
                id: 2,
                sender: 'platformManager',
                message: 'Добрый день! Уточните, пожалуйста, регионы для этих точек.',
                timestamp: '11.02.2026, 09:45',
                read: true
            }
        ],
        platform_project: [
            {
                id: 1,
                sender: 'projectManager',
                message: 'По проекту "Магнит-Аптеки" в Москве выполнено 12 из 25 точек. Есть проблема с точкой #15 - нужен доступ в серверную.',
                timestamp: '10.02.2026, 16:30',
                read: true
            },
            {
                id: 2,
                sender: 'platformManager',
                message: 'Запросил доступ у заказчика. Ответ будет сегодня. По остальным точкам какие сроки?',
                timestamp: '10.02.2026, 16:45',
                read: true
            }
        ],
        project_platform: [
            {
                id: 1,
                sender: 'platformManager',
                message: 'По проекту "Ашан" требуются дополнительные чертежи от заказчика.',
                timestamp: '10.02.2026, 14:20',
                read: true
            },
            {
                id: 2,
                sender: 'projectManager',
                message: 'Понял, ожидаю от вас чертежи, чтобы передать подрядчикам.',
                timestamp: '10.02.2026, 14:35',
                read: true
            }
        ],
        project_contractor: [
            {
                id: 1,
                sender: 'contractor',
                message: 'По задаче в ТЦ "Авиапарк" уточните высоту установки интерактивной стойки. На месте ограничение по высоте 2.2м.',
                timestamp: '10.02.2026, 14:20',
                read: true
            },
            {
                id: 2,
                sender: 'projectManager',
                message: 'Высота установки 1.8м от пола. Это указано в ТЗ. Если есть ограничения, можно опустить до 1.6м.',
                timestamp: '10.02.2026, 14:35',
                read: true
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
                    }
                },
                cutout: '70%'
            }
        });
    }
}

// Инициализация обработчиков событий
function initEventListeners() {
    initOnboarding();
    initRoleSwitching();
    initTabs();
    initModals();
    initActionButtons();
    initDragAndDrop();
    initChatEvents();
    
    // Инициализация фильтров аналитики
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('time-filter-btn')) {
            const buttons = e.target.parentElement.querySelectorAll('.time-filter-btn');
            buttons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            showNotification('Период изменен', 'Данные обновлены для выбранного периода', 'info');
        }
    });
}

// Онбординг
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
        showNotification('Демонстрация начата!', 'Переключайтесь между ролями, чтобы протестировать все функции платформы.');
    });
    
    function updateTourProgress() {
        tourProgressDots.forEach(dot => dot.classList.remove('active'));
        document.querySelector(`.tour-progress-dot[data-step="${currentTourStep}"]`).classList.add('active');
    }
}

// Переключения ролей для повторной инициализации замедлений
function initRoleSwitching() {
    document.querySelectorAll('.role-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const role = this.dataset.role;
            
            document.querySelectorAll('.role-btn').forEach(b => {
                b.classList.remove('active');
                b.style.transform = 'translateY(0)';
            });
            this.classList.add('active');
            this.style.transform = 'translateY(-2px)';
            
            document.querySelectorAll('.role-section').forEach(section => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    section.classList.remove('active');
                }, 300); // Замедлено с 200
            });
            
            setTimeout(() => {
                const section = document.getElementById(`${role}-section`);
                section.classList.add('active');
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 10);
                
                APP_STATE.currentRole = role;
                
                showNotification(
                    `Режим: ${PLATFORM_CONFIG.roles[role]}`,
                    'Теперь вы можете тестировать функционал этой роли'
                );
                
                // Стабилизация значений после переключения
                setTimeout(stabilizeNumericValues, 100);
                
                // Повторная инициализация замедленных анимаций
                if (role === 'customer') {
                    setTimeout(initSlowProgressAnimations, 500);
                }
            }, 300); // Замедлено с 200
        });
    });
}


// Табы
function initTabs() {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            const parentSection = this.closest('.role-section');
            
            parentSection.querySelectorAll('.tab').forEach(t => {
                t.classList.remove('active');
                t.style.transform = 'translateY(0)';
            });
            this.classList.add('active');
            this.style.transform = 'translateY(-1px)';
            
            parentSection.querySelectorAll('.tab-content').forEach(content => {
                content.style.opacity = '0';
                content.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    content.classList.remove('active');
                }, 300); // Замедлено с 200
            });
            
            setTimeout(() => {
                const content = parentSection.querySelector(`#${tabId}-tab`);
                content.classList.add('active');
                setTimeout(() => {
                    content.style.opacity = '1';
                    content.style.transform = 'translateY(0)';
                }, 10);
                
                // Инициализация контента для новых вкладок
                if (tabId === 'analytics') {
                    setTimeout(initAnalyticsTab, 100); // Замедлено с 50
                } else if (tabId === 'documents') {
                    setTimeout(initDocumentsTab, 100); // Замедлено с 50
                } else if (tabId === 'active-projects') {
                    setTimeout(initActiveProjectsTab, 100); // Замедлено с 50
                } else if (tabId === 'coordination') {
                    setTimeout(initCoordinationTab, 100); // Замедлено с 50
                } else if (tabId === 'pm-contractors') {
                    setTimeout(initContractorsTab, 100); // Замедлено с 50
                } else if (tabId === 'contractor-finance') {
                    setTimeout(initFinanceTab, 100); // Замедлено с 50
                }
                
                // Повторная инициализация замедленных анимаций для заказчика
                if (parentSection.id === 'customer-section') {
                    setTimeout(initSlowProgressAnimations, 300);
                }
            }, 300); // Замедлено с 200
        });
    });
}

// Модальные окна
function initModals() {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close');
    
    // Открытие модальных окон
    document.getElementById('create-project-btn')?.addEventListener('click', () => {
        openModal('project-modal');
    });
    
    document.getElementById('customer-chat-btn')?.addEventListener('click', () => {
        openModal('chat-modal-customer');
    });
    
    document.getElementById('platform-chat-btn')?.addEventListener('click', () => {
        openModal('chat-modal-platform');
    });
    
    document.getElementById('pm-platform-chat-btn')?.addEventListener('click', () => {
        openModal('chat-modal-platform');
    });
    
    document.getElementById('pm-chat-btn')?.addEventListener('click', () => {
        openModal('chat-modal-project');
    });
    
    document.getElementById('contractor-chat-btn')?.addEventListener('click', () => {
        openModal('chat-modal-project');
    });
    
    document.getElementById('platform-customer-chat-btn')?.addEventListener('click', () => {
        let modal = document.getElementById('chat-modal-customer-platform');
        if (!modal) {
            modal = initChatWithCustomer();
        }
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Кнопки чата в карточках
    document.querySelectorAll('.project-chat-btn, .request-chat-btn, .chat-with-contractor-btn, .chat-with-pm-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const role = APP_STATE.currentRole;
            switch(role) {
                case 'customer':
                    openModal('chat-modal-customer');
                    break;
                case 'platform-manager':
                    let modal = document.getElementById('chat-modal-customer-platform');
                    if (!modal) {
                        modal = initChatWithCustomer();
                    }
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    break;
                case 'project-manager':
                    openModal('chat-modal-project');
                    break;
                case 'contractor':
                    openModal('chat-modal-project');
                    break;
            }
        });
    });
    
    // Закрытие модальных окон
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
    
    document.getElementById('project-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        closeModal(document.getElementById('project-modal'));
        showNotification(
            'Заявка отправлена!',
            'Менеджер платформы свяжется с вами в ближайшее время для уточнения деталей.'
        );
        this.reset();
    });
    
    // Инициализация чата заказчика после загрузки DOM
    setTimeout(() => {
        initCustomerChatEvents();
    }, 500);
}

// Инициализация событий чата заказчика
function initCustomerChatEvents() {
    const sendBtn = document.getElementById('send-customer-message');
    const input = document.getElementById('chat-customer-input');
    const messagesContainer = document.getElementById('chat-customer-messages');
    
    if (sendBtn && input && messagesContainer) {
        sendBtn.addEventListener('click', () => sendCustomerChatMessage(input, messagesContainer));
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendCustomerChatMessage(input, messagesContainer);
            }
        });
        
        // Инициализация выбора контактов в чате заказчика
        document.querySelectorAll('#chat-modal-customer .chat-contact-item').forEach(item => {
            item.addEventListener('click', function() {
                document.querySelectorAll('#chat-modal-customer .chat-contact-item').forEach(i => {
                    i.classList.remove('active');
                });
                this.classList.add('active');
                
                const contactName = this.querySelector('strong').textContent;
                showNotification('Контакт выбран', `Теперь вы общаетесь с ${contactName}`);
            });
        });
    }
}

// Отправка сообщения в чате заказчика
function sendCustomerChatMessage(inputElement, messagesContainer) {
    const message = inputElement.value.trim();
    if (!message) return;
    
    const messageElement = document.createElement('div');
    messageElement.className = 'message outgoing';
    messageElement.innerHTML = `
        <div class="message-content">
            <div class="message-header">
                <strong>Вы (Заказчик)</strong>
                <span>${getCurrentTime()}</span>
            </div>
            <p>${message}</p>
        </div>
    `;
    
    messagesContainer.appendChild(messageElement);
    inputElement.value = '';
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    APP_STATE.chatMessages.customer_platform.push({
        id: Date.now(),
        sender: 'customer',
        message: message,
        timestamp: getCurrentTime(),
        read: true
    });
    
    // Замедленный ответ
    setTimeout(() => {
        const responses = [
            "Спасибо за сообщение! Рассмотрю ваш вопрос и вернусь с ответом.",
            "Понял. Уточню информацию и дам обратную связь.",
            "Хорошо, принял к сведению. Продолжаем работу по проекту.",
            "Отлично! Обновлю информацию в системе и сообщу о результатах."
        ];
        
        const response = responses[Math.floor(Math.random() * responses.length)];
        
        const responseElement = document.createElement('div');
        responseElement.className = 'message incoming';
        responseElement.innerHTML = `
            <div class="message-avatar">МП</div>
            <div class="message-content">
                <div class="message-header">
                    <strong>Менеджер платформы</strong>
                    <span>${getCurrentTime()}</span>
                </div>
                <p>${response}</p>
            </div>
        `;
        
        messagesContainer.appendChild(responseElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        APP_STATE.chatMessages.customer_platform.push({
            id: Date.now(),
            sender: 'platformManager',
            message: response,
            timestamp: getCurrentTime(),
            read: true
        });
    }, 1500); // Замедленный ответ
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Замедленная прокрутка чатов вниз при открытии
        setTimeout(() => {
            const messagesContainer = modal.querySelector('.chat-messages');
            if (messagesContainer) {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
            
            // Замедленная анимация для модального окна
            modal.style.animation = 'fadeIn 0.4s ease-out';
            const modalContent = modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.style.animation = 'slideIn 0.5s ease-out';
            }
        }, 50);
    }
}

function closeModal(modal) {
    modal.classList.remove('active');
    // Замедленное восстановление скролла
    setTimeout(() => {
        document.body.style.overflow = 'auto';
    }, 300); // Замедлено с 200
}

// Кнопки действий
function initActionButtons() {
    // Принятие задачи подрядчиком
    document.querySelectorAll('.accept-task-feed-btn, .accept-task-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const taskCard = this.closest('.task-feed-item, .task-card');
            const taskTitle = taskCard.querySelector('h4').textContent;
            const taskPrice = taskCard.querySelector('.task-price')?.textContent || '';
            
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Принимается...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i> Задача принята';
                this.classList.remove('btn-primary');
                this.classList.add('btn-secondary');
                this.disabled = true;
                
                const statusElement = taskCard.querySelector('.status-badge');
                if (statusElement) {
                    statusElement.innerHTML = '<i class="fas fa-clock"></i> Ожидает подтверждения';
                    statusElement.className = 'status-badge status-in-progress';
                }
                
                showNotification(
                    'Задача принята!',
                    `"${taskTitle}" теперь в ваших активных задачах${taskPrice ? `. Сумма: ${taskPrice}` : ''}`
                );
                
                // Обновление счетчика доступных задач
                updateContractorTaskCounter(-1);
                
                setTimeout(() => {
                    showNotification(
                        'Новый подрядчик',
                        'Подрядчик принял вашу задачу. Свяжитесь с ним для уточнения деталей.',
                        'info'
                    );
                }, 1500);
            }, 1500);
        });
    });
    
    // Публикация задачи
    document.querySelectorAll('.publish-task-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const taskCard = this.closest('.kanban-task');
            const taskTitle = taskCard.querySelector('h5').textContent;
            
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Публикуется...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i> Опубликовано';
                this.classList.remove('btn-outline');
                this.classList.add('btn-secondary');
                this.disabled = true;
                
                const nextColumn = taskCard.closest('.kanban-column').nextElementSibling;
                if (nextColumn) {
                    const tasksContainer = nextColumn.querySelector('.kanban-tasks');
                    tasksContainer.appendChild(taskCard);
                    updateKanbanCounters();
                    
                    // Обновление счетчика доступных задач у подрядчиков
                    updateContractorTaskCounter(1);
                }
                
                showNotification(
                    'Задача опубликована!',
                    `"${taskTitle}" теперь видна всем подрядчикам в вашем регионе.`
                );
            }, 1500);
        });
    });
    
    // Принятие отчета
    document.querySelectorAll('.accept-report-btn, .check-report-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const reportCard = this.closest('.report-card, .kanban-task');
            
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Проверяется...';
            this.disabled = true;
            
            setTimeout(() => {
                if (reportCard.classList.contains('report-card')) {
                    reportCard.innerHTML = `
                        <div style="text-align: center; padding: 40px;">
                            <i class="fas fa-check-circle" style="font-size: 48px; color: var(--secondary); margin-bottom: 20px;"></i>
                            <h3 style="color: var(--secondary); margin-bottom: 10px;">Отчет принят!</h3>
                            <p style="color: var(--gray-600);">Точка выполнена и отобразится у заказчика.</p>
                        </div>
                    `;
                } else {
                    reportCard.innerHTML = `
                        <div style="text-align: center; padding: 20px;">
                            <i class="fas fa-check-circle" style="font-size: 32px; color: var(--secondary); margin-bottom: 10px;"></i>
                            <p style="color: var(--secondary); font-weight: 600;">Отчет принят</p>
                        </div>
                    `;
                }
                
                showNotification(
                    'Отчет принят!',
                    'Работа выполнена качественно. Точка отмечена как выполненная.'
                );
                
                setTimeout(() => {
                    showNotification(
                        'Новая точка выполнена',
                        'В вашем проекте выполнена еще одна точка.',
                        'info'
                    );
                }, 1500);
            }, 1500);
        });
    });
    
    // Отправка на доработку
    document.querySelectorAll('.request-revision-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const reportCard = this.closest('.report-card');
            
            const commentField = document.createElement('div');
            commentField.className = 'revision-comment';
            commentField.innerHTML = `
                <div class="form-group">
                    <label class="form-label">
                        <i class="fas fa-comment"></i> Укажите замечания
                    </label>
                    <textarea class="form-control" rows="3" placeholder="Что нужно исправить в работе..."></textarea>
                </div>
                <div class="text-right">
                    <button class="btn btn-danger" id="send-revision">
                        <i class="fas fa-redo"></i> Отправить на доработку
                    </button>
                </div>
            `;
            
            reportCard.appendChild(commentField);
            
            this.style.display = 'none';
            reportCard.querySelector('.accept-report-btn').style.display = 'none';
            
            setTimeout(() => {
                document.getElementById('send-revision').addEventListener('click', function() {
                    const comment = reportCard.querySelector('textarea').value;
                    
                    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправляется...';
                    this.disabled = true;
                    
                    setTimeout(() => {
                        reportCard.innerHTML = `
                            <div style="text-align: center; padding: 40px;">
                                <i class="fas fa-redo" style="font-size: 48px; color: var(--warning); margin-bottom: 20px;"></i>
                                <h3 style="color: var(--warning); margin-bottom: 10px;">Отправлено на доработку</h3>
                                <p style="color: var(--gray-600); margin-bottom: 15px;">Подрядчик получил ваши замечания и исправит работу.</p>
                                ${comment ? `<p style="color: var(--gray-500); font-size: 14px;">Ваш комментарий: "${comment}"</p>` : ''}
                            </div>
                        `;
                        
                        showNotification(
                            'Отправлено на доработку',
                            'Подрядчик получил ваши замечания'
                        );
                        
                        setTimeout(() => {
                            showNotification(
                                'Замечания по работе',
                                'Проектный менеджер отправил замечания по вашей работе.',
                                'warning'
                            );
                        }, 1500);
                    }, 1500);
                });
            }, 10);
        });
    });
    
    // Назначение проектным менеджерам
    document.querySelectorAll('.assign-pm-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const pmItem = this.closest('.pm-item');
            const pmName = pmItem.querySelector('strong').textContent;
            
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Назначается...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i> Назначен';
                this.classList.remove('btn-outline');
                this.classList.add('btn-secondary');
                this.disabled = true;
                
                showNotification(
                    'Проектный менеджер назначен',
                    `${pmName} получил уведомление о новом проекте.`
                );
            }, 1500);
        });
    });
}

// Drag and drop
function initDragAndDrop() {
    const tasks = document.querySelectorAll('.kanban-task');
    const columns = document.querySelectorAll('.kanban-column');
    
    tasks.forEach(task => {
        task.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', this.dataset.id);
            this.style.opacity = '0.5';
        });
        
        task.addEventListener('dragend', function() {
            this.style.opacity = '1';
        });
    });
    
    columns.forEach(column => {
        column.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.backgroundColor = 'rgba(37, 99, 235, 0.05)';
        });
        
        column.addEventListener('dragleave', function() {
            this.style.backgroundColor = '';
        });
        
        column.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.backgroundColor = '';
            
            const taskId = e.dataTransfer.getData('text/plain');
            const task = document.querySelector(`.kanban-task[data-id="${taskId}"]`);
            if (task) {
                const tasksContainer = this.querySelector('.kanban-tasks');
                tasksContainer.appendChild(task);
                
                updateKanbanCounters();
                
                showNotification(
                    'Задача перемещена',
                    'Задача успешно перемещена в другую колонку'
                );
            }
        });
    });
}

function updateKanbanCounters() {
    document.querySelectorAll('.kanban-column').forEach(column => {
        const count = column.querySelectorAll('.kanban-task').length;
        const counter = column.querySelector('.kanban-count');
        if (counter) {
            counter.textContent = count;
        }
    });
}

// Инициализация Kanban
function initKanban() {
    updateKanbanCounters();
}

// Чат
function initChatEvents() {
    const chatConfigs = [
        { id: 'customer', button: 'send-customer-message', input: 'chat-customer-input', messages: 'chat-customer-messages', chain: 'customer_platform' },
        { id: 'platform', button: 'send-platform-message', input: 'chat-platform-input', messages: 'chat-platform-messages', chain: 'platform_project' },
        { id: 'project', button: 'send-project-message', input: 'chat-project-input', messages: 'chat-project-messages', chain: 'project_contractor' }
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
        }
    });
    
    document.querySelectorAll('.chat-contact-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.chat-contact-item').forEach(i => {
                i.classList.remove('active');
            });
            this.classList.add('active');
            
            showNotification('Контакт выбран', 'Теперь вы можете общаться с выбранным пользователем');
        });
    });
}

function sendChatMessage(chainId, inputElement, messagesContainer) {
    const message = inputElement.value.trim();
    if (!message) return;
    
    const messageElement = document.createElement('div');
    messageElement.className = 'message outgoing';
    messageElement.innerHTML = `
        <div class="message-content">
            <div class="message-header">
                <strong>Вы (${PLATFORM_CONFIG.roles[APP_STATE.currentRole]})</strong>
                <span>${getCurrentTime()}</span>
            </div>
            <p>${message}</p>
        </div>
    `;
    
    messagesContainer.appendChild(messageElement);
    inputElement.value = '';
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    APP_STATE.chatMessages[chainId].push({
        id: Date.now(),
        sender: APP_STATE.currentRole,
        message: message,
        timestamp: getCurrentTime(),
        read: true
    });
    
    setTimeout(() => {
        const responses = {
            customer_platform: [
                "Спасибо за информацию! Ожидаем уточненные документы.",
                "Понял. Уточню детали и вернусь с ответом.",
                "Отлично! Начнем обработку вашей заявки."
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
        
        const response = responses[chainId]?.[Math.floor(Math.random() * responses[chainId].length)] || "Сообщение получено.";
        
        const responseElement = document.createElement('div');
        responseElement.className = 'message incoming';
        
        let avatar = '?';
        let name = 'Пользователь';
        
        switch(chainId) {
            case 'customer_platform':
                avatar = 'МП';
                name = 'Менеджер платформы';
                break;
            case 'platform_project':
                avatar = 'ИП';
                name = 'Иван Петров (ПМ Москва)';
                break;
            case 'project_contractor':
                avatar = 'ИС';
                name = 'ИП Сидоров А.В.';
                break;
        }
        
        responseElement.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">
                <div class="message-header">
                    <strong>${name}</strong>
                    <span>${getCurrentTime()}</span>
                </div>
                <p>${response}</p>
            </div>
        `;
        
        messagesContainer.appendChild(responseElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        APP_STATE.chatMessages[chainId].push({
            id: Date.now(),
            sender: chainId.split('_')[1],
            message: response,
            timestamp: getCurrentTime(),
            read: true
        });
    }, 2000);
}

// Инициализация вкладки Аналитика (для заказчика)
function initAnalyticsTab() {
    const analyticsTab = document.getElementById('analytics-tab');
    if (!analyticsTab) return;
    
    // Данные для карты точек
    const projectPoints = [
        { id: 1, address: 'ул. Тверская, 25', status: 'completed', project: 'Магнит-Аптеки' },
        { id: 2, address: 'пр. Мира, 42', status: 'completed', project: 'Магнит-Аптеки' },
        { id: 3, address: 'ул. Ленина, 15', status: 'in-progress', project: 'Магнит-Аптеки' },
        { id: 4, address: 'ул. Пушкина, 10', status: 'pending', project: 'Магнит-Аптеки' },
        { id: 5, address: 'пр. Ленинградский, 30', status: 'completed', project: 'Лента' },
        { id: 6, address: 'ул. Садовая, 5', status: 'completed', project: 'Лента' }
    ];
    
    analyticsTab.innerHTML = `
        <div class="analytics-grid">
            <div class="analytics-card wide">
                <div class="analytics-header">
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
            
            <div class="project-points-map">
                <h4>Карта точек проекта "Магнит-Аптеки"</h4>
                <div class="map-container">
                    <div class="map-placeholder">
                        <i class="fas fa-map-marked-alt"></i>
                        <p>Карта точек установки оборудования</p>
                        <small>Всего точек: ${APP_STATE.customerPoints.data.reduce((a, b) => a + b, 0)}</small>
                    </div>
                </div>
                
                <div class="map-points-list">
                    ${projectPoints.map(point => `
                        <div class="map-point-item">
                            <div class="map-point-header">
                                <strong>Точка #${point.id}</strong>
                                <span class="map-point-status ${point.status}">
                                    ${point.status === 'completed' ? 'Выполнено' : 
                                      point.status === 'in-progress' ? 'В работе' : 'Ожидает'}
                                </span>
                            </div>
                            <div class="map-point-address">
                                <i class="fas fa-map-marker-alt"></i> ${point.address}
                            </div>
                            <div class="map-point-project">
                                <i class="fas fa-project-diagram"></i> ${point.project}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    setTimeout(() => {
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
                            position: 'top',
                            labels: {
                                font: {
                                    size: 14
                                }
                            }
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
                                text: 'Количество точек',
                                font: {
                                    size: 14,
                                    weight: 'bold'
                                }
                            },
                            ticks: {
                                stepSize: 5
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Период',
                                font: {
                                    size: 14,
                                    weight: 'bold'
                                }
                            }
                        }
                    }
                }
            });
        }
        
        // Обработчики для фильтров времени
        document.querySelectorAll('.time-filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.time-filter-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const period = this.textContent;
                let newData = [...APP_STATE.customerPoints.data];
                
                if (period === 'Год') {
                    newData = [10, 15, 12, 18, 22, 25, 20, 18, 22, 28, 30, 17];
                } else if (period === 'Все время') {
                    newData = [8, 12, 10, 15, 18, 22, 20, 25, 28, 30, 32, 35, 30, 28, 32, 35, 38, 40];
                }
                
                // Обновление графика
                const chart = Chart.getChart('customer-points-chart');
                if (chart) {
                    chart.data.datasets[0].data = newData;
                    chart.update();
                }
                
                showNotification('Данные обновлены', `Показаны данные за период: ${period}`, 'info');
            });
        });
    }, 100);
}

// Инициализация вкладки Документы
function initDocumentsTab() {
    const documentsTab = document.getElementById('documents-tab');
    if (!documentsTab) return;
    
    documentsTab.innerHTML = `
        <div class="documents-header">
            <div class="action-buttons">
                <button class="btn btn-primary" id="upload-document-btn">
                    <i class="fas fa-upload"></i> Загрузить документ
                </button>
                <button class="btn btn-outline" id="filter-documents-btn">
                    <i class="fas fa-filter"></i> Фильтр
                </button>
            </div>
        </div>
        
        <div class="documents-grid">
            ${APP_STATE.documents.map(doc => `
                <div class="document-card" data-id="${doc.id}">
                    <div class="document-icon">
                        <i class="fas fa-file-${doc.type === 'pdf' ? 'pdf' : doc.type === 'doc' ? 'word' : 'excel'}"></i>
                    </div>
                    <h4 class="document-name">${doc.name}</h4>
                    <p class="document-meta">
                        <span><i class="fas fa-weight"></i> ${doc.size}</span>
                        <span><i class="fas fa-calendar"></i> ${doc.date}</span>
                    </p>
                    <p class="document-author">
                        <i class="fas fa-user"></i> ${doc.uploadedBy}
                    </p>
                    <div class="document-actions">
                        <button class="btn btn-outline btn-sm" onclick="downloadDocument(${doc.id})">
                            <i class="fas fa-download"></i> Скачать
                        </button>
                        <button class="btn btn-outline btn-sm" onclick="shareDocument(${doc.id})">
                            <i class="fas fa-share"></i> Поделиться
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    document.getElementById('upload-document-btn')?.addEventListener('click', () => {
        showNotification('Загрузка документа', 'Функция загрузки документа будет доступна в следующем обновлении', 'info');
    });
    
    document.getElementById('filter-documents-btn')?.addEventListener('click', () => {
        showNotification('Фильтр документов', 'Фильтрация документов будет доступна в следующем обновлении', 'info');
    });
}

// Инициализация вкладки Подрядчики
function initContractorsTab() {
    const contractorsTab = document.getElementById('pm-contractors-tab');
    if (!contractorsTab) return;
    
    contractorsTab.innerHTML = `
        <div class="contractors-grid">
            ${APP_STATE.contractors.map(contractor => `
                <div class="contractor-card">
                    <div class="contractor-avatar">${contractor.name.charAt(0)}</div>
                    <h4>${contractor.name}</h4>
                    <p class="contractor-specialization">${contractor.specialization}</p>
                    <p class="contractor-location">
                        <i class="fas fa-map-marker-alt"></i> ${contractor.location}
                    </p>
                    <div class="contractor-rating">
                        ${Array.from({length: 5}, (_, i) => `
                            <i class="fas fa-star${i < Math.floor(contractor.rating) ? '' : '-half-alt'}"></i>
                        `).join('')}
                        <span>${contractor.rating}</span>
                    </div>
                    <div class="contractor-stats">
                        <div>
                            <span class="stat-number">${contractor.completedTasks}</span>
                            <span class="stat-label-small">Выполнено</span>
                        </div>
                        <div>
                            <span class="stat-number">${contractor.activeTasks}</span>
                            <span class="stat-label-small">Активно</span>
                        </div>
                    </div>
                    <div class="contractor-actions mt-4">
                        <button class="btn btn-outline btn-sm w-full" onclick="contactContractor(${contractor.id})">
                            <i class="fas fa-comment"></i> Написать
                        </button>
                        <button class="btn btn-primary btn-sm w-full mt-2" onclick="assignTaskToContractor(${contractor.id})">
                            <i class="fas fa-tasks"></i> Назначить задачу
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
}

// Инициализация вкладки Финансы
function initFinanceTab() {
    const financeTab = document.getElementById('contractor-finance-tab');
    if (!financeTab) return;
    
    const { finances } = APP_STATE;
    
    financeTab.innerHTML = `
        <div class="finance-overview">
            <div class="finance-card">
                <div class="stat-icon">
                    <i class="fas fa-wallet"></i>
                </div>
                <div class="stat-label">Общий доход</div>
                <div class="stat-value">${finances.totalEarned.toLocaleString()} ₽</div>
            </div>
            
            <div class="finance-card">
                <div class="stat-icon">
                    <i class="fas fa-clock"></i>
                </div>
                <div class="stat-label">Ожидает выплаты</div>
                <div class="stat-value">${finances.pending.toLocaleString()} ₽</div>
            </div>
            
            <div class="finance-card">
                <div class="stat-icon">
                    <i class="fas fa-calendar-alt"></i>
                </div>
                <div class="stat-label">За февраль</div>
                <div class="stat-value">${finances.thisMonth.toLocaleString()} ₽</div>
            </div>
        </div>
        
        <div class="transactions-section">
            <h4 class="card-title">
                <i class="fas fa-exchange-alt"></i> История операций
            </h4>
            
            <div class="transactions-list">
                ${finances.transactions.map(transaction => `
                    <div class="transaction-item">
                        <div class="transaction-info">
                            <div class="transaction-icon">
                                <i class="fas fa-${transaction.type === 'income' ? 'arrow-down' : 'arrow-up'}"></i>
                            </div>
                            <div>
                                <strong>${transaction.task}</strong>
                                <div class="transaction-date">${transaction.date}</div>
                            </div>
                        </div>
                        <div class="transaction-amount ${transaction.type === 'income' ? 'income' : 'expense'}">
                            ${transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()} ₽
                            <div class="transaction-status ${transaction.status}">
                                ${transaction.status === 'pending' ? 'Ожидает' : 'Выплачено'}
                            </div>
                        </div>
                    </div>
                `).join('')}
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
    
    document.getElementById('request-payment-btn')?.addEventListener('click', () => {
        showNotification(
            'Запрос на выплату отправлен',
            'Менеджер платформы получил ваш запрос. Выплата будет произведена в течение 3 рабочих дней.',
            'success'
        );
    });
    
    document.getElementById('export-finance-btn')?.addEventListener('click', () => {
        showNotification(
            'Отчет выгружен',
            'Финансовый отчет успешно сохранен в формате PDF',
            'success'
        );
    });
}

// Инициализация вкладки Активные проекты
function initActiveProjectsTab() {
    const activeTab = document.getElementById('active-projects-tab');
    if (!activeTab) return;
    
    activeTab.innerHTML = `
        <div class="active-projects-grid">
            <div class="active-project-card">
                <div class="project-header">
                    <h4>Проект "Пятерочка"</h4>
                    <span class="badge badge-primary">Активный</span>
                </div>
                <p class="project-client">
                    <i class="fas fa-building"></i> Компания "Пятерочка"
                </p>
                <div class="project-progress-small">
                    <div class="progress-header">
                        <span>35%</span>
                        <span>42/120 точек</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 35%"></div>
                    </div>
                </div>
                <div class="project-team">
                    <span>Команда:</span>
                    <div class="team-avatar">ИП</div>
                    <div class="team-avatar">АС</div>
                    <div class="team-avatar">+3</div>
                </div>
                <div class="project-actions mt-3">
                    <button class="btn btn-outline btn-sm project-details-btn">
                        <i class="fas fa-eye"></i> Подробнее
                    </button>
                    <button class="btn btn-primary btn-sm project-update-btn">
                        <i class="fas fa-sync-alt"></i> Обновить статус
                    </button>
                </div>
            </div>
            
            <div class="active-project-card">
                <div class="project-header">
                    <h4>Проект "Ашан"</h4>
                    <span class="badge badge-warning">На согласовании</span>
                </div>
                <p class="project-client">
                    <i class="fas fa-building"></i> "Ашан Ритейл"
                </p>
                <div class="project-progress-small">
                    <div class="progress-header">
                        <span>0%</span>
                        <span>0/45 точек</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 0%"></div>
                    </div>
                </div>
                <div class="project-actions mt-3">
                    <button class="btn btn-outline btn-sm customer-chat-btn">
                        <i class="fas fa-comment"></i> Чат с заказчиком
                    </button>
                    <button class="btn btn-primary btn-sm start-project-btn">
                        <i class="fas fa-play"></i> Начать проект
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Обработчики для кнопок активных проектов
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
    
    document.querySelectorAll('.customer-chat-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            let modal = document.getElementById('chat-modal-customer-platform');
            if (!modal) {
                modal = initChatWithCustomer();
            }
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    document.querySelectorAll('.start-project-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            showNotification('Проект запущен', 'Проект переведен в активную фазу', 'success');
        });
    });
}

// Инициализация вкладки Согласование
function initCoordinationTab() {
    const coordinationTab = document.getElementById('coordination-tab');
    if (!coordinationTab) return;
    
    coordinationTab.innerHTML = `
        <div class="coordination-list">
            <div class="coordination-item">
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
                    <button class="btn btn-outline customer-chat-btn">
                        <i class="fas fa-comment"></i> Обсудить с заказчиком
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Обработчик для кнопки чата с заказчиком
    document.querySelectorAll('.customer-chat-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            let modal = document.getElementById('chat-modal-customer-platform');
            if (!modal) {
                modal = initChatWithCustomer();
            }
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
}

// Инициализация функционала "Сдать отчет"
function initReportSubmission() {
    const reportBtn = document.querySelector('.submit-report-btn');
    const uploadReportBtn = document.getElementById('upload-report-contractor');
    
    const initReportModal = () => {
        const reportModal = document.createElement('div');
        reportModal.className = 'modal';
        reportModal.id = 'report-modal';
        reportModal.innerHTML = `
            <div class="modal-content">
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
                            <select class="form-control" id="report-task-select">
                                <option value="1">Монтаж интерактивной стойки (ТЦ "Авиапарк")</option>
                                <option value="2">Установка дисплея покупателя ("Лента", пр. Мира)</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">
                                <i class="fas fa-comment"></i> Комментарий
                            </label>
                            <textarea class="form-control" rows="4" placeholder="Опишите выполненную работу, особенности монтажа, использованные материалы..."></textarea>
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
                            <input type="text" class="form-control" placeholder="Введите вашу подпись" value="ИП Сидоров А.В." readonly>
                        </div>
                        
                        <div class="form-group text-center">
                            <button type="submit" class="btn btn-primary btn-lg">
                                <i class="fas fa-paper-plane"></i> Сдать отчет
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        document.body.appendChild(reportModal);
        
        const closeBtn = reportModal.querySelector('.modal-close');
        const form = reportModal.querySelector('#report-form');
        const uploadArea = reportModal.querySelector('#report-upload-area');
        
        closeBtn.addEventListener('click', () => {
            reportModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        uploadArea.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.multiple = true;
            
            input.addEventListener('change', (e) => {
                const files = Array.from(e.target.files);
                const previewGrid = document.getElementById('photo-preview-grid');
                
                files.forEach((file, index) => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const photoItem = document.createElement('div');
                        photoItem.className = 'photo-preview-item';
                        photoItem.innerHTML = `
                            <img src="${e.target.result}" alt="Фото работы">
                            <button class="remove-photo" data-index="${index}">&times;</button>
                        `;
                        previewGrid.appendChild(photoItem);
                        
                        photoItem.querySelector('.remove-photo').addEventListener('click', () => {
                            photoItem.remove();
                        });
                    };
                    reader.readAsDataURL(file);
                });
            });
            
            input.click();
        });
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            reportModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            showNotification(
                'Отчет успешно отправлен!',
                'Проектный менеджер проверит ваш отчет в течение 24 часов.',
                'success'
            );
            
            setTimeout(() => {
                showNotification(
                    'Статус задачи обновлен',
                    'Задача перемещена в раздел "На проверке"',
                    'info'
                );
            }, 1000);
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === reportModal) {
                reportModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
        return reportModal;
    };
    
    if (reportBtn) {
        reportBtn.addEventListener('click', () => {
            let modal = document.getElementById('report-modal');
            if (!modal) {
                modal = initReportModal();
            }
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (uploadReportBtn) {
        uploadReportBtn.addEventListener('click', () => {
            let modal = document.getElementById('report-modal');
            if (!modal) {
                modal = initReportModal();
            }
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
}

// Добавление кнопки чата с заказчиком
function addCustomerChatButton() {
    const actionButtons = document.querySelector('#platform-manager-section .action-buttons');
    if (actionButtons && !document.getElementById('platform-customer-chat-btn')) {
        const chatBtn = document.createElement('button');
        chatBtn.className = 'btn btn-outline';
        chatBtn.id = 'platform-customer-chat-btn';
        chatBtn.innerHTML = '<i class="fas fa-comments"></i> Чат с заказчиками';
        
        chatBtn.addEventListener('click', () => {
            let modal = document.getElementById('chat-modal-customer-platform');
            if (!modal) {
                modal = initChatWithCustomer();
            }
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        actionButtons.appendChild(chatBtn);
    }
}

// Инициализация чата с заказчиком
function initChatWithCustomer() {
    const modal = document.createElement('div');
    modal.className = 'modal chat-modal';
    modal.id = 'chat-modal-customer-platform';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">
                    <i class="fas fa-comments"></i> Чат с заказчиком
                </h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="chat-window">
                    <div class="chat-contacts-sidebar">
                        <div class="chat-contact-item active">
                            <div class="chat-contact-avatar">М</div>
                            <div class="chat-contact-info">
                                <strong>Компания "Магнит"</strong>
                                <small>Проект "Магнит-Аптеки"</small>
                            </div>
                        </div>
                        <div class="chat-contact-item">
                            <div class="chat-contact-avatar">П</div>
                            <div class="chat-contact-info">
                                <strong>"Пятерочка"</strong>
                                <small>Новый проект</small>
                            </div>
                        </div>
                    </div>
                    
                    <div class="chat-main-area">
                        <div class="chat-messages" id="chat-customer-platform-messages">
                            <div class="message incoming">
                                <div class="message-avatar">М</div>
                                <div class="message-content">
                                    <div class="message-header">
                                        <strong>Компания "Магнит"</strong>
                                        <span>11.02.2026, 09:30</span>
                                    </div>
                                    <p>По проекту "Пятерочка" нужно срочно добавить еще 10 точек.</p>
                                </div>
                            </div>
                            
                            <div class="message outgoing">
                                <div class="message-content">
                                    <div class="message-header">
                                        <strong>Вы (Менеджер платформы)</strong>
                                        <span>11.02.2026, 09:45</span>
                                    </div>
                                    <p>Добрый день! Уточните, пожалуйста, регионы для этих точек.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="chat-input">
                            <textarea placeholder="Введите сообщение заказчику..." id="chat-customer-platform-input"></textarea>
                            <button class="btn btn-primary" id="send-customer-platform-message">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.modal-close');
    const sendBtn = modal.querySelector('#send-customer-platform-message');
    const input = modal.querySelector('#chat-customer-platform-input');
    const messagesContainer = modal.querySelector('#chat-customer-platform-messages');
    
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    const sendMessage = () => {
        const message = input.value.trim();
        if (!message) return;
        
        const messageElement = document.createElement('div');
        messageElement.className = 'message outgoing';
        messageElement.innerHTML = `
            <div class="message-content">
                <div class="message-header">
                    <strong>Вы (Менеджер платформы)</strong>
                    <span>${getCurrentTime()}</span>
                </div>
                <p>${message}</p>
            </div>
        `;
        
        messagesContainer.appendChild(messageElement);
        input.value = '';
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        APP_STATE.chatMessages.platform_customer.push({
            id: Date.now(),
            sender: 'platformManager',
            message: message,
            timestamp: getCurrentTime(),
            read: true
        });
        
        setTimeout(() => {
            const responseElement = document.createElement('div');
            responseElement.className = 'message incoming';
            responseElement.innerHTML = `
                <div class="message-avatar">М</div>
                <div class="message-content">
                    <div class="message-header">
                        <strong>Компания "Магнит"</strong>
                        <span>${getCurrentTime()}</span>
                    </div>
                    <p>Хорошо, отправлю список регионов и адресов в течение часа.</p>
                </div>
            `;
            
            messagesContainer.appendChild(responseElement);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 2000);
    };
    
    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    return modal;
}

// Добавление кнопки чата с менеджером платформы
function addPlatformChatButton() {
    const actionButtons = document.querySelector('#project-manager-section .action-buttons');
    if (actionButtons && !document.getElementById('pm-platform-chat-btn')) {
        const chatBtn = document.createElement('button');
        chatBtn.className = 'btn btn-outline';
        chatBtn.id = 'pm-platform-chat-btn';
        chatBtn.innerHTML = '<i class="fas fa-comments"></i> Чат с менеджером платформы';
        
        chatBtn.addEventListener('click', () => {
            openModal('chat-modal-platform');
        });
        
        actionButtons.insertBefore(chatBtn, actionButtons.querySelector('#pm-chat-btn'));
    }
}

// Утилиты
function showNotification(title, message, type = 'info') {
    const notification = document.getElementById('notification');
    const titleElement = notification.querySelector('.notification-title');
    const messageElement = notification.querySelector('.notification-message');
    const icon = notification.querySelector('.notification-icon i');
    
    const colors = {
        info: 'var(--primary)',
        success: 'var(--secondary)',
        warning: 'var(--warning)',
        danger: 'var(--danger)'
    };
    
    notification.style.borderLeftColor = colors[type] || colors.info;
    icon.className = type === 'success' ? 'fas fa-check-circle' : 
                     type === 'warning' ? 'fas fa-exclamation-triangle' :
                     type === 'danger' ? 'fas fa-times-circle' :
                     'fas fa-bell';
    
    titleElement.textContent = title;
    messageElement.textContent = message;
    
    notification.classList.remove('hiding');
    notification.classList.add('show');
    notification.style.animation = 'slideInRight 0.5s ease-out';
    
    setTimeout(() => {
        notification.classList.add('hiding');
        notification.style.animation = 'slideOut 0.5s ease-out forwards';
        setTimeout(() => {
            notification.classList.remove('show');
            notification.classList.remove('hiding');
        }, 500);
    }, 3000); // Увеличено с 5000 до 3000 мс (3 секунды)
}

function getCurrentTime() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    return `${day}.${month}.${year}, ${hours}:${minutes}`;
}

// Функции для документов
function downloadDocument(id) {
    const doc = APP_STATE.documents.find(d => d.id === id);
    showNotification(
        'Скачивание документа',
        `Документ "${doc.name}" будет скачан`,
        'info'
    );
}

function shareDocument(id) {
    const doc = APP_STATE.documents.find(d => d.id === id);
    showNotification(
        'Поделиться документом',
        `Ссылка для доступа к документу "${doc.name}" скопирована в буфер обмена`,
        'success'
    );
}

// Функции для подрядчиков
function contactContractor(id) {
    const contractor = APP_STATE.contractors.find(c => c.id === id);
    showNotification(
        'Написать подрядчику',
        `Открывается чат с ${contractor.name}`,
        'info'
    );
}

function assignTaskToContractor(id) {
    const contractor = APP_STATE.contractors.find(c => c.id === id);
    showNotification(
        'Назначение задачи',
        `Выберите задачу для назначения ${contractor.name}`,
        'info'
    );
}

// Функция для согласования
function approveCoordination() {
    showNotification(
        'Назначение утверждено',
        'Проектный менеджер получил уведомление о новом проекте',
        'success'
    );
}

// Обновление счетчика доступных задач у подрядчика
function updateContractorTaskCounter(change) {
    const counter = document.getElementById('contractor-available-tasks');
    if (counter) {
        let currentValue = parseInt(counter.textContent) || 7;
        const newValue = Math.max(0, currentValue + change);
        counter.textContent = newValue;
        
        // Обновление бейджа на вкладке
        const tabBadge = document.querySelector('[data-tab="available-tasks"] .tab-badge');
        if (tabBadge) {
            tabBadge.textContent = newValue;
        }
    }
}

// Стабилизация числовых значений
function stabilizeNumericValues() {
    // Фиксируем значения счетчиков
    const counters = {
        'customer-active-projects': 5,
        'customer-total-points': 89,
        'customer-completed': 64,
        'customer-problems': 7,
        'platform-new-requests': 4,
        'platform-active-projects': 12,
        'platform-coordination': 6,
        'platform-contractors': 28,
        'pm-active-tasks': 8,
        'pm-contractors': 5,
        'pm-completed': 24,
        'pm-problems': 3,
        'contractor-available-tasks': 7,
        'contractor-in-progress': 3,
        'contractor-completed': 42,
        'contractor-income': '128 500 ₽'
    };
    
    Object.entries(counters).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    });
    
    // Обновляем бейджи вкладок
    const tabBadges = {
        'projects-overview': 3,
        'documents': 12,
        'incoming-requests': 4,
        'active-projects': 12,
        'coordination': 6,
        'pm-tasks': 8,
        'pm-reports': 5,
        'available-tasks': 7,
        'my-tasks': 3
    };
    
    Object.entries(tabBadges).forEach(([tabId, value]) => {
        const badge = document.querySelector(`[data-tab="${tabId}"] .tab-badge`);
        if (badge) {
            badge.textContent = value;
        }
    });
}

// Имитация реального времени
function startRealTimeSimulation() {
    setInterval(() => {
        if (Math.random() > 0.7) {
            updateRandomCounter();
        }
    }, 30000);
    
    setInterval(() => {
        if (Math.random() > 0.8) {
            showRandomNotification();
        }
    }, 45000);
}

function updateRandomCounter() {
    const statValues = document.querySelectorAll('.stat-value');
    if (statValues.length === 0) return;
    
    const randomStat = statValues[Math.floor(Math.random() * statValues.length)];
    const currentValue = parseInt(randomStat.textContent.replace(/\D/g, ''));
    
    if (!isNaN(currentValue)) {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newValue = Math.max(0, currentValue + change);
        
        if (newValue !== currentValue) {
            randomStat.textContent = randomStat.textContent.replace(/\d+/, newValue);
            randomStat.style.color = change > 0 ? 'var(--secondary)' : 'var(--danger)';
            
            setTimeout(() => {
                randomStat.style.color = '';
            }, 1000);
        }
    }
}

function showRandomNotification() {
    const notifications = [
        { title: 'Новая задача', message: 'В вашем регионе появилась новая задача', type: 'info' },
        { title: 'Сообщение в чате', message: 'У вас новое непрочитанное сообщение', type: 'info' },
        { title: 'Отчет проверен', message: 'Ваш отчет был проверен и принят', type: 'success' },
        { title: 'Сроки горят', message: 'Осталось 2 дня до дедлайна по проекту', type: 'warning' }
    ];
    
    const notification = notifications[Math.floor(Math.random() * notifications.length)];
    showNotification(notification.title, notification.message, notification.type);
}

// Запустить симуляцию реального времени
setTimeout(startRealTimeSimulation, 10000);

// Экспорт функций для глобального доступа
window.APP = {
    state: APP_STATE,
    config: PLATFORM_CONFIG,
    showNotification,
    openModal,
    closeModal,
    downloadDocument,
    shareDocument,
    contactContractor,
    assignTaskToContractor,
    approveCoordination
};
