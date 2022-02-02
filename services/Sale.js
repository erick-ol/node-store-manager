// Importação de models
const {
  createSale: create,
  allSales: getAll,
  saleById: getById,
} = require('../models');

// Services
const createSale = async (sales) => create(sales);
const allSales = async () => getAll();
const saleById = async (id) => getById(id);

module.exports = {
  createSale,
  allSales,
  saleById,
};
