export default function FiltersPanel({
    currentFilters,
    userRole,
    activeSort,
    handleSortClick,
    filterValues,
    handleInputChange,
    selectOptions,
    handleApplyFilters,
    handleResetFilters
}) {
    return (
        <div className="noPrint" style={{
            padding: "20px",
            backgroundColor: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            marginBottom: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "15px"
        }}>
            <span style={{ fontWeight: "600", color: "#475569", fontSize: "16px" }}>
                Панель інструментів та фільтрів
            </span>

            <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", alignItems: "flex-end" }}>
                {currentFilters.map((filter, idx) => {
                    if (filter.requiresManager && userRole !== "Менеджер") return null;

                    if (filter.type === "button" || filter.type === "action") {
                        const isAction = filter.type === "action";
                        const isActive = activeSort === filter.link;
                        return (
                            <button
                                key={idx}
                                onClick={() => isAction ? console.log("Виклик дії:", filter.actionType) : handleSortClick(filter.link)}
                                style={{
                                    padding: "8px 16px",
                                    borderRadius: "6px",
                                    border: isActive ? "1px solid #1677ff" : "1px solid #d9d9d9",
                                    backgroundColor: isActive ? "#e6f4ff" : (isAction ? "#fffbe6" : "#fff"),
                                    color: isActive ? "#1677ff" : (isAction ? "#d48806" : "#333"),
                                    cursor: "pointer",
                                    fontWeight: isAction ? "bold" : "normal",
                                    transition: "all 0.2s ease",
                                    height: "38px"
                                }}
                            >
                                {filter.label}
                            </button>
                        );
                    }

                    if (filter.type === "input") {
                        return (
                            <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                                <label style={{ fontSize: "14px", fontWeight: "500" }}>{filter.label}</label>
                                <input
                                    type={filter.inputType || "text"}
                                    value={filterValues[filter.name] || ""}
                                    placeholder={filter.placeholder}

                                    min={filter.min}
                                    max={filter.max}

                                    onChange={(e) => handleInputChange(filter.name, e.target.value)}

                                    onKeyDown={(e) => {
                                        if (filter.inputType === "number") {
                                            if (['-', '+', 'e', 'E'].includes(e.key)) {
                                                e.preventDefault();
                                            }

                                            if (e.key === '0' && e.target.value === "") {
                                                e.preventDefault();
                                            }
                                        }
                                    }}

                                    onBlur={(e) => {
                                        if (filter.inputType === "number" && e.target.value !== "") {
                                            let num = Number(e.target.value);
                                            if (filter.max !== undefined && num > filter.max) {
                                                handleInputChange(filter.name, filter.max);
                                            }
                                            if (filter.min !== undefined && num < filter.min) {
                                                handleInputChange(filter.name, filter.min);
                                            }
                                        }
                                    }}

                                    style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", minWidth: "200px" }}
                                />
                            </div>
                        );
                    }

                    if (filter.type === "select") {
                        return (
                            <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                                <label style={{ fontSize: "13px", color: "#64748b" }}>{filter.label}</label>
                                <select
                                    value={filterValues[filter.name] || ""}
                                    onChange={(e) => handleInputChange(filter.name, e.target.value)}
                                    style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #ccc", height: "38px", minWidth: "150px" }}
                                >
                                    <option value="">-- Всі --</option>

                                    {filter.options && filter.options.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}

                                    {filter.endpoint && selectOptions[filter.name]?.map(opt => (
                                        <option key={opt[filter.valueKey]} value={opt[filter.valueKey]}>
                                            {opt[filter.labelKey]}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        );
                    }

                    if (filter.type === "date-range") {
                        return (
                            <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                                <label style={{ fontSize: "13px", color: "#64748b" }}>{filter.label}</label>
                                <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                                    <input
                                        type="date"
                                        value={filterValues.receipt_date_from || ""}
                                        onChange={(e) => handleInputChange('receipt_date_from', e.target.value)}
                                        onKeyDown={(e) => e.preventDefault()}

                                        max={filterValues.receipt_date_to || "2099-12-31"}
                                    />
                                    <span style={{ color: "#94a3b8" }}>—</span>
                                    <input
                                        type="date"
                                        value={filterValues.receipt_date_to || ""}
                                        onChange={(e) => handleInputChange('receipt_date_to', e.target.value)}
                                        onKeyDown={(e) => e.preventDefault()}

                                        min={filterValues.receipt_date_from || ""}
                                        max="2099-12-31"
                                    />
                                </div>
                            </div>
                        );
                    }

                    return null;
                })}

                {currentFilters.some(f => f.type !== "button" && f.type !== "action") && (
                    <div style={{ marginLeft: "auto", display: "flex", gap: "10px" }}>
                        <button
                            onClick={handleResetFilters}
                            style={{
                                padding: "0 20px",
                                height: "38px",
                                backgroundColor: "#fff",
                                color: "#64748b",
                                border: "1px solid #cbd5e1",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontWeight: "500"
                            }}
                        >
                            Скинути
                        </button>
                        <button
                            onClick={handleApplyFilters}
                            style={{
                                padding: "0 20px",
                                height: "38px",
                                backgroundColor: "#1677ff",
                                color: "white",
                                border: "none",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontWeight: "500",
                            }}
                        >
                            Застосувати
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}