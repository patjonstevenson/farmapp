const db = require("../database/dbConfig");
const getUserId = require("../resources/users/users-model").getUserId;

export default function (table) {
    /*
        string => async function
        takes "table" - a string containing the name of the table containing the resource.
        returns a function that verifies that the person making the request owns that resource.
    */
    return async function (req, res, next) {
        const { user_id, id } = req.body;
        const jwt = require('jsonwebtoken');
        try {
            // Get user id from the token
            const token = req.headers.authorization;
            const { email } = jwt.decode(token);
            const user_id_from_token = await getUserId({ email });

            // Get resource from database by its id
            const resource = db(table).where({ id });

            // Verify that all the user ids are the same
            if (!resource.user_id) {
                res.status(400).json({ message: "ERROR: user_id required." });
            } else if (resource.user_id === user_id && user_id === user_id_from_token) {
                next();
            } else if (resource.user_id !== user_id || user_id !== user_id_from_token) {
                res.status(400).json({ message: "Ownership of this resource could not be verified." });
            }
        } catch (error) {
            console.log(`\nERROR in verify-resource-ownership-middleware\n${error}\n`);
            res.status(500).json({ message: "Error processing request." });
        }
    }
};