import db from "../../db.js";

const applyFilters = (sql, params, filters) => {
  let filteredSql = sql;

  if (filters.search) {
    const s = filters.search;
    const lower = s.toLowerCase();
    const upper = s.toUpperCase();
    const capitalized = lower.charAt(0).toUpperCase() + lower.slice(1);

    filteredSql += ` AND (
      id_card LIKE ? OR 
      phone_number LIKE ? OR 
      cust_surname LIKE ? OR 
      cust_surname LIKE ? OR 
      cust_surname LIKE ? OR 
      cust_surname LIKE ?
    )`;
    
    params.push(
      `%${s}%`,
      `%${s}%`,
      `%${s}%`,
      `%${lower}%`,
      `%${upper}%`,
      `%${capitalized}%`
    );
  }

  if (filters.discount_percent && filters.discount_percent !== 'all') {
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

export const getCustomerByIdRepository = (id_card) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM Customer_Card WHERE id_card = ?`;

    db.get(sql, [id_card], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
};