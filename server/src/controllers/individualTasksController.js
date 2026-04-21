import * as service from '../service/individualTasksServise.js';

export const getCategoryRevenue = async (req, res) => {
    const result = await service.getCategoryRevenueService();
    res.status(result.status).json(result);
};

export const getChecksWithAllProducts = async (req, res) => {
    const { categoryName } = req.query;
    const result = await service.getFullCategoryChecksService(categoryName);
    res.status(result.status).json(result);
};

export const getUniversalCashiers = async (req, res) => {
    const result = await service.getUniversalCashiersService();
    res.status(result.status).json(result);
};

export const getCustomerCategorySpendings = async (req, res) => {
    const { cardId } = req.query;
    const result = await service.getCustomerSpendingsService(cardId);
    res.status(result.status).json(result);
};