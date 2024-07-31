const { createErrorResponse } = require('../response');

const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.user_is_admin) {
    return res.status(403).json(createErrorResponse(403, 'Access denied: Admins only'));
  }

  next();
};

module.exports = { isAdmin };
