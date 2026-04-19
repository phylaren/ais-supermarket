import { getAllProductsWithCategoriesFromDB, getProductsByCategoryFromDB } from "../repositories/productRepository.js";

export const getAllProductsService = async () => {
  try {
    const data = await getAllProductsWithCategoriesFromDB();

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

export const getProductsByCategoryService = async (categoryName) => {
  if (!categoryName) {
    return {
      status: 400,
      body: { success: false, message: "Category name is required" },
    };
  }

  try {
    const data = await getProductsByCategoryFromDB(categoryName);

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