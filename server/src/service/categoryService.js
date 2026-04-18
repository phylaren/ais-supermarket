import { getAllCategoriesFromDB } from "../repositories/categoryRepository.js";

export const getAllCategoriesService = async () => {
  try {
    const data = await getAllCategoriesFromDB();

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