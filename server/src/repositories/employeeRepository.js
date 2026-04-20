import db from "../../db.js";

const applyFilters = (sql, params, filters) => {
  let filteredSql = sql;

  if (filters.search) {
    filteredSql += ` AND (empl_surname LIKE ? OR phone_number LIKE ?)`;
    const searchString = `%${filters.search}%`;
    params.push(searchString, searchString);
  }

  if (filters.empl_role && filters.empl_role !== 'all') {
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

    if (filters.sort_by === 'salary_desc') {
      sql += ` ORDER BY salary DESC`;
    } else if (filters.sort_by === 'salary_asc') {
      sql += ` ORDER BY salary ASC`;
    } else {
      sql += ` ORDER BY empl_surname ASC`;
    }

    db.all(sql, params, (err, rows) => {
      if (err) {
        console.error("Repository Error (Employee):", err.message);
        return reject(err);
      }
      resolve(rows);
    });
  });
};