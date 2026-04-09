import sqlite3Pkg from 'sqlite3';

const sqlite3 = sqlite3Pkg.verbose();

const db = new sqlite3.Database('./zlagoda.db', (err) => {
  if (err) {
    console.error('Помилка підключення до SQLite:', err.message);
  } else {
    console.log('Успішно підключено до бази даних SQLite!');
  }
});

export default db;