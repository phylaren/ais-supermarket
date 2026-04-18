import { useNavigate } from "react-router-dom";
import style from './PageName.module.css';

export default function PageName({ name }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');

        navigate('/login'); 
    };

    return (
        <header className={style.header}>
            <div className={style.title}>{name}</div>
            
            <button onClick={handleLogout} className={style.logoutButton} title="Вийти з системи">
                Вихід 🚪
            </button>
        </header>
    );
}