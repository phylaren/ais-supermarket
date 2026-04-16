import { Link } from "react-router-dom"

export default function GoToMainButton() {
    
    return (
        <Link to="/main"><button>{"Повернутися на головну"}</button></Link>
    )
}