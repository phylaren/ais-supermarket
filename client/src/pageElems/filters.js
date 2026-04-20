export const filters = {
    "employee": [
        { type: "button", label: "Всі працівники", link: "surname_asc" },
        { type: "button", label: "Тільки касири", link: "check_role" },
    ],

    "customer-card": [
        { type: "button", label: "За прізвищем (А-Я)", link: "surname_asc" },
        { 
            type: "input", 
            inputType: "number", 
            name: "discount_percent", 
            label: "Знайти за % знижки", 
            placeholder: "Наприклад: 5" 
        }
    ],

    "product": [
        { 
            type: "select", 
            name: "id_category", 
            label: "Оберіть категорію", 
            endpoint: "category",
            valueKey: "id_category", 
            labelKey: "category_name" 
        },
        {
            type: "input",
            inputType: "text",
            name: "product_sold_qty",
            label: "К-сть проданого (за ID)",
            placeholder: "Введіть ID товару",
            actionType: "search_sold_qty"
        }
    ],

    "store-product": [
        {
            type: "select",
            name: "promo_status",
            label: "Тип товару",
            options: [
                { value: "all", label: "Всі продукти" },
                { value: "true", label: "Тільки акційні" },
                { value: "false", label: "Не акційні" }
            ]
        },
        {
            type: "select",
            name: "sort_by",
            label: "Сортувати за",
            options: [
                { value: "name_asc", label: "Назвою (А-Я)" },
                { value: "quantity_asc", label: "Кількістю (зростання)" }
            ]
        }
    ],
    "receipt": [
        { 
            type: "date-range", 
            name: "receipt_date", 
            label: "Період чеків" 
        },
        {
            type: "select",
            name: "id_employee",
            label: "Касир",
            endpoint: "employee/role/Касир",
            valueKey: "id_employee",
            labelKey: "surname",
            requiresManager: true
        }
    ],
    "statistics": [
        { 
            type: "date-range", 
            name: "receipt_date", 
            label: "Період чеків" 
        },
        {
            type: "select",
            name: "id_employee",
            label: "Касир",
            endpoint: "employee/role/Касир",
            valueKey: "id_employee",
            labelKey: "surname",
            requiresManager: true
        }
    ]
};