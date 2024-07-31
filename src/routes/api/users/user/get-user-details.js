const { createSuccessResponse, createErrorResponse } = require('../../../../response');
const { createClient } = require('../../connection');  

module.exports = async (req, res) => {
  const userId = req.user.user_id;  
  const client = await createClient();
  
  try {
    const query = `SELECT * FROM "allinone-userschema"."users" WHERE user_id = $1`;
    const result = await client.query(query, [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json(createErrorResponse(404, `User with ID '${userId}' doesn't exist`));
    }

    res.json(createSuccessResponse({ data: result.rows[0] }));
  } catch (err) {
    console.error('User Query failed:', err);
    res.status(500).json(createErrorResponse(500, 'Internal Server Error'));
  }
};
