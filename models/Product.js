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

module.exports = {
  createProduct,
  getAllProducts,
};
