const { createSuccessResponse, createErrorResponse } = require('../../../response');
const client = require('../connection');
const crypto = require('crypto');

module.exports = (req, res) => {
    
    const requestData = req.body; 
    const id = crypto.randomUUID();
    const email = requestData.email;
    const username = requestData.username;
    const firstname = requestData.firstname;
    const lastname = requestData.lastname;

    client.query(
        `INSERT INTO "allinone-userschema"."users" 
        (userid, email, firstname, lastname, isadmin, username)
        VALUES ($1, $2, $3, $4, false, $5)`,
        [id, email, firstname, lastname, username],
        (err, result) => {
            if (err) {
                console.error('Error inserting user:', err);
                res.status(500).json(createErrorResponse(500, 'Internal Server Error'));
            } else {
                console.log(`User with id (${id}) was inserted`);
                res.status(200).json(createSuccessResponse(200, { id }));
            }
        }
    );
};
