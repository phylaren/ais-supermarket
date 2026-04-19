import { getAllEntities, insertEntity, deleteEntity, updateEntity } from "../service/service.js";
import * as service from "../service/receiptService.js";

export const getAll = async (req, res) => {
  const result = await getAllEntities({
    tableName: "Receipt",
  });

  return res.status(result.status).json(result.body);
};

export const insertData = async (req, res) => {
  const result = await insertEntity({
    tableName: "Receipt",
    data: req.body,
    entityName: "Чек",
  });

  return res.status(result.status).json(result.body);
};

export const deleteReceipt = async (req, res) => {
  const { id_receipt } = req.params;

  const result = await deleteEntity({
    tableName: "Receipt",
    idField: "id_receipt",
    entityName: "Чек",
    id: id_receipt,
  });

  return res.status(result.status).json(result.body);
};

export const updateData = async (req, res) => {
  const { id_receipt } = req.params;

  const result = await updateEntity({
    tableName: "Receipt",
    idField: "id_receipt",
    entityName: "Чек",
    id: id_receipt,
    data: req.body
  });

  return res.status(result.status).json(result.body);
};

export const getCashierReport = async (req, res) => {
  const { surname, start, end } = req.query;

  const result = await service.getCashierReportService(surname, start, end);
  
  return res.status(result.status).json(result);
};