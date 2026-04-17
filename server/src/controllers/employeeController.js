import { getAllEntities, insertEntity, deleteEntity } from "../service.js";

export const getAll = async (req, res) => {
  const result = await getAllEntities({
    tableName: "Employee",
  });

  return res.status(result.status).json(result.body);
};

export const insertData = async (req, res) => {
  const result = await insertEntity({
    tableName: "Employee",
    data: req.body,
    entityName: "Працівника",
  });

  return res.status(result.status).json(result.body);
};

export const deleteEmployee = async (req, res) => {
  const { id_employee } = req.params;

  const result = await deleteEntity({
    tableName: "Employee",
    idField: "id_employee",
    entityName: "Працівника",
    id: id_employee,
  });

  return res.status(result.status).json(result.body);
};