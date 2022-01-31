// Importação de models
const {
  createProduct: create,
  getAllProducts: getAll,
} = require('../models');

// Services
const createProduct = async (name, quantity) => create(name, quantity);
const getAllProducts = async () => getAll();

module.exports = {
  createProduct,
  getAllProducts,
};
