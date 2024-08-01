const jwt = require('jsonwebtoken');
const { createErrorResponse } = require('../response');

const isUser = (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    console.log('No token found in cookies');
    return res.status(401).json(createErrorResponse(401, 'Token is required'));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.status(403).json(createErrorResponse(403, 'Invalid Token'));
    }

    //console.log('Token verified successfully:', user); 
    console.log('User Auth passed'); 
    req.user = user;
    next();
  });
};

module.exports = { isUser };
