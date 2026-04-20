import { insertEntity, deleteEntity, updateEntity } from "../service/service.js";
import * as productService from "../service/productService.js";

export const getAllProducts = async (req, res) => {
  try {
    // Передаємо query-параметри (наприклад, ?id_category=3) у сервіс
    const result = await productService.getAllProductsService(req.query);
    return res.status(result.status).json(result.body);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
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