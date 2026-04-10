import fs from 'fs/promises';
import db from '../db.js';

export const initDatabase = async (req, res) => {
  try {
    const sqlQuery = await fs.readFile('./src/queries/createTables.sql', 'utf8');

    db.exec(sqlQuery, async (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      }
      try {
        const initData = await fs.readFile('./src/queries/completingTables.sql', 'utf8');

        db.exec(initData, (err) => {
          if (err) {
            res.status(500).json({ error: err.message });
          }

          res.json({ message: "Таблиці успішно створено і заповнено даними!" });
        });

      } catch (error) {
        res.status(500).json({ error: "Не вдалося прочитати файл з даними таблиць" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Не вдалося прочитати SQL файл" });
  }
};