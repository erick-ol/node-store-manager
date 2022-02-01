const rescue = require('express-rescue');
const sale = require('express').Router();
const { CREATED_STATUS } = require('../utils/statusCode');
const { validateQuant, validateId } = require('./middlewares/validateSale');

// Importação de Services
const {
 createSale,
} = require('../services');

// Crontollers
const create = async (req, res) => {
  const { body } = req;
  const saleId = await createSale(body);

  res.status(CREATED_STATUS).json({
    id: saleId,
    itemsSold: body,
  });
};

sale.post('/', validateId, validateQuant, rescue(create));

module.exports = {
  sale,
};
