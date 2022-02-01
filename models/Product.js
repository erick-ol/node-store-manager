const connection = require('./connection');

const createProduct = async (name, quantity) => {
  const [result] = await connection.query(
    'INSERT INTO products (name, quantity) VALUES (?, ?);',
    [name, quantity],
  );

  return {
    id: result.insertId,
    name,
    quantity,
  };
};

const getAllProducts = async () => {
  const [result] = await connection.query('SELECT * FROM products;');
  return result;
};

const getProductById = async (id) => {
  const [result] = await connection.query(
    'SELECT * FROM products WHERE id = ?;',
    [id],
  );

  return result[0];
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
};
