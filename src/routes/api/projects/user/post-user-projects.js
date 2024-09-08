const { createSuccessResponse, createErrorResponse } = require('../../../../response');
const { createClient } = require('../../connection');  
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

module.exports = async (req, res) => {

    const client = await createClient();
    const requestData = req.body; 
    const projectId = crypto.randomUUID();

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
    const projectName = requestData.project_name;
    const projectDescription = requestData.project_desc;
    const createdDate = new Date().toISOString().slice(0, 10); 
    const dueDate = requestData.project_due_date;
    
    client.query(
        `INSERT INTO "allinone-userschema"."projects"
        (project_id, user_id, project_name, project_desc, project_created_date, project_due_date)
        VALUES ($1, $2, $3, $4, $5, $6)`,
        [projectId, userid, projectName, projectDescription, createdDate, dueDate],
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
