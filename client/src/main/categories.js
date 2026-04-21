import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";

import { getUserRole } from "../pageElems/getUserRole.js";

const ALL_ACCESS = { create: true, edit: true, delete: true };
const READ_ONLY = { create: false, edit: false, delete: false };

const MANAGER_FUNCTIONS = { search: true, filter: true, print: true };
const MANAGER_NO_SEARCH = { search: false, filter: true, print: true };

const CASHIER_FUNCTIONS = { search: true, filter: true, print: false };
const NO_FUNCTIONS = { search: false, filter: false, print: false };

const manager = [
    {
        name: "Працівники",
        link: "employee",
        rules: ALL_ACCESS,
        functions: MANAGER_FUNCTIONS
    },
    {
        name: "Клієнти",
        link: "customer-card",
        rules: ALL_ACCESS,
        functions: MANAGER_NO_SEARCH
    },
    {
        name: "Категорії",
        link: "category",
        rules: ALL_ACCESS,
        functions: { search: false, filter: false, print: true }
    },
    {
        name: "Товари в магазині",
        link: "store-product/all-by-count",
        rules: ALL_ACCESS,
        functions: MANAGER_FUNCTIONS
    },
    {
        name: "Товари",
        link: "product",
        rules: ALL_ACCESS,
        functions: { search: false, filter: false, print: true }
    },
    {
        name: "Чеки",
        link: "receipt",
        rules: { create: false, edit: false, delete: true },
        functions: MANAGER_NO_SEARCH
    },
    {
        name: "Статистика",
        link: "statistics",
        rules: READ_ONLY,
        functions: MANAGER_NO_SEARCH
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
        name: "Товари в магазині",
        link: "store-product/all-by-name",
        rules: READ_ONLY,
        functions: CASHIER_FUNCTIONS
    },
    {
        name: "Товари",
        link: "product",
        rules: READ_ONLY,
        functions: { search: false, filter: true, print: false }
    },
    {
        name: "Клієнти",
        link: "customer-card",
        rules: { create: true, edit: true, delete: false },
        functions: CASHIER_FUNCTIONS
    },
    {
        name: "Створити чек",
        link: "receipt/create",
        rules: READ_ONLY,
        functions: MANAGER_NO_SEARCH
    },
    {
        name: "Мої чеки",
        link: "receipt/my-receipts",
        rules: { create: true, edit: false, delete: false },
        functions: CASHIER_FUNCTIONS
    },
];

export function getCategories() {
    const { role } = useContext(UserContext);
    
    const activeRole = getUserRole() || role;

    if (activeRole === "Касир") return cashier;
    if (activeRole === "Менеджер") return manager;
    return [];
}