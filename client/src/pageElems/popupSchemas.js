const today = new Date();

const maxBirthDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()).toISOString().split('T')[0];
const minBirthDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate()).toISOString().split('T')[0];

const maxStartDate = today.toISOString().split('T')[0];
const minStartDate = "2020-01-01";

const storeProductSchema = [
    { 
        name: "UPC", label: "Штрих-код (UPC)", type: "text", required: true, 
        maxLength: 12, pattern: "^[0-9]+$", title: "Штрих-код має містити лише цифри" 
    },
    { 
        name: "id_product", label: "Товар (з каталогу)", type: "select", required: true,
        endpoint: "product", valueKey: "id_product", labelKey: "product_name" 
    },
    { 
        name: "selling_price", label: "Ціна продажу", type: "number", step: "0.01", required: true, 
        min: "0.01", title: "Ціна має бути більшою за 0" 
    },
    { 
        name: "products_number", label: "Кількість (залишок)", type: "number", required: true, 
        min: "0", title: "Кількість не може бути від'ємною" 
    },
    { 
        name: "promotional_product", label: "Акційний товар?", type: "select", required: true,
        options: [
            { value: "0", label: "Ні" },
            { value: "1", label: "Так" }
        ]
    }
];

export const popupSchemas = {
    employee: [
        { name: "id_employee", label: "ID Працівника", type: "text", required: true, maxLength: 10, },
        { 
            name: "empl_name", label: "Ім'я", type: "text", required: true, maxLength: 50, 
            pattern: "^[a-zA-Zа-яА-ЯіІїЇєЄґҐ' -]+$", title: "Може містити лише літери" 
        },
        { 
            name: "empl_surname", label: "Прізвище", type: "text", required: true, maxLength: 50, 
            pattern: "^[a-zA-Zа-яА-ЯіІїЇєЄґҐ' -]+$", title: "Може містити лише літери" 
        },
        { name: "empl_patronymic", label: "По батькові", type: "text", required: false, maxLength: 50 },
        { 
            name: "empl_role", label: "Посада", type: "select", required: true,
            options: [
                { value: "Касир", label: "Касир" },
                { value: "Менеджер", label: "Менеджер" }
            ]
        },
        { name: "salary", label: "Зарплата", type: "number", step: "0.01", required: true, min: "0.01" },

        { 
            name: "date_of_birth", label: "Дата народження", type: "date", required: true, 
            max: maxBirthDate, min: minBirthDate, title: "Вік працівника не може бути меншим за 18 років" 
        },
        
        { name: "date_of_start", label: "Дата початку роботи", type: "date", required: true, max: maxStartDate, min: minStartDate },
        
        { 
            name: "phone_number", label: "Телефон", type: "text", required: true, 
            maxLength: 13, pattern: "^\\+[0-9]{12}$", title: "Формат: +380123456789 (рівно 13 символів)" 
        },
        
        { name: "city", label: "Місто", type: "text", required: true, maxLength: 50 },
        { name: "street", label: "Вулиця", type: "text", required: true, maxLength: 50 },
        { name: "zip_code", label: "Індекс", type: "text", required: true, maxLength: 9 }
    ],

    "customer-card": [
        { name: "id_card", label: "ID Картки", type: "text", required: true, maxLength: 13 },
        { name: "cust_surname", label: "Прізвище клієнта", type: "text", required: true, maxLength: 50 },
        { name: "cust_name", label: "Ім’я клієнта", type: "text", required: true, maxLength: 50 },
        
        { 
            name: "phone_number", label: "Телефон", type: "text", required: true, 
            maxLength: 13, pattern: "^\\+[0-9]{12}$", title: "Максимум 13 символів, включаючи '+'" 
        },
        
        { name: "city", label: "Місто", type: "text", required: true, maxLength: 50 },
        { name: "street", label: "Вулиця", type: "text", required: true, maxLength: 50 },
        { name: "zip_code", label: "Індекс", type: "text", required: true, maxLength: 9 },
        
        { name: "discount_percent", label: "Відсоток знижки", type: "number", required: true, min: "0", max: "100" }
    ],

    receipt: [
        { name: "id_check", label: "ID Чеку", type: "text", required: true, maxLength: 10 },
        { name: "print_date", label: "Дата друку", type: "datetime-local", required: true },
        { name: "sum_total", label: "Загальна сума", type: "number", step: "0.01", required: true, min: "0" },
        { name: "vat", label: "ПДВ (20%)", type: "number", step: "0.01", required: true, min: "0" },
        { 
            name: "id_employee", label: "Касир", type: "select", required: true,
            endpoint: "employee", valueKey: "id_employee", labelKey: "empl_surname"
        },
        { 
            name: "id_card", label: "Картка клієнта", type: "select", required: false,
            endpoint: "customer-card", valueKey: "id_card", labelKey: "cust_surname"
        }
    ],

    sale: [
        { name: "UPC", label: "Товар (UPC)", type: "select", required: true, endpoint: "store-product", valueKey: "UPC", labelKey: "UPC" },
        { name: "id_check", label: "Чек", type: "select", required: true, endpoint: "receipt", valueKey: "id_check", labelKey: "id_check" },
        { name: "product_number", label: "Кількість", type: "number", required: true, min: "1" },
        { name: "selling_price", label: "Ціна одиниці", type: "number", step: "0.01", required: true, min: "0.01" }
    ],

    "store-product/all-by-count": storeProductSchema,
    "store-product/all-by-name": storeProductSchema,
    
    account: [
        { 
            name: "id_employee", label: "Оберіть працівника", type: "select", required: true,
            endpoint: "employee", valueKey: "id_employee", labelKey: "empl_surname"
        },
        { name: "password_hash", label: "Встановіть пароль", type: "password", required: true, minLength: 4 }
    ]
};