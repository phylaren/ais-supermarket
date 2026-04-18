import { getAllEntities, insertEntity, deleteEntity, updateEntity } from "../service.js";

export const getAll = async (req, res) => {
  const result = await getAllEntities({
    tableName: "Store_Product",
  });

  return res.status(result.status).json(result.body);
};

export const insertData = async (req, res) => {
  const result = await insertEntity({
    tableName: "Store_Product",
    data: req.body,
    entityName: "Товар у магазині",
  });

  return res.status(result.status).json(result.body);
};

export const deleteStoreProduct = async (req, res) => {
  const { UPC } = req.params;

  const result = await deleteEntity({
    tableName: "Store_Product",
    idField: "UPC",
    entityName: "Товар у магазині",
    id: UPC,
  });

  return res.status(result.status).json(result.body);
};

export const updateData = async (req, res) => {
  const { UPC } = req.params;

  const result = await updateEntity({
    tableName: "Store_Product",
    idField: "UPC",
    entityName: "Товар у магазині",
    id: UPC,
    data: req.body
  });

  return res.status(result.status).json(result.body);
};