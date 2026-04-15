import db from '../../db.js';

export const getAll = (req, res) => {
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

export const insertData = (req, res) => {
  const { id_category, category_name } = req.body;

  const sqlQuery = `INSERT INTO Category (id_category, category_name)
                    VALUES (?, ?)`;

  db.run(sqlQuery, [id_category, category_name], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({id_category, category_name});
  });
}