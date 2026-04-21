import db from "../../db.js";
import { insertEntity, deleteEntity, updateEntity } from "../service/service.js";
import * as employeeService from "../service/employeeService.js";

export const insertEmployee = async (req, res) => {
    const result = await employeeService.createEmployeeWithAccount(req.body);
    res.status(result.status).json(result);
};

export const deleteEmployee = async (req, res) => {
  const { id_employee } = req.params;
  const checkSql = `SELECT COUNT(*) as count FROM Receipt WHERE id_employee = ?`;

  db.get(checkSql, [id_employee], async (err, row) => {
    if (err) {
      console.error("Помилка БД при перевірці працівника:", err.message);
      return res.status(500).json({ success: false, message: "Помилка бази даних під час перевірки" });
    }

    if (row.count > 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Неможливо видалити працівника: він вже створив один або більше чеків!" 
      });
    }

    const result = await deleteEntity({
      tableName: "Employee",
      idField: "id_employee",
      entityName: "Працівника",
      id: id_employee,
    });

    return res.status(result.status).json(result.body);
  });
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
    res.json({ success: true, data: [row] });
  });
};