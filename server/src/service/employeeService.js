import { getAllEmployeesFromDB } from "../repositories/employeeRepository.js";

export const getAllEmployeesService = async (filters = {}) => {
  try {
    const data = await getAllEmployeesFromDB(filters);
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
        message: "Помилка бази даних при отриманні списку працівників",
      },
    };
  }
};