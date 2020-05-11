module.exports = (req, res, next) => {
    try {
        req.body.params = req.params;
        console.log("REQ.PARAMS IN r-p-m.js: ", req.body);
        next();
    } catch (error) {
        console.log(`\n\n
        Internal server error during params processing\n
        (request-params-middleware.js)\n
        Error:\n
        ${error}
        \n`);
        res.status(500).json({ message: 'Internal server error during params processing' });
    }
}