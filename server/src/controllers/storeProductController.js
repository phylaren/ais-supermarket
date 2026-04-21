import db from "../../db.js";
import { insertEntity, deleteEntity, updateEntity } from "../service/service.js";
import { getAllStoreProductsByCountService, getStoreProductsByNameService } from "../service/storeProductService.js";
import * as repo from '../repositories/storeProductRepository.js';

export const insertData = async (req, res) => {
  try {
    const { id_product, promotional_product } = req.body;

    if (!id_product) {
      return res.status(400).json({ success: false, message: "ID товару обов'язковий" });
    }

    const isPromo = (promotional_product === true || promotional_product === 1 || promotional_product === "1") ? 1 : 0;

    const duplicate = await repo.checkDuplicatePromo(id_product, isPromo);

    if (duplicate) {
      const statusText = isPromo ? "Акційний" : "Неакційний";
      return res.status(400).json({ 
        success: false, 
        message: `Помилка: ${statusText} товар для цього продукту вже існує на складі (UPC: ${duplicate.UPC})!` 
      });
    }

    const result = await insertEntity({
      tableName: "Store_Product",
      data: req.body,
      entityName: "Товар у магазині",
    });

    return res.status(result.status).json(result.body);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
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
  try {
    const { UPC } = req.params;
    const { id_product, promotional_product } = req.body;

    if (id_product !== undefined && promotional_product !== undefined) {
      const isPromo = (promotional_product === true || promotional_product === 1 || promotional_product === "1") ? 1 : 0;
      
      const duplicate = await repo.checkDuplicatePromo(id_product, isPromo, UPC);

      if (duplicate) {
        const statusText = isPromo ? "Акційний" : "Неакційний";
        return res.status(400).json({ 
          success: false, 
          message: `Помилка: ${statusText} товар для цього продукту вже існує на складі (UPC: ${duplicate.UPC})!` 
        });
      }
    }

    const result = await updateEntity({
      tableName: "Store_Product",
      idField: "UPC",
      entityName: "Товар у магазині",
      id: UPC,
      data: req.body
    });

    return res.status(result.status).json(result.body);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
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

export const addStock = async (req, res) => {
    try {
        const { upc } = req.params;
        const { quantity, price } = req.body; 

        if (!quantity || quantity <= 0) {
            return res.status(400).json({ success: false, message: "Некоректна кількість" });
        }
        if (!price || price <= 0) {
            return res.status(400).json({ success: false, message: "Некоректна ціна" });
        }

        await repo.addStockToDB(upc, quantity, price);
        
        return res.status(200).json({ success: true, message: "Партію прийнято, ціну оновлено" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};