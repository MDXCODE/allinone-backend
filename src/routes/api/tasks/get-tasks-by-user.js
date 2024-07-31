const { createSuccessResponse, createErrorResponse } = require('../../../response');
const client = require('../connection');

module.exports = (req, res) => {
  const userId = req.user.user_id; 
  console.log(`Extracted user ID from token: ${userId}`);
  client.query('SELECT * FROM "allinone-userschema"."tasks" WHERE user_id=$1', [userId], (err, result) => {
    if (err) {
      console.error('User ID Query failed:', err);
      return res.status(500).json(createErrorResponse(500, 'USER TASKS GET BY ID: Internal Server Error'));
    }
    if (result.rows.length === 0) {
      return res.status(404).json(createErrorResponse(404, `No tasks found for user with ID '${userId}'`));
    }
    res.json(createSuccessResponse({ data: result.rows }));
  });
};
