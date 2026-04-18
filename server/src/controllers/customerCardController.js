import { getAllEntities, insertEntity, deleteEntity, updateEntity } from "../service.js";

export const getAll = async (req, res) => {
  const result = await getAllEntities({
    tableName: "Customer_Card",
  });

  return res.status(result.status).json(result.body);
};

export const insertData = async (req, res) => {
  const result = await insertEntity({
    tableName: "Customer_Card",
    data: req.body,
    entityName: "Карту клієнта",
  });

  return res.status(result.status).json(result.body);
};

export const deleteCustomerCard = async (req, res) => {
  const { card_number } = req.params;

  const result = await deleteEntity({
    tableName: "Customer_Card",
    idField: "card_number",
    entityName: "Карту клієнта",
    id: card_number,
  });

  return res.status(result.status).json(result.body);
};

export const updateData = async (req, res) => {
  const { card_number } = req.params;

  const result = await updateEntity({
    tableName: "Customer_Card",
    idField: "card_number",
    entityName: "Карту клієнта",
    id: card_number,
    data: req.body
  });

  return res.status(result.status).json(result.body);
};