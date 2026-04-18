import { insertEntity, deleteEntity, updateEntity } from "../service/service.js";
import { getAllCustomersService, getCustomersByDiscountService, getCustomerBySurnameService} from "../service/customerCardService.js";

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

export const getAllCustomers = async (req, res) => {
  const result = await getAllCustomersService();
  return res.status(result.status).json(result.body);
};

export const getCustomersByDiscount = async (req, res) => {
  const { percent } = req.params;

  const result = await getCustomersByDiscountService(percent);

  return res.status(result.status).json(result.body);
};

export const getCustomerBySurname = async (req, res) => {
  const { surname } = req.params;

  const result = await getCustomerBySurnameService(surname);

  return res.status(result.status).json(result.body);
};