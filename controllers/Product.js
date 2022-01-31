const rescue = require('express-rescue');
const product = require('express').Router();
const { CREATED_STATUS } = require('../utils/statusCode');

// Importação de Services
const {
  createProduct,
} = require('../services');
const { validateName, validateQuant } = require('./middlewares/validateProduct');

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const result = await createProduct(name, quantity);

  res.status(CREATED_STATUS).json(result);
};

product.post('/', validateName, validateQuant, rescue(create));

module.exports = {
  product,
};
