import { useState, useEffect } from "react";
import Table from "../pageElems/Table.jsx";
import GoToMainButton from "../pageElems/GoToMainButton.jsx";
import Popup from "../pageElems/Popup.jsx";
import style from "./Main.module.css";

export default function TableView({ category }) {
    const [data, setData] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [editingRecord, setEditingRecord] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [filterValues, setFilterValues] = useState({});

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem('token');
            let urlPath = category.apiLink || category.link;

            const queryParams = new URLSearchParams();

            if (searchTerm) {
                queryParams.append('search', searchTerm);
            }

            if (filterValues) {
                Object.entries(filterValues).forEach(([key, value]) => {
                    if (value && value !== 'all') {
                        queryParams.append(key, value);
                    }
                });
            }

            const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';

            const response = await fetch(`http://localhost:5000/api/${urlPath}${queryString}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const result = await response.json();
                setData(Array.isArray(result.data) ? result.data : []);
            }
        } catch (error) {
            console.error("Помилка завантаження таблиці:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [category.link]);

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm(`Ви впевнені, що хочете видалити запис з ID: ${id}?`);
        if (!isConfirmed) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/${category.link}/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.status === 401) {
                alert("Час вашої сесії вийшов. Будь ласка, увійдіть знову");
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                window.location.href = '/login';
                return;
            }

            if (response.status === 403) {
                alert("У вас немає прав доступу до цієї дії чи таблиці");
                return;
            }

            if (!response.ok) throw new Error('Помилка при видаленні');

            setData(prevData => prevData.filter(row => Object.values(row)[0] !== id));
            alert("Успішно видалено!");
        } catch (error) {
            alert("Не вдалося видалити запис");
        }
    };

    const handleAddClick = () => {
        setEditingRecord(null);
        setIsPopupOpen(true);
    };

    const handleEditClick = (record) => {
        setEditingRecord(record);
        setIsPopupOpen(true);
    };

    return (
        <div className={style.pageContainer}>
            {isPopupOpen && (
                <Popup
                    category={category}
                    onClose={() => setIsPopupOpen(false)}
                    onSuccess={fetchData}
                    initialData={editingRecord}
                />
            )}

            <Table
                data={data}
                category={category}
                onDelete={handleDelete}
                onAddClick={handleAddClick}
                onEditClick={handleEditClick}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterValues={filterValues}
                setFilterValues={setFilterValues}
                onApplyFilters={fetchData}
                isLoading={isLoading}
            />

            <GoToMainButton />
        </div>
    );
}