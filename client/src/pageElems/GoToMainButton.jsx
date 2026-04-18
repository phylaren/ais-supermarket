import { Link } from "react-router-dom";
import style from './GoToMainButton.module.css';

export default function GoToMainButton() {
    return (
        <Link to="/main" className={style.backButton}>
            <span>←</span> Повернутися на головну
        </Link>
    );
}