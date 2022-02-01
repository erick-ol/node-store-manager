const { getAllProducts } = require('../../services');
const {
  BAD_REQUEST_STATUS,
  UNPROCESSABLE_ENTITY_STATUS,
  CONFLICT_STATUS,
} = require('../../utils/statusCode');

const validateName = async (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(BAD_REQUEST_STATUS).json({ message: '"name" is required' });
  if (name.length < 5) {
    return res.status(UNPROCESSABLE_ENTITY_STATUS).json({ 
      message: '"name" length must be at least 5 characters long' });
  }

  next();
};

const exists = async (req, res, next) => {
  const { name } = req.body;
  const products = await getAllProducts();

  if (products.some((p) => p.name === name)) {
    return res.status(CONFLICT_STATUS).json({ message: 'Product already exists' });
  }

  next();
};

const validateQuant = async (req, res, next) => {
  const { quantity } = req.body;

  if (!quantity && quantity !== 0) {
    return res.status(BAD_REQUEST_STATUS).json({ message: '"quantity" is required' });
  }

  if (quantity < 1 || !Number.isInteger(quantity)) {
    return res.status(UNPROCESSABLE_ENTITY_STATUS).json({
      message: '"quantity" must be a number larger than or equal to 1' });
  }

  next();
};

module.exports = {
  validateName,
  validateQuant,
  exists,
};
