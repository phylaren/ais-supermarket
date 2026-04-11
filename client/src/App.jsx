import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import Login from "./login/Login.jsx";
import Main from "./main/Main.jsx";
import { UserProvider, UserContext } from "./context/UserContext.jsx";
import { cashier, manager } from "./main/categories.js";

const componentMap = {
    categories: CategoriesComponent,
    products: ProductsComponent,
    checks: ChecksComponent,
};

function getCategories(role) {
    if (role === "CASHIER") return cashier;
    if (role === "MANAGER") return manager;
    return [];
}

function AppRouter() {
    const role = useContext(UserContext); 
    const categories = getCategories(role);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/main" element={<Main />}>
                    {categories.map((category) => {
                        const ComponentToRender = componentMap[category.eng];

                        if (!ComponentToRender) return null;

                        return (
                            <Route 
                                key={category.eng}
                                path={category.eng} 
                                element={<ComponentToRender />} 
                            />
                        );
                    })}
                </Route>

                <Route path="/login" element={<Login />} />

                <Route 
                    path="/" 
                    element={<Navigate to={role ? "/main" : "/login"} replace />} 
                />
            </Routes>
        </BrowserRouter>
    );
}

export default function App() {
    return (
        <UserProvider>
            <AppRouter />
        </UserProvider>
    );
}