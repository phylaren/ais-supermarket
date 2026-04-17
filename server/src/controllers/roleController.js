import { getAllEntities, insertEntity, deleteEntity } from "../service.js";

export const getAll = async (req, res) => {
  const result = await getAllEntities({
    tableName: "Role",
  });

  return res.status(result.status).json(result.body);
};

export const insertData= async (req, res) => {
  const result = await insertEntity({
    tableName: "Role",
    data: req.body,
    entityName: "Роль",
  });

  return res.status(result.status).json(result.body);
};

export const deleteRole = async (req, res) => {
  const { id_role } = req.params;

  const result = await deleteEntity({
    tableName: "Role",
    idField: "id_role",
    entityName: "Роль",
    id: id_role,
  });

  return res.status(result.status).json(result.body);
};