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