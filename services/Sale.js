// Importação de models
const { saleModel: model } = require('../models');

// Services
const create = async (sales) => model.create(sales);
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
