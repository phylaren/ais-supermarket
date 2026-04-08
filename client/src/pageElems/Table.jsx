export default function Table({data, filters}){ 
    // OR FILTERED DATA SHOULD BE PASSED INTO THE FUNCTION?
    return(
        <table>
            <Filters/>
            <Attributes/>
            <Data/>
        </table>
    )
}

function Filters(){
    return(
        <div>
            <button>Filter</button>
            <input type="text" placeholder="Пошук"/>
            <button>Print</button>
            <button>Add person</button>
            <button>Add category</button>
        </div>
    );
}

function Attributes(){
    return(
        <thead>
            <tr>
                <th>1</th>
            </tr>
        </thead>
    )
}

function Data(){
    return(
        <tbody>
            <tr>
                
                {/* <th>1</th>  FOR ID's */}
                <td>1</td>
            </tr>
        </tbody>
    )
}