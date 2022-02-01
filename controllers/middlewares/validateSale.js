const {
  BAD_REQUEST_STATUS,
  UNPROCESSABLE_ENTITY_STATUS,
} = require('../../utils/statusCode');

const validateId = async (req, res, next) => {
  const { body } = req;

  if (body.some((s) => !s.product_id)) {
    return res.status(BAD_REQUEST_STATUS).json({ message: '"product_id" is required' });
  }

  next();
};

const validateQuant = async (req, res, next) => {
  const { body } = req;

  if (body.some((s) => !s.quantity && s.quantity !== 0)) {
    return res.status(BAD_REQUEST_STATUS).json({ message: '"quantity" is required' });
  }

  if (body.some((s) => s.quantity < 1 || !Number.isInteger(s.quantity))) {
    return res.status(UNPROCESSABLE_ENTITY_STATUS).json({
      message: '"quantity" must be a number larger than or equal to 1' });
  }

  next();
};

module.exports = {
  validateQuant,
  validateId,
};
