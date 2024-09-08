const { createSuccessResponse, createErrorResponse } = require('../../../../response');
const { createClient } = require('../../connection');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    const client = await createClient();
    const requestData = req.body; 

    const authToken = req.cookies.authToken;
    if (!authToken) {
        return res.status(401).json(createErrorResponse(401, 'Unauthorized: No authToken provided'));
    }

    let decoded;
    try {
        decoded = jwt.verify(authToken, process.env.JWT_SECRET); 
    } catch (err) {
        return res.status(401).json(createErrorResponse(401, 'Unauthorized: Invalid authToken'));
    }

    const userid = decoded.user_id;
    const taskid = requestData.task_id;
    console.log(taskid)

    try {
        const taskQuery = `
            SELECT user_id FROM "allinone-userschema"."tasks"
            WHERE task_id = $1;
        `;

        const taskResult = await client.query(taskQuery, [taskid]);

        if (taskResult.rowCount === 0) {
            return res.status(404).json(createErrorResponse(404, `Task with ID '${taskid}' doesn't exist`));
        }

        const taskUserId = taskResult.rows[0].user_id;

        if (taskUserId !== userid) {
            return res.status(403).json(createErrorResponse(403, 'User does not match Task'));
        }

        const deleteQuery = `
            DELETE FROM "allinone-userschema"."tasks"
            WHERE task_id = $1;
        `;
        const deleteResult = await client.query(deleteQuery, [taskid]);

        if (deleteResult.rowCount === 0) {
            return res.status(404).json(createErrorResponse(404, `Task with ID '${taskid}' doesn't exist`));
        }

        console.log(`Task with ID (${taskid}) deleted`);
        res.status(200).json(createSuccessResponse(200, `Task with ID (${taskid}) deleted`));

    } catch (err) {
        console.error('Task deletion failed:', err);
        res.status(500).json(createErrorResponse(500, 'Task DELETE: Internal Server Error'));
    }
};
