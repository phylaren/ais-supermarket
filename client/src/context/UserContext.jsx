import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({children}){
    const [role, setRole] = useState("CASHIER"); //role could be MANAGER OR CASHIER, should check if valid
    // maybe add current page as Context API?
    // add isLoggedIn here 

    return (
        <UserContext.Provider value={{role, setRole}}>
            {children}
        </UserContext.Provider>
    )
}