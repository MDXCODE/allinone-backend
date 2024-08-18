const { createSuccessResponse, createErrorResponse } = require('../../../../response');
const { createClient } = require('../../connection');  

module.exports = async (req, res) => {
    const client = await createClient();
    const requestData = req.body; 
    const taskid = crypto.randomUUID();
    const userid = requestData.user_id;
    const taskname = requestData.task_name;
    const taskdescription = requestData.task_desc;
    const createdDate = requestData.task_created_date;
    const dueDate = requestData.task_due_date;

    client.query(
        `INSERT INTO "allinone-userschema"."tasks"
        (task_id, user_id, task_name, task_desc, task_created_date, task_due_date)
        VALUES ($1, $2, $3, $4, $5, $6)`,
        [taskid, userid, taskname, taskdescription, createdDate, dueDate],
        (err, result) => {
            if (err) {
                console.error('Error inserting task:', err);
                res.status(500).json(createErrorResponse(500, 'TASK POST: Internal Server Error'));
            } else {
                console.log(`Task with id (${taskid}) was inserted`);
                res.status(200).json(createSuccessResponse(200, { taskid }));
            }
        }
    );
};