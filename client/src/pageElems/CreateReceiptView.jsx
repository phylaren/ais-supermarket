import { useState, useEffect } from "react";
import style from "../main/Main.module.css";
import tableStyle from "./table.module.css";
import GoToMainButton from "./GoToMainButton";

export default function CreateReceiptView({ category }) {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [cart, setCart] = useState([]);

    const [activeTab, setActiveTab] = useState("search");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [filterValues, setFilterValues] = useState({ promo_status: "all", sort_by: "" });

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
        setSearchQuery("");
        setSelectedCategory("");
        setFilterValues({ promo_status: "all", sort_by: "" });
    };

    const [cardNumber, setCardNumber] = useState("");
    const [customerCard, setCustomerCard] = useState(null);
    const [cardError, setCardError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = { 'Authorization': `Bearer ${token}` };

            const [prodRes, catRes] = await Promise.all([
                fetch('http://localhost:5000/api/store-product/all-by-name/', { headers }),
                fetch('http://localhost:5000/api/category', { headers })
            ]);

            if (prodRes.ok) {
                const prodData = await prodRes.json();
                setProducts(Array.isArray(prodData.data) ? prodData.data : []);
            }

            if (catRes.ok) {
                const catData = await catRes.json();
                setCategories(Array.isArray(catData.data) ? catData.data : []);
            }
        } catch (error) {
            console.error("Помилка завантаження даних:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleFindCard = async () => {
        if (!cardNumber.trim()) {
            setCustomerCard(null); setCardError(""); return;
        }
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:5000/api/customer-card/${cardNumber}`, { headers: { 'Authorization': `Bearer ${token}` } });
            if (res.ok) {
                const data = await res.json();
                const card = data.data || data;
                if (card && card.id_card) { setCustomerCard(card); setCardError(""); }
                else { setCustomerCard(null); setCardError("Картку не знайдено"); }
            } else { setCustomerCard(null); setCardError("Картку не знайдено"); }
        } catch (error) { setCardError("Помилка пошуку"); }
    };

    const addToCart = (product) => {
        if (product.products_number < 1) {
            alert("Цього товару більше немає на складі!");
            return;
        }
        setCart(prevCart => {
            const existing = prevCart.find(item => item.UPC === product.UPC);
            if (existing) {
                if (existing.qty + 1 > product.products_number) {
                    alert(`На складі лишилося лише ${product.products_number} шт.`); return prevCart;
                }
                return prevCart.map(item => item.UPC === product.UPC ? { ...item, qty: item.qty + 1 } : item);
            }
            return [...prevCart, { ...product, qty: 1 }];
        });
    };

    const updateQuantity = (UPC, delta) => {
        setCart(prevCart => prevCart.map(item => {
            if (item.UPC === UPC) {
                const newQty = item.qty + delta;
                if (newQty < 1) return item;
                if (newQty > item.products_number) { alert(`На складі лишилося лише ${item.products_number} шт.`); return item; }
                return { ...item, qty: newQty };
            }
            return item;
        }));
    };

    const removeFromCart = (UPC) => setCart(prevCart => prevCart.filter(item => item.UPC !== UPC));

    const discountPercent = customerCard ? (Number(customerCard.discount_percent) || 0) : 0;

    const { originalSubtotal, promoDiscount, cardDiscount } = cart.reduce((acc, item) => {
        const price = Number(item.selling_price);
        const qty = item.qty;
        const isPromo = item.promotional_product == 1 || item.promotional_product === true || item.promotional_product === "true";

        if (isPromo) {
            const fullPrice = price / 0.8;
            const savedOnPromo = (fullPrice - price) * qty;

            return {
                originalSubtotal: acc.originalSubtotal + (fullPrice * qty),
                promoDiscount: acc.promoDiscount + savedOnPromo,
                cardDiscount: acc.cardDiscount
            };
        } else {
            const savedOnCard = (price * qty) * (discountPercent / 100);

            return {
                originalSubtotal: acc.originalSubtotal + (price * qty),
                promoDiscount: acc.promoDiscount,
                cardDiscount: acc.cardDiscount + savedOnCard
            };
        }
    }, { originalSubtotal: 0, promoDiscount: 0, cardDiscount: 0 });

    const totalDiscountSum = promoDiscount + cardDiscount;
    const totalToPay = originalSubtotal - totalDiscountSum;
    const vat = totalToPay * (20 / 120);
    const handleCheckout = async () => {
        if (cart.length === 0) { alert("Кошик порожній!"); return; }
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const payload = {
                id_card: customerCard ? customerCard.id_card : null,
                sum_total: totalToPay.toFixed(2),
                vat: vat.toFixed(2),
                items: cart.map(item => ({
                    UPC: item.UPC,
                    product_number: item.qty,
                    selling_price: item.selling_price
                }))
            };
            const res = await fetch('http://localhost:5000/api/receipt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(payload)
            });
            if (!res.ok) throw new Error("Помилка при створенні чека");
            alert("Чек успішно створено!");
            setCart([]); setCustomerCard(null); setCardNumber(""); fetchData();
        } catch (error) { alert("Не вдалося створити чек"); }
        finally { setIsLoading(false); }
    };

    let displayedProducts = [...products];

    if (searchQuery) {
        displayedProducts = displayedProducts.filter(p =>
            p.UPC.includes(searchQuery) ||
            (p.product_name && p.product_name.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }

    if (selectedCategory) {
        displayedProducts = displayedProducts.filter(p => String(p.id_category) === String(selectedCategory));
    }

    if (filterValues.promo_status === "true") {
        displayedProducts = displayedProducts.filter(p => p.promotional_product === true || p.promotional_product === 1);
    } else if (filterValues.promo_status === "false") {
        displayedProducts = displayedProducts.filter(p => p.promotional_product === false || p.promotional_product === 0);
    }

    if (filterValues.sort_by === "name_asc") {
        displayedProducts.sort((a, b) => (a.product_name || "").localeCompare(b.product_name || ""));
    } else if (filterValues.sort_by === "quantity_asc") {
        displayedProducts.sort((a, b) => a.products_number - b.products_number);
    }

    const getTabStyle = (tabName) => ({
        padding: "10px 15px",
        cursor: "pointer",
        borderRadius: "6px",
        border: activeTab === tabName ? "1px solid #1677ff" : "1px solid #e2e8f0",
        backgroundColor: activeTab === tabName ? "#e6f4ff" : "#f8fafc",
        color: activeTab === tabName ? "#1677ff" : "#475569",
        fontWeight: activeTab === tabName ? "bold" : "normal",
        flex: "1"
    });

    return (
        <div className={style.pageContainer}>

            <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>

                <div style={{ flex: "1.2", display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div className={tableStyle.tableWrapper} style={{ marginTop: 0 }}>
                        <h3 style={{ padding: "15px 20px", margin: 0, borderBottom: "1px solid #e2e8f0", backgroundColor: "#f8fafc", color: "#334155", fontSize: "16px" }}>
                             Поточний чек
                        </h3>
                        {cart.length > 0 ? (
                            <table className={tableStyle.styledTable}>
                                <thead>
                                    <tr>
                                        <th>Товар</th>
                                        <th>Ціна</th>
                                        <th style={{ textAlign: "center" }}>К-сть</th>
                                        <th style={{ textAlign: "right" }}>Сума</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((item, idx) => (
                                        <tr key={idx}>
                                            <td>
                                                <div style={{ fontWeight: "600" }}>{item.product_name || `Товар ${item.UPC}`}</div>
                                                <div style={{ fontSize: "12px", color: "#64748b" }}>UPC: {item.UPC}</div>
                                            </td>
                                            <td>{Number(item.selling_price).toFixed(2)} ₴</td>
                                            <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                                                <button onClick={() => updateQuantity(item.UPC, -1)} style={{ padding: "2px 8px", cursor: "pointer", borderRadius: "4px", border: "1px solid #ccc" }}>-</button>
                                                <span style={{ display: "inline-block", width: "30px", textAlign: "center", fontWeight: "bold" }}>{item.qty}</span>
                                                <button onClick={() => updateQuantity(item.UPC, 1)} style={{ padding: "2px 8px", cursor: "pointer", borderRadius: "4px", border: "1px solid #ccc" }}>+</button>
                                            </td>
                                            <td style={{ textAlign: "right", fontWeight: "bold" }}>
                                                {(item.selling_price * item.qty).toFixed(2)} ₴
                                            </td>
                                            <td style={{ textAlign: "center" }}>
                                                <button onClick={() => removeFromCart(item.UPC)} style={{ backgroundColor: "#ef4444", color: "white", border: "none", borderRadius: "4px", padding: "4px 8px", cursor: "pointer" }}>✕</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className={tableStyle.waitingScreen} style={{ border: "none", boxShadow: "none" }}>
                                Кошик порожній. Додайте товари з каталогу праворуч 
                            </div>
                        )}
                    </div>

                    <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
                        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                            <input
                                type="text"
                                placeholder="ID Картки клієнта (необов'язково)"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                style={{ flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                            />
                            <button onClick={handleFindCard} style={{ padding: "10px 20px", backgroundColor: "#f1f5f9", border: "1px solid #cbd5e1", borderRadius: "6px", cursor: "pointer", color: "#334155", fontWeight: "500" }}>Застосувати</button>
                        </div>
                        {customerCard && <div style={{ color: "#16a34a", fontSize: "14px", marginBottom: "15px" }}>✅ Застосовано картку: знижка {customerCard.discount_percent}%</div>}
                        {cardError && <div style={{ color: "#ef4444", fontSize: "14px", marginBottom: "15px" }}>⚠️ {cardError}</div>}

                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", color: "#64748b" }}>
                            <span>Сума без знижок:</span>
                            <span style={{ textDecoration: "none" }}>
                                {originalSubtotal.toFixed(2)} ₴
                            </span>
                        </div>

                        {totalDiscountSum > 0 && (
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", color: "#ef4444" }}>
                                <span>Економія (Акції + Картка):</span>
                                <span style={{ fontWeight: "bold" }}>- {totalDiscountSum.toFixed(2)} ₴</span>
                            </div>
                        )}

                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", color: "#64748b", fontSize: "13px" }}>
                            <span>В т.ч. ПДВ (20%):</span>
                            <span>{vat.toFixed(2)} ₴</span>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "15px", borderTop: "2px dashed #e2e8f0", fontSize: "24px", fontWeight: "bold", color: "#0f172a", marginBottom: "20px" }}>
                            <span>До сплати:</span>
                            <span>{totalToPay.toFixed(2)} ₴</span>
                        </div>

                        <button
                            onClick={handleCheckout}
                            disabled={cart.length === 0 || isLoading}
                            style={{ width: "100%", padding: "15px", backgroundColor: cart.length === 0 ? "#cbd5e1" : "#16a34a", color: "white", fontSize: "16px", fontWeight: "bold", border: "none", borderRadius: "8px", cursor: cart.length === 0 ? "not-allowed" : "pointer" }}
                        >
                            {isLoading ? "Обробка..." : "ВИБИТИ ЧЕК"}
                        </button>
                    </div>
                </div>

                <div style={{ flex: "1.5", backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0", padding: "20px", height: "calc(100vh - 120px)", display: "flex", flexDirection: "column", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
                    <h3 style={{ marginTop: 0, marginBottom: "15px", color: "#334155", fontSize: "16px" }}>Товари у магазині</h3>

                    <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
                        <button onClick={() => handleTabChange("search")} style={getTabStyle("search")}> Пошук</button>
                        <button onClick={() => handleTabChange("category")} style={getTabStyle("category")}> Категорія</button>
                        <button onClick={() => handleTabChange("filters")} style={getTabStyle("filters")}> Фільтри</button>
                    </div>

                    <div style={{ marginBottom: "20px", minHeight: "45px" }}>
                        {activeTab === "search" && (
                            <input
                                type="text"
                                placeholder="Введіть назву або UPC товару..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                            />
                        )}

                        {activeTab === "category" && (
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                            >
                                <option value="">Всі категорії</option>
                                {categories.map(cat => (
                                    <option key={cat.id_category} value={cat.id_category}>{cat.category_name}</option>
                                ))}
                            </select>
                        )}

                        {activeTab === "filters" && (
                            <div style={{ display: "flex", gap: "10px" }}>
                                <select
                                    value={filterValues.promo_status}
                                    onChange={(e) => setFilterValues(prev => ({ ...prev, promo_status: e.target.value }))}
                                    style={{ flex: 1, padding: "10px 12px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                                >
                                    <option value="all">Всі продукти</option>
                                    <option value="true">Тільки акційні</option>
                                    <option value="false">Не акційні</option>
                                </select>
                                <select
                                    value={filterValues.sort_by}
                                    onChange={(e) => setFilterValues(prev => ({ ...prev, sort_by: e.target.value }))}
                                    style={{ flex: 1, padding: "10px 12px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                                >
                                    <option value="">Без сортування</option>
                                    <option value="name_asc">за назвою від А до Я</option>
                                    <option value="quantity_asc">за кількістю за зростання</option>
                                </select>
                            </div>
                        )}
                    </div>

                    <div className={tableStyle.tableWrapper} style={{ marginTop: 0, flex: 1, overflowY: "auto" }}>
                        {displayedProducts.length > 0 ? (
                            <table className={tableStyle.styledTable}>
                                <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
                                    <tr>
                                        <th>UPC</th>
                                        <th>Назва</th>
                                        <th style={{ textAlign: "center" }}>Залишок</th>
                                        <th style={{ textAlign: "right" }}>Ціна</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedProducts.map(p => (
                                        <tr
                                            key={p.UPC}
                                            onClick={() => addToCart(p)}
                                            style={{ cursor: "pointer" }}
                                            title="Натисніть, щоб додати у чек"
                                        >
                                            <td style={{ fontSize: "13px", color: "#64748b" }}>{p.UPC}</td>
                                            <td style={{ fontWeight: "500" }}>
                                                {p.product_name || "Невідомо"}
                                                {p.promotional_product ? <span style={{ color: "#ef4444", fontSize: "12px", marginLeft: "5px" }}>%</span> : ""}
                                            </td>
                                            <td style={{ textAlign: "center", color: p.products_number <= 5 ? "#ef4444" : "#334155" }}>
                                                {p.products_number}
                                            </td>
                                            <td style={{ textAlign: "right", fontWeight: "bold", color: "#0f172a" }}>
                                                {Number(p.selling_price).toFixed(2)} ₴
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className={tableStyle.waitingScreen} style={{ border: "none", boxShadow: "none" }}>
                                За вашим запитом нічого не знайдено 
                            </div>
                        )}
                    </div>

                </div>
            </div>
            <GoToMainButton />
        </div>
    );
}