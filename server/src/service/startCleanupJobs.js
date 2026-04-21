import cron from 'node-cron';
import db from '../../db.js';

export const startCleanupJobs = () => {
    cron.schedule('0 3 * * *', () => {
        console.log('Запуск автоматичного очищення старих чеків...');

        const deleteSalesSql = `
            DELETE FROM Sale 
            WHERE id_check IN (
                SELECT id_check FROM Receipt WHERE print_date <= datetime('now', '-3 years')
            )
        `;

        const deleteReceiptsSql = `
            DELETE FROM Receipt 
            WHERE print_date <= datetime('now', '-3 years')
        `;

        db.run(deleteSalesSql, function(err) {
            if (err) {
                console.error('Помилка видалення старих товарів з чеків:', err.message);
                return;
            }

            db.run(deleteReceiptsSql, function(err) {
                if (err) {
                    console.error('Помилка видалення старих чеків:', err.message);
                } else {
                    if (this.changes > 0) {
                        console.log(`Успішно видалено старих чеків: ${this.changes}`);
                    } else {
                        console.log('Старих чеків для видалення не знайдено. Все чисто!');
                    }
                }
            });
        });
    });
};