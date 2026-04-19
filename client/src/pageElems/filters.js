export const filters = {
    "employee": [
        { label: "За прізвищем (А-Я)", value: "surname_asc" },
        { label: "За прізвищем (Я-А)", value: "surname_desc" }
    ],
    "customer-card": [
        { label: "За прізвищем (А-Я)", value: "surname_asc" },
        { label: "За прізвищем (Я-А)", value: "surname_desc" },
        { label: "За відсотком (зростання)", value: "percent_asc" },
        { label: "За відсотком (спадання)", value: "percent_desc" }
    ],
    "category": [
        { label: "За назвою (А-Я)", value: "name_asc" },
        { label: "За назвою (Я-А)", value: "name_desc" }
    ],
    "product": [
        { label: "За назвою (А-Я)", value: "name_asc" },
        { label: "За назвою (Я-А)", value: "name_desc" }
    ],
    "store-product": [
        { label: "За назвою (А-Я)", value: "name_asc" },
        { label: "За назвою (Я-А)", value: "name_desc" },
        { label: "За кількістю (зростання)", value: "quantity_asc" },
        { label: "За кількістю (спадання)", value: "quantity_desc" },
        { label: "Спочатку акційні", value: "promo_first" },
        { label: "Спочатку звичайні", value: "non_promo_first" }
    ],
    "receipt": [
        { label: "Спершу нові", value: "date_desc" },
        { label: "Спершу старі", value: "date_asc" },
        { label: "За сумою (зростання)", value: "sum_asc" },
        { label: "За сумою (спадання)", value: "sum_desc" }
    ]
};