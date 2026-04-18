import style from "./Table.module.css"; 

function getAttributes(data) {
    if (!data || data.length === 0) return [];
    return Object.keys(data[0]);
}

export default function Table({ data, category }) {
    if (!data || data.length === 0) {
        return <div style={{ padding: "20px" }}>Завантажую таблицю...</div>;
    }

    const attributes = getAttributes(data);
    
    return (
        <div>
            <Filters />
            <div className={style.tableWrapper}>
                <table className={style.styledTable}>
                    <Attributes attributes={attributes} />
                    <Data data={data} />
                </table>
            </div>
        </div>
    );
}

function Filters() {
    return (
        <div style={{ display: "flex", gap: "10px", marginBottom: "15px", flexWrap: "wrap" }}>
            <button>Filter</button>
            <button>Print</button>
            <button>Add person</button>
            <button>Add category</button>
            <input type="text" placeholder="Пошук" style={{ padding: "5px 10px", borderRadius: "4px", border: "1px solid #ccc" }} />
        </div>
    );
}

function Attributes({ attributes }) {
    return (
        <thead>
            <tr>
                {attributes.map((attribute) => (
                    <th key={attribute}>{attribute}</th>
                ))}
            </tr>
        </thead>
    );
}

function Data({ data }) {
    console.log("Дані, які прийшли в Data:", data);
    return (
        <tbody>
            {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {Object.values(row).map((value, colIndex) => (
                        <td key={colIndex}>{value}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
}