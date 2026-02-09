document.addEventListener('DOMContentLoaded', function() {
    // Элементы переключения ролей
    const roleButtons = document.querySelectorAll('.role-btn');
    const rolePanels = document.querySelectorAll('.role-panel');
    const currentRoleName = document.getElementById('currentRoleName');
    
    // Модальное окно создания проекта
    const createProjectBtn = document.getElementById('createProjectBtn');
    const createProjectModal = document.getElementById('createProjectModal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const projectForm = document.getElementById('projectForm');
    
    // Кнопки действий
    const resetDemoBtn = document.getElementById('resetDemo');
    const showAllBtn = document.getElementById('showAll');
    
    // Переключение между ролями
    roleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const role = this.getAttribute('data-role');
            
            // Обновляем активную кнопку
            roleButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Обновляем название текущей роли
            const roleNames = {
                'customer': 'Заказчик',
                'platform-manager': 'Менеджер платформы',
                'project-manager': 'Менеджер проектов',
                'contractor': 'Подрядчик'
            };
            currentRoleName.textContent = roleNames[role];
            
            // Показываем соответствующую панель
            rolePanels.forEach(panel => panel.classList.remove('active'));
            document.getElementById(`${role}-panel`).classList.add('active');
        });
    });
    
    // Управление модальным окном создания проекта
    createProjectBtn.addEventListener('click', function() {
        createProjectModal.classList.add('active');
    });
    
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            createProjectModal.classList.remove('active');
        });
    });
    
    // Закрытие модального окна при клике вне его
    window.addEventListener('click', function(event) {
        if (event.target === createProjectModal) {
            createProjectModal.classList.remove('active');
        }
    });
    
    // Обработка формы создания проекта
    projectForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const projectName = document.getElementById('projectName').value;
        const projectPoints = document.getElementById('projectPoints').value;
        
        // Показываем уведомление
        alert(`Проект "${projectName}" успешно создан! Количество точек: ${projectPoints}. Заявка отправлена менеджеру платформы.`);
        
        // Закрываем модальное окно и сбрасываем форму
        createProjectModal.classList.remove('active');
        projectForm.reset();
        
        // Переключаемся на роль менеджера платформы для демонстрации
        document.querySelector('.role-btn[data-role="platform-manager"]').click();
    });
    
    // Обработка кнопок "Принять задачу" для подрядчика
    document.querySelectorAll('.accept-task').forEach(button => {
        button.addEventListener('click', function() {
            const taskCard = this.closest('.task-card');
            const taskName = taskCard.querySelector('h4').textContent;
            
            if (confirm(`Вы уверены, что хотите принять задачу "${taskName}"?`)) {
                alert(`Задача "${taskName}" принята! Свяжитесь с менеджером проекта для уточнения деталей.`);
                
                // Меняем статус задачи
                const statusElement = taskCard.querySelector('.status-badge');
                if (statusElement) {
                    statusElement.textContent = 'В работе';
                    statusElement.className = 'status-badge status-in-progress';
                }
                
                // Меняем текст кнопки
                this.innerHTML = '<i class="fas fa-check-circle"></i> Задача принята';
                this.classList.remove('btn-primary');
                this.classList.add('btn-secondary');
                this.disabled = true;
            }
        });
    });
    
    // Обработка кнопок "Проверить отчет" для менеджера проектов
    document.querySelectorAll('.check-report, .accept-report').forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('accept-report')) {
                alert('Фотоотчет принят! Работа отмечена как выполненная и отобразится у заказчика.');
            } else {
                alert('Открыт раздел проверки фотоотчета. Вы можете принять работу или отправить на доработку.');
            }
        });
    });
    
    // Обработка кнопки "Отклонить с замечаниями"
    document.querySelector('.reject-report')?.addEventListener('click', function() {
        const comment = prompt('Введите замечания для подрядчика:');
        if (comment) {
            alert(`Замечания отправлены подрядчику: "${comment}". Задача возвращена на доработку.`);
        }
    });
    
    // Обработка кнопок открытия чата
    document.querySelectorAll('.open-chat').forEach(button => {
        button.addEventListener('click', function() {
            alert('Чат открыт. В реальной системе здесь будет полноценный мессенджер с историей переписки.');
        });
    });
    
    // Обработка кнопки "Сбросить демо"
    resetDemoBtn.addEventListener('click', function() {
        if (confirm('Сбросить демонстрацию к начальному состоянию?')) {
            // Сбрасываем на первую роль
            document.querySelector('.role-btn[data-role="customer"]').click();
            
            // Сбрасываем все формы
            document.querySelectorAll('form').forEach(form => form.reset());
            
            // Сбрасываем состояния кнопок
            document.querySelectorAll('.accept-task').forEach(button => {
                button.innerHTML = '<i class="fas fa-check"></i> Принять задачу';
                button.classList.remove('btn-secondary');
                button.classList.add('btn-primary');
                button.disabled = false;
            });
            
            alert('Демонстрация сброшена. Вы в роли Заказчика.');
        }
    });
    
    // Обработка кнопки "Показать все панели"
    showAllBtn.addEventListener('click', function() {
        rolePanels.forEach(panel => {
            panel.style.display = 'block';
            panel.style.marginBottom = '20px';
            panel.style.border = '2px dashed #ccc';
        });
        
        alert('Все панели отображены одновременно для обзора. Чтобы вернуться к нормальному виду, сбросьте демо.');
    });
    
    // Обработка кнопок "Подробнее"
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function() {
            const projectCard = this.closest('.project-card');
            const projectName = projectCard.querySelector('h4').textContent;
            alert(`Подробная информация о проекте "${projectName}". В реальной системе здесь будет открыта страница проекта с картой, деталями и историей.`);
        });
    });
    
    // Имитация уведомлений при переключении ролей
    let notificationCount = 3;
    const updateNotificationBadge = () => {
        document.querySelectorAll('.notification-badge .badge').forEach(badge => {
            badge.textContent = notificationCount;
        });
    };
    
    // Уменьшаем счетчик уведомлений при клике на них
    document.querySelectorAll('.notification-badge').forEach(badge => {
        badge.addEventListener('click', function() {
            if (notificationCount > 0) {
                notificationCount--;
                updateNotificationBadge();
                alert('Уведомления просмотрены. В реальной системе здесь будет список уведомлений.');
            }
        });
    });
});
