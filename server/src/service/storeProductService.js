import { getAllStoreProductsByCountFromDB, getStoreProductsOrderedByNameFromDB, getStoreProductByUPCFromDB,
    getStoreProductsByCategoryFromDB, getStoreProductByNameFromDB, findStoreProducts
} from "../repositories/storeProductRepository.js";

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

export const getStoreProductByUPCService = async (upc) => {
  if (!upc) {
    return {
      status: 400,
      body: { success: false, message: "UPC is required" },
    };
  }

  try {
    const data = await getStoreProductByUPCFromDB(upc);

    if (!data) {
      return {
        status: 404,
        body: { success: false, message: "Product with this UPC not found" },
      };
    }

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
      body: { success: false, message: "Database error" },
    };
  }
};

export const getStoreProductsByCategoryService = async (categoryName) => {
  if (!categoryName) {
    return {
      status: 400,
      body: { success: false, message: "Category name is required" },
    };
  }

  try {
    const data = await getStoreProductsByCategoryFromDB(categoryName);

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
      body: { success: false, message: "Database error" },
    };
  }
};

export const getStoreProductByNameService = async (productName) => {
  if (!productName) {
    return {
      status: 400,
      body: { success: false, message: "Product name is required" },
    };
  }

  try {
    const data = await getStoreProductByNameFromDB(productName);

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
      body: { success: false, message: "Database error" },
    };
  }
};

import * as repo from "../repositories/storeProductRepository.js";

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