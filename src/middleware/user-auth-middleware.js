const jwt = require('jsonwebtoken');
const { createErrorResponse } = require('../response');

const isUser = (req, res, next) => {
  console.log ('  ');
  console.log ('Attempting to authetnicate user ');
  console.log ('--------------------------------');

  const token = req.cookies.authToken;

  if (!token) {
    console.log('No token found in cookies, user is being logged out');
    return res.status(401).json(createErrorResponse(401, 'Token is required'));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.status(403).json(createErrorResponse(403, 'Invalid Token'));
    }

    console.log ('  ');
    console.log ('--------------------------------');
    console.log(`User Auth passed for: ${user.user_name}`); 
    req.user = user;
    next();
  });
};

module.exports = { isUser };
