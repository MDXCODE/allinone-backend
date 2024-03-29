const { createSuccessResponse, createErrorResponse } = require('../../../response');
const client = require('../connection'); // Importing the PostgreSQL client instance

module.exports = (req, res) => {
    client.query(`SELECT * FROM "allinone-userschema"."users"`, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json(createErrorResponse(500, 'Internal Server Error')); // Passing both code and message
        } else {
            res.json(createSuccessResponse({ data: result.rows })); // Passing the result as a data object
        }
    });
};
