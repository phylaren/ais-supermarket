import db from "../../db.js";

export const getAllCategoriesFromDB = () => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        id_category,
        category_name
      FROM Category
      ORDER BY category_name ASC
    `;

    db.all(sql, [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};