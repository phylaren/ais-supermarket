import { getAllEmployees, getEmployeesByRole, getEmployeeBySurname } from "../repositories/employeeRepository.js";

export const getAllEmployeesService = async () => {
  try {
    const data = await getAllEmployees();

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

export const getEmployeesByRoleService = async (empl_role) => {
  if (!empl_role) {
    return {
      status: 400,
      body: {
        success: false,
        message: "Role is required",
      },
    };
  }

  try {
    const data = await getEmployeesByRole(empl_role);

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

export const getEmployeeBySurnameService = async (empl_surname) => {
  if (!empl_surname) {
    return {
      status: 400,
      body: { success: false, message: "Surname is required" },
    };
  }

  try {
    const data = await getEmployeeBySurname(empl_surname);

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