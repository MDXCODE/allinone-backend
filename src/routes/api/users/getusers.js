const { createSuccessResponse, createErrorResponse } = require('../../../response');
const client = require('../connection'); 
const usersSchema = require('../schemastrings');

module.exports = (req, res) => {
    client.query(`SELECT * FROM ${usersSchema}`, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json(createErrorResponse(500, 'Internal Server Error')); 
        } else if (result.rows.length === 0) {
            console.error('Users table query failed:', err);
            res.status(404).json(createErrorResponse(404, `Users table is empty`));
        } else {
            res.json(createSuccessResponse({ data: result.rows })); 
        }
    });
};
