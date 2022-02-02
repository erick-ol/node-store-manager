const { createProduct } = require('./Product');
const { getAllProducts } = require('./Product');
const { getProductById } = require('./Product');
const { updateProduct } = require('./Product');
const { deleteProduct } = require('./Product');
const { createSale } = require('./Sale');
const { allSales } = require('./Sale');
const { saleById } = require('./Sale');

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createSale,
  allSales,
  saleById,
};
