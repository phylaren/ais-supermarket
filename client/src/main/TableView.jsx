import GoToMainButton from "../pageElems/GoToMainButton.jsx";
import Table from "../pageElems/Table.jsx";
import style from "./Main.module.css";
import { useState, useEffect } from "react";

export default function TableView({ category }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function getData() {
            try {
                const token = localStorage.getItem('token');

                const response = await fetch(`http://localhost:5000/api/${category.link}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                console.log("response: ", response)

                if (!response.ok) {
                    throw new Error(`Помилка сервера: ${response.status}`);
                }

                const resData = await response.json();
                console.log("resData: ", resData);
                setData(Array.isArray(resData.data) ? resData.data : [resData.data]);
            } catch (error) {
                console.log(error);
            }
        }

        getData();
    }, [category.link]);

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm(`Ви впевнені, що хочете видалити запис з ID: ${id}?`);
        if (!isConfirmed) return;

        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`http://localhost:5000/api/${category.link}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
console.log("Спроба видалити запис з ID:", id);
            if (!response.ok) {
                throw new Error('Помилка при видаленні');
            }

            setData(prevData => prevData.filter(row => Object.values(row)[0] !== id));

            alert("Успішно видалено!");

        } catch (error) {
            console.error("Помилка видалення:", error);
            alert("Не вдалося видалити запис. Можливо, він пов'язаний з іншими таблицями");
        }
    };
    return (
        <DrawTable data={data} onDelete={handleDelete}/>
    );
}

function DrawTable({ data, onDelete }) {
    return (
        <div className={style.pageContainer}>
            <Table data={data} onDelete={onDelete} />
            <GoToMainButton />
        </div>
    );
}