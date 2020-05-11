const jwt = require('jsonwebtoken');
const { getUserId } = require('./users-model')

module.exports = async (req, res, next) => {
    console.log("\n\nIN VALIDATE-ID-MIDDLEWARE\n\n");
    const token = req.headers.authorization;
    const decodedJwt = jwt.decode(token);
    console.log("Decoded token:\n", decodedJwt);
    try {
        const { id } = await getUserId({ email: decodedJwt.email });
        console.log("ID from email: ", id);

        console.log("req.params.id: ", req.params.id);
        console.log("id from db: ", id);
        if (req.params.id === `${id}`) {
            console.log("Valid");
            req.body.id = id;
            next();
        } else {
            console.log("Invalid");
            res.status(401).json({ message: "Not authorized to access this resource." })
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }

}