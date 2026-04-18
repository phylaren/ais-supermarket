import GoToMainButton from "../pageElems/GoToMainButton.jsx";
import Table from "../pageElems/Table.jsx";
import style from "./Main.module.css";
import { useState, useEffect } from "react";

export default function TableView({category}){
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

    return(
            <DrawTable category={category} data={data}/>
        );
}

function DrawTable({category, data}){
    return(
            <div className={style.pageContainer}>
                {<Table category={category.link} data={data}/>}
                <GoToMainButton/>
            </div>
        );
}