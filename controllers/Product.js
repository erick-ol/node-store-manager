const rescue = require('express-rescue');
const product = require('express').Router();
const { CREATED_STATUS, OK_STATUS, NOT_FOUND_STATUS } = require('../utils/statusCode');

// Importação de Services
const {
  createProduct,
  getAllProducts,
  getProductById,
} = require('../services');
const { validateName, validateQuant } = require('./middlewares/validateProduct');

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const result = await createProduct(name, quantity);

  res.status(CREATED_STATUS).json(result);
};

const getAll = async (req, res) => {
  const products = await getAllProducts();

  res.status(OK_STATUS).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const result = await getProductById(id);

  if (!result) return res.status(NOT_FOUND_STATUS).json({ message: 'Product not found' });

  res.status(OK_STATUS).json(result);
};

product.get('/', getAll);
product.get('/:id', getById);

product.post('/', validateName, validateQuant, rescue(create));

module.exports = {
  product,
};
