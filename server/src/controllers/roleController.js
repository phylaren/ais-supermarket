import db from '../../db.js';

export const getAllRoles = (req, res) => {
    const sqlQuery = `SELECT * FROM Role`;

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
  const { id_role, role_name } = req.body;

  const sqlQuery = `INSERT INTO Role (id_role, role_name)
                    VALUES (?, ?)`;

  db.run(sqlQuery, [id_role, role_name], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      id_role,
      role_name
    });
  });
}; 