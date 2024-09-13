const { createSuccessResponse, createErrorResponse } = require('../../../../response');
const { createClient } = require('../../connection');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

module.exports = async (req, res) => {
    try {
        const client = await createClient();
        const requestData = req.body; 
        const taskid = crypto.randomUUID();
        const dueDate = requestData.task_due_date;

        const authToken = req.cookies.authToken;

        if (!authToken) {
            return res.status(401).json(createErrorResponse(401, 'Unauthorized: No authToken found'));
        }

        let decoded;
        try {
            decoded = jwt.verify(authToken, process.env.JWT_SECRET); 
        } catch (err) {
            return res.status(401).json(createErrorResponse(401, 'Unauthorized: Invalid authToken'));
        }

        const userid = decoded.user_id;  

        const today = new Date().toISOString().slice(0, 10); 

        const taskname = requestData.task_name;
        const taskdescription = requestData.task_desc;
        const projectId = requestData.project_id || null; 

        const query = `
            INSERT INTO "allinone-userschema"."tasks"
            (task_id, user_id, task_name, task_desc, task_created_date, task_due_date, project_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;

        const values = [taskid, userid, taskname, taskdescription, today, dueDate, projectId];

        client.query(query, values, (err, result) => {
            if (err) {
                console.error('Error inserting task:', err);
                res.status(500).json(createErrorResponse(500, 'TASK POST: Internal Server Error'));
            } else {
                console.log(`Task with id (${taskid}) was inserted`);
                res.status(200).json(createSuccessResponse(200, { taskid }));
            }
        });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json(createErrorResponse(500, 'TASK POST: Internal Server Error'));
    }
};
