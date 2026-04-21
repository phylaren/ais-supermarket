import db from '../../db.js';

export const getCategoryRevenueFromDB = () => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT c.id_category, c.category_name,
                   SUM(s.product_number) AS total_quantity_sold,
                   SUM(s.product_number * s.selling_price) AS total_revenue
            FROM ((Category AS c
            INNER JOIN Product AS p ON c.id_category = p.id_category)
            INNER JOIN Store_Product AS sp ON p.id_product = sp.id_product)
            INNER JOIN Sale AS s ON sp.UPC = s.UPC
            GROUP BY c.id_category, c.category_name
            ORDER BY SUM(s.product_number * s.selling_price) DESC`;
        db.all(sql, [], (err, rows) => err ? reject(err) : resolve(rows));
    });
};

export const getFullCategoryChecksFromDB = (category_name) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT r.id_check, r.print_date, r.sum_total
            FROM Receipt AS r
            WHERE NOT EXISTS (
                SELECT p.id_product FROM Product AS p
                INNER JOIN Category AS c ON p.id_category = c.id_category
                WHERE c.category_name = ?
                AND NOT EXISTS (
                    SELECT s.UPC FROM Sale AS s
                    INNER JOIN Store_Product AS sp ON s.UPC = sp.UPC
                    WHERE s.id_check = r.id_check AND sp.id_product = p.id_product
                )
            )`;
        db.all(sql, [category_name], (err, rows) => err ? reject(err) : resolve(rows));
    });
};

export const getUniversalCashiersFromDB = () => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT e.id_employee, e.empl_surname, e.empl_name
            FROM Employee AS e
            WHERE NOT EXISTS (
                SELECT DISTINCT ct.discount_percent FROM Customer_Card AS ct
                WHERE NOT EXISTS (
                    SELECT r.id_check FROM Receipt AS r
                    INNER JOIN Customer_Card AS cct ON r.id_card = cct.id_card
                    WHERE r.id_employee = e.id_employee AND cct.discount_percent = ct.discount_percent
                )
            )`;
        db.all(sql, [], (err, rows) => err ? reject(err) : resolve(rows));
    });
};

export const getCustomerSpendingsFromDB = (id_card) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT c.category_name, SUM(s.selling_price * s.product_number) AS TotalByCategory
            FROM ((((Customer_Card AS ct
            INNER JOIN Receipt AS r ON ct.id_card = r.id_card)
            INNER JOIN Sale AS s ON r.id_check = s.id_check)
            INNER JOIN Store_Product AS sp ON s.UPC = sp.UPC)
            INNER JOIN Product AS p ON sp.id_product = p.id_product)
            INNER JOIN Category AS c ON p.id_category = c.id_category
            WHERE ct.id_card = ?
            GROUP BY c.category_name`;
        db.all(sql, [id_card], (err, rows) => err ? reject(err) : resolve(rows));
    });
};