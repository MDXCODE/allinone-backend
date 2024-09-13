const { createSuccessResponse, createErrorResponse } = require('../../../../response');
const { createClient } = require('../../connection');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

module.exports = async (req, res) => {
    try {
        const client = await createClient();
        const requestData = req.body; 

        const reminderId = crypto.randomUUID();
        const reminderDateTime = requestData.reminder_datetime;

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

        const reminderName = requestData.reminder_name;
        const reminderDesc = requestData.reminder_desc;

        const query = `
            INSERT INTO "allinone-userschema"."reminders"
            (reminder_id, user_id, reminder_name, reminder_desc, reminder_datetime)
            VALUES ($1, $2, $3, $4, $5)
        `;

        const values = [reminderId, userid, reminderName, reminderDesc, reminderDateTime];

        client.query(query, values, (err, result) => {
            if (err) {
                console.error('Error inserting reminder:', err);
                res.status(500).json(createErrorResponse(500, 'REMINDER POST: Internal Server Error'));
            } else {
                console.log(`Reminder with id (${reminderId}) was inserted`);
                res.status(200).json(createSuccessResponse(200, { reminderId }));
            }
        });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json(createErrorResponse(500, 'REMINDER POST: Internal Server Error'));
    }
};
