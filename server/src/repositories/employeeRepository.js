import db from "../../db.js";

const runAsync = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
};

const applyFilters = (sql, params, filters) => {
  let filteredSql = sql;

  if (filters.search) {
    const s = filters.search;
    const lower = s.toLowerCase();
    const upper = s.toUpperCase();
    const capitalized = lower.charAt(0).toUpperCase() + lower.slice(1);

    filteredSql += ` AND (
      phone_number LIKE ? OR 
      empl_surname LIKE ? OR 
      empl_surname LIKE ? OR 
      empl_surname LIKE ? OR 
      empl_surname LIKE ?
    )`;
    
    params.push(
      `%${s}%`,
      `%${s}%`,
      `%${lower}%`,
      `%${upper}%`,
      `%${capitalized}%`
    );
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

export const createEmployeeTransaction = async (employee, account) => {
    try {
        await runAsync("BEGIN TRANSACTION");

        const sqlEmp = `
            INSERT INTO Employee (
                id_employee, empl_name, empl_surname, empl_role, 
                salary, date_of_birth, date_of_start, 
                phone_number, city, street, zip_code
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const empParams = [
            employee.id_employee,
            employee.empl_name,
            employee.empl_surname,
            employee.empl_role,
            employee.salary,
            employee.date_of_birth,
            employee.date_of_start,
            employee.phone_number,
            employee.city,
            employee.street,
            employee.zip_code
        ];

        await runAsync(sqlEmp, empParams);

        const sqlAcc = `INSERT INTO Account (id_employee, password_hash) VALUES (?, ?)`;
        
        const accParams = [
            account.id_employee,
            account.password_hash
        ];

        await runAsync(sqlAcc, accParams);

        await runAsync("COMMIT");
        return { success: true };
    } catch (error) {
        await runAsync("ROLLBACK");
        console.error("Помилка транзакції працівника:", error.message);
        throw error;
    }
};