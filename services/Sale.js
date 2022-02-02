// Importação de models
const {
  createSale: create,
  allSales: getAll,
  saleById: getById,
  updateSale: update,
} = require('../models');

// Services
const createSale = async (sales) => create(sales);
const allSales = async () => getAll();
const saleById = async (id) => getById(id);
const updateSale = async (id, quantity, saleId) => update(id, quantity, saleId);

module.exports = {
  createSale,
  allSales,
  saleById,
  updateSale,
};
