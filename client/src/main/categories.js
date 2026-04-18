import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";

const ALL_ACCESS = { create: true, edit: true, delete: true };
const READ_ONLY = { create: false, edit: false, delete: false };

const NO_FUNCTIONS = { search: false, filter: false };
const ALL_FUNCTIONS = { search: true, filter: true };

const ONLY_SEARCH = { search: true, filter: false };
const ONLY_FILTER = { search: false, filter: true };

const manager = [
    {
        name: "Працівники",
        link: "employee",
        rules: ALL_ACCESS,
        functions: NO_FUNCTIONS
    },
    {
        name: "Клієнти",
        link: "customer-card",
        rules: ALL_ACCESS,
        functions: ALL_FUNCTIONS
    },
    {
        name: "Категорії",
        link: "category",
        rules: ALL_ACCESS,
        functions: ALL_FUNCTIONS
    },
    {
        name: "Товари",
        link: "product",
        rules: ALL_ACCESS,
        functions: ALL_FUNCTIONS
    },
    {
        name: "Товари в магазині",
        link: "store-product",
        rules: ALL_ACCESS,
        functions: ONLY_FILTER
    },
    {
        name: "Чеки",
        link: "receipt",
        rules: { create: false, edit: false, delete: true },
        functions: ONLY_SEARCH
    }
];

const cashier = [
    {
        name: "Мій профіль",
        link: "employee/me",
        rules: READ_ONLY,
        functions: NO_FUNCTIONS
    },
    {
        name: "Чеки",
        link: "receipt",
        rules: { create: true, edit: false, delete: false },
        functions: NO_FUNCTIONS
    },
    {
        name: "Товари",
        link: "product",
        rules: READ_ONLY,
        functions: NO_FUNCTIONS
    },
    {
        name: "Товари в магазині",
        link: "store-product",
        rules: READ_ONLY,
        functions: NO_FUNCTIONS
    },
    {
        name: "Клієнти",
        link: "customer-card",
        rules: { create: true, edit: true, delete: false },
        functions: NO_FUNCTIONS
    }
];

export function getCategories() {
    const { role } = useContext(UserContext);

    if (role === "Касир") return cashier;
    if (role === "Менеджер") return manager;
    return [];
}