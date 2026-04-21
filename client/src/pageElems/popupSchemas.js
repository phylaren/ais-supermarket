const today = new Date();
const maxBirthDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()).toISOString().split('T')[0];
const minBirthDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate()).toISOString().split('T')[0];

const maxStartDate = today.toISOString().split('T')[0];
const minStartDate = "2026-22-01";

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
            pattern: "^[a-zA-Zа-яА-ЯіІїЇєЄґҐ' -]+$", title: "Може містити лише літери, пробіл, дефіс та апостроф" 
        },
        { 
            name: "empl_surname", label: "Прізвище", type: "text", required: true, maxLength: 50, 
            pattern: "^[a-zA-Zа-яА-ЯіІїЇєЄґҐ' -]+$", title: "Може містити лише літери, пробіл, дефіс та апостроф" 
        },
        { 
            name: "empl_patronymic", label: "По батькові", type: "text", required: false, maxLength: 50, 
            pattern: "^[a-zA-Zа-яА-ЯіІїЇєЄґҐ' -]*$", title: "Може містити лише літери, пробіл, дефіс та апостроф" 
        },
        { 
            name: "empl_role", label: "Посада", type: "select", required: true,
            options: [
                { value: "Касир", label: "Касир" },
                { value: "Менеджер", label: "Менеджер" }
            ]
        },
        { name: "salary", label: "Зарплата", type: "number", step: "0.01", required: true, min: "0.01" },
        { name: "date_of_birth", label: "Дата народження", type: "date", required: true, max: maxBirthDate, min: minBirthDate },
        { name: "date_of_start", label: "Дата початку роботи", type: "date", required: true, max: maxStartDate, min: minStartDate },
        { 
            name: "phone_number", label: "Телефон", type: "text", required: true, 
            minLength: 13, maxLength: 13, pattern: "^\\+[0-9]{12}$", title: "Введіть коректний номер телефону (наприклад, +380991234567)" 
        },
        { 
            name: "city", label: "Місто", type: "text", required: true, maxLength: 50,
            pattern: "^[a-zA-Zа-яА-ЯіІїЇєЄґҐ' -]+$", title: "Назва міста може містити лише літери, пробіл, дефіс та апостроф" 
        },
        { name: "street", label: "Вулиця", type: "text", required: true, maxLength: 50 },
        { name: "zip_code", label: "Індекс", type: "text", required: true, maxLength: 9, pattern: "^[0-9]+$", title: "Індекс має містити лише цифри" }
    ],
    
    product: [
        { name: "id_product", label: "ID Товару", type: "number", required: true, min: "1" },
        { name: "product_name", label: "Назва товару", type: "text", required: true, maxLength: 50 },
        { name: "characteristics", label: "Характеристики", type: "text", required: true, maxLength: 100 },
        { 
            name: "id_category", label: "Категорія", type: "select", required: true,
            endpoint: "category", valueKey: "id_category", labelKey: "category_name"
        }
    ],
    category: [
        { name: "id_category", label: "ID Категорії", type: "number", required: true, min: "1" },
        { name: "category_name", label: "Назва категорії", type: "text", required: true, maxLength: 50 }
    ],
    "customer-card": [
        { name: "id_card", label: "ID Картки", type: "text", required: true, maxLength: 13 },
        { 
            name: "cust_surname", label: "Прізвище клієнта", type: "text", required: true, maxLength: 50,
            pattern: "^[a-zA-Zа-яА-ЯіІїЇєЄґҐ' -]+$", title: "Може містити лише літери, пробіл, дефіс та апостроф" 
        },
        { 
            name: "cust_name", label: "Ім’я клієнта", type: "text", required: true, maxLength: 50,
            pattern: "^[a-zA-Zа-яА-ЯіІїЇєЄґҐ' -]+$", title: "Може містити лише літери, пробіл, дефіс та апостроф" 
        },
        { 
            name: "cust_patronymic", label: "По батькові клієнта", type: "text", required: false, maxLength: 50,
            pattern: "^[a-zA-Zа-яА-ЯіІїЇєЄґҐ' -]*$", title: "Може містити лише літери, пробіл, дефіс та апостроф" 
        },
        { 
            name: "phone_number", label: "Телефон", type: "text", required: true, 
            maxLength: 13, pattern: "^\\+?[0-9]{10,13}$", title: "Введіть коректний номер телефону" 
        },
        { 
            name: "city", label: "Місто", type: "text", required: true, maxLength: 50,
            pattern: "^[a-zA-Zа-яА-ЯіІїЇєЄґҐ' -]+$", title: "Назва міста може містити лише літери, пробіл, дефіс та апостроф" 
        },
        { name: "street", label: "Вулиця", type: "text", required: true, maxLength: 50 },
        { name: "zip_code", label: "Індекс", type: "text", required: true, maxLength: 9, pattern: "^[0-9]+$" },
        { name: "discount_percent", label: "Відсоток знижки", type: "number", required: true, min: "0", max: "100" }
    ],
    receipt: [
        { name: "id_check", label: "ID Чеку", type: "text", required: true, maxLength: 10 },
        { name: "print_date", label: "Дата друку", type: "datetime-local", required: true },
        { name: "sum_total", label: "Сума", type: "number", step: "0.01", required: true, min: "0.01" },
        { name: "vat", label: "ПДВ", type: "number", step: "0.01", required: true, min: "0.01" },
        { 
            name: "id_employee", label: "Працівник", type: "select", required: true,
            endpoint: "employee", valueKey: "id_employee", labelKey: "empl_surname"
        },
        { 
            name: "id_card", label: "Картка клієнта", type: "select", required: false,
            endpoint: "customer-card", valueKey: "id_card", labelKey: "cust_surname"
        }
    ],
    "store-product/all-by-count": storeProductSchema,
    "store-product/all-by-name": storeProductSchema,

    sale: [
        { 
            name: "UPC", label: "Товар (UPC)", type: "select", required: true,
            endpoint: "store-product", valueKey: "UPC", labelKey: "UPC"
        },
        { 
            name: "id_check", label: "Чек", type: "select", required: true,
            endpoint: "receipt", valueKey: "id_check", labelKey: "id_check"
        },
        { name: "product_number", label: "Кількість товару", type: "number", required: true, min: "1" },
        { name: "selling_price", label: "Ціна продажу", type: "number", step: "0.01", required: true, min: "0.01" }
    ],
    account: [
        { 
            name: "id_employee", label: "Працівник", type: "select", required: true,
            endpoint: "employee", valueKey: "id_employee", labelKey: "empl_surname"
        },
        { name: "password_hash", label: "Хеш паролю", type: "password", required: true, minLength: 4 }
    ]
};