import { getAllEntities, insertEntity, deleteEntity, updateEntity } from "../service/service.js";

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

  const result = await deleteEntity({
    tableName: "Category",
    idField: "id_category",
    entityName: "Категорію",
    id: id_category,
  });

  return res.status(result.status).json(result.body);
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