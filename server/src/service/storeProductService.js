import { getAllStoreProductsByCountFromDB, getStoreProductsOrderedByNameFromDB } from "../repositories/storeProductRepository.js";

export const getAllStoreProductsByCountService = async () => {
  try {
    const data = await getAllStoreProductsByCountFromDB();

    return {
      status: 200,
      body: {
        success: true,
        data,
      },
    };
  } catch (err) {
    console.error("DB error:", err.message);
    return {
      status: 500,
      body: {
        success: false,
        message: "Database error",
      },
    };
  }
};

export const getStoreProductsByNameService = async () => {
  try {
    const data = await getStoreProductsOrderedByNameFromDB();

    return {
      status: 200,
      body: {
        success: true,
        data,
      },
    };
  } catch (err) {
    console.error("DB error:", err.message);
    return {
      status: 500,
      body: {
        success: false,
        message: "Database error",
      },
    };
  }
};