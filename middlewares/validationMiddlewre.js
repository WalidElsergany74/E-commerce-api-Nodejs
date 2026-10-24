const { validationResult } = require('express-validator');

const validationMidddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      erros: errors.array()
    });
  }
  next();
};
module.exports = validationMidddleware;
