const jwt = require('jsonwebtoken');
const { getUserId } = require('../resources/users/users-model')

module.exports = async (req, res, next) => {
    console.log("\n\nIN VALIDATE-ID-MIDDLEWARE\n\n");
    const token = req.headers.authorization;
    const decodedJwt = jwt.decode(token);
    console.log("Decoded token:\n", decodedJwt);
    getUserId({ email: decodedJwt.email })
        .then(response => {
            const { id } = response;
            console.log("Response in validate-id-middleware:\n", response);
            console.log("ID from email: ", id);
            console.log("req.body:\n", req.body);
            // console.log("req.params.id: ", Number(req.body.params.id));
            // console.log("type of req.params.id: ", typeof Number(req.params.id));
            // console.log("Number. req.params.id: ", Number(req.params.id));
            console.log("id from db: ", id);
            console.log("id from params: ", req.params);
            console.log("EQUAL? ", id === Number(req.params.user_id));
            if (Number(req.params.user_id) === id) {
                console.log("Valid");
                next();
            } else {
                console.log("Invalid");
                res.status(401).json({ message: "Not authorized to access this resource." });
            }
        })
        .catch(error => {
            console.log("\nERROR IN VALIDATE ID MIDDLEWARE\n", error);
            res.status(500).json({ message: 'Internal server error', error });
        });

    // try {
    //     const { id } = await getUserId({ email: decodedJwt.email });

    // } catch (error) {
    //     console.log("\nERROR IN VALIDATE ID MIDDLEWARE\n");
    //     res.status(500).json({ message: 'Internal server error', error });
    // }

}