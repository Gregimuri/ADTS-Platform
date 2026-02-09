// Демонстрационные данные для платформы
const demoData = {
    projects: [
        {
            id: 1,
            name: "Установка дисплеев в Магнит-Аптеках",
            client: "Магнит",
            status: "in-progress",
            points: 50,
            completed: 32,
            regions: ["Москва"],
            deadline: "30.08.2023",
            description: "Установка дисплеев покупателя в 50 аптеках по Москве"
        },
        {
            id: 2,
            name: "Обновление экранов в гипермаркетах",
            client: "Магнит",
            status: "completed",
            points: 30,
            completed: 30,
            regions: ["Москва", "СПб"],
            deadline: "15.05.2023",
            description: "Замена устаревших экранов на новые LED-панели"
        }
    ],
    tasks: [
        {
            id: 101,
            projectId: 1,
            name: "Установка дисплея",
            address: "Москва, ул. Тверская, 15",
            price: "1,200 ₽ + выезд 2,500 ₽",
            status: "in-progress",
            contractor: "ИП Сидоров",
            priority: "high",
            deadline: "25.06.2023"
        },
        {
            id: 102,
            projectId: 1,
            name: "Монтаж экрана",
            address: "Москва, ТРЦ Авиапарк",
            price: "3,000 ₽ за экран (8 шт.)",
            status: "pending",
            contractor: null,
            priority: "medium",
            deadline: "30.06.2023"
        }
    ]
};

// Экспорт данных для использования в script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = demoData;
}
