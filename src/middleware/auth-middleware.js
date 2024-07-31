const jwt = require('jsonwebtoken');
const { createErrorResponse } = require('../response');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json(createErrorResponse(401, 'Token is required'));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json(createErrorResponse(403, 'Invalid Token'));
    }

    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
