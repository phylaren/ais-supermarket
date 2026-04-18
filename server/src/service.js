import { getAll, insert, deleteById } from "./repository.js";

export const getAllEntities = async ({ tableName }) => {
  try {
    const result = await getAll(tableName);

    return {
      status: 200,
      body: {
        success: true,
        data: result,
      },
    };
  } catch (err) {
    console.error("DB error:", err.message);

    return {
      status: 500,
      body: {
        success: false,
        message: "Database error",
      },
    };
  }
};

export const insertEntity = async ({ tableName, data, entityName }) => {
  if (!data || Object.keys(data).length === 0) {
    return {
      status: 400,
      body: {
        success: false,
        message: "Data is required",
      },
    };
  }

  try {
    const result = await insert(tableName, data);

    return {
      status: 201,
      body: {
        message: `${entityName} створено`
      },
    };
  } catch (err) {
    console.error("DB error:", err.message);

    return {
      status: 500,
      body: {
        success: false,
        message: "Database error",
      },
    };
  }
};

export const deleteEntity = async ({ tableName, idField, entityName, id }) => {
  if (!id) {
    return {
      status: 400,
      body: {
        success: false,
        message: `${idField} is required`,
      },
    };
  }

  if (!id) {
    return {
      status: 400,
      body: {
        success: false,
        message: `${idField} is required`,
      },
    };
  }

  try {
    const result = await deleteById(tableName, idField, id);

    if (result.changes === 0) {
      return {
        status: 404,
        body: {
          success: false,
          message: `${entityName} з id ${id} не знайдено`,
        },
      };
    }

    return {
      status: 200,
      body: {
        message: `${entityName} ${id} видалено`
      },
    };
  } catch (err) {
    console.error("DB error:", err.message);

    return {
      status: 500,
      body: {
        success: false,
        message: "Database error",
      },
    };
  }
};