import { getAllEntities, insertEntity, deleteEntity, updateEntity } from "../service/service.js";
import * as service from "../service/saleService.js";

export const getAll = async (req, res) => {
  const result = await getAllEntities({
    tableName: "Sale",
  });

  return res.status(result.status).json(result.body);
};

export const insertData = async (req, res) => {
  const result = await insertEntity({
    tableName: "Sale",
    data: req.body,
    entityName: "Продаж",
  });

  return res.status(result.status).json(result.body);
};

export const deleteSale = async (req, res) => {
  const { id_sale } = req.params;

  const result = await deleteEntity({
    tableName: "Sale",
    idField: "id_sale",
    entityName: "Продаж",
    id: id_sale,
  });

  return res.status(result.status).json(result.body);
};

export const updateData = async (req, res) => {
  const { id_sale } = req.params;

  const result = await updateEntity({
    tableName: "Sale",
    idField: "id_sale",
    entityName: "Продаж",
    id: id_sale,
    data: req.body
  });

  return res.status(result.status).json(result.body);
};

export const getProductSalesStats = async (req, res) => {
  const { upc, start, end } = req.query;

  const result = await service.getProductSalesStatsService(upc, start, end);
  
  return res.status(result.status).json(result);
};