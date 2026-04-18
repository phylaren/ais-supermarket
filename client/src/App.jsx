import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./login/Login.jsx";
import Main from "./main/Main.jsx";
import { UserProvider, UserContext } from "./context/UserContext.jsx";
import { getCategories } from "./main/categories.js";

import TableView from "./main/TableView.jsx";

function ProtectedRoute({ children }) {
    const currentRole = localStorage.getItem('role');

    if (!currentRole || currentRole === "null" || currentRole === "undefined") {
        return <Navigate to="/login" replace />;
    }
    return children;
}

function PublicRoute({ children }) {
    const currentRole = localStorage.getItem('role');

    if (currentRole && currentRole !== "null" && currentRole !== "undefined") {
        return <Navigate to="/main" replace />;
    }
    return children;
}

function AppRouter() {
    const categories = getCategories();
    const currentRole = localStorage.getItem('role');

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
                    {categories.map((category) => (
                        <Route 
                            key={category.link}
                            path={category.link} 
                            element={<TableView category={category}/>} 
                        />
                    ))}

                    <Route path="*" element={<Navigate to="/main" replace />} />
                </Route>

                <Route 
                    path="/login" 
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    } 
                />

                <Route
                    path="/"
                    element={<Navigate to={currentRole ? "/main" : "/login"} replace />}
                />

                <Route 
                    path="*" 
                    element={<Navigate to={currentRole ? "/main" : "/login"} replace />} 
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