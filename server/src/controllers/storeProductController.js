import db from '../../db.js';

export const getAll = (req, res) => {
    const sqlQuery = `SELECT * FROM Store_Product`;

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
  const { UPC, selling_price, products_number, promotional_product, id_product } = req.body;

  const sqlQuery = `INSERT INTO Store_Product (
                    UPC, selling_price, products_number, promotional_product, id_product)
                    VALUES (?, ?, ?, ?, ?)`;

  db.run(
    sqlQuery,
    [UPC, selling_price, products_number, promotional_product, id_product],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({UPC, selling_price, products_number, promotional_product, id_product});
    }
  );
};