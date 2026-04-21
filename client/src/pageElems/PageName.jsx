import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import style from './PageName.module.css';

export default function PageName({ name }) {
    const navigate = useNavigate();
    
    const { setRole } = useContext(UserContext);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        
        setRole(null); 

        navigate('/login'); 
    };

    return (
        <header className={`${style.header} noPrint`}>
            <div className={style.title}>{name}</div>
            <button onClick={handleLogout} className={style.logoutButton} title="Вийти з системи">
                Вихід
            </button>
        </header>
    );
}