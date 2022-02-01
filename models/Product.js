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

const updateProduct = async (id, name, quantity) => {
  await connection.query(
    'UPDATE products SET name = ?, quantity = ? WHERE id = ?;',
    [name, quantity, id],
  );

  return { id, name, quantity };
};

const deleteProduct = async (id) => {
  await connection.query(
    'DELETE FROM products WHERE id = ?;',
    [id],
  );
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
