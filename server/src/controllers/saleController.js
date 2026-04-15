import db from '../../db.js';

export const getAll = (req, res) => {
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

export const insertData = (req, res) => {
  const { UPC, id_check, product_number, selling_price } = req.body;

  const sqlQuery = `INSERT INTO Sale (
                    UPC, id_check, product_number, selling_price)
                    VALUES (?, ?, ?, ?)`;

  db.run(
    sqlQuery,
    [UPC, id_check, product_number, selling_price],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

    }
  );
};