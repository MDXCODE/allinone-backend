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
    const noteid = requestData.note_id;
    const noteTitle = requestData.note_title;
    const noteContent = requestData.note_content;
    const updatedNoteTitle = (!noteTitle || noteTitle.trim() === "") ? "No Title" : noteTitle;
    const updatedNoteContent = (!noteContent || noteContent.trim() === "") ? "No Content" : noteContent;

    client.query(
        `UPDATE "allinone-userschema"."notes" 
        SET note_title = $2, note_content = $3
        WHERE note_id = $1 AND user_id = $4`,
        [noteid, updatedNoteTitle, updatedNoteContent, userid],
        (err, result) => {
            if (err) {
                console.error('Error updating note:', err);
                res.status(500).json(createErrorResponse(500, 'NOTE UPDATE: Internal Server Error'));
            } else {
                if (result.rowCount > 0) {
                    console.log(`Note with id (${noteid}) was updated`);
                    res.status(200).json(createSuccessResponse(200, { noteid }));
                } else {
                    res.status(404).json(createErrorResponse(404, 'NOTE UPDATE: Note not found or user not authorized'));
                }
            }
        }
    );
};
