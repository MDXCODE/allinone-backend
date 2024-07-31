const { createSuccessResponse, createErrorResponse } = require('../../../../response');
const { createClient } = require('../../connection');  

module.exports = async (req, res) => {
    const client = await createClient();
    var id = req.params.id;

    client.query(`DELETE FROM "allinone-userschema"."tasks" WHERE user_id = $1;`, [id], (err, result) => {
        if (err) {
            console.error('Task deletion failed:', err);
            res.status(500).json(createErrorResponse(500, 'USER DELETE: Internal Server Error'));
        } else {
            client.query(`DELETE FROM "allinone-userschema"."users" WHERE user_id = $1;`, [id], (err, result) => {
                if (err) {
                    console.error('User deletion failed:', err);
                    res.status(500).json(createErrorResponse(500, 'USER DELETE: Internal Server Error'));
                } else if (result.rowCount === 0) {
                    console.error('User deletion failed:', err);
                    res.status(404).json(createErrorResponse(404, `User with ID '${id}' doesn't exist`));
                } else {
                    console.log(`User with ID (${id}) deleted`);
                    res.status(200).json(createSuccessResponse(200, `User with ID (${id}) deleted`));
                }
            });
        }
    });
};