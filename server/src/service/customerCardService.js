import * as repo from "../repositories/customerCardRepository.js";

export const getAllCustomersService = async (filters = {}) => {
  try {
    const data = await repo.getAllCustomersFromDB(filters);
    return {
      status: 200,
      success: true,
      body: { data }
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: "Помилка при отриманні карток клієнтів: " + error.message
    };
  }
};