import db from '../../db.js';

export const getAllSales = (req, res) => {
    const sqlQuery = `SELECT * FROM Sale`;

    db.all(sqlQuery, [], (err, rows) => {
        if(err){
            console.log(err.message);
            res.status(500).json({error: err.message});
        }else{
            res.json(rows);
        }
    });
}