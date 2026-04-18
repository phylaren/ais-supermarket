import { useState } from "react"
import { useNavigate } from "react-router-dom";

import style from "./login.module.css"

export default function Login() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    id_employee: login, 
                    password: password 
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Помилка при вході');
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);

            navigate('/main');

        } catch (err) {
            setErrorMessage(err.message);
        }
    };

    return (
        <div className={style.pageContainer}>
            <form className={style.loginContainer} onSubmit={handleLogin}>
                <PageName name="Злагода" />
                {errorMessage && <ErrorMessage text={errorMessage} />}
                
                <input
                    className={style.inputField}
                    type="text"
                    placeholder="Введіть логін"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    required
                />

                <input
                    className={style.inputField}
                    type="password"
                    placeholder="Введіть пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button className={style.submitButton} type="submit">Увійти</button>
            </form>
        </div>
    )
}

function PageName({ name }) {
    return <h1 className={style.title}>{name}</h1>
}

function ErrorMessage({ text }) {
    return <p className={style.errorMessage}>{text}</p>
}