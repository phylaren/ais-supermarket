import db from '../../db.js';

export const getAllCategories = (req, res) => {
    const sqlQuery = `SELECT * FROM Category`;

    db.all(sqlQuery, [], (err, rows) => {
        if(err){
            console.log(err.message);
            res.status(500).json({error: err.message});
        }else{
            res.json(rows);
        }
    });
}