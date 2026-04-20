import db from "../../db.js";

const applyFilters = (sql, params, filters) => {
  let filteredSql = sql;

  if (filters.search) {
    filteredSql += ` AND empl_surname LIKE ?`;
    params.push(`%${filters.search}%`);
  } 
  else if (filters.empl_role) {
    filteredSql += ` AND empl_role = ?`;
    params.push(filters.empl_role);
  }

  return filteredSql;
};

export const getAllEmployeesFromDB = (filters = {}) => {
  return new Promise((resolve, reject) => {
    let sql = `
      SELECT
        id_employee,
        empl_surname,
        empl_name,
        empl_patronymic,
        empl_role,
        salary,
        date_of_birth,
        date_of_start,
        phone_number,
        city,
        street,
        zip_code
      FROM Employee
      WHERE 1=1
    `;

    let params = [];
    sql = applyFilters(sql, params, filters);

    sql += ` ORDER BY empl_surname ASC`;

    db.all(sql, params, (err, rows) => {
      if (err) {
        console.error("Repository Error (Employee):", err.message);
        return reject(err);
      }
      resolve(rows);
    });
  });
};