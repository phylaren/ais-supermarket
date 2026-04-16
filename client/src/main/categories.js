import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";

const manager = [
    {
        ukr: "Працівники",
        eng: "employee"
    },
    {
        ukr: "Клієнти",
        eng: "customer-card"
    },
    {
        ukr: "Категорії",
        eng: "category"
    },
    {
        ukr: "Товари",
        eng: "product"
    },
    {
        ukr: "Товари в магазині",
        eng: "store-product"
    },
    {
        ukr: "Чеки",
        eng: "receipt"
    }
];

// should goods have different view for them? maybe i should return to /cashier /manager 

const cashier = [
    {
        ukr: "Мій профіль",
        eng: "me"
    },
    {
        ukr: "Чеки",
        eng: "receipt"
    },
    {
        ukr: "Товари",
        eng: "product"
    },
    {
        ukr: "Товари в магазині",
        eng: "store-product"
    },
]

export function getCategories() {
    const {role} = useContext(UserContext);
    console.log(role);

    if (role === "CASHIER") return cashier;
    if (role === "MANAGER") return manager;
    return [];
}