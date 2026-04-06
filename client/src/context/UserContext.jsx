import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({children}){
    const [role, setRole] = useState(null); //role could be MANAGER OR CASHIER, should check if valid

    return (
        <UserContext.Provider value={{role, setRole}}>
            {children}
        </UserContext.Provider>
    )
}