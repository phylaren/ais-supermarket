import { useState, useEffect } from "react";
import tableStyle from "./table.module.css";
import style from "./popup.module.css";

export default function CheckPopup({ id_check, onClose }) {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id_check) return;

        const fetchDetails = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const res = await fetch(`http://localhost:5000/api/receipt/by-id/${id_check}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const result = await res.json();
                if (result.success) {
                    setDetails(result.data);
                }
            } catch (err) {
                console.error("Помилка запиту:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id_check]);

    if (loading) return (
        <div className={style.overlay} onClick={onClose}>
            <div className={style.popupContainer}>Завантаження...</div>
        </div>
    );

    if (!details || details.length === 0) return null;

    const header = details[0];

    return (
        <div className={style.overlay} onClick={onClose}>
            <div className={style.popupContainer} onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
                <h3 className={style.title}>Чек №{id_check}</h3>

                <div style={{ marginBottom: '20px', fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
                    <p><strong>Касир:</strong> {header.empl_surname}</p>
                    <p><strong>Дата:</strong> {new Date(header.print_date).toLocaleString('uk-UA')}</p>
                </div>

                <div className={tableStyle.tableWrapper}>
                    <table className={tableStyle.styledTable}>
                        <thead>
                            <tr>
                                <th>Товар</th>
                                <th style={{ textAlign: 'center' }}>К-сть</th>
                                <th style={{ textAlign: 'right' }}>Ціна</th>
                            </tr>
                        </thead>
                        <tbody>
                            {details.map((item, idx) => (
                                <tr key={idx}>
                                    <td>{item.product_name}</td>
                                    <td style={{ textAlign: 'center' }}>{item.product_number}</td>
                                    <td style={{ textAlign: 'right' }}>{Number(item.selling_price).toFixed(2)} ₴</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={{ marginTop: '20px', borderTop: '2px dashed #e2e8f0', paddingTop: '15px', textAlign: 'right' }}>
                    <p style={{ color: '#64748b', fontSize: '13px' }}>ПДВ (20%): {Number(header.vat).toFixed(2)} ₴</p>
                    <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a' }}>
                        РАЗОМ: {Number(header.sum_total).toFixed(2)} ₴
                    </p>
                </div>

                <button className={style.cancelButton} onClick={onClose} style={{ width: '100%', marginTop: '20px' }}>
                    Закрити
                </button>
            </div>
        </div>
    );
}