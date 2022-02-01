const { createProduct } = require('./Product');
const { getAllProducts } = require('./Product');
const { getProductById } = require('./Product');
const { updateProduct } = require('./Product');
const { deleteProduct } = require('./Product');

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
