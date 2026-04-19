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