import db from "../db.js";

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