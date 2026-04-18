import style from "./Table.module.css"; 
import { ukrHeaders } from "./ukrHeaders.js";

function getAttributes(data) {
    if (!data || data.length === 0) return [];
    return Object.keys(data[0]);
}

export default function Table({ data, onDelete }) {
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
                    <Data data={data} onDelete={onDelete} />
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
                    <th key={attribute}>
                        {ukrHeaders[attribute] || attribute}
                    </th>
                ))}
                <th></th>
            </tr>
        </thead>
    );
}

function Data({ data, onDelete }) {
    return (
        <tbody>
            {data.map((row, rowIndex) => {
                const rowId = Object.values(row)[0]; 

                return (
                    <tr key={rowIndex}>
                        {Object.values(row).map((value, colIndex) => {
                            let safeValue = value;
                            if (value === null || value === undefined) safeValue = "—";
                            else if (typeof value === 'boolean') safeValue = value ? "Так" : "Ні";
                            
                            return <td key={colIndex}>{safeValue}</td>;
                        })}
                        <td>
                            <button 
                                onClick={() => onDelete(rowId)}
                                style={{
                                    backgroundColor: "#ff4d4f", 
                                    color: "white", 
                                    border: "none", 
                                    padding: "5px 10px", 
                                    borderRadius: "4px", 
                                    cursor: "pointer"
                                }}
                            >
                                Видалити
                            </button>
                        </td>
                    </tr>
                );
            })}
        </tbody>
    );
}