import { getAllEmployeesFromDB } from "../repositories/employeeRepository.js";
import bcrypt from 'bcrypt';
import * as repo from '../repositories/employeeRepository.js';

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

export const createEmployeeWithAccount = async (employeeData) => {
    try {
        const { password, ...details } = employeeData;

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const accountData = {
            id_employee: details.id_employee,
            password_hash: hashedPassword
        };

        await repo.createEmployeeTransaction(details, accountData);

        return { status: 201, success: true, message: "Працівника та акаунт створено!" };
    } catch (error) {
        return { status: 500, success: false, message: error.message };
    }
};