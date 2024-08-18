const { createSuccessResponse, createErrorResponse } = require('../../../../response');
const { createClient } = require('../../connection');  
const crypto = require('crypto'); // Ensure you have this module required if not already

module.exports = async (req, res) => {
    const client = await createClient();
    const requestData = req.body; 
    const taskId = crypto.randomUUID();
    const userId = requestData.user_id;
    const projectId = requestData.project_id;
    const taskName = requestData.task_name;
    const taskDescription = requestData.task_desc;
    const createdDate = requestData.task_created_date;
    const dueDate = requestData.task_due_date;

    client.query(
        `INSERT INTO "allinone-userschema"."tasks"
        (task_id, user_id, project_id, task_name, task_desc, task_created_date, task_due_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [taskId, userId, projectId, taskName, taskDescription, createdDate, dueDate],
        (err, result) => {
            if (err) {
                console.error('Error inserting task:', err);
                res.status(500).json(createErrorResponse(500, 'TASK POST: Internal Server Error'));
            } else {
                console.log(`Task with id (${taskId}) was inserted into project (${projectId})`);
                res.status(200).json(createSuccessResponse(200, { taskId }));
            }
        }
    );
};
