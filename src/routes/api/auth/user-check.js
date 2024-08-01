const { createSuccessResponse, createErrorResponse } = require('../../../response');
const jwt = require('jsonwebtoken');
const { createClient } = require('../connection');

module.exports = async (req, res) => {
  try {
    console.log('Received authToken:', req.cookies.authToken);
    console.log('Request received for user-check');

    const cookieToken = req.cookies.authToken;
    
    const token = cookieToken;
    console.log('Token:', token);

    if (!token || token === undefined || token === '') {
      console.log('No token found');
      return createErrorResponse(res, 401, 'Unauthorized: No token provided');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log('Token verification failed:', err);
 
        return createErrorResponse(res, 401, 'Unauthorized: Invalid token');
      } else {
        console.log('Token verified, decoded:', decoded);

        return res.json(createSuccessResponse({ decoded }));
      }
    });
  } catch (error) {
    console.error('Error in user-check endpoint:', error);
    return createErrorResponse(res, 500, 'Internal Server Error');
  }
};
