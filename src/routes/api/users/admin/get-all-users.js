const { createSuccessResponse, createErrorResponse } = require('../../../../response');
const { createClient } = require('../../connection');  

module.exports = async (req, res) => {
    const client = await createClient();
    client.query(`SELECT * FROM "allinone-userschema"."users"`, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json(createErrorResponse(500, 'USER GET ALL: Internal Server Error')); 
        } else if (result.rows.length === 0) {
            console.error('Users table query failed:', err);
            res.status(404).json(createErrorResponse(404, `Users table is empty`));
        } else {
            res.json(createSuccessResponse({ data: result.rows })); 
        }
    });
};
