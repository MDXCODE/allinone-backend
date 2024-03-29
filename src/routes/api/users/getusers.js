const { createSuccessResponse, createErrorResponse } = require('../../../response');
const client = require('../connection'); 

module.exports = (req, res) => {
    client.query(`SELECT * FROM "allinone-userschema"."users"`, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json(createErrorResponse(500, 'Internal Server Error')); 
        } else {
            res.json(createSuccessResponse({ data: result.rows })); 
        }
    });
};
