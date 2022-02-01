// Importação de models
const {
  createSale: create,
} = require('../models');

// Services
const createSale = async (sale) => create(sale);

module.exports = {
  createSale,
};
