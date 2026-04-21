import db from "../../db.js";

const applyFilters = (sql, params, filters) => {
  let filteredSql = sql;

  if (filters.search) {
    const s = filters.search;
    
    const lower = s.toLowerCase();
    const upper = s.toUpperCase();
    const capitalized = lower.charAt(0).toUpperCase() + lower.slice(1);

    filteredSql += ` AND (
      s.UPC LIKE ? OR 
      p.product_name LIKE ? OR 
      p.product_name LIKE ? OR 
      p.product_name LIKE ? OR 
      p.product_name LIKE ?
    )`;
    
    params.push(
      `%${s}%`,
      `%${s}%`,
      `%${lower}%`,
      `%${upper}%`,
      `%${capitalized}%`
    );
  }

  if (filters.id_category && filters.id_category !== 'all') {
    filteredSql += ` AND p.id_category = ?`;
    params.push(filters.id_category);
  }

  if (filters.promo_status === 'true') {
    filteredSql += ` AND s.promotional_product = 1`;
  } else if (filters.promo_status === 'false') {
    filteredSql += ` AND s.promotional_product = 0`;
  }

  return filteredSql;
};

export const getAllStoreProductsByCountFromDB = (filters = {}) => {
  return new Promise((resolve, reject) => {
    let sql = `
      SELECT
        s.UPC,
        p.product_name,
        p.id_category,
        s.selling_price,
        s.products_number,
        s.promotional_product
      FROM Store_Product AS s
      INNER JOIN Product AS p ON s.id_product = p.id_product
      WHERE 1=1
    `;
    let params = [];

    sql = applyFilters(sql, params, filters);

    if (filters.sort_by === 'name_asc') {
      sql += ` ORDER BY p.product_name ASC`;
    } else if (filters.sort_by === 'quantity_asc') {
      sql += ` ORDER BY s.products_number ASC`;
    } else {
      sql += ` ORDER BY s.products_number DESC`;
    }

    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

export const getStoreProductsOrderedByNameFromDB = (filters = {}) => {
  return new Promise((resolve, reject) => {
    let sql = `
      SELECT
        s.UPC,
        p.product_name,
        p.id_category,
        s.selling_price,
        s.products_number,
        s.promotional_product
      FROM Store_Product AS s
      INNER JOIN Product AS p ON s.id_product = p.id_product
      WHERE 1=1
    `;
    let params = [];

    sql = applyFilters(sql, params, filters);

    if (filters.sort_by === 'quantity_asc') {
      sql += ` ORDER BY s.products_number ASC`;
    } else {
      sql += ` ORDER BY p.product_name ASC`;
    }

    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};