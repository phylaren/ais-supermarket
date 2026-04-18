import db from "../../db.js";

export const getAllEmployees = () => {
  return new Promise((resolve, reject) => {
    const sql = `
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
      ORDER BY empl_surname
    `;

    db.all(sql, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

export const getEmployeesByRole = (empl_role) => {
  return new Promise((resolve, reject) => {
    const sql = `
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
      WHERE empl_role = ?
      ORDER BY empl_surname
    `;

    db.all(sql, [empl_role], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

export const getEmployeeBySurname = (empl_surname) => {
  return new Promise((resolve, reject) => {
    const sql = `
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
      WHERE empl_surname = ?
    `;

    db.all(sql, [empl_surname], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};