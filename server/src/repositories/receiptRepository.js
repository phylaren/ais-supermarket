import db from "../../db.js";

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