import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";

import Login from "./login/Login.jsx";
import Main from "./main/Main.jsx";
import { UserProvider, UserContext } from "./context/UserContext.jsx";
import { cashier, manager } from "./main/categories.js";

import Table from "./pageElems/Table.jsx";
// const componentMap = {
//     categories: CategoriesComponent,
//     products: ProductsComponent,
//     checks: ChecksComponent,
// };

function getCategories(role) {
    if (role === "CASHIER") return cashier;
    if (role === "MANAGER") return manager;
    return [];
}

function AppRouter() {
    const role = useContext(UserContext);
    const categories = getCategories(role);

    const [data, setData] = useState([]);
    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch("http://localhost:5000/api/customer-cards");
                console.log("response: ", response)
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.log(error);
            }
        }

        getData();
    }, []);
    console.log("after effect: ", data)

    return (
        <BrowserRouter>
            <Routes>

                {/* TEMPORARY */}
                <Route
                    path="/table"
                    element={
                        data ? <Table data={data} category="my category" /> : <h2>Loading data...</h2>
                    }
                />
                <Route path="/main" element={<Main />}>
                    {/* {categories.map((category) => {
                        const ComponentToRender = componentMap[category.eng];

                        if (!ComponentToRender) return null;

                        return (
                            <Route 
                                key={category.eng}
                                path={category.eng} 
                                element={<ComponentToRender />} 
                            />
                        );
                    })} */}
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