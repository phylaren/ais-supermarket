const storeProductFilters = [
    {
        type: "select",
        name: "promo_status",
        label: "Тип товару",
        options: [
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
    },
    {
        type: "select",
        name: "id_category",
        label: "Оберіть категорію",
        endpoint: "category",
        valueKey: "id_category",
        labelKey: "category_name"
    }
];

export const filters = {
    "employee": [
        {
            type: "select",
            name: "empl_role",
            label: "Посада",
            options: [
                { value: "Касир", label: "Тільки касири" },
                { value: "Менеджер", label: "Тільки менеджери" }
            ]
        }
    ],
    "customer-card": [
        {
            type: "input",
            inputType: "number",
            name: "discount_percent",
            label: "Знайти за % знижки",
            placeholder: "Наприклад: 5",
            min: 1,
            max: 100
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
        }
    ],

    "store-product/all-by-count": storeProductFilters,
    "store-product/all-by-name": storeProductFilters,

    "receipt/my-receipts": [
        {
            type: "date-range",
            name: "receipt_date",
            label: "Період чеків"
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
        },
        {
            type: "input",
            inputType: "text",
            name: "product_sold_qty",
            label: "К-сть проданого (за ID)",
            placeholder: "Введіть ID товару",
            actionType: "search_sold_qty"
        }
    ]
};