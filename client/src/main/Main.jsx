import { Link } from "react-router-dom"
import style from "./Main.module.css"

import { useContext } from "react"
import { UserContext } from "../context/UserContext"

import { PageName } from "../pageElems/PageName"
import headerStyle from "../pageElems/headerStyle.module.css"

import {cashier, manager} from "./categories.js";

export default function Main(){
    const categories = useContext(UserContext).role === "CASHIER" ? cashier : manager;

    return(
        <div className={style.pageContainer}>
            <PageName name="Головна"/>
            {<PageCategories categories={categories}/>}
        </div>
    )
}

//array of categories
export function PageCategories({categories}){
    return(
        <ul>
            {categories.map(category=>(
                <li key={category.eng}>
                    <Link to={`${category.eng}`}>{category.ukr}</Link>
                </li>
            ))}
        </ul>
    )
}