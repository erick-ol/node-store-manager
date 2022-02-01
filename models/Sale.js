const connection = require('./connection');

const createSale = async (sales) => {
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

module.exports = {
  createSale,
};
