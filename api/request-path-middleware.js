module.exports = (req, res, next) => {
    console.log("In the router!");
    // console.log("Req:\n", req);
    next();
};