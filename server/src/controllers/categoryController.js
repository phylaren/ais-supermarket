import db from "../../db.js";
import { getAllEntities, insertEntity, deleteEntity, updateEntity } from "../service/service.js";
import { getAllCategoriesService } from "../service/categoryService.js";

export const getAll = async (req, res) => {
  const result = await getAllEntities({
    tableName: "Category",
  });

  return res.status(result.status).json(result.body);
};

export const insertData = async (req, res) => {
  const result = await insertEntity({
    tableName: "Category",
    data: req.body,
    entityName: "Категорію",
  });

  return res.status(result.status).json(result.body);
};

export const deleteCategory = async (req, res) => {
  const { id_category } = req.params;

  const checkSql = `SELECT COUNT(*) as count FROM Product WHERE id_category = ?`;

  db.get(checkSql, [id_category], async (err, row) => {
    if (err) {
      console.error("Помилка БД при перевірці категорії:", err.message);
      return res.status(500).json({ success: false, message: "Помилка бази даних під час перевірки" });
    }

    if (row.count > 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Неможливо видалити категорію: до неї прив'язані існуючі товари!" 
      });
    }

    const result = await deleteEntity({
      tableName: "Category",
      idField: "id_category",
      entityName: "Категорію",
      id: id_category,
    });

    return res.status(result.status).json(result.body);
  });
};

export const updateData = async (req, res) => {
  const { id_category } = req.params;

  const result = await updateEntity({
    tableName: "Category",
    idField: "id_category",
    id: id_category,
    data: req.body,
    entityName: "Категорію",
  });

  return res.status(result.status).json(result.body);
};

export const getAllCategories = async (req, res) => {
  const result = await getAllCategoriesService();
  return res.status(result.status).json(result.body);
};