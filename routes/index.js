const rescue = require('express-rescue');
const product = require('express').Router();
const sale = require('express').Router();

// Require Controllers
const {
  productController,
  saleController,
} = require('../controllers');

// Validations
const {
  validateProduct,
  validateSale,
} = require('../controllers/middlewares');

// Product Methods
product.get(
  '/',
  rescue(productController.getAll),
);
product.get(
  '/:id',
  rescue(productController.getById),
);
product.post(
  '/',
  validateProduct.validateName,
  validateProduct.validateQuant,
  rescue(productController.create),
);
product.delete(
  '/:id',
  rescue(productController.remove),
);
product.put(
  '/:id',
  validateProduct.validateName,
  validateProduct.validateQuant,
  rescue(productController.update),
);

// Sale Methods
sale.post(
  '/',
  validateSale.validateId,
  validateSale.validateQuant,
  rescue(saleController.create),
);
sale.get(
  '/',
  rescue(saleController.getAll),
);
sale.get(
  '/:id',
  rescue(saleController.getById),
);
sale.get(
  '/:id',
  rescue(saleController.getById),
);
sale.put(
  '/:id',
  validateSale.validateId,
  validateSale.validateQuant,
  rescue(saleController.update),
);
sale.delete(
  '/:id',
  rescue(saleController.remove),
);

module.exports = {
  product,
  sale,
};

// Ideia de @thadeucbr fazer um arquivo separado pra rotas com exemplos no link:
// https://stackoverflow.com/questions/59681974/how-to-organize-routes-in-nodejs-express-app
