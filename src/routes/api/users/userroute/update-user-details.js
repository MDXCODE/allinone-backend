const { createSuccessResponse, createErrorResponse } = require('../../../../response');
const client = require('../../connection');
const bcrypt = require('bcrypt');

module.exports = (req, res) => {
    //console.log('this is being hit');
    const userIdFromToken = req.user.user_id; 
    const { 
        user_name, 
        user_pass,
        user_email, 
        user_first_name, 
        user_last_name 
    } = req.body;  


    if (!user_name || !user_pass || !user_email || !user_first_name || !user_last_name) {
        return res.status(400).json(createErrorResponse(400, 'All fields are required'));
    }

    bcrypt.hash(user_pass, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).json(createErrorResponse(500, 'Internal Server Error'));
        }

        client.query(
            `UPDATE "allinone-userschema"."users"
            SET user_name = $2, user_pass = $3, user_email = $4, user_first_name = $5, user_last_name = $6
            WHERE user_id = $1`,
            [userIdFromToken, user_name, hashedPassword, user_email, user_first_name, user_last_name],
            (err, result) => {
                if (err) {
                    console.error('Error updating user:', err);
                    return res.status(500).json(createErrorResponse(500, 'Internal Server Error'));
                }

                if (result.rowCount > 0) {
                    console.log(`User with ID (${userIdFromToken}) was updated`);
                    res.status(200).json(createSuccessResponse(200, { userId: userIdFromToken }));
                } else {
                    res.status(404).json(createErrorResponse(404, 'User not found'));
                }
            }
        );
    });
};
