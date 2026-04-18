import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";

const manager = [
    {
        name: "Працівники",
        link: "employee",
    },
    {
        name: "Клієнти",
        link: "customer-card"
    },
    {
        name: "Категорії",
        link: "category"
    },
    {
        name: "Товари",
        link: "product"
    },
    {
        name: "Товари в магазині",
        link: "store-product"
    },
    {
        name: "Чеки",
        link: "receipt"
    }
];

// should goods have different view for them? maybe i should return to /cashier /manager 

const cashier = [
    {
        name: "Мій профіль",
        link: "employee/me"
    },
    {
        name: "Чеки",
        link: "receipt"
    },
    {
        name: "Товари",
        link: "product"
    },
    {
        name: "Товари в магазині",
        link: "store-product"
    },
]

export function getCategories() {
    const {role} = useContext(UserContext);
    console.log(role);

    if (role === "Касир") return cashier;
    if (role === "Менеджер") return manager;
    return [];
}