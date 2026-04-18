import { useContext } from "react"
import { UserContext } from "../context/UserContext.jsx"

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

    const currentCategory = categories.find(category => location.pathname.includes(category.link));
    const name = currentCategory ? currentCategory.name : "Головна";

    return(
        <div className={style.pageContainer}>
            <PageName name={name}/>
            {isExactMainPage && <PageCategories categories={categories} />}
            
            <div className={style.contentArea}>
                <Outlet /> 
            </div>
        </div>
    )
}

// TO-DO store-product doesn't display right

export function PageCategories({categories}){
    return(
        <ul>
            {categories.map(category=>(
                <li key={category.link}>
                    <Link to={`${category.link}`}>{category.name}</Link>
                </li>
            ))}
        </ul>
    )
}