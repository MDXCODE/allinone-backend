const { createSuccessResponse, createErrorResponse } = require('../../../response');
const client = require('../connection'); 

module.exports = (req, res) => {
    const id = req.params.id;

    const query = `SELECT * FROM "allinone-userschema"."users" WHERE user_id = $1`;
    client.query(query, [id], (err, result) => {
        if (err) {
            console.error('User ID Query failed:', err);
            res.status(500).json(createErrorResponse(500, 'USER GET BY ID: Internal Server Error')); 
        } else {
            if (result.rows.length === 0) {
                console.error(`User with ID '${id}' doesn't exist`);
                res.status(404).json(createErrorResponse(404, `User with ID '${id}' doesn't exist`));
            } else {
                res.json(createSuccessResponse({ data: result.rows })); 
            }
        }
    });
};
