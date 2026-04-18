import { getAllCustomersRepository } from "../repositories/customerCardRepository.js";

export const getAllCustomersService = async () => {
  try {
    const data = await getAllCustomersRepository();

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