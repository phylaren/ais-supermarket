import fs from 'fs/promises';
import db from '../db.js';

export const initDatabase = async (req, res) => {
  try {
    const sqlQuery = await fs.readFile('./src/queries/createTables.sql', 'utf8');

    db.exec(sqlQuery, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: "Усі таблиці успішно створено!" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Не вдалося прочитати SQL файл" });
  }
};