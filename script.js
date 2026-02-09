// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Показать онбординг при первой загрузке
    setTimeout(() => {
        document.getElementById('onboarding-tour').classList.add('active');
    }, 500);
    
    // Инициализация графиков
    initCharts();
    
    // Инициализация текущей даты в формах
    initDateInputs();
    
    // Инициализация Kanban доски
    initKanbanBoard();
    
    // Инициализация анимации точек на карте
    setTimeout(animateMapPoints, 1000);
    
    // Имитация реального времени - обновление статистики
    startRealTimeUpdates();
});

// Онбординг тур
let currentTourStep = 1;
const tourSteps = document.querySelectorAll('.tour-step');
const tourProgressDots = document.querySelectorAll('.tour-progress-dot');

document.getElementById('tour-next').addEventListener('click', function() {
    if (currentTourStep < tourSteps.length) {
        document.getElementById(`tour-step-${currentTourStep}`).classList.add('hidden');
        currentTourStep++;
        document.getElementById(`tour-step-${currentTourStep}`).classList.remove('hidden');
        
        // Обновить прогресс точки
        updateTourProgress();
        
        // Показать кнопку "Начать" на последнем шаге
        if (currentTourStep === tourSteps.length) {
            document.getElementById('tour-next').classList.add('hidden');
            document.getElementById('tour-start').classList.remove('hidden');
        }
        
        // Показать кнопку "Назад"
        document.getElementById('tour-prev').classList.remove('hidden');
    }
});

document.getElementById('tour-prev').addEventListener('click', function() {
    if (currentTourStep > 1) {
        document.getElementById(`tour-step-${currentTourStep}`).classList.add('hidden');
        currentTourStep--;
        document.getElementById(`tour-step-${currentTourStep}`).classList.remove('hidden');
        
        // Обновить прогресс точки
        updateTourProgress();
        
        // Скрыть кнопку "Назад" на первом шаге
        if (currentTourStep === 1) {
            document.getElementById('tour-prev').classList.add('hidden');
        }
        
        // Показать кнопку "Далее"
        document.getElementById('tour-next').classList.remove('hidden');
        document.getElementById('tour-start').classList.add('hidden');
    }
});

document.getElementById('tour-start').addEventListener('click', function() {
    document.getElementById('onboarding-tour').classList.remove('active');
    showNotification('Демонстрация начата!', 'Переключайтесь между ролями, чтобы протестировать функционал платформы.');
});

document.getElementById('demo-tour-btn').addEventListener('click', function() {
    document.getElementById('onboarding-tour').classList.add('active');
});

function updateTourProgress() {
    tourProgressDots.forEach(dot => dot.classList.remove('active'));
    document.querySelector(`.tour-progress-dot[data-step="${currentTourStep}"]`).classList.add('active');
}

// Переключение между ролями
document.querySelectorAll('.role-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Анимация переключения
        document.querySelectorAll('.role-btn').forEach(b => {
            b.classList.remove('active');
            b.style.transform = 'translateY(0)';
        });
        
        this.classList.add('active');
        this.style.transform = 'translateY(-2px)';
        
        // Скрыть все секции с анимацией
        document.querySelectorAll('.role-section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(10px)';
            setTimeout(() => {
                section.classList.remove('active');
            }, 200);
        });
        
        // Показать выбранную секцию
        const role = this.getAttribute('data-role');
        setTimeout(() => {
            const section = document.getElementById(`${role}-section`);
            section.classList.add('active');
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 10);
        }, 200);
        
        // Показать уведомление
        const roleNames = {
            'customer': 'Заказчик',
            'platform-manager': 'Менеджер платформы',
            'project-manager': 'Менеджер проектов',
            'contractor': 'Подрядчик'
        };
        
        showNotification(`Режим: ${roleNames[role]}`, 'Теперь вы можете тестировать функционал этой роли');
    });
});

// Управление табами
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        const parentSection = this.closest('.role-section');
        
        // Убрать активный класс у всех табов в текущей секции
        parentSection.querySelectorAll('.tab').forEach(t => {
            t.classList.remove('active');
            t.style.transform = 'translateY(0)';
        });
        
        // Добавить активный класс текущему табу
        this.classList.add('active');
        this.style.transform = 'translateY(-1px)';
        
        // Скрыть все таб-контенты в текущей секции
        parentSection.querySelectorAll('.tab-content').forEach(content => {
            content.style.opacity = '0';
            content.style.transform = 'translateY(10px)';
            setTimeout(() => {
                content.classList.remove('active');
            }, 200);
        });
        
        // Показать выбранный таб-контент
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

// Модальные окна
const modals = document.querySelectorAll('.modal');
const modalCloseButtons = document.querySelectorAll('.modal-close');

// Открытие модальных окон
document.getElementById('create-project-btn').addEventListener('click', () => {
    openModal('project-modal');
});

document.getElementById('open-chat-btn').addEventListener('click', () => {
    openModal('chat-modal');
});

document.getElementById('upload-report-btn').addEventListener('click', () => {
    showNotification('Загрузка отчета', 'В этом прототипе функционал загрузки отчета имитируется. В рабочей версии будет полноценная загрузка файлов.');
});

// Экспорт отчетов
document.getElementById('export-reports')?.addEventListener('click', () => {
    showNotification('Экспорт отчетов', 'Отчеты успешно экспортированы в формате Excel');
});

// Кнопки "Связаться"
document.querySelectorAll('.contact-client-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        openModal('chat-modal');
        showNotification('Чат открыт', 'Вы можете обсудить детали проекта с заказчиком');
    });
});

// Функция открытия модального окна
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Закрытие модальных окон
modalCloseButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const modal = this.closest('.modal');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Закрытие модального окна при клике вне его
window.addEventListener('click', (e) => {
    modals.forEach(modal => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Загрузка файлов
const fileUploadAreas = document.querySelectorAll('.file-upload');

fileUploadAreas.forEach(area => {
    area.addEventListener('click', function() {
        showNotification('Загрузка файлов', 'В рабочей версии откроется диалог выбора файлов');
    });
    
    // Эффект перетаскивания файла
    area.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('dragover');
    });
    
    area.addEventListener('dragleave', function() {
        this.classList.remove('dragover');
    });
    
    area.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
        showNotification('Файлы загружены', 'Файлы успешно загружены в систему');
    });
});

// Отправка форм
document.getElementById('project-form').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('project-modal').classList.remove('active');
    document.body.style.overflow = 'auto';
    showNotification('Заявка отправлена!', 'Менеджер платформы свяжется с вами в ближайшее время для уточнения деталей.');
    
    // Сброс формы
    this.reset();
});

// Принятие задачи подрядчиком
document.querySelectorAll('.accept-task-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const taskCard = this.closest('.task-card');
        const taskName = taskCard.querySelector('h4').textContent;
        const taskPrice = taskCard.querySelector('.task-price').textContent;
        
        // Анимация принятия задачи
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Принимается...';
        this.disabled = true;
        
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-check"></i> Задача принята';
            this.classList.remove('btn-primary');
            this.classList.add('btn-outline');
            
            // Изменение статуса задачи
            const statusBadge = taskCard.querySelector('.status-badge');
            statusBadge.innerHTML = '<i class="fas fa-clock"></i> Ожидает подтверждения';
            statusBadge.className = 'status-badge status-in-progress';
            
            showNotification('Задача принята!', `"${taskName}" теперь в ваших активных задачах. Сумма: ${taskPrice}`);
        }, 1500);
    });
});

// Публикация задачи подрядчикам
document.querySelectorAll('.publish-task-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Анимация публикации
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Публикуется...';
        this.disabled = true;
        
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-check"></i> Опубликовано';
            this.classList.remove('btn-secondary');
            this.classList.add('btn-outline');
            
            // Изменение статуса задачи
            const taskCard = this.closest('.task-card');
            const statusBadge = taskCard.querySelector('.status-badge');
            statusBadge.innerHTML = '<i class="fas fa-bullhorn"></i> Опубликовано';
            statusBadge.className = 'status-badge status-published';
            
            showNotification('Задача опубликована!', 'Задача теперь видна всем подрядчикам в вашем регионе.');
        }, 1500);
    });
});

// Запуск проекта менеджером платформы
document.querySelectorAll('.launch-project-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const taskCard = this.closest('.task-card');
        const clientName = taskCard.querySelector('.task-client').textContent;
        
        // Анимация запуска
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Запускается...';
        this.disabled = true;
        
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-check"></i> Проект запущен';
            this.classList.remove('btn-primary');
            this.classList.add('btn-secondary');
            
            // Изменение статуса задачи
            const statusBadge = taskCard.querySelector('.status-badge');
            statusBadge.innerHTML = '<i class="fas fa-play"></i> В работе';
            statusBadge.className = 'status-badge status-in-progress';
            
            showNotification('Проект запущен!', `Проект для ${clientName} передан проектным менеджерам регионов.`);
        }, 1500);
    });
});

// Принятие отчета менеджером проектов
document.querySelectorAll('.accept-report-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const reportItem = this.closest('.report-item');
        
        // Анимация принятия
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Проверяется...';
        this.disabled = true;
        
        setTimeout(() => {
            // Обновление элемента отчета
            reportItem.innerHTML = `
                <div style="text-align: center; padding: 30px;">
                    <i class="fas fa-check-circle" style="font-size: 48px; color: var(--secondary); margin-bottom: 15px;"></i>
                    <h4 style="color: var(--secondary); font-weight: 700;">Отчет принят!</h4>
                    <p style="color: var(--gray-600);">Точка отмечена как выполненная и отобразится у заказчика.</p>
                </div>
            `;
            
            showNotification('Отчет принят!', 'Точка выполнена и отобразится в статистике заказчика.');
        }, 1500);
    });
});

// Отправка на доработку
document.querySelectorAll('.request-revision-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const reportItem = this.closest('.report-item');
        
        // Создание поля для комментария
        const commentField = document.createElement('div');
        commentField.style.marginTop = '15px';
        commentField.innerHTML = `
            <textarea class="form-control" rows="3" placeholder="Укажите, что нужно исправить в работе..."></textarea>
            <button class="btn btn-danger btn-sm mt-2" id="send-revision-btn">
                <i class="fas fa-redo"></i> Отправить на доработку
            </button>
        `;
        
        reportItem.appendChild(commentField);
        
        // Скрыть другие кнопки
        this.style.display = 'none';
        reportItem.querySelector('.accept-report-btn').style.display = 'none';
        
        // Обработка отправки на доработку
        setTimeout(() => {
            document.getElementById('send-revision-btn').addEventListener('click', function() {
                const comment = reportItem.querySelector('textarea').value;
                
                // Анимация отправки
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправляется...';
                this.disabled = true;
                
                setTimeout(() => {
                    reportItem.innerHTML = `
                        <div style="text-align: center; padding: 30px;">
                            <i class="fas fa-redo" style="font-size: 48px; color: var(--warning); margin-bottom: 15px;"></i>
                            <h4 style="color: var(--warning); font-weight: 700;">Отправлено на доработку</h4>
                            <p style="color: var(--gray-600);">Подрядчик получил ваши замечания и исправит работу.</p>
                        </div>
                    `;
                    
                    showNotification('Отправлено на доработку', 'Подрядчик получил ваши замечания и приступит к исправлениям.');
                }, 1500);
            });
        }, 10);
    });
});

// Отправка сообщения в чате
document.getElementById('send-message-btn')?.addEventListener('click', function() {
    const chatInput = document.getElementById('chat-input-text');
    const messageText = chatInput.value.trim();
    
    if (messageText) {
        // Создание нового сообщения
        const chatMessages = document.querySelector('.chat-messages');
        const newMessage = document.createElement('div');
        newMessage.className = 'message message-outgoing';
        newMessage.innerHTML = `
            ${messageText}
            <div class="message-time">Только что</div>
        `;
        
        chatMessages.appendChild(newMessage);
        chatInput.value = '';
        
        // Прокрутка к новому сообщению
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Имитация ответа через 2 секунды
        setTimeout(() => {
            const replyMessage = document.createElement('div');
            replyMessage.className = 'message message-incoming';
            replyMessage.innerHTML = `
                Спасибо за информацию! Ожидаем уточненные документы.
                <div class="message-time">Только что</div>
            `;
            
            chatMessages.appendChild(replyMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 2000);
    }
});

// Отправка сообщения по Enter в чате
document.getElementById('chat-input-text')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        document.getElementById('send-message-btn').click();
    }
});

// Показать детали проекта
document.querySelectorAll('.view-project-details').forEach(btn => {
    btn.addEventListener('click', function() {
        showNotification('Детали проекта', 'В рабочей версии откроется страница с детальной информацией о проекте, картой точек и историей изменений.');
    });
});

// Инициализация Kanban доски
function initKanbanBoard() {
    const tasks = document.querySelectorAll('.kanban-task');
    const columns = document.querySelectorAll('.kanban-column');
    
    tasks.forEach(task => {
        task.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', this.id);
            this.style.opacity = '0.5';
        });
        
        task.addEventListener('dragend', function() {
            this.style.opacity = '1';
        });
    });
    
    columns.forEach(column => {
        column.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.backgroundColor = 'rgba(37, 99, 235, 0.1)';
        });
        
        column.addEventListener('dragleave', function() {
            this.style.backgroundColor = '';
        });
        
        column.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.backgroundColor = '';
            
            const taskId = e.dataTransfer.getData('text/plain');
            const task = document.getElementById(taskId);
            if (task) {
                this.querySelector('.kanban-tasks').appendChild(task);
                showNotification('Задача перемещена', 'Задача успешно перемещена в другую колонку');
            }
        });
    });
}

// Система уведомлений
function showNotification(title, message) {
    const notification = document.getElementById('notification');
    const notificationTitle = document.querySelector('.notification-title');
    const notificationMessage = document.querySelector('.notification-message');
    
    notificationTitle.textContent = title;
    notificationMessage.textContent = message;
    
    notification.classList.add('show');
    notification.style.animation = 'slideIn 0.5s ease-out';
    
    // Автоматическое скрытие через 5 секунд
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-out forwards';
        setTimeout(() => {
            notification.classList.remove('show');
        }, 500);
    }, 5000);
}

// Инициализация графиков
function initCharts() {
    // График для заказчика
    const customerCtx = document.getElementById('customer-chart')?.getContext('2d');
    if (customerCtx) {
        new Chart(customerCtx, {
            type: 'doughnut',
            data: {
                labels: ['Выполнено', 'В процессе', 'Проблемные', 'Ожидают'],
                datasets: [{
                    data: [89, 42, 12, 23],
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
                            usePointStyle: true
                        }
                    }
                },
                cutout: '70%'
            }
        });
    }
    
    // График доходов для подрядчика
    const earningsCtx = document.getElementById('earnings-chart')?.getContext('2d');
    if (earningsCtx) {
        new Chart(earningsCtx, {
            type: 'line',
            data: {
                labels: ['Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь'],
                datasets: [{
                    label: 'Доход, ₽',
                    data: [98000, 115000, 132000, 154800, 175000],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            display: true,
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value.toLocaleString('ru-RU') + ' ₽';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
}

// Анимация точек на карте
function animateMapPoints() {
    const points = document.querySelectorAll('.map-point');
    points.forEach((point, index) => {
        setTimeout(() => {
            point.style.animation = 'pulse 2s infinite';
        }, index * 300);
    });
}

// Инициализация дат в формах
function initDateInputs() {
    const today = new Date().toISOString().split('T')[0];
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        input.min = today;
        // Установим дату на 30 дней вперед
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 30);
        input.value = futureDate.toISOString().split('T')[0];
    });
}

// Имитация реального времени - обновление статистики
function startRealTimeUpdates() {
    setInterval(() => {
        // Случайное обновление некоторых статистических значений
        if (Math.random() > 0.7) {
            const statValues = document.querySelectorAll('.stat-value');
            const randomStat = statValues[Math.floor(Math.random() * statValues.length)];
            const currentValue = parseInt(randomStat.textContent.replace(/\D/g, ''));
            
            if (!isNaN(currentValue)) {
                // Небольшое случайное изменение
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
    }, 10000); // Каждые 10 секунд
}
