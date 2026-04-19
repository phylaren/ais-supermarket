import db from "../../db.js";

export const getAllProductsWithCategoriesFromDB = () => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        p.id_product,
        p.product_name,
        p.characteristics,
        c.category_name
      FROM Product AS p
      INNER JOIN Category AS c ON p.id_category = c.id_category
      ORDER BY p.product_name ASC
    `;

    db.all(sql, [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

export const getProductsByCategoryFromDB = (categoryName) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        p.id_product,
        p.product_name,
        c.category_name,
        p.characteristics
      FROM Product AS p
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