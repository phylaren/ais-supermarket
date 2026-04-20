import { getAllEntities, insertEntity, deleteEntity, updateEntity } from "../service/service.js";
import * as service from "../service/receiptService.js";

export const getReceipts = async (req, res) => {
  try {
    const result = await service.getReceiptsService(req.query);
    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getReceiptsByEmployee = async (req, res) => {
  try {
    const employeeId = req.user.id;

    if (!employeeId) {
      return res.status(401).json({ success: false, message: "Не вдалося ідентифікувати користувача з токена" });
    }

    const result = await service.getReceiptsByEmployeeService(employeeId, req.query);
    return res.status(result.status).json(result);

  } catch (error) {
    console.error("❌ Помилка в getReceiptsByEmployee:", error);
    return res.status(500).json({ success: false, message: "Внутрішня помилка сервера: " + error.message });
  }
};

export const insertData = async (req, res) => {
  try {
    const { sum_total, vat, id_card, items } = req.body;

    const id_employee = req.user.id;

    const receiptData = { sum_total, vat, id_card, id_employee };

    const result = await service.createReceiptWithItemsService(receiptData, items);

    return res.status(result.status).json(result);
  } catch (error) {
    console.error("Controller Error:", error);
    return res.status(500).json({ success: false, message: "Помилка сервера: " + error.message });
  }
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