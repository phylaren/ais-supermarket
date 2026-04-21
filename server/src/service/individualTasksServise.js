import * as repo from '../repositories/individualTasksRepository.js';

export const getCategoryRevenueService = async () => {
    try {
        const data = await repo.getCategoryRevenueFromDB();
        return { status: 200, success: true, data };
    } catch (e) { return { status: 500, success: false, message: e.message }; }
};

export const getFullCategoryChecksService = async (categoryName) => {
    if (!categoryName) return { status: 400, success: false, message: "Назва категорії обов'язкова" };
    try {
        const data = await repo.getFullCategoryChecksFromDB(categoryName);
        return { status: 200, success: true, data };
    } catch (e) { return { status: 500, success: false, message: e.message }; }
};

export const getUniversalCashiersService = async () => {
    try {
        const data = await repo.getUniversalCashiersFromDB();
        return { status: 200, success: true, data };
    } catch (e) { return { status: 500, success: false, message: e.message }; }
};

export const getCustomerSpendingsService = async (cardId) => {
    if (!cardId) return { status: 400, success: false, message: "ID картки обов'язковий" };
    try {
        const data = await repo.getCustomerSpendingsFromDB(cardId);
        return { status: 200, success: true, data };
    } catch (e) { return { status: 500, success: false, message: e.message }; }
};