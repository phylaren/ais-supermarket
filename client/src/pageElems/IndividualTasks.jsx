import { useState } from 'react';
import style from "../main/Main.module.css";
import tableStyle from "./table.module.css";

export default function IndividualTasks() {
    const [categoryRevenue, setCategoryRevenue] = useState(null);
    const [universalCashiers, setUniversalCashiers] = useState(null);
    
    const [categoryNameInput, setCategoryNameInput] = useState('');
    const [fullChecks, setFullChecks] = useState(null);

    const [idCardInput, setIdCardInput] = useState('');
    const [customerSpendings, setCustomerSpendings] = useState(null);

    const fetchTask = async (endpoint, setter, params = '') => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/individual-tasks/${endpoint}${params}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const result = await response.json();
            if (result.success) {
                setter(result.data);
            } else {
                alert(result.message || "Помилка при завантаженні даних");
            }
        } catch (error) {
            console.error(error);
            alert("Помилка підключення до сервера");
        }
    };

    return (
        <div className={style.contentArea} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <h2 style={{ color: "#0f172a", margin: "0 0 10px 0" }}>Аналітичні звіти</h2>

            <div style={{ background: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0", padding: "24px" }}>
                <h3 style={{ marginTop: 0, color: "#334155", marginBottom: "20px" }}>Дохід та продажі за категоріями</h3>
                
                <button className={style.primaryButton} onClick={() => fetchTask('category-revenue', setCategoryRevenue)}>
                    Завантажити звіт
                </button>
                
                {categoryRevenue && (
                    <div className={tableStyle.tableWrapper} style={{ marginTop: "20px" }}>
                        <table className={tableStyle.styledTable}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Категорія</th>
                                    <th style={{ textAlign: "right" }}>К-сть проданого</th>
                                    <th style={{ textAlign: "right" }}>Загальний дохід</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categoryRevenue.map((row, i) => (
                                    <tr key={i}>
                                        <td>{row.id_category}</td>
                                        <td>{row.category_name}</td>
                                        <td style={{ textAlign: "right" }}>{row.total_quantity_sold} шт.</td>
                                        <td style={{ textAlign: "right", fontWeight: "bold", color: "#16a34a" }}>
                                            {Number(row.total_revenue).toLocaleString('uk-UA', { minimumFractionDigits: 2 })} ₴
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div style={{ background: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0", padding: "24px" }}>
                <h3 style={{ marginTop: 0, color: "#334155", marginBottom: "20px" }}>Універсальні касири (обслужили всі типи клієнтів)</h3>
                
                <button className={style.primaryButton} onClick={() => fetchTask('universal-cashiers', setUniversalCashiers)}>
                    Знайти касирів
                </button>
                
                {universalCashiers && (
                    <div className={tableStyle.tableWrapper} style={{ marginTop: "20px" }}>
                        <table className={tableStyle.styledTable}>
                            <thead>
                                <tr>
                                    <th>ID Працівника</th>
                                    <th>Прізвище та Ім'я</th>
                                </tr>
                            </thead>
                            <tbody>
                                {universalCashiers.length > 0 ? (
                                    universalCashiers.map((c, i) => (
                                        <tr key={i}>
                                            <td>{c.id_employee}</td>
                                            <td style={{ fontWeight: "500", color: "#0f172a" }}>{c.empl_surname} {c.empl_name}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="2" style={{ textAlign: "center", color: "#64748b", padding: "30px" }}>Таких касирів не знайдено</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div style={{ background: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0", padding: "24px" }}>
                <h3 style={{ marginTop: 0, color: "#334155", marginBottom: "20px" }}>Чеки, що містять усі товари певної категорії</h3>
                
                <div className={style.inputGroup}>
                    <input 
                        type="text" 
                        className={style.actionInput}
                        placeholder="Назва категорії (напр. Молочка)" 
                        value={categoryNameInput}
                        onChange={(e) => setCategoryNameInput(e.target.value)}
                    />
                    <button className={style.primaryButton} onClick={() => fetchTask('full-category-checks', setFullChecks, `?category_name=${categoryNameInput}`)}>
                        Пошук
                    </button>
                </div>
                
                {fullChecks && (
                    <div className={tableStyle.tableWrapper}>
                        <table className={tableStyle.styledTable}>
                            <thead>
                                <tr>
                                    <th>ID Чеку</th>
                                    <th>Дата друку</th>
                                    <th style={{ textAlign: "right" }}>Сума чеку</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fullChecks.length > 0 ? (
                                    fullChecks.map((check, i) => (
                                        <tr key={i}>
                                            <td>{check.id_check}</td>
                                            <td>{new Date(check.print_date).toLocaleString('uk-UA')}</td>
                                            <td style={{ textAlign: "right", fontWeight: "bold", color: "#0f172a" }}>
                                                {Number(check.sum_total).toLocaleString('uk-UA', { minimumFractionDigits: 2 })} ₴
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="3" style={{ textAlign: "center", color: "#64748b", padding: "30px" }}>Таких чеків не знайдено</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div style={{ background: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0", padding: "24px" }}>
                <h3 style={{ marginTop: 0, color: "#334155", marginBottom: "20px" }}>Витрати клієнта за категоріями</h3>
                
                <div className={style.inputGroup}>
                    <input 
                        type="text" 
                        className={style.actionInput}
                        placeholder="ID Картки клієнта" 
                        value={idCardInput}
                        onChange={(e) => setIdCardInput(e.target.value)}
                    />
                    <button className={style.primaryButton} onClick={() => fetchTask('customer-spendings', setCustomerSpendings, `?id_card=${idCardInput}`)}>
                        Розрахувати
                    </button>
                </div>
                
                {customerSpendings && (
                    <div className={tableStyle.tableWrapper}>
                        <table className={tableStyle.styledTable}>
                            <thead>
                                <tr>
                                    <th>Категорія</th>
                                    <th style={{ textAlign: "right" }}>Витрачено</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customerSpendings.length > 0 ? (
                                    customerSpendings.map((row, i) => (
                                        <tr key={i}>
                                            <td>{row.category_name}</td>
                                            <td style={{ textAlign: "right", fontWeight: "bold", color: "#0f172a" }}>
                                                {Number(row.TotalByCategory).toLocaleString('uk-UA', { minimumFractionDigits: 2 })} ₴
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="2" style={{ textAlign: "center", color: "#64748b", padding: "30px" }}>Немає даних для цієї картки</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        </div>
    );
}