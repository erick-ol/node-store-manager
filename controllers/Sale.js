const {
  CREATED_STATUS,
  NOT_FOUND_STATUS,
  OK_STATUS,
  UNPROCESSABLE_ENTITY_STATUS,
} = require('../utils/statusCode');

// Importação de Services
const { saleService: service } = require('../services');

// Crontollers
const create = async (req, res) => {
  const { body } = req;
  const saleId = await service.create(body);

  if (!saleId) {
    return res.status(UNPROCESSABLE_ENTITY_STATUS).json({
      message: 'Such amount is not permitted to sell' });
  }

  res.status(CREATED_STATUS).json({
    id: saleId,
    itemsSold: body,
  });
};

const getAll = async (req, res) => {
  const sales = await service.getAll();

  res.status(OK_STATUS).json(sales);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const saleInfo = await service.getById(id);

  if (saleInfo.length === 0) {
    return res.status(NOT_FOUND_STATUS).json({ message: 'Sale not found' });
  }
  
  res.status(OK_STATUS).json(saleInfo);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { product_id: prodId, quantity } = req.body[0];

  await service.update(prodId, quantity, id);

  res.status(OK_STATUS).json({
    saleId: id,
    itemUpdated: [req.body[0]],
  });
};

const remove = async (req, res) => {
  const { id } = req.params;

  const result = await service.remove(id);

  if (!result) return res.status(NOT_FOUND_STATUS).json({ message: 'Sale not found' });

  res.status(OK_STATUS).json(result);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
