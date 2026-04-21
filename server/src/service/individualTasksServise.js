import * as repo from '../repositories/individualTasksRepository.js';

export const getCategoryRevenueService = async () => {
    try {
        const data = await repo.getCategoryRevenueFromDB();
        return { status: 200, success: true, data };
    } catch (e) { return { status: 500, success: false, message: e.message }; }
};

export const getFullCategoryChecksService = async (category_name) => {
    if (!category_name) return { status: 400, success: false, message: "Назва категорії обов'язкова" };
    try {
        const data = await repo.getFullCategoryChecksFromDB(category_name);
        return { status: 200, success: true, data };
    } catch (e) { return { status: 500, success: false, message: e.message }; }
};

export const getUniversalCashiersService = async () => {
    try {
        const data = await repo.getUniversalCashiersFromDB();
        return { status: 200, success: true, data };
    } catch (e) { return { status: 500, success: false, message: e.message }; }
};

export const getCustomerSpendingsService = async (id_card) => {
    if (!id_card) return { status: 400, success: false, message: "ID картки обов'язковий" };
    try {
        const data = await repo.getCustomerSpendingsFromDB(id_card);
        return { status: 200, success: true, data };
    } catch (e) { return { status: 500, success: false, message: e.message }; }
};