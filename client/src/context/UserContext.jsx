import { createContext, useState } from "react";
import { getUserRole } from "../pageElems/getUserRole";

export const UserContext = createContext();

export function UserProvider({children}){
    const [role, setRole] = (getUserRole() || null);
    const [page, setPage] = useState("Головна");
    
    const logout = () => {
        setRole(null);
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    };

    return (
        <UserContext.Provider value={{role, setRole, page, setPage, logout}}>
            {children}
        </UserContext.Provider>
    )
}