const rescue = require('express-rescue');
const sale = require('express').Router();
const { CREATED_STATUS, NOT_FOUND_STATUS, OK_STATUS } = require('../utils/statusCode');
const { validateQuant, validateId } = require('./middlewares/validateSale');

// Importação de Services
const {
 createSale,
 allSales,
 saleById,
 updateSale,
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

const getAll = async (req, res) => {
  const sales = await allSales();

  res.status(OK_STATUS).json(sales);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const s = await saleById(id);

  if (s.length === 0) return res.status(NOT_FOUND_STATUS).json({ message: 'Sale not found' });
  
  res.status(OK_STATUS).json(s);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { product_id: prodId, quantity } = req.body[0];

  await updateSale(prodId, quantity, id);

  res.status(OK_STATUS).json({
    saleId: id,
    itemUpdated: [req.body[0]],
  });
};

sale.post('/', validateId, validateQuant, rescue(create));
sale.get('/', rescue(getAll));
sale.get('/:id', rescue(getById));
sale.put('/:id', validateId, validateQuant, rescue(update));

module.exports = {
  sale,
};
