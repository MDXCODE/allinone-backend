const { createSuccessResponse, createErrorResponse } = require('../../../response');
const client = require('../connection');

module.exports = (req, res) => {
    var id = req.params.id;
    client.query(`SELECT * FROM "allinone-userschema"."tasks" WHERE task_id=$1`, [id], (err, result) => {
        if (err) {
            console.error('Task ID Query failed:', err);
            res.status(500).json(createErrorResponse(500, 'TASK GET BY ID: Internal Server Error')); 
        } else if (result.rows.length === 0) {
            console.error('Task ID Query failed:', err);
            res.status(404).json(createErrorResponse(404, `Task with '${id}' doesn't exist`));
        } else {
            res.json(createSuccessResponse({ data: result.rows })); 
        }
    });
};
