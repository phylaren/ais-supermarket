import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import Login from "./login/Login.jsx";
import Main from "./main/Main.jsx";
import { UserProvider, UserContext } from "./context/UserContext.jsx";
import { getCategories } from "./main/categories.js";

import TableView from "./main/TableView.jsx";

function ProtectedRoute({ children }) {
    const { role } = useContext(UserContext);

    if (!role || role === "null" || role === "undefined") {
        return <Navigate to="/login" replace />;
    }

    return children;
}

//TO-DO logined users to main if dont have acces http://localhost:5173/main/category
//TO-DO unlogined users to login

function AppRouter() {
    const { role } = useContext(UserContext);
    const categories = getCategories();

    return (
        <BrowserRouter>
            <Routes>
                <Route 
                    path="/main" 
                    element={
                        <ProtectedRoute>
                            <Main />
                        </ProtectedRoute>
                    }
                >
                    {categories.map((category) => {
                        return (
                            <Route 
                                key={category.eng}
                                path={category.eng} 
                                element={<TableView category={category}/>} 
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