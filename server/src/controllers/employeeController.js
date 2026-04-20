import db from "../../db.js";
import { insertEntity, deleteEntity, updateEntity } from "../service/service.js";
import * as employeeService from "../service/employeeService.js";

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

export const getAllEmployees = async (req, res) => {
  try {
    const result = await employeeService.getAllEmployeesService(req.query);
    return res.status(result.status).json(result.body);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getMe = (req, res) => {
  const currentUserId = req.user.id; 
  const sql = `SELECT * FROM Employee WHERE id_employee = ?`;

  db.get(sql, [currentUserId], (err, row) => {
    if (err) return res.status(500).json({ error: "Помилка сервера" });
    if (!row) return res.status(404).json({ error: "Користувача не знайдено" });
    res.json({ success: true, data: row });
  });
};