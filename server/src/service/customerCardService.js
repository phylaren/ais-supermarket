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

export const getCustomerByIdService = async (id_card) => {
  try {
    const data = await repo.getCustomerByIdRepository(id_card);

    if (!data) {
      return { status: 404, body: { success: false, message: "Картку не знайдено" } };
    }

    return { status: 200, body: { success: true, data } };
  } catch (err) {
    console.error("DB error:", err.message);
    return { status: 500, body: { success: false, message: "Database error" } };
  }
};