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

export const getCustomersByDiscountRepository = (discount) => {
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
      WHERE discount_percent = ?
      ORDER BY cust_surname
    `;

    db.all(sql, [discount], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

export const getCustomerBySurnameRepository = (surname) => {
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
      WHERE cust_surname = ?
    `;

    db.all(sql, [surname], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};