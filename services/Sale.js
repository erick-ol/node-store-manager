// Importação de models
const { saleModel: model } = require('../models');

// Importação de productService
const productService = require('./Product');

// Utils
const updateQuant = async (sale, op) => {
  const promisesUpdate = sale
    .map(async (p) => {
      const product = await productService.getById(p.product_id);
      if (op === '-') product.quantity -= p.quantity;
      else product.quantity += p.quantity;
      await productService.updateQuant(p.product_id, product.quantity);
    });
  await Promise.all(promisesUpdate);
};

// Services
const create = async (sale) => {
  const promisesValidate = sale.map(async (p) => {
    const quant = await productService.getQuant(p.product_id);
    if (quant < p.quantity) {
      return true;
    }
  });
  const products = await Promise.all(promisesValidate);
  const quantValidation = products.some((val) => val);

  if (quantValidation) return false;

  await updateQuant(sale, '-');
  return model.create(sale);
};
const getAll = async () => model.getAll();
const getById = async (id) => model.getById(id);
const update = async (id, quantity, saleId) => model.update(id, quantity, saleId);
const remove = async (id) => {
  const result = await model.getById(id);
  if (result.length === 0) return null;

  await updateQuant(result, '+');
  await model.remove(id);
  return result;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
