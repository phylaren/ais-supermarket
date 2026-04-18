import db from "../../db.js";
import { getAllEntities, insertEntity, deleteEntity, updateEntity } from "../service/service.js";
import { getAllEmployeesService, getEmployeesByRoleService, getEmployeeBySurnameService } from "../service/employeeService.js";

export const insertData = async (req, res) => {
  const result = await insertEntity({
    tableName: "Employee",
    data: req.body,
    entityName: "Працівника",
  });

  return res.status(result.status).json(result.body);
};

export const deleteEmployee = async (req, res) => {
  const { id_employee } = req.params;

  const result = await deleteEntity({
    tableName: "Employee",
    idField: "id_employee",
    entityName: "Працівника",
    id: id_employee,
  });

  return res.status(result.status).json(result.body);
};

export const updateData = async (req, res) => {
  const { id_employee } = req.params;

  const result = await updateEntity({
    tableName: "Employee",
    idField: "id_employee",
    entityName: "Працівника",
    id: id_employee,
    data: req.body
  });

  return res.status(result.status).json(result.body);
};

export const getMe = (req, res) => {
    try {
        const currentUserId = req.user.id; 

        const sql = `
            SELECT e.*
            FROM Employee e 
            WHERE e.id_employee = ?
        `;

        db.get(sql, [currentUserId], (err, row) => {
            if (err) {
                console.error("Помилка бази даних:", err);
                return res.status(500).json({ error: "Помилка сервера при отриманні профілю" });
            }

            if (!row) {
                return res.status(404).json({ error: "Користувача не знайдено" });
            }

            res.json({ success: true, data: row });
        });

    } catch (error) {
        console.error("Помилка в getMe:", error);
        res.status(500).json({ error: "Внутрішня помилка сервера" });
    }
};

export const getAllEmployees = async (req, res) => {
  const result = await getAllEmployeesService();
  return res.status(result.status).json(result.body);
};

export const getEmployeesByRole = async (req, res) => {
  const { empl_role } = req.params;

  const result = await getEmployeesByRoleService(empl_role);

  return res.status(result.status).json(result.body);
};

export const getEmployeeBySurname = async (req, res) => {
  const { empl_surname } = req.params; 

  const result = await getEmployeeBySurnameService(empl_surname);

  return res.status(result.status).json(result.body);
};