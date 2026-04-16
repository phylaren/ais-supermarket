import db from '../../db.js';

export const getAllReceipts = (req, res) => {
    const sqlQuery = `SELECT * FROM Receipt`;

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
  const { id_check, print_date, sum_total, vat, id_employee, id_card } = req.body;

  const sqlQuery = `INSERT INTO Receipt (
                    id_check, print_date, sum_total, vat, id_employee, id_card)
                    VALUES (?, ?, ?, ?, ?, ?)`;

  db.run(
    sqlQuery,
    [id_check, print_date, sum_total, vat, id_employee, id_card],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
       res.status(201).json({ id_check, print_date, sum_total, vat, id_employee, id_card});
    });
}