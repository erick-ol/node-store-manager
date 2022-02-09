const connection = require('./connection');

const create = async (name, quantity) => {
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

const getAll = async () => {
  const [result] = await connection.query('SELECT * FROM products;');
  return result;
};

const getById = async (id) => {
  const [result] = await connection.query(
    'SELECT * FROM products WHERE id = ?;',
    [id],
  );

  return result[0];
};

const update = async (id, name, quantity) => {
  await connection.query(
    'UPDATE products SET name = ?, quantity = ? WHERE id = ?;',
    [name, quantity, id],
  );

  return { id, name, quantity };
};

const remove = async (id) => {
  await connection.query(
    'DELETE FROM products WHERE id = ?;',
    [id],
  );
};

const getQuant = async (id) => {
  const [result] = await connection.query(
    'SELECT quantity FROM products WHERE id = ?;',
    [id],
  );
  return result[0].quantity;
};

const updateQuant = async (id, quantity) => {
  await connection.query(
    'UPDATE products SET quantity = ? WHERE id = ?;',
    [quantity, id],
  );
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
  getQuant,
  updateQuant,
};
