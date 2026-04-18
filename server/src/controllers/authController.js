import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../../db.js'; 

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;

export const login = (req, res) => {
    try {
        const { id_employee, password } = req.body;

        if (!id_employee || !password) {
            return res.status(400).json({ error: "Введіть логін та пароль" });
        }

        const sql = `
            SELECT e.id_employee, e.empl_name, e.empl_role, a.password_hash 
            FROM Employee e 
            JOIN Account a ON e.id_employee = a.id_employee
            WHERE e.id_employee = ?
        `;

        db.get(sql, [id_employee], async (err, user) => {
            if (err) {
                console.error("Помилка бази даних:", err);
                return res.status(500).json({ error: "Помилка при роботі з базою даних" });
            }

            if (!user) {
                return res.status(401).json({ error: "Користувача не знайдено або акаунт не створено" });
            }

            try {
                const isPasswordValid = await bcrypt.compare(password, user.password_hash);

                if (!isPasswordValid) {
                    return res.status(401).json({ error: "Неправильний пароль" });
                }

                const token = jwt.sign(
                    { id: user.id_employee, role: user.empl_role }, 
                    SECRET_KEY, 
                    { expiresIn: '8h' }
                );

                res.json({ message: "Успішний вхід", token, role: user.empl_role });

            } catch (bcryptError) {
                console.error("Помилка хешування:", bcryptError);
                res.status(500).json({ error: "Помилка перевірки пароля" });
            }
        });

    } catch (error) {
        console.error("Помилка логіну:", error);
        res.status(500).json({ error: "Внутрішня помилка сервера" });
    }
};