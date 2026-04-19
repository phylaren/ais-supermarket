import style from "./Table.module.css";
import { ukrHeaders } from "./ukrHeaders.js";
import { filters } from "./filters.js";

import { useState } from "react";

const NO_FILTERS = [];
function getAttributes(data) {
    if (!data || data.length === 0) return [];
    return Object.keys(data[0]);
}

export default function Table({ data, category, onDelete, onAddClick, onEditClick }) {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [activeSort, setActiveSort] = useState(null);
    
    if (!data || data.length === 0) {
        return <div className={style.waitingScreen}>Завантажую таблицю...⏳</div>;
    }
    
    const attributes = getAttributes(data);

    const currentDate = new Date().toLocaleDateString('uk-UA', {
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    const currentFilters = filters[category.link] || NO_FILTERS;

    const handleSortClick = (value) => {
        setActiveSort(activeSort === value ? null : value);
    };
    
    return (
        <div>
            <Filters
                category={category}
                onAddClick={onAddClick}
                onPrint={() => window.print()}
                isFilterOpen={isFilterOpen}
                onToggleSort={()=> setIsFilterOpen(!isFilterOpen)}
            />

            {isFilterOpen && currentFilters.length > 0 && (
                <div className="noPrint" style={{ 
                    padding: "15px", 
                    backgroundColor: "#f8fafc", 
                    border: "1px solid #e2e8f0", 
                    borderRadius: "6px", 
                    marginBottom: "15px", 
                    display: "flex", 
                    gap: "10px", 
                    flexWrap: "wrap" 
                }}>
                    <span style={{ fontWeight: "600", color: "#475569", display: "flex", alignItems: "center", marginRight: "10px" }}>
                        Сортувати за:
                    </span>
                    {currentFilters.map((filter) => (
                        <button
                            key={filter.value}
                            onClick={() => handleSortClick(filter.value)}
                            style={{
                                padding: "6px 12px",
                                borderRadius: "4px",
                                border: activeSort === filter.value ? "1px solid #1677ff" : "1px solid #d9d9d9",
                                backgroundColor: activeSort === filter.value ? "#e6f4ff" : "#fff",
                                color: activeSort === filter.value ? "#1677ff" : "#000",
                                cursor: "pointer",
                                transition: "all 0.2s ease"
                            }}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            )}

            <div className={style.tableWrapper}>

                <div className="printOnly" style={{ textAlign: "center", marginBottom: "20px" }}>
                    <h2 style={{ margin: "0 0 10px 0" }}>Звіт: {category.name}</h2>
                    <p style={{ margin: 0, fontStyle: "italic" }}>
                        Міні-супермаркет «ZLAGODA»<br />
                        Сформовано: {currentDate}
                    </p>
                </div>

                <table className={style.styledTable}>
                    <Attributes attributes={attributes} />
                    <Data
                        data={data}
                        onDelete={onDelete}
                        onEditClick={onEditClick}
                        category={category}
                    />
                </table>
            </div>
        </div>
    );
}

function Filters({ onAddClick, category, searchTerm, setSearchTerm, onPrint, onToggleSort, isFilterOpen }) {
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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                        {Object.values(row).map((value, colIndex) => {
                            let safeValue = value;
                            if (value === null || value === undefined) safeValue = "—";
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