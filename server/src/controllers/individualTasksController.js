import * as service from '../service/individualTasksServise.js';

export const getCategoryRevenue = async (req, res) => {
    const result = await service.getCategoryRevenueService();
    res.status(result.status).json(result);
};

export const getChecksWithAllProducts = async (req, res) => {
    const { category_name } = req.query;
    const result = await service.getFullCategoryChecksService(category_name);
    res.status(result.status).json(result);
};

export const getUniversalCashiers = async (req, res) => {
    const result = await service.getUniversalCashiersService();
    res.status(result.status).json(result);
};

export const getCustomerCategorySpendings = async (req, res) => {
    const { id_card } = req.query;
    const result = await service.getCustomerSpendingsService(id_card);
    res.status(result.status).json(result);
};