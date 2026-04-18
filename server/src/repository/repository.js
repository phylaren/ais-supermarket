import db from "../../db.js";

export const getAll = (tableName) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM ${tableName}`;

    db.all(sql, [], (err, rows) => {
      if (err) return reject(err);

      resolve(rows);
    });
  });
};

export const insert = (tableName, data) => {
  return new Promise((resolve, reject) => {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const placeholders = keys.map(() => "?").join(", ");

    const sql = `
      INSERT INTO ${tableName} (${keys.join(", ")})
      VALUES (${placeholders})
    `;

    db.run(sql, values, function (err) {
      if (err) return reject(err);

      resolve({
        id: this.lastID,
        changes: this.changes,
      });
    });
  });
};

export const deleteById = (tableName, idField, id) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM ${tableName} WHERE ${idField} = ?`;

    db.run(sql, [id], function (err) {
      if (err) return reject(err);

      resolve({
        changes: this.changes,
        id: id,
      });
    });
  });
};

export const updateById = (tableName, idField, id, data) => {
  return new Promise((resolve, reject) => {
    const keys = Object.keys(data);
    const values = Object.values(data);

    if (keys.length === 0) {
      return reject(new Error("Ніякі дані не потребують змін"));
    }

    const setClause = keys.map(key => `${key} = ?`).join(", ");

    const sql = `
      UPDATE ${tableName}
      SET ${setClause}
      WHERE ${idField} = ?
    `;

    db.run(sql, [...values, id], function (err) {
      if (err) return reject(err);

      resolve({
        changes: this.changes,
        id: id,
      });
    });
  });
};