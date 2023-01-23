
const jwt = require("jsonwebtoken");

// function parseJwt (token) {
//     var base64Url = token.split('.')[1];
//     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));
//     console.log(jsonPayload);
//     return JSON.parse(jsonPayload);
// };

const sendToken = (user, statusCode, res) => {
    const token = user.generateAuthToken()

    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }
    const role = jwt.verify(token, process.env.JWT_SECRET)
    res.status(statusCode).cookie('token', token, cookieOptions).json({
        status: statusCode,
        role: role.role,
        token,
        user
    });
}

module.exports = sendToken;