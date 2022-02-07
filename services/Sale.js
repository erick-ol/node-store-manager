// Importação de models
const { saleModel: model } = require('../models');

// Services
const create = async (sales) => model.create(sales);
const getAll = async () => model.getAll();
const getById = async (id) => model.getById(id);
const update = async (id, quantity, saleId) => model.update(id, quantity, saleId);

module.exports = {
  create,
  getAll,
  getById,
  update,
};
