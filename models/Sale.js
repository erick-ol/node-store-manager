const connection = require('./connection');

const create = async (sales) => {
  const [sale] = await connection.query(
    'INSERT INTO sales () VALUES ();',
  );

  const soldProducts = sales.map(async ({ product_id: id, quantity }) => {
    await connection.query(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [sale.insertId, id, quantity],
    );
  });
  await Promise.all(soldProducts);

  return sale.insertId;
};

const getAll = async () => {
  const [sales] = await connection.query(
    `SELECT
      sp.sale_id saleId,
      s.date,
      sp.product_id,
      sp.quantity
    FROM sales s
    JOIN sales_products sp
    ON s.id = sp.sale_id;`,
  );

  return sales;
};

const getById = async (id) => {
  const [sale] = await connection.query(
    `SELECT
      s.date,
      sp.product_id,
      sp.quantity
    FROM sales s
    JOIN sales_products sp
    ON s.id = sp.sale_id
    WHERE sp.sale_id = ?;`,
    [id],
  );

  return sale;
};

const update = async (id, quantity, saleId) => {
  await connection.query(
  `UPDATE sales_products
  SET quantity = ?,
  product_id = ? 
  WHERE sale_id = ?;`,
  [quantity, id, saleId],
  );
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};
