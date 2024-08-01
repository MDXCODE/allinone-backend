const { createSuccessResponse, createErrorResponse } = require('../../../response');
const bcrypt = require('bcrypt');
const { createClient } = require('../connection');  
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  const { user_name, user_pass } = req.body;

  if (!user_name || !user_pass) {
    return res.status(400).json(createErrorResponse(400, 'Username and password are required'));
  }

  const client = await createClient();

  try {
    const query = 'SELECT * FROM "allinone-userschema"."users" WHERE user_name = $1';
    const result = await client.query(query, [user_name]);

    if (result.rows.length === 0) {
      return res.status(404).json(createErrorResponse(404, 'User not found'));
    }

    const user = result.rows[0];

    if (!user.user_pass) {
      return res.status(500).json(createErrorResponse(500, 'User password is missing'));
    }

    const passwordMatch = await bcrypt.compare(user_pass, user.user_pass);

    if (!passwordMatch) {
      return res.status(401).json(createErrorResponse(401, 'Invalid credentials'));
    }

    const token = jwt.sign(
      { 
        user_id: user.user_id, 
        user_name: user.user_name, 
        user_email: user.user_email, 
        user_is_admin: user.user_is_admin 
      },
      process.env.JWT_SECRET,  
      { 
        expiresIn: '20m' 
      }
    );

    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'Lax', 
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) 
    });
    
    res.json(createSuccessResponse({ token, user }));
  } catch (err) {
    console.error('Login failed:', err);
    res.status(500).json(createErrorResponse(500, 'Internal Server Error'));
  }
};
