import { getAllEntities, insertEntity, deleteEntity, updateEntity } from "../service/service.js";
import * as service from "../service/receiptService.js";

export const getReceipts = async (req, res) => {
  const result = await service.getReceiptsService();
  return res.status(result.status).json(result);
};

export const getReceiptsByEmployee = async (req, res) => {
  const { id } = req.params; 
  
  const result = await receiptService.getReceiptsByEmployeeService(id);
  return res.status(result.status).json(result);
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

export const getGeneralSalesReport = async (req, res) => {
  const { start, end } = req.query;

  const result = await service.getGeneralSalesReportService(start, end);
  
  return res.status(result.status).json(result);
};

export const getCashierDailyReport = async (req, res) => {
  const { surname, date } = req.query;

  const result = await service.getCashierDailyReportService(surname, date);
  
  return res.status(result.status).json(result);
};

export const getReceiptDetails = async (req, res) => {
  const { id } = req.params;

  const result = await service.getReceiptDetailsService(id);
  
  return res.status(result.status).json(result);
};

export const getCashierTotalRevenue = async (req, res) => {
  const { surname, start, end } = req.query;

  const result = await service.getCashierTotalRevenueService(surname, start, end);
  
  return res.status(result.status).json(result);
};

export const getTotalRevenue = async (req, res) => {
  const { start, end } = req.query;

  const result = await service.getTotalRevenueService(start, end);
  
  return res.status(result.status).json(result);
};