const { createSuccessResponse, createErrorResponse } = require('../../../response');
const client = require('../connection');

module.exports = (req, res) => {
    const requestData = req.body; 
    const taskid = requestData.task_id;
    const userid = requestData.user_id;
    const taskname = requestData.task_name;
    const taskdescription = requestData.task_desc;
    const createdDate = requestData.task_created_date;
    const dueDate = requestData.task_due_date;

    client.query(
        `UPDATE "allinone-userschema"."tasks"
        SET user_id = $2, task_name = $3, task_desc = $4, task_created_date = $5, task_due_date = $6
        WHERE task_id = $1`,
        [taskid, userid, taskname, taskdescription, createdDate, dueDate],
        (err, result) => {
            if (err) {
                console.error('Error updating task:', err);
                res.status(500).json(createErrorResponse(500, 'TASK UPDATE: Internal Server Error'));
            } else {
                if (result.rowCount > 0) {
                    console.log(`Task with id (${taskid}) was updated`);
                    res.status(200).json(createSuccessResponse(200, { taskid }));
                } else {
                    res.status(404).json(createErrorResponse(404, 'TASK UPDATE: Task not found'));
                }
            }
        }
    );
};
