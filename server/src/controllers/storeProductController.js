import { insertEntity, deleteEntity, updateEntity } from "../service/service.js";
import { getAllStoreProductsByCountService } from "../service/storeProductService.js";

export const insertData = async (req, res) => {
  const result = await insertEntity({
    tableName: "Store_Product",
    data: req.body,
    entityName: "Товар у магазині",
  });

  return res.status(result.status).json(result.body);
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
  const result = await getAllStoreProductsByCountService();
  return res.status(result.status).json(result.body);
};