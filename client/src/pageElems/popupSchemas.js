export const popupSchemas = {
    employee: [
        { name: "id_employee", label: "ID Працівника", type: "text", required: true },
        { name: "empl_name", label: "Ім'я", type: "text", required: true },
        { name: "empl_surname", label: "Прізвище", type: "text", required: true },
        { name: "empl_patronymic", label: "По батькові", type: "text", required: false },
        { 
            name: "empl_role", 
            label: "Посада (Роль)", 
            type: "select", 
            required: true,
            options: [
                { value: "Касир", label: "Касир" },
                { value: "Менеджер", label: "Менеджер" }
            ]
        },
        { name: "salary", label: "Зарплата", type: "number", step: "0.01", required: true },
        { name: "date_of_birth", label: "Дата народження", type: "date", required: true },
        { name: "date_of_start", label: "Дата початку роботи", type: "date", required: true },
        { name: "phone_number", label: "Телефон", type: "text", required: true },
        { name: "city", label: "Місто", type: "text", required: true },
        { name: "street", label: "Вулиця", type: "text", required: true },
        { name: "zip_code", label: "Індекс", type: "text", required: true }
    ],
    product: [
        { name: "id_product", label: "ID Товару", type: "number", required: true },
        { name: "product_name", label: "Назва товару", type: "text", required: true },
        { name: "characteristics", label: "Характеристики", type: "text", required: true },
        { 
            name: "id_category", 
            label: "Категорія", 
            type: "select", 
            required: true,
            endpoint: "category",
            valueKey: "id_category",
            labelKey: "category_name"
        }
    ],
    category: [
        { name: "id_category", label: "ID Категорії", type: "number", required: true },
        { name: "category_name", label: "Назва категорії", type: "text", required: true }
    ],
    "customer-card": [
        { name: "id_card", label: "ID Картки", type: "text", required: true },
        { name: "cust_surname", label: "Прізвище клієнта", type: "text", required: true },
        { name: "cust_name", label: "Ім’я клієнта", type: "text", required: true },
        { name: "cust_patronymic", label: "По батькові клієнта", type: "text", required: false },
        { name: "phone_number", label: "Телефон", type: "text", required: true },
        { name: "city", label: "Місто", type: "text", required: true },
        { name: "street", label: "Вулиця", type: "text", required: true },
        { name: "zip_code", label: "Індекс", type: "text", required: true },
        { name: "discount_percent", label: "Відсоток знижки", type: "number", required: true }
    ],
    receipt: [
        { name: "id_check", label: "ID Чеку", type: "text", required: true },
        { name: "print_date", label: "Дата друку", type: "datetime-local", required: true },
        { name: "sum_total", label: "Сума", type: "number", step: "0.01", required: true },
        { name: "vat", label: "ПДВ", type: "number", step: "0.01", required: true },
        { 
            name: "id_employee", 
            label: "Працівник", 
            type: "select", 
            required: true,
            endpoint: "employee",
            valueKey: "id_employee",
            labelKey: "empl_surname"
        },
        { 
            name: "id_card", 
            label: "Картка клієнта", 
            type: "select", 
            required: false,
            endpoint: "customer_card",
            valueKey: "id_card",
            labelKey: "cust_surname"
        }
    ],
    sale: [
        { 
            name: "UPC", 
            label: "Товар (UPC)", 
            type: "select", 
            required: true,
            endpoint: "store_product",
            valueKey: "UPC",
            labelKey: "UPC"
        },
        { 
            name: "id_check", 
            label: "Чек", 
            type: "select", 
            required: true,
            endpoint: "receipt",
            valueKey: "id_check",
            labelKey: "id_check"
        },
        { name: "product_number", label: "Кількість товару", type: "number", required: true },
        { name: "selling_price", label: "Ціна продажу", type: "number", step: "0.01", required: true }
    ],
    account: [
        { 
            name: "id_employee", 
            label: "Працівник", 
            type: "select", 
            required: true,
            endpoint: "employee",
            valueKey: "id_employee",
            labelKey: "empl_surname"
        },
        { name: "password_hash", label: "Хеш паролю", type: "password", required: true }
    ]
};