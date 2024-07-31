const { createSuccessResponse, createErrorResponse } = require('../../../../response');
const client = require('../../connection');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

module.exports = (req, res) => {
    const requestData = req.body; 
    const id = crypto.randomUUID();
    const username = requestData.user_name;
    const password = requestData.user_pass;
    const email = requestData.user_email;
    const firstname = requestData.user_first_name; 
    const lastname = requestData.user_last_name; 
    const isAdmin = requestData.user_is_admin;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            res.status(500).json(createErrorResponse(500, 'POST USER: Internal Server Error'));

        } else {
            client.query(
                `INSERT INTO "allinone-userschema"."users"
                (user_id, user_name, user_pass, user_email, user_first_name, user_last_name, user_is_admin)
                VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [id, username, hashedPassword, email, firstname, lastname, isAdmin],
                (err, result) => {
                    if (err) {
                        console.error('Error inserting user:', err);
                        res.status(500).json(createErrorResponse(500, 'POST USER: Internal Server Error'));
                    } else {
                        console.log(`User with id (${id}) was inserted`);
                        res.status(200).json(createSuccessResponse(200, { id }));
                    }
                }
            );
        }
        
    });
};
