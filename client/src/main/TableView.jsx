import GoToMainButton from "../pageElems/GoToMainButton.jsx";
import Table from "../pageElems/Table.jsx";
import style from "./Main.module.css";
import { useState, useEffect } from "react";

export default function TableView({category}){
    const [data, setData] = useState([]);

    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch(`http://localhost:5000/api/${category.eng}`);
                console.log("response: ", response)
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.log(error);
            }
        }

        getData();
    }, [category.eng]);

    return(
            <DrawTable category={category} data={data}/>
        );
}

function DrawTable({category, data}){
    return(
            <div className={style.pageContainer}>
                <Table category={category.eng} data={data}/>
                <GoToMainButton/>
            </div>
        );
}