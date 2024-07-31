const { createSuccessResponse, createErrorResponse } = require('../../../../response');
const { createClient } = require('../../connection');  

module.exports = async (req, res) => {
    const client = await createClient();
    const requestData = req.body; 
    const noteid = crypto.randomUUID();
    const userid = requestData.user_id;
    const notecontent = requestData.note_content;

    client.query(
        `INSERT INTO "allinone-userschema"."notes"
        (note_id, user_id, note_content)
        VALUES ($1, $2, $3)`,
        [noteid, userid, notecontent],
        (err, result) => {
            if (err) {
                console.error('Error inserting task:', err);
                res.status(500).json(createErrorResponse(500, 'NOTES CONTENT: Internal Server Error'));
            } else {
                console.log(`Note with id (${noteid}) was inserted`);
                res.status(200).json(createSuccessResponse(200, { noteid }));
            }
        }
    );
};