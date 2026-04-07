import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login/Login.jsx"
import Main from "./main/Main.jsx"
import { UserProvider } from "./context/UserContext.jsx";

export default function App() {
    return (
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/main" element={<Main />} />
                    {/* ADD LINKS TO THE ROUTES AND CORRESPONDING ELEMENTS AND MAYBE ADD /cashier /manager */}
                </Routes>
            </BrowserRouter>
        </UserProvider>
    )
}