import db from "../../db.js";

const applyFilters = (sql, params, filters) => {
  let filteredSql = sql;

  if (filters.search) {
    filteredSql += ` AND cust_surname LIKE ?`;
    params.push(`%${filters.search}%`);
  } 
  else if (filters.discount_percent) {
    filteredSql += ` AND discount_percent = ?`;
    params.push(Number(filters.discount_percent));
  }

  return filteredSql;
};

export const getAllCustomersFromDB = (filters = {}) => {
  return new Promise((resolve, reject) => {
    let sql = `
      SELECT
        id_card,
        cust_surname,
        cust_name,
        cust_patronymic,
        phone_number,
        city,
        street,
        zip_code,
        discount_percent
      FROM Customer_Card
      WHERE 1=1
    `;

    let params = [];
    sql = applyFilters(sql, params, filters);

    sql += ` ORDER BY cust_surname ASC`;

    db.all(sql, params, (err, rows) => {
      if (err) {
        console.error("Repository Error (Customer_Card):", err.message);
        return reject(err);
      }
      resolve(rows);
    });
  });
};