import { useState, useEffect } from "react";
import { popupSchemas } from "./popupSchemas.js";
import style from "./Popup.module.css";

const EMPTY_SCHEMA = [];

const generateId = (fieldName) => {
    const randomDigits = (length) => Math.floor(Math.random() * Math.pow(10, length)).toString().padStart(length, '0');

    switch (fieldName) {
        case 'id_employee': return `E${randomDigits(4)}`;
        case 'UPC': return randomDigits(12);
        case 'id_card': return randomDigits(13);
        case 'id_check': return `CH${randomDigits(5)}`;
        case 'id_product':
        case 'id_category': return Math.floor(Math.random() * 10000);
        default: return '';
    }
};

export default function Popup({ category, onClose, onSuccess, initialData }) {
    const isEditing = Boolean(initialData);
    const currentSchema = popupSchemas[category.link] || EMPTY_SCHEMA;

    const [selectOptions, setSelectOptions] = useState({});

    useEffect(() => {
        const fetchSelectOptions = async () => {
            const newOptions = {};
            for (const field of currentSchema) {
                if (field.type === "select" && field.endpoint) {
                    try {
                        const token = localStorage.getItem('token');
                        const res = await fetch(`http://localhost:5000/api/${field.endpoint}`, {
                            headers: { 'Authorization': `Bearer ${token}` }
                        });

                        if (res.status === 401) {
                            alert("Час вашої сесії вийшов. Будь ласка, увійдіть знову");
                            localStorage.removeItem('token');
                            localStorage.removeItem('role');
                            window.location.href = '/login';
                            return;
                        }

                        if (res.status === 403) {
                            alert("У вас немає прав доступу до цієї дії чи таблиці");
                            return;
                        }

                        const data = await res.json();
                        newOptions[field.name] = data.data || data;
                    } catch (error) {
                        console.error(`Помилка завантаження для ${field.name}:`, error);
                    }
                }
            }
            setSelectOptions(newOptions);
        };

        fetchSelectOptions();
    }, [currentSchema]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const recordData = Object.fromEntries(formData.entries());

        currentSchema.forEach(field => {
            if (field.type === "checkbox") {
                recordData[field.name] = recordData[field.name] === "on" ? 1 : 0;
            }
        });

        try {
            const token = localStorage.getItem('token');
            const method = isEditing ? 'PATCH' : 'POST';

            const id = isEditing ? (initialData.id_employee || initialData.UPC || initialData.id_card || initialData.id_product || Object.values(initialData)[0]) : '';

            const url = isEditing
                ? `http://localhost:5000/api/${category.link}/${id}`
                : `http://localhost:5000/api/${category.link}`;

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(recordData)
            });

            if (response.status === 401) {
                alert("Час вашої сесії вийшов. Будь ласка, увійдіть знову");
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                window.location.href = '/login';
                return;
            }

            if (response.status === 403) {
                alert(" У вас немає прав доступу до цієї дії чи таблиці");
                return;
            }

            if (!response.ok) throw new Error('Помилка при збереженні');

            alert(isEditing ? "Успішно оновлено!" : "Успішно додано!");
            onSuccess();
            onClose();

        } catch (error) {
            console.error("Помилка:", error);
            alert("Не вдалося зберегти запис");
        }
    };

    if (currentSchema.length === 0) {
        return <div style={{ padding: "15px" }}>Схема форми для цієї категорії ще не налаштована</div>;
    }

    return (
        <div className={style.overlay} onClick={onClose}>
            <div className={style.popupContainer} onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit} className={style.form}>

                    <h3 className={style.title}>
                        {isEditing ? "Редагувати запис" : "Додати новий запис"}
                    </h3>

                    {currentSchema.map((field) => {

                        if (field.type === "checkbox") {
                            return (
                                <label key={field.name} className={style.checkboxLabel}>
                                    <input
                                        name={field.name}
                                        type="checkbox"
                                        defaultChecked={initialData?.[field.name] === 1}
                                        className={style.checkboxInput}
                                    />
                                    {field.label}
                                </label>
                            );
                        }

                        if (field.type === "select") {
                            let defaultSelectValue = initialData?.[field.name] || (field.labelKey ? initialData?.[field.labelKey] : "") || "";

                            if (field.endpoint && selectOptions[field.name]) { 
                                const matchedOption = selectOptions[field.name].find(
                                    opt => String(opt[field.valueKey]).trim() === String(defaultSelectValue).trim() ||
                                        String(opt[field.labelKey]).trim() === String(defaultSelectValue).trim()
                                );

                                if (matchedOption) {
                                    defaultSelectValue = matchedOption[field.valueKey];
                                }
                            }

                            return (
                                <div key={field.name} className={style.inputGroup}>
                                    <span className={style.inputLabel}>{field.label}</span>
                                    <select
                                        key={`${field.name}-${selectOptions[field.name] ? 'loaded' : 'loading'}`}
                                        name={field.name}
                                        defaultValue={defaultSelectValue}
                                        required={field.required}
                                        className={style.selectField}
                                    >
                                        <option value="" disabled>Оберіть {field.label.toLowerCase()}</option>

                                        {field.options && field.options.map(opt => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}

                                        {field.endpoint && selectOptions[field.name]?.map(opt => (
                                            <option key={opt[field.valueKey]} value={opt[field.valueKey]}>
                                                {opt[field.labelKey]}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            );
                        }

                        const isPrimaryKey = field.name === "UPC" || field.name === "id_employee" || field.name === "id_product" || field.name === "id_card" || field.name === "id_category" || field.name === "id_check";
                        let defaultValue = initialData?.[field.name] || "";

                        if (!isEditing && isPrimaryKey) {
                            defaultValue = generateId(field.name);
                        }

                        return (
                            <div key={field.name} className={style.inputGroup}>
                                <span className={style.inputLabel}>{field.label}</span>
                                <input
                                    name={field.name}
                                    type={field.type}
                                    step={field.step}
                                    defaultValue={defaultValue}
                                    placeholder={`Введіть ${field.label.toLowerCase()}`}
                                    required={field.required}
                                    className={style.inputField}
                                    readOnly={isEditing && isPrimaryKey}
                                />
                            </div>
                        );
                    })}

                    <div className={style.buttonGroup}>
                        <button type="button" onClick={onClose} className={style.cancelButton}>
                            Скасувати
                        </button>
                        <button type="submit" className={style.submitButton}>
                            {isEditing ? "Оновити" : "Зберегти"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}