const { createSuccessResponse, createErrorResponse } = require('../../../../response');
const { createClient } = require('../../connection');  
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    const client = await createClient();
    const requestData = req.body; 
    const id = requestData.project_id;

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

    try {
        const result = await client.query(
            `SELECT user_id FROM "allinone-userschema"."projects" WHERE project_id = $1;`,
            [id]
        );

        if (result.rowCount === 0) {
            console.error('Project deletion failed: Project not found');
            return res.status(404).json(createErrorResponse(404, `Project with ID '${id}' doesn't exist`));
        }

        const project = result.rows[0];
        if (project.user_id !== userid) {
            console.error('Project deletion failed: Unauthorized');
            return res.status(403).json(createErrorResponse(403, 'Forbidden: You do not have permission to delete this project'));
        }

        await client.query(
            `DELETE FROM "allinone-userschema"."projects" WHERE project_id = $1;`,
            [id]
        );

        console.log(`Project with ID (${id}) deleted`);
        res.status(200).json(createSuccessResponse(200, `Project with ID (${id}) deleted`));
        
    } catch (err) {
        console.error('Project deletion failed:', err);
        res.status(500).json(createErrorResponse(500, 'Project DELETE: Internal Server Error'));
    } 
};
