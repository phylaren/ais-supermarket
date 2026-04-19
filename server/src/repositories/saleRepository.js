import db from "../../db.js";

export const getProductSalesStatsFromDB = (upc, startDate, endDate) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        s.UPC,
        p.product_name,
        SUM(s.product_number) AS total_quantity
      FROM Sale AS s
      INNER JOIN Receipt AS r ON s.id_check = r.id_check
      INNER JOIN Store_Product AS sp ON sp.UPC = s.UPC
      INNER JOIN Product AS p ON sp.id_product = p.id_product
      WHERE s.UPC = ? 
        AND r.print_date BETWEEN ? AND ?
      GROUP BY s.UPC, p.product_name
    `;

    db.get(sql, [upc, startDate, endDate], (err, row) => {
      if (err) {
        console.error("Repository Error (Sales Stats):", err.message);
        return reject(err);
      }
      resolve(row);
    });
  });
};