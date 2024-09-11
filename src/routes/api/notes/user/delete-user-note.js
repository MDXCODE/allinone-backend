const { createSuccessResponse, createErrorResponse } = require('../../../../response');
const { createClient } = require('../../connection');  
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    const client = await createClient();
    const requestData = req.body; 
    const id = requestData.note_id;

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
            `SELECT user_id FROM "allinone-userschema"."notes" WHERE note_id = $1;`,
            [id]
        );

        if (result.rowCount === 0) {
            console.error('note deletion failed: note not found');
            return res.status(404).json(createErrorResponse(404, `note with ID '${id}' doesn't exist`));
        }

        const note = result.rows[0];
        if (note.user_id !== userid) {
            console.error('note deletion failed: Unauthorized');
            return res.status(403).json(createErrorResponse(403, 'Forbidden: You do not have permission to delete this note'));
        }

        await client.query(
            `DELETE FROM "allinone-userschema"."notes" WHERE note_id = $1;`,
            [id]
        );

        console.log(`note with ID (${id}) deleted`);
        res.status(200).json(createSuccessResponse(200, `note with ID (${id}) deleted`));
        
    } catch (err) {
        console.error('note deletion failed:', err);
        res.status(500).json(createErrorResponse(500, 'note DELETE: Internal Server Error'));
    } 
};
