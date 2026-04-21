import db from "../../db.js";
import { insertEntity, deleteEntity, updateEntity } from "../service/service.js";
import { getAllStoreProductsByCountService, getStoreProductsByNameService, getStoreProductByUPCService,
  getStoreProductsByCategoryService, getStoreProductByNameService, getStoreProductsData
 } from "../service/storeProductService.js";

export const insertData = async (req, res) => {
  const { id_product } = req.body;

  if (!id_product) {
    return res.status(400).json({ success: false, message: "ID товару обов'язковий" });
  }

  const checkSql = `SELECT COUNT(*) as count FROM Store_Product WHERE id_product = ?`;

  db.get(checkSql, [id_product], async (err, row) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Помилка бази даних під час перевірки товару" });
    }

    if (row.count >= 2) {
      return res.status(400).json({ 
        success: false, 
        message: "Цей товар вже має максимально допустимі 2 записи в магазині (звичайний та акційний)!" 
      });
    }

    const result = await insertEntity({
      tableName: "Store_Product",
      data: req.body,
      entityName: "Товар у магазині",
    });

    return res.status(result.status).json(result.body);
  });
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

export const getAllStoreProductsByCount = async (req, res) => {
  const filters = req.query;
  const result = await getAllStoreProductsByCountService(filters);
  return res.status(result.status).json(result.body);
};

export const getAllStoreProductsByName = async (req, res) => {
  const filters = req.query;
  const result = await getStoreProductsByNameService(filters);
  return res.status(result.status).json(result.body);
};

export const getStoreProductByUPC = async (req, res) => {
  const { upc } = req.params;

  const result = await getStoreProductByUPCService(upc);

  return res.status(result.status).json(result.body);
};

export const getStoreProductsByCategory = async (req, res) => {
  const { categoryName } = req.params;

  const result = await getStoreProductsByCategoryService(categoryName);

  return res.status(result.status).json(result.body);
};

export const getStoreProductByName = async (req, res) => {
  const { productName } = req.params;

  const result = await getStoreProductByNameService(productName);
  return res.status(result.status).json(result.body);
};

export const getPromotional = async (req, res) => {
  const { sort } = req.query;
  const result = await getStoreProductsData('promotional', sort);
  return res.status(result.status).json(result);
};

export const getNonPromotional = async (req, res) => {
  const { sort } = req.query;
  const result = await getStoreProductsData('non-promotional', sort);
  return res.status(result.status).json(result);
};