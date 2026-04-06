import { useState } from "react"

import style from "./login.module.css"

export default function Login(){
    const [isError, setIsError] = useState(false);

    return (
        <div className={style.loginContainer}>
            <PageName name="Злагода"/>
            {isError && <ErrorMessage text="Неправильний логін або пароль"/>}
            <EmailInput />
            <PasswordInput />
        </div>
    )
}

function PageName({name}){
    return(
        <h1>{name}</h1>
    )
}

function EmailInput(){
    const [email, setEmail] = useState("");

    return(
        <input
            type="email"
            placeholder="Введіть свій email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
        />
    )
}

function PasswordInput(){
    const [password, setPassword] = useState("");
   
    return(
        <input
            type="password"
            placeholder="Введіть свій пароль"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
        />
    )
}

function ErrorMessage({text}){
    return(
        <p>{text}</p>
    )
}