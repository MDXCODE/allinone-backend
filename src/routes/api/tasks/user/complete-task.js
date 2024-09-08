const { createSuccessResponse, createErrorResponse } = require('../../../../response');
const { createClient } = require('../../connection');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    const client = await createClient();

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
    const requestData = req.body; 
    const taskid = requestData.task_id;

    client.query(
        `UPDATE "allinone-userschema"."tasks"
        SET is_completed = TRUE
        WHERE task_id = $1 AND user_id = $2`,
        [taskid, userid],
        (err, result) => {
            if (err) {
                console.error('Error updating task completion status:', err);
                res.status(500).json(createErrorResponse(500, 'TASK UPDATE: Internal Server Error'));
            } else {
                if (result.rowCount > 0) {
                    console.log(`Task with id (${taskid}) marked as completed`);
                    res.status(200).json(createSuccessResponse(200, { taskid }));
                } else {
                    res.status(404).json(createErrorResponse(404, 'TASK UPDATE: Task not found or user not authorized'));
                }
            }
        }
    );
};
