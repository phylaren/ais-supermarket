import db from "../../db.js";

export const getAllStoreProductsByCountFromDB = () => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        s.UPC,
        p.product_name,
        s.selling_price,
        s.products_number,
        s.promotional_product
      FROM Store_Product AS s
      INNER JOIN Product AS p ON s.id_product = p.id_product
      ORDER BY s.products_number DESC
    `;

    db.all(sql, [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

export const getStoreProductsOrderedByNameFromDB = () => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        s.UPC,
        p.product_name,
        s.selling_price,
        s.products_number,
        s.promotional_product
      FROM Store_Product AS s
      INNER JOIN Product AS p ON s.id_product = p.id_product
      ORDER BY p.product_name ASC
    `;

    db.all(sql, [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

export const getStoreProductByUPCFromDB = (upc) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        sp.UPC,
        p.product_name,
        sp.selling_price,
        sp.products_number,
        p.characteristics
      FROM Store_Product AS sp
      INNER JOIN Product AS p ON sp.id_product = p.id_product
      WHERE sp.UPC = ?
    `;

    db.get(sql, [upc], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
};

export const getStoreProductsByCategoryFromDB = (categoryName) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        s.UPC,
        p.product_name,
        c.category_name,
        s.products_number,
        s.selling_price,
        s.promotional_product,
        p.characteristics
      FROM Store_Product AS s
      INNER JOIN Product AS p ON s.id_product = p.id_product
      INNER JOIN Category AS c ON p.id_category = c.id_category
      WHERE c.category_name = ?
      ORDER BY p.product_name ASC
    `;

    db.all(sql, [categoryName], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};