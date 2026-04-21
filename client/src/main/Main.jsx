import { useContext } from "react";

import { Link, Outlet, useLocation } from "react-router-dom";
import style from "./Main.module.css";

import PageName from "../pageElems/PageName";
import { getCategories } from "./categories.js";


import { getUserRole } from '../pageElems/getUserRole.js';

export default function Main(){
    const userRole = getUserRole(); 
    console.log(userRole);
    const allCategories = getCategories();

    const categories = allCategories.filter(category => {
        if (category.link === "create-receipt" || category.link === "receipt/create") {
            return userRole === "Касир";
        }
        
        if (category.link === "employee") {
            return userRole === "Менеджер";
        }

        if (category.link === "statistics") {
             return userRole === "Менеджер";
        }

        return true; 
    });

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