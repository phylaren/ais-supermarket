import { getAllProductsFromDB } from "../repositories/productRepository.js";

export const getAllProductsService = async (filters = {}) => {
  try {
    const data = await getAllProductsFromDB(filters);

    return {
      status: 200,
      body: {
        success: true,
        data,
      },
    };
  } catch (err) {
    console.error("Service error:", err.message);
    return {
      status: 500,
      body: {
        success: false,
        message: "Помилка бази даних при отриманні продуктів",
      },
    };
  }
};