import db from "../../db.js";

export const getAllCustomersRepository= () => {
  return new Promise((resolve, reject) => {
    const sql = `
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
      ORDER BY cust_surname ASC
    `;

    db.all(sql, [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};