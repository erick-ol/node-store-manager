// Importação de models
const {
  createProduct: create,
  getAllProducts: getAll,
  getProductById: getById,
  updateProduct: update,
} = require('../models');

// Services
const createProduct = async (name, quantity) => create(name, quantity);
const getAllProducts = async () => getAll();
const getProductById = async (id) => getById(id);
const updateProduct = async (id, name, quantity) => update(id, name, quantity);

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
};
