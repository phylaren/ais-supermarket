import { useState, useEffect } from "react";
import Table from "../pageElems/Table.jsx";
import GoToMainButton from "../pageElems/GoToMainButton.jsx";
import Popup from "../pageElems/Popup.jsx";
import style from "./Main.module.css";

export default function TableView({ category }) {
    const [data, setData] = useState([]);

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/${category.link}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error(`Помилка сервера: ${response.status}`);

            const resData = await response.json();
            setData(Array.isArray(resData.data) ? resData.data : [resData.data]);
        } catch (error) {
            console.error(error);
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
            />
            
            <GoToMainButton />
        </div>
    );
}