const productModel = require('./Product');

const { createSale } = require('./Sale');
const { allSales } = require('./Sale');
const { saleById } = require('./Sale');
const { updateSale } = require('./Sale');

module.exports = {
  productModel,
  createSale,
  allSales,
  saleById,
  updateSale,
};
