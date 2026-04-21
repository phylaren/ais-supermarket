import style from "./Table.module.css";
import { ukrHeaders } from "./ukrHeaders.js";
import { filters } from "./filters.js";
import FiltersPanel from "./FiltersPanel.jsx";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getUserRole } from './getUserRole.js'

const NO_FILTERS = [];
function getAttributes(data) {
    if (!data || data.length === 0) return [];
    return Object.keys(data[0]);
}

export default function Table({
    data, category, onDelete, onAddClick, onEditClick,
    searchTerm, setSearchTerm, filterValues, setFilterValues,
    onApplyFilters, isLoading
}) {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [activeSort, setActiveSort] = useState(null);

    const [selectOptions, setSelectOptions] = useState({});

    const userRole = getUserRole();

    const currentFilters = filters[category.link] || NO_FILTERS;

    const navigate = useNavigate();

    const handleCustomAddClick = () => {
        if (category.link === "receipt/my-receipts") {
            navigate("/main/receipt/create");
        } else {
            onAddClick();
        }
    };

    useEffect(() => {
        if (!isFilterOpen || currentFilters.length === 0) return;
        const fetchFilterOptions = async () => {
            const newOptions = {};
            for (const filter of currentFilters) {
                if (filter.requiresManager && userRole !== 'Менеджер') {
                    continue;
                }
                if (filter.type === "select" && filter.endpoint) {
                    try {
                        const token = localStorage.getItem('token');
                        const res = await fetch(`http://localhost:5000/api/${filter.endpoint}`, {
                            headers: { 'Authorization': `Bearer ${token}` }
                        });
                        if (res.ok) {
                            const result = await res.json();
                            newOptions[filter.name] = result.data || result;
                        }
                    } catch (error) {
                        console.error(`Помилка завантаження фільтра ${filter.name}:`, error);
                    }
                }
            }
            setSelectOptions(newOptions);
        };

        fetchFilterOptions();
    }, [isFilterOpen, category.link]);


    const attributes = getAttributes(data);

    const currentDate = new Date().toLocaleDateString('uk-UA', {
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });


    const handleSortClick = (value) => {
        setActiveSort(activeSort === value ? null : value);
        console.log("Вибрано сортування:", value);
    };

    const handleInputChange = (name, value) => {
        setFilterValues(prev => ({ ...prev, [name]: value }));
    };

    const handleApplyFilters = () => {
        onApplyFilters();
    };

    const handleResetFilters = () => {
        const today = new Date();
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
        const currentDay = today.toISOString().split('T')[0];

        const defaultFilters = {
            receipt_date_from: firstDay,
            receipt_date_to: currentDay,
            surname: ""
        };

        setFilterValues(defaultFilters);
        setAppliedFilters(defaultFilters);

        fetchStats(defaultFilters); 
    };

    return (
        <div>
            <Filters
                category={category}
                onAddClick={handleCustomAddClick}
                onPrint={() => window.print()}
                isFilterOpen={isFilterOpen}
                onToggleSort={() => setIsFilterOpen(!isFilterOpen)}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onSearchEnter={onApplyFilters}
            />

            {isFilterOpen && currentFilters.length > 0 && (
                <FiltersPanel
                    currentFilters={currentFilters}
                    userRole={userRole}
                    activeSort={activeSort}
                    handleSortClick={handleSortClick}
                    filterValues={filterValues}
                    handleInputChange={handleInputChange}
                    selectOptions={selectOptions}
                    handleApplyFilters={handleApplyFilters}
                    handleResetFilters={handleResetFilters}
                />
            )}

            <div className={style.tableWrapper}>

                <div className="printOnly" style={{ textAlign: "center", marginBottom: "20px" }}>
                    <h2 style={{ margin: "0 0 10px 0" }}>Звіт: {category.name}</h2>
                    <p style={{ margin: 0, fontStyle: "italic" }}>
                        Міні-супермаркет «ZLAGODA»<br />
                        Сформовано: {currentDate}
                    </p>
                </div>

                {isLoading ? (
                    <div className={style.waitingScreen}>Завантажую дані... </div>
                ) : data.length === 0 ? (
                    <div className={style.waitingScreen} style={{ color: "#64748b" }}>
                        Даних немає <br />
                        <span style={{ fontSize: "14px", fontWeight: "normal" }}>
                            (Або таблиця пуста, або за вашими фільтрами нічого не знайдено)
                        </span>
                    </div>
                ) : (
                    <table className={style.styledTable}>
                        <Attributes attributes={attributes} />
                        <Data
                            data={data}
                            onDelete={onDelete}
                            onEditClick={onEditClick}
                            category={category}
                        />
                    </table>
                )}
            </div>
        </div>
    );
}

function Filters({ onAddClick, category, searchTerm, setSearchTerm, onPrint, onToggleSort, isFilterOpen, onSearchEnter }) {
    const canSearch = category?.functions?.search;
    const canFilter = category?.functions?.filter;
    const canCreate = category?.rules?.create;
    const canPrint = category?.functions?.print;

    return (
        <div className="noPrint" style={{ display: "flex", gap: "10px", marginBottom: "15px", flexWrap: "wrap", alignItems: "center" }}>
            {canFilter && (
                <button
                    type="button"
                    onClick={onToggleSort}
                    style={{
                        padding: "8px 15px",
                        cursor: "pointer",
                        borderRadius: "4px",
                        border: isFilterOpen ? "1px solid #1677ff" : "1px solid #ccc",
                        backgroundColor: isFilterOpen ? "#e6f4ff" : "#fff",
                        color: isFilterOpen ? "#1677ff" : "#000",
                        transition: "all 0.2s ease",
                        fontWeight: isFilterOpen ? "600" : "normal"
                    }}
                >
                    ⇅ Фільтр
                </button>
            )}

            {canPrint && (
                <button
                    type="button"
                    onClick={onPrint}
                    style={{ padding: "8px 15px", cursor: "pointer", borderRadius: "4px", border: "1px solid #ccc", backgroundColor: "#fff" }}
                >
                    🖨 Роздрукувати
                </button>
            )}

            {canCreate && (
                <button
                    type="button"
                    onClick={onAddClick}
                    style={{ padding: "8px 15px", cursor: "pointer", borderRadius: "4px", border: "none", backgroundColor: "#4CAF50", color: "white" }}
                >
                    + Додати
                </button>
            )}

            {canSearch && (
                <input
                    type="text"
                    placeholder="🔍 Пошук по таблиці..."
                    value={searchTerm || ""}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') onSearchEnter(); }}
                    style={{ padding: "8px 15px", borderRadius: "4px", border: "1px solid #ccc", marginLeft: "auto", minWidth: "250px" }}
                />
            )}
        </div>
    );
}

function Attributes({ attributes }) {
    return (
        <thead>
            <tr>
                {attributes.map((attribute) => (
                    <th key={attribute}>
                        {ukrHeaders[attribute] || attribute}
                    </th>
                ))}
                <th></th>
            </tr>
        </thead>
    );
}

function Data({ data, onDelete, onEditClick, category }) {
    const canEdit = category?.rules?.edit;
    const canDelete = category?.rules?.delete;

    return (
        <tbody>
            {data.map((row, rowIndex) => {
                const rowId = Object.values(row)[0];

                return (
                    <tr key={rowIndex}>
                        {Object.entries(row).map(([key, value], colIndex) => {
                            
                            let safeValue = value;
                            if (value === null || value === undefined) safeValue = "—";
                            if (key === "promotional_product") {
                                safeValue = value === 1 ? "Так" : "Ні";
                            }
                            else if (typeof value === 'boolean') safeValue = value ? "Так" : "Ні";

                            return <td key={colIndex}>{safeValue}</td>;
                        })}

                        <td style={{ display: "flex", gap: "5px" }}>
                            {canEdit && <button
                                type="button"
                                onClick={() => onEditClick(row)}
                                style={{ backgroundColor: "#faad14", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}
                            >
                                Редагувати
                            </button>}

                            {canDelete && <button
                                type="button"
                                onClick={() => onDelete(rowId)}
                                style={{ backgroundColor: "#ff4d4f", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}
                            >
                                Видалити
                            </button>}
                        </td>
                    </tr>
                );
            })}
        </tbody>
    );
}