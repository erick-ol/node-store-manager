const {
  CREATED_STATUS,
  OK_STATUS,
  NOT_FOUND_STATUS,
  CONFLICT_STATUS,
} = require('../utils/statusCode');

// Importação de Services
const { productService: service } = require('../services');

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const result = await service.create(name, quantity);

  if (!result) return res.status(CONFLICT_STATUS).json({ message: 'Product already exists' });

  res.status(CREATED_STATUS).json(result);
};

const getAll = async (req, res) => {
  const products = await service.getAll();

  res.status(OK_STATUS).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const result = await service.getById(id);

  if (!result) return res.status(NOT_FOUND_STATUS).json({ message: 'Product not found' });

  res.status(OK_STATUS).json(result);
};

const update = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;

  const result = await service.update(id, name, quantity);

  if (!result) return res.status(NOT_FOUND_STATUS).json({ message: 'Product not found' });

  res.status(OK_STATUS).json(result);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const result = await service.remove(id);

  if (!result) return res.status(NOT_FOUND_STATUS).json({ message: 'Product not found' });

  res.status(OK_STATUS).json(result);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
