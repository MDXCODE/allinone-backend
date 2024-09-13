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
    const reminderid = requestData.reminder_id;
    const remindername = requestData.reminder_name;
    const reminderdescription = requestData.reminder_desc;
    const dueDate = requestData.reminder_datetime;

    client.query(
        `UPDATE "allinone-userschema"."reminders"
        SET reminder_name = $2, reminder_desc = $3, reminder_datetime = $4
        WHERE reminder_id = $1 AND user_id = $5`,
        [reminderid, remindername, reminderdescription, dueDate, userid],
        (err, result) => {
            if (err) {
                console.error('Error updating Reminder:', err);
                res.status(500).json(createErrorResponse(500, 'REMINDER UPDATE: Internal Server Error'));
            } else {
                if (result.rowCount > 0) {
                    console.log(`Reminder with id (${reminderid}) was updated`);
                    res.status(200).json(createSuccessResponse(200, { reminderid }));
                } else {
                    res.status(404).json(createErrorResponse(404, 'REMINDER UPDATE: Reminder not found or user not authorized'));
                }
            }
        }
    );
};
