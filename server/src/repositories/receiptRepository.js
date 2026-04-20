import db from "../../db.js";

const applyFilters = (sql, params, filters) => {
  let filteredSql = sql;

  if (filters.search) {
    filteredSql += ` AND (r.id_check LIKE ? OR e.empl_surname LIKE ? OR c.cust_surname LIKE ?)`;
    const searchString = `%${filters.search}%`;
    params.push(searchString, searchString, searchString);
  }

  if (filters.receipt_date_from) {
    filteredSql += ` AND r.print_date >= ?`;
    params.push(`${filters.receipt_date_from} 00:00:00`);
  }

  if (filters.receipt_date_to) {
    filteredSql += ` AND r.print_date <= ?`;
    params.push(`${filters.receipt_date_to} 23:59:59`);
  }

  if (filters.id_employee && filters.id_employee !== 'all') {
    filteredSql += ` AND r.id_employee = ?`;
    params.push(filters.id_employee);
  }

  return filteredSql;
};

export const getAllFromDB = (filters = {}) => {
  return new Promise((resolve, reject) => {
    let sql = `
      SELECT 
        r.id_check,
        r.print_date,
        r.sum_total,
        r.vat,
        e.empl_surname,
        c.cust_surname
      FROM Receipt AS r
      INNER JOIN Employee AS e ON r.id_employee = e.id_employee
      LEFT JOIN Customer_Card AS c ON r.id_card = c.id_card
      WHERE 1=1
    `;

    let params = [];

    sql = applyFilters(sql, params, filters);

    sql += ` ORDER BY r.print_date DESC`;

    db.all(sql, params, (err, rows) => {
      if (err) {
        console.error("Repository Error (getAllFromDB):", err.message);
        return reject(err);
      }
      resolve(rows);
    });
  });
};

export const getReceiptsByEmployeeFromDB = (employeeId, filters = {}) => {
  return new Promise((resolve, reject) => {
    let sql = `
      SELECT 
        r.id_check,
        r.print_date,
        r.sum_total,
        e.empl_surname,
        c.cust_surname
      FROM Receipt AS r
      INNER JOIN Employee AS e ON r.id_employee = e.id_employee
      LEFT JOIN Customer_Card AS c ON r.id_card = c.id_card
      WHERE e.id_employee = ?
    `;

    let params = [employeeId];

    const safeFilters = { ...filters };
    delete safeFilters.id_employee;

    sql = applyFilters(sql, params, safeFilters);

    sql += ` ORDER BY r.print_date DESC`;

    db.all(sql, params, (err, rows) => {
      if (err) {
        console.error("Repository Error (By Employee):", err.message);
        return reject(err);
      }
      resolve(rows);
    });
  });
};

export const findReceiptsByCashierAndDateFromDB = (surname, startDate, endDate) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        r.id_check,
        r.print_date,
        e.empl_surname,
        p.product_name,
        s.product_number,
        s.selling_price,
        r.sum_total,
        r.vat
      FROM Receipt AS r
      INNER JOIN Employee AS e ON r.id_employee = e.id_employee
      INNER JOIN Sale AS s ON r.id_check = s.id_check
      INNER JOIN Store_Product AS sp ON s.UPC = sp.UPC
      INNER JOIN Product AS p ON sp.id_product = p.id_product
      WHERE e.empl_surname = ? 
        AND r.print_date BETWEEN ? AND ?
    `;

    db.all(sql, [surname, startDate, endDate], (err, rows) => {
      if (err) {
        console.error("Repository Error:", err.message);
        return reject(err);
      }
      resolve(rows);
    });
  });
};

export const getGeneralSalesReportFromDB = (startDate, endDate) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        r.id_check,
        r.print_date,
        e.empl_surname,
        p.product_name,
        s.product_number,
        s.selling_price,
        r.sum_total,
        r.vat
      FROM Receipt AS r
      INNER JOIN Employee AS e ON r.id_employee = e.id_employee
      INNER JOIN Sale AS s ON r.id_check = s.id_check
      INNER JOIN Store_Product AS sp ON s.UPC = sp.UPC
      INNER JOIN Product AS p ON sp.id_product = p.id_product
      WHERE r.print_date BETWEEN ? AND ?
      ORDER BY r.print_date DESC
    `;

    db.all(sql, [startDate, endDate], (err, rows) => {
      if (err) {
        console.error("DB Repository Error:", err.message);
        return reject(err);
      }
      resolve(rows);
    });
  });
};

export const findReceiptsByCashierAndExactDateFromDB = (surname, exactDate) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        r.id_check,
        r.print_date,
        e.empl_surname,
        r.sum_total,
        r.vat
      FROM Receipt AS r
      INNER JOIN Employee AS e ON r.id_employee = e.id_employee
      WHERE e.empl_surname = ? 
        AND date(r.print_date) = date(?)
    `;

    db.all(sql, [surname, exactDate], (err, rows) => {
      if (err) {
        console.error("Repository Error:", err.message);
        return reject(err);
      }
      resolve(rows);
    });
  });
};

export const getReceiptDetailsFromDB = (idCheck) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        r.id_check,
        r.print_date,
        e.empl_surname,
        p.product_name,
        s.product_number,
        s.selling_price,
        r.sum_total,
        r.vat
      FROM Receipt AS r
      INNER JOIN Employee AS e ON r.id_employee = e.id_employee
      INNER JOIN Sale AS s ON r.id_check = s.id_check
      INNER JOIN Store_Product AS sp ON s.UPC = sp.UPC
      INNER JOIN Product AS p ON sp.id_product = p.id_product
      WHERE r.id_check = ?
    `;

    db.all(sql, [idCheck], (err, rows) => {
      if (err) {
        console.error("SQL Error in getReceiptDetails:", err.message);
        return reject(err);
      }
      resolve(rows);
    });
  });
};

export const getTotalSumByCashierFromDB = (surname, startDate, endDate) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        SUM(r.sum_total) AS total_sum
      FROM Receipt AS r
      INNER JOIN Employee AS e ON r.id_employee = e.id_employee
      WHERE e.empl_surname = ? 
        AND r.print_date BETWEEN ? AND ?
    `;

    db.get(sql, [surname, startDate, endDate], (err, row) => {
      if (err) {
        console.error("Repository Error (Total Sum):", err.message);
        return reject(err);
      }
      resolve(row);
    });
  });
};

export const getTotalRevenueFromDB = (startDate, endDate) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        SUM(sum_total) AS total_sum
      FROM Receipt
      WHERE print_date BETWEEN ? AND ?
    `;

    db.get(sql, [startDate, endDate], (err, row) => {
      if (err) {
        console.error("Repository Error (Total Revenue):", err.message);
        return reject(err);
      }
      resolve(row);
    });
  });
};