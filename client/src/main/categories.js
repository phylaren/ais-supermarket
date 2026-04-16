import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";

const manager = [
    {
        ukr: "Працівники",
        eng: "workers"
    },
    {
        ukr: "Клієнти",
        eng: "clients"
    },
    {
        ukr: "Категорії",
        eng: "categories"
    },
    {
        ukr: "Товари",
        eng: "goods"
    },
    {
        ukr: "Товари в магазині",
        eng: "shop-goods"
    },
    {
        ukr: "Чеки",
        eng: "checks"
    }
];

// should goods have different view for them? maybe i should return to /cashier /manager 

const cashier = [
    {
        ukr: "Мій профіль",
        eng: "profile"
    },
    {
        ukr: "Чеки",
        eng: "receipt"
    },
    {
        ukr: "Товари",
        eng: "goods"
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