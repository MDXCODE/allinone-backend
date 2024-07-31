const { createSuccessResponse, createErrorResponse } = require('../../../../response');
const { createClient } = require('../../connection');  

module.exports = async (req, res) => {
    const client = await createClient();
    var id = req.params.id;
    client.query(`DELETE FROM "allinone-userschema"."tasks" WHERE task_id = $1;`, [id], (err, result) => {
        if (err) {
            console.error('Task deletion failed:', err);
            res.status(500).json(createErrorResponse(500, 'Task DELETE: Internal Server Error'));
        } else if (result.rowCount === 0) {
            console.error('Task deletion failed: Task not found');
            res.status(404).json(createErrorResponse(404, `Task with ID '${id}' doesn't exist`));
        } else {
            console.log(`Task with ID (${id}) deleted`);
            res.status(200).json(createSuccessResponse(200, `Task with ID (${id}) deleted`));
        }
    });
};
