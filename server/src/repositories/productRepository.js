import db from "../../db.js";

const applyFilters = (sql, params, filters) => {
  let filteredSql = sql;

  if (filters.id_category && filters.id_category !== 'all') {
    filteredSql += ` AND p.id_category = ?`;
    params.push(filters.id_category);
  }

  return filteredSql;
};

export const getAllProductsFromDB = (filters = {}) => {
  return new Promise((resolve, reject) => {
    let sql = `
      SELECT
        p.id_product,
        p.product_name,
        p.characteristics,
        c.category_name
      FROM Product AS p
      INNER JOIN Category AS c ON p.id_category = c.id_category
      WHERE 1=1
    `;
    
    let params = [];
    sql = applyFilters(sql, params, filters);

    sql += ` ORDER BY p.product_name ASC`;

    db.all(sql, params, (err, rows) => {
      if (err) {
        console.error("Repository Error (Product):", err.message);
        return reject(err);
      }
      resolve(rows);
    });
  });
};