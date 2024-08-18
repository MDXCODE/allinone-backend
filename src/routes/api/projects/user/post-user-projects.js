const { createSuccessResponse, createErrorResponse } = require('../../../../response');
const { createClient } = require('../../connection');  
const crypto = require('crypto'); // Ensure you have this module required if not already

module.exports = async (req, res) => {
    const client = await createClient();
    const requestData = req.body; 
    const projectId = crypto.randomUUID();
    const userId = requestData.user_id;
    const projectName = requestData.project_name;
    const projectDescription = requestData.project_desc;
    const createdDate = requestData.project_created_date;
    const dueDate = requestData.project_due_date;
    

    client.query(
        `INSERT INTO "allinone-userschema"."projects"
        (project_id, user_id, project_name, project_desc, project_created_date, project_due_date)
        VALUES ($1, $2, $3, $4, $5, $6)`,
        [projectId, userId, projectName, projectDescription, createdDate, dueDate],
        (err, result) => {
            if (err) {
                console.error('Error inserting project:', err);
                res.status(500).json(createErrorResponse(500, 'PROJECT POST: Internal Server Error'));
            } else {
                console.log(`Project with id (${projectId}) was inserted`);
                res.status(200).json(createSuccessResponse(200, { projectId }));
            }
        }
    );
};
