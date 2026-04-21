import { useState, useEffect } from "react";
import FiltersPanel from "../pageElems/FiltersPanel.jsx";
import style from "../main/Main.module.css";
import tableStyle from "./table.module.css";
import GoToMainButton from "./GoToMainButton.jsx";
import { getUserRole } from './getUserRole.js'

import IndividualTasks from "./IndividualTasks.jsx";

export default function StatisticsView({ category }) {
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [cashierRevenue, setCashierRevenue] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
    const currentDay = today.toISOString().split('T')[0];

    const [filterValues, setFilterValues] = useState({
        receipt_date_from: firstDay,
        receipt_date_to: currentDay,
        surname: ""
    });

    const [appliedFilters, setAppliedFilters] = useState({
        receipt_date_from: firstDay,
        receipt_date_to: currentDay,
        surname: ""
    });

    const [selectOptions, setSelectOptions] = useState({});
    const userRole = getUserRole();

    const fetchStats = async (filters) => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const headers = { 'Authorization': `Bearer ${token}` };

            const totalParams = new URLSearchParams();

            if (filters.receipt_date_from) {
                totalParams.append('start', `${filters.receipt_date_from} 00:00:00`);
            }

            if (filters.receipt_date_to) {
                totalParams.append('end', `${filters.receipt_date_to} 23:59:59`);
            }

            const totalQuery = totalParams.toString();

            const cashierParams = new URLSearchParams(totalParams);
            if (filters.surname) cashierParams.append('surname', filters.surname);
            const cashierQuery = cashierParams.toString();

            const cashierFetchPromise = filters.surname
                ? fetch(`http://localhost:5000/api/receipt/cashier-revenue?${cashierQuery}`, { headers })
                : Promise.resolve({ ok: true, status: 200, json: async () => ({ data: [] }) });

            const [totalRes, cashierRes] = await Promise.all([
                fetch(`http://localhost:5000/api/receipt/total-revenue?${totalQuery}`, { headers }),
                cashierFetchPromise
            ]);

            if (totalRes.status === 401 || cashierRes.status === 401) {
                alert("⏳ Час вашої сесії вийшов. Будь ласка, увійдіть знову");
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                window.location.href = '/login';
                return;
            }

            if (totalRes.status === 403 || cashierRes.status === 403) {
                alert("🚫 У вас немає прав доступу до цієї статистики");
                return;
            }

            if (!totalRes.ok) throw new Error("Помилка завантаження загальної суми");
            if (!cashierRes.ok) throw new Error("Помилка завантаження даних касира");

            const totalData = await totalRes.json();
            const cashierData = await cashierRes.json();


            let rawTotal = totalData.data?.total_revenue ?? totalData.data?.total_sum ?? totalData.data ?? 0;

            if (typeof rawTotal === 'object' || isNaN(Number(rawTotal))) {
                rawTotal = 0;
            }

            setTotalRevenue(rawTotal);

            let cRev = cashierData.data || cashierData;
            setCashierRevenue(Array.isArray(cRev) ? cRev : (cRev ? [cRev] : []));

        } catch (error) {
            console.error("Помилка статистики:", error);
            setTotalRevenue(0);
            setCashierRevenue([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const loadOptions = async () => {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:5000/api/employee?empl_role=Касир`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setSelectOptions({ surname: data.data || data });
            }
        };

        loadOptions();
        setAppliedFilters(filterValues);
        fetchStats(filterValues);
    }, []);

    const handleApplyFilters = () => {
        if (!filterValues.receipt_date_from || !filterValues.receipt_date_to) {
            alert("⚠️ Будь ласка, оберіть і початкову, і кінцеву дату");
            return;
        }

        if (filterValues.receipt_date_from > filterValues.receipt_date_to) {
            alert("⚠️ Помилка: Початкова дата не може бути пізнішою за кінцеву!");
            return;
        }

        setAppliedFilters(filterValues);
        fetchStats(filterValues);
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
        <div className={style.pageContainer}>
            <FiltersPanel
                currentFilters={[
                    {
                        type: "date-range", name: "receipt_date", label: "Період чеків"
                    },
                    {
                        type: "select", name: "surname", label: "Касир",
                        endpoint: "employee/role/Касир",
                        valueKey: "empl_surname", labelKey: "empl_surname", requiresManager: true
                    }
                ]}
                userRole={userRole}
                filterValues={filterValues}
                handleInputChange={(name, val) => setFilterValues(prev => ({ ...prev, [name]: val }))}
                selectOptions={selectOptions}
                handleApplyFilters={handleApplyFilters}
                handleResetFilters={handleResetFilters}
            />

            {isLoading ? (
                <div className={style.waitingScreen}>Аналізуємо дані... 📊⏳</div>
            ) : (
                <div style={{ display: "grid", gap: "20px", marginTop: "20px" }}>

                    <div style={{ padding: "20px", background: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                        <span style={{ color: "#64748b" }}>Загальна виручка магазину за обраний період</span>
                        <div style={{ fontSize: "28px", fontWeight: "bold", color: "#16a34a", marginTop: "10px" }}>
                            {Number(totalRevenue).toLocaleString('uk-UA', { minimumFractionDigits: 2 })} ₴
                        </div>
                    </div>

                    <div style={{ background: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
                        <h3 style={{ padding: "15px 20px", margin: 0, borderBottom: "1px solid #e2e8f0", backgroundColor: "#f8fafc", color: "#334155" }}>
                            Деталізація по касиру
                        </h3>

                        <div className={style.tableContainer}>

                            {!appliedFilters.surname ? (
                                <div className={tableStyle.waitingScreen} style={{ border: "none", boxShadow: "none", marginTop: 0 }}>
                                    👆 Оберіть касира у панелі фільтрів вище та натисніть "Знайти", щоб побачити його особисту виручку
                                </div>
                            ) : cashierRevenue.length > 0 ? (
                                <table className={tableStyle.styledTable}>
                                    <thead>
                                        <tr>
                                            <th>Прізвище</th>
                                            <th style={{ textAlign: "right" }}>Особиста виручка</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cashierRevenue.map((item, idx) => {
                                            const surnameToDisplay = item.empl_surname || item.surname || item.name || appliedFilters.surname;
                                            const revenueToDisplay = item.total_revenue || item.total_sum || item.revenue || item.sum || 0;

                                            return (
                                                <tr key={idx}>
                                                    <td>{surnameToDisplay}</td>
                                                    <td style={{ textAlign: "right", fontWeight: "bold", color: "#0f172a" }}>
                                                        {Number(revenueToDisplay).toLocaleString('uk-UA', { minimumFractionDigits: 2 })} ₴
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            ) : (
                                <div className={tableStyle.waitingScreen} style={{ border: "none", boxShadow: "none", marginTop: 0, color: "#ef4444" }}>
                                    За обраний період цей касир не має чеків
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            )}
            <div style={{ marginTop: "40px", borderTop: "2px dashed #cbd5e1", paddingTop: "20px" }}>
                <IndividualTasks />
            </div>
            <GoToMainButton></GoToMainButton>
        </div>
    );
}



