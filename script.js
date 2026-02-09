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
        platform_project: [],
        project_contractor: []
    },
    projects: [],
    tasks: []
};

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    initPlatform();
    initChats();
    initCharts();
    initEventListeners();
    
    // Показать онбординг
    setTimeout(() => {
        document.getElementById('onboarding-tour').classList.add('active');
    }, 500);
});

// Инициализация платформы
function initPlatform() {
    // Установка текущей даты
    updateCurrentDate();
    
    // Инициализация данных
    initDemoData();
    
    // Инициализация Kanban
    initKanban();
}

// Обновление текущей даты
function updateCurrentDate() {
    const dateElements = document.querySelectorAll('.dashboard-subtitle, .current-date');
    dateElements.forEach(el => {
        if (el.textContent.includes('•')) {
            const parts = el.textContent.split('•');
            parts[parts.length - 1] = PLATFORM_CONFIG.currentDate;
            el.textContent = parts.join(' • ');
        }
    });
}

// Инициализация демо-данных
function initDemoData() {
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
    // График для заказчика
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
    // Онбординг
    initOnboarding();
    
    // Переключение ролей
    initRoleSwitching();
    
    // Табы
    initTabs();
    
    // Модальные окна
    initModals();
    
    // Кнопки действий
    initActionButtons();
    
    // Drag and drop
    initDragAndDrop();
    
    // Чат
    initChatEvents();
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

// Переключение ролей
function initRoleSwitching() {
    document.querySelectorAll('.role-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const role = this.dataset.role;
            
            // Обновить активную кнопку
            document.querySelectorAll('.role-btn').forEach(b => {
                b.classList.remove('active');
                b.style.transform = 'translateY(0)';
            });
            this.classList.add('active');
            this.style.transform = 'translateY(-2px)';
            
            // Скрыть все секции
            document.querySelectorAll('.role-section').forEach(section => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    section.classList.remove('active');
                }, 200);
            });
            
            // Показать выбранную секцию
            setTimeout(() => {
                const section = document.getElementById(`${role}-section`);
                section.classList.add('active');
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 10);
                
                // Обновить глобальное состояние
                APP_STATE.currentRole = role;
                
                // Показать уведомление
                showNotification(
                    `Режим: ${PLATFORM_CONFIG.roles[role]}`,
                    'Теперь вы можете тестировать функционал этой роли'
                );
            }, 200);
        });
    });
}

// Табы
function initTabs() {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            const parentSection = this.closest('.role-section');
            
            // Обновить активный таб
            parentSection.querySelectorAll('.tab').forEach(t => {
                t.classList.remove('active');
                t.style.transform = 'translateY(0)';
            });
            this.classList.add('active');
            this.style.transform = 'translateY(-1px)';
            
            // Скрыть все таб-контенты
            parentSection.querySelectorAll('.tab-content').forEach(content => {
                content.style.opacity = '0';
                content.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    content.classList.remove('active');
                }, 200);
            });
            
            // Показать выбранный контент
            setTimeout(() => {
                const content = parentSection.querySelector(`#${tabId}-tab`);
                content.classList.add('active');
                setTimeout(() => {
                    content.style.opacity = '1';
                    content.style.transform = 'translateY(0)';
                }, 10);
            }, 200);
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
    
    document.getElementById('pm-chat-btn')?.addEventListener('click', () => {
        openModal('chat-modal-project');
    });
    
    document.getElementById('contractor-chat-btn')?.addEventListener('click', () => {
        openModal('chat-modal-project');
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
                    openModal('chat-modal-platform');
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
    
    // Закрытие по клику вне модального окна
    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
    
    // Отправка формы проекта
    document.getElementById('project-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        closeModal(document.getElementById('project-modal'));
        showNotification(
            'Заявка отправлена!',
            'Менеджер платформы свяжется с вами в ближайшее время для уточнения деталей.'
        );
        this.reset();
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Кнопки действий
function initActionButtons() {
    // Принятие задачи подрядчиком
    document.querySelectorAll('.accept-task-feed-btn, .accept-task-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const taskCard = this.closest('.task-feed-item, .task-card');
            const taskTitle = taskCard.querySelector('h4').textContent;
            const taskPrice = taskCard.querySelector('.task-price')?.textContent || '';
            
            // Анимация принятия
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Принимается...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i> Задача принята';
                this.classList.remove('btn-primary');
                this.classList.add('btn-secondary');
                this.disabled = true;
                
                // Обновить статус задачи
                const statusElement = taskCard.querySelector('.status-badge');
                if (statusElement) {
                    statusElement.innerHTML = '<i class="fas fa-clock"></i> Ожидает подтверждения';
                    statusElement.className = 'status-badge status-in-progress';
                }
                
                showNotification(
                    'Задача принята!',
                    `"${taskTitle}" теперь в ваших активных задачах${taskPrice ? `. Сумма: ${taskPrice}` : ''}`
                );
                
                // Имитация уведомления ПМ
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
            
            // Анимация публикации
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Публикуется...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i> Опубликовано';
                this.classList.remove('btn-outline');
                this.classList.add('btn-secondary');
                this.disabled = true;
                
                // Переместить задачу в следующую колонку
                const nextColumn = taskCard.closest('.kanban-column').nextElementSibling;
                if (nextColumn) {
                    const tasksContainer = nextColumn.querySelector('.kanban-tasks');
                    tasksContainer.appendChild(taskCard);
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
            
            // Анимация проверки
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Проверяется...';
            this.disabled = true;
            
            setTimeout(() => {
                // Обновить интерфейс
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
                
                // Имитация уведомления заказчику
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
            
            // Создать поле для комментария
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
            
            // Скрыть другие кнопки
            this.style.display = 'none';
            reportCard.querySelector('.accept-report-btn').style.display = 'none';
            
            // Обработка отправки
            setTimeout(() => {
                document.getElementById('send-revision').addEventListener('click', function() {
                    const comment = reportCard.querySelector('textarea').value;
                    
                    // Анимация отправки
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
                        
                        // Имитация уведомления подрядчику
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
            
            // Анимация назначения
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
                
                // Обновить счетчик
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
    // Отправка сообщений в разных чатах
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
            // Отправка по кнопке
            sendBtn.addEventListener('click', () => sendChatMessage(config.chain, input, messagesContainer));
            
            // Отправка по Enter
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendChatMessage(config.chain, input, messagesContainer);
                }
            });
        }
    });
    
    // Переключение между контактами в чате
    document.querySelectorAll('.chat-contact-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.chat-contact-item').forEach(i => {
                i.classList.remove('active');
            });
            this.classList.add('active');
            
            // Здесь можно загружать историю переписки с выбранным контактом
            showNotification('Контакт выбран', 'Теперь вы можете общаться с выбранным пользователем');
        });
    });
}

function sendChatMessage(chainId, inputElement, messagesContainer) {
    const message = inputElement.value.trim();
    if (!message) return;
    
    // Добавить сообщение в интерфейс
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
    
    // Прокрутить к последнему сообщению
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Сохранить в состоянии
    APP_STATE.chatMessages[chainId].push({
        id: Date.now(),
        sender: APP_STATE.currentRole,
        message: message,
        timestamp: getCurrentTime(),
        read: true
    });
    
    // Имитация ответа через 2 секунды
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
        
        // Сохранить ответ в состоянии
        APP_STATE.chatMessages[chainId].push({
            id: Date.now(),
            sender: chainId.split('_')[1],
            message: response,
            timestamp: getCurrentTime(),
            read: true
        });
    }, 2000);
}

// Утилиты
function showNotification(title, message, type = 'info') {
    const notification = document.getElementById('notification');
    const titleElement = notification.querySelector('.notification-title');
    const messageElement = notification.querySelector('.notification-message');
    const icon = notification.querySelector('.notification-icon i');
    
    // Установить цвет в зависимости от типа
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
    
    notification.classList.add('show');
    notification.style.animation = 'slideIn 0.5s ease-out';
    
    // Автоматическое скрытие
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-out forwards';
        setTimeout(() => {
            notification.classList.remove('show');
        }, 500);
    }, 5000);
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

// Имитация реального времени
function startRealTimeSimulation() {
    // Обновление счетчиков каждые 30 секунд
    setInterval(() => {
        if (Math.random() > 0.7) {
            updateRandomCounter();
        }
    }, 30000);
    
    // Случайные уведомления
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
                randomStat.style.color = 'var(--dark)';
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
    closeModal
};
