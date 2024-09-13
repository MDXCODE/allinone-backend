const { createSuccessResponse, createErrorResponse } = require('../../../../response');
const { createClient } = require('../../connection');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    const client = await createClient();
    const requestData = req.body; 

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
    const reminderid = requestData.reminder_id;
    console.log(reminderid)

    try {
        const reminderQuery = `
            SELECT user_id FROM "allinone-userschema"."reminders"
            WHERE reminder_id = $1;
        `;

        const reminderResult = await client.query(reminderQuery, [reminderid]);

        if (reminderResult.rowCount === 0) {
            return res.status(404).json(createErrorResponse(404, `Reminder with ID '${reminderid}' doesn't exist`));
        }

        const reminderUserId = reminderResult.rows[0].user_id;

        if (reminderUserId !== userid) {
            return res.status(403).json(createErrorResponse(403, 'User does not match Reminder'));
        }

        const deleteQuery = `
            DELETE FROM "allinone-userschema"."reminders"
            WHERE reminder_id = $1;
        `;
        const deleteResult = await client.query(deleteQuery, [reminderid]);

        if (deleteResult.rowCount === 0) {
            return res.status(404).json(createErrorResponse(404, `Reminder with ID '${reminderid}' doesn't exist`));
        }

        console.log(`Reminder with ID (${reminderid}) deleted`);
        res.status(200).json(createSuccessResponse(200, `Reminder with ID (${reminderid}) deleted`));

    } catch (err) {
        console.error('Reminder deletion failed:', err);
        res.status(500).json(createErrorResponse(500, 'Reminder DELETE: Internal Server Error'));
    }
};
