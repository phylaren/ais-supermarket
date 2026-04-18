import db from "../../db.js";
import { getAllEntities, insertEntity, deleteEntity } from "../service.js";

export const getAll = async (req, res) => {
  const result = await getAllEntities({
    tableName: "Employee",
  });

  return res.status(result.status).json(result.body);
};

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

export const getMe = (req, res) => {
    try {
        const currentUserId = req.user.id; 

        const sql = `
            SELECT e.*, r.role_name 
            FROM Employee e 
            JOIN Role r ON e.id_role = r.id_role 
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