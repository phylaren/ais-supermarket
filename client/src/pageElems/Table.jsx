function getAttributes(data){
    if (!data || data.length === 0) return [];
    return Object.keys(data[0]);
}

export default function Table({ data, category }) {
    console.log(data);
    console.log(category);

    if (!data || data.length === 0) {
        return <div>Завантажую таблицю</div>;
    }

    const attributes = getAttributes(data);
    return (
        <div>
            <Filters />
            <table>
                <Attributes attributes={attributes} />
                <Data data={data} />
            </table>
        </div>
    )
}

function Filters() {
    return (
        <div>
            <button>Filter</button>
            <input type="text" placeholder="Пошук" />
            <button>Print</button>
            <button>Add person</button>
            <button>Add category</button>
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
    )
}

function Data({data}) {
    return (
        <tbody>
            {data.map((item) => (
                <tr key={item.id}>
                    {Object.values(item).map((value) => (
                        <td key={value}>{value}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    )
}