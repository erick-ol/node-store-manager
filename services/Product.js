// Importação de models
const { productModel: model } = require('../models');

// Services
const create = async (name, quantity) => {
  const products = await model.getAll();

  if (products.some((p) => p.name === name)) return null;

  return model.create(name, quantity);
};
const getAll = async () => model.getAll();
const getById = async (id) => model.getById(id);
const update = async (id, name, quantity) => {
  const result = await model.getById(id);

  if (!result) return null;

  return model.update(id, name, quantity);
};
const remove = async (id) => {
  const result = await model.getById(id);

  if (!result) return null;

  await model.remove(id);
  return result;
};
const getQuant = async (id) => model.getQuant(id);
const updateQuant = async (id, quantity) => model.updateQuant(id, quantity);

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
  getQuant,
  updateQuant,
};
