// Importação de models
const { saleModel: model } = require('../models');

// Importação de productService
const productService = require('./Product');

// Services
const create = async (sale) => {
  const promises = sale.map(async (p) => {
    const quant = await productService.getQuant(p.product_id);
    if (quant < p.quantity) {
      return true;
    }
  });
  const products = await Promise.all(promises);
  const quantValidation = products.some((val) => val);

  if (quantValidation) return false;
  return model.create(sale);
};
const getAll = async () => model.getAll();
const getById = async (id) => model.getById(id);
const update = async (id, quantity, saleId) => model.update(id, quantity, saleId);
const remove = async (id) => {
  const result = await model.getById(id);
  if (result.length === 0) return null;
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
