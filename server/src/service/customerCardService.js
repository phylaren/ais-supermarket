import { getAllCustomersRepository, getCustomersByDiscountRepository, getCustomerBySurnameRepository } from "../repositories/customerCardRepository.js";

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

export const getCustomersByDiscountService = async (discount) => {
  if (discount === undefined || discount === null) {
    return {
      status: 400,
      body: { success: false, message: "Discount percent is required" },
    };
  }

  try {
    const data = await getCustomersByDiscountRepository(discount);

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

export const getCustomerBySurnameService = async (surname) => {
  if (!surname) {
    return {
      status: 400,
      body: { success: false, message: "Surname is required" },
    };
  }

  try {
    const data = await getCustomerBySurnameRepository(surname);

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