import * as repo from "../repositories/storeProductRepository.js";

export const getAllStoreProductsByCountService = async (filters = {}) => {
  try {
    const data = await repo.getAllStoreProductsByCountFromDB(filters);
    return { status: 200, body: { success: true, data } };
  } catch (error) {
    return { status: 500, body: { success: false, message: error.message } };
  }
};

export const getStoreProductsByNameService = async (filters = {}) => {
  try {
    const data = await repo.getStoreProductsOrderedByNameFromDB(filters);
    return { status: 200, body: { success: true, data } };
  } catch (error) {
    return { status: 500, body: { success: false, message: error.message } };
  }
};

export const getStoreProductsData = async (type, sort) => {
  try {
    const isPromo = (type === 'promotional');
    
    const data = await repo.findStoreProducts(isPromo, sort);

    return {
      status: 200,
      success: true,
      data
    };
  } catch (error) {
    console.error("Service Error:", error.message);
    return {
      status: 500,
      success: false,
      message: "Помилка при отриманні даних з бази"
    };
  }
};