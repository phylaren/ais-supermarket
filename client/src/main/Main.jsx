import { useContext } from "react"
import { UserContext } from "../context/UserContext.jsx"

import { Link, Outlet, useLocation } from "react-router-dom"
import style from "./Main.module.css"

import PageName from "../pageElems/PageName"

import {getCategories} from "./categories.js";

export default function Main(){
    const categories = getCategories();

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

export function PageCategories({categories}){
    return(
        
        <ul className={style.categoriesGrid}>
            {categories.map(category=>(
                <li key={category.link} className={style.categoryCard}>
                    <Link to={`${category.link}`} className={style.categoryLink}>
                        {category.name}
                    </Link>
                </li>
            ))}
        </ul>
    )
}