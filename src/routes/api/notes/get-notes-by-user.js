const { createSuccessResponse, createErrorResponse } = require('../../../response');
const client = require('../connection');

module.exports = (req, res) => {
    const userId = req.user.user_id; 
    client.query(`SELECT * FROM "allinone-userschema"."notes" WHERE user_id=$1`, [userId], (err, result) => {
        if (err) {
            console.error('User ID Query failed:', err);
            res.status(500).json(createErrorResponse(500, 'USER TASKS GET BY ID: Internal Server Error')); 
        } else if (result.rows.length === 0) {
            console.error('User ID Query failed:', err);
            res.status(404).json(createErrorResponse(404, `User with '${userId}' doesn't exist`));
        } else {
            res.json(createSuccessResponse({ data: result.rows })); 
        }
    });
};
