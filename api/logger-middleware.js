module.exports = (req, res, next) => {
    const dt = new Date();
    console.log(`\n
        [${dt.getFullYear()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}]
        ${req.method} to ${req.originalUrl} from ${req.ip}
        [${res.statusCode}]
    \n`);
    next();
}