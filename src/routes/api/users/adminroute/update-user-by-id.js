const { createSuccessResponse, createErrorResponse } = require('../../../../response');
const client = require('../../connection');
const bcrypt = require('bcrypt');

module.exports = (req, res) => {
    const requestData = req.body; 
    const userid = requestData.user_id;
    const username = requestData.user_name;
    const password = requestData.user_pass;
    const email = requestData.user_email;
    const firstname = requestData.user_first_name; 
    const lastname = requestData.user_last_name; 
    const isAdmin = false;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            res.status(500).json(createErrorResponse(500, 'POST USER: Internal Server Error'));
        } else {          
            client.query(
                `UPDATE "allinone-userschema"."users"
                SET user_name = $2, user_pass = $3, user_email = $4, user_first_name = $5, user_last_name = $6, user_is_admin = $7
                WHERE user_id = $1`,
                [userid, username, hashedPassword, email, firstname, lastname, isAdmin],
                (err, result) => {
                    if (err) {
                        console.error('Error updating user:', err);
                        res.status(500).json(createErrorResponse(500, 'USER UPDATE: Internal Server Error'));
                    } else {
                        if (result.rowCount > 0) {
                            console.log(`User with id (${userid}) was updated`);
                            res.status(200).json(createSuccessResponse(200, { userid }));
                        } else {
                            res.status(404).json(createErrorResponse(404, 'USER UPDATE: User not found'));
                        }
                    }
                }
            );
        }
    });
};
