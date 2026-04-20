import db from "../../db.js";

const applyFilters = (sql, params, filters) => {
  let filteredSql = sql;

  if (filters.search) {
    filteredSql += ` AND (s.UPC LIKE ? OR p.product_name LIKE ?)`;
    const searchString = `%${filters.search}%`;
    params.push(searchString, searchString);
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

export const getStoreProductByUPCFromDB = (upc) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        sp.UPC,
        p.product_name,
        sp.selling_price,
        sp.products_number,
        p.characteristics
      FROM Store_Product AS sp
      INNER JOIN Product AS p ON sp.id_product = p.id_product
      WHERE sp.UPC = ?
    `;

    db.get(sql, [upc], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
};

export const getStoreProductsByCategoryFromDB = (categoryName) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        s.UPC,
        p.product_name,
        c.category_name,
        s.products_number,
        s.selling_price,
        s.promotional_product,
        p.characteristics
      FROM Store_Product AS s
      INNER JOIN Product AS p ON s.id_product = p.id_product
      INNER JOIN Category AS c ON p.id_category = c.id_category
      WHERE c.category_name = ?
      ORDER BY p.product_name ASC
    `;

    db.all(sql, [categoryName], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

export const getStoreProductByNameFromDB = (productName) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        sp.UPC,
        p.product_name,
        sp.selling_price,
        sp.products_number,
        sp.promotional_product,
        c.category_name
      FROM Store_Product AS sp
      INNER JOIN Product AS p ON sp.id_product = p.id_product
      INNER JOIN Category AS c ON p.id_category = c.id_category
      WHERE p.product_name = ?
    `;

    db.all(sql, [productName], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

export const findStoreProducts = (isPromotional, sortBy) => {
  return new Promise((resolve, reject) => {
    const order = sortBy === 'number' 
      ? 'sp.products_number DESC' 
      : 'p.product_name ASC';

    const promoValue = isPromotional ? 1 : 0;

    const sql = `
      SELECT 
        sp.UPC, 
        p.product_name, 
        sp.selling_price, 
        sp.products_number,
        sp.promotional_product
      FROM Store_Product AS sp
      INNER JOIN Product AS p ON sp.id_product = p.id_product
      WHERE sp.promotional_product = ?
      ORDER BY ${order}
    `;

    db.all(sql, [promoValue], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};