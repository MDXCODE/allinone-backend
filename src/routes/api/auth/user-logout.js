const { createSuccessResponse, createErrorResponse } = require('../../../response');
const jwt = require('jsonwebtoken');
const { createClient } = require('../connection');

module.exports = async (req, res) => {
  const token = req.cookies.authToken;
  console.log(' ');
  console.log(' ');
  console.log('----------------------');
  console.log('LOGOUT')
  console.log('----------------------');

  console.log('Auth Token Received: ', req.cookies.authToken);

  if (!token) {
    console.error('No token provided');
    return res.status(400).json(createErrorResponse(400, 'Token is required'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.cookie('authToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      expires: new Date(0),
      path: '/'
    });

    console.log('Token cookie cleared successfully');
    console.log(`User (${decoded.user_name}) has logged out`);

    res.json(createSuccessResponse({
      message: 'Logged out successfully',
      user: {
        user_id: decoded.user_id,
        user_name: decoded.user_name,
        user_email: decoded.user_email,
        user_is_admin: decoded.user_is_admin
      }
    }));

  } catch (err) {
    console.error('Error during logout:', err);
    res.status(500).json(createErrorResponse(500, 'Internal Server Error'));
  }
};
