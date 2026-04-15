import db from '../../db.js';

export const getAll = (req, res) => {
    const sqlQuery = `SELECT * FROM Product`;

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
  const { id_product, product_name, characteristics, id_category } = req.body;

  const sqlQuery = `
    INSERT INTO Product (id_product, product_name, characteristics, id_category)
    VALUES (?, ?, ?, ?)
  `;

  db.run(
    sqlQuery,
    [id_product, product_name, characteristics, id_category],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id_product, product_name, characteristics, id_category });
    }
  );
}
