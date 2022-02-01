const rescue = require('express-rescue');
const product = require('express').Router();
const { CREATED_STATUS, OK_STATUS, NOT_FOUND_STATUS } = require('../utils/statusCode');

// Importação de Services
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} = require('../services');
const { validateName, validateQuant, exists } = require('./middlewares/validateProduct');
const { deleteProduct } = require('../models');

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

const update = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;

  const result = await getProductById(id);

  if (!result) return res.status(NOT_FOUND_STATUS).json({ message: 'Product not found' });

  const prod = await updateProduct(id, name, quantity);

  res.status(OK_STATUS).json(prod);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const result = await getProductById(id);

  if (!result) return res.status(NOT_FOUND_STATUS).json({ message: 'Product not found' });

  await deleteProduct(id);

  res.status(OK_STATUS).json(result);
};

product.get('/', rescue(getAll));
product.get('/:id', rescue(getById));
product.post('/', validateName, validateQuant, exists, rescue(create));
product.delete('/:id', rescue(remove));
product.put('/:id', validateName, validateQuant, rescue(update));

module.exports = {
  product,
};
