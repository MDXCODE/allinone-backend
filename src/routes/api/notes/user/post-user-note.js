const { createSuccessResponse, createErrorResponse } = require('../../../../response');
const { createClient } = require('../../connection');
const crypto = require('crypto'); 
const jwt = require('jsonwebtoken'); 

module.exports = async (req, res) => {
    try {
        const client = await createClient();
        const requestData = req.body; 
        const noteid = crypto.randomUUID();  
        const notecontent = requestData.note_content;

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

        client.query(
            `INSERT INTO "allinone-userschema"."notes" (note_id, user_id, note_content) VALUES ($1, $2, $3)`,
            [noteid, userid, notecontent],
            (err, result) => {
                if (err) {
                    console.error('Error inserting note:', err);
                    res.status(500).json(createErrorResponse(500, 'NOTES POST: Internal Server Error'));
                } else {
                    console.log(`Note with id (${noteid}) was inserted`);
                    res.status(200).json(createSuccessResponse(200, { noteid }));
                }
            }
        );
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json(createErrorResponse(500, 'Unexpected Internal Server Error'));
    }
};
