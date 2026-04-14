import GoToMainButton from "../pageElems/GoToMainButton";
import PageName from "../pageElems/PageName";
import Table from "../pageElems/PageName";
import style from "../Main.module.css";

export default function TableView({category}){
    const [data, setData] = useState([]);

    return(
            <div className={style.pageContainer}>
                <PageName name={category}/>
                {<Table category={category} data={data}/>}
                <GoToMainButton/>
            </div>
        );
}