import { getAllStoreProductsByCountFromDB, getStoreProductsOrderedByNameFromDB, getStoreProductByUPCFromDB } from "../repositories/storeProductRepository.js";

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