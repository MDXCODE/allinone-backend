const { createSuccessResponse, createErrorResponse } = require('../../../response');
const client = require('../connection');

module.exports = (req, res) => {
    var id = req.params.id;
    client.query(`SELECT * FROM "allinone-userschema"."tasks" WHERE userid=${id}`, (err, result) => {
        if (err) {
            console.error('User ID Query failed:', err);
            res.status(500).json(createErrorResponse(500, 'Internal Server Error')); 
        } else if (result.rows.length === 0) {
            console.error('User ID Query failed:', err);
            res.status(404).json(createErrorResponse(404, `User with '${id}' doesn't exist`));
        } else {
            res.json(createSuccessResponse({ data: result.rows })); 
        }
    });
};
