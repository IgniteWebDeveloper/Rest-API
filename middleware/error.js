const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || err.code || 500;
    err.message = err.message || "Internal Server Error";
    let message
    if (err.code === 11000) {
        message = `User already registered with given ${Object.keys(err.keyValue)}`;
        err = new ErrorHandler(message, 400)
    }
    res.status(err.statusCode).json({
        err,
        status: err.statusCode,
        message: (err.code === 11000 ? message : err.message)
    });
}
