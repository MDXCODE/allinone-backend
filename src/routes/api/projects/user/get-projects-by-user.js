const { createSuccessResponse, createErrorResponse } = require('../../../../response');
const { createClient } = require('../../connection');  

module.exports = async (req, res) => {
  const client = await createClient();
  const userId = req.user.user_id; 
  client.query('SELECT * FROM "allinone-userschema"."projects" WHERE user_id=$1', [userId], (err, result) => {
    if (err) {
      console.error('User ID Query failed:', err);
      return res.status(500).json(createErrorResponse(500, 'PROJECTS GET BY USER ID: Internal Server Error'));
    }
    if (result.rows.length === 0) {
      return res.status(404).json(createErrorResponse(404, `No projects found for user with ID '${userId}'`));
    }
    res.json(createSuccessResponse({ data: result.rows }));
  });
};
