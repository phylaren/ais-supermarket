import { getAllEntities, insertEntity, deleteEntity, updateEntity } from "../service.js";

export const getAll = async (req, res) => {
  const result = await getAllEntities({
    tableName: "Product",
  });

  return res.status(result.status).json(result.body);
};

export const insertData = async (req, res) => {
  const result = await insertEntity({
    tableName: "Product",
    data: req.body,
    entityName: "Продукт",
  });

  return res.status(result.status).json(result.body);
};

export const deleteProduct = async (req, res) => {
  const { id_product } = req.params;

  const result = await deleteEntity({
    tableName: "Product",
    idField: "id_product",
    entityName: "Продукт",
    id: id_product,
  });

  return res.status(result.status).json(result.body);
};

export const updateData = async (req, res) => {
  const { id_product } = req.params;

  const result = await updateEntity({
    tableName: "Product",
    idField: "id_product",
    entityName: "Продукт",
    id: id_product,
    data: req.body
  });

  return res.status(result.status).json(result.body);
};