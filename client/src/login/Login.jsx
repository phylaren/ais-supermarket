import { useState } from "react"
import { Link } from "react-router-dom"

import style from "./login.module.css"

export default function Login() {
    const [isError, setIsError] = useState(true);

    return (
        <div className={style.pageContainer}>
            <div className={style.loginContainer}>
                <PageName name="Злагода" />
                {isError && <ErrorMessage text="Неправильний логін або пароль" />}
                <LoginInput />
                <PasswordInput />
                <Link to="/main"><button>Увійти</button></Link>
            </div>
        </div>
    )
}

function PageName({ name }) {
    return (
        <h1>{name}</h1>
    )
}

function LoginInput() {
    const [login, setLogin] = useState("");

    return (
        <input
            type="text"
            placeholder="Введіть свій логін"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
        />
    )
}

function PasswordInput() {
    const [password, setPassword] = useState("");

    return (
        <input
            type="password"
            placeholder="Введіть свій пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
    )
}

function ErrorMessage({ text }) {
    return (
        <p>{text}</p>
    )
}