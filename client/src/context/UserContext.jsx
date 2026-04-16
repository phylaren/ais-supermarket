import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({children}){
    const [role, setRole] = useState("MANAGER"); //role could be MANAGER OR CASHIER OR null, should check if valid
    const [page, setPage] = useState("Головна");
    // maybe add current page as Context API?
    // add isLoggedIn here 

    return (
        <UserContext.Provider value={{role, setRole, page, setPage}}>
            {children}
        </UserContext.Provider>
    )
}