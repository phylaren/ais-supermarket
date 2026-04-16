import db from '../../db.js';

export const getAllCustomerCards = (req, res) => {
    const sqlQuery = `SELECT * FROM Customer_Card`;

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
  const {id_card, cust_surname, cust_name, cust_patronymic, phone_number, city,
        street, zip_code, discount_percent} = req.body;

  const sqlQuery = `INSERT INTO Customer_Card (
                    id_card, cust_surname, cust_name, cust_patronymic,
                    phone_number, city, street, zip_code, discount_percent)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.run(sqlQuery, [id_card, cust_surname, cust_name, cust_patronymic, phone_number, city, street, zip_code, discount_percent],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({
        id_card, cust_surname, cust_name, cust_patronymic, phone_number, city,
        street, zip_code, discount_percent
      });
    }
  );
};