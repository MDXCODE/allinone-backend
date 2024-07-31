const { createSuccessResponse, createErrorResponse } = require('../../../response');
const jwt = require('jsonwebtoken');
const { createClient } = require('../connection');  

module.exports = async (req, res) => {
  const client = await createClient();
  const token = req.headers.authorization?.split(' ')[1]; 

  if (!token) {
    return res.status(400).json(createErrorResponse(400, 'Token is required'));
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { user_id, user_name, user_email, user_is_admin } = decoded;

    res.json(createSuccessResponse({
      message: 'Logged out successfully',
      user: { user_id, user_name, user_email, user_is_admin }
    }));


  } catch (err) {
    console.error('Error during logout:', err);
    res.status(500).json(createErrorResponse(500, 'Internal Server Error'));
  }
};
