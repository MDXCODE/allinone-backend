const { createSuccessResponse, createErrorResponse } = require('../../../response');
const bcrypt = require('bcrypt');
const { createClient } = require('../connection');  
const crypto = require('crypto');

module.exports = async (req, res) => {
    const client = await createClient();
    
    const { user_name, user_pass, user_email, user_first_name, user_last_name } = req.body;

    if (!user_name || !user_pass || !user_email || !user_first_name || !user_last_name) {
        return res.status(400).json(createErrorResponse(400, 'All fields are required'));
    }

    try {
        const checkQuery = 'SELECT * FROM "allinone-userschema"."users" WHERE user_name = $1';
        const checkResult = await client.query(checkQuery, [user_name]);

        if (checkResult.rows.length > 0) {
            return res.status(409).json(createErrorResponse(409, 'Username already exists'));
        }

        const id = crypto.randomUUID();
        const isAdmin = false;

        const hashedPassword = await bcrypt.hash(user_pass, 10);

        const insertQuery = `
            INSERT INTO "allinone-userschema"."users"
            (user_id, user_name, user_pass, user_email, user_first_name, user_last_name, user_is_admin)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
        await client.query(insertQuery, [id, user_name, hashedPassword, user_email, user_first_name, user_last_name, isAdmin]);

        res.status(201).json(createSuccessResponse({ id }));
    } catch (err) {
        console.error('Error during user signup:', err);
        res.status(500).json(createErrorResponse(500, 'Internal Server Error'));
    }
};
