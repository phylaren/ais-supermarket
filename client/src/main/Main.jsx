import { Link, Outlet, useLocation } from "react-router-dom"
import style from "./Main.module.css"

import PageName from "../pageElems/PageName"
import headerStyle from "../pageElems/headerStyle.module.css"

import {getCategories} from "./categories.js";

export default function Main(){
    const categories = getCategories();
    console.log(categories);

    const location = useLocation();
    
    const isExactMainPage = location.pathname === "/main" || location.pathname === "/main/";

    return(
        <div className={style.pageContainer}>
            <PageName name="Головна"/>
            {isExactMainPage && <PageCategories categories={categories} />}
            
            <div className={style.contentArea}>
                <Outlet /> 
            </div>
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