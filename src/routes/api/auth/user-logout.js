const { createSuccessResponse, createErrorResponse } = require('../../../response');
const jwt = require('jsonwebtoken');
const client = require('../connection');  // Ensure this file correctly exports the PostgreSQL client

module.exports = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];  // Extract token from Authorization header

  if (!token) {
    return res.status(400).json(createErrorResponse(400, 'Token is required'));
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { user_id, user_name, user_email } = decoded;

    res.json(createSuccessResponse({
      message: 'Logged out successfully',
      user: { user_id, user_name, user_email }
    }));


  } catch (err) {
    console.error('Error during logout:', err);
    res.status(500).json(createErrorResponse(500, 'Internal Server Error'));
  }
};
