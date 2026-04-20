import { insertEntity, deleteEntity, updateEntity } from "../service/service.js";
import * as customerService from "../service/customerCardService.js";

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
  const { id_card } = req.params;

  const result = await updateEntity({
    tableName: "Customer_Card",
    idField: "id_card",
    entityName: "Карту клієнта",
    id: id_card,
    data: req.body
  });

  return res.status(result.status).json(result.body);
};

export const getAllCustomers = async (req, res) => {
  try {
    const result = await customerService.getAllCustomersService(req.query);
    if (!result || !result.body) {
      return res.status(500).json({ success: false, message: "Service returned invalid format" });
    }
    return res.status(result.status).json(result.body);
  } catch (error) {
    console.error("Controller Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getCustomerById = async (req, res) => {
  const { id_card } = req.params;

  const result = await customerService.getCustomerByIdService(id_card);

  return res.status(result.status).json(result.body);
};