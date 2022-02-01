// Importação de models
const {
  createProduct: create,
  getAllProducts: getAll,
  getProductById: getById,
} = require('../models');

// Services
const createProduct = async (name, quantity) => create(name, quantity);
const getAllProducts = async () => getAll();
const getProductById = async (id) => getById(id);

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
};
